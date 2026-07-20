import React, { useState } from 'react';
import { Settings, Save, Key, Cpu, Bell, CheckCircle2 } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const [geminiKey, setGeminiKey] = useState('');
  const [openaiKey, setOpenaiKey] = useState('');
  const [isoContamination, setIsoContamination] = useState('0.1');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-[#0c1017] p-5 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Settings className="w-5 h-5 text-[#00f0ff]" /> System Settings & Model Configuration
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Configure LLM Provider API Keys, Isolation Forest sensitivity, and alert notifications.
          </p>
        </div>
      </div>

      {saved && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Configuration saved successfully. AI & ML parameters updated.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* API Key Configuration */}
        <div className="bg-[#0c1017] p-5 rounded-xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-semibold text-slate-200 border-b border-slate-800 pb-2 flex items-center gap-2">
            <Key className="w-4 h-4 text-[#00f0ff]" /> LLM API Credentials
          </h3>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">GOOGLE GEMINI API KEY</label>
            <input
              type="password"
              placeholder="AIzaSy..."
              value={geminiKey}
              onChange={(e) => setGeminiKey(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:border-[#00f0ff] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">OPENAI API KEY (COMPATIBLE)</label>
            <input
              type="password"
              placeholder="sk-..."
              value={openaiKey}
              onChange={(e) => setOpenaiKey(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:border-[#00f0ff] focus:outline-none"
            />
          </div>
        </div>

        {/* Model Parameters */}
        <div className="bg-[#0c1017] p-5 rounded-xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-semibold text-slate-200 border-b border-slate-800 pb-2 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-purple-400" /> Machine Learning Hyperparameters
          </h3>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">ISOLATION FOREST CONTAMINATION RATE</label>
            <select
              value={isoContamination}
              onChange={(e) => setIsoContamination(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:border-[#00f0ff] focus:outline-none"
            >
              <option value="0.05">0.05 (Strict Anomaly Filter)</option>
              <option value="0.10">0.10 (Standard CNI Baseline)</option>
              <option value="0.20">0.20 (High Sensitivity Mode)</option>
            </select>
          </div>

          <div className="pt-4 border-t border-slate-800">
            <button
              type="submit"
              className="bg-[#00f0ff] text-slate-950 font-bold py-2.5 px-6 rounded-lg text-xs flex items-center gap-2 hover:bg-[#38f2ff] transition shadow-neon-cyan"
            >
              <Save className="w-4 h-4" /> SAVE SYSTEM CONFIGURATION
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
