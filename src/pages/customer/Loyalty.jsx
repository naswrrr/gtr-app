import React from 'react';
import { useCustomer } from '../../context/CustomerContext';
import { Award, ArrowUpRight, ArrowDownLeft, Sparkles, Gift, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function Loyalty() {
  const { currentCustomer, pointsHistory, redeemVoucherWithPoints } = useCustomer();

  if (!currentCustomer) {
    return (
      <div className="bg-white rounded-3xl p-12 border border-slate-100 shadow-sm text-center">
        <p className="text-xs text-slate-400">Loading data customer...</p>
      </div>
    );
  }

  // Points calculation helper
  const stamps = currentCustomer.stampsCount || 0;
  const currentPoints = stamps * 50 + 75; // dynamic starting point

  const redeemableRewards = [
    { id: 'rw-ef', title: 'Free Engine Flush Guard', points: 100, discount: 'Gratis Engine Flush Jasa', desc: 'Pembersih sisa karbon oli mesin sebelum oli baru dimasukkan.' },
    { id: 'rw-v50', title: 'Voucher Potongan Rp 50.000', points: 150, discount: 'Rp 50.000', desc: 'Potongan harga langsung untuk pengerjaan jasa servis apa saja.' },
    { id: 'rw-oli', title: 'Free Oli Mesin Castrol 1L', points: 300, discount: 'Gratis Oli Castrol 1L', desc: 'Suku cadang oli mesin 1 Liter premium gratis.' },
    { id: 'rw-sp', name: 'Free Spooring Roda 3D', points: 400, discount: 'Gratis Jasa Spooring', desc: 'Setel kelurusan roda mobil Anda secara gratis dengan komputer 3D.' }
  ];

  const handleRedeem = (reward) => {
    if (currentPoints < reward.points) {
      toast.error(`Poin Anda tidak mencukupi untuk menukarkan ${reward.title}. Anda butuh ${reward.points} poin.`);
      return;
    }
    
    // Call context redeem method
    const success = redeemVoucherWithPoints(reward.points, reward.title, reward.discount);
    if (success) {
      toast.success(`Berhasil menukarkan ${reward.points} poin dengan voucher: ${reward.title}!`);
    }
  };

  return (
    <div className="space-y-6 text-left max-w-4xl mx-auto">
      
      {/* HEADER PAGE */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight my-0">Program Loyalty Point</h1>
        <p className="text-xs text-slate-400 mt-1">Kumpulkan poin dari setiap transaksi servis dan tukarkan dengan voucher keuntungan eksklusif.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left Points Circular Progress & Rewards catalog */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Main Circular Progress Ring Panel */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm flex flex-col sm:flex-row items-center gap-8">
            {/* Visual Ring */}
            <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="72" cy="72" r="62" stroke="#F1F5F9" strokeWidth="10" fill="transparent" />
                <circle 
                  cx="72" 
                  cy="72" 
                  r="62" 
                  stroke="#D4E34A" 
                  strokeWidth="10" 
                  fill="transparent"
                  strokeDasharray={`${2 * Math.PI * 62}`}
                  strokeDashoffset={`${2 * Math.PI * 62 * (1 - Math.min(currentPoints / 500, 1))}`}
                  strokeLinecap="round"
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute text-center">
                <Award className="w-6 h-6 mx-auto text-[#A8B330]" />
                <span className="block text-2xl font-black text-slate-950 mt-1 leading-none">{currentPoints}</span>
                <span className="text-[9px] text-slate-400 font-bold uppercase mt-1">Poin Aktif</span>
              </div>
            </div>

            {/* Level status */}
            <div className="space-y-3 text-center sm:text-left flex-1">
              <span className="text-[9px] bg-slate-900 text-[#D4E34A] px-2.5 py-0.5 rounded-full font-black uppercase tracking-wider">
                Status Loyalty: {currentCustomer.tier}
              </span>
              <h3 className="font-black text-slate-900 text-lg leading-tight">Mekanisme Poin FixFlow</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Anda mendapatkan <strong>1 Poin</strong> dari setiap kelipatan transaksi <strong>Rp 10.000</strong>. Capai batas 500 Poin untuk mendapatkan status Gold VIP Member dengan bonus poin 1.5x lebih cepat.
              </p>
              
              <div className="text-[10px] text-slate-400 font-bold">
                Tersisa {Math.max(500 - currentPoints, 0)} poin menuju target Gold VIP Member.
              </div>
            </div>
          </div>

          {/* Reward Catalog */}
          <div className="space-y-4">
            <h3 className="font-black text-slate-900 text-sm flex items-center gap-1.5 border-b border-slate-100 pb-3">
              <Gift className="w-4.5 h-4.5 text-slate-400" />
              <span>Tukarkan Reward Poin</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {redeemableRewards.map((reward) => {
                const canRedeem = currentPoints >= reward.points;
                return (
                  <div
                    key={reward.id}
                    className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm text-left flex flex-col justify-between hover:shadow-md transition-shadow"
                  >
                    <div className="space-y-2">
                      <div className="flex justify-between items-start gap-4">
                        <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{reward.title || reward.name}</h4>
                        <span className={`px-2 py-0.5 rounded font-black text-[9px] shrink-0 ${
                          canRedeem ? 'bg-amber-100 text-amber-700' : 'bg-slate-150 text-slate-400'
                        }`}>
                          {reward.points} Poin
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 leading-normal">{reward.desc}</p>
                    </div>

                    <div className="pt-4 border-t border-slate-50 mt-4 flex items-center justify-between gap-4">
                      <span className="text-xs font-black text-[#A8B330]">{reward.discount}</span>
                      <button
                        onClick={() => handleRedeem(reward)}
                        className={`px-3 py-2 rounded-xl text-[10px] font-black transition-all ${
                          canRedeem 
                            ? 'bg-slate-950 text-white hover:bg-[#D4E34A] hover:text-slate-950' 
                            : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        Redeem Poin
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right side Points History Feed */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4 text-left">
            <h3 className="font-black text-slate-900 text-xs uppercase tracking-widest border-b border-slate-100 pb-3">Riwayat Transaksi Poin</h3>
            
            <div className="space-y-3 max-h-[350px] overflow-y-auto pr-1">
              {pointsHistory.map((tx) => (
                <div key={tx.id} className="flex gap-3 items-start p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                    tx.type === 'in' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                  }`}>
                    {tx.type === 'in' ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                  </div>
                  <div className="text-xs leading-normal">
                    <h4 className="font-bold text-slate-950">{tx.desc}</h4>
                    <p className="text-[10px] text-slate-400 font-semibold mt-0.5">{tx.date}</p>
                    <span className={`inline-block font-black text-xs mt-1 ${
                      tx.type === 'in' ? 'text-emerald-600' : 'text-rose-600'
                    }`}>
                      {tx.type === 'in' ? '+' : '-'}{tx.amount} Poin
                    </span>
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
