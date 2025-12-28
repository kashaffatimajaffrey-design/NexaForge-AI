
import React, { useState } from 'react';
import { 
  Video, 
  Upload, 
  Play, 
  Sparkles, 
  Trash2, 
  Search,
  Zap,
  Tag,
  Clock,
  Plus
} from 'lucide-react';
import { SupportedLanguage } from '../types';

const VideoVault = ({ user, lang }: { user: any, lang: SupportedLanguage }) => {
  const [videos, setVideos] = useState<any[]>([
    { id: '1', title: 'React Performance Talk', duration: '0:45', tags: ['React', 'Frontend'], insights: 'Strong technical explanation of DOM reconciliation.' },
    { id: '2', title: 'Leadership Demo', duration: '1:20', tags: ['Soft Skills', 'Management'], insights: 'Exhibits confident posture and clear articulation.' }
  ]);
  const [isUploading, setIsUploading] = useState(false);
  const isRTL = lang === 'ar' || lang === 'ur';

  const handleSimulateUpload = () => {
    setIsUploading(true);
    // Simulate processing
    setTimeout(() => {
      const newVideo = {
        id: Date.now().toString(),
        title: 'New Skill Showcase',
        duration: '0:30',
        tags: ['AI', 'Python'],
        insights: 'AI analysis suggests high engagement potential and clear communication of complex nodes.'
      };
      setVideos([newVideo, ...videos]);
      setIsUploading(false);
    }, 2000);
  };

  const removeVideo = (id: string) => {
    setVideos(videos.filter(v => v.id !== id));
  };

  return (
    <div className={`space-y-12 fade-in pb-10 ${isRTL ? 'text-right' : 'text-left'}`}>
      <div className={`flex flex-col md:flex-row md:items-center justify-between gap-6 ${isRTL ? 'md:flex-row-reverse' : ''}`}>
        <div className={`flex items-center space-x-6 ${isRTL ? 'space-x-reverse' : ''}`}>
          <div className="p-4 glass border border-indigo-500/20 rounded-[2rem] shadow-2xl">
            <Video className="text-indigo-400" size={40} />
          </div>
          <div>
            <h1 className="text-4xl font-black text-white tracking-tighter">Video Vault</h1>
            <p className="text-slate-500 font-bold text-sm tracking-wide">Secure your work demonstrations in the node network.</p>
          </div>
        </div>
        <button 
          onClick={handleSimulateUpload}
          disabled={isUploading}
          className="px-8 py-4 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center"
        >
          {isUploading ? <Zap size={16} className="animate-spin mr-3" /> : <Plus size={16} className="mr-3" />}
          Deploy New Showcase
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {videos.map((vid) => (
          <div key={vid.id} className="glass rounded-[3rem] border border-white/5 overflow-hidden group hover:border-indigo-500/30 transition-all duration-500 shadow-2xl flex flex-col">
            <div className="h-48 bg-white/5 relative flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <Play className="text-white opacity-20 group-hover:opacity-100 group-hover:scale-125 transition-all" size={48} />
              <div className="absolute bottom-4 right-4 px-2 py-1 bg-black/60 rounded-lg text-[10px] font-black text-white flex items-center">
                <Clock size={12} className="mr-1.5" /> {vid.duration}
              </div>
            </div>
            <div className="p-8 space-y-6 flex-1 flex flex-col">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-black text-white group-hover:text-indigo-400 transition-colors">{vid.title}</h3>
                <button onClick={() => removeVideo(vid.id)} className="text-slate-600 hover:text-rose-400 transition-colors">
                  <Trash2 size={18} />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {vid.tags.map((tag: string) => (
                  <span key={tag} className="px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-lg text-[9px] font-black uppercase tracking-widest">
                    <Tag size={10} className="inline mr-1" /> {tag}
                  </span>
                ))}
              </div>
              <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-xs text-slate-400 italic leading-relaxed flex-1">
                <Sparkles size={14} className="text-indigo-400 inline mr-2 mb-1" />
                {vid.insights}
              </div>
            </div>
          </div>
        ))}
        {videos.length === 0 && !isUploading && (
          <div className="col-span-full h-64 flex flex-col items-center justify-center text-center space-y-4 glass rounded-[3rem] border border-white/5 border-dashed">
            <div className="p-4 bg-white/5 rounded-full"><Upload size={32} className="text-slate-600" /></div>
            <p className="text-slate-500 font-bold">No data nodes found. Deploy your first video showcase.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoVault;
