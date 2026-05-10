const express = require("express");
const router = express.Router();
const { getDashboardStats } = require("../controllers/dashboardController");
const protect = require("../middleware/authMiddleware");
const { allowRoles } = require("../middleware/roleMiddleware");

// @route  GET /api/dashboard
// @access Admin + Member
router.get("/", protect, allowRoles("admin", "member"), getDashboardStats);

module.exports = router;
