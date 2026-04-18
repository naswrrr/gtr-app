export default function MustangGuest({ data }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {data.map((item) => (
                <div key={item.id} className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-[#D3BAA6]/20 group">
                    <div className="h-56 overflow-hidden relative">
                        <img
                            src={new URL(`../assets/${item.image}`, import.meta.url).href}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute top-4 left-4 bg-[#7B1B1C]/80 backdrop-blur-md px-4 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase text-white">
                            {item.history.condition}
                        </div>
                    </div>
                    <div className="p-8 text-center">
                        <span className="text-[#496C89] text-xs font-bold uppercase tracking-widest">{item.type}</span>
                        <h3 className="text-xl font-bold text-[#7B1B1C] mt-1 mb-2">{item.name}</h3>
                        <div className="mb-4 flex flex-wrap justify-center gap-1">
                            {item.features.map((feat, idx) => (
                                <span key={idx} className="text-[9px] text-[#496C89] bg-[#D3BAA6]/20 px-2 py-0.5 rounded">✓ {feat}</span>
                            ))}
                        </div>
                        <div className="border-t border-[#D3BAA6]/20 pt-6 flex items-center justify-between">
                            <div className="text-left">
                                <p className="text-[10px] text-[#496C89] uppercase font-semibold">Starting at</p>
                                <p className="text-lg font-bold text-slate-700">${item.price.toLocaleString()}</p>
                            </div>
                            <button className="bg-[#7B1B1C] text-white w-10 h-10 rounded-full hover:bg-[#496C89] transition-colors shadow-lg shadow-[#7B1B1C]/20">+</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}