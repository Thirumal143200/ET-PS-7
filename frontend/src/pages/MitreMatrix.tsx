import React, { useEffect, useState } from 'react';
import { Target, AlertCircle, ShieldCheck } from 'lucide-react';
import { fetchMitreMatrix } from '../services/api';
import { MitreMatrixResponse } from '../types';

export const MitreMatrix: React.FC = () => {
  const [data, setData] = useState<MitreMatrixResponse | null>(null);

  useEffect(() => {
    fetchMitreMatrix().then(setData);
  }, []);

  const defaultMatrix = {
    'Initial Access': [
      { id: 1, technique_id: 'T1190', technique_name: 'Exploit Public Application', hit_count: 22, severity: 'CRITICAL', recommendation: 'Apply Modbus PLC firmware hotfix v4.2.1-sec.' }
    ],
    'Execution': [
      { id: 2, technique_id: 'T1059.001', technique_name: 'PowerShell Command Exec', hit_count: 14, severity: 'HIGH', recommendation: 'Enforce Constrained Language Mode on HMI.' }
    ],
    'Persistence': [
      { id: 3, technique_id: 'T1078.003', technique_name: 'Local Accounts Misuse', hit_count: 8, severity: 'MEDIUM', recommendation: 'Rotate default SCADA maintenance passwords.' }
    ],
    'Impact (ICS)': [
      { id: 4, technique_id: 'T1565.002', technique_name: 'Transmitted Data Manipulation', hit_count: 5, severity: 'CRITICAL', recommendation: 'Deploy cryptographic signing on DNP3 links.' }
    ]
  };

  const matrixData = data?.matrix && Object.keys(data.matrix).length > 0 ? data.matrix : defaultMatrix;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-[#0c1017] p-5 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Target className="w-5 h-5 text-red-400" /> MITRE ATT&CK Matrix & Heatmap for ICS / CNI
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time Threat Technique Correlation mapped to Purdue Model Control Layers.
          </p>
        </div>
      </div>

      {/* Grid Layout of Matrix Tactics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(matrixData).map(([tactic, items]) => (
          <div key={tactic} className="bg-[#0c1017] p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="flex justify-between items-center border-b border-slate-800 pb-2">
              <h3 className="text-xs font-mono font-bold text-[#00f0ff] uppercase">{tactic}</h3>
              <span className="text-[10px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded font-mono">
                {items.length} Flagged
              </span>
            </div>

            <div className="space-y-2">
              {items.length === 0 ? (
                <div className="p-3 text-[10px] text-slate-500 font-mono text-center">NO DETECTED HITS</div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.technique_id}
                    className={`p-3 rounded-lg border text-xs space-y-1 transition ${
                      item.severity === 'CRITICAL'
                        ? 'bg-red-500/10 border-red-500/40 text-red-300'
                        : 'bg-amber-500/10 border-amber-500/40 text-amber-300'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-mono font-bold">{item.technique_id}</span>
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-mono bg-slate-950 font-bold">
                        HITS: {item.hit_count}
                      </span>
                    </div>
                    <div className="font-medium text-slate-200">{item.technique_name}</div>
                    <p className="text-[10px] text-slate-400 pt-1 border-t border-slate-800/80">
                      💡 {item.recommendation}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
