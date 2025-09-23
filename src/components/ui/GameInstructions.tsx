type Language = "th" | "en";

const messages = {
  th: {
    move: "ใช้ปุ่มลูกศร, ASWD หรือท่าทางเพื่อเคลื่อนที่",
    shield: "เก็บโล่สีน้ำเงินเพื่อรอดจากระเบิดสีแดงหนึ่งลูก!",
  },
  en: {
    move: "Use Arrow Keys, ASWD or Gestures to Move",
    shield: "Collect the blue shield to survive one red bomb!",
  },
};

export default function GameInstructions({ currentlanguage }: { currentlanguage: Language }) {
  return (
    <>
      <div>{messages[currentlanguage].move}</div>
      <div>{messages[currentlanguage].shield}</div>
    </>
  );
}
