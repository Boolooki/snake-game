// src/models/Leaderboard.ts
import mongoose from 'mongoose';

const LeaderboardSchema = new mongoose.Schema({
  username: { type: String, required: true },
  score: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
  duration: Number,
  powerupsUsed: [String],
});

export default mongoose.models.Leaderboard ||
  mongoose.model('Leaderboard', LeaderboardSchema);
