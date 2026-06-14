import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCustomer } from '../../context/CustomerContext';
import { 
  Award, Ticket, Calendar, Wrench, ShieldAlert, 
  ChevronRight, Car, Bell, Eye, PlusCircle, ArrowUpRight
} from 'lucide-react';

export default function Dashboard() {
  const { currentCustomer, bookings, notifications, vouchersList } = useCustomer();
  const navigate = useNavigate();

  if (!currentCustomer) {
    return (
      <div className="bg-white rounded-3xl p-12 border border-slate-100 shadow-sm text-center">
        <p className="text-xs text-slate-400">Loading data customer...</p>
      </div>
    );
  }

  // Active bookings filtering
  const activeBookings = bookings.filter(b => b.status !== 'Selesai');
  const finishedBookings = bookings.filter(b => b.status === 'Selesai');
  const activeVouchersCount = vouchersList.filter(v => v.status === 'Active').length;

  // Points conversion helper
  const points = currentCustomer.stampsCount * 50 + 75; // dynamic points formula based on stampsCount

  // CRM Alerts
  const activeAlerts = notifications.filter(n => !n.read && n.type !== 'booking');

  return (
    <div className="space-y-6 text-left">
      
      {/* --- WELCOME BOARD --- */}
      <div className="bg-slate-900 text-white rounded-[2.5rem] p-6 sm:p-8 border border-slate-800 shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4E34A]/10 rounded-full blur-3xl animate-pulse" />
        
        <div className="space-y-2 relative z-10">
          <div className="flex items-center gap-2">
            <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
              currentCustomer.tier === 'Premium' 
                ? 'bg-[#D4E34A] text-slate-950 shadow-sm shadow-[#D4E34A]/20' 
                : 'bg-slate-700 text-slate-200'
            }`}>
              {currentCustomer.tier} Member
            </span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">• ID: {currentCustomer.id}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white my-0 leading-none">Selamat Datang Kembali, {currentCustomer.name}!</h1>
          <p className="text-xs text-slate-400 max-w-lg leading-relaxed pt-1">
            Kondisi kendaraan Anda terdaftar aman di sistem FixFlow. Layanan WhatsApp CRM dan garansi digital aktif sepenuhnya.
          </p>
        </div>

        <div className="shrink-0 relative z-10 flex gap-4">
          <Link
            to="/customer/booking"
            className="bg-[#D4E34A] text-slate-950 font-bold px-6 py-3.5 rounded-xl text-xs hover:bg-[#C5D33A] active:scale-95 transition-all shadow-md shadow-[#D4E34A]/10 flex items-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Booking Servis</span>
          </Link>
          {activeBookings.length > 0 && (
            <Link
              to="/customer/tracking"
              className="bg-slate-800 border border-slate-700 text-white font-bold px-6 py-3.5 rounded-xl text-xs hover:bg-slate-700 transition-all flex items-center gap-1.5"
            >
              <Wrench className="w-4 h-4 text-[#D4E34A]" />
              <span>Lacak Servis ({activeBookings.length})</span>
            </Link>
          )}
        </div>
      </div>

      {/* --- QUICK STATS GRID --- */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Points Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-2xl bg-[#D4E34A]/10 text-[#A8B330] flex items-center justify-center font-bold">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Loyalty Poin Saya</div>
            <div className="text-xl font-black text-slate-950 mt-1">{points} <span className="text-xs text-slate-400 font-medium">Poin</span></div>
            <Link to="/customer/loyalty" className="text-[10px] text-[#A8B330] font-bold hover:underline flex items-center gap-0.5 mt-1">
              Tukarkan Reward <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Vouchers Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
            <Ticket className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Voucher Aktif Saya</div>
            <div className="text-xl font-black text-slate-950 mt-1">{activeVouchersCount} <span className="text-xs text-slate-400 font-medium">Kupon</span></div>
            <Link to="/customer/vouchers" className="text-[10px] text-indigo-600 font-bold hover:underline flex items-center gap-0.5 mt-1">
              Lihat Dompet Voucher <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* Total Bookings Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total Riwayat Servis</div>
            <div className="text-xl font-black text-slate-950 mt-1">{currentCustomer.orders} <span className="text-xs text-slate-400 font-medium">Kunjungan</span></div>
            <Link to="/customer/history" className="text-[10px] text-amber-600 font-bold hover:underline flex items-center gap-0.5 mt-1">
              Rincian Riwayat <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* --- LEFT SIDEBAR: GARAGE & ACTIVE SERVICES --- */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Active Booking Live Banner */}
          {activeBookings.length > 0 && (
            <div className="bg-amber-50 border border-amber-100 rounded-3xl p-5 flex items-center justify-between gap-4">
              <div className="flex gap-3 items-start text-left">
                <div className="w-10 h-10 shrink-0 bg-amber-500/10 text-amber-600 rounded-xl flex items-center justify-center text-lg">🔧</div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">Servis Anda Sedang Diproses</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-normal">
                    Kode booking: <strong>{activeBookings[0].id}</strong>. Status saat ini: <span className="text-amber-600 font-bold">"{activeBookings[0].status}"</span> ({activeBookings[0].progress}%).
                  </p>
                </div>
              </div>
              <button
                onClick={() => navigate('/customer/tracking')}
                className="shrink-0 bg-slate-950 hover:bg-slate-900 text-white font-bold px-4 py-2 rounded-xl text-[10px] transition-all flex items-center gap-1"
              >
                <Eye className="w-3.5 h-3.5" /> Lacak Live
              </button>
            </div>
          )}

          {/* Garasi Kendaraan Saya */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-black text-slate-900 text-sm flex items-center gap-2">
                <Car className="w-4 h-4 text-slate-400" />
                <span>Kendaraan Saya</span>
              </h3>
              <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-bold">
                {currentCustomer.vehicles?.length || 1} Unit
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentCustomer.vehicles ? (
                currentCustomer.vehicles.map((v, i) => (
                  <div key={i} className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-left space-y-2">
                    <span className="text-[9px] text-[#A8B330] font-black uppercase tracking-wider">Kendaraan #{i+1}</span>
                    <h4 className="font-bold text-slate-900 text-sm leading-tight">{v.split(' (')[0]}</h4>
                    <span className="inline-block bg-slate-900 text-white text-[10px] font-black px-2 py-0.5 rounded tracking-widest uppercase">
                      {v.includes('(') ? v.split('(')[1].replace(')', '') : 'B 1234 ABC'}
                    </span>
                  </div>
                ))
              ) : (
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-left space-y-2">
                  <span className="text-[9px] text-[#A8B330] font-black uppercase tracking-wider">Kendaraan #1</span>
                  <h4 className="font-bold text-slate-900 text-sm leading-tight">{currentCustomer.vehicle.split(' (')[0]}</h4>
                  <span className="inline-block bg-slate-900 text-white text-[10px] font-black px-2 py-0.5 rounded tracking-widest uppercase">
                    {currentCustomer.vehicle.includes('(') ? currentCustomer.vehicle.split('(')[1].replace(')', '') : 'B 1234 ABC'}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* CRM Notification & Alerts feed */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-black text-slate-900 text-sm flex items-center gap-2">
                <Bell className="w-4 h-4 text-slate-400" />
                <span>Pemberitahuan CRM & Rekomendasi</span>
              </h3>
              {activeAlerts.length > 0 && (
                <span className="text-[9px] bg-red-100 text-red-600 px-2.5 py-0.5 rounded-full font-bold">
                  {activeAlerts.length} Butuh Tindakan
                </span>
              )}
            </div>

            <div className="space-y-3">
              {notifications.slice(0, 3).map((notif) => {
                const isUnread = !notif.read;
                return (
                  <div
                    key={notif.id}
                    className={`p-4 rounded-2xl border text-xs text-slate-600 text-left relative flex gap-3 ${
                      isUnread 
                        ? 'bg-amber-50/50 border-amber-100' 
                        : 'bg-slate-50/50 border-slate-100'
                    }`}
                  >
                    {isUnread && (
                      <span className="w-2 h-2 rounded-full bg-amber-500 absolute top-4.5 right-4" />
                    )}
                    <div className="text-base shrink-0 mt-0.5">
                      {notif.type === 'stnk' ? '📄' : notif.type === 'oli' ? '🛢️' : notif.type === 'birthday' ? '🎂' : '✉️'}
                    </div>
                    <div className="space-y-1 pr-6 leading-relaxed">
                      <h4 className="font-bold text-slate-900 text-xs flex items-center gap-1.5">
                        {notif.title}
                        <span className="text-[8px] text-slate-400 font-normal">({notif.channel})</span>
                      </h4>
                      <p className="text-[11px] text-slate-500 leading-normal">{notif.message}</p>
                      <div className="text-[9px] text-slate-400 font-semibold">{notif.date}</div>
                    </div>
                  </div>
                );
              })}
              {notifications.length === 0 && (
                <p className="text-center text-slate-400 py-6 text-xs">Tidak ada pemberitahuan aktif.</p>
              )}
            </div>
            
            <div className="pt-2 border-t border-slate-50 text-center">
              <Link to="/customer/journey" className="text-xs font-bold text-[#A8B330] hover:underline inline-flex items-center gap-1">
                Simulasi Control Center CRM <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>

        {/* --- RIGHT SIDEBAR: REMINDER & ACTIONS --- */}
        <div className="space-y-6">
          
          {/* Service Reminder Box (Tied to CRM Automation) */}
          <div className="bg-slate-950 text-white rounded-[2rem] p-6 border border-slate-800 shadow-sm relative overflow-hidden space-y-4">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#D4E34A]/5 rounded-full blur-2xl" />
            
            <span className="text-[9px] text-amber-500 font-black uppercase tracking-widest block">Reminder Aktif</span>
            <div className="flex gap-2.5 items-start text-left">
              <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-sm text-white">Servis Berkala Berikutnya</h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-normal">
                  Kendaraan Anda dijadwalkan untuk servis berkala berikutnya pada:
                </p>
                <div className="bg-slate-900 border border-slate-850 rounded-xl p-3 mt-3 flex items-center justify-between text-xs font-bold text-white">
                  <div>
                    <div className="text-[8px] text-slate-500 uppercase">Jadwal Estimasi</div>
                    <div className="text-[#D4E34A] text-xs">25 Agustus 2026</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[8px] text-slate-500 uppercase">Target KM</div>
                    <div>15.000 KM</div>
                  </div>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => navigate('/customer/booking')}
              className="w-full bg-[#D4E34A] text-slate-950 hover:bg-[#C5D33A] font-bold py-3.5 rounded-xl text-xs transition-all text-center"
            >
              Booking Servis Sekarang
            </button>
          </div>

          {/* Quick Info Vouchers */}
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
            <h3 className="font-black text-slate-900 text-sm border-b border-slate-100 pb-3">Promo & Voucher Rekomendasi</h3>
            
            <div className="space-y-3">
              {vouchersList.filter(v => v.status === 'Active').slice(0, 2).map((vch) => (
                <div key={vch.id} className="bg-indigo-50/20 border border-indigo-100/50 rounded-2xl p-4 text-left relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-12 h-12 bg-indigo-500/5 rounded-full" />
                  <span className="text-[8px] bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded font-black uppercase tracking-wider">{vch.type} Voucher</span>
                  <h4 className="font-bold text-slate-900 text-xs mt-2">{vch.title}</h4>
                  <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">{vch.desc}</p>
                  
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-[11px] font-black text-indigo-600">{vch.discount}</span>
                    <button
                      onClick={() => navigate('/customer/booking')}
                      className="text-[9px] font-black bg-slate-900 hover:bg-slate-800 text-white px-2.5 py-1.5 rounded-lg transition-all"
                    >
                      Gunakan
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
