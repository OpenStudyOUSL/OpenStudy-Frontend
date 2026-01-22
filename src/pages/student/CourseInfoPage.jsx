import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import QuizTopicCard from "../../components/CourseTopicCard"; // ← assuming this is the correct import

export default function CourseInfoPage() {
  const { courseId } = useParams();

  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!courseId) {
      setError("No course ID provided");
      setLoading(false);
      return;
    }

    const fetchTopics = async () => {
      try {
        setLoading(true);
        setError(null);

        // Try these endpoints one by one – use the one that actually works for you
        // Option A – most likely what you need (all quizzes for course)
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/quizzes/${courseId}`
        );

        // Option B – if you have a grouped endpoint
        // const res = await axios.get(
        //   `${import.meta.env.VITE_BACKEND_URL}/api/quizzes/course/${courseId}/topics-with-counts`
        // );

        let topicList = [];

        // ────────────────────────────────────────────────
        // Try to handle different possible response shapes
        // ────────────────────────────────────────────────
        const data = res.data;

        if (Array.isArray(data)) {
          // Case: direct array of quiz objects [{topic: "...", ...}, ...]
          // Group by topic manually
          const grouped = data.reduce((acc, quiz) => {
            const t = quiz.topic?.trim();
            if (!t) return acc;
            if (!acc[t]) {
              acc[t] = { topic: t, quizCount: 0 };
            }
            acc[t].quizCount += 1;
            return acc;
          }, {});

          topicList = Object.values(grouped);
        } 
        else if (data && Array.isArray(data.topics) && data.counts) {
          // Case: { topics: ["Topic A", "Topic B"], counts: { "Topic A": 3, ... } }
          topicList = data.topics.map((topicName) => ({
            topic: topicName,
            quizCount: data.counts[topicName] ?? 0,
          }));
        } 
        else {
          console.warn("Unexpected response format:", data);
          topicList = [];
        }

        setTopics(topicList);
        console.log("Processed topics for display:", topicList);
      } catch (err) {
        console.error("Failed to load topics:", err?.response?.data || err);
        setError("Could not load topics. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, [courseId]);

  // ────────────────────────────────────────────────
  // Render
  // ────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-xl text-gray-700">Loading course topics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-purple-50">
        <div className="text-center px-6 max-w-md">
          <p className="text-2xl font-semibold text-red-600 mb-4">Error</p>
          <p className="text-lg text-gray-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-purple-50/60">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Course Topics & Quizzes
          </h1>
          <p className="mt-2 text-gray-600">
            Course ID: <span className="font-medium">{courseId}</span>
          </p>
        </div>
      </header>

      <main className="grow px-6 md:px-12 py-10">
        {topics.length === 0 ? (
          <div className="max-w-2xl mx-auto text-center py-20 bg-white rounded-2xl shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              No quiz topics found
            </h2>
            <p className="text-gray-600">
              This course doesn't have any quiz topics yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {topics.map((topicItem) => (
              <QuizTopicCard
                key={topicItem.topic}                 // topic name is usually unique
                topicName={topicItem.topic}
                quizCount={topicItem.quizCount ?? 0}
                courseId={courseId}                   // required for correct navigation
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}