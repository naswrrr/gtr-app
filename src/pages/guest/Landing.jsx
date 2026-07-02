import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCustomer } from '../../context/CustomerContext';
import { 
  Calendar, Wrench, Shield, CheckCircle, Star, Sparkles, 
  ArrowRight, Users, Award, TrendingUp, ChevronRight, Copy, Check,
  UserPlus, PlayCircle, ClipboardCheck, Zap
} from 'lucide-react';

export default function Landing() {
  const { customers } = useCustomer();
  const navigate = useNavigate();
  const [copiedCode, setCopiedCode] = useState(null);
  
  // Countdown Timer state
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 32, seconds: 45 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 24, minutes: 0, seconds: 0 }; // reset
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Calculate stats from JSON database
  const totalCustomersCount = customers.length || 150;
  const totalServicesDone = customers.reduce((acc, curr) => acc + (curr.orders || 0), 0) || 5800;
  const reviews = customers.filter(c => c.feedback && c.feedback.review).slice(0, 4);
  const averageRating = (customers.reduce((acc, curr) => acc + (curr.feedback?.rating || 0), 0) / customers.filter(c => c.feedback?.rating).length).toFixed(1) || "4.8";

  const coreServices = [
    { title: 'Service Berkala', price: 'Rp 250k - 800k', desc: 'Pengecekan 50+ titik vital kendaraan, kelistrikan, & ganti filter udara.', duration: '90 Menit' },
    { title: 'Tune Up Mesin', price: 'Rp 350k - 600k', desc: 'Gurah karbon ruang bakar, bersihkan injektor/karburator, & kalibrasi sensor.', duration: '60 Menit' },
    { title: 'Ganti Oli Premium', price: 'Rp 150k - 450k', desc: 'Pilihan oli sintetik berkualitas tinggi + gratis ganti filter oli.', duration: '30 Menit' },
    { title: 'Spooring & Balancing', price: 'Rp 175k - 300k', desc: 'Kalibrasi presisi sudut roda 3D + rotasi ban demi kenyamanan berkendara.', duration: '45 Menit' },
  ];

  return (
    <div className="w-full bg-slate-50">
      
      {/* --- HERO SECTION --- */}
      <section className="bg-slate-950 text-white py-20 lg:py-28 relative overflow-hidden">
        {/* Decorative subtle gradient background grids */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-indigo-900/30 via-slate-950 to-slate-950" />
        <div className="absolute -left-20 -top-20 w-80 h-80 bg-[#D4E34A] rounded-full blur-[100px] opacity-15" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-left">
            <div className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-full text-xs font-bold text-[#D4E34A]">
              <Sparkles className="w-4 h-4 animate-spin text-[#D4E34A]" />
              <span>FixFlow Automotive CRM Platform</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-none">
              Servis Mobil Lebih <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4E34A] to-[#A8B330]">
                Cerdas & Transparan
              </span>
            </h1>
            
            <p className="text-sm sm:text-base text-slate-400 max-w-xl leading-relaxed">
              Selamat datang di era baru perawatan otomotif. Pantau status pengerjaan secara real-time, nikmati garansi pengerjaan digital, kumpulkan poin loyalitas untuk diskon servis, dan dapatkan pengingat servis otomatis langsung ke WhatsApp Anda.
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/register"
                className="bg-[#D4E34A] text-slate-950 font-bold px-8 py-4 rounded-2xl hover:bg-[#C5D33A] hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-[#D4E34A]/20 flex items-center gap-2 text-sm"
              >
                <UserPlus className="w-4 h-4" />
                <span>Daftar Gratis Sekarang</span>
              </Link>
              <Link
                to="/login"
                className="bg-slate-900 border border-slate-800 text-white font-bold px-8 py-4 rounded-2xl hover:bg-slate-800 hover:text-white transition-all flex items-center gap-2 text-sm"
              >
                <span>Masuk ke Akun</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-900">
              <div>
                <div className="text-2xl font-black text-white">{totalCustomersCount}+</div>
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1">Pelanggan CRM</div>
              </div>
              <div>
                <div className="text-2xl font-black text-white">{totalServicesDone}+</div>
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1">Order Selesai</div>
              </div>
              <div>
                <div className="text-2xl font-black text-white">{averageRating} / 5.0</div>
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1">Rating Kepuasan</div>
              </div>
            </div>
          </div>

          {/* Interactive Promo Panel with Countdown */}
          <div className="bg-slate-900/80 backdrop-blur border border-slate-800 rounded-3xl p-6 sm:p-8 relative">
            <div className="absolute top-4 right-4 bg-[#D4E34A] text-slate-950 text-[10px] font-black uppercase px-2.5 py-1 rounded-full shadow-sm">
              Flash Deal
            </div>
            
            <div className="text-left space-y-4">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Promo Spesial Bulan Ini</span>
              <h3 className="text-xl sm:text-2xl font-black text-white">Super Tune-Up & Injector Cleansing</h3>
              <p className="text-xs text-slate-400 leading-normal">
                Maksimalkan efisiensi BBM dan kembalikan performa tarikan mesin kendaraan Anda. Diskon langsung Rp 100.000 + Gratis Fogging Kabin.
              </p>

              {/* Countdown Timer */}
              <div className="bg-slate-950/60 rounded-2xl p-4 border border-slate-800/50 flex items-center justify-between gap-4">
                <div className="text-left">
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block">Waktu Tersisa</span>
                  <span className="text-xs text-amber-500 font-bold">Berakhir Hari Ini!</span>
                </div>
                <div className="flex gap-2">
                  <div className="text-center">
                    <span className="bg-slate-800 text-white font-black text-lg px-3 py-2 rounded-xl block min-w-[42px]">{timeLeft.hours.toString().padStart(2, '0')}</span>
                    <span className="text-[8px] text-slate-500 font-bold mt-1 block uppercase">Jam</span>
                  </div>
                  <span className="text-slate-700 font-black text-xl self-center -mt-4">:</span>
                  <div className="text-center">
                    <span className="bg-slate-800 text-white font-black text-lg px-3 py-2 rounded-xl block min-w-[42px]">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                    <span className="text-[8px] text-slate-500 font-bold mt-1 block uppercase">Menit</span>
                  </div>
                  <span className="text-slate-700 font-black text-xl self-center -mt-4">:</span>
                  <div className="text-center">
                    <span className="bg-slate-800 text-white font-black text-lg px-3 py-2 rounded-xl block min-w-[42px]">{timeLeft.seconds.toString().padStart(2, '0')}</span>
                    <span className="text-[8px] text-slate-500 font-bold mt-1 block uppercase">Detik</span>
                  </div>
                </div>
              </div>

              {/* Copy Coupon Box */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex items-center justify-between gap-4">
                <div>
                  <span className="text-[9px] text-slate-500 font-bold uppercase block">Kode Voucher</span>
                  <span className="text-sm font-black text-[#D4E34A] tracking-wider">FLASHTUNE100</span>
                </div>
                <button
                  onClick={() => handleCopy('FLASHTUNE100')}
                  className="bg-slate-900 border border-slate-800 text-slate-300 hover:text-white px-3 py-2 rounded-xl flex items-center gap-1.5 text-xs font-bold transition-all"
                >
                  {copiedCode === 'FLASHTUNE100' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Salin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin Kode</span>
                    </>
                  )}
                </button>
              </div>

              <div className="pt-2">
                <Link
                  to="/customer/booking"
                  className="w-full bg-[#A8B330] hover:bg-[#8F9928] text-white py-3 px-4 rounded-xl text-xs font-bold transition-all shadow-md block text-center"
                >
                  Klaim & Booking Sekarang
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- STATISTIK LIVE CRM BENGKEL --- */}
      <section className="py-10 bg-white border-y border-slate-100 shadow-sm relative z-20 -mt-6 rounded-3xl max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div>
          <div className="text-slate-400 text-xl mb-1">🚗</div>
          <div className="text-2xl font-black text-slate-950">99.8%</div>
          <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">Suku Cadang Asli</p>
        </div>
        <div className="border-l border-slate-100">
          <div className="text-slate-400 text-xl mb-1">🛠️</div>
          <div className="text-2xl font-black text-slate-950">15+</div>
          <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">Mekanik Tersertifikasi</p>
        </div>
        <div className="border-l border-slate-100">
          <div className="text-slate-400 text-xl mb-1">📅</div>
          <div className="text-2xl font-black text-slate-950">07.00 - 17.00</div>
          <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">Layanan 6 Hari Seminggu</p>
        </div>
        <div className="border-l border-slate-100">
          <div className="text-slate-400 text-xl mb-1">🎁</div>
          <div className="text-2xl font-black text-slate-950">Rp 10rb = 1 Poin</div>
          <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">Loyalty Poin Reward</p>
        </div>
      </section>

      {/* --- LAYANAN BENGKEL --- */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
        <div className="space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-black text-[#A8B330] uppercase tracking-wider">Pilihan Servis Terbaik</span>
          <h2 className="text-3xl font-black tracking-tight text-slate-950">Layanan Spesialisasi Kami</h2>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            Semua tipe pengerjaan ditangani oleh mekanik profesional berlisensi dengan estimasi waktu dan harga transparan yang bisa Anda pantau langsung dari aplikasi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreServices.map((service, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm text-left flex flex-col justify-between hover:shadow-md hover:scale-[1.01] transition-all group"
            >
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-2xl bg-slate-50 flex items-center justify-center font-bold text-slate-800 text-sm group-hover:bg-[#D4E34A] group-hover:text-slate-950 transition-colors">
                  0{idx + 1}
                </div>
                <h3 className="font-bold text-slate-900 text-base">{service.title}</h3>
                <p className="text-xs text-slate-400 leading-normal">{service.desc}</p>
              </div>

              <div className="pt-6 border-t border-slate-50 mt-6 flex items-center justify-between text-xs font-bold">
                <div>
                  <div className="text-slate-400 text-[10px] uppercase font-medium">Mulai Dari</div>
                  <div className="text-slate-950 font-black text-sm">{service.price.split(' - ')[0]}</div>
                </div>
                <div className="text-right">
                  <div className="text-slate-400 text-[10px] uppercase font-medium">Estimasi Waktu</div>
                  <div className="text-[#A8B330]">{service.duration}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div>
          <Link
            to="/layanan"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 bg-white border border-slate-200 px-6 py-3 rounded-xl hover:bg-slate-50 transition-all shadow-sm"
          >
            <span>Seluruh Katalog Layanan</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* --- KEUNGGULAN CRM BENGKEL --- */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 text-left">
            <span className="text-xs font-black text-[#D4E34A] uppercase tracking-wider">Kenapa Harus FixFlow?</span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-tight">
              Bengkel Konvensional <br className="hidden sm:block"/>
              Berbasis CRM Modern
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Kami memadukan kualitas mekanik bengkel resmi dengan teknologi CRM termutakhir untuk memberikan pengalaman servis yang sepenuhnya transparan, cepat, dan nyaman.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 shrink-0 bg-slate-800 rounded-xl flex items-center justify-center text-[#D4E34A]">
                  <Wrench className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Live Tracking Status Servis</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-normal">Pantau setiap tahapan servis dari status Booking, Pembongkaran, Menunggu Sparepart, hingga QC langsung di HP Anda.</p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 shrink-0 bg-slate-800 rounded-xl flex items-center justify-center text-[#D4E34A]">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Garansi Servis Terikat di Database</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-normal">Kwitansi dan tanggal klaim garansi tersimpan rapi di sistem digital. Hilang kertas servis bukan lagi masalah.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 shrink-0 bg-slate-800 rounded-xl flex items-center justify-center text-[#D4E34A]">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Loyalty Poin & Reward Voucher</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-normal">Kumpulkan poin dari setiap kelipatan transaksi servis. Tukarkan poin dengan voucher potongan harga atau oli gratis.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            {/* Visual simulation box for CRM Notification mockup */}
            <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl" />
              
              <div className="flex items-center justify-between border-b border-slate-900 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">💬</div>
                  <div>
                    <h5 className="font-bold text-xs text-white">FixFlow Automation</h5>
                    <p className="text-[9px] text-slate-500 font-semibold uppercase tracking-wider">WhatsApp Reminder Engine</p>
                  </div>
                </div>
                <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full">Active</span>
              </div>

              {/* Chat Bubble 1 */}
              <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-4 space-y-2 text-left relative max-w-[85%]">
                <span className="text-[8px] text-slate-500 font-bold absolute right-3 top-2">10.00 AM</span>
                <span className="text-[9px] font-bold text-[#D4E34A] block">Reminder Ganti Oli</span>
                <p className="text-[11px] text-slate-300 leading-normal">
                  Halo Kak Mark, oli mesin Honda Civic Anda terakhir diganti 6 bulan lalu. Waktunya perawatan berkala demi performa maksimal. Yuk booking servis hari ini!
                </p>
              </div>

              {/* Chat Bubble 2 */}
              <div className="bg-slate-900 border border-slate-800/80 rounded-2xl p-4 space-y-2 text-left relative max-w-[85%] ml-auto border-l-4 border-l-[#D4E34A]">
                <span className="text-[8px] text-slate-500 font-bold absolute right-3 top-2">10.05 AM</span>
                <span className="text-[9px] font-bold text-[#D4E34A] block">Customer Feedback</span>
                <p className="text-[11px] text-slate-300 leading-normal">
                  Terima kasih konfirmasinya! Saya sudah klik link booking untuk hari Sabtu jam 09.00 pagi.
                </p>
                <div className="flex gap-1 items-center pt-1 text-[9px] text-emerald-400 font-bold">
                  <CheckCircle className="w-3.5 h-3.5" />
                  <span>Jadwal Booking Terkonfirmasi Otomatis</span>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-2xl p-4 border border-dashed border-slate-800 text-center text-xs text-slate-500">
                Pesan otomasi CRM dikirim tepat waktu sesuai sensor KM kendaraan dan riwayat pengerjaan terakhir.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- TESTIMONI REAL DARI DATABASE --- */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
        <div className="space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-black text-[#A8B330] uppercase tracking-wider">Testimoni Pelanggan</span>
          <h2 className="text-3xl font-black tracking-tight text-slate-950">Apa Kata Mereka Tentang Kami?</h2>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            Kepuasan pelanggan adalah prioritas utama kami. Ulasan di bawah ini diambil secara real-time dari data survei kepuasan pelanggan CRM FixFlow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm text-left flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex gap-1 text-amber-400">
                  {[...Array(review.feedback.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-500 italic leading-relaxed">
                  "{review.feedback.review}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-6 border-t border-slate-50 mt-6">
                <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
                  {review.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-xs">{review.name}</h4>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mt-0.5">{review.tier} Member</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- CARA KERJA / HOW IT WORKS --- */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 max-w-2xl mx-auto mb-16">
            <span className="text-xs font-black text-[#A8B330] uppercase tracking-wider">Mudah & Cepat</span>
            <h2 className="text-3xl font-black tracking-tight text-slate-950">Cara Kerja FixFlow</h2>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Mulai dari mendaftar hingga kendaraan Anda selesai diservis — semua hanya dalam 3 langkah sederhana.
            </p>
          </div>

          <div className="relative">
            {/* Connector line (desktop only) */}
            <div className="hidden lg:block absolute top-[52px] left-[calc(16.67%+2rem)] right-[calc(16.67%+2rem)] h-0.5 bg-gradient-to-r from-[#D4E34A] via-slate-200 to-[#D4E34A]" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative z-10">
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="relative">
                  <div className="w-24 h-24 rounded-3xl bg-[#D4E34A] flex items-center justify-center shadow-lg shadow-[#D4E34A]/30">
                    <UserPlus className="w-10 h-10 text-slate-950" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-slate-950 text-white text-xs font-black flex items-center justify-center border-2 border-white shadow-sm">
                    1
                  </span>
                </div>
                <div className="space-y-2">
                  <h3 className="font-black text-slate-900 text-lg">Daftar Akun Member</h3>
                  <p className="text-slate-400 text-xs leading-relaxed max-w-xs mx-auto">
                    Buat akun member FixFlow secara gratis. Lengkapi profil kendaraan Anda dan dapatkan voucher selamat datang senilai Rp 50.000.
                  </p>
                </div>
                <Link
                  to="/register"
                  className="text-xs font-bold text-[#A8B330] hover:underline flex items-center gap-1"
                >
                  Daftar Sekarang <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="relative">
                  <div className="w-24 h-24 rounded-3xl bg-slate-900 flex items-center justify-center shadow-lg">
                    <ClipboardCheck className="w-10 h-10 text-[#D4E34A]" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#D4E34A] text-slate-950 text-xs font-black flex items-center justify-center border-2 border-white shadow-sm">
                    2
                  </span>
                </div>
                <div className="space-y-2">
                  <h3 className="font-black text-slate-900 text-lg">Booking Servis Online</h3>
                  <p className="text-slate-400 text-xs leading-relaxed max-w-xs mx-auto">
                    Pilih jenis layanan, pilih jadwal yang tersedia, dan konfirmasi booking hanya dalam hitungan menit. Tidak perlu antre di bengkel.
                  </p>
                </div>
                <Link
                  to="/customer/booking"
                  className="text-xs font-bold text-[#A8B330] hover:underline flex items-center gap-1"
                >
                  Lihat Jadwal <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="relative">
                  <div className="w-24 h-24 rounded-3xl bg-slate-100 border-2 border-slate-200 flex items-center justify-center shadow-sm">
                    <Zap className="w-10 h-10 text-[#A8B330]" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-slate-900 text-white text-xs font-black flex items-center justify-center border-2 border-white shadow-sm">
                    3
                  </span>
                </div>
                <div className="space-y-2">
                  <h3 className="font-black text-slate-900 text-lg">Pantau & Kumpulkan Poin</h3>
                  <p className="text-slate-400 text-xs leading-relaxed max-w-xs mx-auto">
                    Pantau status servis secara real-time via dashboard. Setiap transaksi memberikan Loyalty Poin yang bisa ditukarkan dengan diskon atau layanan gratis.
                  </p>
                </div>
                <Link
                  to="/customer/loyalty"
                  className="text-xs font-bold text-[#A8B330] hover:underline flex items-center gap-1"
                >
                  Lihat Program Loyalitas <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- PAKET MEMBER / PRICING --- */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 max-w-2xl mx-auto mb-16">
            <span className="text-xs font-black text-[#A8B330] uppercase tracking-wider">Pilih Paket Anda</span>
            <h2 className="text-3xl font-black tracking-tight text-slate-950">Paket Keanggotaan Member</h2>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Bergabunglah sebagai member FixFlow dan nikmati berbagai keuntungan eksklusif yang dirancang untuk menghemat waktu dan biaya servis Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {/* Paket Basic */}
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 flex flex-col space-y-6 hover:shadow-md transition-shadow">
              <div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-3">Paket Basic</span>
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-black text-slate-950">Gratis</span>
                </div>
                <p className="text-xs text-slate-400 mt-2">Untuk pelanggan baru yang ingin merasakan layanan FixFlow.</p>
              </div>
              <ul className="space-y-3 flex-1">
                {['Akses dashboard member', 'Booking servis online', 'Riwayat servis digital', 'Notifikasi servis via WA', 'Voucher selamat datang Rp 50rb'].map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-xs text-slate-600">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/register"
                className="w-full text-center bg-white border border-slate-300 text-slate-900 font-bold py-3 rounded-2xl hover:bg-slate-100 transition-all text-sm"
              >
                Daftar Gratis
              </Link>
            </div>

            {/* Paket Premium (highlighted) */}
            <div className="bg-slate-950 rounded-3xl p-8 border border-slate-900 flex flex-col space-y-6 shadow-2xl shadow-slate-950/20 relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-[#D4E34A] text-slate-950 text-[9px] font-black uppercase px-2.5 py-1 rounded-full">
                Terpopuler
              </div>
              <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-[#D4E34A]/10 rounded-full blur-3xl" />
              <div className="relative z-10">
                <span className="text-[10px] font-black text-[#D4E34A] uppercase tracking-widest block mb-3">Paket Premium</span>
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-black text-white">Rp 99rb</span>
                  <span className="text-slate-400 text-xs mb-1.5">/bulan</span>
                </div>
                <p className="text-xs text-slate-400 mt-2">Untuk pelanggan setia yang ingin keuntungan maksimal.</p>
              </div>
              <ul className="space-y-3 flex-1 relative z-10">
                {[
                  'Semua fitur Basic',
                  'Poin loyalitas 2x lipat',
                  'Prioritas antrian servis',
                  'Diskon sparepart hingga 10%',
                  'Garansi servis diperpanjang',
                  'Laporan kesehatan kendaraan bulanan',
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <CheckCircle className="w-4 h-4 text-[#D4E34A] shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/register"
                className="w-full text-center bg-[#D4E34A] text-slate-950 font-bold py-3 rounded-2xl hover:bg-[#C5D33A] transition-all text-sm relative z-10"
              >
                Mulai Premium
              </Link>
            </div>

            {/* Paket Bisnis */}
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 flex flex-col space-y-6 hover:shadow-md transition-shadow">
              <div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-3">Paket Bisnis</span>
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-black text-slate-950">Custom</span>
                </div>
                <p className="text-xs text-slate-400 mt-2">Untuk armada kendaraan perusahaan dengan kebutuhan khusus.</p>
              </div>
              <ul className="space-y-3 flex-1">
                {[
                  'Semua fitur Premium',
                  'Manajemen multi-kendaraan',
                  'Laporan bulanan armada',
                  'Account Manager dedicared',
                  'Integrasi API & invoice',
                ].map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-xs text-slate-600">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="mailto:support@fixflow.co.id"
                className="w-full text-center bg-white border border-slate-300 text-slate-900 font-bold py-3 rounded-2xl hover:bg-slate-100 transition-all text-sm"
              >
                Hubungi Kami
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA DOWNLOAD / DOWNLOAD VOUCHER BANNER --- */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-950 text-white rounded-[3.5rem] p-8 sm:p-12 lg:p-16 relative overflow-hidden text-center lg:text-left grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-slate-900 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950 to-[#A8B330]/15" />
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[#D4E34A] rounded-full blur-[100px] opacity-10" />
          
          <div className="lg:col-span-8 space-y-4 relative z-10">
            <span className="text-xs font-black text-[#D4E34A] uppercase tracking-wider">Penawaran Eksklusif Pelanggan Baru</span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-tight">
              Belum Pernah Servis di FixFlow? <br/>
              Klaim Voucher Selamat Datang Rp 50.000!
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl leading-relaxed">
              Daftarkan diri Anda sebagai member FixFlow sekarang dan dapatkan voucher potongan langsung Rp 50.000 untuk transaksi servis pertama Anda. Poin loyalitas perdana akan langsung ditambahkan ke akun Anda!
            </p>
          </div>

          <div className="lg:col-span-4 relative z-10 w-full flex flex-col items-center lg:items-end gap-4">
            <Link
              to="/customer/booking"
              className="w-full lg:w-auto bg-[#D4E34A] text-slate-950 hover:bg-[#C5D33A] hover:scale-[1.02] active:scale-95 transition-all text-sm font-bold px-8 py-4 rounded-2xl shadow-lg text-center"
            >
              Klaim Voucher & Booking
            </Link>
            <Link
              to="/promo"
              className="text-xs font-semibold text-slate-400 hover:text-white underline transition-colors"
            >
              Lihat Syarat & Ketentuan Voucher
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
