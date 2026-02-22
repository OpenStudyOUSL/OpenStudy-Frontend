import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const API = "http://localhost:3000/api/users";

export default function AdminStudentPage() {
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Edit modal state
  const [showModal, setShowModal] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [form, setForm] = useState({ type: "student", isBlocked: false });
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);

  // Delete confirmation
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Search
  const [search, setSearch] = useState("");

  // ── Data Fetch ──────────────────────────────────────────────
  const fetchStudents = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API}/customers`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch students");
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // ── Filtered list ───────────────────────────────────────────
  const filtered = students.filter((s) => {
    const q = search.toLowerCase();
    return (
      s.userName?.toLowerCase().includes(q) ||
      s.email?.toLowerCase().includes(q) ||
      s.registerNumber?.toLowerCase().includes(q)
    );
  });

  // ── Modal helpers ───────────────────────────────────────────
  const openEdit = (student) => {
    setEditingStudent(student);
    setForm({ type: student.type, isBlocked: student.isBlocked ?? false });
    setFormError("");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingStudent(null);
    setFormError("");
  };

  // ── Save (Update) ───────────────────────────────────────────
  const handleSave = async () => {
    setSaving(true);
    setFormError("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${API}/${encodeURIComponent(editingStudent.email)}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        },
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed");
      closeModal();
      fetchStudents();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSaving(false);
    }
  };

  // ── Delete ──────────────────────────────────────────────────
  const confirmDelete = (student) => setDeleteTarget(student);
  const cancelDelete = () => setDeleteTarget(null);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API}/${deleteTarget.email}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Delete failed");
      }
      setDeleteTarget(null);
      fetchStudents();
    } catch (err) {
      alert(err.message);
    } finally {
      setDeleting(false);
    }
  };

  // ── Sidebar nav styles ──────────────────────────────────────
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
    bg-white/30 backdrop-blur-md
    translate-x-2
    transition-all duration-300 cursor-pointer shadow-sm
    border border-white/40
  `;

  const totalStudents = students.filter((s) => s.type === "student").length;
  const totalAdmins = students.filter((s) => s.type === "admin").length;
  const blockedCount = students.filter((s) => s.isBlocked).length;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 via-sky-100 to-indigo-200">
      {/* ===== Sidebar ===== */}
      <div className="fixed inset-y-0 left-0 w-[20%] bg-gradient-to-b from-cyan-500 to-blue-600 flex flex-col items-center z-50 overflow-y-auto shadow-2xl border-r border-white/30">
        {/* Logo */}
        <div className="mt-10 flex flex-row items-center space-x-4 w-3/4">
          <img src="/uniLogo.png" alt="Logo" className="w-10 h-10" />
          <h1 className="font-bold text-2xl text-white">Open Study</h1>
        </div>

        {/* Subtitle */}
        <h2 className="font-semibold text-2xl text-blue-50 mt-6 mb-10 tracking-wide drop-shadow">
          Admin Panel
        </h2>

        {/* Menu */}
        <div className="w-full px-6 space-y-3">
          <Link to="/admin/dashboard">
            <div className={navItemClass}>Dashboard</div>
          </Link>
          <div className={activeNavItemClass}>Students</div>
          <Link to="/admin/courses">
            <div className={navItemClass}>Courses</div>
          </Link>
          <Link to="/admin/quizzes">
            <div className={navItemClass}>Quizzes</div>
          </Link>
          <div className={navItemClass}>Reports</div>

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
      <div className="ml-[20%] flex-1 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">
              Student Management
            </h1>
            <p className="text-gray-500 mt-1">
              View and manage all registered users.
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-md p-6 border border-blue-100 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white text-2xl font-bold shadow">
              {totalStudents}
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Students</p>
              <p className="text-gray-800 font-bold text-lg">Students</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6 border border-blue-100 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center text-white text-2xl font-bold shadow">
              {totalAdmins}
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Admins</p>
              <p className="text-gray-800 font-bold text-lg">Admins</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6 border border-red-100 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-400 to-rose-500 flex items-center justify-center text-white text-2xl font-bold shadow">
              {blockedCount}
            </div>
            <div>
              <p className="text-gray-500 text-sm">Blocked</p>
              <p className="text-gray-800 font-bold text-lg">Users</p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search by name, email or register number…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 bg-white shadow-sm transition"
            />
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 px-5 py-4 bg-red-50 border border-red-200 text-red-600 rounded-xl">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-12 h-12 rounded-full border-4 border-blue-200 border-t-blue-500 animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400">
            <svg
              className="w-16 h-16 mb-4 opacity-40"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <p className="text-lg font-medium">No users found</p>
            <p className="text-sm mt-1">
              {search
                ? "Try a different search term."
                : "No users registered yet."}
            </p>
          </div>
        ) : (
          /* Student Table */
          <div className="bg-white rounded-2xl shadow-md border border-blue-50 overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gradient-to-r from-cyan-50 to-blue-50 border-b border-blue-100">
                  <th className="px-6 py-4 text-xs font-semibold text-blue-600 uppercase tracking-wider">
                    Avatar
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-blue-600 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-blue-600 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-blue-600 uppercase tracking-wider">
                    Reg. No.
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-blue-600 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-blue-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-blue-600 uppercase tracking-wider text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((student) => (
                  <tr
                    key={student._id}
                    className="hover:bg-blue-50/40 transition-colors duration-150"
                  >
                    {/* Avatar */}
                    <td className="px-6 py-4">
                      {student.profilePicture ? (
                        <img
                          src={student.profilePicture}
                          alt={student.userName}
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                          className="w-10 h-10 rounded-full object-cover border border-blue-100 shadow-sm"
                        />
                      ) : null}
                      <div
                        className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-semibold text-sm shadow-sm"
                        style={{
                          display: student.profilePicture ? "none" : "flex",
                        }}
                      >
                        {student.userName?.charAt(0)?.toUpperCase() || "U"}
                      </div>
                    </td>

                    {/* Name */}
                    <td className="px-6 py-4 font-semibold text-gray-800">
                      {student.userName}
                    </td>

                    {/* Email */}
                    <td className="px-6 py-4 text-gray-500 text-sm">
                      {student.email}
                    </td>

                    {/* Reg No */}
                    <td className="px-6 py-4">
                      <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-xs font-mono font-semibold">
                        {student.registerNumber || "—"}
                      </span>
                    </td>

                    {/* Role */}
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${
                          student.type === "admin"
                            ? "bg-violet-100 text-violet-700"
                            : "bg-cyan-100 text-cyan-700"
                        }`}
                      >
                        {student.type}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${
                          student.isBlocked
                            ? "bg-red-100 text-red-600"
                            : "bg-green-100 text-green-600"
                        }`}
                      >
                        {student.isBlocked ? "Blocked" : "Active"}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => openEdit(student)}
                          className="px-4 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => confirmDelete(student)}
                          className="px-4 py-1.5 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ===== Edit Modal ===== */}
      {showModal && editingStudent && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-800 mb-1">Edit User</h2>
            <p className="text-gray-400 text-sm mb-6">
              Update the role or block status for{" "}
              <span className="font-semibold text-gray-600">
                {editingStudent.userName}
              </span>
              .
            </p>

            <div className="space-y-5">
              {/* Role */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <select
                  value={form.type}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, type: e.target.value }))
                  }
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 bg-white transition"
                >
                  <option value="student">Student</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              {/* Block toggle */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Block Account
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Blocked users cannot log in.
                  </p>
                </div>
                <button
                  onClick={() =>
                    setForm((prev) => ({ ...prev, isBlocked: !prev.isBlocked }))
                  }
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none ${
                    form.isBlocked ? "bg-red-500" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-300 ${
                      form.isBlocked ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              {formError && (
                <p className="text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-2">
                  {formError}
                </p>
              )}
            </div>

            <div className="flex gap-3 mt-7">
              <button
                onClick={closeModal}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold hover:opacity-90 transition disabled:opacity-60"
              >
                {saving ? "Saving…" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== Delete Confirmation Modal ===== */}
      {deleteTarget && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Delete User?
            </h3>
            <p className="text-gray-500 text-sm mb-6">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-gray-700">
                "{deleteTarget.userName}"
              </span>
              ? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={cancelDelete}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 py-2.5 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition disabled:opacity-60"
              >
                {deleting ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
