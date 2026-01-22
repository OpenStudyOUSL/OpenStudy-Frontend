import { useEffect, useState } from "react";
import CourseCard from "../../components/CourseCard";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export default function CoursePage() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true); // better as boolean
  const [courses, setCourses] = useState([]);   // all courses from API
  const [filteredCourses, setFilteredCourses] = useState([]); // displayed courses


  const { courseId } = useParams();
  const navigate = useNavigate();

  // Fetch courses once on mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/Courses`);
        setCourses(res.data);
        setFilteredCourses(res.data); // initially show all
      } catch (err) {
        console.error("Error loading courses:", err);
        toast.error("Failed to load courses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();

    
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You need to login to view this course");
      navigate("/login");
    }
  }, [navigate]);

  // Filter courses whenever search or courses change
  useEffect(() => {
    if (!search.trim()) {
      // empty search → show all courses
      setFilteredCourses(courses);
      return;
    }

    const searchTerm = search.toLowerCase().trim();

    const filtered = courses.filter((course) =>
      course.courseName?.toLowerCase().includes(searchTerm) ||
      course.courseDescription?.toLowerCase().includes(searchTerm) ||
      course.courseTutor?.toLowerCase().includes(searchTerm)
    );

    setFilteredCourses(filtered);
  }, [search, courses]);

  return (
    <div className="min-h-[calc(100vh-140px)] bg-violet-100">
      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-3xl font-extrabold text-slate-900">Courses</h1>

          <div className="relative w-full md:w-80">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search courses..."
              className="w-full rounded-full bg-white px-4 py-2 pr-10 text-sm shadow-sm ring-1 ring-black/10 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
              🔍
            </span>
          </div>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="mt-12 text-center text-slate-600">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-violet-500 border-t-transparent"></div>
            <p className="mt-3">Loading courses...</p>
          </div>
        )}

        {/* Courses grid */}
        {!loading && (
          <>
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCourses.map((course) => (
                <CourseCard
                  key={course.courseId || course._id} // use _id if courseId not present
                  image={course.courseImage}
                  title={course.courseName}
                  courseId={course.courseId || course._id}
                  instructor={course.courseTutor}
                  description={course.courseDescription}
                />
              ))}
            </div>

            {/* Empty state */}
            {filteredCourses.length === 0 && courses.length > 0 && (
              <div className="mt-12 rounded-xl bg-white/60 p-8 text-center text-slate-700 ring-1 ring-black/5">
                <p className="text-lg font-medium">No courses match "{search}"</p>
                <p className="mt-2 text-sm">Try different keywords or clear the search.</p>
              </div>
            )}

            {courses.length === 0 && !loading && (
              <div className="mt-12 rounded-xl bg-white/60 p-8 text-center text-slate-700 ring-1 ring-black/5">
                No courses available at the moment.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}