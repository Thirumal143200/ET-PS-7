import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { Login } from './pages/Login';
import { ExecutiveDashboard } from './pages/ExecutiveDashboard';
import { UEBADashboard } from './pages/UEBADashboard';
import { IncidentSOAR } from './pages/IncidentSOAR';
import { ThreatHunting } from './pages/ThreatHunting';
import { MitreMatrix } from './pages/MitreMatrix';
import { ThreatIntel } from './pages/ThreatIntel';
import { AssetInventory } from './pages/AssetInventory';
import { ComplianceReports } from './pages/ComplianceReports';
import { AuditLogsPage } from './pages/AuditLogsPage';
import { SettingsPage } from './pages/SettingsPage';
import { fetchDashboard } from './services/api';

export function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('cni_token'));
  const [userRole, setUserRole] = useState<string>(localStorage.getItem('cni_role') || 'admin');
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [cniRiskIndex, setCniRiskIndex] = useState<number>(84.5);
  const [systemStatus, setSystemStatus] = useState<string>('OPERATIONAL');

  useEffect(() => {
    if (token) {
      fetchDashboard().then((d) => {
        if (d) {
          setCniRiskIndex(d.overall_cni_risk_index);
          setSystemStatus(d.system_status);
        }
      });
    }
  }, [token]);

  const handleLoginSuccess = (newToken: string, role: string) => {
    setToken(newToken);
    setUserRole(role);
  };

  const handleLogout = () => {
    localStorage.removeItem('cni_token');
    localStorage.removeItem('cni_role');
    setToken(null);
  };

  if (!token) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="flex min-h-screen bg-[#080b11] text-slate-100 font-sans">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userRole={userRole}
        onLogout={handleLogout}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Navbar cniRiskIndex={cniRiskIndex} systemStatus={systemStatus} />

        <main className="flex-1 overflow-y-auto">
          {activeTab === 'dashboard' && <ExecutiveDashboard />}
          {activeTab === 'ueba' && <UEBADashboard />}
          {activeTab === 'soar' && <IncidentSOAR />}
          {activeTab === 'hunting' && <ThreatHunting />}
          {activeTab === 'mitre' && <MitreMatrix />}
          {activeTab === 'threats' && <ThreatIntel />}
          {activeTab === 'assets' && <AssetInventory />}
          {activeTab === 'compliance' && <ComplianceReports />}
          {activeTab === 'audit' && <AuditLogsPage />}
          {activeTab === 'settings' && <SettingsPage />}
        </main>
      </div>
    </div>
  );
}

export default App;
