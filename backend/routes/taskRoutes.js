const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const { allowRoles } = require("../middleware/roleMiddleware");

const {
  createTask,
  getTasks,
  updateTaskStatus,
  getTasksByProject,
} = require("../controllers/taskController");

// @route  POST /api/tasks
// @access Admin only
router.post("/", protect, allowRoles("admin"), createTask);

// @route  GET /api/tasks
// @access Admin + Member
router.get("/", protect, allowRoles("admin", "member"), getTasks);

router.get(
  "/project/:projectId",
  protect,
  allowRoles("admin", "member"),
  getTasksByProject,
);

// @route  PATCH /api/tasks/:id/status
// @access Member only
router.patch("/:id/status", protect, allowRoles("member"), updateTaskStatus);

module.exports = router;
