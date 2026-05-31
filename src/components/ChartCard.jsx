import React from 'react';

export default function ChartCard({ children, className = '' }) {
  return (
    <div className={`bg-white rounded-[35px] p-8 shadow-sm flex flex-col justify-between ${className}`.trim()}>
      {children}
    </div>
  );
}
