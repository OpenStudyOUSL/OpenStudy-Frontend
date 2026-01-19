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
    <div className="bg-linear-to-br from-red-50 via-rose-50 to-white min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-20 pb-28 md:pt-32 md:pb-40 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-red-600/10 via-rose-500/5 to-transparent" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-red-400/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-rose-400/10 rounded-full blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-5 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
          >
            <span className="inline-block px-4 py-1.5 bg-red-100 text-red-700 rounded-full text-sm font-semibold mb-6">
              OUSL Student Project 2025–2026
            </span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-5">
              Transforming Exam Prep
              <br />
              <span className="bg-linear-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">
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
          viewport={{ once: true }}
          variants={container}
          className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-xl border border-red-100"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 text-center">
            Our Story
          </h2>

          <div className="prose prose-lg max-w-none space-y-7 text-gray-700">
            <p>
              We are final-year students at the Open University of Sri Lanka.
              We once struggled with scattered resources and exam stress.
            </p>
            <p>
              Through the Software Design course (EEY4189), we decided to build
              something meaningful.
            </p>
            <p className="font-semibold text-red-700 text-lg">
              Designed by students, for students.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Mission + Vision + Values */}
      <section className="bg-linear-to-b from-red-900/5 to-transparent py-24">
        <div className="max-w-6xl mx-auto px-5 md:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16">
            Why We Exist
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-red-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Mission</h3>
              <p className="text-gray-700">
                Deliver a free platform that saves time and reduces stress.
              </p>
            </div>

            <div className="bg-linear-to-br from-red-600 to-rose-600 text-white rounded-2xl p-8 shadow-2xl scale-105">
              <h3 className="text-2xl font-bold mb-4">Vision</h3>
              <p>
                Become the #1 digital study companion for OUSL students.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-red-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Values</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Accessibility</li>
                <li>• Innovation</li>
                <li>• Student-first</li>
                <li>• Transparency</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-5">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Meet The Team
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-10">
            {teamMembers.map((member) => (
              <motion.div
                key={member.regNo}
                variants={itemFadeUp}
                initial="hidden"
                whileInView="visible"
                whileHover={{ scale: 1.05, y: -10 }}
                className="bg-red-200 rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="p-6 text-center">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-28 h-28 mx-auto rounded-full border-4 border-white shadow-lg mb-4"
                  />
                  <h3 className="font-bold text-gray-900">{member.name}</h3>
                  <p className="text-red-700 text-sm">{member.role}</p>
                  <p className="text-xs text-gray-600 mb-4">{member.regNo}</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {member.skills.map((skill) => (
                      <span
                        key={skill}
                        className="bg-red-50 text-red-700 text-xs px-3 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
