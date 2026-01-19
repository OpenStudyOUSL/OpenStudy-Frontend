import CourseCard from "../../components/CourseCard";

function HomePage() {
  return (
    <>
    <section className="bg-purple-100">
      <div className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">

        {/* LEFT TEXT */}
        <div>
          <p className="text-purple-600 font-semibold mb-3">
            OUSL First Year Success
          </p>

          <h1 className="text-5xl font-extrabold text-purple-700 leading-tight mb-6">
            Start Learning <br /> at Excellence
          </h1>

          <p className="text-gray-600 text-lg">
            Your comprehensive study platform for OUSL first-year students.
            Access past papers, interactive quizzes, study summaries, and
            compete with fellow students.
          </p>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
            alt="Study"
            className="rounded-3xl w-full max-w-md shadow-lg"
          />
        </div>

      </div>
    </section>
    

    <section className="bg-purple-400 text-white">
      <div className="max-w-6xl mx-auto px-6 py-14 grid grid-cols-1 md:grid-cols-3 text-center gap-8">

        <div>
          <h2 className="text-4xl font-bold">8</h2>
          <p className="mt-2 text-lg">Subjects Covered</p>
        </div>

        <div>
          <h2 className="text-4xl font-bold">500+</h2>
          <p className="mt-2 text-lg">Practice Questions</p>
        </div>

        <div>
          <h2 className="text-4xl font-bold">24/7</h2>
          <p className="mt-2 text-lg">Hours Access</p>
        </div>

      </div>
    </section>
    </>
  )
};

export default HomePage;