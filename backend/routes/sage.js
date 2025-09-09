const express = require("express");
const {
  connectSageWithApiKey,
  disconnectSage,
  getSageStatus,
  getSageCompanies,
  switchActiveCompany,
  getSageItems,
  getSageCustomers,
  getSageSales,
} = require("../controllers/sageController");
const { protect } = require("../middleware/auth");

const router = express.Router();

// Protected routes (require authentication)
router.post("/connect", protect, connectSageWithApiKey);
router.get("/status", protect, getSageStatus);
router.get("/companies", protect, getSageCompanies);
router.get("/items", protect, getSageItems);
router.get("/customers", protect, getSageCustomers);
router.post("/sales", protect, getSageSales);
router.post("/switch-company", protect, switchActiveCompany);
router.delete("/disconnect", protect, disconnectSage);

module.exports = router;
