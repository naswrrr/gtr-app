import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    workshopName: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    
    // Logika: Simpan ke localStorage agar bisa dicek saat Login nanti
    // Kita gunakan email sebagai pengganti username untuk login
    localStorage.setItem("registeredUser", JSON.stringify({
      username: formData.email, // Disamakan dengan input login
      password: formData.password,
      workshopName: formData.workshopName
    }));
    
    alert("Pendaftaran Berhasil! Silakan Login.");
    
    // Alur: Arahkan ke login (mengikuti path di App.js)
    navigate("/login"); 
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="mb-2 text-2xl font-bold text-[#1A1C1E]">Daftar Akun</h2>
      <p className="mb-6 text-gray-500">Buat akun untuk mengelola bengkel Anda</p>
      
      <form className="space-y-4" onSubmit={handleRegister}>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Nama Bengkel</label>
          <input 
            name="workshopName"
            type="text" 
            required
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-[#D4E34A] focus:ring-1 focus:ring-[#D4E34A]" 
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Email (Username Login)</label>
          <input 
            name="email"
            type="email" 
            required
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-[#D4E34A] focus:ring-1 focus:ring-[#D4E34A]" 
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-gray-700">Password</label>
          <input 
            name="password"
            type="password" 
            required
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-[#D4E34A] focus:ring-1 focus:ring-[#D4E34A]" 
          />
        </div>

        <button type="submit" className="w-full rounded-lg bg-[#D4E34A] py-2.5 font-bold text-[#1A1C1E] transition-colors hover:opacity-90">
          Daftar
        </button>
      </form>
      
      <p className="mt-6 text-center text-sm text-gray-500">
        Sudah punya akun? <Link to="/login" className="font-semibold text-[#A8B330] hover:underline">Masuk</Link>
      </p>
    </div>
  );
}