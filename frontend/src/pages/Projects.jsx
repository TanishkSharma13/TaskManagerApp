import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const Projects = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const fetchProjects = async () => {
    try {
      const res = await api.get("/projects");

      setProjects(res.data.projects);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();

    try {
      await api.post("/projects", {
        ...formData,
        members: [],
      });

      setFormData({
        title: "",
        description: "",
      });

      fetchProjects();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create project");
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-[70vh]">
          <h1 className="text-2xl font-semibold text-zinc-400">
            Loading projects...
          </h1>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div>
        <h1 className="text-5xl font-extrabold mb-10 tracking-tight">
          Projects
        </h1>

        {/* Create Project */}
        {user?.role === "admin" && (
          <form
            onSubmit={handleCreateProject}
            className="max-w-4xl bg-linear-to-br from-zinc-800 to-zinc-900 border border-zinc-700 p-8 rounded-3xl shadow-xl mb-12 space-y-6"
          >
            <h2 className="text-3xl font-bold">Create Project</h2>

            <input
              type="text"
              name="title"
              placeholder="Project Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-5 rounded-2xl bg-zinc-900 border border-zinc-700 outline-none text-lg focus:border-blue-500 transition"
              required
            />

            <textarea
              name="description"
              placeholder="Project Description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full p-5 rounded-2xl bg-zinc-900 border border-zinc-700 outline-none text-lg focus:border-blue-500 transition resize-none"
            />

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300 hover:scale-[1.02]"
            >
              Create Project
            </button>
          </form>
        )}

        {/* Project Cards */}
        {projects.length === 0 ? (
          <div className="bg-zinc-800 rounded-3xl p-12 text-center border border-zinc-700">
            <h2 className="text-3xl font-bold mb-4">No Projects Yet</h2>

            <p className="text-zinc-400 text-lg">
              Create your first project to get started.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project._id}
                onClick={() => navigate(`/projects/${project._id}`)}
                className="bg-linear-to-br from-zinc-800 to-zinc-900 border border-zinc-700 p-8 rounded-3xl shadow-xl hover:scale-[1.02] hover:border-blue-500 transition-all duration-300 cursor-pointer"
              >
                <h2 className="text-3xl font-bold mb-4 tracking-tight">
                  {project.title}
                </h2>

                <p className="text-zinc-400 text-lg leading-relaxed mb-6">
                  {project.description}
                </p>

                <p className="text-base text-zinc-500 font-medium">
                  Members: {project.members.length}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default Projects;
