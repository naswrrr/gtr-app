import React from 'react';

export default function StatusBadge({ status }) {
  const isReceived = status === 'Received';
  return (
    <span className={`px-4 py-1.5 rounded-full font-bold text-[10px] ${isReceived ? 'bg-[#EAF9F1] text-[#48C58C]' : 'bg-[#FFF9E7] text-[#F9C344]'}`}>
      {status}
    </span>
  );
}
