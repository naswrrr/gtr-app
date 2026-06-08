import React from 'react';
import Card from '../components/Card';
import CardTitle from '../components/CardTitle';
import ChartCard from '../components/ChartCard';
import Badge from '../components/Badge';
import SummaryBar from '../components/SummaryBar';
import customerData from '../data/customersData.json';

export default function Analytics() {
  // 1. Hitung metrik segmentasi real-time dari customersData.json kamu
  const totalCust = customerData.length;
  const premiumCount = customerData.filter(c => c.tier === 'Premium').length;
  const activeCount = customerData.filter(c => c.status === 'Active').length;

  // Rumus persentase otomatis
  const premiumPercentage = Math.round((premiumCount / totalCust) * 100);
  const activePercentage = Math.round((activeCount / totalCust) * 100);

  return (
    <div className="min-h-screen bg-gray-50 p-4 space-y-6">
      <div className="mx-4 space-y-6">
        
        {/* Row 1: Angka Ringkasan Analytics */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm flex flex-col justify-between">
            <div>
              <p className="text-sm text-gray-400 font-medium">Total Terdaftar (Database)</p>
              <h2 className="mt-2 text-4xl font-black text-gray-900">{totalCust} <span className="text-xs font-normal text-gray-400">Users</span></h2>
            </div>
            <div className="mt-4">
              <Badge className="bg-[#D4E34A] text-black">Live Syncing</Badge>
            </div>
          </div>

          <Card className="p-5">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">CRM Retention</p>
                <h3 className="mt-1 text-base font-bold text-gray-900">Customer Active Rate</h3>
              </div>
              <span className="text-sm font-black text-[#A8B330]">{activePercentage}%</span>
            </div>
            <SummaryBar height={activePercentage} label="User Aktif" />
          </Card>

          <Card className="p-5">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Loyalty Program</p>
                <h3 className="mt-1 text-base font-bold text-gray-900">Premium Tier Share</h3>
              </div>
              <span className="text-sm font-black text-[#A8B330]">{premiumPercentage}%</span>
            </div>
            <SummaryBar height={premiumPercentage} label="Premium" />
          </Card>
        </div>

        {/* Row 2: Grafik Utama (Tren Orderan & Sumber Akuisisi) */}
        <div className="grid gap-6 lg:grid-cols-3">
          
          {/* Grafik Volume Orderan Bawaan Berhasil Diintegrasi */}
          <ChartCard className="lg:col-span-2">
            <div className="flex justify-between items-center mb-5">
              <div>
                <p className="text-xs text-gray-400 font-medium">Booking Analytics</p>
                <h3 className="text-xl font-bold text-gray-900">Weekly Order Volume</h3>
              </div>
              <Badge className="bg-[#D4E34A] text-black">Trend 2026</Badge>
            </div>
            <div className="h-56">
              <svg viewBox="0 0 400 130" className="w-full h-full">
                <path d="M0,110 Q60,80 120,95 T240,60 T320,40 T400,30" fill="none" stroke="#D4E34A" strokeWidth="4" />
                <path d="M0,125 Q60,95 120,110 T240,75 T320,55 T400,45" fill="none" stroke="#1A1C1E" strokeWidth="3" opacity="0.4" />
              </svg>
            </div>
          </ChartCard>

          {/* Bar Chart Asal Sumber Customer */}
          <Card className="p-6">
            <CardTitle title="Acquisition Channels" actionLabel="Source" />
            <p className="text-xs text-gray-500 -mt-2 mb-6">Darimana customer mengetahui keberadaan bengkel FixFlow.</p>
            
            <div className="flex justify-between items-end h-44 px-2 pt-4">
              <SummaryBar height={80} label="IG Ads" />
              <SummaryBar height={65} label="TikTok" />
              <SummaryBar height={45} label="G-Maps" />
              <SummaryBar height={30} label="Referral" />
            </div>
          </Card>

        </div>

      </div>
    </div>
  );
}