import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCustomer } from '../../context/CustomerContext';
import { KeyRound, Mail, AlertCircle, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

export default function CustomerLogin() {
  const { loginCustomer, customers } = useCustomer();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // Simulated password
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // List of 3 demo customers for quick fill
  const demoUsers = customers.slice(0, 3);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const result = loginCustomer(email);
      setLoading(false);
      if (result.success) {
        toast.success(`Selamat datang kembali, ${result.customer.name}!`);
        navigate('/customer/dashboard');
      } else {
        setError(result.message || 'Email salah atau tidak terdaftar.');
      }
    }, 800);
  };

  const handleQuickLogin = (demoEmail) => {
    setEmail(demoEmail);
    setPassword('password123');
    toast.info(`Email diisi otomatis: ${demoEmail}`);
  };

  return (
    <div className="w-full min-h-[80vh] flex items-center justify-center p-6 bg-slate-50 font-sans">
      <div className="w-full max-w-md bg-white rounded-[3rem] border border-slate-100 p-8 sm:p-10 shadow-xl text-left space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex gap-1.5 justify-center items-center">
            <div className="w-2.5 h-7 bg-[#D4E34A] rounded-full transform -rotate-[20deg]" />
            <div className="w-2.5 h-7 bg-[#D4E34A] rounded-full transform -rotate-[20deg]" />
            <div className="w-2.5 h-7 bg-[#D4E34A] rounded-full transform -rotate-[20deg]" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tight mt-3">Portal Member FixFlow</h2>
          <p className="text-xs text-slate-400">Gunakan email terdaftar untuk melihat riwayat servis & poin loyalitas.</p>
        </div>

        {error && (
          <div className="bg-rose-50 border border-rose-100 text-rose-800 text-xs rounded-2xl p-4 flex items-start gap-2.5 leading-normal">
            <AlertCircle className="w-4.5 h-4.5 text-rose-600 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Email Pelanggan</label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 w-4.5 h-4.5 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="misal: mark.johnson@mail.com"
                className="w-full rounded-2xl bg-slate-50 border border-slate-200 py-3.5 pl-11 pr-4 outline-none focus:ring-2 focus:ring-[#D4E34A] focus:bg-white text-slate-900 placeholder:text-slate-400 text-xs transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Password</label>
            <div className="relative">
              <KeyRound className="absolute left-4 top-3.5 w-4.5 h-4.5 text-slate-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-2xl bg-slate-50 border border-slate-200 py-3.5 pl-11 pr-4 outline-none focus:ring-2 focus:ring-[#D4E34A] focus:bg-white text-slate-900 placeholder:text-slate-400 text-xs transition-all"
              />
            </div>
          </div>

          {/* Quick Demo Autofill section */}
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 space-y-2.5">
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#A8B330]" /> Akun Demo CRM (Autofill)
            </span>
            <div className="space-y-1.5">
              {demoUsers.map((user) => (
                <button
                  key={user.id}
                  type="button"
                  onClick={() => handleQuickLogin(user.email)}
                  className="w-full text-left bg-white border border-slate-150/60 p-2 rounded-xl flex items-center justify-between text-[10px] hover:bg-slate-100 hover:border-slate-350 transition-all font-semibold text-slate-700"
                >
                  <div>
                    <span className="font-bold text-slate-950 block">{user.name}</span>
                    <span className="text-slate-400 text-[9px]">{user.email}</span>
                  </div>
                  <span className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-black text-[8px] uppercase">
                    {user.tier}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#D4E34A] text-slate-950 font-black py-4 rounded-2xl hover:bg-[#C5D33A] active:scale-[0.99] transition-all text-xs flex justify-center items-center gap-1 shadow-lg shadow-[#D4E34A]/25 disabled:bg-slate-200 disabled:text-slate-400"
          >
            {loading ? 'Memproses Masuk...' : 'Masuk ke Portal Member'}
            {!loading && <ArrowRight className="w-4 h-4" />}
          </button>
        </form>

        <div className="pt-4 border-t border-slate-50 text-center">
          <Link to="/" className="text-xs font-semibold text-slate-400 hover:text-slate-900">
            ← Kembali ke Halaman Utama
          </Link>
        </div>

      </div>
    </div>
  );
}
