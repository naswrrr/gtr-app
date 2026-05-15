import React from 'react';

export default function Home() {
  const recentOrders = [
    { no: '01', name: 'Shirt Creme', sub: '#A4064B', date: 'March 24, 2022', time: '09.20 AM', status: 'Received', price: '£130', customer: 'Jenny Wilson', brand: 'Branding' },
    { no: '02', name: 'Shirt Creme', sub: '#A4064B', date: 'March 24, 2022', time: '09.20 AM', status: 'Shipping', price: '£130', customer: 'Devon Lane', brand: 'Branding' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* New Net Income */}
        <StatCard 
          title="New Net Income" 
          value="£8,245.00" 
          change="- 0,5%" 
          isUp={false} 
          icon="🪙" 
          bars={[40, 70, 100, 60]} 
        />
        {/* Total Bookings */}
        <StatCard 
          title="Total Bookings" 
          value="256" 
          change="+ 1,0%" 
          isUp={true} 
          icon="🛒" 
          bars={[30, 50, 40, 80]} 
        />
        {/* Resolved Issues */}
        <StatCard 
          title="Resolved issues" 
          value="1,256" 
          change="+ 1,0%" 
          isUp={true} 
          icon="🏷️" 
          bars={[60, 30, 90, 70]} 
        />
      </div>

      {/* Middle Row: Overall Sales & Sales Report */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-[35px] p-8 shadow-sm">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-gray-400 text-xs font-medium">Overall sales</p>
              <h3 className="text-2xl font-bold flex items-center gap-2">
                £56,345.98 
                <span className="text-[10px] bg-[#D4E34A] px-2 py-1 rounded-full font-bold">↗ 23.5%</span>
              </h3>
            </div>
            <div className="flex items-center gap-4 text-[10px] font-bold">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#D4E34A]"></span> Organic</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#A8B330]"></span> Professional</span>
              <button className="border border-gray-100 rounded-lg px-3 py-1.5 flex items-center gap-2 text-gray-500 font-medium">
                Last 7 month <span className="text-[8px]">📅</span>
              </button>
            </div>
          </div>
          {/* Placeholder for Line Chart */}
          <div className="h-48 w-full relative">
            <svg viewBox="0 0 400 100" className="w-full h-full">
              <path d="M0,60 Q50,40 100,70 T200,30 T300,80 T400,50" fill="none" stroke="#D4E34A" strokeWidth="2" />
              <path d="M0,80 Q50,60 100,90 T200,50 T300,95 T400,70" fill="none" stroke="#A8B330" strokeWidth="2" opacity="0.6" />
            </svg>
          </div>
        </div>

        <div className="bg-white rounded-[35px] p-8 shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800">Sales Report</h3>
            <span className="text-[10px] text-gray-400 font-bold">Month ∨</span>
          </div>
          <div className="relative flex justify-center items-center h-40">
             {/* Circular Graphic Simulation */}
             <div className="w-32 h-32 rounded-full border-[12px] border-[#D4E34A] border-r-[#A8B330] border-b-gray-50 relative flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full border border-gray-200 shadow-sm flex items-center justify-center">
                  <div className="w-1 h-1 bg-black rounded-full"></div>
                </div>
             </div>
             <span className="absolute top-4 left-4 text-[10px] font-bold text-gray-400">47%</span>
             <span className="absolute top-4 right-4 text-[10px] font-bold text-gray-400">28%</span>
             <span className="absolute bottom-4 right-10 text-[10px] font-bold text-gray-400">18%</span>
          </div>
          <button className="w-full bg-[#A3B22C] text-white py-3 rounded-2xl font-bold text-sm shadow-lg shadow-[#a3b22c33] active:scale-95 transition-all">
            Deposit now
          </button>
        </div>
      </div>

      {/* Bottom Row: Table & Weekly Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-[35px] p-8 shadow-sm overflow-hidden">
          <div className="flex justify-between items-center mb-6 text-gray-300 font-bold">
            <h3 className="text-gray-800">Recent Order</h3>
            <button className="text-xl">⋮</button>
          </div>
          <table className="w-full text-left">
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
            <tbody className="text-xs">
              {recentOrders.map((order, idx) => (
                <tr key={idx} className="border-b border-gray-50 last:border-0 group">
                  <td className="py-4 text-gray-400 font-bold">{order.no}</td>
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gray-200 overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?u=${idx}`} alt="" />
                      </div>
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
                    <span className={`px-4 py-1.5 rounded-full font-bold text-[10px] ${
                      order.status === 'Received' ? 'bg-[#EAF9F1] text-[#48C58C]' : 'bg-[#FFF9E7] text-[#F9C344]'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 font-bold text-gray-800">{order.price}</td>
                  <td className="py-4">
                    <p className="font-bold text-gray-800">{order.customer}</p>
                    <p className="text-[10px] text-gray-400">{order.brand}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white rounded-[35px] p-8 shadow-sm">
          <div className="flex justify-between items-start mb-10">
            <h3 className="font-bold text-gray-800 max-w-[120px] leading-tight">Weekly Transaction Summary</h3>
            <button className="border border-gray-100 rounded-lg px-2 py-1 text-[8px] text-gray-500 font-bold">
              Last 7 month 📅
            </button>
          </div>
          <div className="flex justify-between items-end h-32 px-2">
            {[45, 80, 50, 40, 90, 60, 75].map((h, i) => (
              <div key={i} className="flex flex-col items-center gap-3">
                <div className="w-1.5 h-24 bg-gray-50 rounded-full relative overflow-hidden">
                  <div className="absolute bottom-0 w-full bg-[#D4E34A] rounded-full" style={{ height: `${h}%` }}></div>
                </div>
                <span className="text-[8px] text-gray-400 font-black uppercase">
                  {['24 Jan', '25 Jan', '26 Jan', '27 Jan', '28 Jan', '29 Jan', '30 Jan'][i]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Sub-component for Stats to keep it clean
function StatCard({ title, value, change, isUp, icon, bars }) {
  return (
    <div className="bg-white rounded-[35px] p-7 shadow-sm border border-transparent hover:border-gray-50 transition-all relative overflow-hidden">
      <div className="flex justify-between items-start mb-6">
        <div className="w-10 h-10 bg-[#F9FAFB] rounded-2xl flex items-center justify-center text-lg">{icon}</div>
        <span className="text-gray-300 text-xs">⋮</span>
      </div>
      <p className="text-gray-400 text-xs font-bold mb-1">{title}</p>
      <h4 className="text-2xl font-black text-gray-800 mb-2">{value}</h4>
      <div className="flex items-center gap-1.5">
        <span className={`text-[10px] font-black ${isUp ? 'text-[#D4E34A]' : 'text-[#A8B330]'}`}>
          {isUp ? '▲' : '▼'} {change}
        </span>
        <span className="text-[10px] text-gray-300 font-bold tracking-tight">from last week</span>
      </div>
      
      {/* Small Bar Graphic in corner */}
      <div className="absolute bottom-6 right-6 flex items-end gap-1 h-12">
        {bars.map((height, i) => (
          <div 
            key={i} 
            className="w-2 rounded-full bg-[#1A1C1E]" 
            style={{ height: `${height}%`, opacity: (i + 1) / 4 }}
          ></div>
        ))}
      </div>
    </div>
  );
}