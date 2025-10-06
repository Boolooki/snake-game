import { formatTime } from "@/utils/gameUtils";

export default function Timer({
  seconds,
}: {
  seconds: number;
}) {
  return (
    <div className="p-1 bg-white/80 backdrop-blur-md rounded-xl shadow-lg border border-white/40 overflow-hidden">
      {formatTime(seconds)}
    </div>
  );
}
