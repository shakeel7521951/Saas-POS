const express = require("express");
const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  deactivateUser,
  activateUser,
  getUserStats,
} = require("../controllers/userController");
const { protect, authorize } = require("../middleware/auth");
const { validateRegister } = require("../middleware/validation");

const router = express.Router();

// All routes are protected and require admin access
router.use(protect);
router.use(authorize("admin", "super_admin"));

router.route("/").get(getUsers).post(validateRegister, createUser);

router.get("/stats", getUserStats);

router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

router.put("/:id/deactivate", deactivateUser);
router.put("/:id/activate", activateUser);

module.exports = router;
