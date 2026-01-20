import { useEffect, useState } from "react";
import CourseCard from "../../components/CourseCard";
import axios from "axios";
import toast from "react-hot-toast";


export default function CoursePage() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState("loading");
  const [courses, setCourses] = useState([]);


  useEffect(() => {
    if (loading === "loading") {
      axios.get(import.meta.env.VITE_BACKEND_URL + "/api/Courses").then((res) => {
          setCourses(res.data);
          console.log(res.data);
          setLoading("loaded");
        }).catch(
          (err) => toast.error("Error loading courses")
        );
    }
  }, []);

  
  

  return (
    <div className="min-h-[calc(100vh-140px)] bg-violet-100">
      {/* Page content container */}
      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Header row: title + search (like prototype) */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-3xl font-extrabold text-slate-900">Courses</h1>

          <div className="relative w-full md:w-90">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Find courses..."
              className="w-full rounded-full bg-white px-4 py-2 pr-10 text-sm shadow-sm ring-1 ring-black/10 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
              🔍
            </span>
          </div>
        </div>

        {/* Courses grid */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((Course) => (
            <CourseCard
              key={Course.courseId}
              image={Course.courseImage}
              title={Course.courseName}
              courseId={Course.courseId}
              instructor={Course.courseTutor}
              description={Course.courseDescription}
            />
          ))}
        </div>

        {/* Empty state */}
        {courses.length === 0 && (
          <div className="mt-8 rounded-xl bg-white/60 p-6 text-center text-sm text-slate-700 ring-1 ring-black/5">
            No courses found.
          </div>
        )}
      </div>
    </div>
  );
}

 
