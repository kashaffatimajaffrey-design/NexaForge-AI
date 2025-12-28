
import React, { useState } from 'react';
import { 
  TrendingUp, 
  Star, 
  BrainCircuit, 
  Target, 
  ArrowUpRight, 
  Zap, 
  Globe, 
  Sparkles,
  Search,
  ExternalLink,
  Loader2
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { SupportedLanguage } from '../types';
import { fetchRealTimeJobs } from '../services/geminiService';

const data = [
  { name: '10:00', visibility: 12 },
  { name: '12:00', visibility: 18 },
  { name: '14:00', visibility: 15 },
  { name: '16:00', visibility: 28 },
  { name: '18:00', visibility: 22 },
  { name: '20:00', visibility: 35 },
  { name: '22:00', visibility: 42 },
];

const translations: Record<string, Record<string, string>> = {
  en: { welcome: "Greetings", optimized: "Optimized", deploy: "Deploy Resume", signals: "Real-Time Job Feed" },
  fr: { welcome: "Salutations", optimized: "Optimisé", deploy: "Déployer le CV", signals: "Flux d'emploi en temps réel" },
  ur: { welcome: "سلام", optimized: "بہتر بنایا گیا", deploy: "سی وی اپ لوڈ کریں", signals: "ریئل ٹائم جاب فیڈ" },
  ar: { welcome: "تحياتي", optimized: "محسن", deploy: "نشر السيرة الذاتية", signals: "تغذية الوظائف الحية" },
  es: { welcome: "Saludos", optimized: "Optimizado", deploy: "Implementar currículum", signals: "Feed de Empleo Real" },
};

const StatCard = ({ title, value, change, icon: Icon, color }: any) => (
  <div className="glass p-8 rounded-[3rem] border border-white/5 hover:border-indigo-500/20 transition-all duration-700 group overflow-hidden relative shadow-2xl">
    <div className="absolute -top-10 -right-10 p-4 opacity-[0.03] group-hover:opacity-[0.1] transition-all duration-700 rotate-12 group-hover:rotate-0 group-hover:scale-150">
      <Icon size={180} />
    </div>
    <div className="flex items-center justify-between mb-8 relative z-10">
      <div className={`p-4 rounded-2xl ${color} bg-opacity-10 border border-white/5 shadow-inner`}>
        <Icon size={24} className={color.replace('bg-', 'text-')} />
      </div>
      <div className={`flex items-center px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${change.startsWith('+') ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
        <ArrowUpRight size={12} className="mr-1.5" /> {change}
      </div>
    </div>
    <div className="relative z-10">
      <h3 className="text-slate-500 text-xs font-black uppercase tracking-[0.3em] mb-2">{title}</h3>
      <p className="text-4xl font-black text-white tracking-tighter">{value}</p>
    </div>
  </div>
);

const CandidateDashboard = ({ user, lang }: { user: any, lang: SupportedLanguage }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [realJobs, setRealJobs] = useState<any[]>([]);
  const t = translations[lang] || translations.en;
  const isRTL = lang === 'ar' || lang === 'ur';

  const handleSearchJobs = async () => {
    if (!searchQuery) return;
    setIsSearching(true);
    try {
      const results = await fetchRealTimeJobs(searchQuery);
      setRealJobs(results);
    } catch (e) {
      console.error(e);
      alert("Search node failure. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className={`space-y-12 fade-in pb-10 ${isRTL ? 'text-right' : 'text-left'}`}>
      <div className={`flex flex-col md:flex-row md:items-end justify-between gap-8 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
        <div className="space-y-4">
          <div className="flex items-center space-x-3 text-indigo-400 font-black text-[10px] uppercase tracking-[0.5em] bg-indigo-500/5 w-fit px-4 py-1.5 rounded-full border border-indigo-500/10 rtl:space-x-reverse">
            <Globe size={14} className="animate-spin-slow" />
            <span>NexaForge Ecosystem Node Active</span>
          </div>
          <div className={`flex items-center space-x-5 ${isRTL ? 'space-x-reverse' : ''}`}>
            <img src={user?.avatar} className="w-16 h-16 rounded-[1.5rem] border-2 border-indigo-500/20 bg-white/5 p-1 shadow-lg" alt="Avatar" />
            <div>
              <h1 className="text-5xl font-black text-white tracking-tighter mb-2">
                {t.welcome}, <span className="ng-logo-text">{user?.name?.split(' ')[0]}</span>.
              </h1>
              <p className="text-slate-500 font-bold text-sm tracking-wide">
                Network status: <span className="text-emerald-400 mx-1">{t.optimized}</span>.
              </p>
            </div>
          </div>
        </div>
        <div className="flex space-x-4 rtl:space-x-reverse">
          <div className="relative group">
            <Search className={`absolute ${isRTL ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 text-slate-500`} size={18} />
            <input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearchJobs()}
              placeholder="Search target role..."
              className={`bg-white/5 border border-white/10 rounded-2xl py-4 ${isRTL ? 'pr-12 pl-4' : 'pl-12 pr-4'} text-sm outline-none focus:ring-1 focus:ring-indigo-500 w-64 transition-all`}
            />
          </div>
          <button 
            onClick={handleSearchJobs}
            disabled={isSearching}
            className="px-8 py-4 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
          >
            {isSearching ? <Loader2 size={16} className="animate-spin" /> : "Fetch Real Jobs"}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard title="Reach" value="4.2k" change="+12.5%" icon={TrendingUp} color="bg-indigo-500" />
        <StatCard title="Yield" value="89%" change="+4.2%" icon={Target} color="bg-emerald-500" />
        <StatCard title="Active" value="12" change="+2" icon={Star} color="bg-amber-500" />
        <StatCard title="Index" value="High" change="+Top 3%" icon={BrainCircuit} color="bg-indigo-500" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        <div className="xl:col-span-2 glass p-10 rounded-[3.5rem] border border-white/5 shadow-2xl space-y-8 min-h-[600px] flex flex-col">
          <h2 className="text-xl font-black text-white tracking-tight">{t.signals}</h2>
          
          <div className="flex-1 overflow-y-auto">
            {realJobs.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <div className="p-6 bg-white/5 rounded-full"><Search size={40} className="text-slate-600" /></div>
                <div>
                  <p className="text-white font-bold">No active job signals fetched.</p>
                  <p className="text-slate-500 text-sm">Enter a role above to search real websites via AI.</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pr-2 custom-scroll">
                {realJobs.map((job, idx) => (
                  <div key={idx} className="p-6 rounded-3xl bg-white/5 border border-white/5 hover:border-indigo-500/30 transition-all group">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-black text-white group-hover:text-indigo-400 transition-colors truncate">{job.title}</h4>
                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{job.company}</p>
                      </div>
                      <div className="p-2 bg-indigo-500/10 rounded-lg shrink-0 ml-2"><Sparkles size={14} className="text-indigo-400" /></div>
                    </div>
                    <p className="text-xs text-slate-400 mb-4 line-clamp-2">{job.matchReason}</p>
                    <a 
                      href={job.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-full py-3 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                    >
                      View on Site <ExternalLink size={12} className="ml-2" />
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="glass p-10 rounded-[3.5rem] border border-white/5 space-y-8 shadow-2xl h-fit">
          <h2 className="text-xl font-black text-white tracking-tight">System Matrix</h2>
          <div className="h-[300px] w-full min-h-[300px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorVis" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#475569', fontSize: 10}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#475569', fontSize: 10}} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' }}
                  itemStyle={{ color: '#818cf8' }}
                />
                <Area type="monotone" dataKey="visibility" stroke="#6366f1" strokeWidth={3} fill="url(#colorVis)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="p-6 bg-indigo-500/10 rounded-3xl border border-indigo-500/20">
            <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">AI Recommendation</p>
            <p className="text-xs text-slate-300 leading-relaxed italic">"Market visibility is peaking. It's the optimal window to deploy your signal to the network."</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateDashboard;
