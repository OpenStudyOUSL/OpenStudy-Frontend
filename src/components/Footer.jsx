import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-purple-600 text-white py-10 ">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8 items-center">
        {/* Brand */}
        <div>
          <h2 className="text-4xl font-bold">Open Study</h2>
          <p className="text-sm mt-1 italic">"Study Smart, Score High"</p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-6 justify-start md:justify-end text-sm font-medium">
          <Link to="/" className="hover:opacity-80">
            Home
          </Link>
          <Link to="/quiz" className="hover:opacity-80">
            Quiz
          </Link>
          <Link to="/leaderboard" className="hover:opacity-80">
            Leader board
          </Link>
          <Link to="/help" className="hover:opacity-80">
            Help
          </Link>
          <Link to="/contact" className="hover:opacity-80">
            Contact us
          </Link>
          <Link to="/about" className="hover:opacity-80">
            About Us
          </Link>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-8 text-center text-xs opacity-80">
        <hr className="w-300 ml-auto mr-auto mb-1"/>
        &copy; 2025 Open Study. 
        All Right Reserved.
      </div>
    </footer>
  );
};

export default Footer;
