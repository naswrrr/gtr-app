import React from 'react';
import { useCustomer } from '../../context/CustomerContext';
import { 
  Wrench, CheckCircle, Clock, User, ShieldAlert,
  ArrowRight, ShieldCheck, HelpCircle, Activity 
} from 'lucide-react';
import { toast } from 'sonner';

export default function Tracking() {
  const { currentCustomer, bookings, updateBookingStatus } = useCustomer();

  if (!currentCustomer) {
    return (
      <div className="bg-white rounded-3xl p-12 border border-slate-100 shadow-sm text-center">
        <p className="text-xs text-slate-400">Loading data customer...</p>
      </div>
    );
  }

  // Get active booking (default to first active or create dummy for preview)
  const activeBooking = bookings[0] || {
    id: 'BKG-876122',
    vehicle: currentCustomer.vehicle,
    services: ['Service Berkala', 'Ganti Oli Premium'],
    date: new Date().toISOString().split('T')[0],
    time: '10.00 AM',
    status: 'Sedang Dikerjakan',
    progress: 40,
    mechanicName: 'Andi Wijaya (Senior Engine Master)',
    costEst: 'Rp 600.000',
    durationEst: '120 Menit'
  };

  const statusSteps = [
    { name: 'Booking Diterima', pct: 20, desc: 'Pemesanan servis terjadwal di sistem FixFlow.', icon: '📥' },
    { name: 'Sedang Dikerjakan', pct: 40, desc: 'Kendaraan dalam proses pembongkaran & inspeksi mekanik.', icon: '🔧' },
    { name: 'Menunggu Sparepart', pct: 60, desc: 'Pemasangan suku cadang baru sedang dalam antrean logistik.', icon: '📦' },
    { name: 'Quality Check', pct: 80, desc: 'Pengujian performa & sterilisasi kabin oleh chief mekanik.', icon: '🔍' },
    { name: 'Selesai', pct: 100, desc: 'Kendaraan selesai diservis & siap diambil/diserahterimakan.', icon: '✅' }
  ];

  const currentStepIdx = statusSteps.findIndex(s => s.name === activeBooking.status);
  const activeStep = statusSteps[currentStepIdx !== -1 ? currentStepIdx : 0];

  const handleSimulateStatus = (statusName, percentage) => {
    if (bookings.length === 0) {
      toast.info("Membuat simulasi booking baru untuk dilacak.");
      updateBookingStatus('BKG-876122', statusName, percentage);
    } else {
      updateBookingStatus(activeBooking.id, statusName, percentage);
    }
    toast.success(`Status servis diubah ke: "${statusName}" (${percentage}%)`);
  };

  return (
    <div className="space-y-6 text-left max-w-4xl mx-auto">
      
      {/* HEADER PAGE */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight my-0">Lacak Status Servis</h1>
        <p className="text-xs text-slate-400 mt-1">Status pengerjaan fisik bengkel disinkronisasikan secara real-time ke HP Anda.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left main tracking container */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Tracking Card Header */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
            
            {/* Meta row */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-100 pb-4 gap-3">
              <div>
                <span className="text-[9px] text-[#A8B330] font-black uppercase tracking-wider block">ID Booking Servis</span>
                <span className="text-base font-black text-slate-950">{activeBooking.id}</span>
              </div>
              <div className="sm:text-right">
                <span className="text-[9px] text-slate-400 font-bold uppercase block">Kendaraan Terdaftar</span>
                <span className="text-xs font-bold text-slate-800 leading-tight">{activeBooking.vehicle}</span>
              </div>
            </div>

            {/* Live progress details */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-[9px] text-slate-400 font-bold uppercase block">Layanan Dipesan</span>
                <span className="font-bold text-slate-900 leading-relaxed">
                  {Array.isArray(activeBooking.services) ? activeBooking.services.join(', ') : activeBooking.services}
                </span>
              </div>
              <div>
                <span className="text-[9px] text-slate-400 font-bold uppercase block">Jadwal Kedatangan</span>
                <span className="font-bold text-slate-900">{activeBooking.date} • {activeBooking.time}</span>
              </div>
            </div>

            {/* Dynamic Progress Bar */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between items-center text-[10px] font-bold">
                <span className="text-slate-400 uppercase">Progres Servis</span>
                <span className="text-slate-950 font-black">{activeBooking.progress}%</span>
              </div>
              <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                <div 
                  className="bg-[#D4E34A] h-full rounded-full transition-all duration-500 shadow-sm"
                  style={{ width: `${activeBooking.progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Timeline Steps Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-6">
            <h3 className="font-black text-slate-900 text-sm border-b border-slate-100 pb-3 flex items-center gap-2">
              <Activity className="w-4.5 h-4.5 text-slate-400" />
              <span>Timeline Pengerjaan</span>
            </h3>

            {/* Vertical timeline items */}
            <div className="relative border-l border-slate-200 ml-4 pl-8 space-y-6">
              {statusSteps.map((step, idx) => {
                const isCompleted = activeBooking.progress >= step.pct;
                const isCurrent = activeBooking.status === step.name;
                
                return (
                  <div key={idx} className="relative text-left">
                    {/* Circle marker */}
                    <div className={`absolute -left-[45px] top-0.5 w-8 h-8 rounded-full border-4 border-white flex items-center justify-center text-xs shadow-sm z-10 transition-all ${
                      isCurrent 
                        ? 'bg-slate-950 scale-110 shadow-md ring-4 ring-[#D4E34A]/30' 
                        : isCompleted 
                          ? 'bg-[#D4E34A]' 
                          : 'bg-slate-100 text-slate-400'
                    }`}>
                      {step.icon}
                    </div>

                    <div className="space-y-1">
                      <h4 className={`text-xs font-black transition-colors ${
                        isCurrent ? 'text-slate-950 text-sm' : isCompleted ? 'text-slate-900' : 'text-slate-400'
                      }`}>
                        {step.name}
                        {isCurrent && (
                          <span className="ml-2 text-[9px] bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-black uppercase tracking-wider animate-pulse">
                            Sedang Berlangsung
                          </span>
                        )}
                      </h4>
                      <p className={`text-[11px] leading-relaxed transition-colors ${
                        isCompleted ? 'text-slate-500 font-medium' : 'text-slate-400'
                      }`}>
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right side status detail box */}
        <div className="space-y-6">
          
          {/* Mechanic Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4 text-left">
            <h3 className="font-black text-slate-900 text-xs uppercase tracking-widest border-b border-slate-100 pb-3">Mekanik Penanggung Jawab</h3>
            
            <div className="flex gap-3 items-center">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black text-sm shrink-0">
                AW
              </div>
              <div className="text-xs leading-normal">
                <h4 className="font-bold text-slate-900">{activeBooking.mechanicName.split(' (')[0]}</h4>
                <p className="text-[10px] text-[#A8B330] font-black uppercase tracking-wider mt-0.5">Senior Engine Master</p>
                <span className="inline-block bg-slate-50 border border-slate-150 rounded text-[9px] px-1.5 py-0.5 mt-1 font-semibold text-slate-500">
                  ID Teknisi: MEC-401
                </span>
              </div>
            </div>
            
            <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 text-[10px] text-slate-500 leading-relaxed flex items-start gap-2">
              <Clock className="w-4.5 h-4.5 text-slate-400 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-slate-700">Estimasi Selesai:</div>
                <p className="mt-0.5">Hari ini pukul {activeBooking.time.split(' ')[0]} + {activeBooking.durationEst || '120'} pengerjaan.</p>
              </div>
            </div>
          </div>

          {/* SIMULATION DASHBOARD CONTROL FOR DEVELOPERS */}
          <div className="bg-amber-50 border border-amber-100 rounded-3xl p-6 text-left space-y-4">
            <div className="flex items-center gap-1.5 text-amber-800">
              <span className="text-base">🛠️</span>
              <h3 className="font-black text-xs uppercase tracking-wider my-0">Simulasi Status CRM</h3>
            </div>
            
            <p className="text-[11px] text-amber-700 leading-normal">
              Ubah status pengerjaan kendaraan di bawah ini untuk mensimulasikan sistem tracking terintegrasi dan WhatsApp Alerts.
            </p>

            <div className="grid grid-cols-1 gap-2 pt-2">
              {statusSteps.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSimulateStatus(step.name, step.pct)}
                  className={`w-full py-2 px-3 rounded-xl border text-[10px] font-black text-left flex items-center justify-between transition-all ${
                    activeBooking.status === step.name 
                      ? 'bg-slate-900 text-white border-slate-900' 
                      : 'bg-white border-amber-200 text-amber-800 hover:bg-amber-100/50'
                  }`}
                >
                  <span>{idx + 1}. {step.name}</span>
                  <span>{step.pct}%</span>
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
