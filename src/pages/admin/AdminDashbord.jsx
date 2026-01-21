import { BrowserRouter } from "react-router-dom";

function AdminDashboard() {
  return (
    <>
      <div className="flex min-h-screen bg-linear-to-br from-blue-100 via-sky-100 to-indigo-200">
        {/* ===== Sidebar ===== */}
        <div
          className="
          fixed inset-y-0 left-0 w-[20%]
          bg-linear-to-b from-cyan-500 to-blue-600
          flex flex-col items-center
          z-50 overflow-y-auto
          shadow-2xl
          border-r border-white/30
        "
        >
          {/* Logo */}
          <div
            className="
            mt-10 
            flex flex-row items-center space-x-4
            w-3/4
          "
          >
            <img src="/uniLogo.png" alt="Logo" className="w-10 h-10" />
            <h1 className="font-bold text-2xl text-white ">Open Study</h1>
          </div>

          {/* Subtitle */}
          <h2
            className="
            font-semibold text-2xl text-blue-50
            mt-6 mb-10
            tracking-wide
            drop-shadow
          "
          >
            Admin Panel
          </h2>

          {/* Menu Placeholder */}
          <div className="w-full px-6 space-y-3">
            <div
              className=" 
    flex items-center justify-center px-5 py-3 rounded-xl
    text-white font-medium tracking-wide
    bg-white/10 backdrop-blur-md
    hover:bg-white/25
    hover:translate-x-2
    transition-all duration-300
    cursor-pointer
    shadow-sm
  "
            >
              Dashboard
            </div>

            <div
              className="
    flex items-center justify-center px-5 py-3 rounded-xl
    text-white font-medium tracking-wide
    bg-white/10 backdrop-blur-md
    hover:bg-white/25
    hover:translate-x-2
    transition-all duration-300
    cursor-pointer
    shadow-sm
  "
            >
              Users
            </div>

            <div
              className="
    flex items-center justify-center px-5 py-3 rounded-xl
    text-white font-medium tracking-wide
    bg-white/10 backdrop-blur-md
    hover:bg-white/25
    hover:translate-x-2
    transition-all duration-300
    cursor-pointer
    shadow-sm
  "
            >
              Courses
            </div>

            <div
              className="
    flex items-center justify-center px-5 py-3 rounded-xl
    text-white font-medium tracking-wide
    bg-white/10 backdrop-blur-md
    hover:bg-white/25
    hover:translate-x-2
    transition-all duration-300
    cursor-pointer
    shadow-sm
  "
            >
              Reports
            </div>

            <div
              className="
    flex items-center justify-center px-5 py-3 rounded-xl mt-100
    font-medium tracking-wide
    text-red-100
    bg-red-500/20
    hover:bg-red-500/40
    hover:translate-x-2
    transition-all duration-300
    cursor-pointer
    shadow-sm
    
  "
            >
              Logout
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
