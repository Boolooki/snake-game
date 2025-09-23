import React from "react";
import { PropsLanguage } from "@/types";

export default function LanguageSelector({ language, onLangToggle }: PropsLanguage) {
  const toggleLanguage = () => {
    const nextLang = language === "th" ? "en" : "th";
    onLangToggle(nextLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className="px-4 py-2 rounded-full bg-white shadow-soft hover:bg-primary hover:text-blue-500 transition-all"
    >
      🌐 {language === "th" ? "ไทย" : "English"}
    </button>
  );
}
