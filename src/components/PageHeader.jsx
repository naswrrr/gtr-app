import React from 'react';
import { useNavigate } from 'react-router-dom';

function getCurrentAccount() {
  try {
    const rawUser = localStorage.getItem('user');
    if (rawUser) {
      return JSON.parse(rawUser);
    }

    const rawLoggedUser = localStorage.getItem('loggedUser');
    if (rawLoggedUser) {
      return JSON.parse(rawLoggedUser);
    }
  } catch (error) {
    console.error('Failed to parse auth user data', error);
  }

  return null;
}

export default function PageHeader() {
  const navigate = useNavigate();
  const currentAccount = getCurrentAccount();

  const displayName = currentAccount?.firstName || currentAccount?.username || currentAccount?.name || currentAccount?.workshopName || 'Admin';
  const roleLabel = currentAccount?.role || 'Owner';
  const emailLabel = currentAccount?.email || currentAccount?.username || 'admin@fixflow.com';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('loggedUser');
    navigate('/login', { replace: true });
  };

  return (
    <header className="flex items-center justify-between px-10 py-4 bg-white sticky top-0 z-50">
      {/* Left Section: Greeting */}
      <div className="flex flex-col">
        <h1 className="text-xl font-bold text-[#1A1C1E] leading-tight">Hi, {displayName}</h1>
        <p className="text-[11px] text-gray-400 font-medium">{emailLabel}</p>
      </div>

      {/* Middle Section: Search Bar */}
      <div className="flex-1 max-w-[420px] mx-10">
        <div className="relative group">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input 
            type="text" 
            placeholder="Search.." 
            className="w-full bg-[#F3F4F6]/50 rounded-2xl py-2.5 pl-11 pr-14 text-xs font-medium outline-none border-none focus:bg-[#F3F4F6] transition-all text-gray-600"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-0.5 text-gray-400">
             <span className="text-[10px] font-bold">⌘</span>
             <span className="text-[10px] font-bold">K</span>
          </div>
        </div>
      </div>

      {/* Right Section: Actions & Profile */}
      <div className="flex items-center gap-6">
        {/* Notification Icons */}
        <div className="flex items-center gap-4">
          <button className="relative p-1 text-gray-500 hover:text-black transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-[#FF5B5B] rounded-full border-2 border-white"></span>
          </button>

          <button className="relative p-1 text-gray-500 hover:text-black transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-[#FF5B5B] rounded-full border-2 border-white"></span>
          </button>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-3 ml-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D4E34A] text-sm font-bold text-[#1A1C1E] shadow-sm">
            {displayName.charAt(0).toUpperCase()}
          </div>
          <div className="flex flex-col">
            <span className="text-[13px] font-bold text-[#1A1C1E] leading-tight">{displayName}</span>
            <span className="text-[10px] text-gray-400 font-medium">{roleLabel}</span>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="rounded-full border border-gray-200 px-3 py-2 text-[11px] font-semibold text-gray-600 transition hover:border-[#D4E34A] hover:bg-[#F8FBE8] hover:text-[#1A1C1E]"
        >
          Logout
        </button>
      </div>
    </header>
  );
}