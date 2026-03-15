import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import UploadMediaUploadtoSupabase from "../../utils/mediaUpload";

const COURSES_API = `${import.meta.env.VITE_BACKEND_URL}/api/courses`;
const QUIZZES_API = `${import.meta.env.VITE_BACKEND_URL}/api/quizzes`;

const EMPTY_FORM = {
  courseId: "",
  topic: "",
  quizId: "",
  question: "",
  options: ["", "", "", ""],
  correctAnswer: "",
  questionType: "MCQ",
  image: "",
};

export default function AdminQuizPage() {
  const navigate = useNavigate();

  const [quizzes, setQuizzes] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);
  const [quizImageFile, setQuizImageFile] = useState(null);
  const [quizImagePreview, setQuizImagePreview] = useState("");

  // Delete confirmation
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // ── Data Fetch ──────────────────────────────────────────────
  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const [coursesRes, quizzesRes] = await Promise.all([
        fetch(COURSES_API),
        fetch(QUIZZES_API),
      ]);

      if (!coursesRes.ok) throw new Error("Failed to fetch courses");
      if (!quizzesRes.ok) throw new Error("Failed to fetch quizzes");

      const coursesData = await coursesRes.json();
      const quizzesData = await quizzesRes.json();

      setCourses(coursesData);
      setQuizzes(quizzesData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ── Modal Helpers ───────────────────────────────────────────
  const openCreate = () => {
    setForm(EMPTY_FORM);
    setFormError("");
    setShowModal(true);
  };

  const closeModal = () => {
    setForm(EMPTY_FORM);
    setQuizImageFile(null);
    setQuizImagePreview("");
    setFormError("");
  };

  const handleFormChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleOptionChange = (index, value) => {
    const newOptions = [...form.options];
    newOptions[index] = value;
    setForm((prev) => ({ ...prev, options: newOptions }));
  };

  const addOption = () => {
    setForm((prev) => ({ ...prev, options: [...prev.options, ""] }));
  };

  const removeOption = (index) => {
    setForm((prev) => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index),
    }));
  };

  const handleQuestionTypeChange = (e) => {
    const type = e.target.value;
    if (type === "TRUE_FALSE") {
      setForm((prev) => ({
        ...prev,
        questionType: type,
        options: ["True", "False"],
        correctAnswer: "True",
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        questionType: type,
        options: ["", "", "", ""],
        correctAnswer: "",
      }));
    }
  };

  // ── Save (Create) ───────────────────────────────────────────
  const handleSave = async () => {
    const {
      courseId,
      topic,
      quizId,
      question,
      options,
      correctAnswer,
      
    } = form;

    // Basic validation
    if (!courseId || !topic || !quizId || !question || !correctAnswer) {
      setFormError("Please fill in all required fields.");
      return;
    }

    const filteredOptions = options.filter((opt) => opt.trim() !== "");
    if (filteredOptions.length < 2) {
      setFormError("At least two options are required.");
      return;
    }

    if (!filteredOptions.includes(correctAnswer)) {
      setFormError("Correct answer must be one of the options.");
      return;
    }

    const payload = {
      ...form,
      quizId: Number(quizId),
      options: filteredOptions,
    };

    setSaving(true);
    setFormError("");
    try {
      let imageUrl = form.image;
      if (quizImageFile) {
        const uploadResult = await UploadMediaUploadtoSupabase(quizImageFile);
        if (uploadResult.error) {
          throw new Error(uploadResult.error);
        }
        imageUrl = uploadResult.publicUrl;
      }

      const finalPayload = {
        ...payload,
        image: imageUrl,
      };

      const res = await fetch(QUIZZES_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalPayload),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Save failed");
      closeModal();
      fetchData();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSaving(false);
    }
  };

  // ── Delete ──────────────────────────────────────────────────
  const confirmDelete = (quiz) => setDeleteTarget(quiz);
  const cancelDelete = () => setDeleteTarget(null);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch(`${QUIZZES_API}/${deleteTarget._id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Delete failed");
      }
      setDeleteTarget(null);
      fetchData();
    } catch (err) {
      alert(err.message);
    } finally {
      setDeleting(false);
    }
  };

  // ── Get Course Name helper ──────────────────────────────────
  const getCourseName = (cId) => {
    if (typeof cId === "object" && cId !== null && cId.courseName) {
      return cId.courseName;
    }
    const course = courses.find((c) => c.courseId === cId || c._id === cId);
    return course ? course.courseName : cId;
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
    <div className="flex min-h-screen bg-primary-50">
      {/* ===== Sidebar ===== */}
      <div className="fixed inset-y-0 left-0 w-[20%] bg-gradient-to-b from-primary-700 to-primary-900 flex flex-col items-center z-50 overflow-y-auto shadow-2xl border-r border-white/20">
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
          <Link to="/admin/dashboard" className="block">
            <div className={navItemClass}>Dashboard</div>
          </Link>
          <Link to="/admin/students" className="block">
            <div className={navItemClass}>Students</div>
          </Link>
          <Link to="/admin/courses" className="block">
            <div className={navItemClass}>Courses</div>
          </Link>
          <div className={activeNavItemClass}>Quizzes</div>
          

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
              Quiz Management
            </h1>
            <p className="text-gray-500 mt-1">
              Manage quizzes — create and remove questions.
            </p>
          </div>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-semibold rounded-xl shadow-lg hover:bg-primary-700 transition-all duration-200"
          >
            <span className="text-xl leading-none">+</span>
            Add Quiz Question
          </button>
        </div>

        {/* Stats Card */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-md p-6 border border-blue-100 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 to-rose-500 flex items-center justify-center text-white text-2xl font-bold shadow">
              {quizzes.length}
            </div>
            <div>
              <p className="text-gray-500 text-sm">Total Questions</p>
              <p className="text-gray-800 font-bold text-lg">Quizzes</p>
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
        ) : quizzes.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400">
            <p className="text-lg font-medium">No quiz questions found</p>
            <p className="text-sm mt-1">
              Click "Add Quiz Question" to create the first one.
            </p>
          </div>
        ) : (
          /* Quizzes Table */
          <div className="bg-white rounded-2xl shadow-md border border-blue-50 overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-primary-50/50 border-b border-primary-100">
                  <th className="px-6 py-4 text-xs font-semibold text-blue-600 uppercase tracking-wider">
                    Q ID
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-blue-600 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-blue-600 uppercase tracking-wider">
                    Topic
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-blue-600 uppercase tracking-wider">
                    Question
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-blue-600 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-4 text-xs font-semibold text-blue-600 uppercase tracking-wider text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {quizzes.map((quiz) => (
                  <tr
                    key={quiz._id}
                    className="hover:bg-blue-50/40 transition-colors duration-150"
                  >
                    <td className="px-6 py-4">
                      <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-xs font-mono font-semibold">
                        {quiz.quizId}
                      </span>
                    </td>
                    <td
                      className="px-6 py-4 text-sm font-semibold text-gray-800 max-w-[150px] truncate"
                      title={getCourseName(quiz.courseId)}
                    >
                      {getCourseName(quiz.courseId)}
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm">
                      {quiz.topic}
                    </td>
                    <td className="px-6 py-4 text-gray-800 text-sm max-w-[250px]">
                      <span className="line-clamp-2" title={quiz.question}>
                        {quiz.question}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-semibold ${quiz.questionType === "MCQ" ? "bg-indigo-100 text-indigo-700" : "bg-emerald-100 text-emerald-700"}`}
                      >
                        {quiz.questionType === "TRUE_FALSE" ? "T/F" : "MCQ"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => confirmDelete(quiz)}
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

      {/* ===== Create Modal ===== */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8 animate-fade-in max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-1">
              Add New Quiz Question
            </h2>
            <p className="text-gray-400 text-sm mb-6">
              Fill in the details to create a new quiz question.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course <span className="text-red-500">*</span>
                </label>
                <select
                  name="courseId"
                  value={form.courseId}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 transition bg-white"
                >
                  <option value="" disabled>
                    Select a course
                  </option>
                  {courses.map((c) => (
                    <option key={c._id} value={c.courseId}>
                      {c.courseName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1 w-full">
                <label className="block text-sm font-medium text-gray-700">
                  Topic <span className="text-red-500">*</span>
                </label>
                <div className="w-full relative">
                  <input
                    name="topic"
                    value={form.topic}
                    onChange={handleFormChange}
                    list="topic-options"
                    placeholder="Select or type a topic..."
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400 text-gray-800 transition"
                  />
                  <datalist id="topic-options">
                    {Array.from(
                      new Set(
                        form.courseId
                          ? quizzes
                              .filter((q) => {
                                const qCourse = q.courseId;
                                const qId =
                                  typeof qCourse === "object" &&
                                  qCourse !== null
                                    ? qCourse.courseId || qCourse._id
                                    : qCourse;
                                return String(qId) === String(form.courseId);
                              })
                              .map((q) => q.topic)
                          : quizzes.map((q) => q.topic),
                      ),
                    )
                      .filter(Boolean)
                      .map((topic, i) => (
                        <option key={i} value={topic} />
                      ))}
                  </datalist>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Question ID (Number) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    name="quizId"
                    type="number"
                    value={form.quizId}
                    onChange={handleFormChange}
                    placeholder="e.g. 1"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400 text-gray-800 transition pr-10"
                  />
                  <button
                    type="button"
                    title="Get next available ID"
                    onClick={() => {
                      if (!form.topic) return;
                      const relatedQuizzes = quizzes.filter((q) => {
                        const matchCourse = form.courseId
                          ? String(
                              typeof q.courseId === "object" &&
                                q.courseId !== null
                                ? q.courseId.courseId || q.courseId._id
                                : q.courseId,
                            ) === String(form.courseId)
                          : true;
                        return matchCourse && q.topic === form.topic;
                      });
                      const usedIds = relatedQuizzes
                        .map((q) => Number(q.quizId))
                        .filter((n) => !isNaN(n));
                      const nextId =
                        usedIds.length > 0 ? Math.max(...usedIds) + 1 : 1;
                      setForm((prev) => ({
                        ...prev,
                        quizId: nextId.toString(),
                      }));
                    }}
                    className="absolute inset-y-0 right-2 flex items-center justify-center text-primary-500 hover:text-primary-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Question Type <span className="text-red-500">*</span>
                </label>
                <select
                  name="questionType"
                  value={form.questionType}
                  onChange={handleQuestionTypeChange}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 transition bg-white"
                >
                  <option value="MCQ">Multiple Choice (MCQ)</option>
                  <option value="TRUE_FALSE">True / False</option>
                </select>
              </div>

              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Question <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="question"
                  value={form.question}
                  onChange={handleFormChange}
                  rows={2}
                  placeholder="Enter the question text..."
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400 text-gray-800 transition resize-none"
                />
              </div>

              {/* Options */}
              <div className="col-span-1 md:col-span-2">
                <label className="flex items-center justify-between text-sm font-medium text-gray-700 mb-2">
                  <span>
                    Options <span className="text-red-500">*</span>
                  </span>
                  {form.questionType === "MCQ" && (
                    <button
                      type="button"
                      onClick={addOption}
                      className="text-blue-500 text-xs hover:underline"
                    >
                      + Add Option
                    </button>
                  )}
                </label>
                <div className="space-y-2">
                  {form.options.map((opt, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        value={opt}
                        onChange={(e) =>
                          handleOptionChange(index, e.target.value)
                        }
                        disabled={form.questionType === "TRUE_FALSE"}
                        placeholder={`Option ${index + 1}`}
                        className={`flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-400 text-gray-800 transition ${form.questionType === "TRUE_FALSE" ? "bg-gray-50 text-gray-500" : ""}`}
                      />
                      {form.questionType === "MCQ" &&
                        form.options.length > 2 && (
                          <button
                            type="button"
                            onClick={() => removeOption(index)}
                            className="px-3 text-red-500 hover:bg-red-50 rounded-xl transition"
                          >
                            ✕
                          </button>
                        )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-span-1 md:col-span-2 mt-4 transition-all">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Question Image (Optional)
                </label>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border border-dashed border-gray-300 rounded-2xl bg-gray-50/50">
                  {quizImagePreview ? (
                    <div className="relative group">
                      <img
                        src={quizImagePreview}
                        alt="Preview"
                        className="w-24 h-24 object-cover rounded-xl border-2 border-white shadow-md transition-transform group-hover:scale-105"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setQuizImageFile(null);
                          setQuizImagePreview("");
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full shadow-lg hover:bg-red-600 transition-colors"
                        title="Remove image"
                      >
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <div className="w-24 h-24 flex items-center justify-center bg-white border-2 border-dashed border-gray-200 rounded-xl text-gray-300">
                      <svg
                        className="w-8 h-8"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  )}

                  <div className="flex-1">
                    <p className="text-xs text-gray-500 mb-2">
                      JPG or PNG allowed. Max size 2MB.
                    </p>
                    <label className="inline-flex items-center px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                      {quizImagePreview
                        ? "Change Image"
                        : "Upload Question Image"}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            setQuizImageFile(file);
                            setQuizImagePreview(URL.createObjectURL(file));
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="col-span-1 md:col-span-2 mt-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Correct Answer <span className="text-red-500">*</span>
                </label>
                {form.questionType === "TRUE_FALSE" ? (
                  <select
                    name="correctAnswer"
                    value={form.correctAnswer}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 transition bg-white"
                  >
                    <option value="True">True</option>
                    <option value="False">False</option>
                  </select>
                ) : (
                  <select
                    name="correctAnswer"
                    value={form.correctAnswer}
                    onChange={handleFormChange}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-800 transition bg-white"
                  >
                    <option value="" disabled>
                      Select correct answer
                    </option>
                    {form.options.map(
                      (opt, i) =>
                        opt.trim() !== "" && (
                          <option key={i} value={opt}>
                            {opt}
                          </option>
                        ),
                    )}
                  </select>
                )}
                <p className="text-xs text-gray-400 mt-1">
                  Select from the options defined above.
                </p>
              </div>
            </div>

            {formError && (
              <p className="mt-4 text-red-500 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-2">
                {formError}
              </p>
            )}

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
                className="flex-1 py-2.5 rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-all disabled:opacity-60"
              >
                {saving ? "Creating…" : "Create Question"}
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
              Delete Question?
            </h3>
            <p className="text-gray-500 text-sm mb-6">
              Are you sure you want to delete this quiz question (ID:{" "}
              <span className="font-semibold text-gray-700">
                {deleteTarget.quizId}
              </span>
              )? This action cannot be undone.
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
