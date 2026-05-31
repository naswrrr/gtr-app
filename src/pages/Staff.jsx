import React from 'react';
import Card from '../components/Card';
import CardTitle from '../components/CardTitle';
import SummaryBar from '../components/SummaryBar';

const staffData = [
  { name: 'Martha Vale', metric: 92, role: 'Lead Technician' },
  { name: 'Owen Tyler', metric: 78, role: 'Service Advisor' },
  { name: 'Priya Singh', metric: 84, role: 'Parts Specialist' },
  { name: 'Lucas Reed', metric: 69, role: 'Mobile Mechanic' },
];

export default function Staff() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 space-y-6">
      <div className="mx-4 space-y-6">
        <Card>
          <CardTitle title="Staff Performance" actionLabel="Summary" />
          <div className="grid gap-6 xl:grid-cols-4">
            {staffData.map((staff) => (
              <Card key={staff.name} className="p-5 hover:-translate-y-1 transition-transform duration-200">
                <div className="mb-3 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-[0.18em]">{staff.role}</p>
                    <h3 className="mt-2 text-lg font-bold text-gray-900">{staff.name}</h3>
                  </div>
                  <span className="text-sm font-black text-[#D4E34A]">{staff.metric}%</span>
                </div>
                <SummaryBar height={staff.metric} label="Kinerja" />
              </Card>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
