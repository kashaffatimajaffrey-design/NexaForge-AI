
import React, { useState } from 'react';
import { generatePersonalizedQuestions, evaluateInterviewAnswer } from '../services/geminiService';
import { 
  Mic, 
  Play, 
  Send, 
  Trophy, 
  ChevronRight, 
  User, 
  Bot,
  RefreshCw,
  FileText,
  Upload,
  Sparkles,
  Zap,
  ArrowRight,
  Target
} from 'lucide-react';
import { SupportedLanguage } from '../types';

const MockInterview: React.FC<{ user?: any, lang?: SupportedLanguage }> = ({ user, lang }) => {
  const [step, setStep] = useState<'prep' | 'active' | 'results'>('prep');
  const [role, setRole] = useState('Senior Product Engineer');
  const [level, setLevel] = useState('Senior');
  const [cvContent, setCvContent] = useState('');
  const [jdContent, setJdContent] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  const [sessionScore, setSessionScore] = useState<number[]>([]);

  const startInterview = async () => {
    if (!cvContent) {
      alert("Please provide CV context for a personalized experience.");
      return;
    }
    setIsLoading(true);
    try {
      const qs = await generatePersonalizedQuestions(role, level, cvContent, jdContent);
      setQuestions(qs);
      setCurrentIndex(0);
      setChatHistory([{ 
        type: 'bot', 
        content: `Targeting the ${role} node. I've analyzed your CV and the Job requirements. Let's begin. \n\n${qs[0].question}`,
        context: qs[0].context
      }]);
      setStep('active');
    } catch (e) {
      console.error(e);
      alert("Personalized generation failed. Node error.");
    } finally {
      setIsLoading(false);
    }
  };

  const submitAnswer = async () => {
    if (!currentAnswer) return;
    setIsEvaluating(true);
    const answerToEvaluate = currentAnswer;
    const currentQ = questions[currentIndex];
    
    setChatHistory(prev => [...prev, { type: 'user', content: answerToEvaluate }]);
    setCurrentAnswer('');

    try {
      const evaluation = await evaluateInterviewAnswer(currentQ.question, answerToEvaluate);
      setSessionScore(prev => [...prev, evaluation.score]);
      
      let feedbackMsg = `Score: ${evaluation.score}/10. ${evaluation.feedback}`;
      setChatHistory(prev => [...prev, { type: 'bot', content: feedbackMsg, isEvaluation: true }]);

      if (currentIndex + 1 < questions.length) {
        setTimeout(() => {
          const nextQ = questions[currentIndex + 1];
          setCurrentIndex(prev => prev + 1);
          setChatHistory(prev => [...prev, { 
            type: 'bot', 
            content: nextQ.question, 
            context: nextQ.context 
          }]);
        }, 1500);
      } else {
        setStep('results');
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsEvaluating(false);
    }
  };

  const avgScore = sessionScore.length > 0 
    ? (sessionScore.reduce((a, b) => a + b, 0) / sessionScore.length).toFixed(1) 
    : 0;

  if (step === 'prep') {
    return (
      <div className="max-w-5xl mx-auto space-y-8 fade-in">
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-indigo-600/20 rounded-[1.5rem] flex items-center justify-center border border-indigo-500/30">
            <Zap className="text-indigo-400 animate-pulse" />
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter">AI Interview Lab</h1>
          <p className="text-slate-500 font-medium">Personalize your session with your CV and target Job Description.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass p-8 rounded-[3rem] border border-white/5 space-y-6">
            <h3 className="text-sm font-black text-white/40 uppercase tracking-[0.2em] flex items-center">
              <FileText size={16} className="mr-2" /> Resume Node
            </h3>
            <textarea 
              value={cvContent}
              onChange={e => setCvContent(e.target.value)}
              placeholder="Paste CV text or upload PDF..."
              className="w-full h-48 bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-indigo-500 text-sm text-white"
            />
            <button className="w-full py-3 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold text-slate-400 transition-all border border-white/10 flex items-center justify-center">
              <Upload size={14} className="mr-2" /> Simulate PDF Parse
            </button>
          </div>

          <div className="glass p-8 rounded-[3rem] border border-white/5 space-y-6">
            <h3 className="text-sm font-black text-white/40 uppercase tracking-[0.2em] flex items-center">
              <Target size={16} className="mr-2" /> Target Job Profile
            </h3>
            <textarea 
              value={jdContent}
              onChange={e => setJdContent(e.target.value)}
              placeholder="Paste Job Description for match context..."
              className="w-full h-48 bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-indigo-500 text-sm text-white"
            />
            <div className="grid grid-cols-2 gap-4">
              <select 
                value={level} 
                onChange={e => setLevel(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white outline-none"
              >
                <option value="Junior" className="bg-slate-900">Junior</option>
                <option value="Intermediate" className="bg-slate-900">Mid-Level</option>
                <option value="Senior" className="bg-slate-900">Senior</option>
                <option value="Expert" className="bg-slate-900">Lead/Expert</option>
              </select>
              <input 
                value={role}
                onChange={e => setRole(e.target.value)}
                placeholder="Target Role"
                className="bg-white/5 border border-white/10 rounded-xl p-3 text-xs text-white outline-none"
              />
            </div>
          </div>
        </div>

        <button 
          onClick={startInterview}
          disabled={isLoading}
          className="w-full h-16 bg-indigo-600 hover:bg-indigo-700 text-white rounded-[2rem] font-black uppercase tracking-[0.4em] transition-all shadow-[0_0_40px_rgba(79,70,229,0.3)] active:scale-95 flex items-center justify-center disabled:opacity-50"
        >
          {isLoading ? <RefreshCw className="animate-spin mr-3" /> : <Sparkles className="mr-3" />} Start Personalized Session
        </button>
      </div>
    );
  }

  if (step === 'results') {
    return (
      <div className="max-w-3xl mx-auto space-y-8 fade-in text-center py-10">
        <div className="mx-auto w-24 h-24 bg-indigo-600/20 rounded-full flex items-center justify-center border-4 border-indigo-500/30">
          <Trophy className="text-indigo-400" size={40} />
        </div>
        <h1 className="text-5xl font-black text-white tracking-tighter">Session Complete</h1>
        <div className="grid grid-cols-3 gap-6">
          <div className="glass p-6 rounded-3xl border border-white/5">
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">Mean Score</p>
            <p className="text-3xl font-black text-indigo-400">{avgScore}/10</p>
          </div>
          <div className="glass p-6 rounded-3xl border border-white/5">
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">Questions</p>
            <p className="text-3xl font-black text-white">{questions.length}</p>
          </div>
          <div className="glass p-6 rounded-3xl border border-white/5">
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-1">Confidence</p>
            <p className="text-3xl font-black text-emerald-400">High</p>
          </div>
        </div>
        <div className="flex space-x-4">
           <button onClick={() => setStep('prep')} className="flex-1 py-4 glass border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-white/5">Retrain Node</button>
           <button onClick={() => setStep('prep')} className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg">View Detailed Analytics</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto h-[750px] flex flex-col space-y-6 fade-in">
       <div className="glass p-4 rounded-3xl border border-white/5 flex items-center justify-between">
          <div className="flex items-center space-x-3">
             <div className="w-10 h-10 bg-indigo-600/20 rounded-xl flex items-center justify-center">
                <Bot className="text-indigo-400" size={20} />
             </div>
             <div>
                <p className="text-xs font-black text-white uppercase tracking-widest">Active Interview Matrix</p>
                <p className="text-[10px] text-slate-500 uppercase font-bold">{role} (Session {currentIndex + 1}/5)</p>
             </div>
          </div>
          <div className="h-1.5 w-48 bg-white/5 rounded-full overflow-hidden">
             <div className="h-full bg-indigo-500 transition-all duration-500" style={{ width: `${((currentIndex + 1) / 5) * 100}%` }}></div>
          </div>
       </div>

       <div className="flex-1 overflow-y-auto space-y-6 pr-4 custom-scroll">
          {chatHistory.map((chat, i) => (
            <div key={i} className={`flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}>
              <div className={`max-w-[85%] space-y-2 ${chat.type === 'user' ? 'text-right' : ''}`}>
                <div className={`p-6 rounded-[2rem] text-sm leading-relaxed ${
                  chat.type === 'user' 
                    ? 'bg-indigo-600 text-white rounded-tr-none' 
                    : chat.isEvaluation 
                      ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-tl-none italic text-xs'
                      : 'glass border border-white/5 text-slate-100 rounded-tl-none'
                }`}>
                  {chat.content}
                </div>
                {chat.context && (
                  <div className="px-4 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-[10px] font-black uppercase text-indigo-400 inline-flex items-center">
                    <Sparkles size={10} className="mr-1.5" /> Context: {chat.context}
                  </div>
                )}
              </div>
            </div>
          ))}
          {isEvaluating && (
            <div className="flex justify-start">
               <div className="p-4 glass rounded-2xl text-xs text-slate-500 italic animate-pulse">Node evaluating response...</div>
            </div>
          )}
       </div>

       <div className="glass p-6 rounded-[2.5rem] border border-white/10">
          <div className="flex items-center space-x-4">
            <input 
              value={currentAnswer}
              onChange={e => setCurrentAnswer(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && submitAnswer()}
              placeholder="Deploy your response..."
              className="flex-1 bg-white/5 border border-white/5 rounded-2xl py-4 px-6 outline-none focus:ring-1 focus:ring-indigo-500 text-sm"
            />
            <button 
              onClick={submitAnswer}
              disabled={isEvaluating || !currentAnswer}
              className="p-4 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-500/20 disabled:opacity-50"
            >
              <Send size={20} />
            </button>
            <button className="p-4 glass border border-white/10 text-slate-400 hover:text-indigo-400 rounded-2xl transition-all">
              <Mic size={20} />
            </button>
          </div>
       </div>
    </div>
  );
};

export default MockInterview;
