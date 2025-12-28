
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Video, 
  UserCircle, 
  Briefcase, 
  BarChart3, 
  Menu,
  X,
  Bell,
  Search,
  Settings,
  LogOut,
  Zap,
  Globe
} from 'lucide-react';

import CandidateDashboard from './pages/CandidateDashboard';
import CVBuilder from './pages/CVBuilder';
import MockInterview from './pages/MockInterview';
import RecruiterPortal from './pages/RecruiterPortal';
import UniversityAdmin from './pages/UniversityAdmin';
import VideoVault from './pages/VideoVault';
import Auth from './pages/Auth';
import Logo from './components/Logo';
import { SupportedLanguage } from './types';

const SidebarItem = ({ icon: Icon, label, path, active }: { icon: any, label: string, path: string, active: boolean }) => (
  <Link 
    to={path} 
    className={`flex items-center space-x-3 px-4 py-3 rounded-2xl transition-all duration-300 group ${
      active 
        ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 shadow-[0_0_20px_rgba(79,70,229,0.1)]' 
        : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
    }`}
  >
    <Icon size={20} className={`${active ? "animate-pulse" : "group-hover:scale-110 transition-transform"}`} />
    <span className="font-bold tracking-tight">{label}</span>
  </Link>
);

const MainLayout = ({ children, onLogout, user, lang, setLang }: { children: React.ReactNode, onLogout: () => void, user: any, lang: SupportedLanguage, setLang: (l: SupportedLanguage) => void }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const isRTL = lang === 'ar' || lang === 'ur';

  return (
    <div className={`flex min-h-screen ${isRTL ? 'flex-row-reverse' : 'flex-row'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 ${isRTL ? 'right-0' : 'left-0'} z-50 w-80 glass border-r border-white/5 transform transition-transform duration-700 cubic-bezier(0.16, 1, 0.3, 1) ${
          isSidebarOpen ? 'translate-x-0' : (isRTL ? 'translate-x-full' : '-translate-x-full')
        } lg:relative lg:translate-x-0`}
      >
        <div className="flex flex-col h-full px-6 py-10">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center space-x-3">
              <Logo size={28} />
              <span className="text-2xl font-black text-white tracking-tighter ng-logo-text">NexaForge</span>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-white transition-colors">
              <X size={24} />
            </button>
          </div>

          <nav className="flex-1 space-y-2">
            <SidebarItem icon={LayoutDashboard} label="Overview" path="/" active={location.pathname === '/'} />
            <SidebarItem icon={FileText} label="CV Architect" path="/cv-builder" active={location.pathname === '/cv-builder'} />
            <SidebarItem icon={Video} label="Video Vault" path="/video-vault" active={location.pathname === '/video-vault'} />
            <SidebarItem icon={UserCircle} label="AI Interviews" path="/mock-interview" active={location.pathname === '/mock-interview'} />
            
            <div className="pt-12 pb-6 px-4">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Partner Ecosystem</span>
            </div>
            <SidebarItem icon={Briefcase} label="Recruiter Core" path="/recruiter" active={location.pathname === '/recruiter'} />
            <SidebarItem icon={BarChart3} label="Edu Analytics" path="/university" active={location.pathname === '/university'} />
          </nav>

          <div className="mt-auto space-y-4">
             <div className="p-6 glass rounded-3xl border border-white/10 group relative overflow-hidden">
              <div className="flex items-center space-x-4 mb-4 relative z-10">
                <div className="relative">
                  <img src={user?.avatar} className="w-12 h-12 rounded-2xl border-2 border-indigo-500/30 bg-white/5 p-0.5 shadow-lg" alt="User" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-[#0f172a] animate-pulse"></div>
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-black text-white truncate tracking-tight">{user?.name || 'Candidate'}</p>
                  <p className="text-[9px] text-indigo-400 font-black uppercase tracking-widest">Network Active</p>
                </div>
              </div>
              <button onClick={onLogout} className="w-full py-3 bg-white/5 hover:bg-rose-500/10 hover:text-rose-400 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 transition-all flex items-center justify-center border border-white/5 hover:border-rose-500/20">
                <LogOut size={14} className="mr-2" /> Deauthorize
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden flex flex-col">
        <header className="sticky top-0 z-40 bg-slate-950/40 backdrop-blur-2xl border-b border-white/5">
          <div className="flex items-center justify-between px-10 py-5">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-slate-400 p-2 hover:bg-white/5 rounded-xl transition-all">
              <Menu size={24} />
            </button>
            
            <div className="relative max-w-lg w-full hidden md:block group">
              <Search className={`absolute ${isRTL ? 'right-5' : 'left-5'} top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors`} size={20} />
              <input 
                type="text" 
                placeholder="Query system database..." 
                className={`w-full bg-white/5 border border-white/5 rounded-2xl py-4 ${isRTL ? 'pr-14 pl-4' : 'pl-14 pr-4'} focus:bg-white/10 focus:ring-1 focus:ring-indigo-500/50 outline-none transition-all text-sm font-medium`}
              />
            </div>

            <div className="flex items-center space-x-6 rtl:space-x-reverse">
              {/* Language Selector */}
              <div className="flex bg-white/5 rounded-xl border border-white/10 p-1">
                {(['en', 'fr', 'ur', 'ar', 'es'] as SupportedLanguage[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase transition-all ${lang === l ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
                  >
                    {l}
                  </button>
                ))}
              </div>

              <button className="relative p-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-2xl transition-all shadow-xl group">
                <Bell size={22} className="group-hover:rotate-12 transition-transform" />
                <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-[#020617]"></span>
              </button>
              <button className="p-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-2xl transition-all shadow-xl">
                <Settings size={22} className="hover:rotate-90 transition-transform duration-500" />
              </button>
            </div>
          </div>
        </header>

        <div className="flex-1 p-10 overflow-y-auto">
          <div className="max-w-7xl mx-auto h-full fade-in">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [lang, setLang] = useState<SupportedLanguage>('en');

  useEffect(() => {
    const isAuth = localStorage.getItem('nexaforge_auth') === 'true';
    const savedUser = localStorage.getItem('nexaforge_user');
    if (isAuth && savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (userData: any) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('nexaforge_auth');
    localStorage.removeItem('nexaforge_user');
    setUser(null);
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) return <Auth onLogin={handleLogin} />;

  return (
    <HashRouter>
      <MainLayout onLogout={handleLogout} user={user} lang={lang} setLang={setLang}>
        <Routes>
          <Route path="/" element={<CandidateDashboard user={user} lang={lang} />} />
          <Route path="/cv-builder" element={<CVBuilder user={user} lang={lang} />} />
          <Route path="/mock-interview" element={<MockInterview user={user} lang={lang} />} />
          <Route path="/recruiter" element={<RecruiterPortal />} />
          <Route path="/university" element={<UniversityAdmin />} />
          <Route path="/video-vault" element={<VideoVault user={user} lang={lang} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </MainLayout>
    </HashRouter>
  );
};

export default App;
