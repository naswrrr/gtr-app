import React from 'react';
import Avatar from './Avatar';
import StatusBadge from './StatusBadge';

// Impor komponen Sheet bawaan Shadcn UI
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function TableRow({ order, idx }) {
  // Ambil data profil utuh yang dititipkan dari JSON
  const profile = order.originalCustomerData || {};

  return (
    <Sheet>
      {/* Trigger klik untuk satu baris tabel */}
      <SheetTrigger asChild>
        <tr className="border-b border-gray-50 last:border-0 group hover:bg-gray-50/60 cursor-pointer transition-colors">
          <td className="py-4 text-gray-400 font-bold">{order.no}</td>
          <td className="py-4">
            <div className="flex items-center gap-3">
              <Avatar src={`https://i.pravatar.cc/100?u=${idx}`} alt={order.name} />
              <div>
                <p className="font-bold text-gray-800 group-hover:text-[#A3B22C] transition-colors">{order.name}</p>
                <p className="text-[10px] text-gray-400">{order.sub}</p>
              </div>
            </div>
          </td>
          <td className="py-4 font-bold text-gray-800">
            {order.date}
            <p className="text-[10px] text-gray-400 font-medium">{order.time}</p>
          </td>
          <td className="py-4">
            <StatusBadge status={order.status} />
          </td>
          <td className="py-4 font-bold text-gray-800">{order.price}</td>
          <td className="py-4">
            <p className="font-bold text-gray-800">{order.customer}</p>
            <p className="text-[10px] text-gray-400">{order.brand}</p>
          </td>
        </tr>
      </SheetTrigger>

      {/* PANEL SIDE-SHEET: KAYA AKAN INFORMASI DATA CRM */}
      <SheetContent side="right" className="w-[450px] sm:w-[550px] bg-white p-6 shadow-2xl border-l border-gray-100 flex flex-col justify-between h-full overflow-y-auto">
        <div className="space-y-6">
          
          {/* BAGIAN 1: HEADER PROFIL (Sesuai Referensi Kotak Gambar Mockup) */}
          <SheetHeader className="pb-4 border-b border-gray-100 text-left">
            <div className="flex items-start gap-4 mt-2">
              <Avatar src={`https://i.pravatar.cc/100?u=${idx}`} alt={order.customer} className="w-14 h-14 border border-gray-100 rounded-full" />
              <div className="space-y-1">
                <SheetTitle className="text-xl font-black text-gray-900 leading-tight">
                  {order.customer}
                </SheetTitle>
                <p className="text-[11px] text-gray-400 font-medium">
                  ID: {profile.id || "N/A"} | Username: <span className="font-mono text-gray-600">@{profile.username || "user"}</span>
                </p>
                
                {/* Badge Tingkatan/Tier & Kode Referral */}
                <div className="flex gap-2 pt-1">
                  <span className="bg-[#D4E34A] text-black text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wide shadow-sm">
                    Level: {profile.tier || "Regular"}
                  </span>
                  {profile.referralCode && (
                    <span className="bg-blue-50 text-blue-600 text-[9px] font-bold px-2 py-0.5 rounded-md border border-blue-100 font-mono">
                      Ref: {profile.referralCode}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </SheetHeader>

          {/* BAGIAN 2: GRID DATA IDENTITAS & KONTAK */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50/60 border border-gray-50 p-4 rounded-2xl space-y-2">
              <h4 className="font-bold text-gray-400 uppercase tracking-wider text-[9px]">Data Identitas & Kontak</h4>
              <div className="space-y-1 text-xs">
                <p className="text-gray-500">No. HP: <span className="font-bold text-gray-900 font-mono block mt-0.5">{profile.phone || "-"}</span></p>
                <p className="text-gray-500 pt-1">Email: <span className="font-medium text-gray-800 block truncate">{profile.email || "-"}</span></p>
                <p className="text-gray-500 pt-1">Alamat: <span className="font-medium text-gray-800 block">{profile.location || "-"}</span></p>
                <p className="text-gray-500 pt-1">Gender: <span className="font-medium text-gray-800 block">{profile.gender || "-"}</span></p>
              </div>
            </div>

            {/* BAGIAN 3: AKTIVITAS & FINANSIAL SISTEM */}
            <div className="bg-gray-50/60 border border-gray-50 p-4 rounded-2xl space-y-2">
              <h4 className="font-bold text-gray-400 uppercase tracking-wider text-[9px]">Aktivitas Sistem</h4>
              <div className="space-y-1 text-xs">
                <p className="text-gray-500">Total Transaksi: <span className="font-black text-emerald-600 font-mono block text-sm mt-0.5">{profile.spent || "$0.00"}</span></p>
                <p className="text-gray-500 pt-1">Volume Order: <span className="font-bold text-gray-800 block">{profile.orders || 0} Kali Servis</span></p>
                <p className="text-gray-500 pt-1">Sumber Akuisisi: <span className="bg-gray-200/60 text-gray-600 text-[10px] font-bold px-1.5 py-0.5 rounded block w-max mt-0.5">{profile.source || "Organik"}</span></p>
                <p className="text-gray-500 pt-1">Loyalty Stamp: <span className="font-bold text-amber-600 block">⭐ {profile.stampsCount || 0} Stamp</span></p>
              </div>
            </div>
          </div>

          {/* BAGIAN 4: TRACKING LOG & HARDWARE DEVICE */}
          <div className="bg-gray-50/40 border border-gray-100 p-4 rounded-2xl space-y-3 text-xs">
            <h4 className="font-bold text-gray-400 uppercase tracking-wider text-[9px]">Log Autentikasi Pengguna</h4>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div>
                <span className="text-gray-400 block">Terakhir Aktif:</span>
                <span className="font-medium text-gray-700">{profile.lastLogin || "-"}</span>
              </div>
              <div>
                <span className="text-gray-400 block">Gawai / Device:</span>
                <span className="font-medium text-gray-700 truncate block">{profile.device || "-"}</span>
              </div>
            </div>
          </div>

          {/* BAGIAN 5: KAMPANYE PEMASARAN YANG DIIKUTI */}
          {profile.campaignsJoined && profile.campaignsJoined.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-bold text-gray-400 uppercase tracking-wider text-[9px]">Riwayat Pemasaran Terbuka</h4>
              <div className="flex flex-wrap gap-1.5">
                {profile.campaignsJoined.map((camp, cIdx) => (
                  <span key={cIdx} className="bg-[#A8B330]/10 text-[#8F9E24] font-bold text-[10px] px-2.5 py-1 rounded-lg border border-[#A8B330]/20">
                    📢 {camp}
                  </span>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* BOTTOM ACTION BUTTONS */}
        <div className="flex gap-3 pt-4 border-t border-gray-100 bg-white sticky bottom-0">
          <button className="flex-1 border border-gray-200 hover:bg-gray-50 text-gray-600 font-bold py-3 rounded-xl transition-all active:scale-95 text-xs">
            Hubungi via WA
          </button>
          <button className="flex-1 bg-[#A3B22C] hover:bg-[#8F9E24] text-white font-bold py-3 rounded-xl shadow-lg transition-all active:scale-95 text-xs">
            Selesaikan Antrean
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
}