import React from 'react';
import Card from '../components/Card';
import CardTitle from '../components/CardTitle';
import ChartCard from '../components/ChartCard';
import Badge from '../components/Badge';

const bookingTrend = [20, 35, 55, 70, 65, 80, 95];

export default function Bookings() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 space-y-6">
      <div className="mx-4 space-y-6">
        <Card>
          <CardTitle title="Bookings" actionLabel="Chart" />
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm">
              <p className="text-sm text-gray-400">Current week</p>
              <h2 className="mt-2 text-3xl font-black text-gray-900">254</h2>
              <Badge className="bg-[#D4E34A] text-black">+18% vs last week</Badge>
            </div>
            <ChartCard className="lg:col-span-2">
              <div className="flex justify-between items-center mb-5">
                <div>
                  <p className="text-xs text-gray-400">Booking Trend</p>
                  <h3 className="text-2xl font-bold text-gray-900">Order Volume</h3>
                </div>
                <Badge className="bg-[#D4E34A] text-black">Weekly</Badge>
              </div>
              <div className="h-64">
                <svg viewBox="0 0 400 140" className="w-full h-full">
                  <path d="M0,120 Q60,90 120,100 T240,70 T320,45 T400,38" fill="none" stroke="#D4E34A" strokeWidth="4" />
                  <path d="M0,130 Q60,100 120,110 T240,80 T320,60 T400,50" fill="none" stroke="#1A1C1E" strokeWidth="3" opacity="0.5" />
                </svg>
              </div>
            </ChartCard>
          </div>
        </Card>
      </div>
    </div>
  );
}
