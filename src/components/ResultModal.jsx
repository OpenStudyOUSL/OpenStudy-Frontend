import React, { useEffect } from "react";
import axios from "axios";

const ResultModal = ({
  isOpen,
  score,
  total,
  quizId,
  onRestart,
  onClose,
}) => {
  if (!isOpen) return null;

  const percentage = Math.round((score / total) * 100);

  // 🔹 Save result when modal opens
  useEffect(() => {
    const saveResult = async () => {
      try {
        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/results`,
          {
            userId: null, // replace later with logged-in user
            quizId,
            score,
            totalQuestions: total,
          }
        );
      } catch (err) {
        console.error("Failed to save result", err);
      }
    };

    saveResult();
  }, [quizId, score, total]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[90%] max-w-md text-center shadow-lg">
        <h2 className="text-2xl font-bold mb-4">🎉 Quiz Completed</h2>

        <p className="text-lg mb-2">
          Score: <b>{score}</b> / {total}
        </p>

        <p className="text-lg mb-6">
          Percentage: <b>{percentage}%</b>
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={onRestart}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Restart
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultModal;
