import React from 'react';
import Card from '../components/Card';
import CardTitle from '../components/CardTitle';
import StatusBadge from '../components/StatusBadge';
import customerData from '../data/customersData.json';

export default function Feedback() {
  // 1. Ambil data customer yang memiliki ulasan/review dari file JSON secara otomatis
  const reviewBoard = customerData
    .filter(c => c.feedback && c.feedback.review)
    .slice(0, 4); // Mengambil 4 contoh ulasan teratas untuk display grid

  // 2. Ambil data komplain dari log interaksi di dalam file JSON
  const complaintsList = customerData
    .filter(c => c.interactions && c.interactions.length > 0)
    .slice(0, 4)
    .map((c, index) => ({
      customerName: c.name,
      issue: c.interactions.find(i => i.type === 'Complaint' || i.type === 'Chat')?.note || "Konsultasi Teknis",
      date: c.interactions[0].date,
      // Membuat simulasi variasi status (Selesai/Menunggu) menggunakan StatusBadge bawaan kamu
      status: index % 3 === 0 ? 'Menunggu' : 'Selesai'
    }));

  return (
    <div className="min-h-screen bg-gray-50 p-4 space-y-6">
      <div className="mx-4 space-y-6">
        
        {/* --- SECTION 1: TIKET PENGADUAN (COMPLAINTS) --- */}
        <Card className="p-6">
          <CardTitle title="CRM Complaint Escalation Tickets" actionLabel="Live Monitoring" />
          <p className="text-xs text-gray-500 -mt-2 mb-4">
            Daftar keluhan masuk dari pelanggan pasca pengerjaan reparasi. Admin dapat memantau status penyelesaian masalah di sini.
          </p>
          
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-left text-xs font-medium text-gray-700">
              <thead>
                <tr className="text-gray-400 uppercase border-b border-gray-100 text-[10px] tracking-wider">
                  <th className="pb-3">Customer Name</th>
                  <th className="pb-3">Keluhan / Log Kendala</th>
                  <th className="pb-3">Tanggal Masuk</th>
                  <th className="pb-3 text-right">Status Tindakan</th>
                </tr>
              </thead>
              <tbody>
                {complaintsList.map((ticket, index) => (
                  <tr key={index} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                    <td className="py-4 font-bold text-gray-900">{ticket.customerName}</td>
                    <td className="py-4 text-gray-600 max-w-xs md:max-w-md truncate">{ticket.issue}</td>
                    <td className="py-4 text-gray-400 font-mono">{ticket.date}</td>
                    <td className="py-4 text-right">
                      {/* Menggunakan komponen StatusBadge bawaan kodemu asli */}
                      <StatusBadge status={ticket.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* --- SECTION 2: ULASAN BINTANG (FEEDBACK BOARD) --- */}
        <Card className="p-6">
          <CardTitle title="Customer Review Board" actionLabel="User Voice" />
          <p className="text-xs text-gray-500 -mt-2 mb-4">
            Rating bintang (1-5) dan review kepuasan yang dikirim otomatis oleh sistem setelah pelacakan tracker motor selesai.
          </p>
          
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mt-2">
            {reviewBoard.map((f, i) => (
              <div 
                key={i} 
                className="p-5 border border-gray-100 rounded-[1.5rem] bg-white flex flex-col justify-between space-y-4 hover:-translate-y-1 transition-all duration-200 shadow-xs"
              >
                <div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-xs text-gray-900">{f.name}</h4>
                      <span className="text-[9px] bg-gray-900 text-white px-2 py-0.5 rounded-sm font-mono mt-1 inline-block uppercase tracking-wider">
                        {f.tier} Member
                      </span>
                    </div>
                    {/* Render Nilai Rating Bintang Kuning */}
                    <div className="flex text-yellow-400 text-sm">
                      {Array.from({ length: f.feedback.rating }).map((_, idx) => (
                        <span key={idx}>★</span>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs italic text-gray-600 mt-4 font-medium leading-relaxed">
                    "{f.feedback.review}"
                  </p>
                </div>
                
                <div className="flex justify-between items-center pt-3 border-t border-gray-100 text-[10px]">
                  <span className="text-green-600 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full inline-block animate-pulse"></span>
                    Verified Service
                  </span>
                  <span className="text-gray-400 font-mono">{f.id}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

      </div>
    </div>
  );
}