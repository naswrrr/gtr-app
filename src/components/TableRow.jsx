import React from 'react';
import Avatar from './Avatar';
import StatusBadge from './StatusBadge';

export default function TableRow({ order, idx }) {
  return (
    <tr className="border-b border-gray-50 last:border-0 group">
      <td className="py-4 text-gray-400 font-bold">{order.no}</td>
      <td className="py-4">
        <div className="flex items-center gap-3">
          <Avatar src={`https://i.pravatar.cc/100?u=${idx}`} alt={order.name} />
          <div>
            <p className="font-bold text-gray-800">{order.name}</p>
            <p className="text-[10px] text-gray-400">{order.sub}</p>
          </div>
        </div>
      </td>
      <td className="py-4 font-bold text-gray-800">
        {order.date}
        <p className="text-[10px] text-gray-400 font-medium">{order.time}</p>
      </td>
      <td className="py-4">
        <StatusBadge status={order.status} />
      </td>
      <td className="py-4 font-bold text-gray-800">{order.price}</td>
      <td className="py-4">
        <p className="font-bold text-gray-800">{order.customer}</p>
        <p className="text-[10px] text-gray-400">{order.brand}</p>
      </td>
    </tr>
  );
}
