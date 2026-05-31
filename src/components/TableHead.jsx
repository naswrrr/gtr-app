import React from 'react';

export default function TableHead() {
  return (
    <thead>
      <tr className="text-gray-400 text-[11px] font-bold uppercase tracking-wide border-b border-gray-50">
        <th className="pb-4">No</th>
        <th className="pb-4">User Name</th>
        <th className="pb-4">Order Date</th>
        <th className="pb-4">Status</th>
        <th className="pb-4">Price</th>
        <th className="pb-4">Customers</th>
      </tr>
    </thead>
  );
}
