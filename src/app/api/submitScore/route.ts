import { NextResponse } from 'next/server';
import { connectDB } from '../../lib/mongoose';
import Leaderboard from '../../models/Leaderboard';

export async function POST(request: Request) {
  const body = await request.json();
  const { username, score, duration, powerupsUsed } = body;
  console.log("User:",username,"Score",score,"Duration",duration)

  if (
    typeof username !== 'string' ||
    username.trim().length === 0 ||
    username.length > 10 ||
    /<script.*?>.*?<\/script>/i.test(username) || // crude XSS check
    typeof score !== 'number' ||
    score < 0 || score > 401 ||
    typeof duration !== 'number' ||
    duration < 0 || duration > 3600000
  ) {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 },);
  }

  try {
    await connectDB();

    const existing = await Leaderboard.findOne({ username });
    console.log("Existing score:", existing?.score);
    console.log("Incoming score type:", typeof score, score);

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
  } catch (err) {
    console.error('SubmitScore error:', err);
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
