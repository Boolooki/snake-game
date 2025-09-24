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
    <div className="text-xl font-bold text-center mt-4">
      <div>{messages[language].score}{value}</div>
    </div>
  );
}
