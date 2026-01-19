// SignUpSplitPage.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignUpPage() {
  const [profileImage, setProfileImage] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [registerNumber, setRegisterNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const navigate = useNavigate();

  async function signUp() {
    try {
      const res = await axios.post("http://localhost:3000/api/users/signup",
        {
          profileImage,
          username,
          email,
          registerNumber,
          password,
        }
      );

      toast.success("Account created successfully!");
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Signup failed");
    }
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast.error("Please enter a password");
      return;
    }

    if (password !== confirmPassword) {
      setPasswordsMatch(false);
      toast.error("Passwords do not match");
      return;
    }

    setPasswordsMatch(true);
    signUp();
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-700 via-purple-600 to-purple-800 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
        <div className="grid lg:grid-cols-2 min-h-170">

          {/* LEFT SIDE */}
          <div className="hidden lg:flex flex-col justify-center px-12 py-16 bg-linear-to-br from-purple-600/30 to-purple-800/30">
            <h1 className="text-6xl font-bold text-white mb-8">Open Study</h1>
            <p className="text-purple-100 text-xl mb-10">
              Your smart companion for better learning
            </p>
            <p className="text-purple-50 text-lg leading-relaxed italic opacity-95">
                "Access your personalized dashboard,<br />
                track your quiz performance,<br />
                and continue your path to exam success."
            </p>
          </div>

          {/* RIGHT SIDE */}
          <div className="bg-white/95 p-10 lg:p-16">
            <div className="max-w-md mx-auto">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Create Account
              </h2>

              <form className="space-y-5" onSubmit={handleFormSubmit}>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-200 outline-none"
                />

                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-200 outline-none"
                />

                <input
                  type="text"
                  placeholder="Register Number"
                  value={registerNumber}
                  onChange={(e) => setRegisterNumber(e.target.value)}
                  required
                  className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-200 outline-none"
                />

                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-200 outline-none"
                />

                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className={`w-full px-5 py-4 rounded-xl border ${
                    passwordsMatch ? "border-gray-300" : "border-red-500"
                  } focus:ring-2 focus:ring-purple-200 outline-none`}
                />

                <button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 rounded-xl shadow-lg"
                >
                  Sign Up
                </button>
              </form>

              <p className="text-center mt-6 text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-purple-700 font-medium hover:underline"
                >
                  Log in
                </Link>
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
