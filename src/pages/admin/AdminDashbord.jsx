import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

// ── Animated counter hook ────────────────────────────────────
function useCountUp(target, duration = 1200) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (target === 0) return;
    let start = 0;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return count;
}

// ── Stat card ────────────────────────────────────────────────
function StatCard({ label, value, sub, gradient, icon }) {
  const animated = useCountUp(value);
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 border border-blue-50 flex items-center gap-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
      <div
        className={`relative w-14 h-14 rounded-2xl ${gradient} flex items-center justify-center shadow-lg flex-shrink-0`}
      >
        {/* pulse ring */}
        <span
          className={`absolute inset-0 rounded-2xl ${gradient} opacity-40 animate-ping`}
          style={{ animationDuration: "2.5s" }}
        />
        <span className="relative text-white text-xl">{icon}</span>
      </div>
      <div>
        <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">
          {label}
        </p>
        <p className="text-3xl font-extrabold text-gray-800 leading-tight">
          {animated}
        </p>
        {sub && <p className="text-gray-400 text-xs mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

// ── Skeleton shimmer ─────────────────────────────────────────
function Skeleton({ className = "" }) {
  return (
    <div
      className={`bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 animate-pulse rounded-xl ${className}`}
      style={{
        backgroundSize: "200% 100%",
        animation: "shimmer 1.4s infinite",
      }}
    />
  );
}

// ── Sidebar nav classes ──────────────────────────────────────
const navItemClass = `
  flex items-center justify-center px-5 py-3 rounded-xl
  text-white font-medium tracking-wide
  bg-white/10 backdrop-blur-md
  hover:bg-white/25 hover:translate-x-2
  transition-all duration-300 cursor-pointer shadow-sm
`;
const activeNavItemClass = `
  flex items-center justify-center px-5 py-3 rounded-xl
  text-white font-semibold tracking-wide
  bg-primary-500/40 backdrop-blur-md translate-x-2
  transition-all duration-300 cursor-pointer shadow-sm
  border border-white/40
`;

// ── Donut chart (pure CSS) ───────────────────────────────────
function DonutChart({ studentCount, adminCount }) {
  const total = studentCount + adminCount || 1;
  const studentPct = Math.round((studentCount / total) * 100);
  const adminPct = 100 - studentPct;

  // CSS conic-gradient donut
  const gradient = `conic-gradient(#06b6d4 0% ${studentPct}%, #8b5cf6 ${studentPct}% 100%)`;

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <div className="relative w-36 h-36">
        <div
          className="w-36 h-36 rounded-full shadow-inner"
          style={{ background: gradient }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-sm">
            <span className="text-gray-700 font-bold text-sm">{total}</span>
          </div>
        </div>
      </div>
      <div className="flex gap-5 text-sm">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-cyan-400 inline-block" />
          <span className="text-gray-600">
            Students <strong className="text-gray-800">{studentPct}%</strong>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-violet-500 inline-block" />
          <span className="text-gray-600">
            Admins <strong className="text-gray-800">{adminPct}%</strong>
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Main ─────────────────────────────────────────────────────
export default function AdminDashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [users, setUsers] = useState([]);
  const [courseCount, setCourseCount] = useState(0);
  const [quizCount, setQuizCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const headers = { Authorization: `Bearer ${token}` };
    Promise.all([
      fetch("http://localhost:3000/api/users/customers", { headers }).then(
        (r) => r.json(),
      ),
      fetch("http://localhost:3000/api/courses").then((r) => r.json()),
      fetch("http://localhost:3000/api/quizzes/count").then((r) => r.json()),
    ])
      .then(([usersData, coursesData, quizzesData]) => {
        setUsers(Array.isArray(usersData) ? usersData : []);
        setCourseCount(Array.isArray(coursesData) ? coursesData.length : 0);
        setQuizCount(quizzesData?.count ?? 0);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const studentCount = users.filter((u) => u.type === "student").length;
  const adminCount = users.filter((u) => u.type === "admin").length;
  const blockedCount = users.filter((u) => u.isBlocked).length;
  const recentUsers = [...users].reverse().slice(0, 5);

  // current greeting
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  const now = new Date();
  const dateStr = now.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="flex min-h-screen bg-primary-50">
      {/* ===== Sidebar ===== */}
      <div className="fixed inset-y-0 left-0 w-[20%] bg-gradient-to-b from-primary-700 to-primary-900 flex flex-col items-center z-50 overflow-y-auto shadow-2xl border-r border-white/20">
        <div className="mt-10 flex flex-row items-center space-x-4 w-3/4">
          <img src="/uniLogo.png" alt="Logo" className="w-10 h-10" />
          <h1 className="font-bold text-2xl text-white">Open Study</h1>
        </div>
        <h2 className="font-semibold text-2xl text-blue-50 mt-6 mb-10 tracking-wide drop-shadow">
          Admin Panel
        </h2>
        {/* Menu */}
        <div className="w-full px-6 space-y-3">
          <div className={activeNavItemClass}>Dashboard</div>
          <Link to="/admin/students" className="block">
            <div className={navItemClass}>Students</div>
          </Link>
          <Link to="/admin/courses" className="block">
            <div className={navItemClass}>Courses</div>
          </Link>
          <Link to="/admin/quizzes" className="block">
            <div className={navItemClass}>Quizzes</div>
          </Link>
          <div
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
            className="flex items-center justify-center px-5 py-3 rounded-xl mt-40 font-medium tracking-wide text-red-100 bg-red-500/20 hover:bg-red-500/40 hover:translate-x-2 transition-all duration-300 cursor-pointer shadow-sm"
          >
            Logout
          </div>
        </div>
      </div>

      {/* ===== Main Content ===== */}
      <div className="ml-[20%] flex-1 p-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm font-medium">{dateStr}</p>
            <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight mt-0.5">
              {greeting}, Admin 👋
            </h1>
            <p className="text-gray-500 mt-1 text-sm">
              Here's what's happening on your platform today.
            </p>
          </div>
          {/* Refresh button */}
          <button
            onClick={() => {
              setLoading(true);
              window.location.reload();
            }}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-blue-100 rounded-xl shadow-sm text-gray-500 text-sm hover:bg-blue-50 hover:text-blue-600 transition-all"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Refresh
          </button>
        </div>

        {/* ── Stats Row ── */}
        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-28" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              label="Total Users"
              value={users.length}
              sub="all roles"
              gradient="bg-gradient-to-br from-primary-400 to-primary-600"
              icon="👥"
            />
            <StatCard
              label="Students"
              value={studentCount}
              sub="active learners"
              gradient="bg-gradient-to-br from-rose-400 to-rose-600"
              icon="🎓"
            />
            <StatCard
              label="Courses"
              value={courseCount}
              sub="available"
              gradient="bg-gradient-to-br from-violet-400 to-purple-600"
              icon="📚"
            />
            <StatCard
              label="Quizzes"
              value={quizCount}
              sub="total questions"
              gradient="bg-gradient-to-br from-orange-400 to-rose-500"
              icon="✏️"
            />
          </div>
        )}

        {/* ── Middle Row: Donut + Quick Actions ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Donut chart card */}
          <div className="bg-white rounded-2xl shadow-md border border-blue-50 p-6 flex flex-col items-center justify-center">
            <h2 className="text-base font-bold text-gray-700 mb-4 self-start">
              User Distribution
            </h2>
            {loading ? (
              <Skeleton className="w-36 h-36 rounded-full" />
            ) : (
              <DonutChart studentCount={studentCount} adminCount={adminCount} />
            )}
          </div>

          {/* Quick Actions */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Students */}
            <Link to="/admin/students">
              <div className="bg-white rounded-2xl shadow-md border border-blue-50 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 cursor-pointer group h-full">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center mb-4 shadow group-hover:scale-110 transition-transform text-xl">
                  👥
                </div>
                <h3 className="font-bold text-gray-800 text-lg">Students</h3>
                <p className="text-gray-400 text-sm mt-1">
                  {loading
                    ? "..."
                    : `${studentCount} students · ${blockedCount} blocked`}
                </p>
                <div className="mt-4 flex items-center text-blue-500 text-sm font-medium gap-1 group-hover:gap-2 transition-all">
                  Manage <span>→</span>
                </div>
              </div>
            </Link>

            {/* Courses */}
            <Link to="/admin/courses">
              <div className="bg-white rounded-2xl shadow-md border border-blue-50 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-200 cursor-pointer group h-full">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center mb-4 shadow group-hover:scale-110 transition-transform text-xl">
                  📚
                </div>
                <h3 className="font-bold text-gray-800 text-lg">Courses</h3>
                <p className="text-gray-400 text-sm mt-1">
                  {loading
                    ? "..."
                    : `${courseCount} courses · ${quizCount} quizzes`}
                </p>
                <div className="mt-4 flex items-center text-violet-500 text-sm font-medium gap-1 group-hover:gap-2 transition-all">
                  Manage <span>→</span>
                </div>
              </div>
            </Link>

            {/* Blocked users mini card */}
            <div className="sm:col-span-2 bg-gradient-to-r from-red-50 to-rose-50 rounded-2xl border border-red-100 p-5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center text-red-500 text-lg">
                  🚫
                </div>
                <div>
                  <p className="text-gray-700 font-semibold">
                    Blocked Accounts
                  </p>
                  <p className="text-gray-400 text-xs mt-0.5">
                    Users restricted from logging in
                  </p>
                </div>
              </div>
              <div className="text-3xl font-extrabold text-red-500">
                {loading ? "—" : blockedCount}
              </div>
            </div>
          </div>
        </div>

        {/* ── Recent Users Table ── */}
        <div className="bg-white rounded-2xl shadow-md border border-blue-50 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="text-base font-bold text-gray-700">
              Recently Registered Users
            </h2>
            <Link
              to="/admin/students"
              className="text-sm text-blue-500 font-medium hover:underline"
            >
              View all →
            </Link>
          </div>

          {loading ? (
            <div className="p-6 space-y-3">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-10" />
              ))}
            </div>
          ) : recentUsers.length === 0 ? (
            <div className="flex items-center justify-center h-32 text-gray-400 text-sm">
              No users registered yet.
            </div>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="bg-primary-50/50">
                  <th className="px-6 py-3 text-xs font-semibold text-blue-600 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-blue-600 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-blue-600 uppercase tracking-wider">
                    Reg. No.
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-blue-600 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-xs font-semibold text-blue-600 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentUsers.map((u) => (
                  <tr
                    key={u._id}
                    className="hover:bg-blue-50/30 transition-colors"
                  >
                    <td className="px-6 py-3 flex items-center gap-3">
                      {u.profilePicture ? (
                        <img
                          src={u.profilePicture}
                          alt={u.userName}
                          className="w-8 h-8 rounded-full object-cover border border-blue-100 shadow-sm"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                        />
                      ) : null}
                      <div
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                        style={{ display: u.profilePicture ? "none" : "flex" }}
                      >
                        {u.userName?.charAt(0)?.toUpperCase() || "U"}
                      </div>
                      <span className="font-medium text-gray-800 text-sm">
                        {u.userName}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-gray-500 text-sm">
                      {u.email}
                    </td>
                    <td className="px-6 py-3">
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-md text-xs font-mono">
                        {u.registerNumber || "—"}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          u.type === "admin"
                            ? "bg-violet-100 text-violet-700"
                            : "bg-cyan-100 text-cyan-700"
                        }`}
                      >
                        {u.type}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          u.isBlocked
                            ? "bg-red-100 text-red-600"
                            : "bg-green-100 text-green-600"
                        }`}
                      >
                        {u.isBlocked ? "Blocked" : "Active"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
