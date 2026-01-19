import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="bg-purple-600 text-white py-4 px-6 flex items-center text-2xl font-bold">
        <h1>OpenStudy</h1>
        <div className="ml-auto flex space-x-16 text-lg font-medium">
          <Link
            to="/"
            className="relative hover:opacity-90 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
          >
            Home
          </Link>
          <Link
            to="/course"
            className="relative hover:opacity-90 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
          >
            Course
          </Link>
          <Link
            to="/leaderboard"
            className="relative hover:opacity-90 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
          >
            Leader board
          </Link>
          <Link
            to="/help"
            className="relative hover:opacity-90 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
          >
            Help
          </Link>
          <Link
            to="/contact"
            className="relative hover:opacity-90 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
          >
            Contact us
          </Link>
          <Link
            to="/about"
            className="relative hover:opacity-90 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
          >
            About Us
          </Link>
        </div>
         {/* Profile Photo */}
      <Link to="/profile" className="ml-10 mr-16 relative group">
        <img
          src="../../public/profile.jpg"
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover cursor-pointer"
        />

        {/* Name tooltip */}
        <div
          className="absolute right-1/2 translate-x-1/2 bg-purple-900
          text-white text-sm px-3 py-1 rounded-md
          opacity-0 group-hover:opacity-100
          transition-opacity duration-300 whitespace-nowrap"
        >
          User Name
        </div>
      </Link>
      </div>
    </>
  );
};
export default Navbar;
