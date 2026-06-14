import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: '📊' },
    { name: 'Customer Management', path: '/admin/customers', icon: '👥' },
    { name: 'Marketing Automation', path: '/admin/marketing', icon: '📢' },
    { name: 'Customer Analytics', path: '/admin/analytics', icon: '📈' },
    { name: 'Feedback & Complaint', path: '/admin/feedback', icon: '⭐' },
    { name: 'Inventory Stock', path: '/admin/inventory', icon: '📦' },
    { name: 'Billing & Payment', path: '/admin/payment', icon: '💳' },
  ];

  return (
    <aside className="w-72 h-screen bg-white flex flex-col border-r border-gray-100 sticky top-0">
      {/* --- LOGO SECTION --- */}
      <div className="p-10 pb-12 flex flex-col items-start gap-4">
        <div className="flex gap-1.5 items-center">
          {/* Tiga kapsul miring sesuai template */}
          <div className="w-3.5 h-9 bg-[#D4E34A] rounded-full transform -rotate-[20deg]"></div>
          <div className="w-3.5 h-9 bg-[#D4E34A] rounded-full transform -rotate-[20deg] opacity-80"></div>
          <div className="w-3.5 h-9 bg-[#D4E34A] rounded-full transform -rotate-[20deg] opacity-60"></div>
        </div>
        <h1 className="text-2xl font-black text-[#1A1C1E] tracking-tight">
          FixFlow
        </h1>
      </div>

      {/* --- NAVIGATION --- */}
      <nav className="flex-1 px-6 space-y-2 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-4 px-5 py-3.5 rounded-[20px] transition-all duration-300 ${
                isActive 
                  ? 'bg-[#D4E34A] text-[#1A1C1E] shadow-sm shadow-[#d4e34a44]' 
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <span className={`text-xl ${isActive ? 'brightness-75' : 'opacity-80'}`}>
                {item.icon}
              </span>
              <span className={`text-[13px] font-bold tracking-tight ${isActive ? 'text-black' : ''}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}