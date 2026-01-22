// src/pages/QuizPage.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import QuizCard from "../../components/quizCard";


export default function QuizPage() {
  const { courseId, topic } = useParams(); // assuming route: /course/:courseId/quiz/:topic

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        setError(null);

        const encodedTopic = encodeURIComponent(topic);
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/quizzes/course/${courseId}/topic/${encodedTopic}`
        );

        const data = Array.isArray(res.data) ? res.data : [];
        if (data.length === 0) {
          throw new Error("No questions found for this topic");
        }

        setQuestions(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load questions. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (courseId && topic) {
      fetchQuestions();
    }
  }, [courseId, topic]);

  if (loading) {
    return (
      <div className="min-h-screen bg-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-xl text-gray-700">Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (error || questions.length === 0) {
    return (
      <div className="min-h-screen bg-purple-50 flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-lg text-gray-700">{error || "No questions available for this topic."}</p>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  const handleAnswer = (answer) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(answer);

    const correct = answer === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setScore((prev) => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (isLastQuestion) {
      // You can replace with a nice result page/modal later
      alert(
        `Quiz completed!\n\nScore: ${score} out of ${questions.length}\n(${Math.round((score / questions.length) * 100)}%)`
      );
      return;
    }

    setCurrentIndex((prev) => prev + 1);
    resetState();
  };

  const prevQuestion = () => {
    if (currentIndex === 0) return;
    setCurrentIndex((prev) => prev - 1);
    resetState();
  };

  const resetState = () => {
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowFeedback(false);
  };

  return (
    <div className="min-h-screen bg-purple-50/40 flex flex-col">
      {/* Progress dots */}
      <div className="flex justify-center gap-3 py-6 bg-white/30 backdrop-blur-sm">
        {questions.map((_, idx) => (
          <div
            key={idx}
            className={`w-3.5 h-3.5 rounded-full transition-all duration-300 ${
              idx === currentIndex
                ? "bg-black scale-125 shadow-md"
                : idx < currentIndex
                ? "bg-green-500"
                : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      <main className="grow flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-3xl">
          <QuizCard
            question={currentQuestion.question}
            options={currentQuestion.options || []}
            correctAnswer={currentQuestion.correctAnswer}
            questionType={currentQuestion.questionType}
            selectedAnswer={selectedAnswer}
            isCorrect={isCorrect}
            showFeedback={showFeedback}
            onAnswer={handleAnswer}
          />

          {/* Navigation */}
          <div className="mt-10 flex justify-between items-center max-w-md mx-auto">
            <button
              onClick={prevQuestion}
              disabled={currentIndex === 0}
              className="px-8 py-3.5 bg-gray-200 text-gray-800 font-medium rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition"
            >
              ← Previous
            </button>

            <button
              onClick={nextQuestion}
              className="px-10 py-3.5 bg-black text-white font-semibold rounded-full hover:bg-gray-900 transition shadow-md"
            >
              {isLastQuestion ? "Finish Quiz" : "Next →"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}