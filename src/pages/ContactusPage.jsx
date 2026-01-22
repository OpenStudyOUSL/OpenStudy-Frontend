import { useState } from "react";

const ContactusPage = () => {
  const [fromEmail, setFromEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    try {
      const res = await fetch("http://localhost:3000/api/contact", {

        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fromEmail, subject, message }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Failed to send email");
      }

      alert("Email sent successfully!");
      setFromEmail("");
      setSubject("");
      setMessage("");
    } catch (err) {
      console.error(err);
      alert(err.message || "Something went wrong");
    } finally {
      setIsSending(false);
    }
  };

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

            <form onSubmit={handleSubmit} className="space-y-8 max-w-md">
              {/* Email (was Name) */}
              <div>
                <label className="block text-sm mb-1 text-gray-800">Email</label>
                <input
                  type="email"
                  value={fromEmail}
                  onChange={(e) => setFromEmail(e.target.value)}
                  required
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
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
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
                
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="
                    w-full bg-transparent border-b border-gray-400
                    focus:outline-none focus:border-red-600
                    py-2 text-gray-900
                  "
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSending}
                className="
                  bg-linear-to-r from-red-600 to-rose-600
                  text-white px-8 py-2 rounded-lg
                  font-semibold
                  shadow-md
                  hover:from-red-700 hover:to-rose-700
                  transition-all duration-300
                  disabled:opacity-60 disabled:cursor-not-allowed
                "
              >
                {isSending ? "Sending..." : "Submit"}
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
