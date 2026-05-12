import { Outlet } from 'react-router-dom'; // Tambahkan baris ini!

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-primary p-6">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-8">
           <div className="flex gap-2 mb-2">
              <div className="w-4 h-12 bg-navy rounded-full transform -skew-x-12"></div>
              <div className="w-4 h-12 bg-navy rounded-full transform -skew-x-12"></div>
              <div className="w-4 h-12 bg-navy rounded-full transform -skew-x-12"></div>
           </div>
           <h1 className="text-3xl font-black text-navy uppercase tracking-widest">BengkelPro</h1>
        </div>
        
        <div className="rounded-3xl bg-white p-10 shadow-2xl">
          <Outlet />
        </div>
      </div>
    </div>
  );
}