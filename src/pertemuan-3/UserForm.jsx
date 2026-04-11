import { useState } from "react";
import InputField from "./components/InputField";

export default function UserForm() {
    const [formData, setFormData] = useState({
        nama: "", 
        email: "", 
        phone: "", 
        kategori: "", 
        konser: "",
        jumlah: 1 // Tambahkan state jumlah tiket
    });

    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [hasil, setHasil] = useState(null);

    const validate = (name, value) => {
        let errorMsg = "";
        if (name === "nama") {
            if (!value) errorMsg = "Name is required, honey.";
            else if (value.length < 3) errorMsg = "That's too short for a superstar.";
            else if (/\d/.test(value)) errorMsg = "Names don't have numbers in them.";
        }
        if (name === "email") {
            if (!value) errorMsg = "How will I send the ticket?";
            else if (!/\S+@\S+\.\S+/.test(value)) errorMsg = "That's not a real email format.";
        }
        if (name === "phone") {
            if (!value) errorMsg = "I need your digits.";
            else if (!/^\d+$/.test(value)) errorMsg = "Only numbers, please.";
        }
        // Validasi Jumlah Tiket
        if (name === "jumlah") {
            if (value < 1) errorMsg = "At least buy one ticket!";
            if (value > 5) errorMsg = "Max 5 tickets per person.";
        }
        setErrors(prev => ({ ...prev, [name]: errorMsg }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        validate(name, value);
    };

    const isFormValid = 
        formData.nama && formData.email && formData.phone && 
        formData.kategori && formData.konser && formData.jumlah > 0 &&
        !Object.values(errors).some(err => err !== "");

    const handleSubmit = (e) => {
        e.preventDefault();
        const pricePerTicket = formData.kategori === "VIP" ? 5500000 : 2500000;
        const totalHarga = pricePerTicket * formData.jumlah; // Rumus: Harga x Jumlah
        
        setHasil({ ...formData, total: totalHarga });
        setIsSubmitted(true);
    };

    return (
        <div className="min-h-screen bg-[#FFB6C1] flex items-center justify-center p-6 font-sans text-black">
            <div className="relative z-10 w-full max-w-5xl bg-[#FFF9E6] shadow-[20px_20px_0px_#000] border-4 border-black flex flex-col md:flex-row overflow-hidden">
                {!isSubmitted ? (
                    <>
                        <div className="md:w-5/12 relative bg-[#AEC6CF] border-r-4 border-black p-10 flex flex-col justify-between overflow-hidden">
                            <div className="relative z-10">
                                <h1 className="text-6xl font-black uppercase italic leading-none text-[#FFF9E6] drop-shadow-[4px_4px_0px_#000]">Short <br/> n' Sweet</h1>
                                <p className="mt-4 font-black uppercase tracking-widest bg-black text-white inline-block px-2">Ticket Registry</p>
                            </div>
                            <div className="absolute inset-0 opacity-40 bg-[url('https://www.billboard.com/wp-content/uploads/2024/08/sabrina-carpenter-short-n-sweet-album-art-2024-billboard-1240.jpg')] bg-cover bg-center"></div>
                        </div>

                        <div className="md:w-7/12 p-10 bg-white">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <InputField label="Your Name" name="nama" type="text" value={formData.nama} onChange={handleChange} error={errors.nama} placeholder="Full Name" />
                                <InputField label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} placeholder="name@email.com" />
                                
                                <div className="grid grid-cols-2 gap-4">
                                    <InputField label="Phone Number" name="phone" type="text" value={formData.phone} onChange={handleChange} error={errors.phone} placeholder="0812xxxx" />
                                    {/* INPUT JUMLAH TIKET */}
                                    <InputField label="Tickets" name="jumlah" type="number" value={formData.jumlah} onChange={handleChange} error={errors.jumlah} placeholder="Qty" />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="text-left">
                                        <label className="block text-black font-black mb-1 text-[10px] uppercase">Section</label>
                                        <select name="kategori" value={formData.kategori} onChange={handleChange} className="w-full p-4 border-4 border-black bg-white font-bold outline-none cursor-pointer">
                                            <option value="">Choose Section</option>
                                            <option value="General">Nonsense Floor (2.5M)</option>
                                            <option value="VIP">Coffee Bed VIP (5.5M)</option>
                                        </select>
                                    </div>
                                    <div className="text-left">
                                        <label className="block text-black font-black mb-1 text-[10px] uppercase">City</label>
                                        <select name="konser" value={formData.konser} onChange={handleChange} className="w-full p-4 border-4 border-black bg-white font-bold outline-none cursor-pointer">
                                            <option value="">Choose City</option>
                                            <option value="Jakarta">Jakarta</option>
                                            <option value="Singapore">Singapore</option>
                                        </select>
                                    </div>
                                </div>

                                {isFormValid ? (
                                    <button type="submit" className="w-full bg-black text-white py-6 font-black text-xl uppercase italic tracking-widest hover:bg-[#FFB6C1] hover:text-black transition-all shadow-[8px_8px_0px_#AEC6CF]">
                                        Finalize Reservation →
                                    </button>
                                ) : (
                                    <div className="p-4 border-4 border-dashed border-black text-center font-black uppercase text-xs opacity-50">
                                        Fill everything correctly to book
                                    </div>
                                )}
                            </form>
                        </div>
                    </>
                ) : (
                    /* HASIL OUTPUT DENGAN JUMLAH TIKET */
                    <div className="w-full p-20 text-center bg-[#FFF9E6]">
                        <h2 className="text-5xl font-black uppercase italic mb-4 underline">Booking Secured!</h2>
                        <div className="max-w-md mx-auto bg-white border-4 border-black p-8 shadow-[15px_15px_0px_#AEC6CF] text-left">
                            <div className="space-y-3 font-bold uppercase text-xs">
                                <p className="border-b-2 border-black pb-2">Guest: {hasil.nama}</p>
                                <p className="border-b-2 border-black pb-2">Venue: {hasil.konser}</p>
                                <p className="border-b-2 border-black pb-2">Tier: {hasil.kategori}</p>
                                <p className="border-b-2 border-black pb-2">Quantity: {hasil.jumlah} Ticket(s)</p>
                                <p className="text-3xl font-black pt-4">TOTAL: IDR {hasil.total.toLocaleString()}</p>
                            </div>
                        </div>
                        <button onClick={() => setIsSubmitted(false)} className="mt-12 bg-black text-white px-10 py-3 font-black uppercase tracking-widest">New Order</button>
                    </div>
                )}
            </div>
        </div>
    );
}