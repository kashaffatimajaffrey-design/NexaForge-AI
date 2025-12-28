
import React, { useState, useEffect } from 'react';
import { parseRawCV } from '../services/geminiService';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin,
  Loader2,
  Code2,
  Eye,
  Sparkles,
  Languages,
  Trash2,
  Wand2,
  // Fix: Added FileText to imports
  FileText
} from 'lucide-react';
import { CandidateProfile, SupportedLanguage, TranslatedText } from '../types';

const EMPTY_PROFILE: CandidateProfile = {
  id: '',
  fullName: { en: '' },
  email: '',
  phone: '',
  location: { en: '' },
  github: '',
  linkedin: '',
  portfolio: '',
  skills: [],
  experience: [],
  education: []
};

const CVBuilder = ({ user, lang }: { user: any, lang: SupportedLanguage }) => {
  const [profile, setProfile] = useState<CandidateProfile>(EMPTY_PROFILE);
  const [view, setView] = useState<'edit' | 'preview'>('edit');
  const [isExtracting, setIsExtracting] = useState(false);
  const [rawText, setRawText] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('nexaforge_cv');
    if (saved) {
      setProfile(JSON.parse(saved));
    }
  }, []);

  const saveToLocal = (data: CandidateProfile) => {
    localStorage.setItem('nexaforge_cv', JSON.stringify(data));
  };

  const handleAIExtract = async () => {
    if (!rawText.trim()) return;
    setIsExtracting(true);
    try {
      const extracted = await parseRawCV(rawText);
      const newProfile = { ...EMPTY_PROFILE, ...extracted, id: Date.now().toString() };
      setProfile(newProfile);
      saveToLocal(newProfile);
      setRawText('');
      setView('preview');
    } catch (e) {
      alert("Extraction failure. Ensure input text is descriptive.");
    } finally {
      setIsExtracting(false);
    }
  };

  const clearCV = () => {
    if (confirm("Reset CV data?")) {
      setProfile(EMPTY_PROFILE);
      localStorage.removeItem('nexaforge_cv');
    }
  };

  const updateProfileField = (key: keyof CandidateProfile, value: string) => {
    setProfile(prev => {
      const field = prev[key];
      let newData;
      if (typeof field === 'object' && !Array.isArray(field)) {
        newData = { ...prev, [key]: { ...(field as TranslatedText), [lang]: value } };
      } else {
        newData = { ...prev, [key]: value };
      }
      saveToLocal(newData);
      return newData;
    });
  };

  const getT = (obj: TranslatedText | undefined) => {
    if (!obj) return '';
    return obj[lang] || obj['en'] || Object.values(obj)[0] || '';
  };

  const isRTL = lang === 'ar' || lang === 'ur';

  return (
    <div className={`h-full flex flex-col space-y-8 fade-in ${isRTL ? 'text-right' : 'text-left'}`}>
      <div className={`flex flex-col md:flex-row items-center justify-between gap-6 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
        <div className={`flex items-center space-x-4 ${isRTL ? 'space-x-reverse' : ''}`}>
          <div className="p-4 bg-indigo-600/10 rounded-[1.5rem] border border-indigo-500/20 shadow-2xl">
            <Code2 className="text-indigo-400" size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-black text-white tracking-tighter">CV Architect Core</h1>
            <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mt-1">State: {profile.id ? "Data Active" : "Blank Slate"}</p>
          </div>
        </div>
        <div className={`flex bg-white/5 p-2 rounded-2xl border border-white/5 shadow-2xl ${isRTL ? 'flex-row-reverse' : ''}`}>
          <button onClick={clearCV} className="px-4 py-2.5 rounded-xl text-[10px] font-black uppercase text-rose-400 hover:bg-rose-500/10 transition-all mr-2">
            <Trash2 size={14} className="mr-2 inline" /> Reset
          </button>
          <div className="w-[1px] bg-white/10 mx-2"></div>
          <button onClick={() => setView('edit')} className={`flex items-center px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${view === 'edit' ? 'bg-indigo-600 text-white shadow-xl' : 'text-slate-400 hover:text-white'}`}>
            <Code2 size={14} className="mr-2.5" /> Source
          </button>
          <button onClick={() => setView('preview')} className={`flex items-center px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${view === 'preview' ? 'bg-indigo-600 text-white shadow-xl' : 'text-slate-400 hover:text-white'}`}>
            <Eye size={14} className="mr-2.5" /> LaTeX
          </button>
        </div>
      </div>

      <div className={`flex-1 grid grid-cols-1 xl:grid-cols-2 gap-10 overflow-hidden min-h-[700px] ${isRTL ? 'xl:direction-rtl' : ''}`}>
        {/* Editor Side */}
        <div className="glass rounded-[3.5rem] border border-white/5 flex flex-col overflow-hidden shadow-2xl">
          <div className="p-10 space-y-8 flex-1 overflow-y-auto custom-scroll">
            <section className="p-8 bg-indigo-500/5 rounded-3xl border border-indigo-500/10 space-y-4">
              <div className="flex items-center justify-between">
                 <h3 className="text-sm font-black text-indigo-400 uppercase tracking-widest flex items-center">
                    <Wand2 size={16} className="mr-2" /> AI Auto-Ingest
                 </h3>
              </div>
              <p className="text-xs text-slate-500">Paste your LinkedIn bio, an old resume paragraph, or job summary here to populate the nodes automatically.</p>
              <textarea 
                value={rawText}
                onChange={e => setRawText(e.target.value)}
                placeholder="Paste raw text here..."
                className="w-full h-32 bg-black/20 border border-white/5 rounded-2xl p-4 text-xs outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
              />
              <button 
                onClick={handleAIExtract}
                disabled={isExtracting || !rawText}
                className="w-full py-4 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50"
              >
                {isExtracting ? <Loader2 size={16} className="animate-spin inline mr-2" /> : <Sparkles size={16} className="inline mr-2" />} 
                Parse & Populate Nodes
              </button>
            </section>

            <div className="grid grid-cols-2 gap-6">
               <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Full Name</label>
                  <input value={profile.fullName[lang] || ''} onChange={e => updateProfileField('fullName', e.target.value)} className="w-full h-12 bg-white/5 border border-white/5 rounded-xl px-4 text-xs" />
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Email Address</label>
                  <input value={profile.email || ''} onChange={e => updateProfileField('email', e.target.value)} className="w-full h-12 bg-white/5 border border-white/5 rounded-xl px-4 text-xs" />
               </div>
            </div>
            
            <p className="text-[10px] text-center text-slate-600 font-bold uppercase tracking-[0.2em] pt-4">Manual editing node available for precision tuning.</p>
          </div>
        </div>

        {/* Preview Side */}
        <div className="bg-white rounded-[3.5rem] p-12 overflow-y-auto shadow-2xl relative">
          {!profile.fullName.en && !profile.email ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
               <div className="w-20 h-20 bg-slate-100 rounded-[2rem] flex items-center justify-center">
                  <FileText size={32} className="text-slate-300" />
               </div>
               <div>
                  <h3 className="text-xl font-bold text-slate-900">Architecture Offline</h3>
                  <p className="text-slate-500 text-sm max-w-xs mx-auto">Populate the data nodes in the source editor to generate your LaTeX preview.</p>
               </div>
            </div>
          ) : (
            <div className="latex-font text-slate-900 space-y-10 fade-in" dir={isRTL ? 'rtl' : 'ltr'}>
              <header className="text-center space-y-4 border-b-2 border-slate-900 pb-8">
                <h1 className="text-4xl font-bold uppercase tracking-tight">{getT(profile.fullName)}</h1>
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm text-slate-600 font-medium">
                  {profile.email && <span className="flex items-center"><Mail size={12} className="mr-1.5" /> {profile.email}</span>}
                  {profile.phone && <span className="flex items-center"><Phone size={12} className="mr-1.5" /> {profile.phone}</span>}
                  {getT(profile.location) && <span className="flex items-center"><MapPin size={12} className="mr-1.5" /> {getT(profile.location)}</span>}
                </div>
              </header>

              <section className="space-y-6">
                <h2 className="text-lg font-bold border-b border-slate-300 pb-1 uppercase tracking-widest">Experience</h2>
                {profile.experience.length === 0 ? (
                  <p className="text-sm text-slate-400 italic">No experience data nodes found.</p>
                ) : profile.experience.map((exp, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between font-bold">
                       <span>{getT(exp.company)}</span>
                       <span className="text-slate-500 text-xs italic">{exp.period?.start} - {exp.period?.end || 'Present'}</span>
                    </div>
                    <p className="text-indigo-700 italic text-sm">{getT(exp.role)}</p>
                    <p className="text-sm text-slate-600 text-justify">{getT(exp.description)}</p>
                  </div>
                ))}
              </section>

              <section className="space-y-4">
                <h2 className="text-lg font-bold border-b border-slate-300 pb-1 uppercase tracking-widest">Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill, i) => (
                    <span key={i} className="text-xs font-bold bg-slate-100 px-3 py-1 rounded border border-slate-200 uppercase">{getT(skill)}</span>
                  ))}
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CVBuilder;
