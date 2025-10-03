import React from 'react';
import type { Language } from '@/types';

const messages = {
  th: {
    score: "คะแนน: ",
  },
  en: {
    score: "Score: ",
  },
};

export default function Score({
  value,
  language,
}: {
  value: number;
  language: Language;
}) {
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-white/40 overflow-hidden p-2">
      {messages[language].score}{value}
    </div>
  );
}
