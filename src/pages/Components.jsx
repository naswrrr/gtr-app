import React from 'react';
import StatCard from '../components/StatCard';
import Card from '../components/Card';
import CardTitle from '../components/CardTitle';
import OrdersTable from '../components/OrdersTable';
import Button from '../components/Button';
import Badge from '../components/Badge';
import StatusBadge from '../components/StatusBadge';
import Avatar from '../components/Avatar';
import ProgressBar from '../components/ProgressBar';
import IconWrapper from '../components/IconWrapper';
import SummaryBar from '../components/SummaryBar';
import ChartCard from '../components/ChartCard';

const ordersDemo = [
  { no: '01', name: 'Shirt Creme', sub: '#A4064B', date: 'May 22, 2026', time: '09.20 AM', status: 'Received', price: '£130', customer: 'Jenny Wilson', brand: 'Branding' },
  { no: '02', name: 'Shirt Noir', sub: '#213F57', date: 'May 23, 2026', time: '10.15 AM', status: 'Shipping', price: '£210', customer: 'Devon Lane', brand: 'Creative' },
  { no: '03', name: 'Sneaker Jet', sub: '#A8B330', date: 'May 24, 2026', time: '11.05 AM', status: 'Pending', price: '£98', customer: 'Esther Howard', brand: 'Urban' },
];

const statusItems = [
  { label: 'Selesai', status: 'Selesai' },
  { label: 'Dikerjakan', status: 'Dikerjakan' },
  { label: 'Menunggu', status: 'Menunggu' },
];

const progressValues = [30, 75, 100];
const summaryValues = [30, 65, 90];

export default function Components() {
  return (
    /* Menggunakan p-4 dan bg-gray-50 agar konsisten dengan layout utama */
    <div className="min-h-screen bg-gray-50 p-4 space-y-6">
      
      {/* Menggunakan mx-4 agar margin samping kiri-kanan sama dengan Home.jsx */}
      <div className="mx-4 space-y-6">
        
        {/* Header Section */}
        <div className="mb-8 rounded-[2rem] border border-gray-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#A8B330]">FixFlow UI Kit</p>
              <h1 className="mt-2 text-3xl font-black text-[#1A1C1E]">Komponen React Dashboard</h1>
              <p className="mt-2 max-w-2xl text-sm text-gray-600">
                Katalog komponen FixFlow menampilkan semua variasi utama dalam satu halaman. Cocok untuk dokumentasi internal dan presentasi desain.
              </p>
            </div>
            <Button className="bg-[#D4E34A] text-black px-5 py-3 shadow-lg shadow-[#d4e34a55] hover:bg-[#c8d92b]">
              Explore Components
            </Button>
          </div>
        </div>

        {/* Grid Components Area */}
        <div className="grid gap-6 xl:grid-cols-2">
          
          {/* StatCard Gallery */}
          <Card className="hover:-translate-y-1 transition-transform duration-200 p-6">
            <CardTitle title="StatCard" actionLabel="Variasi" />
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-3">
                <p className="text-[11px] uppercase tracking-[0.18em] text-gray-400">Variant: Income Down</p>
                <StatCard title="New Net Income" value="£8,245.00" change="- 0,5%" isUp={false} icon="🪙" bars={[40, 70, 100, 60]} />
              </div>
              <div className="space-y-3">
                <p className="text-[11px] uppercase tracking-[0.18em] text-gray-400">Variant: Bookings Up</p>
                <StatCard title="Total Bookings" value="256" change="+ 1,0%" isUp={true} icon="🛒" bars={[30, 50, 40, 80]} />
              </div>
              <div className="space-y-3">
                <p className="text-[11px] uppercase tracking-[0.18em] text-gray-400">Variant: Issues Resolved</p>
                <StatCard title="Resolved issues" value="1,256" change="+ 1,0%" isUp={true} icon="🏷️" bars={[60, 30, 90, 70]} />
              </div>
            </div>
          </Card>

          {/* Chart Preview */}
          <Card className="hover:-translate-y-1 transition-transform duration-200 p-6">
            <CardTitle title="ChartCard" actionLabel="Demo" />
            <ChartCard>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-xs text-gray-400">Trend Penjualan</p>
                  <h2 className="text-xl font-bold text-gray-900">Sales Report</h2>
                </div>
                <Badge className="bg-[#D4E34A] text-black">Live</Badge>
              </div>
              <div className="relative flex h-48 items-center justify-center rounded-[2rem] border border-gray-100 bg-gray-50">
                <div className="h-full w-full">
                  <svg viewBox="0 0 400 120" className="h-full w-full">
                    <path d="M0,85 Q80,40 160,68 T320,36 T400,48" fill="none" stroke="#D4E34A" strokeWidth="4" />
                    <path d="M0,98 Q80,65 160,90 T320,58 T400,70" fill="none" stroke="#1A1C1E" strokeWidth="3" opacity="0.55" />
                  </svg>
                </div>
              </div>
            </ChartCard>
          </Card>

          {/* Button Gallery */}
          <Card className="hover:-translate-y-1 transition-transform duration-200 p-6">
            <CardTitle title="Button" actionLabel="Tombol" />
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <p className="text-[11px] uppercase tracking-[0.18em] text-gray-400">Primary</p>
                <Button className="bg-[#1A1C1E] text-white px-4 py-3 hover:bg-[#111314] w-full">Primary</Button>
              </div>
              <div className="space-y-2">
                <p className="text-[11px] uppercase tracking-[0.18em] text-gray-400">Accent</p>
                <Button className="bg-[#D4E34A] text-black px-4 py-3 hover:bg-[#c8d92b] w-full">Accent</Button>
              </div>
              <div className="space-y-2">
                <p className="text-[11px] uppercase tracking-[0.18em] text-gray-400">Outline</p>
                <Button className="border border-gray-200 bg-white text-gray-900 px-4 py-3 hover:border-gray-300 w-full">Outline</Button>
              </div>
            </div>
          </Card>

          {/* Badge & Avatar Section */}
          <Card className="hover:-translate-y-1 transition-transform duration-200 p-6">
            <CardTitle title="Badge & Avatar" actionLabel="UI Elements" />
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="flex gap-2 flex-wrap">
                <Badge className="bg-[#D4E34A] text-black">Success</Badge>
                <Badge className="bg-black text-white">Dark</Badge>
                <Badge className="bg-gray-100 text-gray-700">Neutral</Badge>
              </div>
              <div className="flex -space-x-4">
                <Avatar src="https://i.pravatar.cc/100?img=32" alt="1" />
                <Avatar src="https://i.pravatar.cc/100?img=12" alt="2" />
                <Avatar src="https://i.pravatar.cc/100?img=48" alt="3" />
              </div>
            </div>
          </Card>

          {/* Progress & Status */}
          <Card className="hover:-translate-y-1 transition-transform duration-200 p-6">
            <CardTitle title="Progress & Status" actionLabel="Feedback" />
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                {statusItems.map((item) => (
                  <div key={item.status} className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{item.label}</span>
                    <StatusBadge status={item.status} />
                  </div>
                ))}
              </div>
              <div className="flex gap-2 items-end justify-around">
                {progressValues.map((value) => (
                  <div key={value} className="h-24 w-8 bg-gray-100 rounded-full flex items-end">
                    <ProgressBar height={value} opacity={1} />
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Icon & Summary Bar */}
          <Card className="hover:-translate-y-1 transition-transform duration-200 p-6">
            <CardTitle title="Visual Summary" actionLabel="Analytics" />
            <div className="flex justify-between items-end h-32 px-2">
              {summaryValues.map((value, i) => (
                <SummaryBar key={i} height={value} label={`W${i+1}`} />
              ))}
              <IconWrapper>🪙</IconWrapper>
              <IconWrapper>⚙️</IconWrapper>
            </div>
          </Card>

          {/* Full Width Table */}
          <Card className="col-span-1 xl:col-span-2 hover:-translate-y-1 transition-transform duration-200 p-6">
            <CardTitle title="OrdersTable" actionLabel="Data Live" />
            <div className="overflow-x-auto mt-4">
              <OrdersTable orders={ordersDemo} />
            </div>
          </Card>

        </div>
      </div>
    </div>
  );
}