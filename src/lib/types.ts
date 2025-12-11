export interface Provider {
  id: string;
  name: string;
  npi?: string;
  specialty: string[];
  phone: string;
  address: string;
  email?: string;
  license?: string;
  status: 'pending' | 'validated' | 'needs_review' | 'rejected';
  confidence_score: number;
  last_validated?: Date;
  created_at: Date;
  updated_at: Date;
}

export interface ValidationResult {
  provider_id: string;
  agent_type: 'data_validation' | 'enrichment' | 'quality_assurance' | 'directory_management';
  timestamp: Date;
  confidence_score: number;
  findings: string[];
  issues: string[];
  recommendations: string[];
  data_changes?: any;
}

export interface AgentReport {
  total_processed: number;
  successful: number;
  needs_review: number;
  failed: number;
  avg_confidence: number;
  processing_time: number;
  timestamp: Date;
}

export interface DashboardStats {
  total_providers: number;
  validated_today: number;
  pending_review: number;
  avg_confidence: number;
  recent_validations: ValidationResult[];
}
