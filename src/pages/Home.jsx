import React from 'react';
import StatCard from '../components/StatCard';
import OrdersTable from '../components/OrdersTable';
import Card from '../components/Card';
import Button from '../components/Button';
import Badge from '../components/Badge';
import ChartCard from '../components/ChartCard';
import CardTitle from '../components/CardTitle';
import SummaryBar from '../components/SummaryBar';

export default function Home() {
  const recentOrders = [
    { no: '01', name: 'Ganti Oli Shell', sub: 'Oli Mesin', date: 'March 24, 2022', time: '09.20 AM', status: 'Selesai', price: 'Rp 150.000', customer: 'Jenny Wilson', brand: 'Honda Jazz' },
    { no: '02', name: 'Service Rutin', sub: 'Paket Lengkap', date: 'March 24, 2022', time: '09.20 AM', status: 'Dikerjakan', price: 'Rp 450.000', customer: 'Devon Lane', brand: 'Toyota Avanza' },
  ];

  return (
    <div className="p-4 space-y-6">

      <div className="mx-4 space-y-6">
        {/* Row 1: StatCards 
        Menggunakan props (title, value, icon, bars) untuk menampilkan data berbeda 
        dengan satu komponen yang sama (Reusable)*/}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Pendapatan Baru"
            value="Rp 8.245.000"
            change="- 0,5%"
            isUp={false}
            icon="🪙"
            bars={[40, 70, 100, 60]}
          />
          <StatCard
            title="Total Servis"
            value="256"
            change="+ 1,0%"
            isUp={true}
            icon="🛒"
            bars={[30, 50, 40, 80]}
          />
          <StatCard
            title="Kendaraan Selesai"
            value="1,256"
            change="+ 1,0%"
            isUp={true}
            icon="🏷️"
            bars={[60, 30, 90, 70]}
          />
        </div>

        {/* Row 2: Sales & Report 
        Menerapkan Card sebagai Layout Wrapper dan Badge sebagai indikator tren*/}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-gray-400 text-xs font-medium">Total Penjualan Jasa & Part</p>
                <h3 className="text-2xl font-bold flex items-center gap-2">
                  Rp 56.345.980
                  <Badge className="bg-[#D4E34A] text-black px-2 py-1 rounded-full font-bold text-[10px]">↗ 23.5%</Badge>
                </h3>
              </div>
              <div className="flex items-center gap-4 text-[10px] font-bold">
                <Badge className="bg-[#D4E34A] text-black">Jasa</Badge>
                <Badge className="bg-[#A8B330] text-black">Sparepart</Badge>
                <Button className="border border-gray-100 rounded-lg px-3 py-1.5 flex items-center gap-2 text-gray-500 font-medium text-[10px]">
                  7 Bulan Terakhir <span className="text-[8px]">📅</span>
                </Button>
              </div>
            </div>
            {/* DATA VISUALIZATION: SVG Line Chart untuk performa penjualan */}
            <div className="h-48 w-full relative">
              <svg viewBox="0 0 400 100" className="w-full h-full">
                <path d="M0,60 Q50,40 100,70 T200,30 T300,80 T400,50" fill="none" stroke="#D4E34A" strokeWidth="2" />
                <path d="M0,80 Q50,60 100,90 T200,50 T300,95 T400,70" fill="none" stroke="#A8B330" strokeWidth="2" opacity="0.6" />
              </svg>
            </div>
          </Card>

          {/* IMPLEMENTASI CHARTCARD: Komponen khusus untuk visualisasi Donut Chart */}
          <ChartCard>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-gray-800">Laporan Bulanan</h3>
              <span className="text-[10px] text-gray-400 font-bold uppercase">Bulan ∨</span>
            </div>
            <div className="relative flex justify-center items-center h-40">
              {/* Manual Donut Chart menggunakan CSS Border styling */}
              <div className="w-32 h-32 rounded-full border-[12px] border-[#D4E34A] border-r-[#A8B330] border-b-gray-50 relative flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full border border-gray-200 shadow-sm flex items-center justify-center">
                  <div className="w-1 h-1 bg-black rounded-full"></div>
                </div>
              </div>
            </div>
            <Button className="w-full bg-[#A3B22C] text-white py-3 rounded-2xl font-bold text-sm shadow-lg active:scale-95 transition-all">
              Unduh Laporan
            </Button>
          </ChartCard>
        </div>

        {/* Row 3: Table & Summary 
        Menerapkan komponen OrdersTable untuk list data dan SummaryBar untuk grafik batang*/}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 overflow-hidden p-6">
            <div className="flex justify-between items-center mb-6 text-gray-300 font-bold">
              <h3 className="text-gray-800">Servis Terbaru</h3>
              <button className="text-xl">⋮</button>
            </div>
            {/* PROPS DRILLING: Mengirim data array recentOrders ke dalam komponen OrdersTable */}
            <OrdersTable orders={recentOrders} />
          </Card>

          <Card className="p-6">
            {/* IMPLEMENTASI CARDTITLE: Memisahkan bagian judul agar seragam di semua Card */}
            <CardTitle
              title="Ringkasan Mingguan"
              actionElement={
                <Button className="border border-gray-100 rounded-lg px-2 py-1 text-[8px] text-gray-500 font-bold">
                  7 Hari Terakhir 📅
                </Button>
              }
            />
            {/* LIST RENDERING: Menggunakan map() untuk merender SummaryBar secara berulang */}
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