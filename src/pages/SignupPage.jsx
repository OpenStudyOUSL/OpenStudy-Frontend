import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import UploadMediaUploadtoSupabase from "../utils/mediaUpload";

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [registerNumber, setRegisterNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const navigate = useNavigate();

  function handlePasswordOnChange(event) {
    const newPassword = event.target.value;
    setPassword(newPassword);
    setPasswordsMatch(newPassword === confirmPassword);
  }

  function handleConfirmPasswordOnChange(event) {
    const newConfirmPassword = event.target.value;
    setConfirmPassword(newConfirmPassword);
    setPasswordsMatch(password === newConfirmPassword);
  }

  async function signUp() {
    let profilePictureUrl = "";
  
    if (profilePictureFile) {
      try {
        profilePictureUrl = await UploadMediaUploadtoSupabase(profilePictureFile);

      } catch (error) {
        console.log("Profile picture upload failed:", error);
        toast.error("Failed to upload profile picture.");
        return;
      }
    }
  
    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/users/signup", {
        profilePicture: profilePictureUrl,
        email: email,
        username: username,
        registerNumber: registerNumber,
        password: password,
      })
      .then((res) => {
        toast.success("User created successfully.");
        if (res.data.message === "User created") {
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("User creation failed.");
      });
  }
  function handleFormSubmit(e) {
    e.preventDefault();

    if (!passwordsMatch) {
      toast.error("Passwords do not match.");
      return;
    }

    if (password.length < 1) {
      toast.error("Please enter a password.");
      return;
    }
    signUp();
  }
  

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-700 via-purple-600 to-purple-800 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
        <div className="grid lg:grid-cols-2 min-h-42.5">
          
          {/* LEFT */}
          <div className="hidden lg:flex flex-col justify-center px-12 py-16">
            <h1 className="text-6xl font-bold text-white mb-8">Open Study</h1>
            <p className="text-purple-100 text-xl mb-10">
              Your smart companion for better learning
            </p>
            <p className="mb-6 text-purple-100 text-xl">
                  Access your personalized dashboard,<br />
                  track your quiz performance,<br />
                  review your progress,<br />
                  and continue your path to<br />
                  exam success.
                </p>
          </div>

          {/* RIGHT */}
          <div className="bg-white/95 p-10 lg:p-16">
            <h2 className="text-4xl font-bold mb-6">Create Account</h2>

            <form className="space-y-5" onSubmit={handleFormSubmit}>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setProfilePictureFile(e.target.files[0])}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
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
                onChange={(e) => setRegisterNumber(e.target.value)}
                className="w-full px-5 py-4 border rounded-xl"
                required
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordOnChange}
                className="w-full px-5 py-4 border rounded-xl"
                required
              />

              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={handleConfirmPasswordOnChange}
                className={`w-full px-5 py-4 border rounded-xl ${
                  passwordsMatch ? "" : "border-red-500"
                }`}
                required
              />

              {!passwordsMatch && (
                <p className="text-red-500 text-sm">Passwords do not match</p>
              )}

              <button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-xl font-semibold"
              >
                Sign Up
              </button>
            </form>

            <p className="text-center mt-6 text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-purple-700 hover:underline">
                Log in
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
