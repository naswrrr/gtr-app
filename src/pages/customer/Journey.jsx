import React, { useState } from 'react';
import { useCustomer } from '../../context/CustomerContext';
import { 
  ShieldCheck, MessageSquare, Mail, Award, Ticket, 
  ArrowRight, RefreshCw, Send, CheckCircle, Bell, AlertTriangle
} from 'lucide-react';
import { toast } from 'sonner';

export default function Journey() {
  const { currentCustomer, addNotification, notifications } = useCustomer();
  const [activeTab, setActiveTab] = useState('pipeline');
  const [whatsappLogs, setWhatsappLogs] = useState([
    { id: 1, type: 'WhatsApp', to: currentCustomer?.phone || '+62812...', text: 'Halo! STNK kendaraan Toyota Avanza Anda akan jatuh tempo pada 28 Juni 2026. Jangan lupa bayar pajak!', date: '1 hari lalu' },
    { id: 2, type: 'Email', to: currentCustomer?.email || 'user@mail.com', text: 'Kejutan Promo Ulang Tahun Diskon 20% Khusus Hari Lahir Anda!', date: '5 hari lalu' }
  ]);

  if (!currentCustomer) {
    return (
      <div className="bg-white rounded-3xl p-12 border border-slate-100 shadow-sm text-center">
        <p className="text-xs text-slate-400">Loading data customer...</p>
      </div>
    );
  }

  // Determine active stage on the pipeline based on customer orders and points
  // Stage index: 0: Customer Baru, 1: Booking Service, 2: Service Selesai, 3: Mendapat Voucher, 4: Mendapat Reminder, 5: Mendapat Point, 6: Loyal Customer
  let activeStageIdx = 0;
  if (currentCustomer.orders >= 1) activeStageIdx = 2;
  if (currentCustomer.orders >= 5) activeStageIdx = 4;
  if (currentCustomer.stampsCount >= 3) activeStageIdx = 5;
  if (currentCustomer.tier === 'Premium' && currentCustomer.orders >= 20) activeStageIdx = 6;

  const pipelineStages = [
    { title: 'Customer Baru', desc: 'Registrasi data & garage mobil.' },
    { title: 'Booking Servis', desc: 'Jadwalkan slot antrean digital.' },
    { title: 'Servis Selesai', desc: 'Inspeksi & pengerjaan teknisi.' },
    { title: 'Dapat Voucher', desc: 'Voucher selamat datang / promo.' },
    { title: 'Dapat Reminder', desc: 'Notifikasi oli & STNK otomatis.' },
    { title: 'Kumpul Poin', desc: 'Kumpulkan poin loyalty reward.' },
    { title: 'Loyal Customer', desc: 'Status VIP Premium Member.' }
  ];

  const automationCampaigns = [
    {
      id: 'ac-srv',
      num: 1,
      title: 'Reminder Servis Berkala',
      trigger: 'KM menyentuh batas kelipatan 10.000 KM atau 6 bulan sejak servis terakhir',
      channel: 'WhatsApp & Email',
      message: `Halo Kak ${currentCustomer.name}, kendaraan ${currentCustomer.vehicle.split(' (')[0]} Anda sudah memasuki masa servis berkala berikutnya. Yuk booking sekarang di FixFlow untuk menjaga garansi kendaraan!`
    },
    {
      id: 'ac-oli',
      num: 2,
      title: 'Reminder Ganti Oli Mesin',
      trigger: 'KM berjalan 5.000 KM sejak ganti oli terakhir',
      channel: 'WhatsApp',
      message: `Pemberitahuan Ganti Oli: Oli mesin pada kendaraan ${currentCustomer.vehicle.split(' (')[0]} Anda sudah saatnya diganti untuk menghindari keausan silinder. Booking paket ganti oli hemat hari ini.`
    },
    {
      id: 'ac-stnk',
      num: 3,
      title: 'Reminder Pajak STNK',
      trigger: '30 hari sebelum tanggal jatuh tempo pajak STNK tahunan',
      channel: 'WhatsApp & Email',
      message: `Pemberitahuan Pajak STNK: Masa berlaku STNK kendaraan ${currentCustomer.vehicle} Anda akan berakhir dalam 30 hari. Siapkan berkas atau kunjungi loket layanan Samsat terdekat.`
    },
    {
      id: 'ac-bday-promo',
      num: 4,
      title: 'Promo Hari Ulang Tahun',
      trigger: 'Hari ulang tahun customer berdasarkan data registrasi birthDate',
      channel: 'Email',
      message: `Happy Birthday Kak ${currentCustomer.name}! Dapatkan diskon 20% khusus jasa servis hari ini. Gunakan kode voucher spesial Anda.`
    },
    {
      id: 'ac-bday-vch',
      num: 5,
      title: 'Voucher Ulang Tahun Otomatis',
      trigger: 'Ditambahkan ke dompet digital voucher tepat di tanggal lahir',
      channel: 'Sistem Wallet',
      message: `Voucher ulang tahun baru ditambahkan! Dapatkan gratis AC Fogging khusus bulan kelahiran Anda.`
    },
    {
      id: 'ac-post-vch',
      num: 6,
      title: 'Voucher Insentif Pasca Servis',
      trigger: '1 hari setelah status servis dinyatakan Selesai',
      channel: 'WhatsApp',
      message: `Terima kasih telah servis di FixFlow! Ini voucher potongan Rp 20.000 untuk kunjungan Anda berikutnya.`
    },
    {
      id: 'ac-followup',
      num: 7,
      title: 'Follow Up Kepuasan Servis',
      trigger: '3 hari setelah servis selesai (NPS Survey)',
      channel: 'WhatsApp',
      message: `Bagaimana performa mesin ${currentCustomer.vehicle.split(' (')[0]} Anda setelah servis kemarin? Mohon bantu isi rating feedback kami untuk mendapatkan tambahan 50 Poin.`
    },
    {
      id: 'ac-inactive',
      num: 8,
      title: 'Re-engagement Inactive 6 Bulan',
      trigger: 'Pelanggan tidak melakukan transaksi servis selama 180 hari berturut-turut',
      channel: 'Email & WhatsApp',
      message: `Kami merindukan Anda! Sudah 6 bulan Anda tidak merawat kendaraan di FixFlow. Ini penawaran spesial gratis ganti filter oli khusus untuk Anda.`
    },
    {
      id: 'ac-loyal',
      num: 9,
      title: 'Reward Pelanggan Loyal',
      trigger: 'Total pesanan servis mencapai kelipatan 10 kali kunjungan',
      channel: 'WhatsApp',
      message: `Luar biasa! Anda telah mencapai 10x servis di FixFlow. Nikmati voucher gratis cuci mesin & spooring roda sebagai penghargaan loyalitas Anda.`
    },
    {
      id: 'ac-broadcast',
      num: 10,
      title: 'Broadcast Promo Musiman',
      trigger: 'Dipicu manual oleh Admin untuk segmentasi pelanggan (Hari Raya, Akhir Tahun)',
      channel: 'WhatsApp & Email Broadcast',
      message: `Mudik Aman bersama FixFlow! Diskon 25% paket Rem & Suspensi Kaki-kaki khusus minggu ini sebelum libur panjang.`
    }
  ];

  const handleTriggerCampaign = (camp) => {
    // Add warning notification to the customer portal context
    addNotification({
      title: `📢 CRM Triggered: ${camp.title}`,
      message: camp.message,
      type: camp.id.replace('ac-', ''),
      channel: camp.channel
    });

    // Add log to local WhatsApp mockup feed
    const newLog = {
      id: whatsappLogs.length + 1,
      type: camp.channel.includes('Email') ? 'Email' : 'WhatsApp',
      to: camp.channel.includes('Email') ? currentCustomer.email : currentCustomer.phone,
      text: camp.message,
      date: 'Baru saja'
    };
    setWhatsappLogs(prev => [newLog, ...prev]);

    toast.success(`Simulasi Automasi Terpicu: ${camp.title}`);
  };

  return (
    <div className="space-y-6 text-left max-w-5xl mx-auto">
      
      {/* HEADER PAGE */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight my-0">Customer Journey & CRM Automation</h1>
          <p className="text-xs text-slate-400 mt-1">Halaman visual kontrol dan monitoring alur otomatisasi CRM berdasarkan database terpadu.</p>
        </div>

        {/* Tab Controls */}
        <div className="bg-white border border-slate-100 p-1.5 rounded-2xl shadow-sm flex gap-1 text-xs font-bold">
          <button
            onClick={() => setActiveTab('pipeline')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === 'pipeline' ? 'bg-slate-950 text-white' : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            Visual Journey Pipeline
          </button>
          <button
            onClick={() => setActiveTab('automation')}
            className={`px-4 py-2 rounded-xl transition-all ${
              activeTab === 'automation' ? 'bg-slate-950 text-white' : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            10 Trigger Automation Control
          </button>
        </div>
      </div>

      {/* --- PIPELINE STAGE GRAPHIC VIEW --- */}
      {activeTab === 'pipeline' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          
          {/* Main Journey Pipeline Map */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6">
            <h3 className="font-black text-slate-900 text-sm border-b border-slate-100 pb-3 flex items-center gap-2">
              <ShieldCheck className="w-4.5 h-4.5 text-slate-400" />
              <span>Peta Journey Pelanggan: {currentCustomer.name}</span>
            </h3>

            {/* Horizontal pipeline grid layout */}
            <div className="grid grid-cols-1 md:grid-cols-7 gap-4 relative">
              {pipelineStages.map((stage, idx) => {
                const isCompleted = activeStageIdx >= idx;
                const isCurrent = activeStageIdx === idx;
                
                return (
                  <div key={idx} className="relative flex flex-col items-center text-center p-3 rounded-2xl border transition-all bg-slate-50 border-slate-100">
                    {/* Visual stage number */}
                    <div className={`w-8 h-8 rounded-full font-black text-xs flex items-center justify-center border-2 border-white shadow-sm mb-3 ${
                      isCurrent 
                        ? 'bg-slate-950 text-white ring-4 ring-[#D4E34A]' 
                        : isCompleted 
                          ? 'bg-[#D4E34A] text-slate-950 font-black' 
                          : 'bg-white text-slate-400'
                    }`}>
                      {idx + 1}
                    </div>

                    <div className="space-y-1">
                      <h4 className={`text-xs font-black leading-tight ${
                        isCurrent ? 'text-slate-950' : isCompleted ? 'text-slate-900 font-bold' : 'text-slate-400'
                      }`}>
                        {stage.title}
                      </h4>
                      <p className="text-[10px] text-slate-400 leading-normal">{stage.desc}</p>
                    </div>

                    {/* Checkmark icon for current/completed */}
                    {isCurrent && (
                      <span className="absolute -top-1.5 -right-1.5 bg-slate-950 text-[#D4E34A] text-[7px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                        Active
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="bg-slate-950 text-white rounded-2xl p-5 border border-slate-800 text-xs leading-relaxed flex items-start gap-3">
              <Award className="w-5 h-5 text-[#D4E34A] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-white mb-0.5">Analisis Lifecycle CRM:</h4>
                <p className="text-slate-400 text-[11px]">
                  Pelanggan <strong>{currentCustomer.name}</strong> saat ini berada di tahap <strong>"{pipelineStages[activeStageIdx].title}"</strong>. Tahapan dihitung secara dinamis dari kombinasi jumlah order servis ({currentCustomer.orders} kali) dan keaktifan stamps loyalitas member.
                </p>
              </div>
            </div>
          </div>

          {/* Activity Logs & Live Whatsapp Feed Mockup */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Live Message Outbox Feed */}
            <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4">
              <h3 className="font-black text-slate-900 text-sm border-b border-slate-100 pb-3 flex items-center gap-2">
                <MessageSquare className="w-4.5 h-4.5 text-slate-400" />
                <span>Log Aktivitas Otomatisasi (Outbox CRM)</span>
              </h3>

              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1 text-xs">
                {whatsappLogs.map((log) => (
                  <div key={log.id} className="p-3 bg-slate-50 border border-slate-100 rounded-2xl flex gap-3 text-left">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                      log.type === 'Email' ? 'bg-indigo-50 text-indigo-600' : 'bg-emerald-50 text-emerald-600'
                    }`}>
                      {log.type === 'Email' ? <Mail className="w-4 h-4" /> : <MessageSquare className="w-4 h-4" />}
                    </div>
                    <div className="space-y-0.5 leading-relaxed">
                      <div className="flex justify-between items-center gap-4">
                        <span className="font-bold text-slate-900">Kirim ke: {log.to}</span>
                        <span className="text-[9px] text-slate-400">{log.date}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 leading-normal">{log.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Explanatory tips */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-sm text-xs text-left space-y-4">
              <h4 className="font-bold text-white border-b border-slate-800 pb-2 flex items-center gap-1.5">
                <Bell className="w-4 h-4 text-[#D4E34A]" />
                <span>Bagaimana CRM Bekerja?</span>
              </h4>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                Sistem CRM Bengkel memantau database interaksi pelanggan secara berkelanjutan. Ketika sensor kilometer kendaraan atau tanggal jatuh tempo STNK tercapai di sistem, server otomatis menjadwalkan pengiriman notifikasi WhatsApp tanpa campur tangan Admin bengkel.
              </p>
              <div className="bg-slate-950 rounded-xl p-3 border border-slate-850 text-[10px] text-slate-500 flex items-start gap-2">
                <AlertTriangle className="w-4.5 h-4.5 shrink-0 text-amber-500 mt-0.5" />
                <span>Simulasi terhubung penuh ke state customer terpilih. Coba ubah customer di header untuk melihat detail tujuan outbox berganti nama!</span>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* --- AUTOMATION TRIGGERS CONTROL PANEL --- */}
      {activeTab === 'automation' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6 animate-in fade-in duration-200">
          <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
            <h3 className="font-black text-slate-900 text-sm flex items-center gap-2">
              <RefreshCw className="w-4.5 h-4.5 text-slate-400" />
              <span>10 Jalur Triggers CRM Otomatis</span>
            </h3>
            <span className="text-[10px] bg-slate-50 text-slate-500 px-2.5 py-1 rounded font-bold border border-slate-100">
              WhatsApp & Email Channels
            </span>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">
            Klik tombol <strong>"Kirim Simulasi"</strong> di bawah untuk memicu skenario otomatisasi CRM. Pesan notifikasi akan langsung terkirim ke panel dashboard pelanggan ini dan outbox log di atas.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {automationCampaigns.map((camp) => (
              <div
                key={camp.id}
                className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex flex-col justify-between gap-4 text-xs hover:bg-slate-100/50 transition-colors"
              >
                <div className="space-y-1.5 text-left">
                  <div className="flex justify-between items-center gap-2">
                    <span className="bg-slate-900 text-white text-[9px] font-black px-2 py-0.5 rounded-md">
                      Trigger #{camp.num}
                    </span>
                    <span className="text-[9px] font-bold text-[#A8B330]">{camp.channel}</span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">{camp.title}</h4>
                  <p className="text-[10px] text-slate-400 leading-normal">
                    <strong className="text-slate-500">Kondisi Pemicu:</strong> {camp.trigger}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200/50 flex items-center justify-between gap-4">
                  <span className="text-[9px] text-slate-400 font-semibold truncate max-w-[150px]">
                    Message preview: {camp.message.substr(0, 30)}...
                  </span>
                  
                  <button
                    onClick={() => handleTriggerCampaign(camp)}
                    className="bg-slate-950 text-white hover:bg-[#D4E34A] hover:text-slate-950 font-bold px-3 py-2 rounded-xl text-[10px] transition-all flex items-center gap-1 shrink-0"
                  >
                    <Send className="w-3 h-3" />
                    <span>Kirim Simulasi</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
