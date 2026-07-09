import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { Wrench, CheckCircle2, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { supabase } from '../../lib/supabase';
import { useCustomer } from '../../context/CustomerContext';

export default function Login() {
  const navigate = useNavigate();
  const { forceLogin } = useCustomer();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [dataForm, setDataForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

  // 💡 FITUR AUTO-FILL UNTUK DEMO DOSEN (MULTI-ROLE)
  const handleQuickLogin = (role) => {
    if (role === 'admin') {
      setDataForm({
        username: "wa@gmail.com",
        password: "12345678"
      });
    } else if (role === 'member') {
      setDataForm({
        username: "user@gmail.com",
        password: "12345678"
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: dataForm.username,
        password: dataForm.password,
      });

      if (authError) {
        if (authError.message.includes('Email not confirmed')) {
          throw new Error("Email Anda belum dikonfirmasi. Silakan cek inbox email Anda.");
        }
        if (authError.message.includes('Invalid login credentials')) {
          throw new Error("Email atau Password salah! Periksa kembali data Anda.");
        }
        throw new Error(authError.message || "Login gagal. Coba lagi.");
      }

      const { data: profileData, error: profileError } = await supabase
        .from('user_profile')
        .select('*')
        .eq('email', dataForm.username)
        .maybeSingle();

      if (profileError) {
        throw new Error("Gagal mengambil data profil: " + profileError.message);
      }

      if (!profileData) {
        throw new Error("Profil pengguna tidak ditemukan di database.");
      }

      const userRole = profileData.role || 'user';

      const sessionData = {
        accessToken: authData.session.access_token,
        username: profileData.username,
        firstName: profileData.username,
        role: userRole,
        image: "https://robohash.org/set_set4/user.png"
      };

      localStorage.setItem("token", sessionData.accessToken);
      localStorage.setItem("user", JSON.stringify(sessionData));
      localStorage.setItem("loggedUser", JSON.stringify(profileData));

      if (userRole !== 'admin') {
        forceLogin();
      }

      setTimeout(() => {
        setLoading(false);
        if (userRole === 'admin') {
          navigate('/admin');
        } else {
          navigate('/customer/dashboard');
        }
      }, 1000);

    } catch (err) {
      setTimeout(() => {
        setLoading(false);
        setError(err.message || "Gagal terhubung ke server.");
      }, 800);
    }
  };

  const inputClassName =
    "w-full rounded-2xl border border-gray-200 bg-white py-3.5 px-4 pl-11 text-sm text-gray-700 shadow-sm outline-none transition-all duration-200 placeholder:text-gray-400 focus:border-transparent focus:ring-2 focus:ring-[#D4E34A]";

  return (
    <div className="min-h-screen bg-gray-50 lg:flex">

      {/* KIRI: Sisi Informasi & Branding */}
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
            Selamat Datang Kembali di Portal Kelola GTR Auto.
          </h1>
          <p className="mt-4 text-sm leading-7 text-white/75 sm:text-base">
            Silakan masuk untuk melanjutkan monitoring riwayat transaksi pelanggan, mengelola penukaran stamp loyalitas, serta memperbarui status antrean servis.
          </p>

          <div className="mt-8 space-y-3">
            {[
              'Akses dashboard manajemen terpusat',
              'Validasi data orders dan pengeluaran secara berkala',
              'Keamanan enkripsi data sesi pengguna terjamin'
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80">
                <CheckCircle2 size={18} className="text-[#D4E34A]" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4 space-y-2">
            <p className="text-xs font-bold text-[#D4E34A] uppercase tracking-wider mb-2">Panduan Login Berdasarkan Role</p>
            <div className="flex items-center gap-3 text-xs text-white/70">
              <span className="w-2 h-2 rounded-full bg-red-400 shrink-0"></span>
              <span><strong className="text-white">Admin:</strong> Diarahkan ke Dashboard Admin</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-white/70">
              <span className="w-2 h-2 rounded-full bg-green-400 shrink-0"></span>
              <span><strong className="text-white">Member / User:</strong> Diarahkan ke Area Member</span>
            </div>
          </div>
        </div>
      </div>

      {/* KANAN: Form Login Box */}
      <div className="min-h-screen w-full flex items-center justify-center bg-white px-6 py-8 sm:px-10 lg:w-7/12 lg:px-16 lg:py-12">
        <div className="w-full max-w-md mx-auto">
          <div className="mb-8 text-center lg:text-left">
            <h2 className="text-3xl font-bold sm:text-4xl" style={{ color: '#1A1C1E' }}>
              Masuk ke Akun Anda
            </h2>
            <p className="mt-3 text-base text-gray-500">
              Gunakan Email yang telah Anda daftarkan pada menu registrasi sebelumnya.
            </p>
          </div>

          {error && (
            <div className="bg-red-50 mb-6 p-4 text-sm text-red-700 rounded-2xl flex items-center border border-red-200 shadow-sm">
              <BsFillExclamationDiamondFill className="me-3 text-xl shrink-0" />
              <span className="font-medium">{error}</span>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Input Email */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Alamat Email</label>
              <div className="relative">
                <Mail size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  name="username"
                  type="email"
                  required
                  value={dataForm.username}
                  onChange={handleChange}
                  className={inputClassName}
                  placeholder="contoh@email.com"
                />
              </div>
            </div>

            {/* Input Password */}
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">Kata Sandi</label>
              <div className="relative">
                <Lock size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={dataForm.password}
                  onChange={handleChange}
                  className={inputClassName}
                  placeholder="••••••••"
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

            {/* 💡 MINI BANNER AKUN QUICK FILL BARU */}
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-3 shadow-inner">
              <div className="text-[11px] text-gray-500 font-medium leading-relaxed">
                <p className="font-bold flex items-center gap-1 mb-1" style={{ color: '#A8B330' }}>
                  💡 Pilihan Akun Demo (Quick Login):
                </p>
                <div className="grid grid-cols-2 gap-4 text-slate-600">
                  <div>
                    <p className="font-bold text-red-600">🔴 Akun Admin:</p>
                    <p>Email: <span className="font-semibold text-gray-700">wa@gmail.com</span></p>
                    <p>Pass: <span className="font-semibold text-gray-700">12345678</span></p>
                  </div>
                  <div>
                    <p className="font-bold text-green-600">🟢 Akun Member:</p>
                    <p>Email: <span className="font-semibold text-gray-700">user@gmail.com</span></p>
                    <p>Pass: <span className="font-semibold text-gray-700">12345678</span></p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => handleQuickLogin('admin')}
                  className="text-xs px-3 py-2 rounded-xl font-bold text-white bg-red-600 hover:bg-red-700 transition-all shadow-sm active:scale-95"
                >
                  ⚡ Demo Admin
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickLogin('member')}
                  className="text-xs px-3 py-2 rounded-xl font-bold text-white bg-green-600 hover:bg-green-700 transition-all shadow-sm active:scale-95"
                >
                  ⚡ Demo Member
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm pt-1">
              <label className="flex items-center gap-2.5 cursor-pointer font-medium" style={{ color: '#1A1C1E' }}>
                <input
                  type="checkbox"
                  className="accent-[#D4E34A] w-4 h-4 rounded border-gray-300 focus:ring-0"
                />
                Ingat saya
              </label>
              <Link to="/forgot" className="font-bold hover:underline" style={{ color: '#A8B330' }}>
                Lupa Password?
              </Link>
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full flex justify-center items-center rounded-2xl py-4 font-black shadow-lg shadow-[#D4E34A]/20 transition-all hover:bg-[#c5d43e] active:scale-[0.99] disabled:bg-gray-300 disabled:cursor-not-allowed"
              style={{ backgroundColor: '#D4E34A', color: '#1A1C1E' }}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <ImSpinner2 className="animate-spin text-xl" />
                  <span>Memverifikasi...</span>
                </div>
              ) : (
                "Masuk Melalui Email"
              )}
            </button>

            <div className="relative py-2 flex items-center">
              <div className="grow border-t border-gray-100"></div>
              <span className="px-4 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                Atau masuk dengan
              </span>
              <div className="grow border-t border-gray-100"></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className="flex items-center justify-center gap-2 border border-gray-200 py-3 rounded-2xl hover:bg-slate-50 font-bold text-sm transition-all"
                style={{ color: '#1A1C1E' }}
              >
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
                Google
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 border border-gray-200 py-3 rounded-2xl hover:bg-slate-50 font-bold text-sm transition-all"
                style={{ color: '#1A1C1E' }}
              >
                <img src="https://www.svgrepo.com/show/475633/apple-color.svg" className="w-5 h-5" alt="Apple" />
                Apple
              </button>
            </div>
          </form>

          <div className="mt-10 rounded-2xl border border-gray-100 bg-gray-50/50 px-4 py-3.5 text-center text-sm text-slate-500 font-medium">
            Belum memiliki akun?{" "}
            <Link to="/register" className="font-bold hover:underline" style={{ color: '#A8B330' }}>
              Daftar Sekarang
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}