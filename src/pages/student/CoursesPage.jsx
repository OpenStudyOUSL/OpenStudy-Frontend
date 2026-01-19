import { useMemo, useState } from "react";
import CourseCard from "../../components/CourseCard";

function CoursePage() {
  const [search, setSearch] = useState("");

  // Temporary static data (later you can fetch from backend)
  const courses = [
    {
      id: "C001",
      title: "Sample Course name",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&auto=format&fit=crop",
      instructor: "John Doe",
      description: "Learn the basics and build strong fundamentals.",
    },
    {
      id: "C002",
      title: "Course name",
      image:
        "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1200&auto=format&fit=crop",
      instructor: "Sarah Lee",
      description: "Practical learning with real examples and projects.",
    },
    {
      id: "C003",
      title: "Course name",
      image:
        "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&auto=format&fit=crop",
      instructor: "Mike Smith",
      description: "Step-by-step guidance from beginner to advanced.",
    },
    {
      id: "C004",
      title: "Course name",
      image:
        "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&auto=format&fit=crop",
      instructor: "Emma Brown",
      description: "Build your skills with hands-on tasks and quizzes.",
    },
    {
      id: "C005",
      title: "Course name",
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop",
      instructor: "David Johnson",
      description: "Learn concepts clearly with structured lessons.",
    },
    {
      id: "C006",
      title: "Course name",
      image:
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop",
      instructor: "Olivia Green",
      description: "Improve your knowledge with guided practice.",
    },
    {
      id: "C007",
      title: "Course name",
      image:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop",
      instructor: "Kevin White",
      description: "A friendly roadmap to master the topic.",
    },
    {
      id: "C008",
      title: "Course name",
      image:
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&auto=format&fit=crop",
      instructor: "Sophia Wilson",
      description: "Learn efficiently with bite-sized lessons.",
    },
    {
      id: "C009",
      title: "Course name",
      image:
        "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&auto=format&fit=crop",
      instructor: "Noah Taylor",
      description: "Start learning today with well-planned lessons.",
    },
  ];

  const filteredCourses = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return courses;
    return courses.filter((c) => c.title.toLowerCase().includes(q));
  }, [search]);

  return (
    <div className="min-h-[calc(100vh-140px)] bg-violet-100">
      {/* Page content container */}
      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Header row: title + search (like prototype) */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <h1 className="text-3xl font-extrabold text-slate-900">Courses</h1>

          <div className="relative w-full md:w-[360px]">
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
          {filteredCourses.map((course) => (
            <CourseCard
              key={course.id}
              image={course.image}
              title={course.title}
              courseId={course.id}
              instructor={course.instructor}
              description={course.description}
            />
          ))}
        </div>

        {/* Empty state */}
        {filteredCourses.length === 0 && (
          <div className="mt-8 rounded-xl bg-white/60 p-6 text-center text-sm text-slate-700 ring-1 ring-black/5">
            No courses found.
          </div>
        )}
      </div>
    </div>
  );
}

export default CoursePage;
