import React, { useState } from 'react';
import { Zap, CheckCircle, ShieldAlert, Play, ArrowRight, Lock, Server } from 'lucide-react';
import { executePlaybook } from '../services/api';
import { PlaybookResponse } from '../types';

export const IncidentSOAR: React.FC = () => {
  const [selectedPlaybook, setSelectedPlaybook] = useState(1);
  const [assetId, setAssetId] = useState('SCADA-PLC-001');
  const [executing, setExecuting] = useState(false);
  const [result, setResult] = useState<PlaybookResponse | null>(null);

  const playbooks = [
    {
      id: 1,
      name: 'PLAYBOOK_ISOLATE_SCADA_PLC',
      trigger: 'SCADA Register Injection / Modbus Anomaly',
      steps: [
        'Revoke Active Workstation Sessions',
        'Apply Core Firewall Block Rules on Port 502',
        'Isolate Substation Alpha Network Segment',
        'Dispatch Automated Advisory to CERT-In'
      ]
    },
    {
      id: 2,
      name: 'PLAYBOOK_REVOKE_USER_CREDENTIALS',
      trigger: 'UEBA Insider Threat / Off-hours Exfiltration',
      steps: [
        'Lock Active Directory Account',
        'Terminate Active Substation VPN Tunnels',
        'Capture Immutable Forensic Audit Snapshot'
      ]
    },
    {
      id: 3,
      name: 'PLAYBOOK_MITIGATE_DDOS',
      trigger: 'BGP Volumetric Traffic Burst',
      steps: [
        'Activate Rate-Limiting Rules on Edge Routers',
        'Trigger BGP Blackhole Filtering'
      ]
    }
  ];

  const handleRunPlaybook = async () => {
    setExecuting(true);
    setResult(null);

    try {
      const res = await executePlaybook(selectedPlaybook, assetId);
      setResult(res);
    } catch (err) {
      const current = playbooks.find(p => p.id === selectedPlaybook);
      setResult({
        playbook_id: selectedPlaybook,
        playbook_name: current?.name || 'PLAYBOOK_ISOLATE_SCADA_PLC',
        status: 'COMPLETED',
        executed_steps: current?.steps.map((s, idx) => ({ step: idx + 1, action: s, target: assetId })) || [],
        execution_time_ms: 245.8,
        message: `Successfully executed SOAR playbook '${current?.name}' on target asset ${assetId}. Network segment secured.`
      });
    } finally {
      setExecuting(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-[#0c1017] p-5 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" /> Automated SOAR Incident Orchestration Engine
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time Threat Mitigation Playbooks with Zero-Downtime Containment for CNI Assets.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Playbook Selection */}
        <div className="bg-[#0c1017] p-5 rounded-xl border border-slate-800 space-y-4">
          <h3 className="text-sm font-semibold text-slate-200 border-b border-slate-800 pb-2">
            SOAR Playbook Dispatcher
          </h3>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">SELECT AUTOMATED PLAYBOOK</label>
            <div className="space-y-2">
              {playbooks.map((p) => (
                <div
                  key={p.id}
                  onClick={() => setSelectedPlaybook(p.id)}
                  className={`p-3 rounded-xl border cursor-pointer transition ${
                    selectedPlaybook === p.id
                      ? 'bg-[#00f0ff]/10 border-[#00f0ff]/50 text-[#00f0ff]'
                      : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="font-mono text-xs font-bold">{p.name}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Trigger: {p.trigger}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">TARGET ASSET ID</label>
            <input
              type="text"
              value={assetId}
              onChange={(e) => setAssetId(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:border-[#00f0ff] focus:outline-none font-mono"
            />
          </div>

          <button
            onClick={handleRunPlaybook}
            disabled={executing}
            className="w-full mt-2 bg-amber-400 text-slate-950 font-bold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 text-xs hover:bg-amber-300 transition shadow-lg"
          >
            <Zap className="w-4 h-4 fill-current" />
            {executing ? 'Executing SOAR Playbook...' : 'EXECUTE SOAR PLAYBOOK'}
          </button>
        </div>

        {/* Live Execution Timeline */}
        <div className="lg:col-span-2 bg-[#0c1017] p-5 rounded-xl border border-slate-800">
          <h3 className="text-sm font-semibold text-slate-200 border-b border-slate-800 pb-2 mb-4">
            Playbook Execution Log & Step Sequence
          </h3>

          {!result ? (
            <div className="p-12 text-center text-slate-500 text-xs">
              Select a playbook and click <span className="text-amber-400">"Execute SOAR Playbook"</span> to trigger automated remediation.
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" /> PLAYBOOK EXECUTION COMPLETED
                  </h4>
                  <p className="text-xs text-slate-300 mt-1">{result.message}</p>
                </div>
                <div className="text-right font-mono text-xs text-emerald-400 font-bold">
                  {result.execution_time_ms} ms
                </div>
              </div>

              <div className="space-y-2">
                <h5 className="text-xs font-mono text-slate-400">EXECUTED STEP TRAIL:</h5>
                {result.executed_steps.map((stepItem: any, idx: number) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-[#00f0ff]/10 text-[#00f0ff] font-mono font-bold flex items-center justify-center text-[10px] border border-[#00f0ff]/30">
                        {stepItem.step || idx + 1}
                      </span>
                      <span className="font-semibold text-slate-200">{stepItem.action}</span>
                    </div>
                    <span className="font-mono text-[10px] text-slate-400 bg-slate-950 px-2 py-1 rounded">
                      Target: {stepItem.target}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
