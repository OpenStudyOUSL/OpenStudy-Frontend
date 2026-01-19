import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/student/HomePage";
import NotFound from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AboutUs from "./pages/student/AboutusPage";
import AdminDashboard from "./pages/admin/AdminDashbord";
import ProfileDashboard from "./pages/student/ProfileDashboardPage";
import ContactusPage from "./pages/ContactusPage";

// Layout for normal/student pages (with navbar + footer)
function StudentLayout() {
  return (
    <>
      <Navbar />
      <Outlet />           {/* ← pages will render here */}
      <Footer />
    </>
  );
}

// Layout for admin (no navbar, no footer — clean dashboard)
function AdminLayout() {
  return <Outlet />;      // ← just renders the admin pages
}

function App() {
  return (
    <BrowserRouter>
    <Toaster position="top-right" reverseOrder={false} />
      <Routes>

        {/* First page (no navbar, no footer) */}
        <Route element={<FirstLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>

        {/* Student / Public area with Navbar + Footer */}
        <Route element={<StudentLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/profile" element={<ProfileDashboard />} />
          <Route path="/profile/edit" element={<EditProfilePage />} />
          <Route path='/contact' element={<ContactusPage />} />
          <Route path="/Course" element={<CoursePage />} />
          <Route path="/Leaderboard" element={<LeaderBoradPage />} />

          
        </Route>

        {/* Admin area — NO Navbar/Footer */}
        <Route path="/admin/*" element={<AdminLayout />}>
          <Route path="*" element={<AdminDashboard />} />
          {/* 
            You can add more admin sub-routes later like this:
            <Route path="users" element={<AdminUsers />} />
            <Route path="settings" element={<AdminSettings />} />
          */}
        </Route>

        {/* 404 - Not Found (you can also wrap it in StudentLayout if you want) */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;