import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    const handleStorageChange = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <>
      {/* HERO (About Us style) */}
      <section className="relative overflow-hidden bg-linear-to-br from-red-50 via-rose-50 to-white">
        {/* soft overlays + glows */}
        <div className="absolute inset-0 bg-linear-to-br from-red-700/10 via-rose-600/6 to-transparent" />
        <div className="pointer-events-none absolute -top-48 -right-40 h-104 w-104 rounded-full bg-red-400/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-52 -left-40 h-112 w-md rounded-full bg-rose-400/20 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-red-200/70 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">
          {/* LEFT TEXT */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-red-700 font-semibold mb-3"
            >
              OUSL First Year Success
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-5xl font-extrabold leading-tight mb-6 text-gray-900"
            >
              Start Learning <br />
              <span className="bg-linear-to-r from-red-700 via-rose-700 to-red-700 bg-clip-text text-transparent">
                at Excellence
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-gray-700 text-lg max-w-xl leading-relaxed"
            >
              Your comprehensive study platform for OUSL first-year students.
              Access past papers, interactive quizzes, study summaries, and
              compete with fellow students.
            </motion.p>

            {/* CTA BUTTONS */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-8 flex flex-col sm:flex-row gap-3"
            >
              {/* Get Started / Course */}
              <Link
                to={isLoggedIn ? "/course" : "/login"}
                className="
                  group relative inline-flex items-center justify-center overflow-hidden
                  rounded-xl bg-red-700 px-8 py-4
                  text-lg font-bold text-white
                  shadow-xl shadow-red-700/30
                  transition-all duration-300 ease-out
                  hover:bg-red-800 hover:shadow-red-700/50 hover:-translate-y-1
                  focus:outline-none focus:ring-4 focus:ring-red-300 active:scale-95
                "
              >
                <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-150%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(150%)]">
                  <div className="relative h-full w-8 bg-white/20" />
                </div>

                <span className="relative flex items-center gap-2">
                  {isLoggedIn ? "Course" : "Get Started"}
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </motion.div>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="flex justify-center"
          >
            <div
              className="
                group relative max-w-md w-full
                rounded-3xl overflow-hidden
                border border-red-200/60 bg-white/50 backdrop-blur
                shadow-xl shadow-red-900/10
                transition-all duration-500
                hover:-translate-y-1 hover:shadow-2xl
              "
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-red-400/25 blur-3xl" />
                <div className="absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-rose-400/25 blur-3xl" />
              </div>

              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
                alt="Study"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS SECTION (About style glass cards) */}
      <section className="bg-linear-to-b from-red-100/40 to-transparent py-14">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 text-center gap-8">
          {[
            { value: "8", label: "Subjects Covered" },
            { value: "500+", label: "Practice Questions" },
            { value: "24/7", label: "Hours Access" },
          ].map((s, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              key={s.label}
              className="
                group rounded-3xl border border-red-200 bg-white/80
                backdrop-blur p-8
                shadow-xl shadow-red-900/5
                transition-all duration-300
                hover:-translate-y-1 hover:shadow-2xl
              "
            >
              <h2 className="text-4xl font-extrabold text-gray-900">
                {s.value}
              </h2>
              <p className="mt-2 text-lg text-gray-700 group-hover:text-gray-800 transition-colors">
                {s.label}
              </p>

              <div className="mt-5 h-px w-full bg-linear-to-r from-transparent via-red-200/80 to-transparent" />
              <p className="mt-4 text-sm text-red-800 font-semibold">
                Student-first • Fast access
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
