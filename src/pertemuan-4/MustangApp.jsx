import { useState } from "react";
import mustangData from "./mustang.json";
import MustangGuest from "./MustangGuest";
import MustangAdmin from "./MustangAdmin";

export default function MustangApp() {
    const [view, setView] = useState("guest");
    const [filter, setFilter] = useState({ search: "", type: "", condition: "" });

    const handleInput = (e) => setFilter({ ...filter, [e.target.name]: e.target.value });

    const filteredData = mustangData.filter((m) => {
        const matchesSearch = m.name.toLowerCase().includes(filter.search.toLowerCase());
        const matchesType = filter.type ? m.type === filter.type : true;
        const matchesCond = filter.condition ? m.history.condition === filter.condition : true;
        return matchesSearch && matchesType && matchesCond;
    });

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#D3BAA6]/15 via-white to-[#496C89]/5 p-6 md:p-12 font-sans text-slate-700">
            
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                <div>
                    <h1 className="text-4xl font-black text-[#496C89] uppercase italic tracking-tighter">
                        Mustang<span className="text-[#7B1B1C]">Collection</span>
                    </h1>
                    <p className="text-[#D3BAA6] font-bold text-sm tracking-[0.2em] uppercase mt-2">Elite Performance & Heritage</p>
                </div>

                {/* Navigasi Button */}
                <div className="flex bg-white/60 backdrop-blur-sm p-1.5 rounded-2xl shadow-sm border border-[#D3BAA6]/30">
                    <button 
                        onClick={() => setView("guest")} 
                        className={`px-8 py-2.5 rounded-xl transition-all font-bold ${view === 'guest' ? 'bg-[#496C89] text-white shadow-lg shadow-[#496C89]/20' : 'text-[#496C89]/50 hover:bg-[#D3BAA6]/10'}`}
                    >
                        Guest View
                    </button>
                    <button 
                        onClick={() => setView("admin")} 
                        className={`px-8 py-2.5 rounded-xl transition-all font-bold ${view === 'admin' ? 'bg-[#496C89] text-white shadow-lg shadow-[#496C89]/20' : 'text-[#496C89]/50 hover:bg-[#D3BAA6]/10'}`}
                    >
                        Admin View
                    </button>
                </div>
            </div>

            {/* Filter Section - Dibuat sedikit transparan agar menyatu dengan bg */}
            <div className="max-w-7xl mx-auto bg-white/80 backdrop-blur-md p-6 rounded-3xl shadow-sm border border-[#D3BAA6]/20 mb-10 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-[#D3BAA6] uppercase ml-2">Search Model</label>
                    <input name="search" placeholder="E.g. Shelby GT500..." onChange={handleInput} className="bg-white p-4 rounded-2xl outline-none focus:ring-2 focus:ring-[#496C89]/20 border border-[#D3BAA6]/20 shadow-sm" />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-[#D3BAA6] uppercase ml-2">Category</label>
                    <select name="type" onChange={handleInput} className="bg-white p-4 rounded-2xl outline-none border border-[#D3BAA6]/20 shadow-sm text-[#496C89] font-medium appearance-none">
                        <option value="">All Categories</option>
                        <option value="Classic">Classic</option>
                        <option value="Modern Muscle">Modern Muscle</option>
                    </select>
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-[#D3BAA6] uppercase ml-2">Condition</label>
                    <select name="condition" onChange={handleInput} className="bg-white p-4 rounded-2xl outline-none border border-[#D3BAA6]/20 shadow-sm text-[#496C89] font-medium appearance-none">
                        <option value="">All Conditions</option>
                        <option value="New">New</option>
                        <option value="Restored">Restored</option>
                    </select>
                </div>
            </div>

            <div className="max-w-7xl mx-auto">
                {view === "guest" ? <MustangGuest data={filteredData} /> : <MustangAdmin data={filteredData} />}
            </div>
        </div>
    );
}