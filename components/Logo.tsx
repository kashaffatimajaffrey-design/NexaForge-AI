
import React from 'react';

const Logo = ({ size = 32, className = "" }: { size?: number, className?: string }) => (
  <div className={`relative flex items-center justify-center ${className}`} style={{ width: size * 1.8, height: size * 1.8 }}>
    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]">
      <defs>
        <linearGradient id="ngGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#818cf8" />
          <stop offset="50%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#4f46e5" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Abstract futuristic frame */}
      <path d="M20,10 Q50,0 80,10 L90,40 Q100,50 90,60 L80,90 Q50,100 20,90 L10,60 Q0,50 10,40 Z" fill="none" stroke="url(#ngGrad)" strokeWidth="1.5" strokeDasharray="10 5" opacity="0.4" />
      <path d="M25,15 Q50,5 75,15 L85,45 Q95,50 85,55 L75,85 Q50,95 25,85 L15,55 Q5,50 15,45 Z" fill="rgba(99,102,241,0.05)" />
      
      {/* The Stylish NG Typography */}
      <text x="50" y="65" textAnchor="middle" className="font-black" style={{ fontSize: '42px', fontFamily: 'Plus Jakarta Sans, sans-serif', letterSpacing: '-3px' }}>
        <tspan fill="white" filter="url(#glow)">N</tspan>
        <tspan fill="url(#ngGrad)" filter="url(#glow)">G</tspan>
      </text>
      
      {/* Accents */}
      <circle cx="20" cy="50" r="2" fill="#6366f1" />
      <circle cx="80" cy="50" r="2" fill="#818cf8" />
    </svg>
    <div className="absolute inset-0 bg-indigo-500/10 blur-[30px] rounded-full -z-10 animate-pulse"></div>
  </div>
);

export default Logo;
