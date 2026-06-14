import React, { useState } from 'react';
import { useCustomer } from '../../context/CustomerContext';
import { History as HistoryIcon, Search, Eye, X, FileText, CheckCircle } from 'lucide-react';

export default function History() {
  const { currentCustomer } = useCustomer();
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  if (!currentCustomer) {
    return (
      <div className="bg-white rounded-3xl p-12 border border-slate-100 shadow-sm text-center">
        <p className="text-xs text-slate-400">Loading data customer...</p>
      </div>
    );
  }

  // Generate mock history list based on customer profile
  const historyList = [
    {
      invoiceId: 'INV-2026-0418',
      date: '2026-04-18',
      vehicle: currentCustomer.vehicle,
      mechanic: 'Andi Wijaya (Senior Engine Master)',
      status: 'Selesai',
      totalCost: 'Rp 650.000',
      details: {
        services: [
          { name: 'Jasa Servis Berkala 10k KM', price: 'Rp 250.000' },
          { name: 'Jasa Spooring Roda 3D', price: 'Rp 150.000' },
          { name: 'Jasa Balancing & Rotasi Roda', price: 'Rp 100.000' }
        ],
        parts: [
          { name: 'Filter Udara Baru', price: 'Rp 95.000' },
          { name: 'Timbal Velg balancing', price: 'Rp 55.000' }
        ],
        notes: 'Penyetelan sudut toe & camber berhasil dilakukan. Roda stabil saat pengetesan jalan. Tekanan angin disetel rata 32 Psi. Disarankan rotasi ban kembali 6 bulan lagi.'
      }
    },
    {
      invoiceId: 'INV-2026-0215',
      date: '2026-02-15',
      vehicle: currentCustomer.vehicle,
      mechanic: 'Budi Santoso (ECU Tuning Expert)',
      status: 'Selesai',
      totalCost: 'Rp 950.000',
      details: {
        services: [
          { name: 'Jasa Tune Up Mesin & Gurah Karbon', price: 'Rp 350.000' },
          { name: 'Jasa Scan OBD2 Reset ECU', price: 'Rp 150.000' }
        ],
        parts: [
          { name: 'Carbon Cleaner Fluid 500ml', price: 'Rp 120.000' },
          { name: 'Busi Denso Iridium (4 pcs)', price: 'Rp 330.000' }
        ],
        notes: 'Pembersihan ruang bakar silinder piston berhasil. Pembakaran kembali bersih dan efisien. Error code sensor oksigen knalpot berhasil di-reset. Tarikan mesin kembali responsif.'
      }
    },
    {
      invoiceId: 'INV-2025-1210',
      date: '2025-12-10',
      vehicle: currentCustomer.vehicle,
      mechanic: 'Eko Prasetyo (AC Specialist)',
      status: 'Selesai',
      totalCost: 'Rp 1.150.000',
      details: {
        services: [
          { name: 'Jasa Service AC Evaporator Clean', price: 'Rp 400.000' },
          { name: 'Jasa Ganti Oli Mesin', price: 'Rp 100.000' }
        ],
        parts: [
          { name: 'Oli Mesin Shell Helix HX8 4L', price: 'Rp 420.000' },
          { name: 'Filter Oli Mesin', price: 'Rp 65.000' },
          { name: 'Filter Kabin AC Carbon', price: 'Rp 165.000' }
        ],
        notes: 'Blower & Evaporator AC dibersihkan menggunakan endoskopi. Bau apek kabin hilang. Pengisian freon R134a disesuaikan. Suhu kabin dingin optimal 6 derajat C. Oli mesin diganti baru.'
      }
    }
  ];

  const filteredHistory = historyList.filter(h => 
    h.invoiceId.toLowerCase().includes(searchQuery.toLowerCase()) || 
    h.mechanic.toLowerCase().includes(searchQuery.toLowerCase()) ||
    h.date.includes(searchQuery)
  );

  return (
    <div className="space-y-6 text-left max-w-4xl mx-auto">
      
      {/* HEADER PAGE */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight my-0">Riwayat Kunjungan Servis</h1>
          <p className="text-xs text-slate-400 mt-1">Histori pengerjaan mekanik, penggantian sparepart, dan invoice digital tersimpan aman.</p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Cari riwayat (tanggal, montir)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl py-2 pl-9 pr-4 text-xs focus:outline-none focus:ring-2 focus:ring-[#D4E34A] focus:border-transparent"
          />
        </div>
      </div>

      {/* --- HISTORY TABLE LIST --- */}
      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-slate-600">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-black uppercase text-slate-400 tracking-wider">
                <th className="px-6 py-4 text-left">No. Invoice</th>
                <th className="px-6 py-4 text-left">Tanggal</th>
                <th className="px-6 py-4 text-left">Kendaraan</th>
                <th className="px-6 py-4 text-left">Mekanik</th>
                <th className="px-6 py-4 text-left">Total Biaya</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-center">Rincian</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredHistory.map((inv) => (
                <tr key={inv.invoiceId} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-900">{inv.invoiceId}</td>
                  <td className="px-6 py-4 text-slate-500">{inv.date}</td>
                  <td className="px-6 py-4 text-slate-800">{inv.vehicle.split(' (')[0]}</td>
                  <td className="px-6 py-4 text-slate-500">{inv.mechanic.split(' (')[0]}</td>
                  <td className="px-6 py-4 font-bold text-slate-900">{inv.totalCost}</td>
                  <td className="px-6 py-4 text-center">
                    <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider">
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => setSelectedInvoice(inv)}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 p-1.5 rounded-lg transition-colors inline-flex items-center justify-center"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredHistory.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center py-12 text-slate-400">
                    Tidak ada riwayat servis yang ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- INVOICE BREAKDOWN MODAL --- */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-slate-800 text-left border border-slate-100">
            
            {/* Modal Header */}
            <div className="bg-slate-950 text-white p-6 sm:p-8 flex justify-between items-center relative">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs font-bold text-[#D4E34A]">
                  <FileText className="w-4 h-4 text-[#D4E34A]" />
                  <span>Invoice & Rincian Servis</span>
                </div>
                <h3 className="text-xl font-black text-white my-0 leading-none">{selectedInvoice.invoiceId}</h3>
              </div>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="bg-slate-900 text-slate-400 hover:text-white p-2 rounded-full transition-colors focus:outline-none"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 space-y-6 max-h-[500px] overflow-y-auto">
              
              {/* Meta row */}
              <div className="grid grid-cols-2 gap-4 text-xs pb-4 border-b border-slate-100">
                <div>
                  <span className="text-[9px] text-slate-400 font-bold uppercase block">Tanggal Servis</span>
                  <span className="font-bold text-slate-900">{selectedInvoice.date}</span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 font-bold uppercase block">Mekanik Terkait</span>
                  <span className="font-bold text-slate-900">{selectedInvoice.mechanic}</span>
                </div>
              </div>

              {/* Jasa Servis */}
              <div className="space-y-2.5">
                <h4 className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">1. Jasa Pengerjaan & Servis</h4>
                <div className="space-y-2">
                  {selectedInvoice.details.services.map((svc, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs">
                      <div className="text-slate-600 font-semibold flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-350" />
                        {svc.name}
                      </div>
                      <div className="font-bold text-slate-900">{svc.price}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Spareparts */}
              <div className="space-y-2.5">
                <h4 className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">2. Penggantian Suku Cadang</h4>
                <div className="space-y-2">
                  {selectedInvoice.details.parts.map((part, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs">
                      <div className="text-slate-600 font-semibold flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-350" />
                        {part.name}
                      </div>
                      <div className="font-bold text-slate-900">{part.price}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Catatan Mekanik */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-1.5 text-xs">
                <span className="text-[9px] text-[#A8B330] font-black uppercase tracking-wider block">Catatan & Rekomendasi Mekanik:</span>
                <p className="text-slate-600 leading-relaxed font-semibold italic">"{selectedInvoice.details.notes}"</p>
              </div>

              {/* Final Cost Summary */}
              <div className="pt-4 border-t border-slate-100 flex justify-between items-end">
                <div>
                  <span className="text-[9px] text-slate-400 font-bold uppercase block">Metode Pembayaran</span>
                  <span className="font-bold text-slate-900 text-xs">Digital Cashless (E-Wallet)</span>
                </div>
                <div className="text-right">
                  <span className="text-[9px] text-slate-400 font-bold uppercase block">Total Invoice</span>
                  <span className="text-lg font-black text-slate-950 block leading-none">{selectedInvoice.totalCost}</span>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 border-t border-slate-100 p-6 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedInvoice(null)}
                className="bg-slate-950 text-white hover:bg-[#D4E34A] hover:text-slate-950 font-bold px-6 py-2.5 rounded-xl text-xs transition-colors"
              >
                Tutup Invoice
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
