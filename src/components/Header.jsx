import React from 'react';

const Header = () => {
  return (
    <header className="flex items-center justify-between px-10 py-6 bg-white border-b border-surface-dark/10">
      {/* Welcome Text Section */}
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold text-navy">Hi, Cody Fisher</h1>
        <p className="text-sm text-gray-400 font-medium">Let's check your Garage today</p>
      </div>

      {/* Right Section: Icons & Profile */}
      <div className="flex items-center gap-8">
        {/* Notification Icons */}
        <div className="flex gap-5">
          {/* Email Icon with Dot */}
          <button className="relative text-navy/80 hover:text-navy transition-colors">
            <span className="text-2xl">✉️</span>
            <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-white"></span>
          </button>
          
          {/* Bell Icon with Dot */}
          <button className="relative text-navy/80 hover:text-navy transition-colors">
            <span className="text-2xl">🔔</span>
            <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-white"></span>
          </button>
        </div>

        {/* Profile Section */}
        <div className="flex items-center gap-4 pl-8 border-l border-gray-200">
          {/* Profile Image with Yellow Background */}
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-[#FCA311] overflow-hidden flex items-end justify-center border-2 border-white shadow-sm">
              <img 
                src="https://ui-avatars.com/api/?name=Cody+Fisher&background=FCA311&color=14213D" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <span className="text-base font-bold text-navy leading-none">Cody Fisher</span>
            <span className="text-xs text-gray-400 mt-1">Owner</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;