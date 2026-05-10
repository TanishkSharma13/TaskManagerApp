import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";

const ProjectDetails = () => {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchProject = async () => {
    try {
      const res = await api.get(`/projects/${id}`);

      setProject(res.data.project);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const fetchProjectTasks = async () => {
    try {
      const res = await api.get(`/tasks/project/${id}`);

      setTasks(res.data.tasks);
    } catch (error) {
    }
  };

  useEffect(() => {
    fetchProject();
    fetchProjectTasks();
  }, []);

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-[70vh]">
          <h1 className="text-2xl font-semibold text-zinc-400">
            Loading project...
          </h1>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div>
        {/* Header */}
        <div className="bg-linear-to-br from-zinc-800 to-zinc-900 border border-zinc-700 p-10 rounded-3xl shadow-xl mb-10">
          <h1 className="text-5xl font-extrabold mb-4 tracking-tight">
            {project.title}
          </h1>

          <p className="text-zinc-400 text-xl leading-relaxed mb-8">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-6 text-lg">
            <div className="bg-zinc-800 px-5 py-3 rounded-2xl border border-zinc-700">
              Members: {project.members.length}
            </div>

            <div className="bg-zinc-800 px-5 py-3 rounded-2xl border border-zinc-700">
              Created By: {project.createdBy?.name}
            </div>
          </div>
        </div>

        {/* Members */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Team Members</h2>

          {project.members.length === 0 ? (
            <div className="bg-zinc-800 border border-zinc-700 rounded-3xl p-10 text-center">
              <p className="text-zinc-400 text-lg">No members assigned yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {project.members.map((member) => (
                <div
                  key={member._id}
                  className="bg-linear-to-br from-zinc-800 to-zinc-900 border border-zinc-700 p-6 rounded-3xl shadow-lg"
                >
                  <h3 className="text-2xl font-bold mb-2">{member.name}</h3>

                  <p className="text-zinc-400">{member.email}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Project Tasks */}
        <div className="mt-14">
          <h2 className="text-3xl font-bold mb-6">Project Tasks</h2>

          {tasks.length === 0 ? (
            <div className="bg-zinc-800 border border-zinc-700 rounded-3xl p-10 text-center">
              <p className="text-zinc-400 text-lg">
                No tasks found for this project.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {tasks.map((task) => (
                <div
                  key={task._id}
                  className="bg-linear-to-br from-zinc-800 to-zinc-900 border border-zinc-700 p-6 rounded-3xl shadow-lg hover:border-blue-500 transition-all duration-300"
                >
                  <h3 className="text-2xl font-bold mb-3">{task.title}</h3>

                  <p className="text-zinc-400 mb-5 leading-relaxed">
                    {task.description}
                  </p>

                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="text-zinc-500">Status:</span>{" "}
                      <span className="font-semibold capitalize">
                        {task.status}
                      </span>
                    </p>

                    <p>
                      <span className="text-zinc-500">Assigned To:</span>{" "}
                      <span className="font-semibold">
                        {task.assignedTo?.name || "Unassigned"}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default ProjectDetails;
