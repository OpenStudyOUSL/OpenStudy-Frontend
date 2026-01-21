import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import UploadMediaUploadtoSupabase from "../utils/mediaUpload";

export default function SignUpPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [registerNumber, setRegisterNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [loading, setLoading] = useState(false);

  function handlePasswordChange(e) {
    const value = e.target.value;
    setPassword(value);
    setPasswordsMatch(value === confirmPassword);
  }

  function handleConfirmPasswordChange(e) {
    const value = e.target.value;
    setConfirmPassword(value);
    setPasswordsMatch(password === value);
  }

  async function signUp() {
    setLoading(true);
    let profilePictureUrl = "";

    try {
      if (profilePictureFile) {
        profilePictureUrl = await UploadMediaUploadtoSupabase(profilePictureFile);
      }

      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users/signup`, {
        profilePicture: profilePictureUrl,
        email: email,
        userName: username,
        registerNumber: registerNumber,
        password: password,
      });

      toast.success("User created successfully");
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error("User creation failed");
    } finally {
      setLoading(false);
    }
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    if (!passwordsMatch) {
      toast.error("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (!registerNumber.trim()) {
      toast.error("Register number is required");
      return;
    }

    signUp();
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-linear-to-br from-red-50 via-rose-50 to-white flex items-center justify-center p-6">
      {/* Soft background glows (same style as About/Home) */}
      <div className="absolute inset-0 bg-linear-to-br from-red-700/10 via-rose-600/6 to-transparent" />
      <div className="pointer-events-none absolute -top-48 -right-40 h-104 w-104 rounded-full bg-red-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-52 -left-40 h-112 w-md rounded-full bg-rose-400/20 blur-3xl" />

      {/* Glass card */}
      <div className="relative w-full max-w-6xl rounded-3xl border border-white/40 bg-gray-100/70 backdrop-blur-xl shadow-2xl shadow-red-900/10 overflow-hidden">
        <div className="grid lg:grid-cols-2">
          {/* LEFT SECTION (brand panel) */}
          <div className="hidden lg:flex flex-col justify-center px-12 py-16 relative overflow-hidden bg-linear-to-br from-red-700 via-rose-700 to-red-800 text-white">
            <div className="pointer-events-none absolute -top-20 -left-20 h-96 w-96 rounded-full bg-white/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                OUSL Student Project
              </div>

              <h1 className="mt-6 text-6xl font-extrabold tracking-tight">
                Open Study
              </h1>

              <p className="mt-4 text-red-50/90 text-xl">
                Your smart companion for better learning
              </p>

              <p className="mt-10 text-red-50/90 text-xl leading-relaxed">
                Access your personalized dashboard,<br />
                track your quiz performance,<br />
                review your progress,<br />
                and continue your path to<br />
                exam success.
              </p>

              <p className="mt-10 italic opacity-90">
                “Study smarter. Achieve more.”
              </p>
            </div>
          </div>

          {/* RIGHT SECTION (form) */}
          <div className="bg-white/80 backdrop-blur-lg p-10 lg:p-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-2">
              Create Account
            </h2>
            <p className="text-gray-600 mb-8">
              Join Open Study and start learning smarter.
            </p>

            <form className="space-y-5" onSubmit={handleFormSubmit}>
              {/* Upload */}
              <div className="rounded-2xl border border-red-200 bg-white/70 p-4 transition-all duration-300 hover:shadow-md">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Profile picture
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setProfilePictureFile(e.target.files[0])}
                  className="
                    w-full text-sm
                    file:mr-4 file:rounded-lg file:border-0
                    file:bg-red-700 file:text-white
                    file:px-4 file:py-2 file:font-semibold
                    hover:file:bg-red-800
                    transition
                  "
                />
              </div>

              {/* Inputs */}
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="
                  w-full px-5 py-4 rounded-xl border border-gray-300 bg-white/90
                  outline-none transition-all duration-300
                  focus:border-red-500 focus:ring-4 focus:ring-red-200/60
                  hover:border-gray-400
                "
                required
              />

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="
                  w-full px-5 py-4 rounded-xl border border-gray-300 bg-white/90
                  outline-none transition-all duration-300
                  focus:border-red-500 focus:ring-4 focus:ring-red-200/60
                  hover:border-gray-400
                "
                required
              />

              <input
                type="text"
                placeholder="Register Number"
                value={registerNumber}
                onChange={(e) => setRegisterNumber(e.target.value)}
                className="
                  w-full px-5 py-4 rounded-xl border border-gray-300 bg-white/90
                  outline-none transition-all duration-300
                  focus:border-red-500 focus:ring-4 focus:ring-red-200/60
                  hover:border-gray-400
                "
                required
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                className="
                  w-full px-5 py-4 rounded-xl border border-gray-300 bg-white/90
                  outline-none transition-all duration-300
                  focus:border-red-500 focus:ring-4 focus:ring-red-200/60
                  hover:border-gray-400
                "
                required
              />

              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className={`
                  w-full px-5 py-4 rounded-xl border bg-white/90
                  outline-none transition-all duration-300
                  focus:ring-4
                  ${
                    passwordsMatch
                      ? "border-gray-300 focus:border-red-500 focus:ring-red-200/60 hover:border-gray-400"
                      : "border-red-500 focus:border-red-600 focus:ring-red-300/70"
                  }
                `}
                required
              />

              {!passwordsMatch && (
                <p className="text-red-600 text-sm font-semibold">
                  Passwords do not match
                </p>
              )}

              {/* Button */}
              <button
                type="submit"
                disabled={loading || !passwordsMatch || !password || !confirmPassword}
                className="
                  w-full rounded-xl
                  bg-linear-to-r from-red-700 via-rose-700 to-red-800
                  text-white py-4 font-semibold
                  shadow-lg shadow-red-700/25
                  transition-all duration-300
                  hover:-translate-y-0.5 hover:shadow-xl
                  disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-lg
                  focus:outline-none focus:ring-4 focus:ring-red-300
                "
              >
                {loading ? "Creating Account..." : "Sign Up"}
              </button>
            </form>

            <p className="text-center mt-8 text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-red-700 font-semibold hover:text-red-900 transition">
                Log in
              </Link>
            </p>

            <div className="mt-8 h-px w-full bg-linear-to-r from-transparent via-red-200/80 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
}
