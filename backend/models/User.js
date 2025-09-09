const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      maxlength: [50, "First name cannot be more than 50 characters"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      maxlength: [50, "Last name cannot be more than 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false, // Don't include password in queries by default
    },
    role: {
      type: String,
      enum: ["manager", "admin", "super_admin"],
      default: "manager",
    },
    phone: {
      type: String,
      trim: true,
      match: [/^\+?[\d\s-()]+$/, "Please provide a valid phone number"],
    },
    // Sage Account Integration Fields
    sageConnected: {
      type: Boolean,
      default: false,
    },
    sageEmail: {
      type: String,
      select: false, // Don't include in queries by default
    },
    sagePassword: {
      type: String,
      select: false, // Don't include in queries by default
    },
    sageApiKey: {
      type: String,
      select: false, // Don't include in queries by default
    },
    sageConnectedAt: {
      type: Date,
    },
    // Array of Sage companies the user has access to
    sageCompanies: [
      {
        companyId: {
          type: String,
          required: true,
        },
        companyName: {
          type: String,
          required: true,
        },
        companyDatabase: {
          type: String,
          required: true,
        },
        isActive: {
          type: Boolean,
          default: false, // Only one company can be active at a time
        },
        addedAt: {
          type: Date,
          default: Date.now,
        },
        lastSyncAt: {
          type: Date,
          default: null,
        },
        syncEnabled: {
          type: Boolean,
          default: true,
        },
      },
    ],
    // Currently selected company for POS operations
    activeCompanyId: {
      type: String,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    lastLogin: {
      type: Date,
    },
    loginAttempts: {
      type: Number,
      default: 0,
    },
    lockUntil: {
      type: Date,
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
    emailVerificationToken: String,
    emailVerificationExpires: Date,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for full name
userSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});

// Virtual for account lock status
userSchema.virtual("isLocked").get(function () {
  return !!(this.lockUntil && this.lockUntil > Date.now());
});

// Index for performance
userSchema.index({ role: 1 });
userSchema.index({ isActive: 1 });

// Pre-save middleware to hash password
userSchema.pre("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) return next();

  try {
    // Hash the password with cost of 12
    const salt = await bcrypt.genSalt(
      parseInt(process.env.BCRYPT_SALT_ROUNDS) || 12
    );
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Instance method to check password
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// Instance method to generate JWT token
userSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Instance method to handle failed login attempts
userSchema.methods.incLoginAttempts = function () {
  // If we have a previous lock that has expired, restart at 1
  if (this.lockUntil && this.lockUntil < Date.now()) {
    return this.updateOne({
      $unset: { lockUntil: 1 },
      $set: { loginAttempts: 1 },
    });
  }

  const updates = { $inc: { loginAttempts: 1 } };

  // Lock account after 5 failed attempts for 2 hours
  if (this.loginAttempts + 1 >= 5 && !this.isLocked) {
    updates.$set = { lockUntil: Date.now() + 2 * 60 * 60 * 1000 }; // 2 hours
  }

  return this.updateOne(updates);
};

// Instance method to reset login attempts
userSchema.methods.resetLoginAttempts = function () {
  return this.updateOne({
    $unset: { loginAttempts: 1, lockUntil: 1 },
  });
};

// Instance methods for Sage company management
userSchema.methods.addSageCompany = function (companyData) {
  // Check if company already exists
  const existingCompany = this.sageCompanies.find(
    (company) => company.companyId === companyData.companyId
  );

  if (existingCompany) {
    // Update existing company
    existingCompany.companyName = companyData.companyName;
    existingCompany.companyDatabase = companyData.companyDatabase;
    existingCompany.syncEnabled =
      companyData.syncEnabled !== undefined ? companyData.syncEnabled : true;
  } else {
    // Add new company
    this.sageCompanies.push({
      companyId: companyData.companyId,
      companyName: companyData.companyName,
      companyDatabase: companyData.companyDatabase,
      isActive: this.sageCompanies.length === 0, // First company becomes active
      syncEnabled:
        companyData.syncEnabled !== undefined ? companyData.syncEnabled : true,
    });
  }

  // Set active company if this is the first one or no active company exists
  if (!this.activeCompanyId || this.sageCompanies.length === 1) {
    this.activeCompanyId = companyData.companyId;
    this.sageCompanies.forEach((company) => {
      company.isActive = company.companyId === companyData.companyId;
    });
  }

  return this.save();
};

userSchema.methods.setActiveCompany = function (companyId) {
  const company = this.sageCompanies.find((c) => c.companyId === companyId);
  if (!company) {
    throw new Error("Company not found");
  }

  // Set all companies to inactive
  this.sageCompanies.forEach((c) => {
    c.isActive = false;
  });

  // Set the selected company as active
  company.isActive = true;
  this.activeCompanyId = companyId;

  return this.save();
};

userSchema.methods.removeSageCompany = function (companyId) {
  const companyIndex = this.sageCompanies.findIndex(
    (c) => c.companyId === companyId
  );
  if (companyIndex === -1) {
    throw new Error("Company not found");
  }

  const wasActive = this.sageCompanies[companyIndex].isActive;
  this.sageCompanies.splice(companyIndex, 1);

  // If we removed the active company, set the first remaining company as active
  if (wasActive && this.sageCompanies.length > 0) {
    this.sageCompanies[0].isActive = true;
    this.activeCompanyId = this.sageCompanies[0].companyId;
  } else if (this.sageCompanies.length === 0) {
    this.activeCompanyId = null;
    this.sageConnected = false;
  }

  return this.save();
};

userSchema.methods.getActiveCompany = function () {
  return this.sageCompanies.find((c) => c.isActive) || null;
};

userSchema.methods.updateCompanySync = function (
  companyId,
  lastSyncAt = new Date()
) {
  const company = this.sageCompanies.find((c) => c.companyId === companyId);
  if (company) {
    company.lastSyncAt = lastSyncAt;
    return this.save();
  }
  throw new Error("Company not found");
};

// Static method to get users by role
userSchema.statics.findByRole = function (role) {
  return this.find({ role, isActive: true });
};

// Static method for login with account locking
userSchema.statics.getAuthenticated = async function (email, password) {
  const user = await this.findOne({ email, isActive: true }).select(
    "+password"
  );

  if (!user) {
    return { success: false, message: "Invalid credentials" };
  }

  // Check if account is locked
  if (user.isLocked) {
    // Just increment login attempts and return
    await user.incLoginAttempts();
    return {
      success: false,
      message:
        "Account temporarily locked due to too many failed login attempts",
    };
  }

  // Test for a matching password
  const isMatch = await user.correctPassword(password, user.password);

  if (isMatch) {
    // If there's no lock and password matches, reset attempts and return user
    if (user.loginAttempts && !user.isLocked) {
      await user.resetLoginAttempts();
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    return { success: true, user };
  }

  // Password is incorrect, so increment login attempts
  await user.incLoginAttempts();
  return { success: false, message: "Invalid credentials" };
};

module.exports = mongoose.model("User", userSchema);
