import React from 'react';
import IconWrapper from './IconWrapper';
import ProgressBar from './ProgressBar';

export default function StatCard({ title, value, change, isUp, icon, bars }) {
  return (
    <div className="bg-white rounded-[35px] p-7 shadow-sm border border-transparent hover:border-gray-50 transition-all relative overflow-hidden">
      <div className="flex justify-between items-start mb-6">
        <IconWrapper>{icon}</IconWrapper>
        <span className="text-gray-300 text-xs">⋮</span>
      </div>

      <p className="text-gray-400 text-xs font-bold mb-1">{title}</p>
      <h4 className="text-2xl font-black text-gray-800 mb-2">{value}</h4>
      <div className="flex items-center gap-1.5">
        <span className={`text-[10px] font-black ${isUp ? 'text-[#D4E34A]' : 'text-[#A8B330]'}`}>
          {isUp ? '▲' : '▼'} {change}
        </span>
        <span className="text-[10px] text-gray-300 font-bold tracking-tight">from last week</span>
      </div>

      <div className="absolute bottom-6 right-6 flex items-end gap-1 h-12">
        {bars.map((height, i) => (
          <ProgressBar key={i} height={height} opacity={(i + 1) / 4} />
        ))}
      </div>
    </div>
  );
}
