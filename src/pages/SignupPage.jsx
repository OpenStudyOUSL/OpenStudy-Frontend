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
        profilePictureUrl = await UploadMediaUploadtoSupabase(
          profilePictureFile
        );
      }

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/signup`,
        {
          profilePicture: profilePictureUrl,
          email : email,
          userName : username,
          registerNumber : registerNumber,
          password : password,
        }
      );

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
    <div className="min-h-screen bg-linear-to-br from-purple-700 via-purple-600 to-purple-800 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
        <div className="grid lg:grid-cols-2 min-h-42.5">

          {/* LEFT SECTION */}
          <div className="hidden lg:flex flex-col justify-center px-12 py-16">
            <h1 className="text-6xl font-bold text-white mb-8">
              Open Study
            </h1>
            <p className="text-purple-100 text-xl mb-10">
              Your smart companion for better learning
            </p>
            <p className="text-purple-100 text-xl leading-relaxed">
              Access your personalized dashboard,<br />
              track your quiz performance,<br />
              review your progress,<br />
              and continue your path to<br />
              exam success.
            </p>
          </div>

          {/* RIGHT SECTION */}
          <div className="bg-white/95 p-10 lg:p-16">
            <h2 className="text-4xl font-bold mb-6">
              Create Account
            </h2>

            <form className="space-y-5" onSubmit={handleFormSubmit}>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setProfilePictureFile(e.target.files[0])
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />

              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-5 py-4 border rounded-xl"
                required
              />

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-4 border rounded-xl"
                required
              />

              <input
                type="text"
                placeholder="Register Number"
                value={registerNumber}
                onChange={(e) =>
                  setRegisterNumber(e.target.value)
                }
                className="w-full px-5 py-4 border rounded-xl"
                required
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
                className="w-full px-5 py-4 border rounded-xl"
                required
              />

              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className={`w-full px-5 py-4 border rounded-xl ${
                  passwordsMatch ? "" : "border-red-500"
                }`}
                required
              />

              {!passwordsMatch && (
                <p className="text-red-500 text-sm">
                  Passwords do not match
                </p>
              )}

              <button
                type="submit"
                disabled={
                  loading ||
                  !passwordsMatch ||
                  !password ||
                  !confirmPassword
                }
                className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white py-4 rounded-xl font-semibold transition"
              >
                {loading ? "Creating Account..." : "Sign Up"}
              </button>
            </form>

            <p className="text-center mt-6 text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-purple-700 hover:underline"
              >
                Log in
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
