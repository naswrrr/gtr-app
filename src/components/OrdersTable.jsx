import React from 'react';
import TableHead from './TableHead';
import TableRow from './TableRow';

export default function OrdersTable({ orders }) {
  return (
    <table className="w-full text-left">
      <TableHead />
      <tbody className="text-xs">
        {orders.map((order, idx) => (
          <TableRow key={idx} order={order} idx={idx} />
        ))}
      </tbody>
    </table>
  );
}
