import React, { useState } from 'react';
import { useCustomer } from '../../context/CustomerContext';
import { Ticket, Copy, Check, Info, Calendar } from 'lucide-react';
import { toast } from 'sonner';

export default function Vouchers() {
  const { vouchersList } = useCustomer();
  const [activeTab, setActiveTab] = useState('Active');
  const [copiedCode, setCopiedCode] = useState(null);

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success(`Kode voucher ${code} disalin ke clipboard!`);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const filteredVouchers = vouchersList.filter(v => v.status === activeTab);

  const tabs = [
    { key: 'Active', label: 'Voucher Aktif' },
    { key: 'Used', label: 'Sudah Terpakai' },
    { key: 'Expired', label: 'Kadaluarsa' }
  ];

  return (
    <div className="space-y-6 text-left max-w-4xl mx-auto">
      
      {/* HEADER PAGE */}
      <div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tight my-0">Dompet Voucher Saya</h1>
        <p className="text-xs text-slate-400 mt-1">Daftar voucher diskon yang Anda miliki. Salin kode voucher untuk digunakan saat booking servis online.</p>
      </div>

      {/* --- TAB CONTROL --- */}
      <div className="bg-white rounded-3xl p-3 border border-slate-100 shadow-sm flex gap-2 max-w-md">
        {tabs.map((tab) => {
          const isSelected = activeTab === tab.key;
          const count = vouchersList.filter(v => v.status === tab.key).length;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 ${
                isSelected 
                  ? 'bg-slate-950 text-white shadow-sm' 
                  : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                isSelected ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-500'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* --- VOUCHER LISTING --- */}
      {filteredVouchers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredVouchers.map((vch) => {
            const isActive = vch.status === 'Active';
            return (
              <div
                key={vch.id}
                className={`bg-white rounded-[2rem] border overflow-hidden shadow-sm flex hover:shadow-md transition-shadow relative ${
                  isActive ? 'border-slate-100' : 'border-slate-150 opacity-70'
                }`}
              >
                {/* Left side ticket notch decor */}
                <div className="w-4 bg-slate-900 shrink-0 relative flex flex-col justify-between py-4">
                  <div className="absolute top-1/2 -left-2 w-4 h-4 bg-slate-50 rounded-full" />
                  <div className="w-1.5 h-1.5 bg-[#D4E34A] rounded-full mx-auto" />
                  <div className="w-1.5 h-1.5 bg-[#D4E34A] rounded-full mx-auto" />
                  <div className="w-1.5 h-1.5 bg-[#D4E34A] rounded-full mx-auto" />
                </div>

                {/* Main Body */}
                <div className="flex-1 p-5 text-left flex flex-col justify-between gap-4">
                  <div>
                    <div className="flex justify-between items-start gap-3">
                      <div>
                        <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider ${
                          vch.type === 'Birthday' 
                            ? 'bg-rose-100 text-rose-700' 
                            : vch.type === 'Loyalty' 
                              ? 'bg-indigo-100 text-indigo-700' 
                              : 'bg-slate-100 text-slate-600'
                        }`}>
                          {vch.type} Voucher
                        </span>
                        <h3 className="font-black text-slate-900 text-sm mt-2">{vch.title}</h3>
                      </div>
                      <span className="text-sm font-black text-[#A8B330] shrink-0">{vch.discount}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">{vch.desc}</p>
                  </div>

                  <div className="pt-4 border-t border-slate-50 mt-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-1.5 text-[9px] text-slate-400 font-semibold">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>S&K berlaku s/d {vch.expiry}</span>
                    </div>

                    {isActive ? (
                      <div className="flex items-center gap-1">
                        <div className="bg-slate-50 border border-slate-100 rounded-lg px-2.5 py-1.5 text-[10px] font-bold text-slate-700 tracking-wider">
                          {vch.code}
                        </div>
                        <button
                          onClick={() => handleCopyCode(vch.code)}
                          className="bg-slate-950 text-white hover:bg-[#D4E34A] hover:text-slate-950 p-2 rounded-lg text-xs transition-all flex items-center gap-1"
                        >
                          {copiedCode === vch.code ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    ) : (
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                        {vch.status === 'Used' ? 'Terpakai' : 'Kadaluarsa'}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl p-12 border border-slate-100 shadow-sm max-w-xl mx-auto text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center mx-auto">
            <Ticket className="w-8 h-8" />
          </div>
          <h3 className="font-bold text-slate-900 text-base">Dompet Voucher Kosong</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Anda tidak memiliki voucher berkategori "{activeTab}" saat ini. Lakukan servis berkala secara rutin atau tukarkan loyalty poin Anda untuk mengumpulkan voucher baru.
          </p>
        </div>
      )}

      {/* --- TIPS INFO BANNER --- */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 flex items-start gap-3 text-xs leading-normal">
        <Info className="w-4.5 h-4.5 text-[#D4E34A] shrink-0 mt-0.5" />
        <div>
          <h4 className="font-bold text-white mb-0.5">Cara Penggunaan Voucher digital:</h4>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            Salin kode voucher yang aktif dari dompet ini. Buka halaman Booking Online, selesaikan pilihan pengerjaan servis Anda, lalu masukkan kode voucher pada isian pemesanan. Potongan harga jasa servis Anda akan terhitung otomatis di ringkasan checkout.
          </p>
        </div>
      </div>

    </div>
  );
}
