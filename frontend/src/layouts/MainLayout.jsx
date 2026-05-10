import { NavLink, useNavigate } from "react-router-dom";

const MainLayout = ({ children }) => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");
  };

  return (
    <div className="min-h-screen bg-zinc-900 text-white flex">
      {/* Sidebar */}
      <div className="w-72 bg-zinc-900 border-r border-zinc-800 p-8 flex flex-col justify-between">
        <div>
          <NavLink to="/dashboard">
            <h1 className="text-3xl font-extrabold mb-14 hover:text-blue-400 transition tracking-tight">
              Task Manager
            </h1>
          </NavLink>

          <nav className="space-y-4">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `block px-5 py-4 rounded-2xl text-lg font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg"
                    : "hover:bg-zinc-800 text-zinc-300"
                }`
              }
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/projects"
              className={({ isActive }) =>
                `block px-5 py-4 rounded-2xl text-lg font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg"
                    : "hover:bg-zinc-800 text-zinc-300"
                }`
              }
            >
              Projects
            </NavLink>

            <NavLink
              to="/tasks"
              className={({ isActive }) =>
                `block px-5 py-4 rounded-2xl text-lg font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg"
                    : "hover:bg-zinc-800 text-zinc-300"
                }`
              }
            >
              Tasks
            </NavLink>
          </nav>
        </div>

        <div>
          <div className="mb-6">
            <p className="text-zinc-500 text-sm mb-1">Logged in</p>

            <h2 className="text-xl font-bold text-white">
              Welcome, {user?.role === "admin" ? "Admin" : "Member"}
            </h2>
          </div>

          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-2xl text-lg font-medium transition-all duration-300"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">{children}</div>
    </div>
  );
};

export default MainLayout;
