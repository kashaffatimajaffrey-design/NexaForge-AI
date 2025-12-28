
import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Download, 
  MessageSquare, 
  Video,
  BarChart2,
  Calendar,
  Zap,
  Target,
  FileSearch,
  CheckCircle,
  TrendingUp,
  Loader2
} from 'lucide-react';
import { getCandidateMatchInsights } from '../services/geminiService';

const RecruiterPortal: React.FC = () => {
  const [targetJD, setTargetJD] = useState('');
  const [isAnalyzingJD, setIsAnalyzingJD] = useState(false);
  const [activeCandidates, setActiveCandidates] = useState([
    { id: '1', name: 'Sarah Jenkins', role: 'Fullstack Developer', exp: '5 years', match: 96, video: true, school: 'MIT', insights: null as any },
    { id: '2', name: 'Michael Chen', role: 'Data Engineer', exp: '3 years', match: 91, video: false, school: 'Stanford', insights: null as any },
    { id: '3', name: 'Elena Rodriguez', role: 'Product Manager', exp: '8 years', match: 88, video: true, school: 'INSEAD', insights: null as any },
    { id: '4', name: 'David Kim', role: 'UI/UX Designer', exp: '4 years', match: 84, video: true, school: 'RISD', insights: null as any },
  ]);

  // Fix: Updated analyzeJD to perform real AI-driven matching
  const analyzeJD = async () => {
    if (!targetJD) return;
    setIsAnalyzingJD(true);
    try {
      const updatedCandidates = await Promise.all(
        activeCandidates.map(async (c) => {
          try {
            const result = await getCandidateMatchInsights(targetJD, JSON.stringify(c));
            return {
              ...c,
              match: result.score,
              insights: result.insights
            };
          } catch (err) {
            console.error(`Failed to analyze match for ${c.name}`, err);
            return c;
          }
        })
      );
      setActiveCandidates(updatedCandidates);
    } catch (e) {
      console.error("Match analysis failure", e);
    } finally {
      setIsAnalyzingJD(false);
    }
  };

  return (
    <div className="space-y-10 fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-black text-white tracking-tighter">Recruiter Command</h1>
          <p className="text-slate-500 font-medium uppercase text-xs tracking-[0.2em]">Semantic Pipeline v4.1</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center px-6 py-3 glass border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white">
            <BarChart2 size={16} className="mr-2" /> Global Stats
          </button>
          <button className="flex items-center px-6 py-3 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-indigo-500/20">
            Post New Signal
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* JD Upload & Analysis Node */}
        <div className="lg:col-span-1 space-y-6">
          <div className="glass p-8 rounded-[3rem] border border-white/5 space-y-6 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-5"><Target size={60} /></div>
             <h3 className="text-sm font-black text-white uppercase tracking-[0.2em] flex items-center">
               <FileSearch size={18} className="mr-2 text-indigo-400" /> Active Job Logic
             </h3>
             <textarea 
              value={targetJD}
              onChange={e => setTargetJD(e.target.value)}
              placeholder="Paste Job Description for immediate semantic re-ranking of the talent pool..."
              className="w-full h-64 bg-white/5 border border-white/10 rounded-2xl p-5 outline-none focus:ring-1 focus:ring-indigo-500 text-xs text-slate-300 leading-relaxed"
             />
             <button 
              onClick={analyzeJD}
              disabled={isAnalyzingJD || !targetJD}
              className="w-full py-4 bg-white hover:bg-slate-50 text-slate-950 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all flex items-center justify-center disabled:opacity-50"
             >
               {isAnalyzingJD ? <Loader2 className="animate-spin mr-2" /> : <Zap size={14} className="mr-2" />} Trigger AI Matching
             </button>
          </div>

          <div className="glass p-8 rounded-[3rem] border border-white/5 space-y-6 shadow-2xl">
             <h3 className="text-sm font-black text-white uppercase tracking-[0.2em]">Active Analytics</h3>
             <div className="space-y-4">
                <div className="flex justify-between items-center text-xs font-bold">
                   <span className="text-slate-500">Yield Rank</span>
                   <span className="text-indigo-400">92nd Percentile</span>
                </div>
                <div className="flex justify-between items-center text-xs font-bold">
                   <span className="text-slate-500">Pipeline Velocity</span>
                   <span className="text-emerald-400">High</span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                   <div className="h-full bg-indigo-500 w-[92%]"></div>
                </div>
             </div>
          </div>
        </div>

        {/* Candidate Feed Node */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass p-6 rounded-3xl border border-white/5 flex items-center space-x-4 shadow-xl">
             <Search className="text-slate-500 ml-2" size={20} />
             <input placeholder="Search talent nodes by skill, name, or DNA..." className="flex-1 bg-transparent border-none outline-none text-sm font-medium" />
             <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all"><Filter size={18} /></button>
          </div>

          <div className="space-y-4">
            {activeCandidates.map((c, i) => (
              <div key={i} className="glass p-8 rounded-[3rem] border border-white/5 hover:border-indigo-500/30 transition-all duration-500 group relative shadow-2xl">
                 <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center space-x-6">
                       <div className="relative">
                          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${c.name}`} className="w-16 h-16 rounded-[1.5rem] bg-white/5 p-1 border border-white/10" />
                          <div className="absolute -bottom-1 -right-1 bg-indigo-600 p-1 rounded-lg border border-[#020617]"><TrendingUp size={10} /></div>
                       </div>
                       <div>
                          <h4 className="text-lg font-black text-white group-hover:text-indigo-400 transition-colors tracking-tight flex items-center">
                            {c.name} {c.video && <Video size={16} className="ml-2 text-rose-400" />}
                          </h4>
                          <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-1">{c.role} • {c.exp}</p>
                          <div className="mt-3 flex flex-wrap gap-2">
                             <span className="px-3 py-1 bg-white/5 rounded-lg text-[9px] font-black uppercase tracking-widest text-slate-400 border border-white/5">{c.school}</span>
                             <span className="px-3 py-1 bg-indigo-500/10 rounded-lg text-[9px] font-black uppercase tracking-widest text-indigo-400 border border-indigo-500/10">Full-time</span>
                          </div>
                       </div>
                    </div>
                    
                    <div className="flex flex-row md:flex-col items-center md:items-end justify-between gap-4 border-t md:border-t-0 md:border-l border-white/5 pt-6 md:pt-0 md:pl-8">
                       <div className="text-center md:text-right">
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">AI Match Signal</p>
                          <p className={`text-4xl font-black ${c.match > 90 ? 'text-emerald-400' : 'text-amber-400'} tracking-tighter`}>{c.match}%</p>
                       </div>
                       <div className="flex space-x-2">
                          <button className="p-3 bg-white/5 hover:bg-indigo-600 hover:text-white rounded-xl transition-all"><MessageSquare size={18} /></button>
                          <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all"><Download size={18} /></button>
                          <button className="px-5 py-3 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all">Invite Node</button>
                       </div>
                    </div>
                 </div>

                 {/* Fix: Dynamically rendering insights from AI analysis */}
                 {c.insights && (
                   <div className="mt-8 pt-6 border-t border-white/5 animate-in slide-in-from-top-2 duration-500">
                      <div className="flex items-center space-x-2 text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-2">
                         <CheckCircle size={12} />
                         <span>AI Recommendation Active</span>
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed font-medium italic">
                        {c.insights}
                      </p>
                   </div>
                 )}
              </div>
            ))}
          </div>
          <button className="w-full py-5 glass border border-white/5 rounded-3xl text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 hover:text-white hover:bg-white/10 transition-all">
            Expand Talent Matrix
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecruiterPortal;
