import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { useCustomer } from '../context/CustomerContext';
import { 
  Wrench, User, Calendar, Award, Ticket, History, 
  MapPin, Phone, Mail, Clock, HelpCircle, ShieldAlert,
  ChevronDown, Search, Menu, X, ArrowUpRight, ShieldCheck, LogOut
} from 'lucide-react';
import { toast } from 'sonner';
import FloatingHelp from '../components/FloatingHelp';

export default function CustomerLayout() {
  const { currentCustomer, customers, selectCustomer, notifications, isCustomerLoggedIn, logoutCustomer } = useCustomer();
  const location = useLocation();
  const navigate = useNavigate();
  const [showSimulator, setShowSimulator] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isCustomerArea = location.pathname.startsWith('/customer');
  const isLoginPage = location.pathname === '/customer/login';

  // Protect customer routes
  if (isCustomerArea && !isLoginPage && !isCustomerLoggedIn) {
    return <Navigate to="/customer/login" replace />;
  }

  const navLinks = [
    { name: 'Beranda', path: '/' },
    { name: 'Layanan', path: '/layanan' },
    { name: 'Promo & Voucher', path: '/promo' },
    { name: 'Tentang Kami', path: '/tentang-kami' },
  ];

  const customerNavItems = [
    { name: 'Dashboard Saya', path: '/customer/dashboard', icon: User },
    { name: 'Booking Online', path: '/customer/booking', icon: Calendar },
    { name: 'Status Tracking', path: '/customer/tracking', icon: Wrench },
    { name: 'Loyalty Points', path: '/customer/loyalty', icon: Award },
    { name: 'Voucher Saya', path: '/customer/vouchers', icon: Ticket },
    { name: 'Riwayat Service', path: '/customer/history', icon: History },
    { name: 'Customer Journey', path: '/customer/journey', icon: ShieldCheck },
  ];

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.id.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 5);

  const unreadNotifsCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">

      {/* --- HEADER NAVBAR --- */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex gap-1 items-center">
              <div className="w-2.5 h-7 bg-[#D4E34A] rounded-full transform -rotate-[20deg]" />
              <div className="w-2.5 h-7 bg-[#D4E34A] rounded-full transform -rotate-[20deg] opacity-80" />
              <div className="w-2.5 h-7 bg-[#D4E34A] rounded-full transform -rotate-[20deg] opacity-60" />
            </div>
            <span className="text-xl font-black text-slate-900 tracking-tight ml-1">FixFlow</span>
          </Link>

          {/* Public Nav Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-semibold tracking-tight transition-colors ${
                    isActive ? 'text-slate-900 font-bold border-b-2 border-[#D4E34A] pb-1' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Customer Area Quick Toggle & Active Customer Dropdown */}
          <div className="hidden lg:flex items-center gap-4">
            
            {isCustomerLoggedIn ? (
              <>
                {/* Active Area Nav */}
                <Link
                  to="/customer/dashboard"
                  className={`text-sm font-semibold px-4 py-2 rounded-xl transition-all ${
                    isCustomerArea 
                      ? 'bg-slate-950 text-white shadow-sm' 
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Area Customer
                </Link>

                {/* Dynamic Customer Switcher Dropdown */}
                {currentCustomer && (
                  <div className="relative">
                    <button
                      onClick={() => setShowSimulator(!showSimulator)}
                      className="flex items-center gap-2 bg-slate-950 text-white px-4 py-2.5 rounded-xl border border-slate-800 hover:bg-slate-900 transition-all text-xs shadow-md"
                    >
                      <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <div className="text-left leading-tight">
                        <div className="font-bold text-[10px] text-slate-400">Simulated Customer:</div>
                        <div className="font-black text-white">{currentCustomer.name}</div>
                      </div>
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    </button>

                    {showSimulator && (
                      <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 p-4 z-50 text-slate-800 animate-in fade-in slide-in-from-top-2 duration-200">
                        <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
                          <h4 className="font-bold text-xs text-slate-500 uppercase tracking-wider">Simulasikan User CRM</h4>
                          <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded font-bold text-slate-600">Total: {customers.length}</span>
                        </div>

                        {/* Search Field */}
                        <div className="relative mb-3">
                          <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                          <input
                            type="text"
                            placeholder="Cari nama / customer ID..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-9 pr-4 text-xs focus:outline-none focus:ring-2 focus:ring-[#D4E34A] focus:border-transparent"
                          />
                        </div>

                        {/* Customer Options */}
                        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                          {filteredCustomers.map((cust) => {
                            const isSelected = cust.id === currentCustomer.id;
                            return (
                              <button
                                key={cust.id}
                                onClick={() => {
                                  selectCustomer(cust.id);
                                  setShowSimulator(false);
                                }}
                                className={`w-full text-left p-2.5 rounded-xl transition-all flex items-center justify-between text-xs ${
                                  isSelected 
                                    ? 'bg-[#D4E34A]/20 border border-[#D4E34A] font-bold text-slate-900' 
                                    : 'hover:bg-slate-50 border border-transparent text-slate-700'
                                }`}
                              >
                                <div>
                                  <div className="font-black text-slate-900">{cust.name}</div>
                                  <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                                    <span>{cust.id}</span>
                                    <span>•</span>
                                    <span>{cust.vehicle?.split(' (')[0] || 'Tanpa Kendaraan'}</span>
                                  </div>
                                </div>
                                <span className={`px-2 py-0.5 rounded-full font-bold text-[9px] ${
                                  cust.tier === 'Premium' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-600'
                                }`}>
                                  {cust.tier}
                                </span>
                              </button>
                            );
                          })}
                          {filteredCustomers.length === 0 && (
                            <p className="text-center text-xs text-slate-400 py-4">Customer tidak ditemukan.</p>
                          )}
                        </div>

                        {/* Custom Tip */}
                        <div className="mt-3 bg-amber-50 border border-amber-100 rounded-xl p-2.5 text-[10px] text-amber-700 leading-normal flex items-start gap-2">
                          <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
                          <span>Data Loyalty Point, Riwayat Servis, dan WhatsApp Alerts akan langsung disesuaikan dengan profil terpilih.</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Header Logout */}
                <button
                  onClick={() => {
                    logoutCustomer();
                    toast.success("Anda berhasil keluar dari portal member.");
                    navigate('/');
                  }}
                  className="bg-rose-50 text-rose-600 hover:bg-rose-105 p-2.5 rounded-xl transition-all border border-rose-100"
                  title="Logout Member"
                >
                  <LogOut className="w-4.5 h-4.5" />
                </button>
              </>
            ) : (
              <Link
                to="/customer/login"
                className="bg-slate-950 text-white font-bold px-5 py-2.5 rounded-xl text-xs hover:bg-slate-900 transition-all shadow-md"
              >
                Masuk Member
              </Link>
            )}

          </div>

          {/* Mobile Menu Buttons */}
          <div className="flex items-center gap-2 lg:hidden">
            {isCustomerLoggedIn && (
              <button
                onClick={() => setShowSimulator(!showSimulator)}
                className="bg-slate-900 text-white p-2 rounded-xl text-xs flex items-center gap-1 font-bold"
              >
                Simulate 👤
              </button>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-950 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu expanded */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-100 bg-white py-4 px-6 space-y-4 shadow-inner">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-bold text-slate-600 hover:text-slate-950"
                >
                  {link.name}
                </Link>
              ))}
              <hr className="border-slate-100" />
              {isCustomerLoggedIn ? (
                <>
                  <Link
                    to="/customer/dashboard"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm font-bold text-slate-900 bg-[#D4E34A] py-2.5 px-4 rounded-xl text-center shadow-sm block animate-pulse"
                  >
                    Dashboard Customer
                  </Link>
                  <button
                    onClick={() => {
                      logoutCustomer();
                      setMobileMenuOpen(false);
                      toast.success("Anda berhasil keluar dari portal member.");
                      navigate('/');
                    }}
                    className="text-sm font-bold text-rose-600 bg-rose-50 border border-rose-100 py-2.5 px-4 rounded-xl text-center shadow-sm block w-full"
                  >
                    Logout Member
                  </button>
                </>
              ) : (
                <Link
                  to="/customer/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-bold text-white bg-slate-950 py-2.5 px-4 rounded-xl text-center shadow-sm block"
                >
                  Masuk Member
                </Link>
              )}
            </div>
          </div>
        )}
      </header>

      {/* --- CONTENT WORKSPACE --- */}
      <div className="flex-1 flex flex-col">
        {isCustomerArea && !isLoginPage ? (
          /* Split View for Customer Area */
          <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8 flex-1">
            
            {/* Sidebar Navigation Area */}
            <aside className="w-full lg:w-64 shrink-0">
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm sticky top-28 space-y-6">
                
                {/* Active Profile Info */}
                {currentCustomer && (
                  <div className="text-center pb-6 border-b border-slate-100">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-slate-800 to-slate-950 text-white flex items-center justify-center font-black text-xl mx-auto shadow-md relative">
                      {currentCustomer.name.split(' ').map(n => n[0]).join('')}
                      <span className={`absolute bottom-0 right-0 w-4.5 h-4.5 rounded-full border-2 border-white flex items-center justify-center text-[8px] font-bold text-white shadow-sm ${
                        currentCustomer.tier === 'Premium' ? 'bg-indigo-600' : 'bg-slate-400'
                      }`}>
                        {currentCustomer.tier === 'Premium' ? 'P' : 'R'}
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-900 mt-3 text-sm tracking-tight">{currentCustomer.name}</h3>
                    <p className="text-[10px] text-slate-400 font-semibold mt-1 uppercase tracking-wider">{currentCustomer.tier} Member</p>
                  </div>
                )}

                {/* Sub Menu Links */}
                <nav className="space-y-1.5">
                  {customerNavItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                      <Link
                        key={item.name}
                        to={item.path}
                        className={`flex items-center gap-3.5 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                          isActive 
                            ? 'bg-[#D4E34A] text-slate-950 shadow-sm shadow-[#D4E34A]/30' 
                            : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                        }`}
                      >
                        <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                  
                  <hr className="border-slate-100 my-2" />
                  
                  <button
                    onClick={() => {
                      logoutCustomer();
                      toast.success("Anda berhasil keluar dari portal member.");
                      navigate('/');
                    }}
                    className="w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl text-xs font-bold text-rose-600 hover:bg-rose-50/50 transition-all"
                  >
                    <LogOut className="w-4.5 h-4.5 text-rose-500" />
                    <span>Keluar Member</span>
                  </button>
                </nav>
              </div>
            </aside>

            {/* Inner Content Area */}
            <main className="flex-1 min-w-0">
              <Outlet />
            </main>
          </div>
        ) : (
          /* Full Width View for Public Guest pages / login page */
          <main className="flex-1 w-full">
            <Outlet />
          </main>
        )}
      </div>

      <FloatingHelp />

      {/* --- FOOTER SECTION --- */}
      <footer className="bg-slate-900 text-slate-400 pt-16 pb-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex gap-1 items-center">
                <div className="w-2.5 h-7 bg-[#D4E34A] rounded-full transform -rotate-[20deg]" />
                <div className="w-2.5 h-7 bg-[#D4E34A] rounded-full transform -rotate-[20deg] opacity-80" />
                <div className="w-2.5 h-7 bg-[#D4E34A] rounded-full transform -rotate-[20deg] opacity-60" />
              </div>
              <span className="text-xl font-black text-white tracking-tight ml-1">FixFlow</span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              Platform CRM Bengkel Mobil & Motor terintegrasi. Memastikan servis berkala tepat waktu, garansi transparan, dan program loyalitas pelanggan terbaik di Indonesia.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-white text-xs transition-colors">FB</a>
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-white text-xs transition-colors">IG</a>
              <a href="#" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-white text-xs transition-colors">YT</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white text-sm mb-4">Navigasi</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/" className="hover:text-white transition-colors">Beranda</Link></li>
              <li><Link to="/layanan" className="hover:text-white transition-colors">Layanan Servis</Link></li>
              <li><Link to="/promo" className="hover:text-white transition-colors">Promo & Voucher</Link></li>
              <li><Link to="/tentang-kami" className="hover:text-white transition-colors">Tentang Kami</Link></li>
              <li><Link to="/customer/booking" className="hover:text-white transition-colors">Booking Servis Online</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm mb-4">Hubungi Kami</h4>
            <div className="flex items-start gap-2.5 text-xs text-slate-400 leading-relaxed">
              <MapPin className="w-4 h-4 text-[#D4E34A] shrink-0 mt-0.5" />
              <span>Jl. Otomotif Modern Raya No. 42, Gading Serpong, Tangerang</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-slate-400">
              <Phone className="w-4 h-4 text-[#D4E34A] shrink-0" />
              <span>+62-811-9988-7766</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-slate-400">
              <Mail className="w-4 h-4 text-[#D4E34A] shrink-0" />
              <span>support@fixflow.co.id</span>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="space-y-4">
            <h4 className="font-bold text-white text-sm mb-4">Jam Operasional</h4>
            <div className="flex items-start gap-3 bg-slate-800/50 p-4 rounded-2xl border border-slate-800 text-xs">
              <Clock className="w-4.5 h-4.5 text-[#D4E34A] shrink-0 mt-0.5" />
              <div className="space-y-1">
                <div className="text-white font-bold">Senin - Sabtu</div>
                <div>08.00 AM - 05.00 PM</div>
                <div className="text-slate-500 font-bold text-[10px] mt-1">Minggu & Hari Libur Tutup</div>
              </div>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800 pt-8 mt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} FixFlow CRM Bengkel. Seluruh hak cipta dilindungi.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:underline">Syarat & Ketentuan</a>
            <a href="#" className="hover:underline">Kebijakan Privasi</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
