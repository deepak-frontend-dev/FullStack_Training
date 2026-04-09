"use client";

import { useRef } from "react";

export default function TiltWrapper({ children }) {
    const ref = useRef(null);

    const handleMove = (e) => {
        const card = ref.current;
        const { left, top, width, height } = card.getBoundingClientRect();

        const x = e.clientX - left;
        const y = e.clientY - top;

        const rotateX = ((y - height / 2) / height) * 15;
        const rotateY = ((x - width / 2) / width) * 15;

        card.style.transform = `
      perspective(700px)
      rotateX(${-rotateX}deg)
      rotateY(${rotateY}deg)
      scale(1.03)
    `;
    };

    const handleLeave = () => {
        ref.current.style.transform = `
      perspective(700px)
      rotateX(0deg)
      rotateY(0deg)
      scale(1)
    `;
    };

    return (
        <div
            ref={ref}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            className="h-full transition-transform duration-150 ease-out"
            style={{ transformStyle: "preserve-3d" }}
        >
            {children}
        </div>
    );
}