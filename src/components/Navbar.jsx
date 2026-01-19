import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50">
      <div className="relative overflow-hidden border-b border-red-300/80 bg-gray-100/80 backdrop-blur">
        {/* Background glow (same as footer) */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-red-500/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 -left-28 h-80 w-80 rounded-full bg-rose-500/25 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-6 py-4 flex items-center">
          {/* Brand */}
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900">
            Open Study
          </h1>

          {/* Navigation Links */}
          <nav className="ml-auto flex items-center space-x-10 text-base font-semibold">
            {[
              { to: "/", label: "Home" },
              { to: "/course", label: "Course" },
              { to: "/leaderboard", label: "Leader board" },
              { to: "/help", label: "Help" },
              { to: "/contact", label: "Contact us" },
              { to: "/about", label: "About Us" },
            ].map((item) => {
              const active = location.pathname === item.to;

              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`
                    relative px-1 transition-all duration-300
                    ${
                      active
                        ? "text-red-800"
                        : "text-gray-900 hover:text-red-800"
                    }
                    hover:-translate-y-0.5
                  `}
                >
                  {item.label}

                  {/* underline animation */}
                  <span
                    className={`
                      absolute left-1/2 -translate-x-1/2 -bottom-1
                      h-0.5 rounded-full
                      bg-linear-to-r from-red-700 to-rose-700
                      transition-all duration-300
                      ${active ? "w-4/5" : "w-0 hover:w-4/5"}
                    `}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Profile */}
          <Link to="/profile" className="ml-10 relative group">
            <img
              src="../../public/profile.jpg"
              alt="Profile"
              className="
                w-10 h-10 rounded-full object-cover
                border-2 border-red-300
                shadow-md
                transition-transform duration-300
                group-hover:scale-110
              "
            />

            {/* Tooltip */}
            <div
              className="
                absolute top-full mt-3 left-1/2 -translate-x-1/2
                bg-white text-gray-900
                text-sm font-semibold
                px-3 py-1.5 rounded-lg
                shadow-lg
                opacity-0 group-hover:opacity-100
                transition-all duration-300
                whitespace-nowrap
                border border-red-200
              "
            >
              User Name
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
