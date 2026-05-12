import { Link } from 'react-router-dom';

export default function Forgot() {
  return (
    <div>
      <h2 className="mb-2 text-2xl font-bold text-navy">Lupa Password</h2>
      <p className="mb-6 text-navy-dark/70">Masukkan email Anda untuk reset password</p>
      
      <form className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-navy">Email</label>
          <input type="email" className="w-full rounded-lg border border-surface-dark px-4 py-2 outline-none focus:border-primary focus:ring-1 focus:ring-primary" />
        </div>

        <button type="button" className="w-full rounded-lg bg-primary py-2.5 font-bold text-white transition-colors hover:bg-primary-dark">
          Kirim Link Reset
        </button>
      </form>
      
      <p className="mt-6 text-center text-sm text-navy-dark/70">
        Kembali ke <Link to="/auth/login" className="font-semibold text-primary hover:text-primary-dark">Login</Link>
      </p>
    </div>
  );
}
