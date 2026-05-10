const Task = require("../models/Task");

// @route  POST /api/tasks
// @access Admin only
const createTask = async (req, res) => {
  try {
    const { title, description, project, assignedTo, dueDate } = req.body;

    if (!title || !project || !assignedTo) {
      return res
        .status(400)
        .json({ message: "Title, project and assignedTo are required" });
    }

    const task = await Task.create({
      title,
      description,
      project,
      assignedTo,
      dueDate,
    });

    res.status(201).json({
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @route  GET /api/tasks
// @access Admin + Member
const getTasks = async (req, res) => {
  try {
    let tasks;

    if (req.user.role === "admin") {
      // Admin sees all tasks
      tasks = await Task.find()
        .populate("assignedTo", "name email")
        .populate("project", "title");
    } else {
      // Member sees only tasks assigned to them
      tasks = await Task.find({ assignedTo: req.user._id })
        .populate("assignedTo", "name email")
        .populate("project", "title");
    }

    res.status(200).json({
      message: "Tasks fetched successfully",
      tasks,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @route  PATCH /api/tasks/:id/status
// @access Member only
const updateTaskStatus = async (req, res) => {
  try {
    const { status, workNote } = req.body;

    const allowedStatuses = ["pending", "in-progress", "completed"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    // Find task and make sure it is assigned to the logged-in member
    const task = await Task.findOne({
      _id: req.params.id,
      assignedTo: req.user._id,
    });

    if (!task) {
      return res
        .status(404)
        .json({ message: "Task not found or not assigned to you" });
    }

    task.status = status;
    task.workNote = workNote || "";
    await task.save();

    res.status(200).json({
      message: "Task status updated successfully",
      task,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getTasksByProject = async (req, res) => {
  try {
    const tasks = await Task.find({
      project: req.params.projectId,
    })
      .populate("assignedTo", "name email")
      .populate("project", "title");

    res.status(200).json({
      message: "Project tasks fetched successfully",
      tasks,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTaskStatus,
  getTasksByProject,
};
