// src/models/Leaderboard.ts
import mongoose from 'mongoose';

const LeaderboardSchema = new mongoose.Schema({
  username: { type: String, required: true },
  score: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
  duration: Number,
  powerupsUsed: [String],
});

const LeaderboardModel =
  (mongoose.models && mongoose.models.Leaderboard) ||
  mongoose.model("Leaderboard", LeaderboardSchema);

export default LeaderboardModel;

