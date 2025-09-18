import { useLeaderboard } from "../hooks/useLeaderboard";

export default function LeaderboardModal({ onClose }: { onClose: () => void }) {
  const { data, loading, error } = useLeaderboard();

  function formatDuration(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = (seconds % 60).toFixed(1);

    if (mins > 0) {
      return `${mins} m${mins > 1 ? "s" : ""} ${secs} s`;
    }
    return `${secs} s`;
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div className="bg-green-200 p-6 rounded shadow-lg w-80">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Leaderboard</h2>
          <button
            onClick={onClose}
            className=" bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
          >
            X
          </button>
        </div>
        {loading && <p>Loading...</p>}
        {error && <p>Error occurred</p>}

        <ul className="space-y-2">
          {data?.map((entry, i) => (
            <li key={i} className="flex justify-between gap-4">
              <span>
                {i + 1}. {entry.username}
              </span>
              <span>{entry.score}</span>
              tsx
              <span>{formatDuration(entry.duration / 1000)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
