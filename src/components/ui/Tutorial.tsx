import type { Language } from "@/types";


type TutorialProps = {
  language: Language;
  onOpen: (show: boolean) => void;
};

export default function Tutorial({ language, onOpen, }: TutorialProps) {
  const messages = {
    th: { tutorial: "📖ดูสอนเล่น" },
    en: { tutorial: "📖Tutorial" },
  };

  return (
    <>
      <button
        onClick={() => onOpen(true)}
        className="z-31 bg-white md:text-xl hover:bg-yellow-400  px-4 py-2 md:px-8 md:py-4  rounded-xl transition duration-300 text-sm shadow-lg "
      >
        {messages[language].tutorial}
      </button>
    </>
  );
}

