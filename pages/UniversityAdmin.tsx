
import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  TrendingUp, 
  Briefcase, 
  Map, 
  PieChart as PieChartIcon,
  Download,
  CheckCircle,
  AlertTriangle,
  Zap,
  LayoutDashboard,
  Brain,
  ChevronRight,
  Upload,
  // Fixed: Added missing RefreshCw import
  RefreshCw
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { getUniversityCareerInsights } from '../services/geminiService';

const placementData = [
  { name: 'Eng', placed: 450, total: 500 },
  { name: 'Biz', placed: 320, total: 400 },
  { name: 'Arts', placed: 180, total: 300 },
  { name: 'Sci', placed: 290, total: 350 },
];

const industryData = [
  { name: 'AI/Tech', value: 45 },
  { name: 'FinTech', value: 25 },
  { name: 'BioHealth', value: 15 },
  { name: 'Others', value: 15 },
];

const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444'];

const UniversityAdmin: React.FC = () => {
  const [insights, setInsights] = useState<any[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const fetchInsights = async () => {
    setIsGenerating(true);
    try {
      const result = await getUniversityCareerInsights(JSON.stringify(placementData));
      setInsights(result);
    } catch (e) {
      // Fallback
      setInsights([
        { title: 'AI Skill Gap', insight: 'CS students need more PyTorch experience to meet current recruiter signals.', priority: 'High' },
        { title: 'Market Trend', insight: 'BioHealth placements are up 12%. Recommend adding Bio-Informatics elective.', priority: 'Medium' }
      ]);
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => { fetchInsights(); }, []);

  return (
    <div className="space-y-12 fade-in pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center space-x-6">
          <div className="p-4 glass border border-indigo-500/20 rounded-[2rem] shadow-2xl">
            <GraduationCap className="text-indigo-400" size={40} />
          </div>
          <div>
            <h1 className="text-4xl font-black text-white tracking-tighter">Academic Analytics Node</h1>
            <p className="text-slate-500 font-bold text-sm tracking-wide flex items-center">
              <span className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></span>
              Live Data Ingestion Active
            </p>
          </div>
        </div>
        <div className="flex space-x-4">
           <button className="px-6 py-3 glass border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white transition-all">
              Batch Resume Sync
           </button>
           <button className="px-6 py-3 bg-white text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:scale-105 transition-all">
              Generate PDF Report
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="glass p-8 rounded-[3rem] border border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform"><TrendingUp size={60} /></div>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mb-2">Placements</p>
          <p className="text-4xl font-black text-white tracking-tighter">82.4%</p>
          <div className="mt-4 flex items-center text-[10px] font-bold text-emerald-400 bg-emerald-500/10 w-fit px-2 py-1 rounded-lg">
             +5.2% Yield Surge
          </div>
        </div>
        <div className="glass p-8 rounded-[3rem] border border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform"><Briefcase size={60} /></div>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mb-2">Recruiters</p>
          <p className="text-4xl font-black text-white tracking-tighter">142</p>
          <div className="mt-4 flex items-center text-[10px] font-bold text-indigo-400 bg-indigo-500/10 w-fit px-2 py-1 rounded-lg">
             12 New Signal Nodes
          </div>
        </div>
        <div className="glass p-8 rounded-[3rem] border border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform"><Map size={60} /></div>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mb-2">Median Package</p>
          <p className="text-4xl font-black text-white tracking-tighter">$84k</p>
          <div className="mt-4 flex items-center text-[10px] font-bold text-amber-400 bg-amber-500/10 w-fit px-2 py-1 rounded-lg">
             Market Alignment: High
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          <div className="glass p-12 rounded-[3.5rem] border border-white/5 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent"></div>
             <h3 className="text-xl font-black text-white tracking-tight mb-10 flex items-center">
                <LayoutDashboard size={20} className="mr-3 text-indigo-400" /> Outcome Visualization
             </h3>
             <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={placementData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.03)" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#475569', fontSize: 10, fontWeight: 800}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#475569', fontSize: 10, fontWeight: 800}} />
                    <Tooltip 
                      cursor={{fill: 'rgba(255,255,255,0.03)'}}
                      contentStyle={{ backgroundColor: '#0f172a', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)' }}
                    />
                    <Bar dataKey="placed" fill="#6366f1" radius={[10, 10, 0, 0]} barSize={40} />
                    <Bar dataKey="total" fill="rgba(255,255,255,0.05)" radius={[10, 10, 0, 0]} barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
             </div>
          </div>

          <div className="glass p-12 rounded-[3.5rem] border border-white/5 shadow-2xl">
             <div className="flex items-center justify-between mb-10">
                <h3 className="text-xl font-black text-white tracking-tight">Student Node Intake</h3>
                <button className="flex items-center px-6 py-2 bg-indigo-600/10 text-indigo-400 rounded-xl text-[10px] font-black uppercase tracking-widest border border-indigo-500/20">
                   <Upload size={14} className="mr-2" /> Sync Node
                </button>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { name: 'Ryan G.', dept: 'CS', gpa: '3.8', status: 'Placed' },
                  { name: 'Sofia M.', dept: 'Design', gpa: '3.9', status: 'Interviewing' },
                  { name: 'Amir K.', dept: 'Biz', gpa: '3.5', status: 'Searching' },
                  { name: 'Xue L.', dept: 'Science', gpa: '3.7', status: 'Placed' },
                ].map((s, i) => (
                  <div key={i} className="p-6 bg-white/5 rounded-3xl border border-white/5 flex items-center justify-between hover:bg-white/10 transition-all cursor-pointer group">
                     <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-indigo-500/20 rounded-2xl flex items-center justify-center font-black text-indigo-400 border border-white/5">
                           {s.name[0]}
                        </div>
                        <div>
                           <p className="text-sm font-black text-white group-hover:text-indigo-400 transition-colors">{s.name}</p>
                           <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{s.dept} • GPA {s.gpa}</p>
                        </div>
                     </div>
                     <div className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                       s.status === 'Placed' ? 'bg-emerald-500/10 text-emerald-400' : s.status === 'Searching' ? 'bg-rose-500/10 text-rose-400' : 'bg-amber-500/10 text-amber-400'
                     }`}>
                        {s.status}
                     </div>
                  </div>
                ))}
             </div>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-8">
           <div className="glass p-10 rounded-[3.5rem] border border-white/5 shadow-2xl space-y-10 relative overflow-hidden group/ins">
             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover/ins:rotate-12 transition-transform"><Brain size={60} className="text-indigo-400" /></div>
             <h3 className="text-xl font-black text-white tracking-tight flex items-center">
                AI Career Insights
             </h3>
             <div className="space-y-6">
                {isGenerating ? (
                  <div className="space-y-4">
                     {[1, 2, 3].map(i => <div key={i} className="h-20 bg-white/5 rounded-2xl animate-pulse"></div>)}
                  </div>
                ) : insights.map((insight, i) => (
                  <div key={i} className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-3 relative overflow-hidden group">
                     <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">{insight.title}</span>
                        <span className={`text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-widest ${
                          insight.priority === 'High' ? 'bg-rose-500/10 text-rose-400' : 'bg-amber-500/10 text-amber-400'
                        }`}>
                          {insight.priority} Priority
                        </span>
                     </div>
                     <p className="text-xs text-slate-300 font-medium leading-relaxed italic">
                        "{insight.insight}"
                     </p>
                  </div>
                ))}
             </div>
             <button onClick={fetchInsights} className="w-full py-4 glass border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-all flex items-center justify-center">
                <RefreshCw size={14} className={`mr-2 ${isGenerating ? 'animate-spin' : ''}`} /> Recalculate Node Insights
             </button>
           </div>

           <div className="glass p-10 rounded-[3.5rem] border border-white/5 shadow-2xl">
              <h3 className="text-lg font-black text-white tracking-tight mb-8">Top Signal Partners</h3>
              <div className="space-y-4">
                 {['Google', 'Stripe', 'Anthropic', 'NVIDIA'].map((brand, i) => (
                   <div key={i} className="p-5 bg-white/5 rounded-3xl border border-white/5 flex items-center justify-between hover:scale-105 transition-all cursor-pointer">
                      <div className="flex items-center space-x-4">
                         <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center font-black text-slate-900">{brand[0]}</div>
                         <span className="text-sm font-black text-white">{brand}</span>
                      </div>
                      <ChevronRight size={16} className="text-slate-600" />
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default UniversityAdmin;
