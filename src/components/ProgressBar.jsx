import React from 'react';

export default function ProgressBar({ height, opacity = 1 }) {
  return (
    <div className="w-2 rounded-full bg-[#1A1C1E]" style={{ height: `${height}%`, opacity }} />
  );
}
