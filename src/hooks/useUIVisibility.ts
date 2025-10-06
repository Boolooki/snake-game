// hooks/useUIVisibility.ts
import { useState, useEffect, useRef } from "react";

export const useUIVisibility = (hideDelay = 3000) => {
  const [isUIVisible, setIsUIVisible] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showUI = () => {
    setIsUIVisible(true);
    
    // Clear timeout เดิม
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // ตั้ง timeout ใหม่
    timeoutRef.current = setTimeout(() => {
      setIsUIVisible(false);
    }, hideDelay);
  };

  useEffect(() => {
    const handleMouseMove = () => showUI();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        setIsUIVisible((prev) => !prev); // Toggle
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("keydown", handleKeyDown);

    // แสดง UI ครั้งแรก
    showUI();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("keydown", handleKeyDown);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [hideDelay]);

  return { isUIVisible, showUI, hideUI: () => setIsUIVisible(false) };
};