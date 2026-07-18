// islands/RotatingHeadline.tsx
import { useEffect, useState } from "react";

const phrases = [
    "who doesn't follow you back",
    "who followed you first",
    "your biggest fans",
    "your Instagram Wrapped",
];

export default function RotatingHeadline() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % phrases.length);
        }, 2200);
        return () => clearInterval(interval);
    }, []);

    return (
        <span className="text-balance">
            <span className="text-gray-900">See </span>
            <span className="bg-linear-to-r from-purple-500 via-pink-500 to-orange-400 bg-clip-text text-transparent transition-opacity duration-300">
                {phrases[index]}
            </span>
        </span>
    );
}
