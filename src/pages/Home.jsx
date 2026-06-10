import React from 'react';

// 📦 Integrasi Database JSON CRM 
import customerData from '../data/customersData.json';

// 🛠️ Import Komponen UI Pendukung
import OrdersTable from '../components/OrdersTable';
import Card from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';
import CardTitle from '../components/CardTitle';
import SummaryBar from '../components/SummaryBar';
import ChartCard from '../components/ChartCard';
import StatCard from '../components/StatCard'; 

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
  const premiumPercentage = totalCustomers > 0 ? Math.round((premiumCount / totalCustomers) * 100) : 0;

  // --- 📊 CONFIG & DATA RESERVED FOR SHADCN AREA CHART REVENUE ---
  const revenueData = [
    { month: "Jan", revenue: 42000000 },
    { month: "Feb", revenue: 45000000 },
    { month: "Mar", revenue: 48000000 },
    { month: "Apr", revenue: 51000000 },
    { month: "Mei", revenue: 53000000 },
    { month: "Jun", revenue: 56345980 },
  ];

  const revenueChartConfig = {
    revenue: {
      label: "Revenue",
      color: "#D4E34A",
    },
  };

  // --- 🍩 CONFIG & DATA RESERVED FOR SHADCN DONUT CHART MEMBERSHIP ---
  const membershipData = [
    { tier: "premium", count: premiumCount, fill: "var(--color-premium)" },
    { tier: "regular", count: regularCount, fill: "var(--color-regular)" },
  ];

  const membershipChartConfig = {
    premium: {
      label: "Premium",
      color: "#D4E34A",
    },
    regular: {
      label: "Regular",
      color: "#A8B330",
    },
  };

  return (
    <div className="p-4 space-y-6">
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

        {/* Row 2: Sales & Report (Aman dari Error Chart) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 p-6 flex flex-col justify-between min-h-[256px]">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-gray-400 text-xs font-medium">Estimasi Revenue Growth CRM (2026)</p>
                <h3 className="text-2xl font-bold flex items-center gap-2">
                  Rp 56.345.980
                  <Badge className="bg-[#D4E34A] text-black px-2 py-1 rounded-full font-bold text-[10px]">↗ 23.5%</Badge>
                </h3>
              </div>
              <div className="flex items-center gap-4 text-[10px] font-bold">
                <Badge className="bg-[#D4E34A] text-black">Retention</Badge>
                <Badge className="bg-[#A8B330] text-black">Acquisition</Badge>
                <Button className="border border-gray-100 rounded-lg px-3 py-1.5 flex items-center gap-2 text-gray-500 font-medium text-[10px]">
                  Periode 2026 <span className="text-[8px]">📅</span>
                </Button>
              </div>
            </div>

            {/* PLACEHOLDER REVENUE CHART AMAN */}
            <div className="h-40 w-full flex items-center justify-center bg-gray-50 rounded-xl border border-dashed border-gray-200">
              <span className="text-xs text-gray-400 font-medium tracking-wide">Grafik Pendapatan (Standby)</span>
            </div>
          </Card>

          {/* ChartCard Membership */}
          <ChartCard>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-sm text-gray-800">Bauran Membership</h3>
              <span className="text-[10px] text-gray-400 font-bold uppercase">2026 ∨</span>
            </div>
            
            {/* PLACEHOLDER DONUT CHART AMAN */}
            <div className="h-28 w-full flex items-center justify-center bg-gray-50 rounded-xl border border-dashed border-gray-200 mb-2">
              <div className="text-center">
                <span className="block text-lg font-black text-gray-700">{premiumPercentage}%</span>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Premium Member</span>
              </div>
            </div>

            {/* Legenda Warna */}
            <div className="flex justify-center gap-4 text-[10px] font-semibold mb-4 mt-2">
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#D4E34A]" /> Premium ({premiumCount})
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#A8B330]" /> Regular ({regularCount})
              </div>
            </div>

            <Button className="w-full bg-[#A3B22C] text-white py-3 rounded-2xl font-bold text-sm shadow-lg active:scale-95 transition-all">
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