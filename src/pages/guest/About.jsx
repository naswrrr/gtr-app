import React from 'react';
import { ShieldCheck, Award, Zap, Heart, Check, Users, Shield } from 'lucide-react';

export default function About() {
  const coreValues = [
    { title: 'Transparansi Penuh', desc: 'Kami menjamin tidak ada biaya siluman. Semua detail sparepart, jasa, dan estimasi waktu disetujui pelanggan sebelum dikerjakan.', icon: ShieldCheck },
    { title: 'Teknisi Tersertifikasi', desc: 'Seluruh tim mekanik kami memiliki sertifikat keahlian nasional dan dilatih khusus menangani teknologi kendaraan modern.', icon: Award },
    { title: 'Efisiensi Waktu', desc: 'Dengan sistem booking online presisi dan pemantauan live tracking, kami menghargai waktu berharga Anda.', icon: Zap },
    { title: 'Kepedulian CRM', desc: 'Kami memantau riwayat kendaraan secara berkelanjutan untuk memberikan solusi pencegahan kerusakan sejak dini.', icon: Heart },
  ];

  const mechanics = [
    { name: 'Andi Wijaya', role: 'Senior Engine Master', certs: ['ASE Certified Master Tech', 'Toyota Diagnostic Specialist'], exp: '12 Tahun Pengalaman', avatar: 'AW' },
    { name: 'Budi Santoso', role: 'Chief Electrical Inspector', certs: ['ECU Tuning Expert', 'Hybrid & EV Certified'], exp: '9 Tahun Pengalaman', avatar: 'BS' },
    { name: 'Eko Prasetyo', role: 'AC & Cooling System Expert', certs: ['Denso Certified Tech', 'HVAC Specialist'], exp: '7 Tahun Pengalaman', avatar: 'EP' },
    { name: 'Rian Hidayat', role: 'Under-carriage & Alignment Master', certs: ['Suspension Tuning Pro', 'Michelin Tire Specialist'], exp: '8 Tahun Pengalaman', avatar: 'RH' },
  ];

  const timelineSteps = [
    { year: '2018', title: 'Awal Pendirian', desc: 'FixFlow didirikan sebagai bengkel spesialis mesin kecil di Tangerang dengan 3 orang mekanik.' },
    { year: '2020', title: 'Transformasi Digital', desc: 'Meluncurkan sistem booking internal pertama kali untuk mengurai antrean antrean fisik di bengkel.' },
    { year: '2023', title: 'Platform CRM & Ekspansi', desc: 'Membuat teknologi CRM terintegrasi WhatsApp reminder dan sistem loyalty poin untuk member setia.' },
    { year: '2026', title: 'Bengkel Ekosistem Modern', desc: 'Mengadopsi pemantauan IoT, live tracking servis, dan menjadi rujukan utama startup otomotif nasional.' },
  ];

  return (
    <div className="w-full bg-slate-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* --- TITLE / INTRO --- */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="text-xs font-black text-[#A8B330] uppercase tracking-wider">Mengenal FixFlow</span>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none my-0">
            Membawa Perawatan Otomotif <br/>
            Ke Level Berikutnya
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed pt-2">
            FixFlow didirikan atas satu visi sederhana: mengubah cara orang merawat kendaraannya menjadi lebih transparan, mudah, dan terpercaya dengan sentuhan teknologi modern.
          </p>
        </div>

        {/* --- GRID PROFILE BENGKEL --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-white rounded-[3rem] p-8 sm:p-12 border border-slate-100 shadow-sm">
          <div className="space-y-6 text-left">
            <h2 className="text-2xl font-black text-slate-950">Cerita Kami</h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              Kami menyadari keluhan terbesar pemilik kendaraan adalah kurangnya transparansi biaya dan ketidakpastian status servis. Seringkali pelanggan harus menunggu berjam-jam tanpa mengetahui apa yang sedang dilakukan pada kendaraannya.
            </p>
            <p className="text-xs text-slate-500 leading-relaxed">
              Itulah mengapa kami merancang FixFlow. Kami bukan hanya sekadar bengkel dengan deretan alat canggih. Kami membangun ekosistem digital (CRM) di mana data histori servis, penggunaan sparepart, tanggal garansi, hingga status pengerjaan real-time diintegrasikan secara transparan. Pelanggan memegang kendali penuh atas kendaraan mereka.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="flex gap-2.5 items-center text-xs font-bold text-slate-800">
                <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>Oli & Suku Cadang Asli</span>
              </div>
              <div className="flex gap-2.5 items-center text-xs font-bold text-slate-800">
                <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>Mekanik Bersertifikat</span>
              </div>
              <div className="flex gap-2.5 items-center text-xs font-bold text-slate-800">
                <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>Garansi Pengerjaan</span>
              </div>
              <div className="flex gap-2.5 items-center text-xs font-bold text-slate-800">
                <Check className="w-5 h-5 text-emerald-500 shrink-0" />
                <span>Teknologi CRM Live</span>
              </div>
            </div>
          </div>
          
          <div className="bg-slate-950 rounded-[2.5rem] p-8 border border-slate-800 text-left relative overflow-hidden min-h-[320px] flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#D4E34A]/10 rounded-full blur-3xl" />
            
            <div className="space-y-4">
              <span className="text-[10px] font-bold text-[#D4E34A] uppercase tracking-widest">Visi Kami</span>
              <h3 className="text-xl font-black text-white leading-normal">Menjadi jaringan bengkel modern berbasis CRM terbesar dan paling transparan di Asia Tenggara.</h3>
            </div>

            <div className="border-t border-slate-900 pt-6 mt-6 space-y-4">
              <span className="text-[10px] font-bold text-[#D4E34A] uppercase tracking-widest block">Misi Kami</span>
              <ul className="space-y-2 text-xs text-slate-400">
                <li className="flex gap-2 items-start">
                  <span className="text-[#D4E34A]">•</span>
                  <span>Menggunakan teknologi digital untuk mengeliminasi asimetri informasi antara montir dan pelanggan.</span>
                </li>
                <li className="flex gap-2 items-start">
                  <span className="text-[#D4E34A]">•</span>
                  <span>Secara berkelanjutan meningkatkan kompetensi teknis mekanik melalui program pelatihan sertifikasi berkala.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* --- CORE VALUES --- */}
        <div className="space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-black text-slate-950">Nilai-Nilai Utama Kami</h2>
            <p className="text-slate-400 text-xs max-w-lg mx-auto">Kami berpegang teguh pada prinsip utama untuk memastikan kenyamanan Anda.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div key={idx} className="bg-white border border-slate-100 p-6 rounded-3xl text-left shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-2xl bg-slate-50 text-[#A8B330] flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">{val.title}</h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">{val.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* --- HISTORICAL TIMELINE --- */}
        <div className="space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-black text-slate-950">Timeline Sejarah</h2>
            <p className="text-slate-400 text-xs max-w-lg mx-auto">Perjalanan kami membangun kualitas tepercaya dari waktu ke waktu.</p>
          </div>

          <div className="relative border-l-2 border-slate-200 ml-4 md:ml-0 md:border-l-0 md:grid md:grid-cols-4 md:gap-8 text-left pl-6 md:pl-0">
            {timelineSteps.map((step, idx) => (
              <div key={idx} className="relative pb-8 md:pb-0">
                {/* Connector dot */}
                <div className="absolute -left-[33px] top-0.5 md:-left-4 md:-top-4 w-4 h-4 rounded-full bg-[#D4E34A] border-4 border-white shadow-sm z-10" />
                
                <div className="space-y-2 md:pt-4">
                  <span className="font-black text-[#A8B330] text-lg">{step.year}</span>
                  <h4 className="font-bold text-slate-900 text-sm">{step.title}</h4>
                  <p className="text-xs text-slate-500 leading-normal">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- TIM MEKANIK --- */}
        <div className="space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-black text-[#A8B330] uppercase tracking-wider">Tenaga Ahli Berpengalaman</span>
            <h2 className="text-2xl font-black text-slate-950">Tim Mekanik Tersertifikasi</h2>
            <p className="text-slate-400 text-xs max-w-lg mx-auto">Kendaraan Anda berada di tangan yang tepat. Kenali teknisi utama kami.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mechanics.map((mec, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm text-left flex flex-col justify-between hover:scale-[1.01] transition-transform">
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-black text-lg shadow-sm">
                    {mec.avatar}
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm mt-4">{mec.name}</h3>
                  <p className="text-[10px] text-[#A8B330] font-black uppercase tracking-wider mt-0.5">{mec.role}</p>
                  <p className="text-[10px] text-slate-400 font-semibold mt-1">{mec.exp}</p>
                  
                  <div className="mt-4 pt-4 border-t border-slate-50 space-y-1.5">
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Sertifikasi:</span>
                    {mec.certs.map((c, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[10px] text-slate-600 font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        {c}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- SERTIFIKASI & AFILIASI --- */}
        <div className="space-y-12 pt-8 border-t border-slate-100">
          <div className="text-center space-y-2">
            <h2 className="text-xl font-black text-slate-950">Sertifikasi & Mitra Resmi</h2>
            <p className="text-slate-400 text-xs max-w-md mx-auto">Kami diakui secara profesional dan berafiliasi dengan brand suku cadang terkemuka.</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all">
            <div className="flex items-center gap-2 font-black text-slate-800 text-sm">
              <Shield className="w-8 h-8 text-[#A8B330]" />
              <span>ISO 9001:2015 CERTIFIED</span>
            </div>
            <div className="font-black text-slate-800 text-sm tracking-widest">
              DENSO <span className="text-[#A8B330]">PARTNER</span>
            </div>
            <div className="font-black text-slate-800 text-sm tracking-widest">
              MICHELIN <span className="text-[#A8B330]">AUTHORIZED</span>
            </div>
            <div className="font-black text-slate-800 text-sm tracking-widest">
              SHELL <span className="text-[#A8B330]">HELIX</span> OIL
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
