export type UserRole = 
  | 'controller' 
  | 'engineering' 
  | 'ohe' 
  | 'signalling' 
  | 'maintenance_planner' 
  | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  roleTitle: string;
  department: string;
  zone: string;
  division: string;
  avatar?: string;
}

export type DepartmentType = 'TRACK' | 'OHE' | 'SNT' | 'OPERATIONS' | 'SCADA';

export type AssetCondition = 'OPERATIONAL' | 'WARNING' | 'CRITICAL' | 'BLOCKED';

export interface AssetXaiFeature {
  feature: string;
  importance: number; // e.g. 0.35 = 35% contribution
  value: string;
  threshold: string;
  impact: 'NEGATIVE' | 'POSITIVE' | 'NEUTRAL';
}

export interface FixedAsset {
  id: string;
  code: string;
  name: string;
  department: DepartmentType;
  section: string;
  kmMarker: string;
  track: 'UP' | 'DN' | 'LOOP_1' | 'LOOP_2' | 'CHORD';
  assetCategory: 'RAIL_60KG' | 'RAIL_52KG' | 'TURNOUT' | 'SLEEPER_PSC' | 'OHE_CATENARY' | 'OHE_CANTILEVER' | 'AT_TRANSFORMER' | 'POINT_MACHINE' | 'AXLE_COUNTER' | 'SIGNAL_ASPECT';
  conditionScore: number; // 0 - 100 (100 is pristine)
  status: AssetCondition;
  installationDate: string;
  lastInspectionDate: string;
  nextScheduledInspection: string;
  gmtAccumulated: number; // Gross Million Tonnes
  tgiScore?: number; // Track Geometry Index (for track assets)
  omsPeakG?: number; // Oscillation Monitoring System G-force
  usfdFlawStatus?: 'CLEAR' | 'OBSERVE' | 'IMMEDIATE_ATTENTION';
  oheStaggerMm?: number;
  oheContactWireWearPercent?: number;
  pointStrokeSeconds?: number;
  failureRiskProbability: number; // 0 - 100%
  predictedFailureDays: number;
  maintenanceDue: boolean;
  blockRequired: boolean;
  estimatedMaintenanceDurationMin: number;
  xaiReasoning: string;
  xaiFeatures: AssetXaiFeature[];
  history: {
    date: string;
    type: string;
    description: string;
    technician: string;
  }[];
}

export type BlockType = 
  | 'ROUTINE_MAINTENANCE' 
  | 'EMERGENCY_REPAIR' 
  | 'SHADOW_CLUBBED' 
  | 'TRACK_TAMPING' 
  | 'OHE_ISOLATION' 
  | 'SNT_DISCONNECTION';

export type BlockStatus = 
  | 'REQUESTED' 
  | 'AI_RECOMMENDED' 
  | 'APPROVED' 
  | 'ACTIVE' 
  | 'MODIFIED' 
  | 'REJECTED' 
  | 'COMPLETED';

export interface MaintenanceBlock {
  id: string;
  blockCode: string;
  department: DepartmentType;
  departmentsInvolved: DepartmentType[];
  isShadowClubbed: boolean;
  section: string;
  track: 'UP' | 'DN' | 'BOTH' | 'LOOP_1' | 'LOOP_2';
  kmStart: string;
  kmEnd: string;
  assetIds: string[];
  blockType: BlockType;
  title: string;
  description: string;
  requestedStartTime: string;
  requestedEndTime: string;
  aiOptimalStartTime: string;
  aiOptimalEndTime: string;
  actualStartTime?: string;
  actualEndTime?: string;
  durationMinutes: number;
  status: BlockStatus;
  urgency: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  affectedTrainCount: number;
  predictedDelayMinutes: number;
  alternativeRouteAvailable: boolean;
  alternativeRouteName?: string;
  aiConfidenceScore: number;
  aiExplanation: string;
  crewDepot: string;
  machineDepot?: string;
  approvalHistory: {
    approvedBy?: string;
    approvedAt?: string;
    notes?: string;
  };
}

export type TrainType = 'VANDE_BHARAT' | 'RAJDHANI_SUPERFAST' | 'MAIL_EXPRESS' | 'BOXN_FREIGHT_COAL' | 'BTPN_FREIGHT_POL' | 'EMU_SUBURBAN';

export interface TrainEntity {
  id: string;
  trainNumber: string;
  trainName: string;
  trainType: TrainType;
  priority: 1 | 2 | 3 | 4; // 1 = Highest (Vande Bharat/Rajdhani), 4 = Standard Goods
  origin: string;
  destination: string;
  currentSection: string;
  currentKm: number;
  speedKmH: number;
  scheduledTime: string;
  estimatedTime: string;
  delayMinutes: number;
  assignedTrack: 'UP' | 'DN' | 'LOOP_1' | 'LOOP_2';
  diverted: boolean;
  diversionRoute?: string;
  rakeCapacity: string;
  goodsForecastTonnes?: number;
  locoNumber: string;
  guardName: string;
  driverName: string;
}

export interface BlockConflict {
  id: string;
  section: string;
  conflictType: 'OVERLAPPING_DEPT_POSSESSION' | 'TRAIN_CORRIDOR_CLASH' | 'POWER_ISOLATION_CONCURRENCY' | 'PEAK_HOUR_VIOLATION';
  severity: 'HIGH' | 'MEDIUM' | 'CRITICAL';
  title: string;
  description: string;
  departmentA: DepartmentType;
  departmentB?: DepartmentType;
  involvedTrainIds: string[];
  involvedBlockIds: string[];
  timeWindow: string;
  aiSuggestedSolution: string;
  aiDelaySavingsMinutes: number;
  status: 'PENDING' | 'RESOLVED_BY_AI' | 'OVERRIDDEN';
}

export interface MultiHorizonSettings {
  horizon: '24h' | '7d' | '30d';
  corridor: string;
  weights: {
    trainDelayMinimization: number;
    assetRiskUrgency: number;
    multiDeptClubbing: number;
    crewMachineAvailability: number;
  };
  nightWindowPreferred: boolean;
  freightPriorityBuffer: boolean;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  user: string;
  role: string;
  action: string;
  details: string;
  category: 'BLOCK_APPROVAL' | 'SAFETY_RULE_CHANGE' | 'MANUAL_OVERRIDE' | 'EMERGENCY_DISCONNECTION';
  impactLevel: 'LOW' | 'MEDIUM' | 'HIGH';
}
