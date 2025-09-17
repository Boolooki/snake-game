import { NextResponse } from 'next/server';
import { connectDB } from '../../lib/mongoose';
import Leaderboard from '../../models/Leaderboard';

export async function POST(request: Request) {
  const body = await request.json();
  const { username, score, duration, powerupsUsed } = body;

  if (!username || typeof score !== 'number') {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  try {
    await connectDB();

    const existing = await Leaderboard.findOne({ username });

    if (!existing || score > existing.score) {
      await Leaderboard.findOneAndUpdate(
        { username },
        {
          score,
          duration,
          powerupsUsed,
          timestamp: new Date(),
        },
        { upsert: true, new: true }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('SubmitScore error:', err.message);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
