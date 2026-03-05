import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

const ProfileDashboard = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalScore: 0,
    quizzesTaken: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    rank: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Please login first");
          navigate("/login");
          return;
        }

        // Fetch user basic info
        const userRes = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setUser(userRes.data);

        // Fetch user stats from leaderboard
        try {
          const statsRes = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/leaderboard/user-stats`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );
          setStats(statsRes.data);
        } catch (statsErr) {
          console.error("Error fetching stats:", statsErr);
          // Non-critical error, keep defaults
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load profile. Please login again.");
        localStorage.removeItem("token");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    toast.success("Logged out successfully");
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-primary-100 to-white flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center"
        >
          <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
          <p className="mt-4 text-xl font-medium text-primary-700 animate-pulse">
            Preparing your workspace...
          </p>
        </motion.div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
        <p className="text-xl text-red-500 font-semibold mb-4">
          Unable to load profile data.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-primary-600 text-white rounded-lg shadow-md hover:bg-primary-700 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  const userName = user.userName || "Student Scholar";
  const regNo = user.registerNumber || "Not registered";
  const email = user.email || "No email provided";
  const profilePic =
    user.profilePicture ||
    "https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg";

  // Calculate some dynamic values for the UI
  const accuracy =
    stats.quizzesTaken > 0
      ? Math.round(
          (stats.correctAnswers /
            (stats.correctAnswers + stats.wrongAnswers || 1)) *
            100,
        )
      : 0;

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden font-sans">
      {/* Dynamic Background Blobs */}
      <motion.div
        animate={{
          x: [0, 50, 0],
          y: [0, 30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-300 rounded-full mix-blend-multiply filter blur-[100px] opacity-20 pointer-events-none"
      />
      <motion.div
        animate={{
          x: [0, -40, 0],
          y: [0, 60, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary-200 rounded-full mix-blend-multiply filter blur-[100px] opacity-20 pointer-events-none"
      />

      <div className="relative z-10 p-4 sm:p-8 flex justify-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-6xl space-y-8"
        >
          {/* ================= HERO PROFILE CARD ================= */}
          <section className="relative bg-white/70 backdrop-blur-2xl border border-white/50 shadow-2xl rounded-[2.5rem] p-8 sm:p-12 overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-pink-600/5 transition-opacity duration-700 group-hover:opacity-100 opacity-0" />

            <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center lg:items-start gap-10">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-10 w-full lg:w-3/4">
                {/* Profile Image with Dynamic Ring */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative flex-shrink-0"
                >
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary-500 via-primary-300 to-primary-600 rounded-full animate-spin-slow opacity-20 blur-xl" />
                  <img
                    src={profilePic}
                    alt="profile"
                    className="relative w-40 h-40 rounded-full border-8 border-white shadow-2xl object-cover z-20"
                  />
                  <div className="absolute bottom-3 right-3 w-8 h-8 bg-green-500 border-4 border-white rounded-full z-30 shadow-md" />
                </motion.div>

                <div className="flex-1 text-center sm:text-left mt-4 sm:mt-0">
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="inline-flex items-center px-4 py-1.5 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-full text-xs font-bold tracking-widest mb-5 shadow-lg shadow-primary-200"
                  >
                    PREMIUM STUDENT
                  </motion.span>

                  <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-5xl sm:text-6xl font-black text-gray-900 tracking-tight leading-tight"
                  >
                    {userName}
                  </motion.h1>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col sm:flex-row items-center gap-6 mt-6 text-gray-500 font-semibold"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary-50 rounded-lg text-primary-600">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3 0 00-2.83 2"
                          />
                        </svg>
                      </div>
                      {regNo}
                    </div>
                    <div className="hidden sm:block text-gray-200">|</div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-pink-50 rounded-lg text-pink-600">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      {email}
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 w-full lg:w-auto">
                <Link
                  to="/profile/edit"
                  className="flex-1 lg:flex-none flex items-center justify-center gap-3 px-8 py-4 bg-gray-900 text-white font-bold rounded-2xl shadow-xl hover:bg-black hover:-translate-y-1 transition-all duration-300"
                >
                  Edit Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex-1 lg:flex-none flex items-center justify-center gap-3 px-8 py-4 bg-red-50 text-red-600 font-bold rounded-2xl border border-red-100 hover:bg-red-600 hover:text-white hover:-translate-y-1 transition-all duration-300"
                >
                  Logout
                </button>
              </div>
            </div>

            {/* REAL DATABASE STATS */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-14 pt-10 border-t border-gray-100">
              {[
                {
                  label: "Quizzes Completed",
                  val: stats.quizzesTaken,
                  color: "from-blue-600 to-cyan-500",
                  suffix: "",
                },
                {
                  label: "Total Points Earned",
                  val: stats.totalScore,
                  color: "from-amber-500 to-orange-600",
                  suffix: "",
                },
                {
                  label: "Global Ranking",
                  val: stats.rank || "N/A",
                  color: "from-purple-600 to-pink-600",
                  prefix: "#",
                },
                {
                  label: "Overall Accuracy",
                  val: accuracy,
                  color: "from-emerald-500 to-teal-600",
                  suffix: "%",
                },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="flex flex-col p-6 rounded-3xl bg-gray-50/50 hover:bg-white transition-colors border border-transparent hover:border-gray-100"
                >
                  <p className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-2">
                    {stat.label}
                  </p>
                  <p
                    className={`text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br ${stat.color}`}
                  >
                    {stat.prefix}
                    {stat.val}
                    {stat.suffix}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* ================= DETAILED BREAKDOWN ================= */}
            <div className="lg:col-span-2 space-y-8">
              <motion.section
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-white rounded-[2.5rem] p-10 shadow-xl shadow-gray-200/50 border border-gray-100"
              >
                <div className="flex items-center justify-between mb-10">
                  <h2 className="text-3xl font-extrabold text-gray-900">
                    Academic Analytics
                  </h2>
                  <div className="flex gap-2">
                    <span className="w-3 h-3 rounded-full bg-primary-500" />
                    <span className="w-3 h-3 rounded-full bg-primary-400" />
                    <span className="w-3 h-3 rounded-full bg-primary-600" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  <div className="p-8 rounded-[2rem] bg-primary-50/50 flex flex-col items-center text-center">
                    <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-lg mb-6 ring-8 ring-primary-100">
                      <span className="text-3xl font-black text-primary-600">
                        {stats.correctAnswers}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      Correct Answers
                    </h3>
                    <p className="text-primary-600/70 text-sm font-medium">
                      Keep it up!
                    </p>
                  </div>

                  <div className="p-8 rounded-[2rem] bg-accent-50/50 flex flex-col items-center text-center">
                    <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-lg mb-6 ring-8 ring-accent-100">
                      <span className="text-3xl font-black text-accent-600">
                        {stats.wrongAnswers}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      Missed Questions
                    </h3>
                    <p className="text-accent-600/70 text-sm font-medium">
                      Focus and learn
                    </p>
                  </div>

                  <div className="p-8 rounded-[2rem] bg-primary-50/50 flex flex-col items-center text-center">
                    <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-lg mb-6 ring-8 ring-primary-100">
                      <span className="text-3xl font-black text-primary-600">
                        {stats.quizzesTaken}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      Tests Attempted
                    </h3>
                    <p className="text-primary-600/70 text-sm font-medium">
                      Dedication pays
                    </p>
                  </div>
                </div>
              </motion.section>

              {/* Progress visualizer */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="bg-gray-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/10 rounded-full blur-3xl pointer-events-none" />
                <h3 className="text-2xl font-bold mb-8">
                  Performance Trajectory
                </h3>
                <div className="flex items-end gap-3 h-40">
                  {[20, 60, 45, 90, 75, 40, 85].map((val, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${val}%` }}
                      transition={{ delay: 1.2 + i * 0.1, duration: 1 }}
                      className="flex-1 bg-gradient-to-t from-primary-600 to-primary-400 rounded-xl hover:scale-110 transition-transform cursor-pointer relative group"
                    >
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white text-gray-900 text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        {val}%
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="flex justify-between mt-6 text-gray-400 text-xs font-bold uppercase tracking-widest">
                  <span>Mon</span>
                  <span>Wed</span>
                  <span>Fri</span>
                  <span>Sun</span>
                </div>
              </motion.div>
            </div>

            {/* ================= SIDEBAR ================= */}
            <div className="space-y-8">
              <motion.section
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 }}
                className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-gray-200/50 border border-gray-100"
              >
                <h3 className="text-xl font-black text-gray-900 mb-8 flex items-center gap-3">
                  <div className="w-2 h-6 bg-primary-600 rounded-full" />
                  Skill Mastery
                </h3>
                <div className="space-y-8">
                  {[
                    { name: "Mathematics", level: 95, color: "bg-blue-500" },
                    { name: "Science", level: 82, color: "bg-pink-500" },
                    { name: "History", level: 68, color: "bg-amber-500" },
                    { name: "Language", level: 45, color: "bg-emerald-500" },
                  ].map((skill, i) => (
                    <div key={i}>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-bold text-gray-700">
                          {skill.name}
                        </span>
                        <span className="text-sm font-black text-gray-900">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${skill.level}%` }}
                          transition={{ delay: 1.5 + i * 0.1, duration: 1.5 }}
                          className={`h-full ${skill.color} rounded-full`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <Link
                  to="/courses"
                  className="mt-10 block w-full py-4 text-center bg-primary-50 text-primary-600 font-black rounded-2xl hover:bg-primary-100 transition-colors"
                >
                  Continue Learning
                </Link>
              </motion.section>

              {/* Achievements Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 }}
                className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-[2.5rem] p-8 text-white shadow-2xl overflow-hidden relative"
              >
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" />
                <h3 className="text-xl font-bold mb-6">Recent Badges</h3>
                <div className="flex flex-wrap gap-4">
                  {["🔥", "💡", "🚀", "🏆"].map((emoji, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-3xl shadow-lg border border-white/20 cursor-pointer"
                    >
                      {emoji}
                    </motion.div>
                  ))}
                </div>
                <p className="mt-8 text-indigo-100/70 text-sm font-medium italic">
                  "Success is the sum of small efforts, repeated day in and day
                  out."
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default ProfileDashboard;
