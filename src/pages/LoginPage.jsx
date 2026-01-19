// LoginSplitPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function login() {
    axios.post(import.meta.env.VITE_BACKEND_URL + "/api/users/login", {
      email: email,
      password: password
    }).then((res) => {
      if (res.data.user == null) {
        toast.error(res.data.message);
        return;
      }
      if(res.data.user.isBlocked){
        toast.error("Your account is blocked. Please contact support.");
        return;
      }
      
      toast.success("Login successful");
      localStorage.setItem("token", res.data.token);
      
      if (res.data.user.type === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    }).catch((error) => {
      toast.error("Login failed. Please check your credentials.");
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-700 to-purple-900 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
        <div className="grid md:grid-cols-2 min-h-155">
          
          {/* LEFT SIDE - Branding / Description */}
          <div className="hidden md:flex flex-col justify-center p-12 lg:p-16 bg-linear-to-br from-purple-600/40 to-purple-800/40 relative overflow-hidden">
            {/* Optional subtle background effect */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute -top-20 -left-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10">
              <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6">
                Open Study
              </h1>
              
              <p className="text-purple-100 text-xl lg:text-2xl leading-relaxed max-w-lg">
                Your personalized learning companion
              </p>

              <div className="mt-10 text-purple-50 text-lg">
                <p className="mb-6">
                  Access your personalized dashboard,<br />
                  track your quiz performance,<br />
                  review your progress,<br />
                  and continue your path to<br />
                  exam success.
                </p>
                
                <p className="italic opacity-90">
                  "Study smarter. Achieve more."
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - Login Form */}
          <div className="bg-white p-10 lg:p-16 flex flex-col justify-center">
            <div className="max-w-md mx-auto w-full">
              {/* Mobile-only title */}
              <div className="md:hidden text-center mb-10">
                <h2 className="text-4xl font-bold text-gray-900 mb-2">Open Study</h2>
                <p className="text-gray-600">Welcome Back!</p>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-2 hidden md:block">
                Welcome Back!
              </h2>
              <p className="text-gray-600 mb-10 hidden md:block">Log in to continue</p>

              <form className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2 text-sm">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-200/30 outline-none transition-all"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2 text-sm">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-5 py-4 rounded-xl border border-gray-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-200/30 outline-none transition-all"
                    placeholder="••••••••••••"
                  />
                </div>

                <div className="flex justify-end">
                  <a href="#" className="text-purple-700 hover:text-purple-900 text-sm font-medium">
                    Forgot password?
                  </a>
                </div>

                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-4 rounded-xl transition duration-200 shadow-lg shadow-purple-500/30 mt-4"
                >
                  Log in
                </button>
              </form>

              <p className="text-center mt-10 text-gray-600 text-sm">
                Don't have an account?{' '}
                <Link to="/signup" className="text-purple-700 font-medium hover:text-purple-900">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}