import { PropsStartModal } from "@/types";

export default function StartModal({ username, setUsername, onStart, hasStarted }: PropsStartModal) {
  if (hasStarted) return null;

  return (
    <div className="fixed inset-0 bg-green-300 bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow text-center">
        <h2 className="text-lg font-bold mb-4">Enter your name to start</h2>
        {username.length >= 10 && (
          <p className="text-sm text-red-600 mt-1">Max 10 characters allowed</p>
        )}
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          maxLength={10}
          className="px-3 py-2 border rounded w-64 text-center mb-4"
          placeholder="Maximum 10 character"
        />
        <button
          onClick={onStart}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Start Game
        </button>
      </div>
    </div>
  );
}
