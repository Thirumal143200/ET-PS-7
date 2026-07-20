import React, { useEffect, useState } from 'react';
import { Database, ShieldCheck, Server, Cpu } from 'lucide-react';
import { fetchAssets } from '../services/api';
import { Asset } from '../types';

export const AssetInventory: React.FC = () => {
  const [assets, setAssets] = useState<Asset[]>([]);

  useEffect(() => {
    fetchAssets().then(setAssets);
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-[#0c1017] p-5 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Database className="w-5 h-5 text-emerald-400" /> Critical Infrastructure Asset Inventory
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Complete Hardware, Firmware & SCADA Controller Registry across National Sectors.
          </p>
        </div>
      </div>

      <div className="bg-[#0c1017] p-5 rounded-xl border border-slate-800">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/80 text-slate-400 uppercase font-mono text-[10px]">
              <tr>
                <th className="p-3">Asset ID</th>
                <th className="p-3">Asset Name</th>
                <th className="p-3">Type</th>
                <th className="p-3">Sector</th>
                <th className="p-3">IP Address</th>
                <th className="p-3">Location</th>
                <th className="p-3">Firmware Version</th>
                <th className="p-3">Criticality</th>
                <th className="p-3">Risk Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {assets.map((a) => (
                <tr key={a.id} className="hover:bg-slate-900/40 transition">
                  <td className="p-3 font-mono text-[#00f0ff] font-semibold">{a.asset_id}</td>
                  <td className="p-3 font-medium text-slate-200">{a.name}</td>
                  <td className="p-3 text-slate-400">{a.asset_type}</td>
                  <td className="p-3 text-slate-300 font-semibold">{a.sector}</td>
                  <td className="p-3 font-mono text-slate-400">{a.ip_address}</td>
                  <td className="p-3 text-slate-400">{a.location}</td>
                  <td className="p-3 font-mono text-slate-400 text-[11px]">{a.firmware_version}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold bg-red-500/20 text-red-400 border border-red-500/30">
                      {a.criticality}
                    </span>
                  </td>
                  <td className="p-3 font-mono font-bold text-emerald-400">{a.risk_score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
