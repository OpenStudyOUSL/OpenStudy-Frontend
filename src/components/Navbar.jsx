import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status on mount + whenever it might change
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // !! converts to boolean

    // Optional: listen for storage changes (if logout happens in another tab)
    const handleStorageChange = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/course", label: "Course" },
    { to: "/leaderboard", label: "Leader board" },
    { to: "/help", label: "Help" },
    { to: "/contact", label: "Contact us" },
    { to: "/about", label: "About Us" },
  ];

  // Optional: hide some links when not logged in (e.g. leaderboard)
  // const visibleItems = isLoggedIn
  //   ? navItems
  //   : navItems.filter(item => item.to !== "/leaderboard");

  return (
    <header className="sticky top-0 z-50">
      <div className="relative overflow-hidden border-b border-red-300/80 bg-gray-100/80 backdrop-blur">
        {/* Background glow */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-red-500/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 -left-28 h-80 w-80 rounded-full bg-rose-500/25 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
          {/* Brand */}
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-gray-900">
            Open Study
          </h1>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-10 text-base font-semibold">
            {navItems.map((item) => {
              const active = location.pathname === item.to;

              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`
                    relative px-1 transition-all duration-300
                    ${active ? "text-red-800" : "text-gray-900 hover:text-red-800"}
                    hover:-translate-y-0.5
                  `}
                >
                  {item.label}
                  <span
                    className={`
                      absolute left-1/2 -translate-x-1/2 -bottom-1
                      h-0.5 rounded-full bg-gradient-to-r from-red-700 to-rose-700
                      transition-all duration-300
                      ${active ? "w-4/5" : "w-0 hover:w-4/5"}
                    `}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Auth section - conditional rendering */}
          <div className="flex items-center gap-4 md:gap-6">
            {isLoggedIn ? (
              // Logged-in: show profile icon with tooltip
              <Link to="/profile" className="relative group">
                <img
                  src="/profile.jpg" // ← replace with dynamic user.profilePicture if available
                  alt="Profile"
                  className="
                    w-10 h-10 rounded-full object-cover
                    border-2 border-red-300
                    shadow-md
                    transition-transform duration-300
                    group-hover:scale-110
                  "
                />
                <div
                  className="
                    absolute top-full mt-3 left-1/2 -translate-x-1/2
                    bg-white text-gray-900 text-sm font-semibold
                    px-3 py-1.5 rounded-lg shadow-lg
                    opacity-0 group-hover:opacity-100 transition-all duration-300
                    whitespace-nowrap border border-red-200
                  "
                >
                  Profile
                </div>
              </Link>
            ) : (
              // Not logged in: show Login button
              <Link
                to="/login"
                className="
                  px-5 py-2 rounded-lg bg-red-600 text-white font-medium
                  hover:bg-red-700 transition shadow-sm
                "
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;