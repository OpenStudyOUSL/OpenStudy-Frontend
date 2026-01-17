import React from "react";
import { motion } from "framer-motion";

// Animation Variants
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.14, delayChildren: 0.2 },
  },
};

const itemFadeUp = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 14, duration: 0.7 },
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
    <div className="bg-linear-to-br from-indigo-50 via-purple-50 to-white min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-28 md:pt-32 md:pb-40 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-purple-600/8 via-indigo-500/5 to-transparent" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-5 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >
            <span className="inline-block px-4 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-6">
              OUSL Student Project 2025–2026
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-5">
              Transforming Exam Prep
              <br />
              <span className="bg-linear-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                for OUSL First Years
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto font-light leading-relaxed">
              Built with passion by final-year students who truly understand your struggle
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="max-w-6xl mx-auto px-5 md:px-8 pb-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={container}
          className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-white/40"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 text-center">
            Our Story
          </h2>

          <div className="prose prose-lg prose-purple max-w-none space-y-7 text-gray-700">
            <p>
              We are final-year students at the Open University of Sri Lanka.
              Just like you, we once struggled with scattered resources,
              outdated past papers, and the overwhelming stress of exam preparation during our first year.
            </p>

            <p>
              Through the Software Design course (EEY4189), we decided to stop complaining and{" "}
              <strong>actually do something</strong> about it.
            </p>

            <p className="font-semibold text-purple-700 text-lg">
              What began as a university project has grown into a serious platform — designed by students, for students.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Mission + Vision + Values */}
      <section className="bg-linear-to-b from-purple-900/5 to-transparent py-24">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-5"
          >
            Why We Exist
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center text-gray-600 text-xl mb-16 max-w-3xl mx-auto"
          >
            Our mission is simple: make your first-year exam journey easier and more enjoyable
          </motion.p>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {/* Mission Card */}
            <motion.div
              variants={itemFadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-purple-100 group"
            >
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6 text-purple-600 text-2xl font-bold group-hover:scale-110 transition-transform">
                M
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                Deliver a clean, powerful, completely free platform that saves time, reduces stress, and helps first-year OUSL students perform better.
              </p>
            </motion.div>

            {/* Vision Card */}
            <motion.div
              variants={itemFadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-linear-to-br from-purple-600 to-indigo-600 text-white rounded-2xl p-8 shadow-2xl relative overflow-hidden group scale-105"
            >
              <div className="absolute -right-12 -top-12 w-40 h-40 bg-white/10 rounded-full blur-xl" />
              <div className="relative z-10">
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-6 text-white text-2xl font-bold">
                  V
                </div>
                <h3 className="text-2xl font-bold mb-4">Vision</h3>
                <p className="opacity-95 leading-relaxed">
                  Become the #1 digital study companion trusted by thousands of OUSL students — modern, mobile-first, and genuinely helpful.
                </p>
              </div>
            </motion.div>

            {/* Values Card */}
            <motion.div
              variants={itemFadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-purple-100 group"
            >
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6 text-purple-600 text-2xl font-bold group-hover:scale-110 transition-transform">
                ♥
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Core Values</h3>
              <ul className="space-y-4">
                {["Accessibility", "Innovation", "Student-first mindset", "Transparency", "Educational equity"].map(
                  (value, index) => (
                    <motion.li
                      key={value}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.4 }}
                      className="flex items-center gap-3 text-gray-700 text-lg group-hover:text-gray-800 transition-colors"
                    >
                      <span className="text-purple-500 text-xl font-bold">•</span>
                      <span>{value}</span>
                    </motion.li>
                  )
                )}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section - with Hover Animations */}
      <section className="py-28 md:py-36">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-5">
              Meet The Team
            </h2>
            <p className="text-gray-600 text-xl">
              The people who turned frustration into a solution
            </p>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            className="grid gap-10 sm:gap-12 lg:gap-14 xl:gap-16 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
          >
            {teamMembers.map((member) => (
              <motion.div
                key={member.regNo}
                variants={itemFadeUp}
                className="group"
                whileHover={{ scale: 1.04, y: -10 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div
                  className={`
                    relative bg-purple-200 rounded-2xl overflow-hidden 
                    shadow-lg group-hover:shadow-2xl group-hover:shadow-purple-200/30
                    border border-gray-100 group-hover:border-purple-200/60
                    transition-all duration-500 h-full flex flex-col min-w-65
                  `}
                >
                  {/* Gradient overlay on hover */}
                  <div
                    className={`
                      absolute inset-0 bg-linear-to-t from-purple-700/65 via-purple-600/25 to-transparent 
                      opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out
                    `}
                  />

                  <div className="p-8 flex flex-col items-center text-center grow relative z-10">
                    {/* Profile Image with hover effects */}
                    <div className="relative mb-6">
                      <div
                        className={`
                          absolute inset-0 bg-linear-to-br from-purple-500/30 to-indigo-600/30 
                          rounded-full blur-xl opacity-0 scale-90 
                          group-hover:opacity-70 group-hover:scale-125 
                          transition-all duration-700 ease-out
                        `}
                      />
                      <div
                        className={`
                          rounded-full overflow-hidden border-4 border-white shadow-xl 
                          group-hover:scale-110 group-hover:border-purple-300/70
                          transition-all duration-500
                        `}
                      >
                        <img
                          src={member.image}
                          alt={member.name}
                          className={`
                            w-32 h-32 md:w-36 md:h-36 object-cover 
                            transition-transform duration-700 group-hover:scale-110
                          `}
                        />
                      </div>
                    </div>

                    {/* Name with animated underline */}
                    <h3
                      className={`
                        text-xl font-bold text-gray-900 mb-1 
                        group-hover:text-purple-700 relative pb-1.5
                        transition-colors duration-400
                      `}
                    >
                      {member.name}
                      <span
                        className={`
                          absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 
                          bg-linear-to-r from-purple-500 to-indigo-600 
                          group-hover:w-4/5 transition-all duration-600 rounded-full
                        `}
                      />
                    </h3>

                    <p className="text-sm text-purple-600 font-medium mb-2 group-hover:text-purple-800 transition-colors">
                      {member.role}
                    </p>

                    <p className="text-xs text-gray-500 mb-6 group-hover:text-gray-600 transition-colors">
                      {member.regNo}
                    </p>

                    {/* Skills with pop effect */}
                    <div className="flex flex-wrap justify-center gap-2.5 mt-auto">
                      {member.skills.map((skill) => (
                        <span
                          key={skill}
                          className={`
                            bg-purple-50/70 text-purple-700 text-xs font-medium 
                            px-3.5 py-1.5 rounded-full border border-purple-100/50
                            group-hover:bg-purple-100 group-hover:text-purple-800 
                            group-hover:scale-105 group-hover:shadow-sm
                            transition-all duration-400 ease-out
                          `}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;