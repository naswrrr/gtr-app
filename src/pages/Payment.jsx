import React, { useState } from 'react';
import Card from '../components/Card';
import CardTitle from '../components/CardTitle';
import Badge from '../components/Badge';
import customerData from '../data/customersData.json';

export default function Payment() {
  const [activeTab, setActiveTab] = useState('history');
  // State baru untuk mengatur munculnya notifikasi otomatis
  const [showToast, setShowToast] = useState(false);

  // Fungsi trigger saat tombol WA Blast Invoice diklik
  const handleSendInvoice = () => {
    setShowToast(true);
    // Notifikasi otomatis hilang setelah 3 detik
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  // Ambil data transaksi secara dinamis dari log interaksi di json
  const transactionHistory = customerData
    .filter(c => c.interactions && c.interactions.length > 0)
    .slice(0, 6)
    .map((c, index) => ({
      id: `INV-2026-${1000 + index}`,
      name: c.name,
      vehicle: c.vehicle || "Motor",
      date: c.interactions[0].date,
      amount: index % 2 === 0 ? "Rp 350.000" : "Rp 150.000",
      method: index % 3 === 0 ? "QRIS FixFlow" : "Transfer Bank",
      status: "Lunas"
    }));

  return (
    <div className="min-h-screen bg-gray-50 p-4 space-y-6 relative">
      
      {/* --- POP-UP NOTIFIKASI (TOAST) OTOMATISASI --- */}
      {showToast && (
        <div className="fixed top-6 right-6 z-50 transform translate-y-0 transition-all duration-500 animate-bounce">
          <div className="bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-emerald-500">
            <span className="text-base">🚀</span>
            <div className="text-left">
              <p className="text-xs font-black">CRM Automation Success</p>
              <p className="text-[10px] text-emerald-100 font-medium">Invoice link successfully dispatched to Devon Lane via WhatsApp Bot!</p>
            </div>
          </div>
        </div>
      )}

      <div className="mx-4 space-y-6">
        
        {/* --- SECTION HEADER BILLING --- */}
        <div className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#A8B330]">FixFlow Finance</p>
          <h1 className="mt-1 text-2xl font-black text-[#1A1C1E]">Billing & Transaction Center</h1>
          
          <div className="flex gap-2 mt-4 border-t border-gray-100 pt-4 flex-wrap">
            <button
              onClick={() => setActiveTab('history')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                activeTab === 'history' ? 'bg-[#D4E34A] text-black shadow-md shadow-[#d4e34a33]' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              📜 Transaction History (CLV Tracker)
            </button>
            <button
              onClick={() => setActiveTab('invoice')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                activeTab === 'invoice' ? 'bg-[#D4E34A] text-black shadow-md shadow-[#d4e34a33]' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              📱 Post-Service Online Payment
            </button>
          </div>
        </div>

        {/* --- TAB 1: TRANSACTION HISTORY --- */}
        {activeTab === 'history' && (
          <Card className="p-6">
            <CardTitle title="Customer Lifetime Value Records" actionLabel="Live Financial Log" />
            <p className="text-xs text-gray-500 -mt-2 mb-4">
              Rekam jejak kasir digital untuk memantau total dana yang dikeluarkan pelanggan demi penentuan kualifikasi Tier Member.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-medium text-gray-700">
                <thead>
                  <tr className="text-gray-400 uppercase border-b border-gray-100 text-[10px] tracking-wider">
                    <th className="pb-3">No. Invoice</th>
                    <th className="pb-3">Nama Pelanggan</th>
                    <th className="pb-3">Kendaraan</th>
                    <th className="pb-3">Tanggal Bayar</th>
                    <th className="pb-3">Metode</th>
                    <th className="pb-3">Total Nominal</th>
                    <th className="pb-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactionHistory.map((trx, i) => (
                    <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/40 transition-colors">
                      <td className="py-4 font-mono font-bold text-gray-900">{trx.id}</td>
                      <td className="py-4 font-bold text-gray-800">{trx.name}</td>
                      <td className="py-4 text-gray-500">{trx.vehicle}</td>
                      <td className="py-4 text-gray-400 font-mono">{trx.date}</td>
                      <td className="py-4">
                        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-[10px]">
                          {trx.method}
                        </span>
                      </td>
                      <td className="py-4 font-black text-gray-900">{trx.amount}</td>
                      <td className="py-4 text-right">
                        <Badge className="bg-green-100 text-green-800 border border-green-200">Lunas</Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {/* --- TAB 2: ONLINE PAYMENT / INVOICE --- */}
        {activeTab === 'invoice' && (
          <div className="grid gap-6 md:grid-cols-3">
            
            {/* Rincian Nota Tagihan */}
            <Card className="p-6 md:col-span-2 flex flex-col justify-between">
              <div>
                <CardTitle title="Post-Service Digital Invoice" actionLabel="Pending Dispatch" />
                <p className="text-xs text-gray-500 -mt-2 mb-4">Nota pengerjaan fisik bengkel yang otomatis di-sinkronisasi ke sistem kasir CRM.</p>
                
                <div className="mt-4 border-b border-dashed border-gray-200 pb-4 space-y-3 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Customer Target:</span>
                    <span className="font-bold text-gray-900">Devon Lane</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Vehicle / Unit:</span>
                    <span className="font-bold text-gray-900">Toyota Avanza (B 1234 XYZ)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Jasa Mekanik (Tune Up):</span>
                    <span className="font-bold text-gray-900">Rp 150.000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Suku Cadang (Sparepart):</span>
                    <span className="font-bold text-gray-900">Rp 300.000</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-4">
                  <span className="text-sm font-black text-gray-900">Total Tagihan Akhir:</span>
                  <span className="text-xl font-black text-[#A8B330]">Rp 450.000</span>
                </div>
              </div>
              
              {/* Pasang onClick Fungsi Trigger di Sini */}
              <button 
                onClick={handleSendInvoice}
                className="mt-6 w-full bg-[#1A1C1E] text-white text-xs font-bold py-3 rounded-2xl shadow-md hover:bg-black active:scale-[0.98] transition-all"
              >
                Kirim Invoice Link via WhatsApp Bot 🚀
              </button>
            </Card>

            {/* QRIS Scan Desk Board */}
            <Card className="p-6 flex flex-col items-center justify-center text-center">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Instant Scan Desk</span>
              
              <div className="p-3 bg-white border border-gray-200 rounded-[1.5rem] shadow-xs">
                <img 
                  src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=FIXFLOW-INVOICE-DEVOALANE-450000" 
                  alt="QRIS Merchant FixFlow"
                  className="w-36 h-36"
                />
              </div>
              
              <p className="text-[11px] font-bold text-gray-800 mt-4">QRIS FIXFLOW SERVICE</p>
              <p className="text-[9px] text-gray-400 max-w-[180px] mt-1 leading-relaxed">
                Pelanggan bisa langsung scan barcode di atas via M-Banking atau E-Wallet setelah servis selesai.
              </p>
            </Card>

          </div>
        )}

      </div>
    </div>
  );
}