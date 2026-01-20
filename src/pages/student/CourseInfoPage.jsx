import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import QuizTopicCard from "../../components/CourseTopicCard";

export default function CourseInfoPage() {
  const { courseId } = useParams();

  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      if (!courseId) return;

      try {
        setLoading(true);
        setError(null);

        // Adjust endpoint if your API route is different
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/quizzes/course/${courseId}`);
        setQuizzes(res.data || []);
        console.log("Quizzes loaded:", res.data);
      } catch (err) {
        console.error("Failed to load quizzes:", err);
        setError("Could not load quizzes. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, [courseId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-purple-50">
        <p className="text-xl text-gray-600 animate-pulse">Loading quizzes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-purple-50">
        <p className="text-xl text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-purple-50">
      {/* Optional header / course title area */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-16 py-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Course Quizzes
          </h1>
          <p className="mt-2 text-gray-600">
            Course ID: {courseId}
          </p>
        </div>
      </header>

      <main className="grow px-6 md:px-16 py-10">
        {quizzes.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-700 mb-3">
              No quizzes available yet
            </h2>
            <p className="text-gray-600">
              Check back later or contact your instructor.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {quizzes.map((quiz) => (
              <QuizTopicCard
                key={quiz.id || quiz._id}
                topicName={quiz.title || quiz.topic || "Untitled Quiz"}
                quizCount={quiz.questionsCount || quiz.quizCount || 0}
                image={quiz.imageUrl || quiz.coverImage} // optional
                description={quiz.description || quiz.shortDescription}
                // instructor={quiz.createdBy?.name}         // optional
                linkTo={`/quiz/${quiz.id || quiz._id}/attempt`} // or /quiz/start/${quiz.id}
                // onAttempt={() => console.log("Start quiz", quiz.id)} // if not using Link
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}