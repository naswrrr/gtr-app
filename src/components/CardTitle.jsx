import React from 'react';

export default function CardTitle({ title, actionLabel, actionClass = '', actionElement }) {
  return (
    <div className="flex justify-between items-start mb-6">
      <h3 className="font-bold text-gray-800 max-w-[220px] leading-tight">{title}</h3>
      {actionElement ? (
        actionElement
      ) : actionLabel ? (
        <span className={`text-[10px] text-gray-400 font-bold ${actionClass}`.trim()}>{actionLabel}</span>
      ) : null}
    </div>
  );
}
