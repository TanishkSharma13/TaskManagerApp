const Project = require("../models/Project");

// @route  POST /api/projects
// @access Admin only
const createProject = async (req, res) => {
  try {
    const { title, description, members } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Project title is required" });
    }

    const project = await Project.create({
      title,
      description,
      members: members || [],
      createdBy: req.user._id,
    });

    res.status(201).json({
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @route  GET /api/projects
// @access Admin + Member
const getProjects = async (req, res) => {
  try {
    let projects;

    if (req.user.role === "admin") {
      // Admin sees all projects they created
      projects = await Project.find({ createdBy: req.user._id })
        .populate("members", "name email")
        .populate("createdBy", "name email");
    } else {
      // Member sees only projects they are part of
      projects = await Project.find({ members: req.user._id })
        .populate("members", "name email")
        .populate("createdBy", "name email");
    }

    res.status(200).json({
      message: "Projects fetched successfully",
      projects,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate("members", "name email")
      .populate("createdBy", "name email");

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.status(200).json({
      message: "Project fetched successfully",
      project,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  createProject,
  getProjects,
  getProjectById,
};
