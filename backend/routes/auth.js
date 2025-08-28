const express = require("express");
const {
  register,
  login,
  logout,
  getMe,
  getMeDetailed,
  getAccountActivity,
  updateProfile,
  updatePassword,
  verifyToken,
} = require("../controllers/authController");
const { protect } = require("../middleware/auth");
const {
  validateRegister,
  validateLogin,
  validateUpdateProfile,
  validateChangePassword,
} = require("../middleware/validation");

const router = express.Router();

// Public routes
router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.post("/logout", logout);

// Protected routes
router.get("/me", protect, getMe);
router.get("/me-detailed", protect, getMeDetailed);
router.get("/activity", protect, getAccountActivity);
router.get("/verify", protect, verifyToken);
router.put("/updateprofile", protect, validateUpdateProfile, updateProfile);
router.put("/updatepassword", protect, validateChangePassword, updatePassword);

module.exports = router;
