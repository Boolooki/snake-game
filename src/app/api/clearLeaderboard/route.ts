// src/app/api/clearLeaderboard/route.ts
import { NextResponse } from 'next/server';
import { connectDB } from '../../lib/mongoose';
import Leaderboard from '../../models/Leaderboard';

export async function DELETE() {
  try {
    await connectDB();
    await Leaderboard.deleteMany({});
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('ClearLeaderboard error:', err);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
