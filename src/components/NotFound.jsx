import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-surface text-center">
      <h1 className="text-6xl font-bold text-primary">404</h1>
      <h2 className="mt-4 text-2xl font-semibold text-navy">Halaman Tidak Ditemukan</h2>
      <p className="mt-2 text-navy-dark/70">Maaf, halaman yang Anda cari tidak ada.</p>
      <Link to="/" className="mt-6 rounded-lg bg-primary px-6 py-2 font-semibold text-white hover:bg-primary-dark">
        Kembali ke Dashboard
      </Link>
    </div>
  );
}
