import React from 'react';
import Card from '../components/Card';
import CardTitle from '../components/CardTitle';
import StatusBadge from '../components/StatusBadge';
import ProgressBar from '../components/ProgressBar';

const repairTasks = [
  { name: 'Engine Rebuild', progress: 72, status: 'Received' },
  { name: 'Brake System Overhaul', progress: 34, status: 'Shipping' },
  { name: 'Tire Replacement', progress: 88, status: 'Received' },
  { name: 'Electrical Diagnosis', progress: 55, status: 'Shipping' },
];

export default function RepairTracker() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 space-y-6">
      <div className="mx-4 space-y-6">
        <Card>
          <CardTitle title="Repair Tracker" actionLabel="Progress" />
          <div className="grid gap-6">
            {repairTasks.map((task) => (
              <div key={task.name} className="rounded-[2rem] border border-gray-100 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-gray-400">Task</p>
                    <h3 className="text-xl font-bold text-gray-900">{task.name}</h3>
                  </div>
                  <StatusBadge status={task.status} />
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1 rounded-full bg-gray-100 h-4 overflow-hidden">
                    <div className="h-full bg-[#D4E34A]" style={{ width: `${task.progress}%` }} />
                  </div>
                  <span className="text-xs font-bold text-gray-600">{task.progress}%</span>
                </div>
                <div className="mt-4 flex items-end gap-4">
                  <div className="flex items-center gap-3">
                    <ProgressBar height={task.progress} opacity={0.9} />
                    <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400">Load</span>
                  </div>
                  <p className="text-[11px] text-gray-500">Perkiraan selesai dalam 2 hari</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
