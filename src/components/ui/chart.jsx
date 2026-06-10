import React, { useState } from 'react';
import StatCard from '../components/StatCard';
import OrdersTable from '../components/OrdersTable';
import Card from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';
import ChartCard from '../components/ChartCard';
import CardTitle from '../components/CardTitle';
import SummaryBar from '../components/SummaryBar';

// Integrasi database JSON CRM 
import customerData from '../data/customersData.json';

// 📊 Import komponen Chart dari shadcn UI milikmu (sesuai struktur folder ui/chart.jsx)
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Cell, Pie, PieChart } from 'recharts';

// ⚙️ Konfigurasi Tema Warna untuk mengaitkan data dengan css variable di chart.jsx
const chartConfig = {
  premium: { label: "Premium Tier", color: "#D4E34A" },
  regular: { label: "Regular Tier", color: "#A8B330" },
};

export default function Home() {
  // --- LOGIC INTEGRASI CRM DATA ---
  const totalCustomers = customerData.length;
  const premiumCount = customerData.filter(c => c.tier === 'Premium').length;
  const regularCount = customerData.filter(c => c.tier === 'Regular').length;
  
  const dynamicOrders = [];
  customerData.forEach((customer) => {
    if (customer.interactions && customer.interactions.length > 0) {
      customer.interactions.forEach((interact) => {
        dynamicOrders.push({
          no: `0${dynamicOrders.length + 1}`.slice(-2),
          name: interact.type === 'Complaint' ? 'Perbaikan Keluhan' : 'Service Berkala',
          sub: interact.type,
          date: interact.date,
          time: '09.00 AM',
          status: customer.status === 'Active' ? 'Selesai' : 'Menunggu',
          price: interact.type === 'Complaint' ? 'Rp 0 (Garansi)' : 'Rp 350.000',
          customer: customer.name,
          brand: customer.vehicle || 'Motor'
        });
      });
    }
  });

  const totalServisMasuk = dynamicOrders.length;
  const kendaraanSelesai = dynamicOrders.filter(o => o.status === 'Selesai').length;
  const recentOrders = [...dynamicOrders].reverse().slice(0, 3);

  // 📈 Data pertumbuhan revenue bulanan
  const revenueData = [
    { month: "Jan", retention: 3500000, acquisition: 1500000, cx: 30, cy: 70 },
    { month: "Feb", retention: 5000000, acquisition: 3000000, cx: 100, cy: 50 },
    { month: "Mar", retention: 4500000, acquisition: 6000000, cx: 170, cy: 55 },
    { month: "Apr", retention: 7000000, acquisition: 4500000, cx: 240, cy: 30 },
    { month: "Mei", retention: 8500000, acquisition: 5000000, cx: 310, cy: 15 },
    { month: "Jun", retention: 9000000, acquisition: 7500000, cx: 380, cy: 10 },
  ];

  // 🎯 State untuk menangani interaksi HOVER (Mirip Tooltip Shadcn)
  const [hoveredData, setHoveredData] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e, data) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setHoveredData(data);
    setMousePos({
      x: e.clientX - rect.left + 15, // posisi pop-up di kanan kursor
      y: e.clientY - rect.top - 40,  // posisi pop-up di atas kursor
    });
  };

  return (
    <div className="p-4 space-y-6 text-gray-800">
      <div className="mx-4 space-y-6">
        
        {/* Row 1: StatCards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Total Database CRM"
            value={`${totalCustomers} User`}
            change="+ 100%"
            isUp={true}
            icon="👥"
            bars={[30, 50, 80, 100]}
          />
          <StatCard
            title="Total Servis Masuk"
            value={`${totalServisMasuk} Order`}
            change="+ 14.2%"
            isUp={true}
            icon="🛒"
            bars={[40, 60, 75, 90]}
          />
          <StatCard
            title="Kendaraan Selesai"
            value={`${kendaraanSelesai} Unit`}
            change="+ 2,1%"
            isUp={true}
            icon="🏷️"
            bars={[60, 40, 90, 95]}
          />
        </div>

        {/* Row 2: Sales & Report */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* AREA CHART CUSTOM: 100% INTERAKTIF TANPA RECHARTS */}
          <Card className="lg:col-span-2 p-6 flex flex-col justify-between relative select-none">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-gray-400 text-xs font-medium">Estimasi Revenue Growth CRM (2026)</p>
                <h3 className="text-2xl font-bold flex items-center gap-2">
                  Rp 56.345.980
                  <Badge className="bg-[#D4E34A] text-black px-2 py-1 rounded-full font-bold text-[10px]">↗ 23.5%</Badge>
                </h3>
              </div>
              <div className="flex items-center gap-2 text-[10px] font-bold">
                <Badge className="bg-[#D4E34A] text-black">Retention</Badge>
                <Badge className="bg-[#A8B330] text-black">Acquisition</Badge>
              </div>
            </div>
            
            {/* Tempat Grafik SVG Berada */}
            <div className="h-56 w-full mt-2 relative border-b border-gray-100">
              <svg viewBox="0 0 400 100" className="w-full h-full overflow-visible">
                {/* Garis Bantu Horizontal */}
                <line x1="0" y1="25" x2="400" y2="25" stroke="#f3f4f6" strokeWidth="0.5" />
                <line x1="0" y1="50" x2="400" y2="50" stroke="#f3f4f6" strokeWidth="0.5" />
                <line x1="0" y1="75" x2="400" y2="75" stroke="#f3f4f6" strokeWidth="0.5" />

                {/* Isian Area Grafik (Gradient Fill) */}
                <path d="M30,70 L100,50 L170,55 L240,30 L310,15 L380,10 L380,100 L30,100 Z" fill="url(#nativeRetentionGrad)" opacity="0.15" />
                
                {/* Garis Utama Grafik */}
                <path d="M30,70 L100,50 L170,55 L240,30 L310,15 L380,10" fill="none" stroke="#D4E34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                
                {/* Titik Jangkar Sensor (Bisa Dihover) */}
                {revenueData.map((d, i) => (
                  <circle
                    key={i}
                    cx={d.cx}
                    cy={d.cy}
                    r={hoveredData?.month === d.month ? "6" : "4"}
                    fill={hoveredData?.month === d.month ? "#fff" : "#D4E34A"}
                    stroke="#A8B330"
                    strokeWidth="2"
                    className="cursor-pointer transition-all duration-150"
                    onMouseMove={(e) => handleMouseMove(e, d)}
                    onMouseLeave={() => setHoveredData(null)}
                  />
                ))}

                {/* Teks Bulan di Sumbu X */}
                {revenueData.map((d, i) => (
                  <text key={i} x={d.cx} y="95" fill="#9ca3af" fontSize="7" textAnchor="middle" className="font-medium">
                    {d.month}
                  </text>
                ))}

                <defs>
                  <linearGradient id="nativeRetentionGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D4E34A" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#D4E34A" stopOpacity={0}/>
                  </linearGradient>
                </defs>
              </svg>

              {/* 🔥 KARTU TOOLTIP MELAYANG ALA SHADCN UI YANG AKAN MUNCUL SAAT DIHOVER */}
              {hoveredData && (
                <div 
                  className="absolute pointer-events-none bg-white border border-gray-200 rounded-xl p-3 shadow-xl text-[11px] min-w-[140px] z-50 flex flex-col gap-1 transition-all duration-75 ease-out"
                  style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }}
                >
                  <p className="font-bold text-gray-400 mb-1">{hoveredData.month}, 2026</p>
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex items-center gap-1.5 text-gray-600">
                      <span className="w-2 h-2 rounded-full bg-[#D4E34A]"></span>
                      Retention:
                    </span>
                    <span className="font-mono font-bold text-gray-900">Rp {(hoveredData.retention).toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex items-center gap-1.5 text-gray-600">
                      <span className="w-2 h-2 rounded-full bg-[#A8B330]"></span>
                      Acquisition:
                    </span>
                    <span className="font-mono font-bold text-gray-900">Rp {(hoveredData.acquisition).toLocaleString('id-ID')}</span>
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* DONUT CHART SEGMENTATION - INTEGRASI DENGAN chart.jsx */}
          <ChartCard>
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-bold text-sm text-gray-800">Bauran Membership</h3>
              <span className="text-[10px] text-gray-400 font-bold uppercase">2026 ∨</span>
            </div>
            
            <div className="relative flex justify-center items-center h-44">
              {/* Menggunakan ChartContainer & ChartTooltip yang di-import dari file chart.jsx kamu */}
              <ChartContainer config={chartConfig} className="h-full w-full max-w-[160px]">
                <PieChart>
                  <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                  <Pie
                    data={[
                      { name: "Premium", value: premiumCount, fill: "var(--color-premium)" },
                      { name: "Regular", value: regularCount, fill: "var(--color-regular)" },
                    ]}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={45}
                    outerRadius={65}
                    strokeWidth={4}
                  >
                    <Cell fill="var(--color-premium)" />
                    <Cell fill="var(--color-regular)" />
                  </Pie>
                </PieChart>
              </ChartContainer>

              {/* Teks Persentase Tengah Donut (Tetap berada di tengah secara absolut) */}
              <div className="absolute text-center pointer-events-none flex flex-col items-center justify-center">
                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">Premium</p>
                <p className="text-2xl font-black text-gray-800">
                  {totalCustomers > 0 ? Math.round((premiumCount / totalCustomers) * 100) : 0}%
                </p>
              </div>
            </div>

            <Button className="w-full bg-[#A3B22C] text-white py-3 rounded-2xl font-bold text-sm shadow-lg hover:bg-[#8F9E24] active:scale-95 transition-all">
              Ekspor Data Member
            </Button>
          </ChartCard>
        </div>

        {/* Row 3: Table & Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 overflow-hidden p-6">
            <div className="flex justify-between items-center mb-6 text-gray-300 font-bold">
              <h3 className="text-gray-800">Antrean Servis Pelanggan (CRM Live)</h3>
              <button className="text-xl text-gray-500">⋮</button>
            </div>
            <OrdersTable orders={recentOrders} />
          </Card>

          <Card className="p-6">
            <CardTitle
              title="Traffic Interaksi"
              actionElement={
                <Button className="border border-gray-100 rounded-lg px-2 py-1 text-[8px] text-gray-500 font-bold">
                  7 Hari Terakhir 📅
                </Button>
              }
            />
            <div className="flex justify-between items-end h-32 px-2">
              {[45, 80, 50, 40, 90, 60, 75].map((h, i) => (
                <SummaryBar
                  key={i}
                  height={h}
                  label={['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'][i]}
                />
              ))}
            </div>
          </Card>
        </div>

      </div>
    </div>
  );
}