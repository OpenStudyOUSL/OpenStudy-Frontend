const ContactusPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-linear-to-br from-red-50 via-rose-50 to-white">
      <main className="flex flex-1">
        
        {/* Left Form Section */}
        <div className="w-1/2 px-30 flex items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-red-700 mb-3">
              Get In Touch
            </h2>

            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              We're Here to Help You Succeed
            </h3>

            <p className="text-gray-700 mb-10 max-w-md leading-relaxed">
              Have questions about the platform? Need technical support? Want to
              provide feedback? Our dedicated team is ready to assist you on your
              academic journey.
            </p>

            <form className="space-y-8 max-w-md">
              {/* Name */}
              <div>
                <label className="block text-sm mb-1 text-gray-800">
                  Name
                </label>
                <input
                  type="text"
                  className="
                    w-full bg-transparent border-b border-gray-400
                    focus:outline-none focus:border-red-600
                    py-2 text-gray-900
                  "
                />
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm mb-1 text-gray-800">
                  Subject
                </label>
                <input
                  type="text"
                  className="
                    w-full bg-transparent border-b border-gray-400
                    focus:outline-none focus:border-red-600
                    py-2 text-gray-900
                  "
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm mb-2 text-gray-800">
                  Description
                </label>
                <textarea
                  rows="4"
                  className="
                    w-full bg-red-50 rounded-md p-3
                    text-gray-900
                    focus:outline-none focus:ring-2 focus:ring-red-400
                  "
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="
                  bg-linear-to-r from-red-600 to-rose-600
                  text-white px-8 py-2 rounded-lg
                  font-semibold
                  shadow-md
                  hover:from-red-700 hover:to-rose-700
                  transition-all duration-300
                "
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
