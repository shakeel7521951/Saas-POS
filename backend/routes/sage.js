const express = require("express");
const {
  connectSageWithApiKey,
  disconnectSage,
  getSageStatus,
  getSageCompanies,
  switchActiveCompany,
} = require("../controllers/sageController");
const { protect } = require("../middleware/auth");

const router = express.Router();

// Protected routes (require authentication)
router.post("/connect", protect, connectSageWithApiKey);
router.get("/status", protect, getSageStatus);
router.get("/companies", protect, getSageCompanies);
router.post("/switch-company", protect, switchActiveCompany);
router.delete("/disconnect", protect, disconnectSage);

module.exports = router;
