import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import QuizCard from "../../components/quizCard";


const QuizPage = () => {
  const { quizId } = useParams();

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
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/quizzes/${quizId}`
        );
        setQuestions(Array.isArray(res.data) ? res.data : [res.data]);
      } catch {
        setError("Failed to load quiz");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [quizId]);

  if (loading) return <p className="text-center mt-20">Loading quiz...</p>;
  if (error || questions.length === 0)
    return <p className="text-center mt-20 text-red-600">{error}</p>;

  const currentQuestion = questions[currentIndex];
  const isLast = currentIndex === questions.length - 1;
  const isTrueFalse = currentQuestion.questionType === "TRUE_FALSE";

  const handleAnswer = (answer) => {
    if (selectedAnswer) return;

    setSelectedAnswer(answer);
    const correct = answer === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);
    if (correct) setScore((s) => s + 1);
  };

  const nextQuestion = () => {
    if (isLast) {
      alert(`Quiz finished! Score: ${score}/${questions.length}`);
      return;
    }
    setCurrentIndex((i) => i + 1);
    resetState();
  };

  const prevQuestion = () => {
    if (currentIndex === 0) return;
    setCurrentIndex((i) => i - 1);
    resetState();
  };

  const resetState = () => {
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowFeedback(false);
  };

  return (
    <div className="min-h-screen bg-purple-50 flex flex-col">
      <header className="bg-purple-700 text-white py-4 text-center text-2xl font-bold">
        Quiz
      </header>

      <main className="flex flex-col items-center p-6 grow">
        <QuizCard
          question={currentQuestion}
          isTrueFalse={isTrueFalse}
          selectedAnswer={selectedAnswer}
          isCorrect={isCorrect}
          showFeedback={showFeedback}
          onAnswer={handleAnswer}
        />

        {/* Navigation */}
        <div className="mt-8 flex justify-between w-full max-w-3xl">
          <button
            onClick={prevQuestion}
            disabled={currentIndex === 0}
            className="px-6 py-3 bg-gray-300 rounded disabled:opacity-50"
          >
            ← Previous
          </button>

          <button
            onClick={nextQuestion}
            className="px-6 py-3 bg-purple-600 text-white rounded"
          >
            {isLast ? "Finish Quiz" : "Next →"}
          </button>
        </div>

        <p className="mt-4 text-gray-600">
          Score: {score} / {currentIndex + 1}
        </p>
      </main>
    </div>
  );
};

export default QuizPage;
