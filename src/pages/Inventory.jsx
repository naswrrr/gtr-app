import React from 'react';
import StatCard from '../components/StatCard';
import Card from '../components/Card';
import CardTitle from '../components/CardTitle';
import Button from '../components/Button';

const inventoryItems = [
  { sku: 'F-132', name: 'Brake Pads', category: 'Spare Parts', qty: 45, status: 'In Stock' },
  { sku: 'R-210', name: 'Engine Oil', category: 'Lubricant', qty: 12, status: 'Low Stock' },
  { sku: 'T-501', name: 'Air Filter', category: 'Maintenance', qty: 80, status: 'In Stock' },
  { sku: 'L-314', name: 'LED Headlight', category: 'Lighting', qty: 8, status: 'Low Stock' },
];

export default function Inventory() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 space-y-6">
      <div className="mx-4 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <StatCard title="Total Stock" value="145" change="+ 3%" isUp={true} icon="📦" bars={[60, 90, 70, 80]} />
          <StatCard title="Low Stock Items" value="2" change="- 1%" isUp={false} icon="⚠️" bars={[20, 40, 30, 50]} />
          <StatCard title="Incoming Supply" value="28" change="+ 15%" isUp={true} icon="🚚" bars={[50, 70, 80, 90]} />
        </div>

        <Card>
          <CardTitle
            title="Inventory Items"
            actionElement={
              <Button className="bg-[#D4E34A] text-black px-4 py-2 hover:bg-[#c8d92b]">
                Add Stock
              </Button>
            }
          />
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-gray-100 text-[11px] uppercase tracking-[0.18em] text-gray-400">
                <tr>
                  <th className="p-4">SKU</th>
                  <th className="p-4">Item</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Qty</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-700">
                {inventoryItems.map((item) => (
                  <tr key={item.sku} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-4 font-bold text-gray-800">{item.sku}</td>
                    <td className="p-4">{item.name}</td>
                    <td className="p-4 text-gray-500">{item.category}</td>
                    <td className="p-4 font-semibold">{item.qty}</td>
                    <td className="p-4 text-sm font-bold">
                      <span className={`px-3 py-1 rounded-full ${item.status === 'In Stock' ? 'bg-[#EAF9F1] text-[#48C58C]' : 'bg-[#FFF9E7] text-[#F9C344]'}`}>
                        {item.status}
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
