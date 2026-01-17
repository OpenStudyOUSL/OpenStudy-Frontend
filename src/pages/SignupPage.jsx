// SignUpSplitPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function SignUpSplitPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-purple-700 via-purple-600 to-purple-800 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 overflow-hidden">
        <div className="grid lg:grid-cols-2 min-h-170">

          {/* ── LEFT SIDE ── Project name + description */}
          <div className="hidden lg:flex flex-col justify-center px-12 xl:px-16 py-16 relative bg-linear-to-br from-purple-600/30 to-purple-800/30">
            {/* subtle background decoration */}
            <div className="absolute inset-0 opacity-15 pointer-events-none">
              <div className="absolute -top-32 -left-32 w-125 h-125 bg-white rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10">
              <h1 className="text-6xl xl:text-7xl font-bold text-white tracking-tight mb-8">
                Open Study
              </h1>

              <p className="text-purple-100 text-xl xl:text-2xl leading-relaxed max-w-xl mb-12">
                Your smart companion for better learning
              </p>

              <p className="text-purple-50 text-lg leading-relaxed italic opacity-95">
                "Access your personalized dashboard,<br />
                track your quiz performance,<br />
                and continue your path to exam<br />
                success."
              </p>
            </div>
          </div>

          {/* ── RIGHT SIDE ── Sign Up Form */}
          <div className="bg-white/95 p-10 lg:p-16 flex flex-col justify-center">
            <div className="max-w-md mx-auto w-full">
              {/* Mobile title */}
              <div className="lg:hidden text-center mb-12">
                <h2 className="text-5xl font-bold text-gray-900 mb-3">Open Study</h2>
                <p className="text-xl text-gray-600">Welcome !</p>
                <p className="text-lg text-purple-700 mt-1">Sign Up</p>
              </div>

              {/* Desktop title */}
              <div className="hidden lg:block mb-10">
                <h2 className="text-4xl font-bold text-gray-900 mb-2">Welcome !</h2>
                <p className="text-xl text-purple-700 font-medium">Sign Up</p>
              </div>

              <form className="space-y-7">
                <div>
                  <label className="block text-gray-700 font-medium mb-2 text-sm">
                    Username
                  </label>
                  <input
                    type="text"
                    className="w-full px-5 py-4 rounded-xl border border-gray-300 
                             focus:border-purple-600 focus:ring-2 focus:ring-purple-200/40 
                             outline-none transition-all text-gray-800 placeholder-gray-400"
                    placeholder="Choose a username"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2 text-sm">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-5 py-4 rounded-xl border border-gray-300 
                             focus:border-purple-600 focus:ring-2 focus:ring-purple-200/40 
                             outline-none transition-all text-gray-800 placeholder-gray-400"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2 text-sm">
                    Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-5 py-4 rounded-xl border border-gray-300 
                             focus:border-purple-600 focus:ring-2 focus:ring-purple-200/40 
                             outline-none transition-all text-gray-800 placeholder-gray-400"
                    placeholder="••••••••••••"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 active:bg-purple-800 
                           text-white font-semibold text-lg py-4 rounded-xl 
                           transition-all duration-200 shadow-lg shadow-purple-500/30 mt-4"
                >
                  Sign Up
                </button>

                
              </form>

              <p className="text-center mt-10 text-gray-600 text-sm">
                Do you have an account?{' '}
                <Link to="/login" className="text-purple-700 font-medium hover:text-purple-900">
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