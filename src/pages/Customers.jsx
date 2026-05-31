import React from 'react';
import Avatar from '../components/Avatar';
import Badge from '../components/Badge';
import Card from '../components/Card';
import CardTitle from '../components/CardTitle';

const customerData = [
  {
    name: 'Devon Lane',
    email: 'devon.lane@mail.com',
    location: 'Philadelphia, USA',
    status: 'Active',
    tier: 'Premium',
    orders: 125,
    spent: '$101,345.00',
  },
  {
    name: 'Kathryn Murphy',
    email: 'kathryn.murphy@mail.com',
    location: 'Los Angeles, USA',
    status: 'Active',
    tier: 'Standard',
    orders: 11,
    spent: '$2,400.98',
  },
  {
    name: 'Eleanor Pena',
    email: 'eleanor.pena@mail.com',
    location: 'Manhattan, USA',
    status: 'Inactive',
    tier: 'Premium',
    orders: 98,
    spent: '$56,987.00',
  },
  {
    name: 'Annette Black',
    email: 'annette.black@mail.com',
    location: 'Toronto, CA',
    status: 'Active',
    tier: 'Standard',
    orders: 51,
    spent: '$12,567.90',
  },
  {
    name: 'Guy Hawkins',
    email: 'guy.hawkins@mail.com',
    location: 'Pittsburgh, USA',
    status: 'Active',
    tier: 'Premium',
    orders: 12,
    spent: '$4,670.44',
  },
  {
    name: 'Floyd Miles',
    email: 'floyd.miles@mail.com',
    location: 'Montreal, CA',
    status: 'Inactive',
    tier: 'Standard',
    orders: 56,
    spent: '$24,456.56',
  },
];

export default function Customers() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 space-y-6">
      <div className="mx-4 space-y-6">
        <Card>
          <CardTitle title="Customers" actionLabel="Member list" />
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-gray-100 bg-gray-50 text-[11px] uppercase tracking-[0.18em] text-gray-400">
                <tr>
                  <th className="p-4">Customer</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Location</th>
                  <th className="p-4">Orders</th>
                  <th className="p-4">Tier</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {customerData.map((customer, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <Avatar src={`https://i.pravatar.cc/100?u=${index}`} alt={customer.name} />
                        <div>
                          <p className="font-semibold text-gray-900">{customer.name}</p>
                          <p className="text-[11px] text-gray-500">{customer.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-gray-600">{customer.email}</td>
                    <td className="p-4 text-gray-600">{customer.location}</td>
                    <td className="p-4 font-semibold text-gray-800">{customer.orders}</td>
                    <td className="p-4">
                      <Badge className={customer.tier === 'Premium' ? 'bg-[#D4E34A] text-black' : 'bg-gray-100 text-gray-700'}>
                        {customer.tier}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${customer.status === 'Active' ? 'bg-[#EAF9F1] text-[#48C58C]' : 'bg-[#FFF9E7] text-[#F9C344]'}`}>
                        {customer.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
