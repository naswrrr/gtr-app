import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tag, Clock, CheckCircle, Copy, Check, Filter, Calendar } from 'lucide-react';
import { toast } from 'sonner';

export default function Promos() {
  const navigate = useNavigate();
  const [copiedCode, setCopiedCode] = useState(null);
  const [activeFilter, setActiveFilter] = useState('Semua');

  // Timer states
  const [timeLeft, setTimeLeft] = useState({ days: 4, hours: 8, minutes: 15, seconds: 32 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return { days: 7, hours: 0, minutes: 0, seconds: 0 }; // reset
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success(`Kode voucher ${code} berhasil disalin!`);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const promosList = [
    {
      code: 'FIXFLASHOil',
      title: 'Flash Sale Ganti Oli Shell',
      desc: 'Diskon langsung Rp 50.000 untuk ganti oli mesin Shell Helix Ultra/HX8. Gratis kuras filter oli.',
      badge: 'Potongan Rp 50k',
      type: 'Oli',
      validUntil: '30 Juni 2026',
      featured: true,
      countdown: true
    },
    {
      code: 'FIXBDAYSPECIAL',
      title: 'Voucher Ulang Tahun Pelanggan',
      desc: 'Diskon 20% tanpa minimum transaksi untuk seluruh pengerjaan jasa servis di bulan ulang tahun Anda.',
      badge: 'Diskon 20%',
      type: 'Ulang Tahun',
      validUntil: 'Selamanya (Bulan Lahir)',
      featured: false,
      countdown: false
    },
    {
      code: 'FIXLOYAL50',
      title: 'Loyal Customer Service Reward',
      desc: 'Potongan Rp 50.000 untuk pelanggan setia yang telah servis di FixFlow sebanyak 5 kali.',
      badge: 'Cashback Rp 50k',
      type: 'Loyalty',
      validUntil: '31 Des 2026',
      featured: false,
      countdown: false
    },
    {
      code: 'FIXTUNEUP15',
      title: 'Promo Paket Tune Up + Gurah Mesin',
      desc: 'Diskon 15% khusus pengerjaan paket Tune Up mesin bensin & Carbon Clean ruang bakar piston.',
      badge: 'Diskon 15%',
      type: 'Tune Up',
      validUntil: '25 Juni 2026',
      featured: true,
      countdown: true
    },
    {
      code: 'FIXNEW2026',
      title: 'Voucher Welcome Member Baru',
      desc: 'Potongan langsung Rp 25.000 untuk registrasi member pertama kali. Bisa digunakan untuk seluruh jasa.',
      badge: 'Potongan Rp 25k',
      type: 'Umum',
      validUntil: '31 Des 2026',
      featured: false,
      countdown: false
    }
  ];

  const filters = ['Semua', 'Featured', 'Oli', 'Tune Up', 'Loyalty', 'Ulang Tahun'];

  const filteredPromos = promosList.filter(promo => {
    if (activeFilter === 'Semua') return true;
    if (activeFilter === 'Featured') return promo.featured;
    return promo.type === activeFilter;
  });

  return (
    <div className="w-full bg-slate-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* --- TITLE --- */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-black text-[#A8B330] uppercase tracking-wider">Promo & Penawaran CRM</span>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none my-0">Voucher & Penawaran Spesial</h1>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed pt-2">
            Manfaatkan berbagai diskon jasa dan penawaran suku cadang dari CRM FixFlow. Salin kode voucher dan masukkan saat melakukan pemesanan servis online.
          </p>
        </div>

        {/* --- DYNAMIC CAMPAIGN BANNER (COUNTDOWN) --- */}
        <div className="bg-slate-950 text-white rounded-[3rem] p-8 sm:p-12 border border-slate-900 shadow-2xl relative overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-8 items-center max-w-5xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950 to-indigo-950/20" />
          <div className="absolute -left-20 -top-20 w-80 h-80 bg-[#D4E34A] rounded-full blur-[100px] opacity-10" />

          <div className="space-y-6 text-left relative z-10">
            <span className="bg-[#D4E34A] text-slate-950 text-[10px] font-black uppercase px-2.5 py-1 rounded-full shadow-sm">Featured Campaign</span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
              Pesta Gajian Otomotif: <br className="hidden sm:block" />
              Ganti Oli Shell Hemat Rp 50.000!
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              Dapatkan potongan harga khusus untuk oli mesin sintetik Shell. Pengerjaan cepat hanya 30 menit, ditangani langsung oleh montir profesional. Kode voucher: <strong>FIXFLASHOil</strong>.
            </p>
            
            <div className="pt-2">
              <button
                onClick={() => handleCopy('FIXFLASHOil')}
                className="bg-[#D4E34A] text-slate-950 hover:bg-[#C5D33A] hover:scale-[1.01] active:scale-95 transition-all text-xs font-black px-6 py-3 rounded-xl shadow-md flex items-center gap-1.5"
              >
                {copiedCode === 'FIXFLASHOil' ? <Check className="w-4 h-4 text-slate-950" /> : <Copy className="w-4 h-4 text-slate-950" />}
                <span>{copiedCode === 'FIXFLASHOil' ? 'Tersalin!' : 'Salin Kode Voucher'}</span>
              </button>
            </div>
          </div>

          {/* Large Countdown widget */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 relative z-10 flex flex-col justify-center space-y-4">
            <div className="flex items-center gap-2 text-[#D4E34A] text-xs font-bold justify-center">
              <Clock className="w-4 h-4 text-[#D4E34A] animate-pulse" />
              <span>Promo Berakhir Dalam Waktu:</span>
            </div>
            
            <div className="flex gap-3 justify-center items-center">
              <div className="text-center">
                <span className="bg-slate-950 border border-slate-800 text-white font-black text-xl sm:text-2xl px-4 py-3 rounded-2xl block min-w-[54px]">{timeLeft.days}</span>
                <span className="text-[8px] text-slate-500 font-bold mt-1.5 block uppercase tracking-wider">Hari</span>
              </div>
              <span className="text-slate-800 font-black text-xl -mt-6">:</span>
              <div className="text-center">
                <span className="bg-slate-950 border border-slate-800 text-white font-black text-xl sm:text-2xl px-4 py-3 rounded-2xl block min-w-[54px]">{timeLeft.hours.toString().padStart(2, '0')}</span>
                <span className="text-[8px] text-slate-500 font-bold mt-1.5 block uppercase tracking-wider">Jam</span>
              </div>
              <span className="text-slate-800 font-black text-xl -mt-6">:</span>
              <div className="text-center">
                <span className="bg-slate-950 border border-slate-800 text-white font-black text-xl sm:text-2xl px-4 py-3 rounded-2xl block min-w-[54px]">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                <span className="text-[8px] text-slate-500 font-bold mt-1.5 block uppercase tracking-wider">Menit</span>
              </div>
              <span className="text-slate-800 font-black text-xl -mt-6">:</span>
              <div className="text-center">
                <span className="bg-slate-950 border border-slate-800 text-white font-black text-xl sm:text-2xl px-4 py-3 rounded-2xl block min-w-[54px]">{timeLeft.seconds.toString().padStart(2, '0')}</span>
                <span className="text-[8px] text-slate-500 font-bold mt-1.5 block uppercase tracking-wider">Detik</span>
              </div>
            </div>

            <div className="text-[10px] text-slate-500 font-bold text-center">
              *Berlaku hingga kuota harian habis. S&K Berlaku.
            </div>
          </div>
        </div>

        {/* --- FILTER CONTROL --- */}
        <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-sm flex flex-wrap gap-2 max-w-3xl mx-auto justify-center">
          <div className="flex items-center gap-1.5 text-slate-400 text-xs font-bold mr-2 px-3 border-r border-slate-100">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            Filter Promo:
          </div>
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeFilter === f
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* --- PROMO CARDS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {filteredPromos.map((promo, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-100 rounded-3xl p-6 text-left flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group"
            >
              {/* Promo type tag */}
              <div className="flex items-center justify-between mb-4">
                <span className="bg-[#D4E34A]/20 text-slate-950 text-[10px] font-black uppercase px-2.5 py-1 rounded-full border border-[#D4E34A]/30">
                  {promo.badge}
                </span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{promo.type}</span>
              </div>

              <div className="space-y-3 flex-1">
                <h3 className="font-black text-slate-900 text-base group-hover:text-[#A8B330] transition-colors">{promo.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{promo.desc}</p>
                <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold pt-2">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>Berlaku hingga: {promo.validUntil}</span>
                </div>
              </div>

              {/* Coupon Copy Box */}
              <div className="border-t border-slate-50 pt-4 mt-6 flex items-center justify-between gap-4">
                <div className="bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 text-xs font-black text-slate-700 tracking-wider">
                  {promo.code}
                </div>
                
                <button
                  onClick={() => handleCopy(promo.code)}
                  className="bg-slate-950 text-white hover:bg-[#D4E34A] hover:text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs transition-all flex items-center gap-1 shrink-0 active:scale-95"
                >
                  {copiedCode === promo.code ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Salin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* --- DYNAMIC REDIRECT CTA --- */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 max-w-4xl mx-auto border border-slate-800 text-center space-y-4">
          <h3 className="text-lg font-black text-white">Voucher Sudah Disalin? Lanjutkan Pemesanan</h3>
          <p className="text-xs text-slate-400 max-w-xl mx-auto">
            Gunakan kode voucher saat mengisi detail booking servis online untuk memotong estimasi biaya pengerjaan kendaraan Anda secara otomatis.
          </p>
          <button
            onClick={() => navigate('/customer/booking')}
            className="bg-[#D4E34A] text-slate-950 font-bold px-8 py-3 rounded-xl hover:bg-[#C5D33A] text-xs transition-all shadow-md inline-block"
          >
            Mulai Booking Servis Sekarang
          </button>
        </div>

      </div>
    </div>
  );
}
