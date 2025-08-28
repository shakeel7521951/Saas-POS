const express = require("express");
const {
  getSageAuthUrl,
  handleSageCallback,
  disconnectSage,
  getSageStatus,
  refreshSageToken,
  getSageCompanies,
  switchActiveCompany,
} = require("../controllers/sageController");
const { protect } = require("../middleware/auth");

const router = express.Router();

// Protected routes (require authentication)
router.get("/auth-url", protect, getSageAuthUrl);
router.get("/status", protect, getSageStatus);
router.post("/refresh-token", protect, refreshSageToken);
router.get("/companies", protect, getSageCompanies);
router.post("/switch-company", protect, switchActiveCompany);
router.delete("/disconnect", protect, disconnectSage);

// Public route for OAuth callback (validates state internally)
router.post("/callback", handleSageCallback);

module.exports = router;
