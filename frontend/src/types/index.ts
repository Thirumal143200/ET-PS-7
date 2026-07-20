export interface UserInfo {
  id: number;
  email: string;
  username: string;
  full_name: string;
  role: 'admin' | 'analyst' | 'executive' | 'auditor';
  department: string;
  mfa_enabled: boolean;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user_info: UserInfo;
}

export interface Asset {
  id: number;
  asset_id: string;
  name: string;
  asset_type: string;
  sector: string;
  ip_address: string;
  location: string;
  criticality: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  status: 'HEALTHY' | 'DEGRADED' | 'CRITICAL' | 'COMPROMISED' | 'ISOLATED';
  risk_score: number;
  firmware_version: string;
}

export interface AlertItem {
  id: number;
  alert_code: string;
  title: string;
  category: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  anomaly_score: number;
  confidence: number;
  description: string;
  is_acknowledged: boolean;
  created_at: string;
}

export interface IncidentItem {
  id: number;
  incident_code: string;
  title: string;
  description: string;
  severity: string;
  status: string;
  containment_status: string;
  created_at: string;
}

export interface DashboardOverview {
  total_assets: number;
  active_incidents: number;
  critical_alerts: number;
  overall_cni_risk_index: number;
  sector_health: Record<string, number>;
  recent_alerts: AlertItem[];
  mitre_coverage_summary: Record<string, number>;
  system_status: string;
}

export interface BehaviorAnalysisResponse {
  entity: string;
  anomaly_score: number;
  is_anomaly: boolean;
  risk_level: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  confidence_score: number;
  explanation: string;
  mitre_technique: string;
  recommended_action: string;
}

export interface MLPredictionResponse {
  is_anomaly: boolean;
  anomaly_score: number;
  attack_category: string;
  confidence_score: number;
  model_outputs: {
    isolation_forest_score: number;
    autoencoder_reconstruction_error: number;
    random_forest_confidence: number;
  };
  explanation: string;
  recommended_playbook: string;
}

export interface ThreatIntelItem {
  id: number;
  indicator: string;
  indicator_type: string;
  threat_type: string;
  severity: string;
  description: string;
  mitre_technique?: string;
  confidence: number;
}

export interface TimelineEvent {
  id: string;
  type: 'INCIDENT' | 'ALERT' | 'ANOMALY_LOG';
  title: string;
  severity: string;
  timestamp: string;
  description: string;
  status?: string;
  score?: number;
}

export interface MitreTechnique {
  id: number;
  technique_id: string;
  technique_name: string;
  hit_count: number;
  severity: string;
  detection_source: string;
  recommendation: string;
}

export interface MitreMatrixResponse {
  total_techniques_flagged: number;
  matrix: Record<string, MitreTechnique[]>;
}

export interface PlaybookResponse {
  playbook_id: number;
  playbook_name: string;
  status: string;
  executed_steps: Array<{ step: number; action: string; target: string }>;
  execution_time_ms: number;
  message: string;
}

export interface AgentChatResponse {
  agent_name: string;
  response: string;
  sources: string[];
  confidence: number;
  structured_data?: Record<string, any>;
}

export interface AuditLogItem {
  id: number;
  user_id: number;
  action: string;
  details: string;
  ip_address: string;
  timestamp: string;
}
