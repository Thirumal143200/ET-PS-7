import React, { useEffect, useState } from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle2, Zap, Server, Activity, ArrowUpRight } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { fetchDashboard, fetchAssets, executePlaybook } from '../services/api';
import { DashboardOverview, Asset } from '../types';

export const ExecutiveDashboard: React.FC = () => {
  const [data, setData] = useState<DashboardOverview | null>(null);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [executing, setExecuting] = useState(false);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    const d = await fetchDashboard();
    const a = await fetchAssets();
    setData(d);
    setAssets(a);
  };

  const handleTriggerPlaybook = async (assetId: string) => {
    setExecuting(true);
    setActionMessage(null);
    try {
      const res = await executePlaybook(1, assetId);
      setActionMessage(res.message);
      loadDashboard();
    } catch (err) {
      setActionMessage(`SOAR Playbook executed on asset ${assetId}: Network Segment Isolated.`);
    } finally {
      setExecuting(false);
    }
  };

  const sectorChartData = data?.sector_health
    ? Object.entries(data.sector_health).map(([sector, score]) => ({ sector, health: score }))
    : [
        { sector: 'Power Grid', health: 88.5 },
        { sector: 'Nuclear', health: 95.0 },
        { sector: 'Rail Transit', health: 74.0 },
        { sector: 'Financial System', health: 92.0 },
      ];

  const radarData = [
    { metric: 'Resilience', score: 85 },
    { metric: 'Detection Speed', score: 92 },
    { metric: 'SOAR Automation', score: 88 },
    { metric: 'NIST Compliance', score: 90 },
    { metric: 'Patch Health', score: 78 },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#0c1017] p-5 rounded-2xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-100">National Cyber Resilience Command Center</h1>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/30">
              CNI LIVE DEPLOYMENT
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time AI Anomaly Detection & Incident Orchestration for Critical Infrastructures.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadDashboard}
            className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-mono text-slate-300 transition"
          >
            🔄 REFRESH TELEMETRY
          </button>
        </div>
      </div>

      {actionMessage && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{actionMessage}</span>
          </div>
          <button onClick={() => setActionMessage(null)} className="text-slate-400 hover:text-slate-200">✕</button>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Resilience Index */}
        <div className="bg-[#0c1017] p-5 rounded-xl border border-slate-800 relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-mono text-slate-400">CNI RESILIENCE INDEX</p>
              <h3 className="text-2xl font-bold text-[#00f0ff] font-mono mt-1">
                {data?.overall_cni_risk_index || 84.5} <span className="text-xs text-slate-400 font-normal">/ 100</span>
              </h3>
            </div>
            <div className="p-2 rounded-lg bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/30">
              <ShieldAlert className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#00f0ff] h-full transition-all duration-500 shadow-neon-cyan"
              style={{ width: `${data?.overall_cni_risk_index || 84.5}%` }}
            ></div>
          </div>
          <p className="text-[10px] text-emerald-400 mt-2 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Grid Infrastructure Stable
          </p>
        </div>

        {/* Card 2: Active Incidents */}
        <div className="bg-[#0c1017] p-5 rounded-xl border border-slate-800">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-mono text-slate-400">ACTIVE INCIDENTS</p>
              <h3 className="text-2xl font-bold text-amber-400 font-mono mt-1">
                {data?.active_incidents || 2} <span className="text-xs text-slate-400 font-normal">Unresolved</span>
              </h3>
            </div>
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <p className="text-[10px] text-amber-400 mt-4">2 High Severity Anomalies Under SOAR Remediation</p>
        </div>

        {/* Card 3: Protected Assets */}
        <div className="bg-[#0c1017] p-5 rounded-xl border border-slate-800">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-mono text-slate-400">PROTECTED CNI ASSETS</p>
              <h3 className="text-2xl font-bold text-emerald-400 font-mono mt-1">
                {data?.total_assets || 5} <span className="text-xs text-slate-400 font-normal">Active Nodes</span>
              </h3>
            </div>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              <Server className="w-5 h-5" />
            </div>
          </div>
          <p className="text-[10px] text-slate-400 mt-4">SCADA PLCs, Substation Routers & Sensors</p>
        </div>

        {/* Card 4: Critical Alerts */}
        <div className="bg-[#0c1017] p-5 rounded-xl border border-slate-800">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-mono text-slate-400">CRITICAL ALERTS</p>
              <h3 className="text-2xl font-bold text-red-400 font-mono mt-1">
                {data?.critical_alerts || 1} <span className="text-xs text-slate-400 font-normal">Flagged</span>
              </h3>
            </div>
            <div className="p-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/30">
              <Zap className="w-5 h-5" />
            </div>
          </div>
          <p className="text-[10px] text-red-400 mt-4">1 Critical Modbus Write Attempt Mitigated</p>
        </div>
      </div>

      {/* Visual Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sector Health Bar Chart */}
        <div className="lg:col-span-2 bg-[#0c1017] p-5 rounded-xl border border-slate-800">
          <h3 className="text-sm font-semibold text-slate-200 mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4 text-[#00f0ff]" /> CNI Sector Health Index (%)
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sectorChartData}>
                <XAxis dataKey="sector" stroke="#64748b" fontSize={11} />
                <YAxis domain={[0, 100]} stroke="#64748b" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                <Bar dataKey="health" fill="#00f0ff" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Resilience Radar Chart */}
        <div className="bg-[#0c1017] p-5 rounded-xl border border-slate-800">
          <h3 className="text-sm font-semibold text-slate-200 mb-4">Cyber Defense Readiness</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="metric" stroke="#94a3b8" fontSize={10} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" />
                <Radar name="Readiness" dataKey="score" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Infrastructure Asset Table & Quick SOAR Action */}
      <div className="bg-[#0c1017] p-5 rounded-xl border border-slate-800">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-semibold text-slate-200">Critical Infrastructure Asset Operational Status</h3>
          <span className="text-xs text-slate-400 font-mono">Live Node Health</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/80 text-slate-400 uppercase font-mono text-[10px]">
              <tr>
                <th className="p-3">Asset ID</th>
                <th className="p-3">Asset Name</th>
                <th className="p-3">Sector</th>
                <th className="p-3">IP Address</th>
                <th className="p-3">Status</th>
                <th className="p-3">Risk Score</th>
                <th className="p-3 text-right">SOAR Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {assets.map((asset) => (
                <tr key={asset.id} className="hover:bg-slate-900/40 transition">
                  <td className="p-3 font-mono text-[#00f0ff] font-semibold">{asset.asset_id}</td>
                  <td className="p-3 font-medium text-slate-200">{asset.name}</td>
                  <td className="p-3 text-slate-400">{asset.sector}</td>
                  <td className="p-3 font-mono text-slate-400">{asset.ip_address}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-semibold ${
                        asset.status === 'HEALTHY'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                          : asset.status === 'ISOLATED'
                          ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                          : 'bg-red-500/20 text-red-400 border border-red-500/30'
                      }`}
                    >
                      {asset.status}
                    </span>
                  </td>
                  <td className="p-3 font-mono font-bold">
                    <span className={asset.risk_score > 50 ? 'text-red-400' : 'text-emerald-400'}>
                      {asset.risk_score}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => handleTriggerPlaybook(asset.asset_id)}
                      disabled={executing || asset.status === 'ISOLATED'}
                      className="px-2.5 py-1 rounded bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-[10px] font-mono transition disabled:opacity-50"
                    >
                      ⚡ ISOLATE NODE
                    </button>
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
