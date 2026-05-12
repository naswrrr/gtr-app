import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div>
      <h2 className="text-center text-2xl font-bold text-navy mb-8">Login to your account</h2>
      
      <form className="space-y-5">
        <div className="space-y-1">
          <input 
            type="email" 
            className="w-full rounded-xl bg-surface/50 border-none px-4 py-4 outline-none focus:ring-2 focus:ring-primary/50 text-navy placeholder:text-gray-400" 
            placeholder="Email" 
          />
        </div>
        <div className="relative">
          <input 
            type="password" 
            className="w-full rounded-xl bg-surface/50 border-none px-4 py-4 outline-none focus:ring-2 focus:ring-primary/50 text-navy placeholder:text-gray-400" 
            placeholder="Password" 
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400">👁️</span>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 cursor-pointer text-navy font-medium">
            <input type="checkbox" className="accent-primary w-4 h-4" /> Remember me
          </label>
          <Link to="/auth/forgot" className="text-primary-dark font-bold hover:underline">Forgot Password?</Link>
        </div>

        <button className="w-full rounded-xl bg-primary py-4 font-bold text-navy shadow-lg shadow-primary/30 transition-transform hover:scale-[1.02] active:scale-95">
          Sign in with email
        </button>

        <div className="relative py-4 flex items-center">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="px-4 text-gray-400 text-xs uppercase">Or login with</span>
            <div className="flex-grow border-t border-gray-200"></div>
        </div>

        <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 border border-gray-200 py-3 rounded-xl hover:bg-gray-50 font-medium text-sm transition-colors">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt=""/> Google
            </button>
            <button className="flex items-center justify-center gap-2 border border-gray-200 py-3 rounded-xl hover:bg-gray-50 font-medium text-sm transition-colors">
                <span className="text-lg">🍎</span> Apple
            </button>
        </div>
      </form>
      
      <p className="mt-8 text-center text-sm text-gray-500">
        Don't have an account? <Link to="/register" className="font-bold text-primary-dark hover:underline">Get Started</Link>
      </p>
    </div>
  );
}