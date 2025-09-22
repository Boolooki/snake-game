export default function BoardOverlay({
  isGameOver,
  isPaused,
}: {
  isGameOver: boolean;
  isPaused: boolean;
}) {
  if (!isGameOver && !isPaused) return null;

  const message = isGameOver ? "Game Over!" : "Paused";
  const color = isGameOver ? "text-red-500" : "text-orange-500";

  return (
    <div className={`absolute ${color} text-xl font-bold flex justify-center items-center w-full h-full bg-opacity-75`}>
      {message}
    </div>
  );
}
