import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../services/api";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const res = await api.get("/dashboard");

        setStats(res.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  const cards = [
    {
      title: "Total Tasks",
      value: stats?.totalTasks || 0,
    },
    {
      title: "Completed",
      value: stats?.completedTasks || 0,
    },
    {
      title: "Pending",
      value: stats?.pendingTasks || 0,
    },
    {
      title: "In Progress",
      value: stats?.inProgressTasks || 0,
    },
    {
      title: "Overdue",
      value: stats?.overdueTasks || 0,
    },
  ];

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-[70vh]">
          <h1 className="text-2xl font-semibold text-zinc-400">
            Loading dashboard...
          </h1>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div>
        <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 gap-8">
          {cards.map((card, index) => (
            <div
              key={index}
              className="bg-linear-to-br from-zinc-800 to-zinc-900 border border-zinc-700 p-8 rounded-3xl shadow-xl hover:scale-[1.03] hover:border-blue-500 transition-all duration-300"
            >
              <h2 className="text-zinc-400 text-base mb-3 font-medium">
                {card.title}
              </h2>

              <p className="text-5xl font-extrabold tracking-tight">
                {card.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
