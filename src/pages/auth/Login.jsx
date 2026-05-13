import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div className="w-full max-w-md mx-auto">
      

      <h2 className="text-center text-xl font-bold text-[#14213D] mb-8">Login to your account</h2>
      
      <form className="space-y-5">
        <div className="space-y-1">
          <input 
            type="email" 
            className="w-full rounded-2xl bg-[#E5E5E5]/50 border border-transparent px-5 py-4 outline-none focus:ring-2 focus:ring-[#FCA311]/50 focus:bg-white text-[#14213D] placeholder:text-slate-400 transition-all" 
            placeholder="Email Address" 
          />
        </div>
        <div className="relative">
          <input 
            type="password" 
            className="w-full rounded-2xl bg-[#E5E5E5]/50 border border-transparent px-5 py-4 outline-none focus:ring-2 focus:ring-[#FCA311]/50 focus:bg-white text-[#14213D] placeholder:text-slate-400 transition-all" 
            placeholder="Password" 
          />
          <span className="absolute right-5 top-1/2 -translate-y-1/2 cursor-pointer text-slate-400 hover:text-[#14213D]">👁️</span>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 cursor-pointer text-[#14213D] font-semibold">
            <input type="checkbox" className="accent-[#FCA311] w-4 h-4 rounded" /> Remember me
          </label>
          <Link to="/forgot" className="text-[#FCA311] font-bold hover:underline">Forgot Password?</Link>
        </div>

        <button className="w-full rounded-2xl bg-[#FCA311] py-4 font-black text-[#14213D] shadow-lg shadow-[#FCA311]/20 transition-all hover:opacity-90 active:scale-[0.98]">
          Sign in with email
        </button>

        <div className="relative py-4 flex items-center">
            <div className="flex-grow border-t border-[#E5E5E5]"></div>
            <span className="px-4 text-slate-400 text-[10px] font-bold uppercase tracking-widest">Or login with</span>
            <div className="flex-grow border-t border-[#E5E5E5]"></div>
        </div>

        <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 border border-[#E5E5E5] py-3.5 rounded-2xl hover:bg-slate-50 font-bold text-sm text-[#14213D] transition-colors">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt=""/> Google
            </button>
            <button className="flex items-center justify-center gap-2 border border-[#E5E5E5] py-3.5 rounded-2xl hover:bg-slate-50 font-bold text-sm text-[#14213D] transition-colors">
                <span className="text-lg leading-none">🍎</span> Apple
            </button>
        </div>
      </form>
      
      <p className="mt-10 text-center text-sm text-slate-500 font-medium">
        Don't have an account? <Link to="/register" className="font-bold text-[#FCA311] hover:underline">Get Started</Link>
      </p>
    </div>
  );
}