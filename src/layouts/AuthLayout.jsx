import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#FCA311] p-6 font-sans">
      <div className="w-full max-w-md">
        
        {/* Logo Section - Sekarang Sama dengan Sidebar */}
        <div className="flex flex-col items-center mb-8 group cursor-pointer">
          <div className="relative flex items-center justify-center mb-4">
            {/* Hexagon Baut - Navy #14213D agar kontras dengan BG Orange */}
            <div className="w-16 h-16 bg-[#14213D] rounded-2xl rotate-45 flex items-center justify-center shadow-xl group-hover:rotate-[135deg] transition-all duration-700">
              {/* Lubang Tengah Baut */}
              <div className="w-6 h-6 bg-[#FCA311] rounded-full"></div>
            </div>
            
            {/* Aksen Kunci Pas */}
            <div className="absolute -right-2 -bottom-1 bg-white text-xs w-8 h-8 rounded-xl flex items-center justify-center border-2 border-[#14213D] shadow-md">
              <span className="text-[16px]">🛠️</span>
            </div>
          </div>

          {/* Teks Logo */}
          <h1 className="text-3xl font-black text-[#14213D] tracking-tighter">
            FIX<span className="text-white">FLOW</span>
          </h1>
          <p className="text-[10px] font-bold text-[#14213D]/60 uppercase tracking-[0.3em] -mt-1">
            Auto Service Workshop
          </p>
        </div>
        
        {/* Card Putih untuk Form Login/Register */}
        <div className="rounded-[2.5rem] bg-white p-10 shadow-2xl">
          <Outlet />
        </div>

      </div>
    </div>
  );
}