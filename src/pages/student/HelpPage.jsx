import React, { useState } from "react"; 
// Import React and useState hook to manage component state

// Define a functional component called OpenStudyHelpStep2
export default function OpenStudyHelpStep2() {

  const [topics, setTopics] = useState([]); 
  // State to store all topics, initially empty

  const [showAddModal, setShowAddModal] = useState(false); 
  // State to control whether the Add Topic modal is visible

  // State to store new topic info entered in the modal
  const [newTopic, setNewTopic] = useState({
    author: "",
    topic: "",
    description: "",
  });

  // Function to handle adding a new topic
  const handleAddTopic = (e) => {
    e.preventDefault(); // Prevent page reload on form submit

    // If author or topic is empty, do nothing
    if (!newTopic.author || !newTopic.topic) return;

    // Create a new topic object
    const topic = {
      id: Date.now(), // Unique id based on current timestamp
      author: newTopic.author,
      topic: newTopic.topic,
      description: newTopic.description,
      replies: [], // Empty replies array for future feature
    };

    setTopics([topic, ...topics]); 
    // Add the new topic to the beginning of the topics array

    setNewTopic({ author: "", topic: "", description: "" }); 
    // Reset the newTopic input fields

    setShowAddModal(false); 
    // Close the Add Topic modal
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Main container with gray background and padding */}

      <h1 className="text-2xl font-bold mb-4">Open Study Help</h1>
      {/* Page title */}

      {/* Topics list */}
      {topics.length === 0 ? (
        // If no topics exist, show this message
        <p className="text-center text-gray-500">
          No topics yet. Click ➕ to add one.
        </p>
      ) : (
        // If topics exist, map through and display them
        topics.map((topic) => (
          <div key={topic.id} className="bg-orange-400 p-4 mb-3 rounded text-white">
            <p className="font-bold">{topic.author}</p> {/* Author name */}
            <p>{topic.topic}</p> {/* Topic title */}
            <p>{topic.description}</p> {/* Topic description */}
          </div>
        ))
      )}

      {/* Floating Add Button */}
      <button
        onClick={() => setShowAddModal(true)} 
        // Show the Add Topic modal when clicked
        className="fixed bottom-8 right-8 bg-orange-500 text-white w-14 h-14 rounded-full text-2xl"
      >
        +
      </button>

      {/* Add Topic Modal */}
      {showAddModal && (
        // Only render the modal if showAddModal is true
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          {/* Modal background overlay */}
          <div className="bg-white p-6 rounded-lg w-full max-w-lg">
            {/* Modal content container */}
            <h2 className="text-xl font-bold mb-4 text-orange-600">Add New Topic</h2>
            
            {/* Form for adding a topic */}
            <form onSubmit={handleAddTopic} className="space-y-3">
              {/* Input for author */}
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

              {/* Input for topic title */}
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

              {/* Textarea for description */}
              <textarea
                placeholder="Description"
                value={newTopic.description}
                onChange={(e) =>
                  setNewTopic({ ...newTopic, description: e.target.value })
                }
                className="w-full border-2 p-2 rounded"
                rows="4"
              />

              {/* Buttons for Cancel and Submit */}
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)} 
                  // Close the modal without submitting
                  className="flex-1 bg-gray-300 p-2 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-orange-500 text-white p-2 rounded"
                >
                  Submit {/* Submit new topic */}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
