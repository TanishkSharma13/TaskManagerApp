import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";

const Tasks = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [tasks, setTasks] = useState([]);
  const [members, setMembers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    project: "",
    assignedTo: "",
    dueDate: "",
  });

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");

      setTasks(res.data.tasks);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const fetchMembers = async () => {
    try {
      const res = await api.get("/auth/members");
      setMembers(res.data);
    } catch (error) {
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await api.get("/projects");
      setProjects(res.data.projects);
    } catch (error) {
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchProjects();

    if (user?.role === "admin") {
      fetchMembers();
    }
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();

    try {
      await api.post("/tasks", formData);

      setFormData({
        title: "",
        description: "",
        project: "",
        assignedTo: "",
        dueDate: "",
      });

      fetchTasks();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create task");
    }
  };

  const updateTaskStatus = async (taskId, status) => {
    try {
      await api.patch(`/tasks/${taskId}/status`, {
        status,
      });

      fetchTasks();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to update status");
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-[70vh]">
          <h1 className="text-2xl font-semibold text-zinc-400">
            Loading tasks...
          </h1>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div>
        <h1 className="text-5xl font-extrabold mb-10 tracking-tight">Tasks</h1>

        {/* Create Task */}
        {user?.role === "admin" && (
          <form
            onSubmit={handleCreateTask}
            className="max-w-5xl bg-linear-to-br from-zinc-800 to-zinc-900 border border-zinc-700 p-8 rounded-3xl shadow-xl mb-12 space-y-6"
          >
            <h2 className="text-3xl font-bold">Create Task</h2>

            <input
              type="text"
              name="title"
              placeholder="Task Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-5 rounded-2xl bg-zinc-900 border border-zinc-700 outline-none text-lg focus:border-blue-500 transition"
              required
            />

            <textarea
              name="description"
              placeholder="Task Description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full p-5 rounded-2xl bg-zinc-900 border border-zinc-700 outline-none text-lg focus:border-blue-500 transition resize-none"
            />

            <select
              name="project"
              value={formData.project}
              onChange={handleChange}
              className="w-full p-5 rounded-2xl bg-zinc-900 border border-zinc-700 outline-none text-lg focus:border-blue-500 transition"
              required
            >
              <option value="">Select Project</option>

              {projects.map((project) => (
                <option key={project._id} value={project._id}>
                  {project.title}
                </option>
              ))}
            </select>

            <select
              value={formData.assignedTo}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  assignedTo: e.target.value,
                })
              }
              className="w-full p-5 rounded-2xl bg-zinc-900 border border-zinc-700 outline-none text-lg focus:border-blue-500 transition"
              required
            >
              <option value="">Assign Member</option>

              {members.map((member) => (
                <option key={member._id} value={member._id}>
                  {member.name} ({member.email})
                </option>
              ))}
            </select>

            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="w-full p-5 rounded-2xl bg-zinc-900 border border-zinc-700 outline-none text-lg focus:border-blue-500 transition"
            />

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 hover:scale-[1.02]"
            >
              Create Task
            </button>
          </form>
        )}

        {/* Task Cards */}
        {tasks.length === 0 ? (
          <div className="bg-zinc-800 rounded-3xl p-12 text-center border border-zinc-700">
            <h2 className="text-3xl font-bold mb-4">No Tasks Yet</h2>

            <p className="text-zinc-400 text-lg">
              Tasks will appear here once created.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {tasks.map((task) => (
              <div
                key={task._id}
                className="bg-linear-to-br from-zinc-800 to-zinc-900 border border-zinc-700 p-8 rounded-3xl shadow-xl hover:scale-[1.02] hover:border-blue-500 transition-all duration-300"
              >
                <h2 className="text-3xl font-bold mb-4 tracking-tight">
                  {task.title}
                </h2>

                <p className="text-zinc-400 text-lg leading-relaxed mb-6">
                  {task.description}
                </p>

                {task.workNote && (
                  <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-4 mb-5">
                    <p className="text-sm text-zinc-500 mb-2">Work Update</p>

                    <p className="text-zinc-300 leading-relaxed">
                      {task.workNote}
                    </p>
                  </div>
                )}

                <div className="mb-5">
                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      task.status === "completed"
                        ? "bg-green-500/20 text-green-400 border border-green-500/30"
                        : task.status === "pending"
                          ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                          : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                    }`}
                  >
                    {task.status}
                  </span>
                </div>

                <p className="text-base text-zinc-500 mb-6">
                  Project: {task.project?.title}
                </p>

                {user?.role === "member" && (
                  <div className="space-y-4">
                    <textarea
                      placeholder="Add work update..."
                      defaultValue={task.workNote}
                      onBlur={async (e) => {
                        try {
                          await api.patch(`/tasks/${task._id}/status`, {
                            status: task.status,
                            workNote: e.target.value,
                          });

                          fetchTasks();
                        } catch (error) {
                          alert("Failed to update work note");
                        }
                      }}
                      className="w-full p-4 rounded-2xl bg-zinc-900 border border-zinc-700 outline-none text-base resize-none"
                      rows="3"
                    />

                    <select
                      value={task.status}
                      onChange={async (e) => {
                        try {
                          await api.patch(`/tasks/${task._id}/status`, {
                            status: e.target.value,
                            workNote: task.workNote || "",
                          });

                          fetchTasks();
                        } catch (error) {
                          alert("Failed to update status");
                        }
                      }}
                      className="w-full p-4 rounded-2xl bg-zinc-900 border border-zinc-700 outline-none text-lg"
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Tasks;
