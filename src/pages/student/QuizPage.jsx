// src/pages/QuizPage.jsx   (or wherever you place it)
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const QuizPage = () => {
  const { quizId } = useParams(); // or courseId — adjust according to your route

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // per question states
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  // overall quiz tracking
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/quizzes/course/${courseId}`);

        const data = res.data;
        console.log('Quiz questions loaded:', data);

        const qArray = Array.isArray(data) ? data : [data];

        setQuestions(qArray);
      } catch (err) {
        console.error(err);
        setError('Failed to load quiz questions');
      } finally {
        setLoading(false);
      }
    };

    if (quizId) fetchQuestions();
  }, [quizId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-purple-50 flex items-center justify-center">
        <p className="text-xl text-purple-700">Loading quiz...</p>
      </div>
    );
  }

  if (error || questions.length === 0) {
    return (
      <div className="min-h-screen bg-purple-50 flex items-center justify-center">
        <p className="text-xl text-red-600">{error || 'No questions found'}</p>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;
  const isTrueFalse = currentQuestion.questionType === 'TRUE_FALSE';

  const handleAnswer = (answer) => {
    if (selectedAnswer !== null) return; // already answered

    setSelectedAnswer(answer);

    let correct = false;

    if (isTrueFalse) {
      correct = answer === currentQuestion.correctAnswer;
    } else {
      // MCQ → assuming correctAnswer is one of the strings in options
      correct = answer === currentQuestion.correctAnswer;
    }

    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      alert(`Quiz finished!\nScore: ${score} / ${questions.length}`);
      // You can later: navigate to result page, save score to backend, etc.
      return;
    }

    setCurrentIndex((prev) => prev + 1);
    resetQuestionState();
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      resetQuestionState();
    }
  };

  const resetQuestionState = () => {
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowFeedback(false);
  };

  return (
    <div className="min-h-screen bg-purple-50 flex flex-col">

      {/* Header – optional */}
      <header className="bg-purple-700 text-white py-4 px-6 shadow">
        <h1 className="text-2xl font-bold text-center">
          {currentQuestion.topic || 'Quiz'}
        </h1>
      </header>

      <main className="grow flex flex-col items-center p-6">

        {/* Progress */}
        <div className="flex space-x-3 mb-8">
          {questions.map((_, idx) => (
            <div
              key={idx}
              className={`w-4 h-4 rounded-full transition-colors ${
                idx === currentIndex
                  ? 'bg-black scale-125'
                  : idx < currentIndex
                  ? 'bg-purple-400'
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-10 max-w-3xl w-full text-center">
          <p className="text-xl md:text-2xl font-medium text-gray-800 mb-10 leading-relaxed">
            {currentQuestion.question}
          </p>

          {/* Answers */}
          <div className="space-y-4 max-w-lg mx-auto">
            {isTrueFalse ? (
              <>
                <button
                  onClick={() => handleAnswer('True')}
                  disabled={selectedAnswer !== null}
                  className={`w-full py-5 text-xl font-semibold rounded-full border-2 transition-all
                    ${
                      selectedAnswer === 'True'
                        ? isCorrect
                          ? 'bg-green-500 border-green-600 text-white'
                          : 'bg-red-500 border-red-600 text-white'
                        : 'bg-white border-gray-300 hover:bg-gray-100 active:bg-gray-200'
                    }`}
                >
                  ● True
                </button>

                <button
                  onClick={() => handleAnswer('False')}
                  disabled={selectedAnswer !== null}
                  className={`w-full py-5 text-xl font-semibold rounded-full border-2 transition-all
                    ${
                      selectedAnswer === 'False'
                        ? isCorrect === false
                          ? 'bg-red-500 border-red-600 text-white'
                          : 'bg-green-500 border-green-600 text-white'
                        : 'bg-white border-gray-300 hover:bg-gray-100 active:bg-gray-200'
                    }`}
                >
                  ○ False
                </button>
              </>
            ) : (
              // MCQ
              currentQuestion.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(option)}
                  disabled={selectedAnswer !== null}
                  className={`w-full py-4 px-6 text-lg font-medium rounded-xl border-2 transition-all
                    ${
                      selectedAnswer === option
                        ? isCorrect
                          ? 'bg-green-500 border-green-600 text-white'
                          : 'bg-red-500 border-red-600 text-white'
                        : 'bg-white border-gray-300 hover:bg-gray-50 active:bg-gray-200'
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
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">✗</span>
                    <span>Oops... Wrong answer</span>
                  </div>
                  <div className="text-gray-700 mt-2">
                    Correct answer:{' '}
                    <span className="font-bold">
                      {currentQuestion.correctAnswer}
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="mt-10 flex justify-between w-full max-w-3xl">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="px-8 py-3 bg-gray-300 text-gray-700 rounded-lg font-medium disabled:opacity-50"
          >
            ← Previous
          </button>

          <button
            onClick={handleNext}
            className="px-10 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 active:bg-purple-800"
          >
            {isLastQuestion ? 'Finish Quiz' : 'Next →'}
          </button>
        </div>

        {/* Current score (optional) */}
        <div className="mt-6 text-gray-600">
          Score: {score} / {currentIndex + 1} answered
        </div>
      </main>
    </div>
  );
};

export default QuizPage;