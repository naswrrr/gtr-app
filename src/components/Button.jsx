import React from 'react';

export default function Button({ className = '', children, ...props }) {
  return (
    <button className={`rounded-2xl font-bold transition-all ${className}`.trim()} {...props}>
      {children}
    </button>
  );
}
