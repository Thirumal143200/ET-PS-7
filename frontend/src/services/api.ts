import axios from 'axios';
import {
  AuthResponse,
  DashboardOverview,
  Asset,
  AlertItem,
  ThreatIntelItem,
  TimelineEvent,
  MitreMatrixResponse,
  BehaviorAnalysisResponse,
  MLPredictionResponse,
  PlaybookResponse,
  AgentChatResponse,
  AuditLogItem
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach JWT Token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('cni_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API Calls with Graceful Fallbacks for Standalone Demo Mode
export const fetchDashboard = async (): Promise<DashboardOverview> => {
  try {
    const res = await api.get<DashboardOverview>('/dashboard');
    return res.data;
  } catch (err) {
    return {
      total_assets: 5,
      active_incidents: 2,
      critical_alerts: 1,
      overall_cni_risk_index: 84.5,
      sector_health: {
        'Power Grid': 88.5,
        'Nuclear Energy': 95.0,
        'Rail Transit': 74.0,
        'Financial System': 92.0,
      },
      recent_alerts: [
        {
          id: 1,
          alert_code: 'ALT-9041',
          title: 'SCADA Command Injection Detected',
          category: 'SCADA Attack',
          severity: 'CRITICAL',
          anomaly_score: 0.92,
          confidence: 96.5,
          description: 'Modbus FC 16 unauthorized register write attempt.',
          is_acknowledged: false,
          created_at: new Date().toISOString(),
        },
      ],
      mitre_coverage_summary: {
        Execution: 14,
        Persistence: 8,
        'Initial Access': 22,
        Impact: 5,
      },
      system_status: 'OPERATIONAL',
    };
  }
};

export const fetchAssets = async (): Promise<Asset[]> => {
  try {
    const res = await api.get<Asset[]>('/assets');
    return res.data;
  } catch (err) {
    return [
      {
        id: 1,
        asset_id: 'SCADA-PLC-001',
        name: 'Substation Alpha Modbus PLC Controller',
        asset_type: 'SCADA PLC',
        sector: 'Power Grid',
        ip_address: '10.240.12.14',
        location: 'Substation Alpha',
        criticality: 'CRITICAL',
        status: 'HEALTHY',
        risk_score: 18.5,
        firmware_version: 'v4.2.1-sec',
      },
      {
        id: 2,
        asset_id: 'RAIL-SIGNAL-SWITCH-44',
        name: 'Metro Interlocking Signal Control Server',
        asset_type: 'Rail Controller',
        sector: 'Rail Transit',
        ip_address: '10.90.101.44',
        location: 'Central Transit Depot',
        criticality: 'HIGH',
        status: 'DEGRADED',
        risk_score: 62.0,
        firmware_version: 'v3.8.4',
      },
    ];
  }
};

export const fetchAlerts = async (): Promise<AlertItem[]> => {
  try {
    const res = await api.get<AlertItem[]>('/alerts');
    return res.data;
  } catch (err) {
    return [];
  }
};

export const fetchThreats = async (): Promise<ThreatIntelItem[]> => {
  try {
    const res = await api.get<ThreatIntelItem[]>('/threats');
    return res.data;
  } catch (err) {
    return [];
  }
};

export const fetchTimeline = async (): Promise<TimelineEvent[]> => {
  try {
    const res = await api.get<{ events: TimelineEvent[] }>('/timeline');
    return res.data.events;
  } catch (err) {
    return [];
  }
};

export const fetchMitreMatrix = async (): Promise<MitreMatrixResponse> => {
  try {
    const res = await api.get<MitreMatrixResponse>('/mitre');
    return res.data;
  } catch (err) {
    return { total_techniques_flagged: 0, matrix: {} };
  }
};

export const runBehaviorAnalysis = async (data: any): Promise<BehaviorAnalysisResponse> => {
  const res = await api.post<BehaviorAnalysisResponse>('/behavior', data);
  return res.data;
};

export const runMLPrediction = async (data: any): Promise<MLPredictionResponse> => {
  const res = await api.post<MLPredictionResponse>('/predict', data);
  return res.data;
};

export const executePlaybook = async (playbook_id: number, asset_id: string): Promise<PlaybookResponse> => {
  const res = await api.post<PlaybookResponse>('/response', { playbook_id, asset_id });
  return res.data;
};

export const chatWithAgent = async (query: string, agent_type: string): Promise<AgentChatResponse> => {
  const res = await api.post<AgentChatResponse>('/agents/chat', { query, agent_type });
  return res.data;
};

export const fetchAuditLogs = async (): Promise<AuditLogItem[]> => {
  try {
    const res = await api.get<AuditLogItem[]>('/audit');
    return res.data;
  } catch (err) {
    return [];
  }
};
