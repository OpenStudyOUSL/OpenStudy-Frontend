import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-red-50 via-rose-50 to-white">
      <div className="text-center px-6">
        {/* Top Row */}
        <div className="flex flex-row items-center justify-center gap-6 mb-6">
          <img
            src="/animation1.gif"
            alt="Alert"
            className="w-28 h-28"
          />
          <h1 className="text-8xl font-extrabold text-red-700">
            404
          </h1>
        </div>

        {/* Message */}
        <p className="text-3xl font-semibold text-gray-900 mb-3">
          Oops! Page not found
        </p>
        <p className="text-gray-700 mb-10 max-w-md mx-auto">
          The page you’re looking for doesn’t exist or may have been moved.
          Let’s get you back on track.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => window.history.back()}
            className="
              inline-flex items-center justify-center
              bg-linear-to-r from-red-600 to-rose-600
              text-white font-semibold
              px-8 py-3 rounded-xl
              shadow-lg
              hover:from-red-700 hover:to-rose-700
              hover:-translate-y-0.5
              transition-all duration-300
              focus:outline-hidden focus:ring-4 focus:ring-red-300
            "
          >
            Go Back
          </button>

          <Link
            to="/"
            className="
              inline-flex items-center justify-center
              rounded-xl border border-red-300 bg-white/80
              px-8 py-3 font-semibold text-red-800
              hover:bg-white
              hover:-translate-y-0.5
              transition-all duration-300
              focus:outline-hidden focus:ring-4 focus:ring-red-200
            "
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}
