import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const login = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/login`,
        { email, password }
      );

      if (!res.data.user) {
        toast.error(res.data.message);
        return;
      }

      if (res.data.user.isBlocked) {
        toast.error("Your account is blocked. Please contact support.");
        return;
      }

      toast.success("Login successful");
      localStorage.setItem("token", res.data.token);

      if (res.data.user.type === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-linear-to-br from-red-50 via-rose-50 to-white flex items-center justify-center p-6">
      {/* Soft overlay + glows (like About page) */}
      <div className="absolute inset-0 bg-linear-to-br from-red-700/10 via-rose-600/6 to-transparent" />
      <div className="pointer-events-none absolute -top-48 -right-40 h-104 w-104 rounded-full bg-red-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-52 -left-40 h-112 w-md rounded-full bg-rose-400/20 blur-3xl" />

      {/* Card */}
      <div className="relative w-full max-w-6xl rounded-3xl border border-red-200/60 bg-white/75 backdrop-blur-xl shadow-2xl shadow-red-900/10 overflow-hidden">
        <div className="grid md:grid-cols-2">
          {/* LEFT SIDE (brand panel) */}
          <div className="hidden md:flex flex-col justify-center p-12 lg:p-16 relative overflow-hidden bg-linear-to-br from-red-700 via-rose-700 to-red-800 text-white">
            {/* glow inside */}
            <div className="pointer-events-none absolute -top-20 -left-20 h-80 w-80 rounded-full bg-white/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                OUSL Student Project
              </div>

              <h1 className="mt-6 text-5xl lg:text-6xl font-extrabold tracking-tight">
                Open Study
              </h1>

              <p className="mt-4 text-red-50/90 text-xl lg:text-2xl leading-relaxed max-w-lg">
                Your personalized learning companion
              </p>

              <div className="mt-10 text-red-50/90 text-lg">
                <p className="mb-6 leading-relaxed">
                  Access your personalized dashboard,<br />
                  track your quiz performance,<br />
                  review your progress,<br />
                  and continue your path to<br />
                  exam success.
                </p>

                <p className="italic opacity-90">
                  “Study smarter. Achieve more.”
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE (form) */}
          <div className="bg-white/90 p-10 lg:p-16 flex flex-col justify-center">
            <div className="max-w-md mx-auto w-full">
              {/* Mobile heading */}
              <div className="md:hidden text-center mb-10">
                <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-2">
                  Open Study
                </h2>
                <p className="text-gray-600">Welcome Back!</p>
              </div>

              <h2 className="text-3xl font-extrabold text-gray-900 mb-2 hidden md:block">
                Welcome Back!
              </h2>
              <p className="text-gray-600 mb-10 hidden md:block">
                Log in to continue
              </p>

              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Email */}
                <div className="group">
                  <label className="block text-gray-700 font-semibold mb-2 text-sm">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="
                      w-full px-5 py-4 rounded-xl border border-gray-300
                      bg-white
                      outline-none
                      transition-all duration-300
                      focus:border-red-500 focus:ring-4 focus:ring-red-200/60
                      hover:border-gray-400
                    "
                    placeholder="Enter your email"
                    required
                  />
                </div>

                {/* Password */}
                <div className="relative group">
                  <label className="block text-gray-700 font-semibold mb-2 text-sm">
                    Password
                  </label>

                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="
                      w-full px-5 py-4 rounded-xl border border-gray-300
                      bg-white
                      outline-none
                      transition-all duration-300
                      focus:border-red-500 focus:ring-4 focus:ring-red-200/60
                      hover:border-gray-400
                      pr-12
                    "
                    placeholder="••••••••••••"
                    required
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="
                      absolute right-4 top-10.5
                      text-gray-500
                      transition-colors duration-200
                      hover:text-gray-700
                      focus:outline-none
                    "
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                  </button>
                </div>

                {/* Forgot */}
                <div className="flex justify-end">
                  <span className="text-red-700 hover:text-red-900 text-sm font-semibold cursor-pointer transition-colors">
                    Forgot password?
                  </span>
                </div>

                {/* Button */}
                <button
                  type="submit"
                  className="
                    w-full rounded-xl
                    bg-linear-to-r from-red-700 via-rose-700 to-red-800
                    text-white font-semibold
                    py-4
                    shadow-lg shadow-red-700/20
                    transition-all duration-300
                    hover:-translate-y-0.5 hover:shadow-xl hover:shadow-red-700/25
                    focus:outline-none focus:ring-4 focus:ring-red-300
                  "
                >
                  Log in
                </button>
              </form>

              <p className="text-center mt-10 text-gray-600 text-sm">
                Don&apos;t have an account?{" "}
                <Link
                  to="/signup"
                  className="text-red-700 font-semibold hover:text-red-900 transition-colors"
                >
                  Sign up
                </Link>
              </p>

              {/* small divider hint */}
              <div className="mt-8 h-px w-full bg-linear-to-r from-transparent via-red-200/80 to-transparent" />
              <p className="mt-4 text-center text-xs text-gray-500">
                By continuing, you agree to our terms and privacy policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
