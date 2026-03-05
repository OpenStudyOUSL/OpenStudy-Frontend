import React, { useEffect } from "react";
import axios from "axios";

const ResultModal = ({ isOpen, score, total, quizId, onRestart, onClose }) => {
  const percentage = Math.round((score / total) * 100);

  const attemptSaved = React.useRef(false);

  // 🔹 Save result when modal opens
  useEffect(() => {
    const saveResult = async () => {
      try {
        const token = localStorage.getItem("token");
        await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/leaderboard/update`,
          {
            score,
            totalQuestions: total,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Assuming backend index.js looks for Bearer token
            },
          },
        );
      } catch (err) {
        console.error("Failed to update leaderboard", err);
      }
    };

    if (isOpen && !attemptSaved.current) {
      saveResult();
      attemptSaved.current = true;
    }
  }, [isOpen, quizId, score, total]);

  // Reset attempt flag when modal is closed
  useEffect(() => {
    if (!isOpen) {
      attemptSaved.current = false;
    }
  }, [isOpen]);

  if (!isOpen) return null;

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
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors shadow-md shadow-primary-700/20"
          >
            Restart
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultModal;
