import React from 'react';
import { CheckCircle2, Download, FileText, ShieldCheck, AlertCircle } from 'lucide-react';

export const ComplianceReports: React.FC = () => {
  const handleDownloadPDF = () => {
    window.open('http://localhost:8000/api/v1/reports/generate', '_blank');
  };

  const nistControls = [
    { code: 'NIST-ICS-01', title: 'Purdue Model Network Segmentation Level 0-3', status: 'PASS', score: '100%' },
    { code: 'NIST-ICS-02', title: 'Modbus & DNP3 Telemetry Anomaly Monitoring', status: 'PASS', score: '98%' },
    { code: 'NIST-ICS-03', title: 'Multi-Factor Hardware Token Authentication', status: 'PASS', score: '92%' },
    { code: 'NIST-ICS-04', title: 'Firmware Update & Buffer Overflow Patching', status: 'WARN', score: '78%' },
    { code: 'CERT-IN-01', title: 'Immutable Security Audit Log Retention', status: 'PASS', score: '100%' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-[#0c1017] p-5 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" /> NIST SP 800-82 & CERT-In Compliance Center
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Automated Audit Verification and PDF Executive Audit Report Generation.
          </p>
        </div>

        <button
          onClick={handleDownloadPDF}
          className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-2 transition shadow-neon-green"
        >
          <Download className="w-4 h-4" /> GENERATE PDF AUDIT REPORT
        </button>
      </div>

      {/* Compliance Controls List */}
      <div className="bg-[#0c1017] p-5 rounded-xl border border-slate-800 space-y-4">
        <h3 className="text-sm font-semibold text-slate-200 border-b border-slate-800 pb-2">
          NIST SP 800-82 Rev 3 & CERT-In Control Evaluation
        </h3>

        <div className="space-y-3">
          {nistControls.map((c) => (
            <div key={c.code} className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${c.status === 'PASS' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-mono text-xs text-[#00f0ff] font-bold">{c.code}</div>
                  <div className="text-xs font-semibold text-slate-200 mt-0.5">{c.title}</div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="font-mono text-xs font-bold text-slate-300">{c.score}</span>
                <span
                  className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold ${
                    c.status === 'PASS'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  }`}
                >
                  {c.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
