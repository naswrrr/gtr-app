export default function MustangAdmin({ data }) {
    return (
        <div className="bg-white rounded-3xl shadow-sm border border-[#D3BAA6]/30 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-[#D3BAA6]/10 border-b border-[#D3BAA6]/20">
                        <tr className="text-[#496C89] text-sm uppercase tracking-wider">
                            <th className="p-5 font-semibold">Vehicle</th>
                            <th className="p-5 font-semibold">Engine Specs</th>
                            <th className="p-5 font-semibold">History</th>
                            <th className="p-5 font-semibold">Stock</th>
                            <th className="p-5 font-semibold">Total Price</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#D3BAA6]/10">
                        {data.map((item) => (
                            <tr key={item.id} className="hover:bg-[#D3BAA6]/5 transition-colors">
                                <td className="p-5">
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={new URL(`../assets/${item.image}`, import.meta.url).href}
                                            alt={item.name}
                                            className="w-14 h-14 rounded-xl object-cover border border-[#D3BAA6]/50"
                                        />
                                        <div>
                                            <p className="font-bold text-[#7B1B1C] leading-none mb-1">{item.name}</p>
                                            <p className="text-xs text-[#496C89]">{item.type}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-5 text-sm text-slate-600 italic">
                                    {item.specifications.engine} <span className="text-[#D3BAA6]">|</span> {item.specifications.hp} HP
                                </td>
                                <td className="p-5">
                                    <p className="text-sm font-medium leading-none mb-1 text-slate-700">{item.history.origin}</p>
                                    <p className="text-[10px] text-[#7B1B1C] font-bold uppercase">{item.history.condition}</p>
                                </td>
                                <td className="p-5 text-sm">
                                    <span className={`px-3 py-1 rounded-full font-bold ${item.stock < 2 ? 'bg-[#7B1B1C]/10 text-[#7B1B1C]' : 'bg-[#496C89]/10 text-[#496C89]'}`}>
                                        {item.stock} Units
                                    </span>
                                </td>
                                <td className="p-5 font-bold text-slate-700">
                                    ${item.price.toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}