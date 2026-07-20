import React, { useEffect, useState } from 'react';
import { FileSearch, ShieldAlert, Globe, Server, Hash } from 'lucide-react';
import { fetchThreats } from '../services/api';
import { ThreatIntelItem } from '../types';

export const ThreatIntel: React.FC = () => {
  const [threats, setThreats] = useState<ThreatIntelItem[]>([]);

  useEffect(() => {
    fetchThreats().then(setThreats);
  }, []);

  const fallbackThreats = [
    {
      id: 1,
      indicator: '198.51.100.42',
      indicator_type: 'IP',
      threat_type: 'APT Command & Control Server',
      severity: 'CRITICAL',
      description: 'Known C2 node belonging to APT41 targeting industrial control systems in Southern Asia.',
      mitre_technique: 'T1071.001',
      confidence: 98.5
    },
    {
      id: 2,
      indicator: 'CVE-2026-1189',
      indicator_type: 'CVE',
      threat_type: 'SCADA PLC Unauthenticated Buffer Overflow',
      severity: 'CRITICAL',
      description: 'Remote code execution flaw in Modbus TCP register processing daemon on port 502.',
      mitre_technique: 'T1190',
      confidence: 100.0
    },
    {
      id: 3,
      indicator: '4a8f9b2c3d1e0f5a6b7c8d9e0f1a2b3c',
      indicator_type: 'HASH',
      threat_type: 'Custom SCADA Wiper Malware (BlackEnergy-v4)',
      severity: 'HIGH',
      description: 'Sha256 hash of malicious executable targeting DNP3 protocol stacks.',
      mitre_technique: 'T1565.001',
      confidence: 94.0
    }
  ];

  const items = threats.length > 0 ? threats : fallbackThreats;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-[#0c1017] p-5 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <FileSearch className="w-5 h-5 text-[#00f0ff]" /> CNI Threat Intelligence & CVE Feed
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Correlated Indicators of Compromise (IOCs) from NVD, CERT-In, and Global Threat Exchange.
          </p>
        </div>
      </div>

      <div className="bg-[#0c1017] p-5 rounded-xl border border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/80 text-slate-400 uppercase font-mono text-[10px]">
              <tr>
                <th className="p-3">Indicator / IOC</th>
                <th className="p-3">Type</th>
                <th className="p-3">Threat Category</th>
                <th className="p-3">Severity</th>
                <th className="p-3">Description</th>
                <th className="p-3">MITRE Technique</th>
                <th className="p-3 text-right">Confidence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {items.map((t) => (
                <tr key={t.id} className="hover:bg-slate-900/40 transition">
                  <td className="p-3 font-mono text-[#00f0ff] font-semibold flex items-center gap-2">
                    {t.indicator_type === 'IP' && <Globe className="w-3.5 h-3.5 text-[#00f0ff]" />}
                    {t.indicator_type === 'CVE' && <Server className="w-3.5 h-3.5 text-amber-400" />}
                    {t.indicator_type === 'HASH' && <Hash className="w-3.5 h-3.5 text-purple-400" />}
                    <span>{t.indicator}</span>
                  </td>
                  <td className="p-3 font-mono text-[10px] text-slate-400">{t.indicator_type}</td>
                  <td className="p-3 font-medium text-slate-200">{t.threat_type}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold bg-red-500/20 text-red-400 border border-red-500/30">
                      {t.severity}
                    </span>
                  </td>
                  <td className="p-3 text-slate-300 max-w-xs truncate">{t.description}</td>
                  <td className="p-3 font-mono text-purple-400">{t.mitre_technique || 'N/A'}</td>
                  <td className="p-3 text-right font-mono font-bold text-emerald-400">{t.confidence}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
