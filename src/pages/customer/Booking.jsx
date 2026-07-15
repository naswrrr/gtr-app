import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCustomer } from '../../context/CustomerContext';
import { supabase } from '../../lib/supabase';
import { 
  Car, Calendar, Wrench, CheckCircle, 
  ChevronRight, ChevronLeft, Upload, Info,
  Loader2, RefreshCw, X, History
} from 'lucide-react';
import { toast } from 'sonner';

// ─── Status Badge Helper ─────────────────────────────────────────────────────
const STATUS_CONFIG = {
  booking_diterima:   { label: 'Booking Diterima',    color: 'bg-blue-100 text-blue-700 border-blue-200' },
  sedang_dikerjakan:  { label: 'Sedang Dikerjakan',   color: 'bg-amber-100 text-amber-700 border-amber-200' },
  menunggu_sparepart: { label: 'Menunggu Sparepart',  color: 'bg-orange-100 text-orange-700 border-orange-200' },
  quality_check:      { label: 'Quality Check',       color: 'bg-purple-100 text-purple-700 border-purple-200' },
  selesai:            { label: 'Selesai',             color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  cancelled:          { label: 'Dibatalkan',          color: 'bg-red-100 text-red-700 border-red-200' },
};

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || { label: status, color: 'bg-slate-100 text-slate-700 border-slate-200' };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${cfg.color}`}>
      {cfg.label}
    </span>
  );
}
// ─────────────────────────────────────────────────────────────────────────────

export default function Booking() {
  const { currentCustomer, addBooking } = useCustomer();
  const location = useLocation();
  const navigate = useNavigate();

  // ── Multi-step form ──────────────────────────────────────────────────────
  const [step, setStep] = useState(1);
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [selectedServices, setSelectedServices] = useState([]);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [complaint, setComplaint] = useState('');
  const [photoPreview, setPhotoPreview] = useState(null);

  // ── Supabase state ───────────────────────────────────────────────────────
  const [services, setServices] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [myBookings, setMyBookings] = useState([]);
  const [bookingsLoading, setBookingsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cancellingId, setCancellingId] = useState(null);

  // ── Fetch services dari Supabase ─────────────────────────────────────────
  const fetchServices = useCallback(async () => { // fetch mengambil data layanan dari tabel 'services' di Supabase
    setServicesLoading(true);
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('nama_jasa');
    if (error) {
      console.error('fetchServices error:', error);
      toast.error('Gagal memuat daftar layanan.');
    } else {
      setServices(data || []);
    }
    setServicesLoading(false);
  }, []);

  // ── Fetch booking milik user yang login ──────────────────────────────────
  const fetchMyBookings = useCallback(async () => {
    setBookingsLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setBookingsLoading(false); return; }

    const { data, error } = await supabase
      .from('bookings')
      .select('*, services(nama_jasa, harga)')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('fetchMyBookings error:', error);
    } else {
      setMyBookings(data || []);
    }
    setBookingsLoading(false);
  }, []);

  // ── Init ─────────────────────────────────────────────────────────────────
  useEffect(() => { // ambil kendaraan default dari currentCustomer saat halaman dimuat
    if (currentCustomer) {
      const defaultVehicle = currentCustomer.vehicles?.[0] || currentCustomer.vehicle || '';
      setSelectedVehicle(defaultVehicle);
    }
  }, [currentCustomer]);

  useEffect(() => {
    fetchServices();
    fetchMyBookings();
  }, [fetchServices, fetchMyBookings]);

  // Pre-select service from router state setelah services dimuat
  useEffect(() => {
    if (services.length > 0 && location.state?.preSelectedService && selectedServices.length === 0) {
      const svcName = location.state.preSelectedService;
      const found = services.find(s => s.nama_jasa === svcName || svcName.includes(s.nama_jasa));
      if (found) setSelectedServices([found]);
    }
  }, [services, location.state]);

  // ── Time slots ───────────────────────────────────────────────────────────
  const timeSlots = ['08:00', '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'];

  // ── Helpers ──────────────────────────────────────────────────────────────
  const totalCost     = selectedServices.reduce((sum, s) => sum + (s.harga || 0), 0);
  const totalDuration = selectedServices.reduce((sum, s) => sum + (s.durasi_menit || 60), 0);

  const formatRupiah = (n) =>
    new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(n);

  const handleServiceToggle = (svc) => {
    if (selectedServices.some(s => s.id === svc.id)) {
      setSelectedServices(selectedServices.filter(s => s.id !== svc.id));
    } else {
      setSelectedServices([...selectedServices, svc]);
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
        toast.success('Foto kendaraan berhasil diunggah!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNextStep = () => {
    if (step === 1 && !selectedVehicle) { toast.error('Silakan pilih kendaraan terlebih dahulu!'); return; }
    if (step === 2 && selectedServices.length === 0) { toast.error('Silakan pilih minimal 1 jasa servis!'); return; }
    if (step === 3 && (!bookingDate || !bookingTime)) { toast.error('Silakan tentukan tanggal dan jam kedatangan!'); return; }
    setStep(prev => prev + 1);
  };

  const handlePrevStep = () => setStep(prev => prev - 1);

  // ── SUBMIT ke Supabase ───────────────────────────────────────────────────
  const handleSubmitBooking = async () => {
    setIsSubmitting(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Sesi login tidak ditemukan. Silakan login ulang.');

      const primaryService = selectedServices[0];
      const allServiceNames = selectedServices.map(s => s.nama_jasa).join(', ');
      const keluhanFull = `[Layanan: ${allServiceNames}]${complaint ? ' — ' + complaint : ''}`;

      const { error } = await supabase.from('bookings').insert({
        user_id:         user.id,
        service_id:      primaryService.id,
        nama_kendaraan:  selectedVehicle,
        tanggal_booking: bookingDate,
        jam_booking:     bookingTime + ':00',
        keluhan:         keluhanFull,
        status:          'booking_diterima',
      });

      if (error) throw new Error(error.message);

      // Sinkron ke local context (untuk Tracking page, dsb.)
      addBooking({
        vehicle:     selectedVehicle,
        services:    selectedServices.map(s => s.nama_jasa),
        date:        bookingDate,
        time:        bookingTime,
        complaint:   complaint || 'Tidak ada keluhan khusus',
        costEst:     formatRupiah(totalCost),
        durationEst: `${totalDuration} Menit`,
      });

      toast.success('✅ Booking Servis Berhasil Terdaftar!');

      // Reset form
      setStep(1);
      setSelectedServices([]);
      setBookingDate('');
      setBookingTime('');
      setComplaint('');
      setPhotoPreview(null);

      // Refresh list
      fetchMyBookings();

    } catch (err) {
      toast.error(`Gagal menyimpan booking: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── CANCEL Booking ───────────────────────────────────────────────────────
  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm('Yakin ingin membatalkan booking ini?')) return;
    setCancellingId(bookingId);
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: 'cancelled', updated_at: new Date().toISOString() })
        .eq('id', bookingId)
        .eq('status', 'booking_diterima'); // safety: only cancel if still pending

      if (error) throw new Error(error.message);
      toast.success('Booking berhasil dibatalkan.');
      fetchMyBookings();
    } catch (err) {
      toast.error(`Gagal membatalkan: ${err.message}`);
    } finally {
      setCancellingId(null);
    }
  };

  // ── Guard ────────────────────────────────────────────────────────────────
  if (!currentCustomer) {
    return (
      <div className="bg-white rounded-3xl p-12 border border-slate-100 shadow-sm text-center">
        <Loader2 className="w-6 h-6 animate-spin text-slate-400 mx-auto mb-2" />
        <p className="text-xs text-slate-400">Loading data customer...</p>
      </div>
    );
  }

  // ── RENDER ────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-8 text-left max-w-4xl mx-auto">

      {/* HEADER PAGE */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight my-0">Booking Servis Online</h1>
          <p className="text-xs text-slate-400 mt-1">Registrasikan antrean servis kendaraan Anda secara praktis tanpa antre.</p>
        </div>

        {/* Progress Step Indicator */}
        <div className="flex gap-2 bg-white border border-slate-100 p-2 rounded-2xl shadow-sm text-[10px] font-black text-slate-400">
          {[1, 2, 3, 4, 5].map((s) => (
            <div
              key={s}
              className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                step === s ? 'bg-slate-950 text-white' : step > s ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-50 text-slate-400'
              }`}
            >
              {s}
            </div>
          ))}
        </div>
      </div>

      {/* ── FORM WORKSPACE ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

        {/* Main Form Body */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6 min-h-[420px] flex flex-col justify-between">

          {/* STEP 1: PILIH KENDARAAN */}
          {step === 1 && (
            <div className="space-y-4 text-left">
              <h3 className="font-black text-slate-900 text-sm flex items-center gap-2 border-b border-slate-100 pb-3">
                <Car className="w-4.5 h-4.5 text-slate-400" />
                <span>Pilih Kendaraan Anda</span>
              </h3>
              <div className="space-y-3">
                <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Pilih Dari Garasi Member</label>
                <div className="grid grid-cols-1 gap-3">
                  {(currentCustomer.vehicles || [currentCustomer.vehicle]).filter(Boolean).map((v, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSelectedVehicle(v)}
                      className={`p-4 rounded-2xl text-left border transition-all flex items-center justify-between ${
                        selectedVehicle === v ? 'bg-[#D4E34A]/10 border-[#D4E34A] font-bold text-slate-900' : 'bg-slate-50 border-slate-100 hover:bg-slate-100'
                      }`}
                    >
                      <div className="text-xs">
                        <div className="font-bold">{v.split(' (')[0]}</div>
                        <div className="text-[10px] text-slate-400 font-semibold mt-1">
                          No Polisi: {v.includes('(') ? v.split('(')[1].replace(')', '') : '—'}
                        </div>
                      </div>
                      <div className="w-5 h-5 rounded-full border border-slate-300 flex items-center justify-center">
                        {selectedVehicle === v && <div className="w-2.5 h-2.5 rounded-full bg-slate-900" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex items-start gap-2.5 text-xs text-slate-500 leading-normal">
                <Info className="w-4 h-4 text-[#A8B330] shrink-0 mt-0.5" />
                <span>Kendaraan di atas diambil secara otomatis dari histori database CRM pelanggan Anda.</span>
              </div>
            </div>
          )}

          {/* STEP 2: PILIH JASA SERVIS (dari Supabase) */}
          {step === 2 && (
            <div className="space-y-4 text-left">
              <h3 className="font-black text-slate-900 text-sm flex items-center gap-2 border-b border-slate-100 pb-3">
                <Wrench className="w-4.5 h-4.5 text-slate-400" />
                <span>Pilih Jasa Servis</span>
              </h3>
              {servicesLoading ? (
                <div className="flex items-center justify-center py-8 gap-2 text-slate-400 text-xs">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Memuat daftar layanan dari server...</span>
                </div>
              ) : (
                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                  {services.map((svc) => {
                    const isChecked = selectedServices.some(s => s.id === svc.id);
                    return (
                      <button
                        key={svc.id}
                        type="button"
                        onClick={() => handleServiceToggle(svc)}
                        className={`w-full p-3.5 rounded-2xl text-left border transition-all flex items-center justify-between text-xs ${
                          isChecked ? 'bg-[#D4E34A]/10 border-[#D4E34A] font-bold text-slate-900' : 'bg-slate-50 border-slate-100 hover:bg-slate-100'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="font-bold text-slate-900">{svc.nama_jasa}</div>
                          <p className="text-[10px] text-slate-400 font-medium">{svc.deskripsi}</p>
                        </div>
                        <div className="text-right shrink-0 ml-4">
                          <div className="font-black text-slate-950">{formatRupiah(svc.harga)}</div>
                          <div className="text-[9px] text-[#A8B330] mt-0.5">{svc.durasi_menit || 60} Menit</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* STEP 3: TANGGAL & JAM */}
          {step === 3 && (
            <div className="space-y-4 text-left">
              <h3 className="font-black text-slate-900 text-sm flex items-center gap-2 border-b border-slate-100 pb-3">
                <Calendar className="w-4.5 h-4.5 text-slate-400" />
                <span>Pilih Tanggal & Jam Kedatangan</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Tanggal Kedatangan</label>
                  <input
                    type="date"
                    value={bookingDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs focus:outline-none focus:ring-2 focus:ring-[#D4E34A] focus:border-transparent"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Jam Kedatangan</label>
                  <div className="grid grid-cols-2 gap-2">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setBookingTime(time)}
                        className={`py-2 px-3 rounded-xl border text-[11px] font-bold transition-all text-center ${
                          bookingTime === time ? 'bg-slate-950 text-white border-slate-950' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: KELUHAN & FOTO */}
          {step === 4 && (
            <div className="space-y-4 text-left">
              <h3 className="font-black text-slate-900 text-sm flex items-center gap-2 border-b border-slate-100 pb-3">
                <Info className="w-4.5 h-4.5 text-slate-400" />
                <span>Keluhan & Foto Pendukung</span>
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Keluhan Utama Kendaraan (Opsional)</label>
                  <textarea
                    rows="3"
                    value={complaint}
                    onChange={(e) => setComplaint(e.target.value)}
                    placeholder="Contoh: Rem belakang berdecit saat macet, AC kurang dingin..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs focus:outline-none focus:ring-2 focus:ring-[#D4E34A] focus:border-transparent resize-none leading-relaxed"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Foto Area Keluhan (Opsional)</label>
                  <div className="flex gap-4 items-center">
                    <label className="bg-slate-50 hover:bg-slate-100 border border-dashed border-slate-300 rounded-2xl p-4 cursor-pointer text-center flex flex-col items-center justify-center gap-1.5 min-w-[120px] transition-colors">
                      <Upload className="w-4 h-4 text-slate-400" />
                      <span className="text-[10px] text-slate-500 font-bold">Pilih Foto</span>
                      <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                    </label>
                    {photoPreview ? (
                      <div className="relative w-20 h-20 rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                        <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setPhotoPreview(null)}
                          className="absolute top-1 right-1 w-5 h-5 bg-black/60 rounded-full text-white text-[9px] flex items-center justify-center font-bold"
                        >X</button>
                      </div>
                    ) : (
                      <span className="text-[10px] text-slate-400">Belum ada foto yang dipilih.</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: KONFIRMASI */}
          {step === 5 && (
            <div className="space-y-4 text-left">
              <h3 className="font-black text-slate-900 text-sm flex items-center gap-2 border-b border-slate-100 pb-3">
                <CheckCircle className="w-4.5 h-4.5 text-slate-400" />
                <span>Konfirmasi Ringkasan Booking</span>
              </h3>
              <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-100 space-y-4 text-xs text-slate-700">
                <div className="grid grid-cols-2 gap-4 pb-3 border-b border-slate-200/50">
                  <div>
                    <span className="text-[9px] text-slate-400 font-bold uppercase block">Nama Customer</span>
                    <span className="font-bold text-slate-900">{currentCustomer.name}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 font-bold uppercase block">Tier Keanggotaan</span>
                    <span className="font-bold text-slate-900">{currentCustomer.tier}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pb-3 border-b border-slate-200/50">
                  <div>
                    <span className="text-[9px] text-slate-400 font-bold uppercase block">Kendaraan Terpilih</span>
                    <span className="font-bold text-slate-900 leading-tight">{selectedVehicle}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 font-bold uppercase block">Jadwal Servis</span>
                    <span className="font-bold text-slate-900">{bookingDate} • {bookingTime}</span>
                  </div>
                </div>
                <div className="pb-3 border-b border-slate-200/50">
                  <span className="text-[9px] text-slate-400 font-bold uppercase block mb-1">Layanan Terpilih</span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedServices.map((s, idx) => (
                      <span key={idx} className="bg-white border border-slate-200 px-2.5 py-1 rounded-lg font-bold text-[10px] text-slate-800">
                        {s.nama_jasa}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-[9px] text-slate-400 font-bold uppercase block">Keluhan Kendaraan</span>
                  <p className="text-slate-600 font-medium italic mt-1 leading-normal">"{complaint || 'Tidak ada keluhan khusus'}"</p>
                </div>
              </div>
              <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-3.5 flex items-start gap-2.5 text-xs text-emerald-800">
                <CheckCircle className="w-4.5 h-4.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Pemesanan Anda akan tersimpan langsung ke database Supabase. Pengingat status pengerjaan akan dikirim berkala via WhatsApp.</span>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="pt-6 border-t border-slate-100 mt-6 flex justify-between gap-4">
            {step > 1 ? (
              <button
                type="button"
                onClick={handlePrevStep}
                disabled={isSubmitting}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-6 py-3 rounded-xl text-xs transition-all flex items-center gap-1 active:scale-95 disabled:opacity-50"
              >
                <ChevronLeft className="w-4 h-4" /><span>Kembali</span>
              </button>
            ) : <div />}

            {step < 5 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="bg-slate-950 hover:bg-slate-900 text-white font-bold px-6 py-3 rounded-xl text-xs transition-all flex items-center gap-1 active:scale-95"
              >
                <span>Lanjutkan</span><ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmitBooking}
                disabled={isSubmitting}
                className="bg-[#D4E34A] text-slate-950 font-bold px-8 py-3.5 rounded-xl text-xs hover:bg-[#C5D33A] transition-all flex items-center gap-1.5 active:scale-95 shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /><span>Menyimpan ke Supabase...</span></>
                ) : (
                  <><CheckCircle className="w-4.5 h-4.5" /><span>Konfirmasi Booking & Hubungkan CRM</span></>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Right side: Estimasi Biaya */}
        <div className="space-y-4">
          <div className="bg-slate-950 text-white rounded-3xl p-6 border border-slate-800 shadow-sm text-left space-y-5">
            <h3 className="font-black text-[#D4E34A] text-xs uppercase tracking-widest">Ringkasan Estimasi Biaya</h3>
            <div className="space-y-3">
              {selectedServices.map((svc) => (
                <div key={svc.id} className="flex justify-between items-center text-xs border-b border-slate-900 pb-2.5">
                  <div className="text-slate-400 font-semibold">{svc.nama_jasa}</div>
                  <div className="font-bold text-white">{formatRupiah(svc.harga)}</div>
                </div>
              ))}
              {selectedServices.length === 0 && (
                <p className="text-xs text-slate-600 font-medium py-2">Belum ada layanan yang dipilih.</p>
              )}
            </div>
            <div className="pt-2 flex justify-between items-center text-xs">
              <span className="text-slate-400 font-semibold">Total Durasi Estimasi</span>
              <span className="text-[#D4E34A] font-bold">{totalDuration} Menit</span>
            </div>
            <div className="border-t border-slate-800 pt-4 flex justify-between items-end">
              <div>
                <span className="text-[9px] text-slate-500 font-bold uppercase block">Total Biaya Jasa</span>
                <span className="text-xs text-slate-400 font-medium">Belum termasuk PPN (11%)</span>
              </div>
              <span className="text-xl font-black text-[#D4E34A] block leading-none">{formatRupiah(totalCost)}</span>
            </div>
            <div className="bg-slate-900/50 rounded-xl p-3 border border-slate-800 text-[10px] text-slate-400 leading-normal flex items-start gap-2">
              <Info className="w-4 h-4 shrink-0 text-slate-500" />
              <span>Biaya di atas adalah estimasi jasa. Biaya sparepart tambahan akan diinformasikan mekanik saat inspeksi awal.</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── RIWAYAT BOOKING SAYA (dari Supabase) ── */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            <History className="w-4 h-4 text-slate-400" />
            <h2 className="font-black text-slate-900 text-sm">Riwayat Booking Saya</h2>
            <span className="bg-slate-100 text-slate-600 text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
              {myBookings.filter(b => b.status !== 'selesai' && b.status !== 'cancelled').length} aktif
            </span>
          </div>
          <button
            onClick={fetchMyBookings}
            className="text-slate-400 hover:text-slate-700 transition-colors p-1.5 rounded-lg hover:bg-slate-50"
            title="Refresh data"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>

        {bookingsLoading ? (
          <div className="flex items-center justify-center py-10 gap-2 text-slate-400 text-xs">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Memuat data booking dari Supabase...</span>
          </div>
        ) : myBookings.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            <Calendar className="w-8 h-8 mx-auto mb-2 opacity-30" />
            <p className="text-xs font-semibold">Belum ada booking yang tercatat.</p>
            <p className="text-[10px] mt-1 text-slate-300">Gunakan form di atas untuk membuat booking servis baru.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {myBookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-slate-200 transition-colors"
              >
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-black text-slate-900 text-xs">
                      {booking.services?.nama_jasa || 'Jasa Servis'}
                    </span>
                    <StatusBadge status={booking.status} />
                  </div>
                  <div className="text-[10px] text-slate-500 font-semibold flex flex-wrap gap-x-3 gap-y-0.5">
                    <span>🚗 {booking.nama_kendaraan || '—'}</span>
                    <span>📅 {booking.tanggal_booking}</span>
                    <span>🕐 {String(booking.jam_booking).slice(0, 5)}</span>
                  </div>
                  {booking.keluhan && (
                    <p className="text-[10px] text-slate-400 italic leading-normal line-clamp-1">
                      {booking.keluhan}
                    </p>
                  )}
                </div>

                {/* Tombol Batalkan — hanya muncul jika status 'booking_diterima' */}
                {booking.status === 'booking_diterima' && (
                  <button
                    onClick={() => handleCancelBooking(booking.id)}
                    disabled={cancellingId === booking.id}
                    className="shrink-0 flex items-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-100 font-bold px-3 py-2 rounded-xl text-[10px] transition-all disabled:opacity-50"
                  >
                    {cancellingId === booking.id ? (
                      <Loader2 className="w-3 h-3 animate-spin" />
                    ) : (
                      <X className="w-3 h-3" />
                    )}
                    <span>Batalkan</span>
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
