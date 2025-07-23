"use client";

import "@/styles/background.css";

import { useEffect, useState } from "react";

export default function Background() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="absolute flex w-full overflow-hidden">
      {/* Animated background gradient */}
      <div
        className="fixed bottom-0 h-full w-full bg-gradient-to-br from-[#000203] via-[#29385E] to-[#1BACE3] transition-transform duration-1000 ease-out"
        style={{
          transform: `translate(${mousePosition.x * 20 - 10}px, ${
            mousePosition.y * 20 - 10
          }px) scale(1.1)`,
        }}
      >
        {/* Animated overlay gradient */}
        <div
          className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#1BACE3]/10 to-[#29385E]/20 animate-pulse"
          style={{
            animationDuration: "4s",
          }}
        />
      </div>

      {/* Floating light particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(16)].map((_, i) => {
          const size = 8 + (i % 8) * 8; // Varies between 8px and 64px (4px to 32px radius)
          const opacity = (1 - size / 80) * 0.7 + 0.2; // Smaller = more opaque, larger = less opaque
          return (
            <div
              key={i}
              className="absolute bg-[#1BACE3] rounded-full animate-float-scale"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${5 + (i % 10) * 9 + (i > 7 ? 5 : 0)}%`,
                top: `${10 + (i % 5) * 18 + (i > 7 ? 10 : 0)}%`,
                animationDelay: `${i * 1.2}s`,
                animationDuration: `${12 + (i % 3) * 3}s`,
                opacity: opacity,
                filter:
                  "drop-shadow(0 0 4px rgba(27, 172, 227, 0.8)) drop-shadow(0 0 12px rgba(27, 172, 227, 0.6)) drop-shadow(0 0 24px rgba(27, 172, 227, 0.4)) drop-shadow(0 0 48px rgba(27, 172, 227, 0.2))",
              }}
            />
          );
        })}
      </div>

      {/* Bottom overlay with subtle animation */}
      <div
        className="fixed bottom-0 h-1/2 w-full bg-gradient-to-b from-transparent to-[#000203] transition-opacity duration-2000"
        style={{
          opacity: 0.8 + mousePosition.y * 0.2,
        }}
      />

      {/* Subtle moving light streaks */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#1BACE3]/20 to-transparent animate-slide-right" />
        <div className="absolute top-2/3 right-0 w-full h-px bg-gradient-to-l from-transparent via-[#29385E]/30 to-transparent animate-slide-left" />
      </div>
    </div>
  );
}
