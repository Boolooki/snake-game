import { useState, useEffect } from "react";

export const useScoreSubmission = ({
  score,
  playTime,
  isGameOver,
  isPaused,
  username,
}: {
  score: number;
  playTime: number;
  isGameOver: boolean;
  isPaused: boolean;
  username: string;
}) => {
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    if (!isGameOver || isPaused || score === 0 || playTime < 3 || hasSubmitted)
      return;

    setHasSubmitted(true);
    fetch("/api/submitScore", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username || "Anonymous",
        score,
        duration: playTime,
        powerupsUsed: "test",
      }),
    });
  }, [isGameOver, isPaused, score, playTime, hasSubmitted, username]);

  const resetSubmission = () => setHasSubmitted(false);

  return { hasSubmitted, resetSubmission };
};
