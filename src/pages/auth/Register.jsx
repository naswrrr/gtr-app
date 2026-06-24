import { useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Wrench,
  Phone,
  User
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(''); // Reset error ketika user mengetik ulang
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validasi apakah password dan confirm password cocok
    if (formData.password !== formData.confirmPassword) {
      setError('Konfirmasi password tidak cocok dengan password utama!');
      return;
    }

    setIsSubmitting(true);

    try {
      const SUPABASE_URL = "https://rgbguwjmttvlvosjoinx.supabase.co/rest/v1";
      const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJnYmd1d2ptdHR2bHZvc2pvaW54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIyOTEzMzcsImV4cCI6MjA5Nzg2NzMzN30.559Kc9lhJL6lsf8BLUqaWpg7OwzEE9V9bdv-9x8VtSM";

      const response = await fetch(`${SUPABASE_URL}/user_profile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Prefer': 'return=minimal' // Untuk Supabase, 'return=minimal' mempercepat POST tanpa load seluruh data baris baru
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          username: formData.name, // Memasukkan "Nama Lengkap" ke kolom username DB
          NoHp: formData.phone,    // Memasukkan "No. Telepon" ke kolom NoHp DB
          role: 'user'             // Set role default "user"
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Gagal melakukan pendaftaran ke database.");
      }

      alert('Pendaftaran Berhasil! Silakan Login.');
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Gagal terhubung ke server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClassName =
    'w-full rounded-2xl border border-gray-200 bg-white py-3 px-4 pl-11 text-sm text-gray-700 shadow-sm outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-transparent focus:ring-2 focus:ring-[#D4E34A]';

  return (
    <div className="min-h-screen bg-gray-50 lg:flex">
      {/* KIRI: Sisi Informasi & branding */}
      <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-8 py-10 text-white lg:sticky lg:top-0 lg:w-5/12 lg:px-12 lg:py-16" style={{ backgroundColor: '#1A1C1E' }}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,227,74,0.2),transparent_35%)]" />
        <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full border border-[#D4E34A]/20" />
        <div className="absolute right-0 top-0 h-48 w-48 rounded-full border border-[#D4E34A]/10" />

        <div className="relative z-10 w-full">
          <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/10 px-4 py-2 backdrop-blur">
            <div className="flex h-11 w-11 items-center justify-center rounded-full" style={{ backgroundColor: '#D4E34A', color: '#1A1C1E' }}>
              <Wrench size={20} />
            </div>
            <div>
              <p className="text-sm font-semibold tracking-[0.24em] text-[#D4E34A]">GTR AUTO</p>
              <p className="text-xs text-white/70">Sistem Bengkel Modern</p>
            </div>
          </div>

          <h1 className="text-3xl font-bold leading-tight sm:text-4xl">
            Buat akun pelanggan Anda dan nikmati pelacakan servis real-time.
          </h1>

          <div className="mt-8 space-y-3">
            {[
              'Pantau riwayat transaksi, orders, dan spent secara detail',
              'Kumpulkan stamp reward untuk ditukarkan servis gratis',
              'Sistem integrasi tanggapan langsung ke mekanik'
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80">
                <CheckCircle2 size={18} className="text-[#D4E34A]" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* KANAN: Form Registrasi Ringkas */}
      <div className="min-h-screen w-full flex items-center bg-white px-6 py-8 sm:px-10 lg:w-7/12 lg:px-16 lg:py-12">
        <div className="w-full max-w-md mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold sm:text-4xl" style={{ color: '#1A1C1E' }}>Daftar Akun Baru</h2>
            <p className="mt-3 text-sm text-gray-500">
              Isi data dasar Anda di bawah ini untuk membuat profil keanggotaan bengkel.
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-4 rounded-2xl mb-5 font-medium">
              ⚠️ {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleRegister}>
            {/* 1. Full Name */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Nama Lengkap</label>
              <div className="relative">
                <User size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  name="name"
                  type="text"
                  required
                  onChange={handleChange}
                  placeholder="Contoh: Mark Johnson"
                  className={inputClassName}
                />
              </div>
            </div>

            {/* 2. Email */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Email Address</label>
              <div className="relative">
                <Mail size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  name="email"
                  type="email"
                  required
                  onChange={handleChange}
                  placeholder="mark.johnson@mail.com"
                  className={inputClassName}
                />
              </div>
            </div>

            {/* 3. Phone Number */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">No. Telepon</label>
              <div className="relative">
                <Phone size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  name="phone"
                  type="tel"
                  required
                  onChange={handleChange}
                  placeholder="+628123456789"
                  className={inputClassName}
                />
              </div>
            </div>

            {/* 4. Password */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <Lock size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={inputClassName}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-gray-400 transition hover:bg-gray-100"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* 5. Confirm Password */}
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Konfirmasi Password</label>
              <div className="relative">
                <Lock size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={inputClassName}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-gray-400 transition hover:bg-gray-100"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Button Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-2xl py-3.5 font-bold transition-all duration-200 hover:bg-[#c5d43e] disabled:cursor-not-allowed disabled:opacity-80 active:scale-[0.99] pt-2"
              style={{ backgroundColor: '#D4E34A', color: '#1A1C1E' }}
            >
              {isSubmitting ? (
                <span>Mendaftarkan...</span>
              ) : (
                <>
                  <span>Daftar Sekarang</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-center text-sm text-gray-600">
            Sudah punya akun?{' '}
            <Link to="/login" className="font-semibold transition hover:underline" style={{ color: '#A8B330' }}>
              Masuk sekarang
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}