// src/app/api/getLeaderboard/route.ts
import { NextResponse } from 'next/server';
import { connectDB } from '../../lib/mongoose';
import Leaderboard from '../../models/Leaderboard';

export async function GET() {
  try {
    await connectDB();
    const topScores = await Leaderboard.find({})
      .sort({ score: -1, timestamp: 1 })
      .limit(10);

    return NextResponse.json(topScores);
  } catch (err) {
    console.error('GetLeaderboard error:', err);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
