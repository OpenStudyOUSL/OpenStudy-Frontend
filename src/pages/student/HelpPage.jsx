import React, { useState } from "react";
// Import React and useState hook to manage state in this functional component

// Define the functional component OpenStudyHelpStep3
export default function OpenStudyHelpStep3() {
  
  // ---------------- STATE VARIABLES ----------------
  const [topics, setTopics] = useState([]);
  // Array to store all topics added by users, initially empty

  const [showAddModal, setShowAddModal] = useState(false);
  // Controls visibility of Add Topic modal

  const [deleteConfirm, setDeleteConfirm] = useState(null);
  // Holds the id of topic for which delete confirmation modal is shown

  const [activeReplyTopic, setActiveReplyTopic] = useState(null);
  // Holds the id of topic for which reply modal is active

  const [replyText, setReplyText] = useState("");
  // Holds the text typed in the reply modal

  const [newTopic, setNewTopic] = useState({
    author: "",
    topic: "",
    description: "",
  });
  // Holds the values of inputs in Add Topic modal

  // ---------------- ADD TOPIC FUNCTION ----------------
  const handleAddTopic = (e) => {
    e.preventDefault(); // Prevent form from reloading page
    if (!newTopic.author || !newTopic.topic) return; // Do nothing if required fields are empty

    const topic = {
      id: Date.now(), // Unique id for topic
      author: newTopic.author,
      topic: newTopic.topic,
      description: newTopic.description,
      replies: [], // Empty array for future replies
    };

    setTopics([topic, ...topics]); // Add new topic to the beginning of topics array
    setNewTopic({ author: "", topic: "", description: "" }); // Reset form inputs
    setShowAddModal(false); // Close the modal
  };

  // ---------------- DELETE TOPIC FUNCTION ----------------
  const handleDeleteTopic = (id) => {
    setTopics(topics.filter((topic) => topic.id !== id));
    // Remove the topic with matching id from topics array
    setDeleteConfirm(null); // Close the delete confirmation modal
  };

  // ---------------- ADD REPLY FUNCTION ----------------
  const handleAddReply = (topicId) => {
    if (!replyText.trim()) return; // Do nothing if reply text is empty

    // Update the topics array
    setTopics(
      topics.map((topic) =>
        topic.id === topicId
          ? {
              ...topic,
              replies: [
                ...topic.replies,
                { id: Date.now(), text: replyText, author: "Anonymous" }, 
                // Add new reply to the topic's replies array
              ],
            }
          : topic
      )
    );

    setReplyText(""); // Clear reply text input
    setActiveReplyTopic(null); // Close reply modal
  };

  // ---------------- JSX / UI ----------------
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main page container with gray background */}

      {/* Topics List */}
      <main className="max-w-4xl mx-auto px-6 py-6 space-y-4">
        {topics.length === 0 && (
          // Show message if no topics exist
          <p className="text-center text-gray-500">
            No topics yet. Click ➕ to add one.
          </p>
        )}

        {/* Map through topics and display them */}
        {topics.map((topic) => (
          <div
            key={topic.id}
            className="bg-orange-400 text-white p-4 rounded-lg border-b-4 border-orange-600"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="font-bold">{topic.author}</p> {/* Author */}
                <p className="text-lg">{topic.topic}</p> {/* Topic title */}
                <p className="text-sm opacity-90">{topic.description}</p> {/* Description */}
              </div>

              {/* Reply and Delete buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveReplyTopic(topic.id)}
                  className="bg-white text-orange-600 px-3 py-1 rounded font-semibold"
                >
                  Reply
                </button>

                <button
                  onClick={() => setDeleteConfirm(topic.id)}
                  className="bg-red-500 px-3 py-1 rounded font-semibold"
                >
                  Delete
                </button>
              </div>
            </div>

            {/* ---------------- REPLIES ---------------- */}
            {topic.replies.length > 0 && (
              <div className="mt-4 bg-orange-300 p-3 rounded">
                <p className="font-semibold mb-2">
                  Replies ({topic.replies.length})
                </p>

                {topic.replies.map((reply) => (
                  <div
                    key={reply.id}
                    className="bg-white text-gray-800 p-2 rounded mb-2"
                  >
                    <p className="text-sm font-bold">{reply.author}</p> {/* Reply author */}
                    <p className="text-sm">{reply.text}</p> {/* Reply text */}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </main>

      {/* ---------------- FLOATING ADD BUTTON ---------------- */}
      <button
        onClick={() => setShowAddModal(true)}
        className="fixed bottom-8 right-8 bg-orange-500 text-white w-14 h-14 rounded-full shadow-lg text-2xl"
      >
        + {/* Opens Add Topic Modal */}
      </button>

      {/* ---------------- ADD TOPIC MODAL ---------------- */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          {/* Modal overlay */}
          <div className="bg-white p-6 rounded-lg w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4 text-orange-600">
              Add New Topic
            </h2>

            <form onSubmit={handleAddTopic} className="space-y-3">
              {/* Input: Author */}
              <input
                type="text"
                placeholder="Your Name"
                value={newTopic.author}
                onChange={(e) =>
                  setNewTopic({ ...newTopic, author: e.target.value })
                }
                className="w-full border-2 p-2 rounded"
                required
              />

              {/* Input: Topic title */}
              <input
                type="text"
                placeholder="Topic Title"
                value={newTopic.topic}
                onChange={(e) =>
                  setNewTopic({ ...newTopic, topic: e.target.value })
                }
                className="w-full border-2 p-2 rounded"
                required
              />

              {/* Textarea: Description */}
              <textarea
                placeholder="Description"
                value={newTopic.description}
                onChange={(e) =>
                  setNewTopic({ ...newTopic, description: e.target.value })
                }
                className="w-full border-2 p-2 rounded"
                rows="4"
              />

              {/* Modal buttons */}
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)} 
                  className="flex-1 bg-gray-300 p-2 rounded"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 bg-orange-500 text-white p-2 rounded"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ---------------- REPLY MODAL ---------------- */}
      {activeReplyTopic && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          {/* Modal overlay */}
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-3 text-orange-600">Add Reply</h2>
            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="w-full border-2 p-2 rounded"
              rows="4"
              placeholder="Write your reply..."
            />
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setActiveReplyTopic(null)}
                className="flex-1 bg-gray-300 p-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => handleAddReply(activeReplyTopic)}
                className="flex-1 bg-orange-500 text-white p-2 rounded"
              >
                Reply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------------- DELETE CONFIRM MODAL ---------------- */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          {/* Modal overlay */}
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-3">Confirm Delete</h2>
            <p className="mb-4">Are you sure you want to delete this topic?</p>
            <div className="flex gap-2">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 bg-gray-300 p-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteTopic(deleteConfirm)}
                className="flex-1 bg-red-500 text-white p-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
