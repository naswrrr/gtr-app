import React from 'react';
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

export default function Home() {
  // --- LOGIC INTEGRASI CRM DATA ---
  
  // 1. Total data customer di database
  const totalCustomers = customerData.length;
  
  // 2. Hitung customer premium untuk status program loyalitas
  const premiumCount = customerData.filter(c => c.tier === 'Premium').length;
  
  // 3. Ambil servis terbaru secara dinamis dari data interaksi customer
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

  // Hitung jumlah kendaraan berdasarkan status keaktifan untuk counter real-time
  const totalServisMasuk = dynamicOrders.length;
  const kendaraanSelesai = dynamicOrders.filter(o => o.status === 'Selesai').length;

  // Membalik urutan agar orderan paling baru masuk di JSON berada di baris paling atas tabel
  const recentOrders = [...dynamicOrders].reverse().slice(0, 3);

  return (
    <div className="p-4 space-y-6">
      <div className="mx-4 space-y-6">
        
        {/* Row 1: StatCards - Terintegrasi Otomatis dengan JSON */}
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
          <Card className="lg:col-span-2 p-6">
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
            
            {/* DATA VISUALIZATION: SVG Line Chart */}
            <div className="h-48 w-full relative">
              <svg viewBox="0 0 400 100" className="w-full h-full">
                <path d="M0,60 Q50,40 100,70 T200,30 T300,80 T400,50" fill="none" stroke="#D4E34A" strokeWidth="2" />
                <path d="M0,80 Q50,60 100,90 T200,50 T300,95 T400,70" fill="none" stroke="#A8B330" strokeWidth="2" opacity="0.6" />
              </svg>
            </div>
          </Card>

          {/* IMPLEMENTASI CHARTCARD: Donut Chart Segmen CRM */}
          <ChartCard>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-sm text-gray-800">Bauran Membership</h3>
              <span className="text-[10px] text-gray-400 font-bold uppercase">2026 ∨</span>
            </div>
            <div className="relative flex justify-center items-center h-40">
              <div className="w-32 h-32 rounded-full border-[12px] border-[#D4E34A] border-r-[#A8B330] border-b-gray-50 relative flex items-center justify-center">
                <div className="text-center absolute">
                  <p className="text-[10px] text-gray-400 font-bold uppercase">Premium</p>
                  <p className="text-lg font-black text-gray-800">{Math.round((premiumCount/totalCustomers)*100)}%</p>
                </div>
              </div>
            </div>
            <Button className="w-full bg-[#A3B22C] text-white py-3 rounded-2xl font-bold text-sm shadow-lg active:scale-95 transition-all">
              Ekspor Data Member
            </Button>
          </ChartCard>
        </div>

        {/* Row 3: Table & Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Tabel Utama: Menampilkan log antrean terintegrasi dinamis */}
          <Card className="lg:col-span-2 overflow-hidden p-6">
            <div className="flex justify-between items-center mb-6 text-gray-300 font-bold">
              <h3 className="text-gray-800">Antrean Servis Pelanggan (CRM Live)</h3>
              <button className="text-xl text-gray-500">⋮</button>
            </div>
            <OrdersTable orders={recentOrders} />
          </Card>

          {/* Ringkasan Mingguan Aktivitas Masuk */}
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