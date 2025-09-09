const User = require("../models/User");
const axios = require("axios");

// Sage API Configuration
const SAGE_CONFIG = {
  baseUrl: "https://resellers.accounting.sageone.co.za/api/2.0.0",
  companiesEndpoint: "/Company/Get",
  itemsEndpoint: "/Item/Get",
  customersEndpoint: "/Customer/Get",
  salesByItemEndpoint: "/SalesByItem/Get",
  salesInvoiceEndpoint: "/SalesInvoice/Get",
  // Add other endpoints as needed
};

// Helper function to create Sage API headers with user credentials
const createSageHeaders = (user) => {
  const authString = Buffer.from(
    `${user.sageEmail}:${user.sagePassword}`
  ).toString("base64");
  return {
    "Content-Type": "application/json",
    Authorization: `Basic ${authString}`,
  };
};

// Helper function to make Sage API calls with user credentials
const makeSageApiCall = async (user, endpoint, params = {}) => {
  const headers = createSageHeaders(user);
  const apiParams = { ...params, apiKey: user.sageApiKey };

  let response = await axios.get(`${SAGE_CONFIG.baseUrl}${endpoint}`, {
    params: apiParams,
    headers: headers,
  });
  console.log("Sage API response:", response.data);
  return response;
};

// @desc    Connect Sage with Account Credentials
// @route   POST /api/sage/connect
// @access  Private
const connectSageWithApiKey = async (req, res, next) => {
  try {
    const { email, password, apiKey } = req.body;

    if (!email || !password || !apiKey) {
      return res.status(400).json({
        success: false,
        message: "Email, password, and API Key are all required",
      });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    // Validate API key format (should be UUID)
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(apiKey)) {
      return res.status(400).json({
        success: false,
        message: "Invalid API Key format. Expected UUID format.",
      });
    }

    // Test the credentials by fetching companies
    try {
      // Create a temporary user object for testing
      const testUser = {
        sageEmail: email,
        sagePassword: password,
        sageApiKey: apiKey,
      };
      const companiesResponse = await makeSageApiCall(
        testUser,
        SAGE_CONFIG.companiesEndpoint
      );
      const companiesData = companiesResponse.data;

      // Find user and update with Sage information
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      // Update user with Sage information
      user.sageConnected = true;
      user.sageEmail = email;
      user.sagePassword = password; // In production, consider encrypting this
      user.sageApiKey = apiKey;
      user.sageConnectedAt = new Date();

      // Clear existing companies and add new ones
      user.sageCompanies = [];

      // Handle the response structure - check if it has Results array
      let companies = [];
      if (
        companiesData &&
        companiesData.Results &&
        Array.isArray(companiesData.Results)
      ) {
        companies = companiesData.Results;
      } else if (companiesData && Array.isArray(companiesData)) {
        companies = companiesData;
      }

      console.log("Companies to process:", companies);

      // Add all available companies
      if (companies.length > 0) {
        for (const company of companies) {
          console.log("Processing company:", {
            ID: company.ID,
            Name: company.Name,
            DisplayName: company.DisplayName,
          });
          await user.addSageCompany({
            companyId: String(company.ID), // Ensure it's a string and use the correct field
            companyName:
              company.Name || company.DisplayName || `Company ${company.ID}`,
            companyDatabase: company.DatabaseName || String(company.ID),
          });
        }
      }

      await user.save();

      console.log("User saved with companies:", user.sageCompanies);
      console.log("Active company ID:", user.activeCompanyId);

      res.status(200).json({
        success: true,
        message: "Sage integration connected successfully",
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
          companyName: user.companyName,
          phone: user.phone,
          sageConnected: user.sageConnected,
          activeCompanyId: user.activeCompanyId,
          isActive: user.isActive,
          isEmailVerified: user.isEmailVerified,
          lastLogin: user.lastLogin,
          createdAt: user.createdAt,
        },
        companies: user.sageCompanies || [],
        activeCompany: user.getActiveCompany(),
        debug: {
          companiesProcessed: companies.length,
          companiesInDb: user.sageCompanies ? user.sageCompanies.length : 0,
          responseStructure: companiesData ? Object.keys(companiesData) : [],
        },
      });
    } catch (apiError) {
      console.error("Sage API test error:", apiError);

      if (
        apiError.response?.status === 401 ||
        apiError.response?.status === 403
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid credentials. Please check your email, password, and API key.",
        });
      }

      return res.status(400).json({
        success: false,
        message: "Failed to connect to Sage. Please check your credentials.",
      });
    }
  } catch (error) {
    console.error("Connect Sage error:", error);
    next(error);
  }
};

// @desc    Disconnect Sage integration
// @route   DELETE /api/sage/disconnect
// @access  Private
const disconnectSage = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        sageConnected: false,
        sageCompanies: [],
        activeCompanyId: null,
        $unset: {
          sageEmail: 1,
          sagePassword: 1,
          sageApiKey: 1,
          sageConnectedAt: 1,
        },
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Sage integration disconnected successfully",
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        companyName: user.companyName,
        phone: user.phone,
        sageConnected: user.sageConnected,
        isActive: user.isActive,
        isEmailVerified: user.isEmailVerified,
        lastLogin: user.lastLogin,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Disconnect Sage error:", error);
    next(error);
  }
};

// @desc    Get Sage connection status
// @route   GET /api/sage/status
// @access  Private
const getSageStatus = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const activeCompany = user.getActiveCompany();

    res.status(200).json({
      success: true,
      sageConnected: user.sageConnected,
      activeCompanyId: user.activeCompanyId,
      activeCompany: activeCompany,
      companiesCount: user.sageCompanies ? user.sageCompanies.length : 0,
      connectedAt: user.sageConnectedAt,
    });
  } catch (error) {
    console.error("Get Sage status error:", error);
    next(error);
  }
};

// @desc    Get Sage companies
// @route   GET /api/sage/companies
// @access  Private
const getSageCompanies = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select(
      "+sageEmail +sagePassword +sageApiKey"
    );

    if (!user.sageConnected) {
      return res.status(400).json({
        success: false,
        message: "Sage not connected. Please connect to Sage first.",
      });
    }

    // Optionally refresh companies from Sage API
    if (req.query.refresh === "true") {
      try {
        const companiesResponse = await makeSageApiCall(
          user,
          SAGE_CONFIG.companiesEndpoint
        );
        const companiesData = companiesResponse.data;

        // Handle the response structure - check if it has Results array
        let companies = [];
        if (
          companiesData &&
          companiesData.Results &&
          Array.isArray(companiesData.Results)
        ) {
          companies = companiesData.Results;
        } else if (companiesData && Array.isArray(companiesData)) {
          companies = companiesData;
        }

        // Update companies in database
        if (companies.length > 0) {
          user.sageCompanies = [];
          for (const company of companies) {
            await user.addSageCompany({
              companyId: String(company.ID), // Ensure it's a string
              companyName:
                company.Name || company.DisplayName || `Company ${company.ID}`,
              companyDatabase: company.DatabaseName || String(company.ID),
            });
          }
          await user.save();
        }
      } catch (apiError) {
        console.error("Failed to refresh companies from Sage:", apiError);
        // Continue with cached companies if API call fails
      }
    }

    res.status(200).json({
      success: true,
      companies: user.sageCompanies || [],
      activeCompany: user.getActiveCompany(),
      totalCompanies: user.sageCompanies ? user.sageCompanies.length : 0,
    });
  } catch (error) {
    console.error("Get Sage companies error:", error);
    next(error);
  }
};

// @desc    Switch active Sage company
// @route   POST /api/sage/switch-company
// @access  Private
const switchActiveCompany = async (req, res, next) => {
  try {
    const { companyId } = req.body;
    const user = await User.findById(req.user.id);

    if (!user.sageConnected) {
      return res.status(400).json({
        success: false,
        message: "Sage not connected. Please connect to Sage first.",
      });
    }

    if (!companyId) {
      return res.status(400).json({
        success: false,
        message: "Company ID is required",
      });
    }

    // Check if company exists in user's companies
    const company = user.sageCompanies.find((c) => c.companyId === companyId);
    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found in your connected companies",
      });
    }

    // Switch active company
    await user.setActiveCompany(companyId);

    res.status(200).json({
      success: true,
      message: "Active company switched successfully",
      activeCompany: user.getActiveCompany(),
      activeCompanyId: user.activeCompanyId,
    });
  } catch (error) {
    console.error("Switch active company error:", error);
    next(error);
  }
};

// @desc    Get Sage items
// @route   GET /api/sage/items
// @access  Private
const getSageItems = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select(
      "+sageEmail +sagePassword +sageApiKey"
    );

    if (!user.sageConnected) {
      return res.status(400).json({
        success: false,
        message: "Sage not connected. Please connect to Sage first.",
      });
    }

    const activeCompany = user.getActiveCompany();
    if (!activeCompany) {
      return res.status(400).json({
        success: false,
        message: "No active company selected. Please select a company first.",
      });
    }

    try {
      // Fetch items from Sage API
      const itemsResponse = await makeSageApiCall(
        user,
        SAGE_CONFIG.itemsEndpoint,
        {
          companyId: activeCompany.companyId,
          includeAdditionalItemPrices: true,
          includeAttachments: false,
        }
      );

      const itemsData = itemsResponse.data;

      // Handle the response structure - check if it has Results array
      let items = [];
      if (itemsData && itemsData.Results && Array.isArray(itemsData.Results)) {
        items = itemsData.Results;
      } else if (itemsData && Array.isArray(itemsData)) {
        items = itemsData;
      }

      // Transform items to a more frontend-friendly format
      const transformedItems = items.map((item) => ({
        id: item.ID,
        code: item.Code,
        description: item.Description,
        active: item.Active,
        priceInclusive: item.PriceInclusive,
        priceExclusive: item.PriceExclusive,
        physical: item.Physical,
        quantityOnHand: item.QuantityOnHand,
        quantityReserved: item.QuantityReserved,
        lastCost: item.LastCost,
        averageCost: item.AverageCost,
        unit: item.Unit,
        taxTypeIdSales: item.TaxTypeIdSales,
        taxTypeIdPurchases: item.TaxTypeIdPurchases,
        itemReportingGroupSalesName: item.ItemReportingGroupSalesName,
        itemReportingGroupPurchasesName: item.ItemReportingGroupPurchasesName,
        prescribedGoods: item.PrescribedGoods,
        hasActivity: item.HasActivity,
        created: item.Created,
        modified: item.Modified,
        additionalItemPrices: item.AdditionalItemPrices || [],
      }));

      res.status(200).json({
        success: true,
        totalResults: itemsData.TotalResults || items.length,
        returnedResults: itemsData.ReturnedResults || items.length,
        items: transformedItems,
        activeCompany: {
          id: activeCompany.companyId,
          name: activeCompany.companyName,
        },
      });
    } catch (apiError) {
      console.error("Failed to fetch items from Sage:", apiError);

      if (
        apiError.response?.status === 401 ||
        apiError.response?.status === 403
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid credentials or insufficient permissions to access items.",
        });
      }

      return res.status(500).json({
        success: false,
        message: "Failed to fetch items from Sage API.",
        error: apiError.message,
      });
    }
  } catch (error) {
    console.error("Get Sage items error:", error);
    next(error);
  }
};

// @desc    Get Sage customers
// @route   GET /api/sage/customers
// @access  Private
const getSageCustomers = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select(
      "+sageEmail +sagePassword +sageApiKey"
    );

    if (!user.sageConnected) {
      return res.status(400).json({
        success: false,
        message: "Sage not connected. Please connect to Sage first.",
      });
    }

    const activeCompany = user.getActiveCompany();
    if (!activeCompany) {
      return res.status(400).json({
        success: false,
        message: "No active company selected. Please select a company first.",
      });
    }

    try {
      // Fetch customers from Sage API
      const customersResponse = await makeSageApiCall(
        user,
        SAGE_CONFIG.customersEndpoint,
        {
          companyId: activeCompany.companyId,
          includeSalesRepDetails: true,
        }
      );

      const customersData = customersResponse.data;

      // Handle the response structure - check if it has Results array
      let customers = [];
      if (
        customersData &&
        customersData.Results &&
        Array.isArray(customersData.Results)
      ) {
        customers = customersData.Results;
      } else if (customersData && Array.isArray(customersData)) {
        customers = customersData;
      }

      // Transform customers to a more frontend-friendly format
      const transformedCustomers = customers.map((customer) => ({
        id: customer.ID,
        name: customer.Name,
        taxReference: customer.TaxReference,
        contactName: customer.ContactName,
        telephone: customer.Telephone,
        fax: customer.Fax,
        mobile: customer.Mobile,
        email: customer.Email,
        webAddress: customer.WebAddress,
        active: customer.Active,
        isObfuscated: customer.IsObfuscated,
        balance: customer.Balance,
        creditLimit: customer.CreditLimit,
        communicationMethod: customer.CommunicationMethod,
        postalAddress: {
          line1: customer.PostalAddress01,
          line2: customer.PostalAddress02,
          line3: customer.PostalAddress03,
          line4: customer.PostalAddress04,
          line5: customer.PostalAddress05,
        },
        deliveryAddress: {
          line1: customer.DeliveryAddress01,
          line2: customer.DeliveryAddress02,
          line3: customer.DeliveryAddress03,
          line4: customer.DeliveryAddress04,
          line5: customer.DeliveryAddress05,
        },
        autoAllocateToOldestInvoice: customer.AutoAllocateToOldestInvoice,
        enableCustomerZone: customer.EnableCustomerZone,
        customerZoneGuid: customer.CustomerZoneGuid,
        cashSale: customer.CashSale,
        textFields: {
          field1: customer.TextField1,
          field2: customer.TextField2,
          field3: customer.TextField3,
        },
        yesNoFields: {
          field1: customer.YesNoField1,
          field2: customer.YesNoField2,
          field3: customer.YesNoField3,
        },
        defaultPriceListName: customer.DefaultPriceListName,
        acceptsElectronicInvoices: customer.AcceptsElectronicInvoices,
        defaultDiscountPercentage: customer.DefaultDiscountPercentage,
        dueDateMethodId: customer.DueDateMethodId,
        dueDateMethodValue: customer.DueDateMethodValue,
        accountingAgreement: customer.AccountingAgreement,
        hasSpecialCountryTaxActivity: customer.HasSpecialCountryTaxActivity,
        subjectToDRCVat: customer.SubjectToDRCVat,
        hasActivity: customer.HasActivity,
        created: customer.Created,
        modified: customer.Modified,
      }));

      res.status(200).json({
        success: true,
        totalResults: customersData.TotalResults || customers.length,
        returnedResults: customersData.ReturnedResults || customers.length,
        customers: transformedCustomers,
        activeCompany: {
          id: activeCompany.companyId,
          name: activeCompany.companyName,
        },
      });
    } catch (apiError) {
      console.error("Failed to fetch customers from Sage:", apiError);

      if (
        apiError.response?.status === 401 ||
        apiError.response?.status === 403
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid credentials or insufficient permissions to access customers.",
        });
      }

      return res.status(500).json({
        success: false,
        message: "Failed to fetch customers from Sage API.",
        error: apiError.message,
      });
    }
  } catch (error) {
    console.error("Get Sage customers error:", error);
    next(error);
  }
};

// @desc    Get Sage sales by item (for calculating today's sales)
// @route   POST /api/sage/sales
// @access  Private
const getSageSales = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select(
      "+sageEmail +sagePassword +sageApiKey"
    );

    if (!user.sageConnected) {
      return res.status(400).json({
        success: false,
        message: "Sage not connected. Please connect to Sage first.",
      });
    }

    const activeCompany = user.getActiveCompany();
    if (!activeCompany) {
      return res.status(400).json({
        success: false,
        message: "No active company selected. Please select a company first.",
      });
    }

    // Get date range from request body or default to today
    const { FromDate, ToDate } = req.body;

    // If no dates provided, default to today
    const today = new Date();
    const defaultFromDate = today.toISOString().split("T")[0]; // YYYY-MM-DD format
    const defaultToDate = defaultFromDate;

    try {
      const headers = createSageHeaders(user);

      const salesResponse = await axios.post(
        `${SAGE_CONFIG.baseUrl}${SAGE_CONFIG.salesByItemEndpoint}`,
        {
          FromDate: FromDate || defaultFromDate,
          ToDate: ToDate || defaultToDate,
        },
        {
          params: {
            companyId: activeCompany.companyId,
            apikey: user.sageApiKey,
          },
          headers,
        }
      );

      const salesData = salesResponse.data;

      // Handle the response structure - check if it has Results array
      let salesItems = [];
      if (salesData && salesData.Results && Array.isArray(salesData.Results)) {
        salesItems = salesData.Results;
      } else if (salesData && Array.isArray(salesData)) {
        salesItems = salesData;
      }

      // Calculate total sales from all items
      const totalSales = salesItems.reduce((total, item) => {
        return total + (item.TotalSelling || 0);
      }, 0);

      // Transform sales data for frontend
      const transformedSales = salesItems.map((item) => ({
        id: item.ID,
        transactionId: item.TransactionID,
        documentTypeId: item.DocumentTypeId,
        itemCode: item.ItemCode,
        itemDescription: item.ItemDescription,
        itemCodeAndDescription: item.ItemCodeAndDescription,
        unitPriceExclusive: item.UnitPriceExclusive || 0,
        quantity: item.Quantity || 0,
        totalCost: item.TotalCost || 0,
        totalSelling: item.TotalSelling || 0,
        date: item.Date,
        lastCost: item.LastCost || 0,
        priceExclusive: item.PriceExclusive || 0,
        gpAmount: item.GPAmount || 0,
        gpPercentage: item.GPPercentage || 0,
      }));

      res.status(200).json({
        success: true,
        totalResults: salesData.TotalResults || salesItems.length,
        returnedResults: salesData.ReturnedResults || salesItems.length,
        dateRange: {
          fromDate: FromDate || defaultFromDate,
          toDate: ToDate || defaultToDate,
        },
        totalSales: totalSales,
        salesItems: transformedSales,
        activeCompany: {
          id: activeCompany.companyId,
          name: activeCompany.companyName,
        },
      });
    } catch (apiError) {
      console.error("Failed to fetch sales from Sage:", apiError);

      if (
        apiError.response?.status === 401 ||
        apiError.response?.status === 403
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid credentials or insufficient permissions to access sales data.",
        });
      }

      return res.status(500).json({
        success: false,
        message: "Failed to fetch sales data from Sage API.",
        error: apiError.message,
      });
    }
  } catch (error) {
    console.error("Get Sage sales error:", error);
    next(error);
  }
};

module.exports = {
  connectSageWithApiKey,
  disconnectSage,
  getSageStatus,
  getSageCompanies,
  switchActiveCompany,
  getSageItems,
  getSageCustomers,
  getSageSales,
};
