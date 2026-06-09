import React, { useState } from 'react';
import Avatar from '../components/Avatar';
import Badge from '../components/Badge';
import Card from '../components/Card';
import CardTitle from '../components/CardTitle';
import customerData from '../data/customersData.json';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';


export default function Customers() {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  
  // State utama untuk mendeteksi tab filter yang aktif
  const [activeTab, setActiveTab] = useState('overview');

  // Logika filter data otomatis berdasarkan tab yang diklik admin
  const filteredCustomers = customerData.filter((customer) => {
    if (activeTab === 'premium') return customer.tier === 'Premium';
    if (activeTab === 'standard') return customer.tier === 'Standard'; // Menyesuaikan value di JSON
    return true; // jika 'overview', tampilkan semua data
  });

  return (
    <div className="min-h-screen bg-gray-50 p-4 space-y-6">
      <div className="mx-4 space-y-6">
        <Card>
          
          {/* 🛠️ ROOT TABS SHADCN UI */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            
            <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-100/50 pb-4">
              <CardTitle title="Customers & Marketing Automation CRM" actionLabel="Member List" />
              
              {/* LIST TOMBOL TRIGGER SHADCN UI */}
              <TabsList>
                <TabsTrigger value="overview">Overview (Semua)</TabsTrigger>
                <TabsTrigger value="premium">👑 Premium</TabsTrigger>
                <TabsTrigger value="standard">🚗 Standard</TabsTrigger>
              </TabsList>
            </div>

            {/* CONTENT TABS SHADCN UI */}
            <TabsContent value={activeTab} className="mt-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-gray-100 bg-gray-50 text-[11px] uppercase tracking-[0.18em] text-gray-400">
                    <tr>
                      <th className="p-4">Customer</th>
                      <th className="p-4">Email / ID</th>
                      <th className="p-4">Location</th>
                      <th className="p-4">Total Orders</th>
                      <th className="p-4">Membership</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCustomers.map((customer, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-100/70 transition-colors cursor-pointer" onClick={() => setSelectedCustomer(customer)}>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <Avatar src={`https://i.pravatar.cc/100?u=${index}`} alt={customer.name} />
                            <div>
                              <p className="font-semibold text-gray-900">{customer.name}</p>
                              <p className="text-[11px] text-gray-400">@{customer.username}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="text-gray-600">{customer.email}</div>
                          <div className="text-[10px] text-[#48C58C] font-mono font-bold">{customer.id}</div>
                        </td>
                        <td className="p-4 text-gray-600">{customer.location}</td>
                        <td className="p-4 font-semibold text-gray-800">{customer.orders} kali</td>
                        <td className="p-4">
                          <Badge className={customer.tier === 'Premium' ? 'bg-[#D4E34A] text-black font-bold' : 'bg-gray-200 text-gray-700'}>
                            {customer.tier}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${customer.status === 'Active' ? 'bg-[#EAF9F1] text-[#48C58C]' : 'bg-[#FFF9E7] text-[#F9C344]'}`}>
                            {customer.status}
                          </span>
                        </td>
                        <td className="p-4">
                          <button className="text-xs font-bold text-blue-600 hover:underline bg-blue-50 px-2 py-1 rounded-md">
                            Detail Profile
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

          </Tabs>

        </Card>
      </div>

      {/* --- MODAL DETAIL UTUH CRM CUSTOMER --- */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-[24px] max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8 space-y-6 shadow-2xl relative text-gray-800 text-xs">
            
            {/* Tombol Close Modal */}
            <button 
              onClick={() => setSelectedCustomer(null)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-700 text-sm font-bold bg-gray-100 w-8 h-8 rounded-full flex items-center justify-center transition-transform active:scale-90"
            >
              ✕
            </button>

            {/* 1. Bagian Kepala Profil (id, name, username, tier, referralCode, status) */}
            <div className="flex items-center gap-4 border-b border-gray-100 pb-5">
              <img src={`https://i.pravatar.cc/100?u=${selectedCustomer.id}`} className="w-16 h-16 rounded-full border border-gray-100" alt="" />
              <div>
                <h3 className="text-xl font-black text-gray-900 leading-tight">{selectedCustomer.name}</h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  ID: <span className="font-mono font-bold text-gray-700">{selectedCustomer.id}</span> | 
                  Username: <span className="font-medium text-gray-700">@{selectedCustomer.username}</span>
                </p>
                <div className="flex gap-2 mt-2">
                  <Badge className="bg-[#D4E34A] text-black font-black text-[10px] uppercase tracking-wide">
                    Level: {selectedCustomer.tier}
                  </Badge>
                  <Badge className="bg-blue-50 text-blue-600 border border-blue-100 font-mono text-[10px]">
                    Ref: {selectedCustomer.referralCode}
                  </Badge>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                    selectedCustomer.status === 'Active' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-amber-50 text-amber-600 border border-amber-100'
                  }`}>
                    {selectedCustomer.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Grid Detail Identitas vs Keuangan Sistem */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* 2. KELOMPOK DATA IDENTITAS & KONTAK (gender, birthDate, email, phone, location, socialMedia) */}
              <div className="bg-gray-50/70 border border-gray-100 p-5 rounded-[20px] space-y-2.5">
                <h4 className="font-bold text-[10px] uppercase tracking-wider text-gray-400 mb-1">Data Identitas & Kontak</h4>
                <div className="space-y-2">
                  <p className="text-gray-600"><strong>Jenis Kelamin:</strong> <span className="text-gray-900 ml-1">{selectedCustomer.gender || "-"}</span></p>
                  <p className="text-gray-600"><strong>Tanggal Lahir:</strong> <span className="text-gray-900 font-mono ml-1">{selectedCustomer.birthDate || "-"}</span></p>
                  <p className="text-gray-600"><strong>Email Resmi:</strong> <span className="text-gray-900 font-medium ml-1">{selectedCustomer.email || "-"}</span></p>
                  <p className="text-gray-600"><strong>No. HP:</strong> <span className="text-gray-900 font-mono font-semibold ml-1">{selectedCustomer.phone || "-"}</span></p>
                  <p className="text-gray-600"><strong>Alamat Domisili:</strong> <span className="text-gray-900 ml-1">{selectedCustomer.location || "-"}</span></p>
                  <p className="text-gray-600"><strong>Media Sosial:</strong> <span className="text-blue-600 font-medium ml-1">{selectedCustomer.socialMedia || "-"}</span></p>
                </div>
              </div>

              {/* 3. KELOMPOK SISTEM FINANCIAL & LOYALITAS (joinDate, orders, spent, source, stampsCount) */}
              <div className="bg-gray-50/70 border border-gray-100 p-5 rounded-[20px] space-y-2.5">
                <h4 className="font-bold text-[10px] uppercase tracking-wider text-gray-400 mb-1">Aktivitas Sistem & Loyalitas</h4>
                <div className="space-y-2">
                  <p className="text-gray-600"><strong>Tanggal Bergabung:</strong> <span className="text-gray-900 font-mono ml-1">{selectedCustomer.joinDate || "-"}</span></p>
                  <p className="text-gray-600"><strong>Volume Kunjungan:</strong> <span className="text-gray-900 font-bold ml-1">{selectedCustomer.orders || 0} Kali Transaksi</span></p>
                  <p className="text-gray-600"><strong>Total Dana Spent:</strong> <span className="text-[#48C58C] font-mono font-black text-sm ml-1">{selectedCustomer.spent || "$0.00"}</span></p>
                  <p className="text-gray-600"><strong>Sumber Akuisisi:</strong> <span className="bg-gray-200/60 text-gray-700 font-bold px-1.5 py-0.5 rounded text-[10px] ml-1">{selectedCustomer.source || "Organik"}</span></p>
                  <p className="text-gray-600"><strong>Akumulasi Loyalty Stamp:</strong> <span className="text-amber-500 font-bold ml-1">⭐ {selectedCustomer.stampsCount || 0} Stamp Terkumpul</span></p>
                </div>
              </div>

            </div>

            {/* 4. KELOMPOK KEAMANAN & HARDWARE (lastLogin, device) */}
            <div className="bg-gray-50/40 border border-gray-100 p-4 rounded-[16px] space-y-2">
              <h4 className="font-bold text-[10px] uppercase tracking-wider text-gray-400">Sesi Keamanan & Perangkat</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-600">
                <p><strong>Gawai / Device:</strong> <span className="text-gray-800 font-medium ml-1">{selectedCustomer.device || "-"}</span></p>
                <p><strong>Waktu Sesi Login:</strong> <span className="text-gray-800 font-mono ml-1">{selectedCustomer.lastLogin || "-"}</span></p>
              </div>
            </div>

            {/* 5. KELOMPOK RIWAYAT INTERAKSI (interactions Array) */}
            {selectedCustomer.interactions && selectedCustomer.interactions.length > 0 && (
              <div className="space-y-2.5">
                <h4 className="font-bold text-[10px] uppercase tracking-wider text-gray-400">Riwayat Catatan Interaksi CRM</h4>
                <div className="space-y-2">
                  {selectedCustomer.interactions.map((interact, iIdx) => (
                    <div key={iIdx} className="bg-gray-50 border border-gray-100 p-3 rounded-xl flex justify-between items-start">
                      <div className="space-y-0.5">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                          interact.type === 'Complaint' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-blue-50 text-blue-600 border border-blue-100'
                        }`}>
                          {interact.type}
                        </span>
                        <p className="text-gray-700 font-medium mt-1">Catatan: "{interact.note || "-"}"</p>
                      </div>
                      <span className="text-[10px] font-mono text-gray-400">{interact.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. KELOMPOK KAMPANYE PEMASARAN (campaignsJoined Array) */}
            {selectedCustomer.campaignsJoined && selectedCustomer.campaignsJoined.length > 0 && (
              <div className="space-y-2.5">
                <h4 className="font-bold text-[10px] uppercase tracking-wider text-gray-400">Program Marketing Automation Berjalan</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCustomer.campaignsJoined.map((campaign, cIdx) => (
                    <span 
                      key={cIdx} 
                      className="bg-[#A8B330]/10 text-[#8F9E24] font-bold text-[11px] px-3 py-1 rounded-xl border border-[#A8B330]/20 shadow-xs"
                    >
                      📢 {campaign}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Tombol Footer Aksi Modal */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <button 
                onClick={() => setSelectedCustomer(null)} 
                className="px-5 py-2.5 border border-gray-200 hover:bg-gray-50 text-gray-500 font-bold rounded-xl transition-all text-xs"
              >
                Kembali
              </button>
              <button className="px-5 py-2.5 bg-[#A3B22C] hover:bg-[#8F9E24] text-white font-bold rounded-xl shadow-md transition-all active:scale-95 text-xs">
                Kirim Penawaran Spesial
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}