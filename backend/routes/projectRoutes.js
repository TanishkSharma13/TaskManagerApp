const express = require("express");
const router = express.Router();

const {
  createProject,
  getProjects,
  getProjectById,
} = require("../controllers/projectController");

const protect = require("../middleware/authMiddleware");

const { allowRoles } = require("../middleware/roleMiddleware");

// @route POST /api/projects
// @access Admin only
router.post("/", protect, allowRoles("admin"), createProject);

// @route GET /api/projects
// @access Admin + Member
router.get("/", protect, allowRoles("admin", "member"), getProjects);

// @route GET /api/projects/:id
// @access Admin + Member
router.get("/:id", protect, allowRoles("admin", "member"), getProjectById);

module.exports = router;
