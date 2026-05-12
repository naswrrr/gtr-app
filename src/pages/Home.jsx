export default function Home() {
  const stats = [
    { label: 'New Net Income', value: '£8,245.00', change: '-0.5%', icon: '💰' },
    { label: 'Total Bookings', value: '256', change: '+1.0%', icon: '🛒' },
    { label: 'Resolved issues', value: '1,256', change: '+1.0%', icon: '🏷️' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {stats.map((stat, i) => (
          <div key={i} className="group rounded-3xl bg-white p-6 shadow-sm border border-transparent hover:border-primary/20 transition-all hover:shadow-md">
            <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-primary/10 rounded-2xl text-2xl">{stat.icon}</div>
                <button className="text-gray-300 hover:text-navy">•••</button>
            </div>
            <p className="text-sm font-bold text-navy/60 uppercase tracking-wider">{stat.label}</p>
            <div className="flex items-end gap-3 mt-1">
                <p className="text-3xl font-black text-navy">{stat.value}</p>
                <span className={`text-xs font-bold mb-1 ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                    {stat.change} <span className="text-[10px] text-gray-400 font-normal">from last week</span>
                </span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Graph Placeholder Section */}
      <div className="rounded-3xl bg-white p-8 shadow-sm border border-gray-100 h-80 flex flex-col justify-between">
        <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-navy">Overall Sales <span className="ml-2 text-xs bg-primary/20 text-primary-dark px-2 py-1 rounded-lg">📈 23.5%</span></h3>
            <div className="flex gap-4 text-xs font-bold text-gray-400">
                <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-primary/40"></div> Organic</span>
                <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-primary"></div> Professional</span>
            </div>
        </div>
        <div className="flex-1 flex items-end gap-2 pt-10">
            {/* Visual Bar Mockup */}
            {[40, 70, 45, 90, 65, 80, 30].map((h, i) => (
                <div key={i} className="flex-1 bg-surface rounded-t-xl transition-all hover:bg-primary" style={{ height: `${h}%` }}></div>
            ))}
        </div>
      </div>
    </div>
  );
}