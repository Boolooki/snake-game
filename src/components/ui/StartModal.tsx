import { PropsStartModal } from "@/types";
import { BACKGROUND_CIRCLES } from "@/constants/gameConstants";

const messages = {
  th: {
    title: "Snake Game",
    subtitle: "เริ่มต้นการผจญภัย",
    placeholder: "ชื่อผู้เล่น",
    startButton: "เริ่มเกม",
  },
  en: {
    title: "Snake Game",
    subtitle: "Start Your Adventure",
    placeholder: "Player Name",
    startButton: "Start Game",
  },
};

export default function StartModal({
  username,
  setUsername,
  gameStart,
  hasStarted,
  language,
  onLangToggle,
}: PropsStartModal) {
  if (hasStarted) return null;

  const t = messages[language];

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      {/* Animated Background with floating circles */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 overflow-hidden">
        {BACKGROUND_CIRCLES.map((circle, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-br from-emerald-400/30 to-teal-400/30 animate-float"
            style={{
              width: `${circle.size}px`,
              height: `${circle.size}px`,
              left: `${circle.left}%`,
              top: `${circle.top}%`,
              animationDelay: `${circle.delay}s`,
              animationDuration: `${circle.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Modal Card */}
      <div className="
        relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/40 p-6 w-full max-w-[90%] 
        landscape:max-w-[50%] landscape:h-auto max-h-[90vh] 
      ">
        {/* Language Toggle */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={() => onLangToggle("th")}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              language === "th"
                ? "bg-emerald-500 text-white shadow-lg"
                : "bg-white/50 text-gray-600 hover:bg-white/80"
            }`}
          >
            TH
          </button>
          <button
            onClick={() => onLangToggle("en")}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
              language === "en"
                ? "bg-emerald-500 text-white shadow-lg"
                : "bg-white/50 text-gray-600 hover:bg-white/80"
            }`}
          >
            EN
          </button>
        </div>

        {/* Snake Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-3xl lg:text-4xl">🐍</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl lg:text-3xl font-bold text-center bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
          {t.title}
        </h1>
        <p className="text-center text-gray-500 text-xs lg:text-sm mb-6">
          {t.subtitle}
        </p>

        {/* Input Field */}
        <div className="relative mb-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            maxLength={10}
            className="w-full px-4 py-3 lg:px-6 lg:py-4 bg-white/60 backdrop-blur-sm border-2 border-gray-200 rounded-2xl text-center text-base lg:text-lg font-medium transition-all duration-300 focus:outline-none focus:border-emerald-400 focus:shadow-lg focus:shadow-emerald-200/50"
            placeholder={t.placeholder}
          />
          <div className="absolute -bottom-4 right-2 text-xs text-gray-400">
            {username.length}/10
          </div>
        </div>

        {/* Start Button */}
        <button
          onClick={gameStart}
          disabled={!username}
          className="w-full mt-6 py-3 lg:py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl font-bold text-base lg:text-lg shadow-xl hover:shadow-2xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all duration-300 group"
        >
          <span className="flex items-center justify-center gap-2">
            {t.startButton}
            <span className="transform group-hover:translate-x-1 transition-transform">
              →
            </span>
          </span>
        </button>

        {/* Decorative blur elements */}
        <div className="absolute -top-3 -left-3 w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full blur-2xl -z-10" />
        <div className="absolute -bottom-3 -right-3 w-24 h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-teal-400/20 to-cyan-400/20 rounded-full blur-2xl -z-10" />
      </div>
    </div>
  );
}