import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const ProfileDashboard = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Please login first");
          navigate("/login");
          return;
        }

        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
        setUser(res.data);

      } catch (err) {
        console.error(err);
        toast.error("Failed to load profile. Please login again.");
        localStorage.removeItem("token");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F3EFFF] flex items-center justify-center">
        <p className="text-xl text-purple-700">Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#F3EFFF] flex items-center justify-center">
        <p className="text-xl text-red-600">Unable to load profile</p>
      </div>
    );
  }

  // You can adjust fallback values if some fields might be missing
  const userName = user.userName || "Not set";
  const regNo    = user.registerNumber    || "Not set";
  const email    = user.email    || "Not available";
  const profilePic = user.profilePicture || "https://i.pravatar.cc/150";

  return (
    <div className="min-h-screen bg-[#F3EFFF] p-6 flex justify-center">
      <div className="w-full max-w-6xl space-y-8">

        {/* ================= PROFILE CARD ================= */}
        <div className="bg-linear-to-r from-[#8B5CF6] to-[#A78BFA] rounded-2xl p-6 text-white shadow-lg">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl font-semibold">Profile</h2>
            <Link to="/profile/edit" className="bg-[#7C3AED] px-4 py-1 rounded-lg text-sm shadow">
              Edit Profile
            </Link>
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mt-6">
            <img
              src={profilePic}
              alt="profile"
              className="w-28 h-28 rounded-full border-4 border-white shadow object-cover"
            />

            <div className="flex-1">
              <h3 className="text-xl font-bold">● {userName}</h3>
              <div className="flex flex-wrap gap-6 mt-2 text-sm">
                <span>● {regNo}</span>
                <span>● {email}</span>
              </div>

              <div className="grid grid-cols-3 text-center mt-8">
                <div>
                  <p className="text-3xl font-bold">51</p>
                  <p className="text-sm">Quizzes Completed</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">1750</p>
                  <p className="text-sm">Score</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">3</p>
                  <p className="text-sm">Rank</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= ACADEMIC PROGRESS ================= */}
        <div className="bg-[#8B5CF6] rounded-2xl p-6 text-white shadow-lg">
          <h2 className="text-2xl font-semibold mb-6">Academic Progress</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { percent: "78%", title: "Subjects", desc: "8 of 10 subjects" },
              { percent: "78%", title: "Quiz Average", desc: "142 Completed" },
              { percent: "15", title: "Achievements", desc: "Badges Earned" },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-[#B9A7FF] text-black rounded-xl p-6 text-center"
              >
                <div className="w-20 h-20 mx-auto rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold">
                  {item.percent}
                </div>
                <p className="mt-4 font-semibold">{item.title}</p>
                <p className="text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ================= SUBJECT PERFORMANCE ================= */}
        <div className="bg-[#9F7AEA] rounded-2xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold text-white mb-6">
            Subject Performance
          </h2>

          <div className="space-y-4">
            {/* 
              Later you can replace this static array 
              with real data from backend (user.subjectsPerformance or similar)
            */}
            {[60, 98, 50, 25].map((value, index) => (
              <div
                key={index}
                className="bg-[#F3EFFF] rounded-xl p-4 flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">Subject {index + 1}</p>
                  <p className="text-sm text-gray-600">Course Code</p>
                </div>

                <div className="w-48">
                  <div className="h-2 bg-gray-300 rounded-full">
                    <div
                      className="h-2 bg-[#7C3AED] rounded-full"
                      style={{ width: `${value}%` }}
                    />
                  </div>
                  <p className="text-right text-sm mt-1">{value}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfileDashboard;