import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: '📊' },
    { name: 'Inventory', path: '/inventory', icon: '📦' },
    { name: 'Repair Tracker', path: '/repairs', icon: '🔧' },
    { name: 'Customers', path: '/customers', icon: '👥' },
    { name: 'Bookings', path: '/bookings', icon: '📅' },
    { name: 'Staff Management', path: '/staff', icon: '👨‍🔧' },
  ];

  return (
    <aside className="flex h-full w-64 flex-col bg-[#E5E5E5] border-r border-gray-300">
      
      {/* Logo Section - Workshop Style */}
      <div className="flex flex-col items-start p-8">
        <div className="flex items-center gap-3 mb-2 group cursor-pointer">
          <div className="relative flex items-center justify-center">
            {/* Hexagon Baut - Sekarang Warna Orange #FCA311 */}
            <div className="w-10 h-10 bg-[#FCA311] rounded-lg rotate-45 flex items-center justify-center shadow-sm group-hover:rotate-[135deg] transition-all duration-500">
              <div className="w-4 h-4 bg-[#E5E5E5] rounded-full"></div>
            </div>
            <div className="absolute -right-1 -bottom-1 bg-[#14213D] text-[10px] w-5 h-5 rounded-md flex items-center justify-center border-2 border-white">
              <span className="text-white text-[10px]">🛠️</span>
            </div>
          </div>

          <div className="flex flex-col">
            <h1 className="text-xl font-black text-[#14213D] leading-none tracking-tighter">
              WORKSHOP<span className="text-[#FCA311]">PRO</span>
            </h1>
            <span className="text-[10px] font-bold text-[#14213D]/60 uppercase tracking-[0.2em]">
              Auto Service
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 font-bold transition-all ${
                isActive
                  ? 'bg-[#FCA311] text-[#14213D] shadow-md'
                  : 'text-[#14213D]/70 hover:bg-white/50 hover:text-[#14213D]'
              }`}
            >
              <span className={`text-lg ${isActive ? '' : 'grayscale'}`}>{item.icon}</span>
              <span className="text-sm">{item.name}</span>
            </Link>
          );
        })}
      </nav>
      
    </aside>
  );
}