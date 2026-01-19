import { useMemo } from "react";

function RankBadge({ rank }) {
  return (
    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-violet-600 text-xs font-bold text-white">
      {rank}
    </span>
  );
}

function TopCard({ place, user, big }) {
  return (
    <div
      className={[
        "relative rounded-2xl bg-violet-300/80 shadow-sm ring-1 ring-black/5",
        big ? "w-55 md:w-60 p-5" : "w-47.5 md:w-50 p-4",
      ].join(" ")}
    >
      {/* Place bubble */}
      <div className="absolute -left-3 -top-3 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-300 text-2xl font-extrabold text-black ring-2 ring-white">
        {place}
      </div>

      {/* Avatar */}
      <div className="mx-auto mt-2 h-24 w-24 overflow-hidden rounded-full bg-white/70 ring-2 ring-white">
        <img
          src={user.avatar}
          alt={user.name}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="mt-3 text-center">
        <div className="text-sm font-bold text-slate-900">{user.name}</div>
        <div className="text-xs text-slate-700">{user.studentId}</div>
        <div className="mt-2 text-xs font-semibold text-slate-900">
          Score:{" "}
          <span className="font-extrabold">{user.score.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

function LeaderboardPage() {
  // Demo data (later you can fetch from backend)
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

      // Table rows (rank 4+)
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
    <div className="min-h-[calc(100vh-140px)] bg-violet-100">
      <div className="mx-auto max-w-6xl px-4 py-8">
        {/* Title */}
        <h1 className="text-2xl font-extrabold italic text-violet-600">
          Leader Board
        </h1>

        {/* Top 3 section (2 - 1 - 3) */}
        <div className="mt-6 flex flex-col items-center justify-center gap-6 md:flex-row md:gap-10">
          <TopCard place={2} user={top3[1]} />
          <TopCard place={1} user={top3[0]} big />
          <TopCard place={3} user={top3[2]} />
        </div>

        {/* Table */}
        <div className="mt-8 overflow-hidden rounded-xl bg-white/40 ring-1 ring-black/10">
          {/* Table header */}
          <div className="grid grid-cols-12 gap-2 bg-white/50 px-4 py-3 text-xs font-bold text-slate-700">
            <div className="col-span-2">Rank</div>
            <div className="col-span-6">Name</div>
            <div className="col-span-2 text-right">Score</div>
            <div className="col-span-2 text-right">Quizzes</div>
          </div>

          {/* Table rows */}
          <div className="divide-y divide-black/10">
            {rows.map((r) => (
              <div
                key={r.rank}
                className="grid grid-cols-12 items-center gap-2 px-4 py-3 text-sm text-slate-800 hover:bg-white/30"
              >
                <div className="col-span-2">
                  <RankBadge rank={r.rank} />
                </div>

                <div className="col-span-6 font-semibold">{r.name}</div>

                <div className="col-span-2 text-right">
                  {r.score.toLocaleString()}
                </div>

                <div className="col-span-2 text-right">{r.quizzes}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeaderboardPage;
