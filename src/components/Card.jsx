import React from 'react';

export default function Card({ className = '', children }) {
  return (
    <div className={`bg-white rounded-[35px] p-8 shadow-sm ${className}`.trim()}>
      {children}
    </div>
  );
}
