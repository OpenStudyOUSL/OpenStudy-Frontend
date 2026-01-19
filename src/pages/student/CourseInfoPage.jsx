import React from "react";

const CourseInfoPage = () => {
    const quizzes = [
        { title: "Topic of Quiz one", count: 5 },
        { title: "Topic of Quiz two", count: 4 },
        { title: "Topic of Quiz three", count: 8 },
        { title: "Topic of Quiz four", count: 10 },
        { title: "Topic of Quiz five", count: 9 },
    ];

    return (
        <div className="min-h-screen flex flex-col bg-purple-50">
            {/* Header */}
            <header className="bg-purple-600 text-white px-8 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold">Open Study</h1>
                <nav className="space-x-6 hidden md:flex">
                    <a href="#" className="hover:underline">Courses</a>
                    <a href="#" className="hover:underline">Leaderboard</a>
                    <a href="#" className="hover:underline">Help</a>
                    <a href="#" className="hover:underline">Contact us</a>
                </nav>
                <div className="w-9 h-9 rounded-full bg-white text-purple-600 flex items-center justify-center font-bold">
                    I
                </div>
            </header>

            {/* Content */}
            <main className="flex-grow px-6 md:px-16 py-10">
                <h2 className="text-2xl font-bold text-gray-800 mb-8">Course Name</h2>

                <div className="space-y-4">
                    {quizzes.map((quiz, index) => (
                        <div
                            key={index}
                            className="bg-gradient-to-r from-purple-300 to-purple-200 rounded-xl px-6 py-5 flex items-center justify-between shadow"
                        >
                            <h3 className="text-lg font-semibold text-gray-800">
                                {quiz.title}
                            </h3>

                            <div className="flex items-center gap-6">
                                <span className="text-gray-700 font-medium">
                                    Quizzes {quiz.count}
                                </span>
                                <button className="bg-white text-purple-700 px-5 py-2 rounded-lg font-semibold shadow hover:bg-purple-100 transition">
                                    Attempt
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-purple-600 text-white py-6 mt-10">
                <div className="flex flex-col md:flex-row items-center justify-between px-8">
                    <div>
                        <h3 className="text-xl font-bold">Open Study</h3>
                        <p className="text-xs mt-1">Study Smart, Score High</p>
                    </div>
                    <nav className="space-x-4 mt-4 md:mt-0 text-sm">
                        <a href="#" className="hover:underline">Home</a>
                        <a href="#" className="hover:underline">Quiz</a>
                        <a href="#" className="hover:underline">Leaderboard</a>
                        <a href="#" className="hover:underline">Help</a>
                        <a href="#" className="hover:underline">Contact us</a>
                        <a href="#" className="hover:underline">About Us</a>
                    </nav>
                </div>
                <p className="text-center text-xs mt-4">© 2026 Open Study. All Rights Reserved.</p>
            </footer>
        </div>
    );
};

export default CourseContentPage;