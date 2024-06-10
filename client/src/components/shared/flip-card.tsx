"use client";

import { useState } from "react";
import ReactCardFlip from "react-card-flip";

interface FlipCardProps {
  className?: string;
  front: React.ReactNode;
  back: React.ReactNode;
}

export function FlipCard({ className, front, back }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped((prevState) => !prevState);
  };

  const error = console.error;
  console.error = (...args: any) => {
    if (/defaultProps/.test(args[0])) return;
    error(...args);
  };

  return (
    <div className={className}>
      <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
        <div onClick={handleClick}>{front}</div>

        <div onClick={handleClick}>{back}</div>
      </ReactCardFlip>
    </div>
  );
}
