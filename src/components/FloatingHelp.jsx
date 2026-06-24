import React, { useState } from 'react';

export default function FloatingHelp() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(null); // 'wa' atau 'email'

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* 1. Pop-up Box Menu Chat */}
      {isOpen && (
        <div className="mb-4 w-80 rounded-[2rem] border border-gray-200 bg-white p-5 shadow-2xl transition-all duration-300">
          {/* Header Pop-up */}
          <div className="flex justify-between items-center border-b border-gray-100 pb-3">
            <h3 className="font-black text-sm text-[#1A1C1E]">Tanya Tim FixFlow</h3>
            <button 
              onClick={() => { setIsOpen(false); setActiveTab(null); }}
              className="text-gray-400 hover:text-black font-bold text-sm"
            >
              ✕
            </button>
          </div>

          {/* Isi Opsi Kontak */}
          <div className="mt-4 space-y-2">
            
            {/* OPSI 1: WHATSAPP */}
            <div className="border border-gray-100 rounded-2xl overflow-hidden">
              <button 
                onClick={() => setActiveTab(activeTab === 'wa' ? null : 'wa')}
                className="w-full flex justify-between items-center p-3 bg-gray-50 hover:bg-gray-100 text-left transition-colors"
              >
                <span className="text-xs font-bold text-gray-700 flex items-center gap-2">
                  💬 Whatsapp
                </span>
                <span className="text-xs text-gray-400">{activeTab === 'wa' ? '▲' : '▼'}</span>
              </button>
              
              {activeTab === 'wa' && (
                <div className="p-3 bg-white border-t border-gray-100 text-center">
                  <p className="text-[11px] text-gray-500 mb-2">Terhubung langsung dengan Service Advisor kami.</p>
                  <a 
                    href="https://wa.me/628123456789" 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-block w-full bg-green-500 hover:bg-green-600 text-white text-xs font-bold py-2 rounded-xl text-center transition-all"
                  >
                    Buka Chat WhatsApp
                  </a>
                </div>
              )}
            </div>

            {/* OPSI 2: EMAIL (Sesuai Gambar Referensi Kamu) */}
            <div className="border border-gray-100 rounded-2xl overflow-hidden">
              <button 
                onClick={() => setActiveTab(activeTab === 'email' ? null : 'email')}
                className="w-full flex justify-between items-center p-3 bg-gray-50 hover:bg-gray-100 text-left transition-colors"
              >
                <span className="text-xs font-bold text-gray-700 flex items-center gap-2">
                  ✉️ Email
                </span>
                <span className="text-xs text-gray-400">{activeTab === 'email' ? '▲' : '▼'}</span>
              </button>
              
              {activeTab === 'email' && (
                <form onSubmit={(e) => e.preventDefault()} className="p-3 bg-white border-t border-gray-100 space-y-2">
                  <p className="text-[11px] text-gray-500">
                    📧 Lebih suka kontak via email? Yuk, isi form ini untuk tanya-tanya dulu 😊
                  </p>
                  <input 
                    type="text" 
                    placeholder="Nama Lengkap" 
                    className="w-full border border-gray-200 rounded-xl p-2 text-xs focus:outline-none focus:border-[#D4E34A]"
                    required
                  />
                  <input 
                    type="email" 
                    placeholder="Alamat Email" 
                    className="w-full border border-gray-200 rounded-xl p-2 text-xs focus:outline-none focus:border-[#D4E34A]"
                    required
                  />
                  <textarea 
                    placeholder="Pesan Pertanyaan" 
                    rows="3"
                    className="w-full border border-gray-200 rounded-xl p-2 text-xs focus:outline-none focus:border-[#D4E34A] resize-none"
                    required
                  ></textarea>
                  <button 
                    type="submit"
                    className="w-full bg-[#1A1C1E] hover:bg-black text-white text-xs font-bold py-2 rounded-xl transition-all"
                  >
                    Kirim Pertanyaan
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      )}

      {/* 2. Tombol Utama yang Melayang (Floating Icon Trigger) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-[#D4E34A] text-black shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 group relative"
      >
        <span className="text-xl group-hover:rotate-12 transition-transform">💬</span>
        {/* Badge Notifikasi Kecil biar menarik */}
        <span className="absolute top-0 right-0 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
        </span>
      </button>
    </div>
  );
}