import { useMemo } from "react";

/* Rank badge (red theme + transitions) */
function RankBadge({ rank }) {
  return (
    <span
      className="
        inline-flex h-6 w-6 items-center justify-center rounded-full
        bg-red-700 text-xs font-bold text-white
        shadow-sm shadow-red-700/20
        transition-transform duration-300
        group-hover:scale-110
      "
    >
      {rank}
    </span>
  );
}

/* Top 3 cards (glass + glow + hover lift) */
function TopCard({ place, user, big }) {
  return (
    <div
      className={[
        "group relative overflow-hidden rounded-3xl border border-red-200/60 bg-white/70 backdrop-blur shadow-xl shadow-red-900/10",
        "transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl",
        big ? "w-55 md:w-60 p-6" : "w-47.5 md:w-50 p-5",
      ].join(" ")}
    >
      {/* Hover glow */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -top-24 -right-24 h-56 w-56 rounded-full bg-red-400/25 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-rose-400/25 blur-3xl" />
      </div>

      {/* Place bubble */}
      <div
        className="
          absolute -left-3 -top-3 flex h-12 w-12 items-center justify-center rounded-full
          bg-linear-to-br from-yellow-200 to-yellow-400
          text-2xl font-extrabold text-black
          ring-2 ring-white
          shadow-md
          transition-transform duration-300
          group-hover:scale-105
        "
      >
        {place}
      </div>

      {/* Avatar */}
      <div
        className="
          relative mx-auto mt-3 h-24 w-24 overflow-hidden rounded-full
          bg-white/70 ring-2 ring-white shadow-md
          transition-transform duration-500
          group-hover:scale-105
        "
      >
        <img
          src={user.avatar}
          alt={user.name}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="relative mt-4 text-center">
        <div className="text-sm font-extrabold text-gray-900">{user.name}</div>
        <div className="text-xs text-gray-600">{user.studentId}</div>

        <div className="mt-3 text-xs font-semibold text-gray-900">
          Score:{" "}
          <span className="font-extrabold text-red-800">
            {user.score.toLocaleString()}
          </span>
        </div>

        {/* small gradient divider */}
        <div className="mt-4 h-px w-full bg-linear-to-r from-transparent via-red-200/80 to-transparent" />
      </div>
    </div>
  );
}

function LeaderboardPage() {
  const leaderboard = useMemo(
    () => [
      {
        rank: 1,
        name: "A. Silva",
        studentId: "123456789",
        score: 1890,
        quizzes: 51,
        avatar:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&auto=format&fit=crop",
      },
      {
        rank: 2,
        name: "A. Silva",
        studentId: "123456789",
        score: 1820,
        quizzes: 48,
        avatar:
          "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&auto=format&fit=crop",
      },
      {
        rank: 3,
        name: "A. Silva",
        studentId: "123456789",
        score: 1780,
        quizzes: 45,
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop",
      },

      ...Array.from({ length: 12 }).map((_, i) => ({
        rank: 4 + i,
        name: "A. Silva",
        score: 1750,
        quizzes: 51,
      })),
    ],
    []
  );

  const top3 = leaderboard.slice(0, 3);
  const rows = leaderboard.slice(3);

  return (
    <div className="min-h-[calc(100vh-140px)] relative overflow-hidden bg-linear-to-br from-red-50 via-rose-50 to-white">
      {/* About-style overlay + glows */}
      <div className="absolute inset-0 bg-linear-to-br from-red-700/10 via-rose-600/6 to-transparent" />
      <div className="pointer-events-none absolute -top-48 -right-40 h-104 w-104 rounded-full bg-red-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-52 -left-40 h-112 w-md rounded-full bg-rose-400/20 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 py-10">
        {/* Title */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="text-red-700 font-semibold text-sm">
              Performance & Rankings
            </p>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
              Leader Board
              <span className="ml-2 bg-linear-to-r from-red-700 via-rose-700 to-red-700 bg-clip-text text-transparent">
                • Top Students
              </span>
            </h1>
          </div>

          {/* small badge like your style */}
          <div className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-white/70 px-3 py-1 text-xs font-semibold text-red-800 shadow-sm backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-red-600" />
            Updated live
          </div>
        </div>

        {/* Top 3 */}
        <div className="mt-8 flex flex-col items-center justify-center gap-6 md:flex-row md:gap-10">
          <TopCard place={2} user={top3[1]} />
          <TopCard place={1} user={top3[0]} big />
          <TopCard place={3} user={top3[2]} />
        </div>

        {/* Table (glass) */}
        <div className="mt-10 overflow-hidden rounded-2xl border border-red-200/60 bg-white/70 backdrop-blur shadow-xl shadow-red-900/10">
          {/* header */}
          <div className="grid grid-cols-12 gap-2 bg-white/60 px-4 py-3 text-xs font-extrabold text-gray-700">
            <div className="col-span-2">Rank</div>
            <div className="col-span-6">Name</div>
            <div className="col-span-2 text-right">Score</div>
            <div className="col-span-2 text-right">Quizzes</div>
          </div>

          {/* rows */}
          <div className="divide-y divide-red-200/60">
            {rows.map((r) => (
              <div
                key={r.rank}
                className="
                  group grid grid-cols-12 items-center gap-2 px-4 py-3
                  text-sm text-gray-800
                  transition-all duration-300
                  hover:bg-white/60
                "
              >
                <div className="col-span-2">
                  <RankBadge rank={r.rank} />
                </div>

                <div className="col-span-6 font-semibold">{r.name}</div>

                <div className="col-span-2 text-right font-semibold text-gray-900">
                  {r.score.toLocaleString()}
                </div>

                <div className="col-span-2 text-right text-gray-700">
                  {r.quizzes}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* bottom divider */}
        <div className="mt-10 h-px w-full bg-linear-to-r from-transparent via-red-200/80 to-transparent" />
      </div>
    </div>
  );
}

export default LeaderboardPage;
