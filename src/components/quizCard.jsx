import React from "react";

export default function QuizCard(props) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 max-w-3xl w-full text-center">
      {/* Question */}
      <p className="text-xl md:text-2xl font-medium text-gray-800 mb-10 leading-relaxed">
        {props.question}
      </p>

      {/* Answers */}
      <div className="space-y-4 max-w-lg mx-auto">
        {props.isTrueFalse ? (
          <>
            {["True", "False"].map((value) => (
              <button
                key={value}
                onClick={() => props.onAnswer(value)}
                disabled={props.selectedAnswer !== null}
                className={`w-full py-5 text-xl font-semibold rounded-full border-2 transition-all
                  ${
                    props.selectedAnswer === value
                      ? props.isCorrect
                        ? "bg-green-500 border-green-600 text-white"
                        : "bg-red-500 border-red-600 text-white"
                      : "bg-white border-gray-300 hover:bg-gray-100"
                  }`}
              >
                {value}
              </button>
            ))}
          </>
        ) : (
          question.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => onAnswer(option)}
              disabled={selectedAnswer !== null}
              className={`w-full py-4 px-6 text-lg font-medium rounded-xl border-2 transition-all
                ${
                  selectedAnswer === option
                    ? isCorrect
                      ? "bg-green-500 border-green-600 text-white"
                      : "bg-red-500 border-red-600 text-white"
                    : "bg-white border-gray-300 hover:bg-gray-50"
                }`}
            >
              {option}
            </button>
          ))
        )}
      </div>

      {/* Feedback */}
      {showFeedback && (
        <div className="mt-10 text-lg font-medium">
          {isCorrect ? (
            <div className="text-green-600 flex items-center justify-center gap-3">
              <span className="text-3xl">✓</span>
              <span>Correct! Great job 🔥</span>
            </div>
          ) : (
            <div className="text-red-600 flex flex-col items-center gap-2">
              <span className="text-3xl">✗</span>
              <span>Wrong answer</span>
              <span className="text-gray-700">
                Correct answer:{" "}
                <strong>{question.correctAnswer}</strong>
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
