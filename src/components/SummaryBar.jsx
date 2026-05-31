import React from 'react';

export default function SummaryBar({ height, label }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="w-1.5 h-24 bg-gray-50 rounded-full relative overflow-hidden">
        <div className="absolute bottom-0 w-full bg-[#D4E34A] rounded-full" style={{ height: `${height}%` }}></div>
      </div>
      <span className="text-[8px] text-gray-400 font-black uppercase">{label}</span>
    </div>
  );
}
