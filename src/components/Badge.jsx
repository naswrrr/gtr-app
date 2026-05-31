import React from 'react';

export default function Badge({ children, className = '' }) {
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold ${className}`.trim()}>
      {children}
    </span>
  );
}
