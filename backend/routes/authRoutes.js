const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getMembers,
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");
const protect = require("../middleware/authMiddleware");

const { allowRoles } = require("../middleware/roleMiddleware");

// @route GET /api/auth/admin
router.get("/admin", authMiddleware, allowRoles("admin"), (req, res) => {
  res.json({
    message: "Welcome Admin",
    user: req.user,
  });
});

// @route GET /api/auth/members
router.get("/members", protect, allowRoles("admin"), getMembers);

// @route POST /api/auth/register
router.post("/register", register);

// @route POST /api/auth/login
router.post("/login", login);

// @route GET /api/auth/me
router.get("/me", authMiddleware, (req, res) => {
  res.status(200).json(req.user);
});

module.exports = router;
