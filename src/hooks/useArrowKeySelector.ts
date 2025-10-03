// hooks/useArrowKeySelector.ts
import { useEffect, useState } from "react";

export function useArrowKeySelector<T>(
  options: T[],
  onSelect: (option: T) => void,
  isActive: boolean
) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!isActive || options.length === 0) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev > 0 ? prev - 1 : options.length - 1
          );
          break;

        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < options.length - 1 ? prev + 1 : 0
          );
          break;

        case "Enter":
          e.preventDefault();
          onSelect(options[selectedIndex]);
          break;

        case "Escape":
          e.preventDefault();
          // ถ้าต้องการให้กด ESC ปิดได้ ให้เพิ่ม callback
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isActive, selectedIndex, options, onSelect]);

  // Reset index เมื่อ options เปลี่ยน
  useEffect(() => {
    if (selectedIndex >= options.length) {
      setSelectedIndex(Math.max(0, options.length - 1));
    }
  }, [options.length, selectedIndex]);

  return { selectedIndex, setSelectedIndex };
}