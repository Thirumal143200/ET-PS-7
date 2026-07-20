import React from 'react';
import {
  ShieldAlert,
  Activity,
  Zap,
  Target,
  FileSearch,
  Database,
  CheckCircle2,
  Lock,
  Settings,
  BrainCircuit,
  LogOut
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userRole: string;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, userRole, onLogout }) => {
  const navItems = [
    { id: 'dashboard', label: 'Executive SOC', icon: ShieldAlert },
    { id: 'ueba', label: 'UEBA Analytics', icon: Activity },
    { id: 'soar', label: 'Incident & SOAR', icon: Zap },
    { id: 'hunting', label: 'Threat Hunting RAG', icon: BrainCircuit },
    { id: 'mitre', label: 'MITRE Matrix', icon: Target },
    { id: 'threats', label: 'Threat Intel & CVE', icon: FileSearch },
    { id: 'assets', label: 'CNI Asset Inventory', icon: Database },
    { id: 'compliance', label: 'Compliance & Reports', icon: CheckCircle2 },
    { id: 'audit', label: 'Audit Logs', icon: Lock },
    { id: 'settings', label: 'Settings & Models', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#0c1017] border-r border-slate-800/80 flex flex-col h-screen sticky top-0 z-30">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800/80 flex items-center gap-3">
        <div className="p-2 bg-[#00f0ff]/10 border border-[#00f0ff]/30 rounded-lg text-[#00f0ff] shadow-neon-cyan">
          <ShieldAlert className="w-6 h-6 animate-pulse" />
        </div>
        <div>
          <h1 className="font-bold text-sm text-slate-100 tracking-wider">CNI CYBER RESILIENCE</h1>
          <p className="text-[10px] text-[#00f0ff] font-mono tracking-widest">ET HACKATHON 2026</p>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all ${
                isActive
                  ? 'bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/30 shadow-neon-cyan font-semibold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 border border-transparent'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-[#00f0ff]' : 'text-slate-400'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* User Info & Logout Footer */}
      <div className="p-3 border-t border-slate-800/80 bg-[#080b11]">
        <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 flex items-center justify-between">
          <div className="truncate">
            <p className="text-xs font-semibold text-slate-200 truncate">CNI Defense Director</p>
            <span className="inline-block px-1.5 py-0.5 rounded text-[9px] font-mono uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Role: {userRole}
            </span>
          </div>
          <button
            onClick={onLogout}
            title="Logout"
            className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded transition"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
