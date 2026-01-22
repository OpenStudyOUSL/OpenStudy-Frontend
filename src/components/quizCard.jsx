// src/components/QuizCard.jsx
import React from "react";

export default function QuizCard({
  question = "",
  options = [],
  correctAnswer = "",
  selectedAnswer = null,
  isCorrect = null,
  showFeedback = false,
  onAnswer = () => {},
  questionType = "MCQ",
}) {
  // Normalize options for TRUE/FALSE (in case stored differently)
  const displayOptions =
    questionType === "TRUE_FALSE"
      ? ["True", "False"]
      : options;

  const isTrueFalse = questionType === "TRUE_FALSE" || displayOptions.length === 2;

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-3xl w-full mx-auto">
      {/* Question */}
      <p className="text-xl md:text-2xl font-semibold text-gray-900 mb-10 leading-relaxed text-center">
        {question}
      </p>

      {/* Options */}
      <div className="space-y-5 max-w-md mx-auto">
        {displayOptions.map((option, index) => {
          const isSelected = selectedAnswer === option;
          const isRight = showFeedback && option === correctAnswer;
          const isWrong = showFeedback && isSelected && !isRight;

          return (
            <button
              key={index}
              onClick={() => onAnswer(option)}
              disabled={selectedAnswer !== null}
              className={`
                group relative w-full flex items-center justify-between
                px-6 py-5 text-left text-lg font-medium rounded-full
                border-2 transition-all duration-200
                disabled:cursor-not-allowed

                ${isSelected && !showFeedback
                  ? "border-emerald-500 bg-emerald-50/70 text-emerald-800"
                  : ""}
                ${isRight
                  ? "border-emerald-600 bg-emerald-100 text-emerald-900 font-semibold shadow-md"
                  : ""}
                ${isWrong
                  ? "border-red-500 bg-red-50 text-red-900"
                  : ""}
                ${!isSelected && !showFeedback
                  ? "border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50/80 active:scale-[0.98]"
                  : ""}
              `}
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl min-w-9 text-center">
                  {isSelected ? "●" : "○"}
                </span>
                <span>{option}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {showFeedback && (
        <div className="mt-12 text-center">
          {isCorrect ? (
            <div className="inline-flex items-center gap-3 px-8 py-4 bg-emerald-50 rounded-2xl text-emerald-700 text-xl font-medium">
              <span>Awww.... 🔥 Answer is Correct</span>
              <span className="text-2xl">✅</span>
            </div>
          ) : (
            <div className="inline-flex flex-col items-center gap-3 px-8 py-5 bg-red-50 rounded-2xl text-red-700">
              <div className="text-xl font-medium">Wrong answer</div>
              <div className="text-base">
                Correct answer:{" "}
                <span className="font-bold text-red-800">{correctAnswer}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}