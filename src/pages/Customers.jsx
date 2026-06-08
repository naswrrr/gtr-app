import React, { useState } from 'react';
import Avatar from '../components/Avatar';
import Badge from '../components/Badge';
import Card from '../components/Card';
import CardTitle from '../components/CardTitle';
import customerData from '../data/customersData.json';

export default function Customers() {
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 p-4 space-y-6">
      <div className="mx-4 space-y-6">
        <Card>
          <CardTitle title="Customers & Marketing Automation CRM" actionLabel="Member List" />
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
                {customerData.map((customer, index) => (
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
        </Card>
      </div>

      {/* --- MODAL DETAIL CRM CUSTOMER (MARKETING & ENGAGEMENT) --- */}
      {selectedCustomer && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-[24px] max-w-4xl w-full max-h-[90vh] overflow-y-auto p-8 space-y-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            
            {/* Close Button */}
            <button 
              onClick={() => setSelectedCustomer(null)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-700 text-xl font-bold bg-gray-100 w-8 h-8 rounded-full flex items-center justify-center"
            >
              ✕
            </button>

            {/* Header Profil */}
            <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
              <img src={`https://i.pravatar.cc/100?u=${selectedCustomer.id}`} className="w-16 h-16 rounded-full" alt="" />
              <div>
                <h3 className="text-xl font-black text-gray-900">{selectedCustomer.name}</h3>
                <p className="text-sm text-gray-500">ID: {selectedCustomer.id} | Username: <strong>{selectedCustomer.username}</strong></p>
                <div className="flex gap-2 mt-1">
                  <Badge className="bg-[#D4E34A] text-black font-bold text-[10px]">Level: {selectedCustomer.tier}</Badge>
                  <Badge className="bg-blue-100 text-blue-700 text-[10px]">Ref: {selectedCustomer.referralCode}</Badge>
                </div>
              </div>
            </div>

            {/* Grid Data Identitas & Kontak */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-[16px] space-y-2">
                <h4 className="font-bold text-xs uppercase tracking-wider text-gray-400">Data Identitas & Kontak</h4>
                <p className="text-sm text-gray-700"><strong>Jenis Kelamin:</strong> {selectedCustomer.gender}</p>
                <p className="text-sm text-gray-700"><strong>Tanggal Lahir:</strong> {selectedCustomer.birthDate}</p>
                <p className="text-sm text-gray-700"><strong>No. HP:</strong> {selectedCustomer.phone}</p>
                <p className="text-sm text-gray-700"><strong>Alamat:</strong> {selectedCustomer.location}</p>
                <p className="text-sm text-gray-700"><strong>Media Sosial:</strong> <span className="text-blue-500">{selectedCustomer.socialMedia}</span></p>
              </div>

              <div className="bg-gray-50 p-4 rounded-[16px] space-y-2">
                <h4 className="font-bold text-xs uppercase tracking-wider text-gray-400">Aktivitas Sistem & Aplikasi</h4>
                <p className="text-sm text-gray-700"><strong>Tanggal Daftar:</strong> {selectedCustomer.joinDate}</p>
                <p className="text-sm text-gray-700"><strong>Login Terakhir:</strong> {selectedCustomer.lastLogin}</p>
                <p className="text-sm text-gray-700"><strong>Device Yang Digunakan:</strong> {selectedCustomer.device}</p>
                <p className="text-sm text-gray-700"><strong>Total Transaksi Bengkel:</strong> <span className="text-[#48C58C] font-bold">{selectedCustomer.spent}</span></p>
              </div>
            </div>

            {/* MARKETING & ENGAGEMENT AUTOMATION SECTION */}
            <div className="border-t border-gray-100 pt-4 space-y-4">
              <h4 className="font-black text-sm text-gray-800 flex items-center gap-2">
                📢 Marketing, Promo & Loyalty (Menarik Customer)
              </h4>
              
              {/* Program Loyalty Stamp Kupon */}
              <div className="bg-yellow-50/50 border border-yellow-200 p-4 rounded-[16px] space-y-2">
                <div className="flex justify-between items-center">
                  <p className="text-xs font-bold text-yellow-800">Loyalty Stamp Program (Beli 5x Gratis 1x Oli Mesin)</p>
                  <span className="text-xs font-black text-yellow-600">{selectedCustomer.stampsCount} / 5 Stamp</span>
                </div>
                <div className="flex gap-2 py-2">
                  {[...Array(5)].map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-10 h-10 rounded-full flex items-center justify-center border-2 text-sm ${
                        i < selectedCustomer.stampsCount 
                          ? 'bg-[#D4E34A] border-[#D4E34A] text-black font-bold' 
                          : 'bg-white border-gray-200 text-gray-300'
                      }`}
                    >
                      {i < selectedCustomer.stampsCount ? '🏁' : i + 1}
                    </div>
                  ))}
                </div>
                {selectedCustomer.stampsCount >= 4 ? (
                  <p className="text-[11px] text-[#48C58C] font-bold animate-pulse">🎉 Otomatisasi Marketing: Customer ini akan segera mendapatkan voucher gratis ganti oli otomatis via email!</p>
                ) : (
                  <p className="text-[11px] text-gray-500">Butuh {5 - selectedCustomer.stampsCount} transaksi lagi untuk memicu promo loyalitas otomatis.</p>
                )}
              </div>

              {/* Data Akuisisi Marketing */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-gray-100 rounded-[16px] space-y-1">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Sumber Akun (User Source)</span>
                  <p className="text-sm font-semibold text-gray-700">Ditemukan dari: <span className="text-purple-600 font-bold">{selectedCustomer.source}</span></p>
                </div>
                <div className="p-4 border border-gray-100 rounded-[16px] space-y-1">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Campaign Aktif Yang Diikuti</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedCustomer.campaignsJoined.map((c, idx) => (
                      <span key={idx} className="bg-purple-50 text-purple-700 text-[10px] px-2 py-0.5 rounded-md font-medium">{c}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* INTERAKSI & FEEDBACK CUSTOMER */}
            <div className="border-t border-gray-100 pt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h4 className="font-bold text-xs uppercase tracking-wider text-gray-400">📝 Riwayat Interaksi & Tiket Komplain</h4>
                <div className="space-y-1.5">
                  {selectedCustomer.interactions.map((int, i) => (
                    <div key={i} className="text-xs p-2 bg-gray-50 rounded-md border-l-4 border-gray-400">
                      <span className="font-bold text-gray-600">[{int.type}]</span> <span className="text-[10px] text-gray-400">{int.date}</span>
                      <p className="text-gray-700 mt-0.5">{int.note}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-xs uppercase tracking-wider text-gray-400">⭐ Customer Feedback / Review Bengkel</h4>
                <div className="p-3 bg-green-50/50 border border-green-100 rounded-[16px]">
                  <div className="flex text-yellow-400 mb-1">
                    {[...Array(selectedCustomer.feedback.rating)].map((_, i) => <span key={i}>⭐</span>)}
                  </div>
                  <p className="text-xs italic text-gray-600">"{selectedCustomer.feedback.review}"</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}