const Task = require("../models/Task");

// @route  GET /api/dashboard
// @access Admin + Member
const getDashboardStats = async (req, res) => {
  try {
    // Base filter — admin sees all tasks, member sees only their own
    const filter =
      req.user.role === "admin" ? {} : { assignedTo: req.user._id };

    const totalTasks = await Task.countDocuments(filter);
    const completedTasks = await Task.countDocuments({
      ...filter,
      status: "completed",
    });
    const pendingTasks = await Task.countDocuments({
      ...filter,
      status: "pending",
    });
    const inProgressTasks = await Task.countDocuments({
      ...filter,
      status: "in-progress",
    });
    const overdueTasks = await Task.countDocuments({
      ...filter,
      dueDate: { $lt: new Date() },
      status: { $ne: "completed" },
    });

    res.status(200).json({
      message: "Dashboard stats fetched successfully",
      totalTasks,
      completedTasks,
      pendingTasks,
      inProgressTasks,
      overdueTasks,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { getDashboardStats };
