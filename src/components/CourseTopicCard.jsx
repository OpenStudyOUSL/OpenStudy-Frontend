import { Link } from "react-router-dom";

export default function QuizTopicCard(props) {
  return (
    <div
      className="
        w-full max-w-md       
        bg-purple-600           
        text-white
        rounded-2xl               
        overflow-hidden
        shadow-lg
        hover:shadow-2xl
        hover:scale-[1.02]
        transition-all duration-300
        group
      "
    >
      <div className="px-6 py-5 flex flex-col gap-4">
        {/* Topic name - large, bold, left */}
        <h2
          className="
            text-xl md:text-2xl 
            font-bold 
            leading-tight
            group-hover:text-purple-100
            transition-colors
          "
        >
          {props.topicName || "Topic of Quiz one"}
        </h2>

        {/* Bottom row: Quizzes count + Attempt button */}
        <div className="flex items-center justify-between mt-2">
          {/* Quizzes count */}
          <div className="text-base md:text-lg font-medium opacity-90">
            Quizzes {props.quizCount ?? 5}
          </div>

          {/* Attempt button - white pill */}
          {props.linkTo ? (
            <Link
              to="/quiz"
              className="
                bg-white 
                text-purple-700
                font-semibold
                text-sm md:text-base
                px-6 py-2.5
                rounded-full               /* pill shape */
                shadow-md
                hover:bg-gray-100
                hover:shadow-lg
                active:scale-95
                transition-all duration-200
              "
            >
              Attempt
            </Link>
          ) : (
            <button
              onClick={props.onAttempt}
              className="
                bg-white 
                text-purple-700
                font-semibold
                text-sm md:text-base
                px-6 py-2.5
                rounded-full
                shadow-md
                hover:bg-gray-100
                hover:shadow-lg
                active:scale-95
                transition-all duration-200
              "
            >
              Attempt
            </button>
          )}
        </div>
      </div>
    </div>
  );
}