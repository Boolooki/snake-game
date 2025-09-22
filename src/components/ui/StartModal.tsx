import { PropsStartModal } from "@/types";

export default function StartModal({
  username,
  setUsername,
  onStart,
  hasStarted,
}: PropsStartModal) {
  if (hasStarted) return null;

  return (
    <div className="fixed inset-0 bg-green-300 bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-green-300 to-blue-300 p-6 rounded-xl shadow-2xl border-4 border-white w-[320px] font-arcade text-center transform scale-95 opacity-0 animate-[fadeIn_1s_ease-out_forwards]">
        <h2 className="text-2xl mb-4 text-black drop-shadow">
          🕹️ Ready to Play? 🐍
        </h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          maxLength={10}
          className="px-4 py-2 border-2 border-black rounded bg-green-100 text-center w-full mb-2 font-bold"
          placeholder="Enter your name"
        />
        {username.length >= 10 && (
          <p className="text-xs text-red-600 mb-2">Max 10 characters allowed</p>
        )}
        <button
          onClick={onStart}
          className="bg-green-400 text-white px-4 py-2 rounded hover:bg-green-600 hover:text-black transition-all font-bold"
        >
          ▶ Start Game
        </button>
      </div>
    </div>
  );
}
