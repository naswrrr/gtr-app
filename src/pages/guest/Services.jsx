import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Clock, BadgeDollarSign, ChevronRight, Sparkles, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function Services() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [loading, setLoading] = useState(false);

  const categories = ['Semua', 'Mesin', 'Kaki-kaki', 'AC & Kabin', 'Kelistrikan', 'Servis Berkala'];

  const servicesData = [
    {
      id: 'srv-berkala',
      name: 'Service Berkala (10k - 50k KM)',
      category: 'Servis Berkala',
      desc: 'Pengecekan komprehensif 50+ titik mesin, rem, suspensi, lampu, kelistrikan, pembersihan filter udara, serta uji emisi gas buang.',
      price: 'Rp 250.000 - Rp 600.000',
      duration: '90 Menit',
      parts: 'Filter Udara, Filter AC, Busi (bila aus)'
    },
    {
      id: 'srv-tuneup',
      name: 'Tune Up Mesin & Carbon Clean',
      category: 'Mesin',
      desc: 'Pembersihan kerak karbon di dalam ruang bakar piston, throttle body, injector cleansing, dan penyetelan ulang sensor sistem injeksi bahan bakar.',
      price: 'Rp 350.000 - Rp 500.000',
      duration: '60 Menit',
      parts: 'Carbon Cleaner Fluid, Injector Cleaner'
    },
    {
      id: 'srv-oli',
      name: 'Ganti Oli Premium & Filter',
      category: 'Umum',
      desc: 'Penggantian pelumas mesin menggunakan oli sintetik berstandar SAE resmi (Shell Helix / Castrol) + penggantian filter oli untuk menyaring kotoran logam.',
      price: 'Rp 150.000 - Rp 450.000',
      duration: '30 Menit',
      parts: 'Oli Mesin Sintetis, Filter Oli Baru'
    },
    {
      id: 'srv-spooring',
      name: 'Spooring 3D Presisi',
      category: 'Kaki-kaki',
      desc: 'Penyetelan sudut roda kendaraan (camber, caster, toe) menggunakan komputer sensor 3D presisi agar setir stabil dan ban tidak aus sebelah.',
      price: 'Rp 150.000 - Rp 250.000',
      duration: '45 Menit',
      parts: 'Tidak membutuhkan sparepart tambahan'
    },
    {
      id: 'srv-balancing',
      name: 'Balancing Roda & Rotasi',
      category: 'Kaki-kaki',
      desc: 'Penyeimbangan berat putaran ban dengan memasang timbal pemberat pada velg + rotasi silang 4 roda untuk memastikan keausan ban merata.',
      price: 'Rp 75.000 - Rp 150.000',
      duration: '30 Menit',
      parts: 'Timbal Pemberat Velg'
    },
    {
      id: 'srv-ac',
      name: 'Service AC Evaporator Clean',
      category: 'AC & Kabin',
      desc: 'Bongkar & bersihkan blower AC, pembersihan evaporator dengan kamera endoskopi, ganti filter kabin, pengisian Freon R134a, serta sterilisasi kabin.',
      price: 'Rp 350.000 - Rp 750.000',
      duration: '120 Menit',
      parts: 'Freon R134a, Filter Kabin Karbon'
    },
    {
      id: 'srv-mesin',
      name: 'Service Besar & Overhaul Mesin',
      category: 'Mesin',
      desc: 'Pekerjaan turun mesin setengah (semi) atau total untuk penggantian piston ring, metal jalan, packing silinder head, dan perbaikan kebocoran oli masif.',
      price: 'Rp 2.500.000 - Rp 6.000.000',
      duration: '3 - 5 Hari Kerja',
      parts: 'Gasket Set, Piston Ring, Valve, Oli Seal'
    },
    {
      id: 'srv-kelistrikan',
      name: 'Service Kelistrikan & Scan ECU',
      category: 'Kelistrikan',
      desc: 'Diagnosis kegagalan sistem kelistrikan body, starter motor, alternator pengisian aki, sekring, kelistrikan lampu, serta reset error code ECU OBD2.',
      price: 'Rp 150.000 - Rp 500.000',
      duration: '60 Menit',
      parts: 'Relay, Sekring, Kabel Khusus'
    }
  ];

  // Simulating filter loading state
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timer);
  }, [activeCategory, searchQuery]);

  const filteredServices = servicesData.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          service.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'Semua' || service.category === activeCategory || 
                            (activeCategory === 'Mesin' && service.category === 'Umum'); // general falls under mesin/umum
    return matchesSearch && matchesCategory;
  });

  const handleBookNow = (serviceName) => {
    toast.success(`Mengalihkan Anda ke formulir booking untuk servis: ${serviceName}`);
    // Redirect to booking and pass selected service via state
    navigate('/customer/booking', { state: { preSelectedService: serviceName } });
  };

  return (
    <div className="w-full bg-slate-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* --- TITLE --- */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="text-xs font-black text-[#A8B330] uppercase tracking-wider">Katalog Jasa Servis</span>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none my-0">Layanan Servis FixFlow</h1>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed pt-2">
            Pilih jenis perawatan yang tepat untuk performa prima kendaraan Anda. Lihat estimasi biaya, durasi pengerjaan, dan sparepart utama yang digunakan.
          </p>
        </div>

        {/* --- CONTROLS: SEARCH & CATEGORY FILTER --- */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Cari jasa servis (misal: oli, spooring)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-10 pr-4 text-xs focus:outline-none focus:ring-2 focus:ring-[#D4E34A] focus:border-transparent"
              />
            </div>
            
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider hidden md:block">
              {filteredServices.length} Jasa Servis Tersedia
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-50">
            {categories.map((cat) => {
              const isSelected = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    isSelected 
                      ? 'bg-[#D4E34A] text-slate-950 shadow-sm' 
                      : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* --- SERVICES GRID / SKELETON / EMPTY STATE --- */}
        {loading ? (
          /* Skeleton Loader */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm space-y-4 animate-pulse">
                <div className="h-5 bg-slate-200 rounded-md w-3/4" />
                <div className="h-12 bg-slate-100 rounded-md w-full" />
                <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                  <div className="h-4 bg-slate-200 rounded-md w-1/4" />
                  <div className="h-4 bg-slate-200 rounded-md w-1/4" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredServices.length > 0 ? (
          /* Services Cards */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm text-left flex flex-col justify-between hover:shadow-md transition-shadow group relative overflow-hidden"
              >
                {/* Accent ribbon */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4E34A]/30 to-transparent group-hover:via-[#D4E34A] transition-all" />

                <div className="space-y-4">
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="font-black text-slate-900 text-base sm:text-lg group-hover:text-[#A8B330] transition-colors">{service.name}</h3>
                    <span className="shrink-0 bg-slate-50 text-slate-600 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded border border-slate-100">
                      {service.category}
                    </span>
                  </div>
                  
                  <p className="text-xs text-slate-500 leading-relaxed">{service.desc}</p>
                  
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 space-y-1">
                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block">Material / Suku Cadang Terkait:</span>
                    <span className="text-xs text-slate-700 font-semibold">{service.parts}</span>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-50 mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-6">
                    <div className="space-y-0.5">
                      <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1">
                        <BadgeDollarSign className="w-3 h-3 text-slate-400" /> Estimasi Biaya
                      </div>
                      <div className="text-slate-950 font-black text-sm">{service.price}</div>
                    </div>
                    
                    <div className="space-y-0.5">
                      <div className="text-[9px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" /> Durasi Kerja
                      </div>
                      <div className="text-slate-700 font-bold text-xs">{service.duration}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleBookNow(service.name)}
                    className="bg-slate-950 text-white hover:bg-[#D4E34A] hover:text-slate-950 font-bold px-5 py-3 rounded-xl transition-all flex items-center justify-center gap-1 text-xs shadow-sm shadow-black/5 active:scale-95 group/btn"
                  >
                    <span>Pilih Servis</span>
                    <ChevronRight className="w-4 h-4 transform group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="bg-white rounded-3xl p-12 border border-slate-100 shadow-sm max-w-xl mx-auto text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center mx-auto">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Tidak Ada Layanan Ditemukan</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Kami tidak dapat menemukan jasa servis dengan kata kunci "{searchQuery}". Coba kata kunci lain atau pilih tab kategori yang sesuai.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('Semua'); }}
              className="text-xs font-bold text-slate-900 border border-slate-200 px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Reset Filter
            </button>
          </div>
        )}

        {/* --- BOTTOM BANNER PROMO INTEGRATION --- */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-950 text-white rounded-3xl p-8 max-w-4xl mx-auto border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 text-left relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4E34A]/10 rounded-full blur-2xl" />
          
          <div className="space-y-2 relative z-10">
            <span className="text-[10px] font-bold text-[#D4E34A] uppercase tracking-widest flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Diskon Servis Rutin
            </span>
            <h3 className="text-lg font-black">Punya Kendaraan Lebih dari Satu?</h3>
            <p className="text-xs text-slate-400 max-w-xl leading-normal">
              Simpan profil semua kendaraan Anda di dashboard member. Dapatkan voucher diskon 15% untuk servis kendaraan kedua.
            </p>
          </div>
          
          <button
            onClick={() => navigate('/customer/booking')}
            className="shrink-0 bg-[#D4E34A] text-slate-950 font-bold px-6 py-3 rounded-xl hover:bg-[#C5D33A] text-xs transition-all shadow-md relative z-10 w-full md:w-auto text-center"
          >
            Booking Kendaraan Sekarang
          </button>
        </div>

      </div>
    </div>
  );
}
