import React from "react";

export default function TailwindCSS() {
    return (
        <div className="bg-[#FFF9E6] border-b-4 border-[#FFB6C1] p-6 sticky top-0 z-50 font-sans shadow-md">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                
                <div className="flex items-center gap-3">
                    <div className="bg-[#FFB6C1] text-white px-4 py-1 rotate-[-3deg] shadow-[4px_4px_0px_#000] border-2 border-black">
                        <span className="font-black text-2xl tracking-tighter uppercase">Short n' Sweet</span>
                    </div>
                </div>

                <div className="flex gap-8 font-bold uppercase text-[11px] tracking-[0.3em] text-[#E57373]">
                    <a href="#" className="hover:text-black transition-colors">The Tour</a>
                    <a href="#" className="hover:text-black transition-colors">Manifesto</a>
                    <a href="#" className="text-black border-b-2 border-black pb-1 italic">Ticket Desk</a>
                </div>
            </div>
        </div>
    );
}