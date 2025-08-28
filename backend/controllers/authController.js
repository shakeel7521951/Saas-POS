const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Generate JWT token and set cookie
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() +
        (parseInt(process.env.JWT_COOKIE_EXPIRE) || 7) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true, // Prevent XSS attacks
    secure: process.env.NODE_ENV === "production", // Use secure cookies in production
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // CSRF protection
    path: "/", // Cookie available for all routes
  };

  // Remove password from output
  user.password = undefined;

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({
      success: true,
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        phone: user.phone,
        isActive: user.isActive,
        isEmailVerified: user.isEmailVerified,
        lastLogin: user.lastLogin,
        createdAt: user.createdAt,
      },
    });
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, phone, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User with this email already exists",
      });
    }

    // Create user (company will be set after Sage OAuth)
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      phone,
      role: role || "manager", // Default to 'manager' role
    });

    sendTokenResponse(user, 201, res);
  } catch (error) {
    console.error("Registration error:", error);
    next(error);
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide an email and password",
      });
    }

    // Use the static method for authentication with account locking
    const result = await User.getAuthenticated(email, password);

    if (!result.success) {
      return res.status(401).json({
        success: false,
        message: result.message,
      });
    }

    sendTokenResponse(result.user, 200, res);
  } catch (error) {
    console.error("Login error:", error);
    next(error);
  }
};

// @desc    Log user out / clear cookie
// @route   POST /api/auth/logout
// @access  Private
const logout = async (req, res, next) => {
  try {
    res.cookie("token", "none", {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
    });

    res.status(200).json({
      success: true,
      message: "Successfully logged out",
    });
  } catch (error) {
    console.error("Logout error:", error);
    next(error);
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        phone: user.phone,
        isActive: user.isActive,
        isEmailVerified: user.isEmailVerified,
        lastLogin: user.lastLogin,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Get me error:", error);
    next(error);
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/updateprofile
// @access  Private
const updateProfile = async (req, res, next) => {
  try {
    const fieldsToUpdate = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
    };

    // Remove undefined fields
    Object.keys(fieldsToUpdate).forEach(
      (key) => fieldsToUpdate[key] === undefined && delete fieldsToUpdate[key]
    );

    const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        phone: user.phone,
        isActive: user.isActive,
        isEmailVerified: user.isEmailVerified,
        lastLogin: user.lastLogin,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Update profile error:", error);
    next(error);
  }
};

// @desc    Update password
// @route   PUT /api/auth/updatepassword
// @access  Private
const updatePassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("+password");

    // Check current password
    if (
      !(await user.correctPassword(req.body.currentPassword, user.password))
    ) {
      return res.status(401).json({
        success: false,
        message: "Current password is incorrect",
      });
    }

    user.password = req.body.newPassword;
    await user.save();

    sendTokenResponse(user, 200, res);
  } catch (error) {
    console.error("Update password error:", error);
    next(error);
  }
};

// @desc    Verify token (for frontend route protection)
// @route   GET /api/auth/verify
// @access  Private
const verifyToken = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      valid: true,
      user: {
        id: req.user._id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        fullName: req.user.fullName,
        email: req.user.email,
        role: req.user.role,
        phone: req.user.phone,
        isActive: req.user.isActive,
        isEmailVerified: req.user.isEmailVerified,
        lastLogin: req.user.lastLogin,
        createdAt: req.user.createdAt,
      },
    });
  } catch (error) {
    console.error("Verify token error:", error);
    next(error);
  }
};

// @desc    Get current logged in user with Sage companies
// @route   GET /api/auth/me-detailed
// @access  Private
const getMeDetailed = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    const activeCompany = user.getActiveCompany();

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        phone: user.phone,
        isActive: user.isActive,
        isEmailVerified: user.isEmailVerified,
        lastLogin: user.lastLogin,
        createdAt: user.createdAt,
        sageConnected: user.sageConnected,
        sageCompanies: user.sageCompanies,
        activeCompany: activeCompany,
        activeCompanyId: user.activeCompanyId,
      },
    });
  } catch (error) {
    console.error("Get me detailed error:", error);
    next(error);
  }
};

// @desc    Get user account activity/sessions
// @route   GET /api/auth/activity
// @access  Private
const getAccountActivity = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    // Mock activity data - in a real app you'd have a sessions/activity log table
    const activityData = {
      lastLogin: user.lastLogin,
      loginAttempts: user.loginAttempts || 0,
      accountCreated: user.createdAt,
      profileLastUpdated: user.updatedAt,
      activeSessions: 1, // This would come from a session store like Redis
      recentActivity: [
        {
          action: "Login",
          timestamp: user.lastLogin,
          location: "Unknown", // Would need geolocation service
          device: "Unknown", // Would need user-agent parsing
        },
      ],
    };

    res.status(200).json({
      success: true,
      activity: activityData,
    });
  } catch (error) {
    console.error("Get account activity error:", error);
    next(error);
  }
};

module.exports = {
  register,
  login,
  logout,
  getMe,
  getMeDetailed,
  getAccountActivity,
  updateProfile,
  updatePassword,
  verifyToken,
};
