import React, { useState, useEffect } from 'react';
import { Bell, ShieldCheck, Activity, Cpu, Clock } from 'lucide-react';

interface NavbarProps {
  cniRiskIndex: number;
  systemStatus: string;
}

export const Navbar: React.FC<NavbarProps> = ({ cniRiskIndex, systemStatus }) => {
  const [timeStr, setTimeStr] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toUTCString().replace('GMT', 'UTC'));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="h-16 border-b border-slate-800/80 bg-[#0c1017]/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-20">
      {/* Live System Indicators */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
          <span className="text-xs font-mono text-emerald-400 font-semibold tracking-wider">
            STATUS: {systemStatus}
          </span>
        </div>

        <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs">
          <Activity className="w-3.5 h-3.5 text-[#00f0ff]" />
          <span className="text-slate-400">CNI Resilience Index:</span>
          <span className="font-bold text-[#00f0ff] font-mono">{cniRiskIndex} / 100</span>
        </div>

        <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs">
          <Cpu className="w-3.5 h-3.5 text-purple-400" />
          <span className="text-slate-400">ML Engine:</span>
          <span className="text-purple-400 font-mono">IsoForest + AutoEncoder Active</span>
        </div>
      </div>

      {/* Clock & Controls */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-900/80 px-3 py-1.5 rounded-md border border-slate-800">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span>{timeStr || 'LIVE UTC TIMELINE'}</span>
        </div>

        <div className="relative">
          <button className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 relative transition">
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#0c1017]"></span>
          </button>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
          <ShieldCheck className="w-4 h-4" />
          <span>CERT-In Secure Node</span>
        </div>
      </div>
    </header>
  );
};
