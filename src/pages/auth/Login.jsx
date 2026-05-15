import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-center text-xl font-bold text-[#1A1C1E] mb-8">Login to your account</h2>
      
      <form className="space-y-5">
        <div className="space-y-1">
          <input 
            type="email" 
            className="w-full rounded-2xl bg-[#F8F9FA] border border-transparent px-5 py-4 outline-none focus:ring-2 focus:ring-[#D4E34A]/50 focus:bg-white text-[#1A1C1E] placeholder:text-slate-400 transition-all" 
            placeholder="Email Address" 
          />
        </div>
        <div className="relative">
          <input 
            type="password" 
            className="w-full rounded-2xl bg-[#F8F9FA] border border-transparent px-5 py-4 outline-none focus:ring-2 focus:ring-[#D4E34A]/50 focus:bg-white text-[#1A1C1E] placeholder:text-slate-400 transition-all" 
            placeholder="Password" 
          />
          <span className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer text-slate-400 hover:text-[#1A1C1E]">👁️</span>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 cursor-pointer text-[#1A1C1E] font-semibold">
            <input type="checkbox" className="accent-[#D4E34A] w-4 h-4 rounded" /> Remember me
          </label>
          <Link to="/forgot" className="text-[#A8B330] font-bold hover:underline">Forgot Password?</Link>
        </div>

        <button className="w-full rounded-2xl bg-[#D4E34A] py-4 font-black text-[#1A1C1E] shadow-lg shadow-[#D4E34A]/20 transition-all hover:opacity-90 active:scale-[0.98]">
          Sign in with email
        </button>

        <div className="relative py-4 flex items-center">
            <div className="flex-grow border-t border-gray-100"></div>
            <span className="px-4 text-slate-400 text-[10px] font-bold uppercase tracking-widest">Or login with</span>
            <div className="flex-grow border-t border-gray-100"></div>
        </div>

        <div className="grid grid-cols-2 gap-4">
            <button type="button" className="flex items-center justify-center gap-2 border border-gray-100 py-3.5 rounded-2xl hover:bg-slate-50 font-bold text-sm text-[#1A1C1E] transition-colors">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt=""/> Google
            </button>
            <button type="button" className="flex items-center justify-center gap-2 border border-gray-100 py-3.5 rounded-2xl hover:bg-slate-50 font-bold text-sm text-[#1A1C1E] transition-colors">
                <img src="https://www.svgrepo.com/show/475633/apple-color.svg" className="w-5 h-5" alt=""/> Apple
            </button>
        </div>
      </form>
      
      <p className="mt-10 text-center text-sm text-slate-500 font-medium">
        Don't have an account? <Link to="/register" className="font-bold text-[#A8B330] hover:underline">Get Started</Link>
      </p>
    </div>
  );
}