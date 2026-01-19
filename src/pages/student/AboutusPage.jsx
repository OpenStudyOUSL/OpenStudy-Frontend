import React from "react";
import { motion } from "framer-motion";

// Animations
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 140, damping: 18 },
  },
};

const teamMembers = [
  {
    name: "K.R. Malinga",
    regNo: "423600376",
    role: "Frontend & Testing",
    skills: ["React", "Tailwind", "Teamwork"],
    image: "./profile.jpg",
  },
  {
    name: "W.M.W. Wijesinghe",
    regNo: "123599265",
    role: "UI/UX Designer",
    skills: ["UI/UX", "Figma", "Canva"],
    image: "./profile.jpg",
  },
  {
    name: "T. Jayawickrama",
    regNo: "223593459",
    role: "Frontend Dev",
    skills: ["React", "Tailwind", "Express"],
    image: "./profile.jpg",
  },
  {
    name: "K.G.A.S. Sameera",
    regNo: "223605905",
    role: "Full-Stack Dev",
    skills: ["Node.js", "MongoDB", "Express", "React"],
    image: "./profile.jpg",
  },
  {
    name: "N.K. Dasanayaka",
    regNo: "323606637",
    role: "Frontend & Testing",
    skills: ["React", "Testing", "Tailwind"],
    image: "./profile.jpg",
  },
];

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-red-50 via-rose-50 to-white text-gray-900">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-red-700/10 via-rose-600/6 to-transparent" />
        <div className="absolute -top-48 -right-40 h-[26rem] w-[26rem] rounded-full bg-red-400/20 blur-3xl" />
        <div className="absolute -bottom-52 -left-40 h-[28rem] w-[28rem] rounded-full bg-rose-400/20 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-red-200/70 to-transparent" />

        <div className="relative mx-auto max-w-6xl px-6 pt-24 pb-18 md:pt-28 md:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-white/70 px-4 py-2 text-sm font-semibold text-red-800 shadow-sm backdrop-blur">
              <span className="inline-block h-2 w-2 rounded-full bg-red-500" />
              OUSL Student Project 2025–2026
            </span>

            <h1 className="mt-7 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              Transforming Exam Prep
              <br />
              <span className="bg-linear-to-r from-red-700 via-rose-700 to-red-700 bg-clip-text text-transparent">
                for OUSL First Years
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg text-gray-800 md:text-xl">
              Built with passion by final-year students who truly understand the struggle —
              designed to save time, reduce stress, and boost results.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="#story"
                className="inline-flex items-center justify-center rounded-xl bg-red-700 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-red-700/20 transition hover:bg-red-800 focus:outline-hidden focus:ring-4 focus:ring-red-300"
              >
                Our Story
              </a>
              <a
                href="#team"
                className="inline-flex items-center justify-center rounded-xl border border-red-200 bg-white/70 px-6 py-3 text-sm font-semibold text-red-800 shadow-sm backdrop-blur transition hover:bg-white focus:outline-hidden focus:ring-4 focus:ring-red-200"
              >
                Meet the Team
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* OUR STORY (FULL + BETTER UI) */}
      <section id="story" className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={container}
          className="rounded-3xl border border-red-200 bg-white/80 p-8 md:p-12 shadow-2xl shadow-red-900/5 backdrop-blur"
        >
          <motion.h2
            variants={item}
            className="text-center text-3xl md:text-4xl font-extrabold tracking-tight"
          >
            Our Story
          </motion.h2>

          <motion.div
            variants={container}
            className="mt-10 space-y-7 text-gray-800 text-lg leading-relaxed"
          >
            <motion.p variants={item}>
              We are final-year students at the Open University of Sri Lanka.
              Just like you, we once struggled with scattered resources, outdated past papers,
              and the overwhelming stress of exam preparation during our first year.
            </motion.p>

            <motion.p variants={item}>
              Through the Software Design course (EEY4189), we decided to stop complaining and{" "}
              <span className="font-semibold text-gray-900">actually do something</span> about it.
            </motion.p>

            <motion.p variants={item} className="font-semibold text-red-800">
              What began as a university project has grown into a serious platform — designed by students, for students.
            </motion.p>

            {/* Small highlight row */}
            <motion.div
              variants={item}
              className="mt-8 grid gap-4 sm:grid-cols-3"
            >
              {[
                { t: "Student-built", d: "Based on real first-year needs" },
                { t: "Fast access", d: "Less searching, more studying" },
                { t: "Modern UI", d: "Mobile-friendly experience" },
              ].map((x) => (
                <div
                  key={x.t}
                  className="rounded-2xl border border-red-100 bg-red-50/60 p-5"
                >
                  <p className="font-bold text-gray-900">{x.t}</p>
                  <p className="mt-1 text-sm text-gray-700">{x.d}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* WHY WE EXIST */}
      <section className="bg-linear-to-b from-red-100/40 to-transparent py-18 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-4xl font-extrabold tracking-tight md:text-5xl">
              Why We Exist
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-800">
              A clearer mission, a stronger vision, and values that keep us student-first.
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-14 grid gap-8 md:grid-cols-3"
          >
            {/* Mission */}
            <motion.div
              variants={item}
              className="group rounded-3xl border border-red-200 bg-white p-8 shadow-xl shadow-red-900/5 transition hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-red-100 text-red-900 font-extrabold group-hover:scale-110 transition">
                  M
                </div>
                <h3 className="text-xl font-bold">Mission</h3>
              </div>
              <p className="mt-4 text-gray-800 leading-relaxed">
                Deliver a clean, powerful, completely free platform that saves time, reduces stress,
                and helps first-year OUSL students perform better.
              </p>
            </motion.div>

            {/* Vision */}
            <motion.div
              variants={item}
              className="relative overflow-hidden rounded-3xl bg-linear-to-br from-red-700 to-rose-700 p-8 text-white shadow-2xl shadow-red-800/20"
            >
              <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
              <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
              <div className="relative">
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/20 font-extrabold">
                    V
                  </div>
                  <h3 className="text-xl font-bold">Vision</h3>
                </div>
                <p className="mt-4 opacity-95 leading-relaxed">
                  Become the #1 digital study companion trusted by thousands of OUSL students —
                  modern, mobile-first, and genuinely helpful.
                </p>
                <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
                  <span className="h-2 w-2 rounded-full bg-white" />
                  Mobile-first experience
                </div>
              </div>
            </motion.div>

            {/* Values */}
            <motion.div
              variants={item}
              className="group rounded-3xl border border-red-200 bg-white p-8 shadow-xl shadow-red-900/5 transition hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-red-100 text-red-900 font-extrabold group-hover:scale-110 transition">
                  ♥
                </div>
                <h3 className="text-xl font-bold">Core Values</h3>
              </div>

              <ul className="mt-5 space-y-3 text-gray-800">
                {[
                  "Accessibility",
                  "Innovation",
                  "Student-first mindset",
                  "Transparency",
                  "Educational equity",
                ].map((v) => (
                  <li key={v} className="flex items-center gap-3">
                    <span className="text-red-700 text-xl leading-none">•</span>
                    <span className="font-medium">{v}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* TEAM */}
      <section id="team" className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold tracking-tight md:text-5xl">
              Meet The Team
            </h2>
            <p className="mt-4 text-lg text-gray-800">
              The people who turned frustration into a solution
            </p>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
          >
            {teamMembers.map((m) => (
              <motion.div
                key={m.regNo}
                variants={item}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 280, damping: 18 }}
                className="group"
              >
                <div className="relative h-full overflow-hidden rounded-3xl border border-red-200 bg-white shadow-xl shadow-red-900/5">
                  <div className="h-2 w-full bg-linear-to-r from-red-600 via-rose-600 to-red-600" />

                  <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                    <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-red-400/25 blur-3xl" />
                    <div className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-rose-400/25 blur-3xl" />
                  </div>

                  <div className="relative p-7 flex flex-col items-center text-center h-full">
                    <div className="relative mb-5">
                      <div className="absolute inset-0 rounded-full bg-red-200 blur-xl opacity-0 scale-90 transition duration-700 group-hover:opacity-70 group-hover:scale-125" />
                      <div className="rounded-full overflow-hidden border-4 border-red-200 shadow-lg transition group-hover:border-red-300">
                        <img
                          src={m.image}
                          alt={m.name}
                          className="h-28 w-28 object-cover transition duration-700 group-hover:scale-110"
                        />
                      </div>
                    </div>

                    <h3 className="text-lg font-extrabold text-gray-900">{m.name}</h3>
                    <p className="mt-1 text-sm font-semibold text-red-800">{m.role}</p>
                    <p className="mt-1 text-xs text-gray-600">{m.regNo}</p>

                    <div className="mt-5 flex flex-wrap justify-center gap-2">
                      {m.skills.map((s) => (
                        <span
                          key={s}
                          className="rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-semibold text-red-900 transition group-hover:bg-red-100"
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto pt-6">
                      <span className="inline-flex items-center gap-2 text-xs font-semibold text-gray-700">
                        <span className="h-1.5 w-1.5 rounded-full bg-red-600" />
                        OUSL • EEY4189
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-red-200/70 bg-white/60 backdrop-blur py-8">
        <div className="mx-auto max-w-6xl px-6 text-center text-sm text-gray-700">
          © {new Date().getFullYear()} OUSL Student Project • Built with MERN
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;
