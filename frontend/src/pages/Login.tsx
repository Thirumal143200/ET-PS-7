import React, { useState } from 'react';
import { ShieldAlert, Lock, User, ArrowRight, CheckCircle } from 'lucide-react';
import { api } from '../services/api';

interface LoginProps {
  onLoginSuccess: (token: string, role: string) => void;
}

export const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('admin@cni.gov.in');
  const [password, setPassword] = useState('admin123');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const rolesPreset = [
    { role: 'admin', email: 'admin@cni.gov.in', pass: 'admin123', label: 'SOC Director (Admin)' },
    { role: 'analyst', email: 'analyst@cni.gov.in', pass: 'analyst123', label: 'Tier-2 Analyst' },
    { role: 'executive', email: 'executive@cni.gov.in', pass: 'exec123', label: 'CSO (Executive)' },
    { role: 'auditor', email: 'auditor@cni.gov.in', pass: 'auditor123', label: 'CERT-In Auditor' },
  ];

  const handleRoleSelect = (email: string, pass: string) => {
    setUsername(email);
    setPassword(pass);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await api.post('/auth/login', { username, password });
      const { access_token, user_info } = res.data;
      localStorage.setItem('cni_token', access_token);
      localStorage.setItem('cni_role', user_info.role);
      onLoginSuccess(access_token, user_info.role);
    } catch (err: any) {
      // Fallback for standalone demo mode if backend is unreachable
      if (password === 'admin123' || password === 'analyst123' || password === 'exec123' || password === 'auditor123') {
        const dummyToken = 'mock_jwt_token_cni_2026';
        const dummyRole = username.includes('admin') ? 'admin' : 'analyst';
        localStorage.setItem('cni_token', dummyToken);
        localStorage.setItem('cni_role', dummyRole);
        onLoginSuccess(dummyToken, dummyRole);
      } else {
        setError(err?.response?.data?.detail || 'Authentication failed. Please check credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#080b11] flex flex-col justify-center items-center p-6 relative overflow-hidden">
      {/* Background Cyber Grid effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293715_1px,transparent_1px),linear-gradient(to_bottom,#1f293715_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#00f0ff]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md bg-[#0c1017]/90 border border-slate-800 p-8 rounded-2xl shadow-2xl backdrop-blur-xl relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-[#00f0ff]/10 border border-[#00f0ff]/30 rounded-xl text-[#00f0ff] shadow-neon-cyan">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-100 tracking-wide">CNI CYBER RESILIENCE</h1>
            <p className="text-xs text-[#00f0ff] font-mono">ET AI Hackathon 2026 • PS 7</p>
          </div>
        </div>

        <h2 className="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wider">
          SOC Command Authentication
        </h2>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">USER IDENTITY / EMAIL</label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-[#00f0ff] transition"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">SECURITY ACCESS KEY</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-[#00f0ff] transition"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-[#00f0ff] text-slate-950 font-bold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-[#38f2ff] transition shadow-neon-cyan text-sm"
          >
            {loading ? 'Authenticating...' : 'ACCESS SOC COMMAND'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Preset RBAC Role Selectors */}
        <div className="mt-6 pt-6 border-t border-slate-800">
          <p className="text-[11px] font-mono text-slate-400 mb-2">QUICK RBAC DEMO LOGIN:</p>
          <div className="grid grid-cols-2 gap-2">
            {rolesPreset.map((r) => (
              <button
                key={r.role}
                onClick={() => handleRoleSelect(r.email, r.pass)}
                className={`text-left p-2 rounded-lg border text-[11px] transition ${
                  username === r.email
                    ? 'bg-[#00f0ff]/10 border-[#00f0ff]/50 text-[#00f0ff]'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="font-semibold">{r.label}</div>
                <div className="text-[10px] text-slate-500 font-mono truncate">{r.email}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
