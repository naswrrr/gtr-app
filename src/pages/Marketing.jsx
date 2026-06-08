import React, { useState } from 'react';
import Card from '../components/Card';
import CardTitle from '../components/CardTitle';
import Button from '../components/Button';
import Badge from '../components/Badge';
import customerData from '../data/customersData.json';

export default function Marketing() {
  const [activeTab, setActiveTab] = useState('campaign');

  // Ambil data referral otomatis dari JSON
  const dynamicReferrals = customerData
    .filter(c => c.referralCode)
    .slice(0, 5)
    .map(c => ({
      code: c.referralCode,
      owner: c.name,
      usedCount: Math.floor(Math.random() * 15) + 2,
      bonusEarned: `$${(Math.floor(Math.random() * 15) + 2) * 5}`
    }));

  const [reminders, setReminders] = useState([
    { id: 1, type: "Oli Mesin", text: "Kirim WA otomatis ke customer jika sudah 3 bulan sejak servis terakhir.", active: true },
    { id: 2, type: "Tune Up", text: "Kirim email pengingat jika kendaraan sudah menempuh +10.000 Km.", active: true },
    { id: 3, type: "Ulang Tahun", text: "Diskon 25% ganti oli otomatis terkirim saat hari ulang tahun customer.", active: false }
  ]);

  const toggleReminder = (id) => {
    setReminders(reminders.map(r => r.id === id ? { ...r, active: !r.active } : r));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 space-y-6">
      <div className="mx-4 space-y-6">
        
        {/* Header Branding CRM */}
        <div className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#A8B330]">FixFlow CRM Marketing</p>
          <h1 className="mt-1 text-2xl font-black text-[#1A1C1E]">Marketing Automation Center</h1>
          
          <div className="flex gap-2 mt-4 border-t border-gray-100 pt-4 flex-wrap">
            {['campaign', 'promo', 'reminder', 'referral'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all capitalize ${
                  activeTab === tab ? 'bg-[#D4E34A] text-black shadow-md shadow-[#d4e34a33]' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab === 'reminder' ? '⚙️ Auto Reminder' : tab === 'promo' ? '🎟️ Promo & Voucher' : tab === 'referral' ? '🔗 Referral Program' : '📢 Active Campaigns'}
              </button>
            ))}
          </div>
        </div>

        {/* TAB 1: CAMPAIGN MGT + GAMBAR FLYER PROMO (LINK AMAN & STABIL) */}
        {activeTab === 'campaign' && (
          <div className="space-y-6">
            <Card className="p-6">
              <CardTitle title="Active Blast Campaigns" actionLabel="Overview" />
              <p className="text-xs text-gray-500 -mt-2 mb-4">Aset media visual yang otomatis dilampirkan oleh sistem bot saat melakukan blast penawaran.</p>
              
              <div className="grid gap-6 md:grid-cols-2">
                
                {/* Campaign 1 - Ganti Oli */}
                <div className="overflow-hidden border border-gray-100 rounded-[1.5rem] bg-white shadow-xs flex flex-col">
                  <div className="h-44 w-full bg-gray-900 relative">
                    <img 
                      src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80" 
                      alt="Promo Maintenance & Oli" 
                      className="h-full w-full object-cover opacity-85"
                      onError={(e) => { e.target.src = "https://placehold.co/600x400/1A1C1E/D4E34A?text=Promo+Ganti+Oli+2026" }}
                    />
                    <div className="absolute top-3 left-3 bg-[#D4E34A] text-black text-[10px] font-black px-2 py-1 rounded-sm uppercase tracking-wider">
                      Voucher Terlampir
                    </div>
                  </div>
                  <div className="p-4 flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-sm text-gray-900">Promo Oli Ganti Tahun 2026</h4>
                      <p className="text-xs text-gray-500">Target: All Customers • Saluran: WA Blast Image</p>
                    </div>
                    <Badge className="bg-[#D4E34A] text-black">Running</Badge>
                  </div>
                </div>

                {/* Campaign 2 - Service Berkala */}
                <div className="overflow-hidden border border-gray-100 rounded-[1.5rem] bg-white shadow-xs flex flex-col">
                  <div className="h-44 w-full bg-gray-900 relative">
                    <img 
                      src="https://images.unsplash.com/photo-1507136566006-cfc505b114fc?auto=format&fit=crop&w=800&q=80" 
                      alt="Service Engine & Diagnostic" 
                      className="h-full w-full object-cover opacity-85"
                      onError={(e) => { e.target.src = "https://placehold.co/600x400/1A1C1E/D4E34A?text=Giveaway+Oli+Shell" }}
                    />
                    <div className="absolute top-3 left-3 bg-black text-white text-[10px] font-black px-2 py-1 rounded-sm uppercase tracking-wider">
                      Exclusive Email
                    </div>
                  </div>
                  <div className="p-4 flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-sm text-gray-900">Giveaway Shell Helix Ultra</h4>
                      <p className="text-xs text-gray-500">Target: Premium Members • Saluran: Email Newsletter</p>
                    </div>
                    <Badge className="bg-black text-white">Scheduled</Badge>
                  </div>
                </div>

              </div>
            </Card>
          </div>
        )}
        
        {/* TAB 2: PROMO & VOUCHER + QR CODE GENERATOR */}
        {activeTab === 'promo' && (
          <Card className="p-6">
            <CardTitle title="Voucher & Discount Management" actionLabel="Live Codes" />
            <div className="grid gap-4 md:grid-cols-2 mt-2">
              
              {/* Voucher 1 */}
              <div className="p-5 border border-dashed border-gray-300 rounded-[1.5rem] bg-yellow-50/50 flex justify-between items-center gap-4">
                <div className="flex-1">
                  <span className="text-[10px] bg-yellow-200 text-yellow-800 font-bold px-2 py-0.5 rounded">POTONGAN $5</span>
                  <h4 className="font-black text-lg text-gray-900 mt-1">FIXFLOWNEW</h4>
                  <p className="text-xs text-gray-500 mt-1">Gunakan kode ini untuk registrasi member pertama kali lewat aplikasi.</p>
                </div>
                {/* Simulasi Gambar QR Code otomatis dari sistem */}
                <div className="bg-white p-2 rounded-xl border border-gray-200 text-center shrink-0">
                  <img 
                    src="https://api.qrserver.com/v1/create-qr-code/?size=70x70&data=FIXFLOWNEW" 
                    alt="QR Code FIXFLOWNEW"
                    className="w-[70px] h-[70px]"
                  />
                  <span className="text-[8px] text-gray-400 font-mono mt-1 block">Scan Voucher</span>
                </div>
              </div>

              {/* Voucher 2 */}
              <div className="p-5 border border-dashed border-gray-300 rounded-[1.5rem] bg-yellow-50/50 flex justify-between items-center gap-4">
                <div className="flex-1">
                  <span className="text-[10px] bg-green-200 text-green-800 font-bold px-2 py-0.5 rounded">DISKON 15%</span>
                  <h4 className="font-black text-lg text-gray-900 mt-1">LOYALTY5X</h4>
                  <p className="text-xs text-gray-500 mt-1">Kupon reward otomatis saat stamp loyalti pelanggan penuh.</p>
                </div>
                <div className="bg-white p-2 rounded-xl border border-gray-200 text-center shrink-0">
                  <img 
                    src="https://api.qrserver.com/v1/create-qr-code/?size=70x70&data=LOYALTY5X" 
                    alt="QR Code LOYALTY5X"
                    className="w-[70px] h-[70px]"
                  />
                  <span className="text-[8px] text-gray-400 font-mono mt-1 block">Scan Voucher</span>
                </div>
              </div>

            </div>
          </Card>
        )}

        {/* TAB 3: AUTO REMINDER */}
        {activeTab === 'reminder' && (
          <Card className="p-6">
            <CardTitle title="Background Automation Triggers" actionLabel="Retention Rules" />
            <div className="space-y-4 mt-2">
              {reminders.map((r) => (
                <div key={r.id} className="p-4 bg-white border border-gray-100 rounded-[1.5rem] flex justify-between items-center">
                  <div className="pr-4">
                    <span className="text-[10px] font-mono font-bold bg-gray-100 px-2 py-0.5 rounded text-gray-600">{r.type}</span>
                    <p className="text-xs text-gray-700 font-medium mt-1">{r.text}</p>
                  </div>
                  <button 
                    onClick={() => toggleReminder(r.id)}
                    className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 ${r.active ? 'bg-[#D4E34A]' : 'bg-gray-200'}`}
                  >
                    <div className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform duration-200 ${r.active ? 'translate-x-6' : 'translate-x-0'}`} />
                  </button>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* TAB 4: REFERRAL PROGRAM */}
        {activeTab === 'referral' && (
          <Card className="p-6">
            <CardTitle title="Referral Code Analytics" actionLabel="Live Tracking" />
            <div className="overflow-x-auto mt-4">
              <table className="w-full text-left text-xs font-medium text-gray-700">
                <thead>
                  <tr className="text-gray-400 uppercase border-b border-gray-100 text-[10px] tracking-wider">
                    <th className="pb-2">Kode Referral</th>
                    <th className="pb-2">Pemilik Akun</th>
                    <th className="pb-2">Total Digunakan</th>
                    <th className="pb-2">Akumulasi Bonus</th>
                  </tr>
                </thead>
                <tbody>
                  {dynamicReferrals.map((ref, idx) => (
                    <tr key={idx} className="border-b border-gray-50">
                      <td className="py-3 font-mono font-bold text-purple-600">{ref.code}</td>
                      <td className="py-3 text-gray-900 font-bold">{ref.owner}</td>
                      <td className="py-3">{ref.usedCount} Kali</td>
                      <td className="py-3 text-green-600 font-bold">{ref.bonusEarned}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

      </div>
    </div>
  );
}