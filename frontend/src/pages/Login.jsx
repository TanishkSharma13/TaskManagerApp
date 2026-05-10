import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await api.post("/auth/login", formData);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/dashboard");
    } catch (error) {
      console.log(error.response);
      alert(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-black via-zinc-950 to-zinc-900 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 bg-zinc-900/70 border border-zinc-800 rounded-[40px] overflow-hidden shadow-2xl backdrop-blur-xl">
        {/* LEFT SIDE */}
        <div className="hidden lg:flex flex-col justify-between p-14 bg-linear-to-br from-zinc-950 to-zinc-900 border-r border-zinc-800">
          <div>
            <h1 className="text-5xl font-extrabold leading-tight mb-6">
              Manage your <br />
              tasks smarter.
            </h1>

            <p className="text-zinc-400 text-lg leading-relaxed">
              Organize projects, assign tasks, track progress, and collaborate
              efficiently with your team.
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-zinc-800/50 border border-zinc-700 rounded-2xl p-5">
              <h3 className="text-xl font-semibold mb-2">Project Management</h3>

              <p className="text-zinc-400">
                Create and organize projects easily.
              </p>
            </div>

            <div className="bg-zinc-800/50 border border-zinc-700 rounded-2xl p-5">
              <h3 className="text-xl font-semibold mb-2">Task Tracking</h3>

              <p className="text-zinc-400">Track task progress in real-time.</p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center justify-center p-8 lg:p-14">
          <div className="w-full max-w-md">
            <div className="mb-10">
              <h2 className="text-5xl font-extrabold mb-4 tracking-tight">
                Welcome Back
              </h2>

              <p className="text-zinc-400 text-lg">
                Login to continue managing your workspace.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl p-5 text-lg outline-none focus:border-blue-500 transition"
                required
              />

              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl p-5 text-lg outline-none focus:border-blue-500 transition"
                required
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 rounded-2xl p-5 text-lg font-semibold transition-all duration-300 shadow-lg hover:scale-[1.02] disabled:opacity-70"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <p className="mt-8 text-zinc-400 text-center text-lg">
              Don&apos;t have an account?{" "}
              <Link
                to="/register"
                className="text-blue-500 hover:text-blue-400 font-medium"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
