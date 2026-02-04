import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import QuizCard from "../../components/quizCard";
import ResultModal from "../../components/ResultModal";

export default function QuizPage() {
  const { courseId, topic } = useParams();

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  // 🔹 Fetch questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        setError(null);

        const encodedTopic = encodeURIComponent(topic);
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/quizzes/course/${courseId}/topic/${encodedTopic}`
        );

        if (!Array.isArray(res.data) || res.data.length === 0) {
          throw new Error("No questions found");
        }

        setQuestions(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load questions");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [courseId, topic]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading quiz...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error}
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

    if (correct) setScore((prev) => prev + 1);
  };

  const nextQuestion = () => {
    if (isLastQuestion) {
      setShowResult(true);
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
    <div className="min-h-screen bg-purple-50 flex flex-col">
      {/* Progress */}
      <div className="flex justify-center gap-2 py-4">
        {questions.map((_, idx) => (
          <div
            key={idx}
            className={`w-3 h-3 rounded-full ${
              idx === currentIndex
                ? "bg-black"
                : idx < currentIndex
                ? "bg-green-500"
                : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      <main className="grow flex items-center justify-center">
        <div className="w-full max-w-3xl px-4">
          <QuizCard
            question={currentQuestion.question}
            options={currentQuestion.options}
            correctAnswer={currentQuestion.correctAnswer}
            questionType={currentQuestion.questionType}
            selectedAnswer={selectedAnswer}
            isCorrect={isCorrect}
            showFeedback={showFeedback}
            onAnswer={handleAnswer}
          />

          <div className="mt-8 flex justify-between max-w-md mx-auto">
            <button
              onClick={prevQuestion}
              disabled={currentIndex === 0}
              className="px-6 py-3 bg-gray-200 rounded-full disabled:opacity-50"
            >
              ← Previous
            </button>

            <button
              onClick={nextQuestion}
              className="px-6 py-3 bg-black text-white rounded-full"
            >
              {isLastQuestion ? "Finish Quiz" : "Next →"}
            </button>
          </div>
        </div>
      </main>

      {/* 🔥 RESULT MODAL */}
      <ResultModal
        isOpen={showResult}
        score={score}
        total={questions.length}
        quizId={`${courseId}-${topic}`} // unique quiz id
        onRestart={() => {
          setShowResult(false);
          setCurrentIndex(0);
          setScore(0);
          resetState();
        }}
        onClose={() => setShowResult(false)}
      />
    </div>
  );
}
