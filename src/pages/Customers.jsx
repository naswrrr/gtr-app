import React from 'react';

// A helper function to get initials for profile picture replacement
const getInitials = (name) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
};

export default function Customers() {
  const customerData = [
    {
      name: 'Devon Lane',
      email: 'chieko@mail.com',
      location: 'Philadelphia, USA',
      orders: 125,
      spent: '$101,345.00',
    },
    {
      name: 'Kathryn Murphy',
      email: 'rohan_anna@mail.com',
      location: 'Los Angeles, USA',
      orders: 11,
      spent: '$2,400.98',
    },
    {
      name: 'Eleanor Pena',
      email: 'pedrohuar@mail.com',
      location: 'Manhattan, USA',
      orders: 98,
      spent: '$56,987.00',
    },
    {
      name: 'Annette Black',
      email: 'eusebio234@mail.com',
      location: 'Toronto, CA',
      orders: 51,
      spent: '$12,567.90',
    },
    {
      name: 'Guy Hawkins',
      email: 'midgett245@mail.com',
      location: 'Pittsburgh, USA',
      orders: 12,
      spent: '$4,670.44',
    },
    {
      name: 'Floyd Miles',
      email: 'motgeoff@mail.com',
      location: 'Montreal, CA',
      orders: 56,
      spent: '$24,456.56',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Main Content Card - Rounded and shadowed like in image_4.png */}
      <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
        {/* Custom Table styling */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-navy">
            {/* Table Header with soft background */}
            <thead className="border-b border-gray-100 text-xs uppercase tracking-wider text-gray-400">
              <tr>
                <th className="p-4 w-10">
                   <input type="checkbox" className="accent-primary w-4 h-4 rounded border-gray-200" />
                </th>
                <th className="p-4 font-medium">
                    Customer name <span className="text-gray-300 ml-1 text-[10px]">⇅</span>
                </th>
                <th className="p-4 font-medium">
                    Email <span className="text-gray-300 ml-1 text-[10px]">⇅</span>
                </th>
                <th className="p-4 font-medium">
                    Location <span className="text-gray-300 ml-1 text-[10px]">⇅</span>
                </th>
                <th className="p-4 font-medium">
                    Orders <span className="text-gray-300 ml-1 text-[10px]">⇅</span>
                </th>
                <th className="p-4 font-medium">
                    Spent <span className="text-gray-300 ml-1 text-[10px]">⇅</span>
                </th>
                <th className="p-4 w-10"></th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {customerData.map((customer, index) => (
                <tr key={index} className="border-b border-gray-50 hover:bg-surface/50">
                  <td className="p-4">
                      <input type="checkbox" className="accent-primary w-4 h-4 rounded border-gray-200" />
                  </td>
                  <td className="p-4 font-medium">
                    <div className="flex items-center gap-3">
                      {/* Avatar placeholder with Navy background and Orange text from palette */}
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-navy text-primary text-sm font-bold border-2 border-white shadow-sm">
                        {getInitials(customer.name)}
                      </div>
                      <span className="text-base font-semibold">{customer.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-gray-600">{customer.email}</td>
                  <td className="p-4 text-gray-600">{customer.location}</td>
                  <td className="p-4 font-semibold text-gray-700">{customer.orders} orders</td>
                  <td className="p-4 font-bold text-base text-gray-900">{customer.spent}</td>
                  <td className="p-4">
                      <button className="text-gray-400 hover:text-navy text-xl">•••</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}