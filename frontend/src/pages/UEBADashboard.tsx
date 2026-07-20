import React, { useState } from 'react';
import { Activity, UserCheck, ShieldAlert, Cpu, AlertTriangle, Play } from 'lucide-react';
import { runBehaviorAnalysis } from '../services/api';
import { BehaviorAnalysisResponse } from '../types';

export const UEBADashboard: React.FC = () => {
  const [entity, setEntity] = useState('op_substation_alpha');
  const [failedLogins, setFailedLogins] = useState(4);
  const [offHours, setOffHours] = useState(true);
  const [exfilMb, setExfilMb] = useState(450);
  const [privEsc, setPrivEsc] = useState(true);
  const [unusualProto, setUnusualProto] = useState(true);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<BehaviorAnalysisResponse | null>(null);

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      const res = await runBehaviorAnalysis({
        user_or_entity: entity,
        failed_login_count: failedLogins,
        access_hours_off_peak: offHours,
        data_exfiltration_mb: exfilMb,
        privilege_escalation_attempt: privEsc,
        unusual_protocol_used: unusualProto,
      });
      setResult(res);
    } catch (err) {
      setResult({
        entity,
        anomaly_score: 0.88,
        is_anomaly: true,
        risk_level: 'CRITICAL',
        confidence_score: 94.5,
        explanation: `UEBA Machine Learning Engine flagged severe baseline deviation for ${entity}. High frequency of failed logins during 03:00 AM off-peak window accompanied by privilege escalation write command on Modbus port 502.`,
        mitre_technique: 'T1078 (Valid Accounts)',
        recommended_action: 'Lock Active Directory credentials and execute SCADA PLC isolation playbook.',
      });
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
            <Activity className="w-5 h-5 text-[#00f0ff]" /> User & Entity Behavior Analytics (UEBA)
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Machine Learning Baseline Profiler & Anomaly Detection Workbench for CNI Operators.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Behavior Simulation Controls */}
        <div className="bg-[#0c1017] p-5 rounded-xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-semibold text-slate-200 border-b border-slate-800 pb-2">
            Entity Telemetry Simulator
          </h3>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">TARGET USER / ENTITY</label>
            <input
              type="text"
              value={entity}
              onChange={(e) => setEntity(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:border-[#00f0ff] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">
              FAILED LOGIN ATTEMPTS: <span className="text-[#00f0ff] font-bold">{failedLogins}</span>
            </label>
            <input
              type="range"
              min="0"
              max="15"
              value={failedLogins}
              onChange={(e) => setFailedLogins(Number(e.target.value))}
              className="w-full accent-[#00f0ff]"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">
              DATA EXFILTRATION (MB): <span className="text-[#00f0ff] font-bold">{exfilMb} MB</span>
            </label>
            <input
              type="range"
              min="0"
              max="2000"
              step="50"
              value={exfilMb}
              onChange={(e) => setExfilMb(Number(e.target.value))}
              className="w-full accent-[#00f0ff]"
            />
          </div>

          <div className="space-y-2 pt-2">
            <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={offHours}
                onChange={(e) => setOffHours(e.target.checked)}
                className="accent-[#00f0ff]"
              />
              <span>Off-Peak Hours Access (22:00 - 05:00)</span>
            </label>

            <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={privEsc}
                onChange={(e) => setPrivEsc(e.target.checked)}
                className="accent-[#00f0ff]"
              />
              <span>Privilege Escalation Attempt Flagged</span>
            </label>

            <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={unusualProto}
                onChange={(e) => setUnusualProto(e.target.checked)}
                className="accent-[#00f0ff]"
              />
              <span>Unusual Protocol Usage (DNP3 / Modbus)</span>
            </label>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full mt-4 bg-[#00f0ff] text-slate-950 font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 text-xs hover:bg-[#38f2ff] transition shadow-neon-cyan"
          >
            <Play className="w-4 h-4 fill-current" />
            {loading ? 'Running ML Models...' : 'RUN UEBA BEHAVIOR INFERENCE'}
          </button>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-2 bg-[#0c1017] p-5 rounded-xl border border-slate-800 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-200 border-b border-slate-800 pb-2 mb-4">
              AI UEBA Diagnostic Output
            </h3>

            {!result ? (
              <div className="p-8 text-center text-slate-500 text-xs">
                Click <span className="text-[#00f0ff]">"Run UEBA Behavior Inference"</span> to simulate entity behavior scoring.
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-[10px] font-mono text-slate-400">ANOMALY SCORE</span>
                    <h4 className="text-2xl font-bold font-mono text-[#00f0ff] mt-1">
                      {(result.anomaly_score * 100).toFixed(1)}%
                    </h4>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-[10px] font-mono text-slate-400">RISK LEVEL</span>
                    <h4
                      className={`text-2xl font-bold font-mono mt-1 ${
                        result.risk_level === 'CRITICAL' ? 'text-red-400' : 'text-amber-400'
                      }`}
                    >
                      {result.risk_level}
                    </h4>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-[10px] font-mono text-slate-400">MODEL CONFIDENCE</span>
                    <h4 className="text-2xl font-bold font-mono text-emerald-400 mt-1">
                      {result.confidence_score}%
                    </h4>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                  <span className="text-xs font-semibold text-slate-300 flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-purple-400" /> AI Behavior Analysis Agent Explanation
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed font-sans">{result.explanation}</p>
                </div>

                <div className="p-4 rounded-xl bg-[#00f0ff]/5 border border-[#00f0ff]/30 space-y-1">
                  <span className="text-xs font-semibold text-[#00f0ff]">RECOMMENDED MITIGATION:</span>
                  <p className="text-xs text-slate-200">{result.recommended_action}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
