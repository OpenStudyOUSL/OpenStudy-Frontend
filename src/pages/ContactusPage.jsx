const ContactusPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex flex-1">
        
        {/* Left Form Section */}
        <div className="w-1/2 px-30 flex items-center">
          {/* Inner wrapper */}
          <div>
            <h2 className="text-3xl font-bold text-blue-600 mb-3">
              Get In Touch
            </h2>

            <h3 className="text-xl font-semibold mb-6">
              We're Here to Help You Succeed
            </h3>

            <p className="text-gray-700 mb-10 max-w-md">
              Have questions about the platform? Need technical support? Want to
              provide feedback? Our dedicated team is ready to assist you on your
              academic journey.
            </p>

            <form className="space-y-8 max-w-md">
              <div>
                <label className="block text-sm mb-1">Name</label>
                <input
                  type="text"
                  className="w-full bg-transparent border-b border-gray-400 focus:outline-none focus:border-purple-500 py-2"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">Subject</label>
                <input
                  type="text"
                  className="w-full bg-transparent border-b border-gray-400 focus:outline-none focus:border-purple-500 py-2"
                />
              </div>

              <div>
                <label className="block text-sm mb-2">Description</label>
                <textarea
                  rows="4"
                  className="w-full bg-gray-200 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>

              <button
                type="submit"
                className="bg-purple-500 text-white px-8 py-2 rounded-lg hover:bg-purple-600 transition"
              >
                Submit
              </button>
            </form>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="w-1/2">
          <img
            src="./ContactPageImage.png"
            alt="Get your guide"
            className="w-full h-full object-cover"
          />
        </div>

      </main>
    </div>
  );
};

export default ContactusPage;
