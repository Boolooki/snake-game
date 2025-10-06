import React from "react";
import { PropsLanguage } from "@/types";

export default function LanguageSelector({
  language,
  onLangToggle,
}: PropsLanguage) {
  const toggleLanguage = () => {
    const nextLang = language === "th" ? "en" : "th";
    onLangToggle(nextLang);
  };

  return (
    <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-white/40 overflow-hidden">
      <button
        onClick={toggleLanguage}
        className="px-4 py-2 bg-white shadow-soft hover:bg-primary hover:text-blue-500 transition-all"
      >
        🌐 {language === "th" ? "ไทย" : "Eng"}
      </button>
    </div>
  );
}
