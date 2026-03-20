// Agent Types
export interface Agent {
  id: string;
  name: string;
  description: string;
  status: 'live' | 'coming-soon' | 'disabled';
  quarter: string; // "Q1 2026"
  capabilities: string[];
  skills: string[]; // skill IDs
  icon: string;
  color: string;
  autoConfig: boolean;
  config?: AgentConfig;
  metrics: AgentMetrics;
  // MindDash-specific config
  semanticLayer?: SemanticLayer;
  channels?: ChannelConfig[];
  permissions?: PermissionConfig[];
  knowledgeBase?: KnowledgeBase;
  alerts?: AlertConfig[];
  customMetrics?: CustomMetric[];
  queryExamples?: QueryExample[];
}

export interface AgentConfig {
  enabled: boolean;
  executionFrequency: 'realtime' | 'hourly' | 'daily' | 'weekly';
  resourceAllocation: 'low' | 'medium' | 'high';
  timeout: number; // seconds
}

export interface AgentMetrics {
  successRate: number;
  avgExecutionTime: number;
  totalExecutions: number;
  lastExecution: string; // ISO timestamp
}

// MindDash-specific Types
export interface SemanticLayer {
  id: string;
  name: string;
  description: string;
  entities: SemanticEntity[];
  relationships: SemanticRelationship[];
}

export interface SemanticEntity {
  id: string;
  name: string;
  displayName: string;
  description: string;
  fields: SemanticField[];
  sourceTable?: string;
}

export interface SemanticField {
  id: string;
  name: string;
  displayName: string;
  type: 'text' | 'number' | 'date' | 'boolean' | 'currency';
  description: string;
  synonyms: string[];
  aggregation?: 'sum' | 'avg' | 'count' | 'min' | 'max';
}

export interface SemanticRelationship {
  from: string; // entity ID
  to: string; // entity ID
  type: 'one-to-one' | 'one-to-many' | 'many-to-many';
  foreignKey: string;
}

export interface ChannelConfig {
  id: string;
  type: 'whatsapp' | 'teams' | 'slack' | 'web' | 'google-chat';
  enabled: boolean;
  credentials?: Record<string, string>;
  settings: {
    welcomeMessage?: string;
    fallbackMessage?: string;
    maxSessionDuration?: number;
  };
}

export interface PermissionConfig {
  id: string;
  userId: string;
  userName: string;
  role: 'admin' | 'analyst' | 'viewer';
  dataAccess: {
    entities: string[]; // entity IDs user can access
    filters: DataFilter[];
  };
}

export interface DataFilter {
  field: string;
  operator: 'equals' | 'not_equals' | 'in' | 'not_in' | 'greater_than' | 'less_than';
  value: string | number | string[];
}

export interface KnowledgeBase {
  id: string;
  name: string;
  documents: KnowledgeDocument[];
  enabled: boolean;
}

export interface KnowledgeDocument {
  id: string;
  name: string;
  type: 'pdf' | 'docx' | 'txt' | 'url';
  url?: string;
  content?: string;
  uploadedAt: string;
  status: 'processing' | 'ready' | 'error';
}

export interface AlertConfig {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  condition: {
    metric: string;
    operator: 'greater_than' | 'less_than' | 'equals' | 'not_equals';
    threshold: number;
  };
  frequency: 'realtime' | 'hourly' | 'daily' | 'weekly';
  channels: ('whatsapp' | 'teams' | 'email' | 'slack')[];
  recipients: string[];
}

export interface CustomMetric {
  id: string;
  name: string;
  displayName: string;
  description: string;
  formula: string;
  unit?: string;
  format?: 'number' | 'currency' | 'percentage';
}

export interface QueryExample {
  id: string;
  query: string;
  category: 'sales' | 'operations' | 'finance' | 'logistics' | 'hr';
  expectedResponse?: string;
}

// Skill Types
export interface Skill {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  category: 'datos' | 'analytics' | 'prediccion' | 'automatizacion' | 'industria' | 'governance';
  price: number; // EUR
  currency: 'EUR' | 'USD' | 'CLP';
  rating: number; // 1-5
  installCount: number;
  icon: string;
  developer: {
    name: string;
    verified: boolean;
  };
  compatibleAgents: string[]; // agent IDs
  version: string;
  versionHistory: SkillVersion[];
  revenueShare: {
    developer: number; // 70
    platform: number; // 30
  };
  installed: boolean;
}

export interface SkillVersion {
  version: string;
  releaseDate: string;
  changelog: string[];
}

// Integration Types
export interface Integration {
  id: string;
  name: string;
  type: 'sap' | 'postgresql' | 'mysql' | 'rest-api' | 'shopify' | 'bigquery' | 's3' | 'other';
  status: 'connected' | 'syncing' | 'error' | 'disconnected';
  lastSync: string; // ISO timestamp
  syncFrequency: 'realtime' | 'hourly' | 'daily' | 'weekly';
  credentials: {
    [key: string]: string; // Encrypted in real app
  };
  config: {
    useCDC: boolean;
    incremental: boolean;
    tables?: string[];
    endpoint?: string;
  };
  icon: string;
}

// Metric Types
export interface Metric {
  label: string;
  value: number | string;
  change?: number; // percentage change
  trend?: 'up' | 'down' | 'neutral';
  icon: string;
}

export interface UsageData {
  date: string; // ISO date
  skillsExecuted: number;
  cost: number;
  activeUsers: number;
}

// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'manager' | 'user';
}
