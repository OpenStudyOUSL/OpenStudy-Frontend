import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-red-300/80 bg-gray-100/80 backdrop-blur">
      {/* Background glow (slightly darker & stronger) */}
      <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-red-500/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -left-28 h-80 w-80 rounded-full bg-rose-500/25 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          {/* Brand */}
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">
              Open Study
            </h2>
            <p className="mt-2 text-sm text-gray-800 italic">
              “Study Smart, Score High”
            </p>

            {/* Accent badge */}
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-red-300 bg-red-100 px-3 py-1 text-xs font-semibold text-red-900">
              <span className="h-1.5 w-1.5 rounded-full bg-red-700" />
              OUSL Student Project
            </div>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap gap-x-6 gap-y-3 md:justify-end text-sm font-semibold">
            {[
              { to: "/", label: "Home" },
              { to: "/quiz", label: "Quiz" },
              { to: "/leaderboard", label: "Leader board" },
              { to: "/help", label: "Help" },
              { to: "/contact", label: "Contact us" },
              { to: "/about", label: "About Us" },
            ].map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="
                  relative text-gray-900 transition-all duration-300
                  hover:text-red-800 hover:-translate-y-0.5
                  focus:outline-hidden focus:ring-4 focus:ring-red-300/60
                  rounded-lg px-1
                "
              >
                {l.label}
                {/* underline animation */}
                <span
                  className="
                    absolute left-1/2 -translate-x-1/2 -bottom-1 h-0.5 w-0
                    bg-linear-to-r from-red-700 to-rose-700
                    transition-all duration-300
                    hover:w-4/5
                  "
                />
              </Link>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <div className="mt-10">
          <div className="h-px w-full bg-linear-to-r from-transparent via-red-300/80 to-transparent" />
        </div>

        {/* Bottom */}
        <div className="mt-6 text-center text-xs text-gray-800">
          © 2025{" "}
          <span className="font-semibold text-gray-900">Open Study</span>.
          <span className="text-gray-700"> All Rights Reserved.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
