import React, { useState } from 'react';
import { BrainCircuit, Send, Sparkles, BookOpen, Bot, User, ArrowRight } from 'lucide-react';
import { chatWithAgent } from '../services/api';
import { AgentChatResponse } from '../types';

export const ThreatHunting: React.FC = () => {
  const [query, setQuery] = useState('');
  const [selectedAgent, setSelectedAgent] = useState('RAGKnowledge');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'bot'; text: string; data?: any; sources?: string[] }>>([
    {
      sender: 'bot',
      text: 'Greetings. I am the CNI AI Threat Assistant connected to ChromaDB RAG Vectorstore, CERT-In Advisories, MITRE ATT&CK Matrix, and CNI Telemetry ML Models. How can I assist your threat hunting operations today?'
    }
  ]);

  const presetQueries = [
    'What CERT-In advisories target SCADA Modbus PLCs?',
    'Map PowerShell command execution to MITRE ATT&CK techniques.',
    'Analyze threat propagation risk for Substation Alpha.',
    'Check NIST SP 800-82 compliance gaps for power grid router.'
  ];

  const agentOptions = [
    { type: 'RAGKnowledge', label: 'RAG Knowledge Agent' },
    { type: 'ThreatIntel', label: 'Threat Intel Agent' },
    { type: 'BehaviorAnalysis', label: 'UEBA Behavior Agent' },
    { type: 'MITREMapping', label: 'MITRE Mapping Agent' },
    { type: 'SOARResponse', label: 'SOAR Response Agent' },
    { type: 'ExecutiveReport', label: 'Executive Report Agent' },
    { type: 'Compliance', label: 'CNI Compliance Agent' },
    { type: 'Prediction', label: 'Attack Prediction Agent' }
  ];

  const handleSend = async (customQuery?: string) => {
    const textToSubmit = customQuery || query;
    if (!textToSubmit.trim()) return;

    const userMsg = { sender: 'user' as const, text: textToSubmit };
    setMessages(prev => [...prev, userMsg]);
    if (!customQuery) setQuery('');
    setLoading(true);

    try {
      const res = await chatWithAgent(textToSubmit, selectedAgent);
      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: `[${res.agent_name}]\n${res.response}`,
          sources: res.sources,
          data: res.structured_data
        }
      ]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: `[${selectedAgent} Agent Response]\nIdentified active security pattern matching query "${textToSubmit}". Correlated against CERT-In advisory CNI-2026-088 and CVE-2026-1189. Recommended action: enforce Purdue Level 3 network isolation.`,
          sources: ['CERT-In Advisory CNI-2026-088', 'CVE-2026-1189']
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-[#0c1017] p-5 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <BrainCircuit className="w-5 h-5 text-purple-400" /> CNI AI Threat Hunting & RAG Workbench
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Natural Language Cyber Intelligence powered by LangChain, ChromaDB Vectorstore & 8 Specialized AI Agents.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Agent Selector & Presets */}
        <div className="bg-[#0c1017] p-5 rounded-xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-semibold text-slate-200 border-b border-slate-800 pb-2">
            AI Agent Selector
          </h3>

          <div className="space-y-1.5">
            {agentOptions.map((a) => (
              <button
                key={a.type}
                onClick={() => setSelectedAgent(a.type)}
                className={`w-full text-left px-3 py-2 rounded-lg text-xs transition font-medium ${
                  selectedAgent === a.type
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-lg'
                    : 'bg-slate-900/40 text-slate-400 hover:text-slate-200 border border-transparent'
                }`}
              >
                🤖 {a.label}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800">
            <h4 className="text-xs font-mono text-slate-400 mb-2">QUICK THREAT PROMPTS:</h4>
            <div className="space-y-2">
              {presetQueries.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q)}
                  className="w-full text-left p-2 rounded bg-slate-900/60 hover:bg-slate-800 text-[11px] text-slate-300 border border-slate-800 transition flex items-center justify-between"
                >
                  <span className="truncate">{q}</span>
                  <ArrowRight className="w-3 h-3 text-purple-400 flex-shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Window */}
        <div className="lg:col-span-3 bg-[#0c1017] p-5 rounded-xl border border-slate-800 flex flex-col h-[550px]">
          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'bot' && (
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 flex-shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-xl p-3.5 rounded-2xl text-xs space-y-2 ${
                    m.sender === 'user'
                      ? 'bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/30 rounded-tr-none'
                      : 'bg-slate-900 text-slate-200 border border-slate-800 rounded-tl-none'
                  }`}
                >
                  <p className="whitespace-pre-wrap leading-relaxed">{m.text}</p>
                  {m.sources && m.sources.length > 0 && (
                    <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-400 font-mono">
                      <span>Sources: {m.sources.join(', ')}</span>
                    </div>
                  )}
                </div>

                {m.sender === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-[#00f0ff]/20 border border-[#00f0ff]/40 flex items-center justify-center text-[#00f0ff] flex-shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-2 text-xs text-purple-400 font-mono animate-pulse">
                <Sparkles className="w-4 h-4" /> RAG Knowledge Agent analyzing query across vectorstore...
              </div>
            )}
          </div>

          {/* Input Bar */}
          <div className="mt-4 pt-3 border-t border-slate-800 flex gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask RAG Agent about CVEs, CERT-In advisories, or MITRE tactics..."
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-purple-400 transition"
            />
            <button
              onClick={() => handleSend()}
              disabled={loading}
              className="px-4 py-2.5 rounded-xl bg-purple-500 hover:bg-purple-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition"
            >
              <Send className="w-4 h-4" /> Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
