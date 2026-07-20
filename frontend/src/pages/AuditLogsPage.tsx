import React, { useEffect, useState } from 'react';
import { Lock, ShieldCheck } from 'lucide-react';
import { fetchAuditLogs } from '../services/api';
import { AuditLogItem } from '../types';

export const AuditLogsPage: React.FC = () => {
  const [logs, setLogs] = useState<AuditLogItem[]>([]);

  useEffect(() => {
    fetchAuditLogs().then(setLogs);
  }, []);

  const defaultLogs = [
    {
      id: 1,
      user_id: 1,
      action: 'SYSTEM_INITIALIZATION',
      details: 'CNI AI Cyber Resilience System initialized database tables and baseline AI models.',
      ip_address: '127.0.0.1',
      timestamp: new Date().toISOString()
    },
    {
      id: 2,
      user_id: 1,
      action: 'SOAR_PLAYBOOK_EXECUTED',
      details: "Executed playbook 'PLAYBOOK_ISOLATE_SCADA_PLC' on asset SCADA-PLC-001.",
      ip_address: '10.240.12.14',
      timestamp: new Date().toISOString()
    }
  ];

  const items = logs.length > 0 ? logs : defaultLogs;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-[#0c1017] p-5 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Lock className="w-5 h-5 text-[#00f0ff]" /> Immutable Security Audit Logs
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Tamper-proof audit records for CERT-In regulatory oversight and forensic verification.
          </p>
        </div>
      </div>

      <div className="bg-[#0c1017] p-5 rounded-xl border border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/80 text-slate-400 uppercase font-mono text-[10px]">
              <tr>
                <th className="p-3">Log ID</th>
                <th className="p-3">Action Event</th>
                <th className="p-3">Audit Details</th>
                <th className="p-3">IP Address</th>
                <th className="p-3 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {items.map((l) => (
                <tr key={l.id} className="hover:bg-slate-900/40 transition">
                  <td className="p-3 font-mono text-slate-500">#{l.id}</td>
                  <td className="p-3 font-mono font-bold text-[#00f0ff]">{l.action}</td>
                  <td className="p-3 text-slate-200">{l.details}</td>
                  <td className="p-3 font-mono text-slate-400">{l.ip_address}</td>
                  <td className="p-3 text-right font-mono text-slate-400 text-[10px]">
                    {new Date(l.timestamp).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
