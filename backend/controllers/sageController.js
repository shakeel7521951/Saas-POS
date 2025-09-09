const User = require("../models/User");
const axios = require("axios");

// Sage API Configuration
const SAGE_CONFIG = {
  baseUrl: "http://resellers.accounting.sageone.co.za/api/2.0.0",
  companiesEndpoint: "/Company/Get",
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

module.exports = {
  connectSageWithApiKey,
  disconnectSage,
  getSageStatus,
  getSageCompanies,
  switchActiveCompany,
};
