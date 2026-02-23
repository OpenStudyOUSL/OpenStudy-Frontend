# OpenStudy Frontend

The frontend interface for the **OpenStudy Platform** - a comprehensive personalized learning companion designed specifically for OUSL (Open University of Sri Lanka) first-year students.

This modern, interactive React platform enables students to browse courses, take quizzes, participate in a community help forum, track their rankings on a leaderboard, and manage their personal profiles.

## Tech Stack

- **React 19**: Frontend UI library.
- **Vite**: Ultra-fast build tool and development server.
- **React Router Dom 7**: Client-side routing for seamless page navigation.
- **Tailwind CSS 4**: Utility-first CSS framework for rapid and responsive styling.
- **Framer Motion**: Powerful animation library for smooth, interactive UI transitions.
- **Lucide React**: Beautiful, consistent icon set.
- **Axios**: Promise-based HTTP client for interacting with the backend API.
- **Supabase Storage**: Cloud storage utilized for saving and serving user profile pictures.
- **React Hot Toast**: Beautiful, customizable notifications for application events.

## Setup Instructions

### 1. Prerequisites

Ensure you have the following installed on your local machine:

- [Node.js](https://nodejs.org/) (v16 or higher)

### 2. Installation

Navigate into the frontend directory and install all required dependencies:

```bash
cd OpenStudy-Frontend
npm install
```

### 3. Environment Variables

Create a `.env` file in the root of the `OpenStudy-Frontend` directory to link the frontend to your backend API:

```env
VITE_BACKEND_URL=http://localhost:3000
```

_(Optionally, you may also define your Supabase keys here if you choose to move them out of `mediaUpload.js`)_

### 4. Running the Development Server

To start the Vite development server, run:

```bash
npm run dev
```

The application will usually be available at `http://localhost:5173`.

## Core Features

- **Interactive Animations:** Home and About pages feature dynamic reveal-on-scroll animations and interactive buttons utilizing `framer-motion`.
- **Profile Management:** Fully functional profile system allowing image uploads directly hooked into a Supabase bucket.
- **Admin Dashboard:** Role-based conditional rendering allowing Administrators to view stats, manage quizzes, courses, and students securely.
- **Help Forum:** Interactive student community allowing authenticated users to post study topics and replies.
- **Responsive Design:** A mobile-first approach using Tailwind CSS to ensure the platform works flawlessly on phones, tablets, and desktops.
