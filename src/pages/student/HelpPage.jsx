import React, { useState } from "react";

export default function OpenStudyHelpStep1() {
  const [topics, setTopics] = useState([]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Open Study Help</h1>

      {/* Topics list */}
      {topics.length === 0 ? (
        <p className="text-center text-gray-500">
          No topics yet. Click ➕ to add one.
        </p>
      ) : (
        topics.map((topic) => (
          <div key={topic.id} className="bg-orange-400 p-4 mb-3 rounded text-white">
            <p className="font-bold">{topic.author}</p>
            <p>{topic.topic}</p>
            <p>{topic.description}</p>
          </div>
        ))
      )}

      {/* Floating Add Button */}
      <button
        className="fixed bottom-8 right-8 bg-orange-500 text-white w-14 h-14 rounded-full text-2xl"
      >
        +
      </button>
    </div>
  );
}
