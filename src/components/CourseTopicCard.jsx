import { Link } from "react-router-dom";

export default function QuizTopicCard({
  topicName,
  quizCount = 0,
  courseId,               // ← required to build correct link
  className = "",         // optional: extra classes from parent
}) {

  // Disable if critical data is missing or zero quizzes
  const isDisabled = !courseId || !topicName || quizCount === 0;

  return (
    <div
      className={`
        w-full max-w-md
        bg-linear-to-br from-purple-600 to-purple-700
        text-white
        rounded-2xl
        overflow-hidden
        shadow-lg
        hover:shadow-2xl
        hover:scale-[1.03]
        transition-all duration-300
        group
        ${className}
      `}
    >
      <div className="px-6 py-6 flex flex-col gap-5">
        {/* Topic name */}
        <h2
          className="
            text-2xl md:text-3xl 
            font-bold 
            leading-tight
            group-hover:text-purple-100
            transition-colors duration-300
          "
        >
          {topicName || "Unnamed Topic"}
        </h2>

        {/* Bottom section: count + button */}
        <div className="flex items-center justify-between mt-2">
          {/* Quiz count */}
          <div className="text-lg font-medium opacity-90">
            {quizCount} {quizCount === 1 ? "Quiz" : "Quizzes"}
          </div>

          {/* Attempt button */}
          {isDisabled ? (
            <button
              disabled
              className="
                bg-white/20
                text-white/50
                font-semibold
                text-base
                px-7 py-3
                rounded-full
                cursor-not-allowed
                backdrop-blur-sm
                border border-white/10
              "
            >
              Attempt
            </button>
          ) : (
            <Link
              to={`/courseinfo/${courseId}/${topicName}`}
              className="
                bg-white 
                text-purple-700
                font-semibold
                text-base
                px-7 py-3
                rounded-full
                shadow-md
                hover:bg-purple-50
                hover:text-purple-800
                hover:shadow-lg
                active:scale-95
                transition-all duration-200
                flex items-center gap-2
              "
            >
              Attempt
              <span className="text-lg">→</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}