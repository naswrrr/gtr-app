export default function InputField({ label, type, name, value, onChange, placeholder, error }) {
    return (
        <div className="mb-5 text-left group">
            <label className={`block font-bold mb-1 text-xs uppercase tracking-widest transition-colors 
                ${error ? 'text-red-500' : 'text-blue-400 group-focus-within:text-blue-600'}`}>
                {label}
            </label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`w-full p-3 border-2 rounded-xl outline-none transition-all bg-slate-50 font-medium shadow-inner
                ${error
                        ? 'border-red-400 focus:border-red-600 focus:ring-red-50'
                        : 'border-blue-100 focus:border-blue-600 focus:ring-blue-50 focus:ring-4'}`}
            />

            {/* INI TAMBAHANNYA: Supaya error-nya muncul di bawah input */}
            {error && (
                <p className="mt-1.5 text-red-500 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 animate-pulse">
                    <span>⚠️</span> {error}
                </p>
            )}
        </div>
    );
}