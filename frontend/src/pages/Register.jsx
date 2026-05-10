import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "member",
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

      await api.post("/auth/register", formData);

      alert("Registration successful");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
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
              Join your <br />
              workspace today.
            </h1>

            <p className="text-zinc-400 text-lg leading-relaxed">
              Create projects, collaborate with your team, assign tasks, and
              track productivity seamlessly.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-10">
              <div className="bg-zinc-800/40 border border-zinc-700 rounded-2xl p-4 text-center">
                <h3 className="text-2xl font-bold text-white">24/7</h3>

                <p className="text-zinc-500 text-sm mt-1">Access</p>
              </div>

              <div className="bg-zinc-800/40 border border-zinc-700 rounded-2xl p-4 text-center">
                <h3 className="text-2xl font-bold text-white">Teams</h3>

                <p className="text-zinc-500 text-sm mt-1">Collaboration</p>
              </div>

              <div className="bg-zinc-800/40 border border-zinc-700 rounded-2xl p-4 text-center">
                <h3 className="text-2xl font-bold text-white">Fast</h3>

                <p className="text-zinc-500 text-sm mt-1">Workflow</p>
              </div>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="space-y-6 mt-12">
            <div className="bg-zinc-800/50 border border-zinc-700 rounded-2xl p-5">
              <h3 className="text-xl font-semibold mb-2">Team Collaboration</h3>

              <p className="text-zinc-400">
                Work efficiently with your team members.
              </p>
            </div>

            <div className="bg-zinc-800/50 border border-zinc-700 rounded-2xl p-5">
              <h3 className="text-xl font-semibold mb-2">
                Productivity Tracking
              </h3>

              <p className="text-zinc-400">
                Stay updated with real-time task progress.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center justify-center p-8 lg:p-14">
          <div className="w-full max-w-md">
            <div className="mb-10">
              <h2 className="text-5xl font-extrabold mb-4 tracking-tight">
                Create Account
              </h2>

              <p className="text-zinc-400 text-lg">
                Register to start managing your projects.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl p-5 text-lg outline-none focus:border-blue-500 transition"
                required
              />

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

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-2xl p-5 text-lg outline-none focus:border-blue-500 transition"
              >
                <option value="member">Member</option>
                <option value="admin">Admin</option>
              </select>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 rounded-2xl p-5 text-lg font-semibold transition-all duration-300 shadow-lg hover:scale-[1.02] disabled:opacity-70"
              >
                {loading ? "Creating Account..." : "Register"}
              </button>
            </form>

            <p className="mt-8 text-zinc-400 text-center text-lg">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-500 hover:text-blue-400 font-medium"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
