import { useLeaderboard } from "../../app/services/useLeaderboard";
import { formatTime } from "@/utils/gameUtils";
import { useState } from "react";

type Props = {
  onClose: () => void;
  language: "th" | "en";
};

const messages = {
  th: {
    title: "อันดับคะแนน",
    refresh: "รีเฟรช",
    close: "ปิด",
    loading: "กำลังโหลด...",
    error: "เกิดข้อผิดพลาด",
    points: "แต้ม",
    noData: "ยังไม่มีข้อมูล",
  },
  en: {
    title: "Leaderboard",
    refresh: "Refresh",
    close: "Close",
    loading: "Loading...",
    error: "Error occurred",
    points: "pts",
    noData: "No data yet",
  },
};

export default function LeaderboardModal({ onClose, language }: Props) {
  const [refreshKey, setRefreshKey] = useState(0);
  const { data, loading, error } = useLeaderboard(refreshKey);
  const t = messages[language]

  return (
    <div className="fixed h-full w-full bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      {/* Modal Card */}
      <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-6 w-full max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            {t.title}
          </h2>
          
          <div className="flex gap-2">
            {/* Refresh Button */}
            <button
              onClick={() => setRefreshKey((prev) => prev + 1)}
              className="p-2 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200 hover:bg-emerald-50 hover:border-emerald-300 transition-all hover:scale-110"
              title={t.refresh}
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="px-4 py-2 bg-white/60 backdrop-blur-sm rounded-xl border border-gray-200 hover:bg-red-50 hover:border-red-300 transition-all font-medium text-gray-700"
            >
              {t.close}
            </button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-8">
            <div className="inline-block w-8 h-8 border-4 border-emerald-200 border-t-emerald-500 rounded-full animate-spin mb-2" />
            <p className="text-gray-500">{t.loading}</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-center">
            <p className="text-red-600">{t.error}</p>
          </div>
        )}

        {/* Leaderboard List */}
        {!loading && !error && (
          <div className="space-y-2 max-h-[60vh] overflow-y-auto scrollbar-hide">
            {data && data.length > 0 ? (
              data.map((entry, i) => (
                <div
                  key={i}
                  className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/50 transition-all"
                >
                  <div className="flex items-center justify-between">
                    {/* Rank & Username */}
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div
                        className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
                          i === 0
                            ? "bg-gradient-to-br from-yellow-400 to-yellow-600 text-white"
                            : i === 1
                            ? "bg-gradient-to-br from-gray-300 to-gray-500 text-white"
                            : i === 2
                            ? "bg-gradient-to-br from-orange-400 to-orange-600 text-white"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {i + 1}
                      </div>
                      <span className="font-semibold text-gray-800 truncate">
                        {entry.username}
                      </span>
                    </div>

                    {/* Score & Time */}
                    <div className="text-right flex-shrink-0 ml-3">
                      <div className="text-lg font-bold text-emerald-600">
                        {entry.score} {t.points}
                      </div>
                      <div className="text-xs text-gray-500">
                        {formatTime(entry.duration)}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-400">
                {t.noData}
              </div>
            )}
          </div>
        )}
      </div>

      {/* CSS for hiding scrollbar */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}