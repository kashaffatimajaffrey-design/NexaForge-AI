
import React, { useState, useEffect } from 'react';
import Logo from '../components/Logo';
import { Mail, ShieldCheck, ArrowRight, Loader2, User, Lock, Camera } from 'lucide-react';

interface AuthProps {
  onLogin: (userData: any) => void;
}

const Auth = ({ onLogin }: AuthProps) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nexa',
    rememberMe: true
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const generateRandomAvatar = () => {
    const seed = Math.random().toString(36).substring(7);
    setFormData(prev => ({
      ...prev,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`
    }));
  };

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate Auth Processing
    setTimeout(() => {
      const userData = {
        name: formData.name || (formData.email.split('@')[0]),
        email: formData.email,
        avatar: formData.avatar,
        role: 'CANDIDATE',
        isPro: true
      };

      if (formData.rememberMe) {
        localStorage.setItem('nexaforge_user', JSON.stringify(userData));
      }
      
      localStorage.setItem('nexaforge_auth', 'true');
      onLogin(userData);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated geometric nodes in bg */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-[10%] left-[20%] w-64 h-64 border border-indigo-500/20 rounded-full animate-spin-slow"></div>
        <div className="absolute bottom-[20%] right-[10%] w-96 h-96 border border-purple-500/20 rounded-full animate-reverse-spin"></div>
      </div>

      <div className="max-w-xl w-full glass rounded-[3rem] border border-white/10 p-12 shadow-[0_0_100px_rgba(0,0,0,0.5)] fade-in relative z-10">
        <div className="text-center mb-10">
          <Logo size={42} className="mx-auto mb-6" />
          <h1 className="text-4xl font-black text-white tracking-tighter mb-2">
            {isSignUp ? 'Create Node' : 'Initialize Session'}
          </h1>
          <p className="text-slate-400 text-sm font-medium">Access the NexaForge AI Career Ecosystem</p>
        </div>

        <form onSubmit={handleAuth} className="space-y-6">
          {isSignUp && (
            <div className="flex flex-col items-center mb-8">
              <div className="relative group cursor-pointer" onClick={generateRandomAvatar}>
                <div className="w-24 h-24 rounded-[2rem] overflow-hidden border-2 border-indigo-500/30 p-1 bg-white/5 transition-transform group-hover:scale-105">
                  <img src={formData.avatar} alt="Avatar" className="w-full h-full object-cover rounded-[1.8rem]" />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-indigo-600 p-2 rounded-xl shadow-lg border border-white/10 group-hover:bg-indigo-500 transition-colors">
                  <Camera size={14} className="text-white" />
                </div>
                <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-[10px] px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Click to Randomize Avatar</span>
              </div>
              <div className="mt-4 w-full">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block">Display Identity</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400" size={18} />
                  <input 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required={isSignUp}
                    placeholder="Full Name / Handle" 
                    className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white/10 transition-all text-white" 
                  />
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block">Network Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400" size={18} />
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="name@nexus.com" 
                  className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white/10 transition-all text-white" 
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 block">Security Token</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400" size={18} />
                <input 
                  type="password" 
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  placeholder="••••••••" 
                  className="w-full h-14 bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white/10 transition-all text-white" 
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between px-2">
            <label className="flex items-center space-x-3 cursor-pointer group">
              <input 
                type="checkbox" 
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleInputChange}
                className="w-5 h-5 rounded-lg border-white/10 bg-white/5 text-indigo-600 focus:ring-indigo-500" 
              />
              <span className="text-xs text-slate-400 font-bold group-hover:text-slate-300 transition-colors tracking-wide">Stay Connected</span>
            </label>
            {!isSignUp && (
              <button type="button" className="text-xs font-bold text-indigo-400 hover:text-indigo-300 tracking-wide">Forgot Access Key?</button>
            )}
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black uppercase tracking-widest transition-all shadow-[0_0_30px_rgba(79,70,229,0.3)] active:scale-95 flex items-center justify-center disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin mr-2" /> : (
              <>
                {isSignUp ? 'Activate Account' : 'Authenticate Session'} 
                <ArrowRight className="ml-3" size={20} />
              </>
            )}
          </button>
        </form>

        <div className="mt-10 pt-8 border-t border-white/5 text-center">
          <p className="text-slate-500 text-sm font-bold">
            {isSignUp ? 'Already registered in the network?' : 'New candidate entry?'}
            <button 
              onClick={() => setIsSignUp(!isSignUp)}
              className="ml-2 text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>

        <div className="mt-8 flex items-center justify-center space-x-6">
          <button className="flex items-center space-x-2 px-6 py-2 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all text-xs font-bold text-slate-400 hover:text-white">
            <img src="https://www.google.com/favicon.ico" className="w-4 h-4" />
            <span>Google Vault</span>
          </button>
          <button className="flex items-center space-x-2 px-6 py-2 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all text-xs font-bold text-slate-400 hover:text-white">
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png" className="w-4 h-4" />
            <span>LinkedIn Link</span>
          </button>
        </div>

        <div className="mt-10 flex items-center justify-center space-x-3 text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]">
          <ShieldCheck size={14} className="text-indigo-500/50" />
          <span>Encrypted via AES-256 Quantum Shielding</span>
        </div>
      </div>
    </div>
  );
};

export default Auth;
