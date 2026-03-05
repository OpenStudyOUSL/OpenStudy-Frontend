import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import UploadMediaUploadtoSupabase from "../../utils/mediaUpload";

const API = "http://localhost:3000/api/courses";

const EMPTY_FORM = {
  courseId: "",
  courseName: "",
  courseDescription: "",
  courseTutor: "",
  courseImage: "",
};

export default function AdminCoursePage() {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null); // null = create mode
  const [form, setForm] = useState(EMPTY_FORM);
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);

  // Delete confirmation
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Image Upload State
  const [imageFile, setImageFile] = useState(null);

  // ── Data Fetch ──────────────────────────────────────────────
  const fetchCourses = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(API);
      if (!res.ok) throw new Error("Failed to fetch courses");
      const data = await res.json();
      setCourses(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // ── Modal Helpers ───────────────────────────────────────────
  const openCreate = () => {
    setEditingCourse(null);
    setForm(EMPTY_FORM);
    setFormError("");
    setImageFile(null);
    setShowModal(true);
  };

  const openEdit = (course) => {
    setEditingCourse(course);
    setForm({
      courseId: course.courseId,
      courseName: course.courseName,
      courseDescription: course.courseDescription,
      courseTutor: course.courseTutor,
      courseImage: course.courseImage || "",
    });
    setFormError("");
    setImageFile(null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingCourse(null);
    setForm(EMPTY_FORM);
    setFormError("");
    setImageFile(null);
  };

  const handleFormChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  // ── Save (Create / Update) ──────────────────────────────────
  const handleSave = async () => {
    const { courseId, courseName, courseDescription, courseTutor } = form;
    if (!courseId || !courseName || !courseDescription || !courseTutor) {
      setFormError("Please fill in all required fields.");
      return;
    }

    setSaving(true);
    setFormError("");
    try {
      let finalImageUrl = form.courseImage;

      if (imageFile) {
        try {
          const uploadResult = await UploadMediaUploadtoSupabase(imageFile);
          finalImageUrl = uploadResult.publicUrl;
        } catch (uploadErr) {
          const errMsg =
            typeof uploadErr === "string"
              ? uploadErr
              : uploadErr.message || "Image upload failed";
          setFormError(errMsg);
          setSaving(false);
          return;
        }
      }

      const payload = { ...form, courseImage: finalImageUrl };

      let res;
      if (editingCourse) {
        // Update
        res = await fetch(`${API}/${editingCourse._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        // Create
        res = await fetch(API, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Save failed");
      closeModal();
      fetchCourses();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSaving(false);
    }
  };

  // ── Delete ──────────────────────────────────────────────────
  const confirmDelete = (course) => setDeleteTarget(course);
  const cancelDelete = () => setDeleteTarget(null);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch(`${API}/${deleteTarget._id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Delete failed");
      }
      setDeleteTarget(null);
      fetchCourses();
    } catch (err) {
      alert(err.message);
    } finally {
      setDeleting(false);
    }
  };

  // ── Sidebar nav item style ──────────────────────────────────
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
          <Link to="/admin/students">
            <div className={navItemClass}>Students</div>
          </Link>
          <div className={activeNavItemClass}>Courses</div>
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
              Course Management
            </h1>
            <p className="text-gray-500 mt-1">
              Manage all courses — create, edit, or remove.
            </p>
          </div>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
          >
            <span className="text-xl leading-none">+</span>
            Add Course
          </button>
        </div>

        {/* Stats Card */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-md p-6 border border-blue-100 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white text-2xl font-bold shadow">
              {courses.length}
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Courses</p>
              <p className="text-gray-800 font-bold text-lg">Courses</p>
            </div>
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
        ) : courses.length === 0 ? (
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
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            <p className="text-lg font-medium">No courses found</p>
            <p className="text-sm mt-1">
              Click "Add Course" to create the first one.
            </p>
          </div>
        ) : (
          /* Course Table */
          <div className="bg-white rounded-2xl shadow-md border border-blue-50 overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gradient-to-r from-cyan-50 to-blue-50 border-b border-blue-100">
                  <th className="px-6 py-4 text-xs font-semibold text-blue-600 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-blue-600 uppercase tracking-wider">
                    Course ID
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-blue-600 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-blue-600 uppercase tracking-wider">
                    Tutor
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-blue-600 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-blue-600 uppercase tracking-wider text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {courses.map((course) => (
                  <tr
                    key={course._id}
                    className="hover:bg-blue-50/40 transition-colors duration-150"
                  >
                    <td className="px-6 py-4">
                      <img
                        src={course.courseImage || "/course-placeholder.png"}
                        alt={course.courseName}
                        onError={(e) => {
                          e.target.src = "https://placehold.co/48x48?text=📚";
                        }}
                        className="w-12 h-12 rounded-lg object-cover border border-blue-100 shadow-sm"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-xs font-mono font-semibold">
                        {course.courseId}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-800">
                      {course.courseName}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {course.courseTutor}
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-sm max-w-xs">
                      <span className="line-clamp-2">
                        {course.courseDescription}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => openEdit(course)}
                          className="px-4 py-1.5 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => confirmDelete(course)}
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

      {/* ===== Create / Edit Modal ===== */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-8 animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-800 mb-1">
              {editingCourse ? "Edit Course" : "Add New Course"}
            </h2>
            <p className="text-gray-400 text-sm mb-6">
              {editingCourse
                ? "Update the details of this course."
                : "Fill in the details to create a new course."}
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course ID <span className="text-red-500">*</span>
                </label>
                <input
                  name="courseId"
                  value={form.courseId}
                  onChange={handleFormChange}
                  disabled={!!editingCourse}
                  placeholder="e.g. CS101"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 disabled:bg-gray-50 disabled:text-gray-400 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course Name <span className="text-red-500">*</span>
                </label>
                <input
                  name="courseName"
                  value={form.courseName}
                  onChange={handleFormChange}
                  placeholder="e.g. Introduction to Computer Science"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tutor <span className="text-red-500">*</span>
                </label>
                <input
                  name="courseTutor"
                  value={form.courseTutor}
                  onChange={handleFormChange}
                  placeholder="e.g. Dr. John Smith"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="courseDescription"
                  value={form.courseDescription}
                  onChange={handleFormChange}
                  rows={3}
                  placeholder="Brief description of the course content…"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 transition resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course Image{" "}
                  <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setImageFile(file);
                      setForm((prev) => ({
                        ...prev,
                        courseImage: URL.createObjectURL(file),
                      }));
                    }
                  }}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 transition
                    file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {form.courseImage && (
                  <div className="mt-3">
                    <img
                      src={form.courseImage}
                      alt="Course Preview"
                      className="w-32 h-32 object-cover rounded-xl border-2 border-dashed border-gray-300 shadow-sm"
                    />
                  </div>
                )}
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
                {saving
                  ? "Saving…"
                  : editingCourse
                    ? "Update Course"
                    : "Create Course"}
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
              Delete Course?
            </h3>
            <p className="text-gray-500 text-sm mb-6">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-gray-700">
                "{deleteTarget.courseName}"
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
