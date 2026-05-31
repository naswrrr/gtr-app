import React from 'react';

export default function Avatar({ src, alt }) {
  return (
    <div className="w-9 h-9 rounded-xl bg-gray-200 overflow-hidden">
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </div>
  );
}
