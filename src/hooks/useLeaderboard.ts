import { useState, useEffect } from 'react';
import { LeaderboardEntry } from '../types';

export function useLeaderboard() {
  const [data, setData] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('/api/getLeaderboard')
      .then((res) => res.json())
      .then((json: LeaderboardEntry[]) => {
        setData(json);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  return { data, loading, error };
}
