const User = require("../models/User");
const axios = require("axios");

// Sage OAuth Configuration
const SAGE_CONFIG = {
  clientId: process.env.SAGE_CLIENT_ID,
  clientSecret: process.env.SAGE_CLIENT_SECRET,
  redirectUri:
    process.env.SAGE_REDIRECT_URI || "http://localhost:3000/auth/sage/callback",
  baseUrl: process.env.SAGE_BASE_URL || "https://www.sageone.com",
  apiUrl: process.env.SAGE_API_URL || "https://api.sageone.com/accounts/v1",
  scope: "full_access",
};

// @desc    Get Sage OAuth URL
// @route   GET /api/sage/auth-url
// @access  Private
const getSageAuthUrl = async (req, res, next) => {
  try {
    const state = req.user.id; // Use user ID as state for security

    const authUrl = `${
      SAGE_CONFIG.baseUrl
    }/oauth2/auth/central?response_type=code&client_id=${
      SAGE_CONFIG.clientId
    }&redirect_uri=${encodeURIComponent(SAGE_CONFIG.redirectUri)}&scope=${
      SAGE_CONFIG.scope
    }&state=${state}`;

    res.status(200).json({
      success: true,
      authUrl,
      message: "Sage authorization URL generated successfully",
    });
  } catch (error) {
    console.error("Get Sage auth URL error:", error);
    next(error);
  }
};

// @desc    Handle Sage OAuth callback
// @route   POST /api/sage/callback
// @access  Public (but validates state)
const handleSageCallback = async (req, res, next) => {
  try {
    const { code, state, error } = req.body;

    if (error) {
      return res.status(400).json({
        success: false,
        message: `Sage OAuth error: ${error}`,
      });
    }

    if (!code || !state) {
      return res.status(400).json({
        success: false,
        message: "Missing authorization code or state",
      });
    }

    // Find user by state (user ID)
    const user = await User.findById(state);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid state parameter",
      });
    }

    // Exchange code for access token
    const tokenResponse = await axios.post(
      `${SAGE_CONFIG.baseUrl}/oauth2/auth/central/token`,
      {
        client_id: SAGE_CONFIG.clientId,
        client_secret: SAGE_CONFIG.clientSecret,
        code,
        grant_type: "authorization_code",
        redirect_uri: SAGE_CONFIG.redirectUri,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token, refresh_token, expires_in } = tokenResponse.data;

    // Get user info from Sage
    const userInfoResponse = await axios.get(`${SAGE_CONFIG.apiUrl}/user`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        "X-Site": "gb", // Adjust based on region
      },
    });

    const sageUser = userInfoResponse.data;

    // Get companies from Sage
    const companiesResponse = await axios.get(
      `${SAGE_CONFIG.apiUrl}/companies`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "X-Site": "gb",
        },
      }
    );

    const companies = companiesResponse.data;

    // Update user with Sage information and companies
    user.sageConnected = true;
    user.sageAccessToken = access_token;
    user.sageRefreshToken = refresh_token;
    user.sageTokenExpires = new Date(Date.now() + expires_in * 1000);
    user.sageUserId = sageUser.id;
    user.sageSubscriptionKey = sageUser.subscription_key;

    // Clear existing companies and add new ones
    user.sageCompanies = [];

    // Add all available companies
    if (companies && companies.length > 0) {
      for (const company of companies) {
        await user.addSageCompany({
          companyId: company.id,
          companyName: company.name,
          companyDatabase: company.database_name || company.id,
        });
      }
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "Sage integration completed successfully",
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
    });
  } catch (error) {
    console.error("Sage callback error:", error);

    // Handle specific Sage API errors
    if (error.response?.status === 401) {
      return res.status(401).json({
        success: false,
        message: "Invalid Sage credentials or expired token",
      });
    }

    if (error.response?.status === 403) {
      return res.status(403).json({
        success: false,
        message: "Insufficient permissions for Sage access",
      });
    }

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
          sageAccessToken: 1,
          sageRefreshToken: 1,
          sageTokenExpires: 1,
          sageUserId: 1,
          sageSubscriptionKey: 1,
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
      tokenExpires: user.sageTokenExpires,
      isTokenExpired: user.sageTokenExpires
        ? new Date() > user.sageTokenExpires
        : false,
    });
  } catch (error) {
    console.error("Get Sage status error:", error);
    next(error);
  }
};

// @desc    Refresh Sage token
// @route   POST /api/sage/refresh-token
// @access  Private
const refreshSageToken = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("+sageRefreshToken");

    if (!user.sageRefreshToken) {
      return res.status(400).json({
        success: false,
        message: "No refresh token available. Please reconnect to Sage.",
      });
    }

    // Refresh the token
    const tokenResponse = await axios.post(
      `${SAGE_CONFIG.baseUrl}/oauth2/auth/central/token`,
      {
        client_id: SAGE_CONFIG.clientId,
        client_secret: SAGE_CONFIG.clientSecret,
        refresh_token: user.sageRefreshToken,
        grant_type: "refresh_token",
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { access_token, refresh_token, expires_in } = tokenResponse.data;

    // Update user with new tokens
    await User.findByIdAndUpdate(user._id, {
      sageAccessToken: access_token,
      sageRefreshToken: refresh_token || user.sageRefreshToken,
      sageTokenExpires: new Date(Date.now() + expires_in * 1000),
    });

    res.status(200).json({
      success: true,
      message: "Sage token refreshed successfully",
      tokenExpires: new Date(Date.now() + expires_in * 1000),
    });
  } catch (error) {
    console.error("Refresh Sage token error:", error);

    if (error.response?.status === 400) {
      return res.status(400).json({
        success: false,
        message: "Invalid refresh token. Please reconnect to Sage.",
      });
    }

    next(error);
  }
};

// @desc    Get Sage companies
// @route   GET /api/sage/companies
// @access  Private
const getSageCompanies = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("+sageAccessToken");

    if (!user.sageConnected) {
      return res.status(400).json({
        success: false,
        message: "Sage not connected. Please connect to Sage first.",
      });
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
  getSageAuthUrl,
  handleSageCallback,
  disconnectSage,
  getSageStatus,
  refreshSageToken,
  getSageCompanies,
  switchActiveCompany,
};
