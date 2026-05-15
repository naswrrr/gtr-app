import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    /* Background Full Satu Layar Neon Lime */
    <div className="flex min-h-screen w-full items-center justify-center bg-[#D4E34A] p-6 font-sans">
      
      <div className="w-full max-w-md flex flex-col items-center">
        
        {/* Logo Section - 3 Kapsul Hitam Miring */}
        <div className="flex flex-col items-center mb-10">
          <div className="flex gap-2.5 mb-4">
            {/* Kapsul miring sesuai logo LoremIpsum */}
            <div className="w-5 h-14 bg-black rounded-full transform -rotate-[20deg]"></div>
            <div className="w-5 h-14 bg-black rounded-full transform -rotate-[20deg]"></div>
            <div className="w-5 h-14 bg-black rounded-full transform -rotate-[20deg]"></div>
          </div>

          {/* Teks Logo Hitam Solid */}
          <h1 className="text-3xl font-black text-black tracking-tight">
            FixFlow
          </h1>
        </div>
        
        {/* Card Putih Bersih di Tengah */}
        {/* Pakai rounded-[3.5rem] biar lengkungan pojoknya dapet banget */}
        <div className="w-full bg-white rounded-[3.5rem] p-10 md:p-12 shadow-2xl shadow-black/5">
          <Outlet />
        </div>

      </div>
    </div>
  );
}