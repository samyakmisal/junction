import React from 'react';
import { FixedAsset, MaintenanceBlock, TrainEntity, BlockConflict } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { 
  Activity, 
  Layers, 
  AlertOctagon, 
  CalendarClock, 
  Train, 
  Zap, 
  Radio, 
  Clock, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { NavTab } from '../common/Sidebar';

interface OperationsDashboardProps {
  assets: FixedAsset[];
  blocks: MaintenanceBlock[];
  trains: TrainEntity[];
  conflicts: BlockConflict[];
  onNavigate: (tab: NavTab) => void;
  onSelectAsset?: (asset: FixedAsset) => void;
  onRunOptimization: () => void;
}

export const OperationsDashboard: React.FC<OperationsDashboardProps> = ({
  assets,
  blocks,
  trains,
  conflicts,
  onNavigate,
  onSelectAsset,
  onRunOptimization
}) => {
  const criticalAssets = assets.filter(a => a.status === 'CRITICAL' || a.status === 'WARNING');
  const activeBlocks = blocks.filter(b => b.status === 'ACTIVE' || b.status === 'APPROVED');
  const pendingAiBlocks = blocks.filter(b => b.status === 'AI_RECOMMENDED' || b.status === 'REQUESTED');

  return (
    <div className="space-y-6 select-none font-mono">
      {/* Top Banner / Welcome Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between bg-[#161d16] border border-[#3d4a3d] p-4 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-primary font-headline font-bold text-xl tracking-tight">
              MISSION CONTROL // OPERATIONS DESK
            </span>
            <span className="bg-primary/20 text-primary border border-primary/40 text-[10px] px-2 py-0.5 font-bold">
              WESTERN RAILWAY MAIN CORRIDOR
            </span>
          </div>
          <p className="text-xs text-on-surface-variant mt-0.5">
            Integrated Data Fusion from Track Management System (TMS), TDMS / SCADA, SMMS, & Control Office (COA).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onRunOptimization}
            className="px-4 py-2 bg-primary hover:bg-primary-fixed text-[#003915] text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-md active:scale-95"
          >
            <Sparkles className="w-4 h-4" />
            <span>RUN AI MULTI-HORIZON OPTIMIZER</span>
          </button>
          <button
            onClick={() => onNavigate('map')}
            className="px-3 py-2 bg-[#242c24] hover:bg-[#2f372e] border border-[#3d4a3d] text-on-surface text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Train className="w-4 h-4 text-primary" />
            <span>LIVE MAP</span>
          </button>
        </div>
      </div>

      {/* Hero KPIs Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Total Assets */}
        <div className="bg-[#161d16] border border-[#3d4a3d] p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[10px] text-on-surface-variant font-bold">
            <span>TOTAL ASSETS</span>
            <Layers className="w-3.5 h-3.5 text-primary" />
          </div>
          <div className="text-2xl font-headline font-bold text-on-surface text-right mt-2">
            12,482
          </div>
          <div className="text-[9px] text-[#4be277] flex items-center justify-end gap-1 mt-1">
            <span>98.4% Operational</span>
          </div>
        </div>

        {/* Critical Alerts */}
        <div className="bg-[#161d16] border border-[#ef4444]/60 status-bar-blk p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[10px] text-[#ef4444] font-bold">
            <span>CRITICAL ALERTS</span>
            <AlertOctagon className="w-3.5 h-3.5 text-[#ef4444]" />
          </div>
          <div className="text-2xl font-headline font-bold text-[#ef4444] text-right mt-2">
            {criticalAssets.length}
          </div>
          <div className="text-[9px] text-on-surface-variant text-right mt-1">
            Immediate Block Req: 2
          </div>
        </div>

        {/* Active Blocks */}
        <div className="bg-[#161d16] border border-[#3d4a3d] status-bar-wng p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[10px] text-on-surface-variant font-bold">
            <span>ACTIVE BLOCKS</span>
            <CalendarClock className="w-3.5 h-3.5 text-[#f97316]" />
          </div>
          <div className="text-2xl font-headline font-bold text-on-surface text-right mt-2">
            06
          </div>
          <div className="text-[9px] text-[#f97316] text-right mt-1">
            1 Shadow Clubbed
          </div>
        </div>

        {/* Live Trains in Transit */}
        <div className="bg-[#161d16] border border-[#3d4a3d] status-bar-opr p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[10px] text-on-surface-variant font-bold">
            <span>TRAINS IN TRANSIT</span>
            <Train className="w-3.5 h-3.5 text-primary" />
          </div>
          <div className="text-2xl font-headline font-bold text-primary text-right mt-2">
            184
          </div>
          <div className="text-[9px] text-[#4be277] text-right mt-1">
            Punctuality: 96.8%
          </div>
        </div>

        {/* Network Conflicts */}
        <div className="bg-[#161d16] border border-[#3d4a3d] p-3.5 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[10px] text-on-surface-variant font-bold">
            <span>BLOCK CONFLICTS</span>
            <AlertTriangle className="w-3.5 h-3.5 text-[#f97316]" />
          </div>
          <div className="text-2xl font-headline font-bold text-[#f97316] text-right mt-2">
            03
          </div>
          <div className="text-[9px] text-[#9db2ff] text-right mt-1">
            2 Auto-Resolvable
          </div>
        </div>

        {/* Delay Minutes Saved by AI */}
        <div className="bg-[#161d16] border border-primary/50 p-3.5 flex flex-col justify-between bg-gradient-to-br from-[#161d16] to-[#153ea3]/20">
          <div className="flex items-center justify-between text-[10px] text-primary font-bold">
            <span>AI DELAY SAVINGS</span>
            <TrendingUp className="w-3.5 h-3.5 text-primary" />
          </div>
          <div className="text-2xl font-headline font-bold text-primary text-right mt-2">
            54 min
          </div>
          <div className="text-[9px] text-on-surface-variant text-right mt-1">
            +3.5h Corridor Window
          </div>
        </div>
      </div>

      {/* Main Grid: Left 8 Cols (Schematic & Alerts) / Right 4 Cols (Multi-Dept Breakdown & Feed) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Live Network Schematic Radar Card */}
          <div className="bg-[#1E293B] border border-[#334155] p-4 relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-[#334155] pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs text-primary bg-[#0F172A] border border-primary px-2 py-0.5">
                  LIVE_CORRIDOR_OVERVIEW
                </span>
                <span className="text-xs text-on-surface-variant">
                  SECTOR: DAHANU (KM 100) ➔ SURAT (KM 160)
                </span>
              </div>
              <button
                onClick={() => onNavigate('map')}
                className="text-[11px] text-[#9db2ff] hover:text-primary flex items-center gap-1 cursor-pointer"
              >
                <span>OPEN FULL SCHEMATIC</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Interactive Track Schematic Visualizer */}
            <div className="relative h-44 bg-[#0F172A] border border-[#334155] p-4 flex flex-col justify-center overflow-hidden">
              {/* Grid Background */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(51,65,85,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(51,65,85,0.2)_1px,transparent_1px)] bg-[size:30px_30px]"></div>

              {/* Stations Markers */}
              <div className="absolute top-2 left-6 text-[10px] text-on-surface-variant font-bold">
                SANJAN [KM 104]
              </div>
              <div className="absolute top-2 left-[30%] text-[10px] text-on-surface-variant font-bold">
                BHILAD [KM 112]
              </div>
              <div className="absolute top-2 left-[50%] text-[10px] text-primary font-bold">
                VAPI [KM 125]
              </div>
              <div className="absolute top-2 left-[70%] text-[10px] text-on-surface-variant font-bold">
                UDVADA [KM 131]
              </div>
              <div className="absolute top-2 right-6 text-[10px] text-on-surface-variant font-bold">
                VALSAD [KM 145]
              </div>

              {/* Station vertical ticks */}
              <div className="absolute top-6 bottom-6 left-12 w-[1px] bg-[#334155]"></div>
              <div className="absolute top-6 bottom-6 left-[32%] w-[1px] bg-[#334155]"></div>
              <div className="absolute top-6 bottom-6 left-[52%] w-[1px] bg-primary/40"></div>
              <div className="absolute top-6 bottom-6 left-[72%] w-[1px] bg-[#334155]"></div>
              <div className="absolute top-6 bottom-6 right-12 w-[1px] bg-[#334155]"></div>

              {/* UP Line */}
              <div className="relative z-10 my-2">
                <div className="text-[9px] text-on-surface-variant mb-1 flex items-center justify-between">
                  <span>UP MAIN LINE (Towards New Delhi)</span>
                  <span className="text-primary text-[8px] font-bold">130 KM/H MAX</span>
                </div>
                <div className="h-2 w-full bg-[#1E293B] border border-[#334155] relative flex items-center">
                  {/* Active Shadow Block Highlight */}
                  <div 
                    className="absolute left-[48%] w-[26%] h-full hazard-stripe border-x border-[#f97316] flex items-center justify-center cursor-pointer group"
                    title="Active Multi-Department Possession (KM 126 to 128.5)"
                    onClick={() => onNavigate('planner')}
                  >
                    <span className="text-[8px] font-bold bg-[#0F172A]/90 px-1 border border-[#f97316] text-[#f97316]">
                      BLK-SHADOW-1042 [02:00–03:30]
                    </span>
                  </div>

                  {/* Moving Train: Vande Bharat 20901 */}
                  <div 
                    className="absolute left-[24%] -top-3.5 z-20 flex flex-col items-center cursor-pointer group"
                    title="Vande Bharat Express (20901) - 130 km/h"
                    onClick={() => onNavigate('trains')}
                  >
                    <span className="text-[8px] text-[#4be277] bg-[#0F172A] px-1 border border-primary font-bold">
                      VB-20901 [130km/h]
                    </span>
                    <div className="w-3.5 h-3.5 bg-primary border border-white rotate-45 mt-0.5 animate-pulse"></div>
                  </div>

                  {/* Moving Train: Rajdhani 12951 */}
                  <div 
                    className="absolute left-[44%] -top-3.5 z-20 flex flex-col items-center cursor-pointer group"
                    title="Rajdhani Express (12951) - 125 km/h"
                    onClick={() => onNavigate('trains')}
                  >
                    <span className="text-[8px] text-[#9db2ff] bg-[#0F172A] px-1 border border-[#3b82f6] font-bold">
                      RAJ-12951 [125km/h]
                    </span>
                    <div className="w-3.5 h-3.5 bg-[#3b82f6] border border-white rotate-45 mt-0.5"></div>
                  </div>
                </div>
              </div>

              {/* DN Line */}
              <div className="relative z-10 my-2">
                <div className="text-[9px] text-on-surface-variant mb-1 flex items-center justify-between">
                  <span>DN MAIN LINE (Towards Mumbai Central)</span>
                  <span className="text-on-surface-variant text-[8px]">110 KM/H MAX</span>
                </div>
                <div className="h-2 w-full bg-[#1E293B] border border-[#334155] relative flex items-center">
                  {/* Freight Train: BOXN 88201 */}
                  <div 
                    className="absolute right-[28%] -top-3.5 z-20 flex flex-col items-center cursor-pointer group"
                    title="BOXN Coal Freight 88201 - 72 km/h"
                    onClick={() => onNavigate('trains')}
                  >
                    <span className="text-[8px] text-[#f97316] bg-[#0F172A] px-1 border border-[#f97316] font-bold">
                      BOXN-88201 [72km/h]
                    </span>
                    <div className="w-3.5 h-3.5 bg-[#f97316] border border-white mt-0.5"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Critical Alerts Triage & AI Action Matrix */}
          <div className="bg-[#161d16] border border-[#3d4a3d] p-4">
            <div className="flex items-center justify-between border-b border-[#3d4a3d] pb-3 mb-3">
              <div className="flex items-center gap-2">
                <AlertOctagon className="w-4 h-4 text-[#ef4444]" />
                <span className="font-bold text-xs uppercase text-on-surface">
                  CRITICAL ASSET ALERTS & AI POSSESSION RECOMMENDATIONS
                </span>
              </div>
              <span className="text-[10px] text-on-surface-variant">
                Showing {criticalAssets.length} actionable items
              </span>
            </div>

            <div className="space-y-2.5">
              {criticalAssets.map(asset => (
                <div 
                  key={asset.id}
                  className="p-3 bg-[#1a221a] border border-[#3d4a3d] flex flex-col md:flex-row md:items-center justify-between gap-3 hover:border-primary/50 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <StatusBadge status={asset.status} />
                      <span className="font-bold text-xs text-on-surface">{asset.code}</span>
                      <span className="text-[10px] text-on-surface-variant">({asset.name})</span>
                      <span className="text-[9px] bg-[#242c24] text-[#9db2ff] px-1.5 py-0.2 border border-[#3d4a3d]">
                        {asset.department}
                      </span>
                    </div>
                    <div className="text-[11px] text-on-surface-variant flex items-center gap-3">
                      <span>Location: <strong className="text-on-surface">{asset.section} ({asset.kmMarker})</strong></span>
                      <span>Track: <strong className="text-primary">{asset.track}</strong></span>
                      <span>Risk: <strong className="text-[#ef4444]">{asset.failureRiskProbability}%</strong></span>
                      <span>Est. Duration: <strong className="text-on-surface">{asset.estimatedMaintenanceDurationMin} min</strong></span>
                    </div>
                    <p className="text-[10px] text-on-surface-variant/90 leading-tight">
                      <span className="text-primary font-bold">AI Diagnosis: </span>
                      {asset.xaiReasoning}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => {
                        if (onSelectAsset) onSelectAsset(asset);
                        onNavigate('assets');
                      }}
                      className="px-2.5 py-1.5 bg-[#242c24] hover:bg-[#2f372e] border border-[#3d4a3d] text-on-surface text-[10px] font-bold cursor-pointer"
                    >
                      VIEW XAI
                    </button>
                    <button
                      onClick={() => onNavigate('planner')}
                      className="px-3 py-1.5 bg-primary hover:bg-primary-fixed text-[#003915] text-[10px] font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <span>PLAN BLOCK</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Multi-Department Possession Breakdown */}
          <div className="bg-[#161d16] border border-[#3d4a3d] p-4">
            <div className="flex items-center justify-between border-b border-[#3d4a3d] pb-2 mb-3">
              <span className="text-xs font-bold text-on-surface uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-[#3b82f6]" /> MULTI-DEPT FUSION STATS
              </span>
              <span className="text-[9px] text-[#4be277] font-bold">CORRIDOR 24H</span>
            </div>

            <div className="space-y-3 text-xs">
              {/* Civil Track TMS */}
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-on-surface flex items-center gap-1">
                    <span className="w-2 h-2 bg-primary"></span> Civil Track (TMS)
                  </span>
                  <span className="text-on-surface-variant font-bold">17 due / 2 approved</span>
                </div>
                <div className="w-full bg-[#0e150e] h-1.5 border border-[#3d4a3d]">
                  <div className="bg-primary h-full" style={{ width: '65%' }}></div>
                </div>
              </div>

              {/* Electrical OHE TDMS */}
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-on-surface flex items-center gap-1">
                    <span className="w-2 h-2 bg-[#f97316]"></span> Electrical OHE (TDMS)
                  </span>
                  <span className="text-on-surface-variant font-bold">21 due / 1 approved</span>
                </div>
                <div className="w-full bg-[#0e150e] h-1.5 border border-[#3d4a3d]">
                  <div className="bg-[#f97316] h-full" style={{ width: '48%' }}></div>
                </div>
              </div>

              {/* Signal & Telecom SMMS */}
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-on-surface flex items-center gap-1">
                    <span className="w-2 h-2 bg-[#3b82f6]"></span> Signal & Telecom (SMMS)
                  </span>
                  <span className="text-on-surface-variant font-bold">14 due / 1 approved</span>
                </div>
                <div className="w-full bg-[#0e150e] h-1.5 border border-[#3d4a3d]">
                  <div className="bg-[#3b82f6] h-full" style={{ width: '80%' }}></div>
                </div>
              </div>

              {/* Shadow Block Efficiency Badge */}
              <div className="mt-3 p-2.5 bg-[#1a221a] border border-primary/40 text-[10px] space-y-1">
                <div className="flex justify-between items-center text-primary font-bold">
                  <span>SHADOW CLUBBING EFFICIENCY</span>
                  <span>91.2%</span>
                </div>
                <p className="text-on-surface-variant text-[9px] leading-tight">
                  3 departments synchronized into 1 possession window, eliminating redundant track downtime.
                </p>
              </div>
            </div>
          </div>

          {/* Real-Time Live Activity & Telemetry Feed */}
          <div className="bg-[#161d16] border border-[#3d4a3d] p-4">
            <div className="flex items-center justify-between border-b border-[#3d4a3d] pb-2 mb-3">
              <span className="text-xs font-bold text-on-surface uppercase tracking-wider flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-primary" /> LIVE EVENT LOG STREAM
              </span>
              <span className="text-[9px] bg-primary/20 text-primary px-1 font-bold">REALTIME</span>
            </div>

            <div className="space-y-2.5 text-[11px] max-h-[300px] overflow-y-auto pr-1">
              <div className="p-2 bg-[#1a221a] border-l-2 border-primary">
                <div className="flex justify-between text-[9px] text-on-surface-variant mb-0.5">
                  <span className="font-bold text-primary">AI OPTIMIZATION ENGINE</span>
                  <span>02:51:14</span>
                </div>
                <p className="text-on-surface text-[10px]">
                  Generated Shadow Block Proposal for KM 126–128 (Civil + OHE + S&T).
                </p>
              </div>

              <div className="p-2 bg-[#1a221a] border-l-2 border-[#3b82f6]">
                <div className="flex justify-between text-[9px] text-on-surface-variant mb-0.5">
                  <span className="font-bold text-[#9db2ff]">COA DISPATCH</span>
                  <span>02:45:00</span>
                </div>
                <p className="text-on-surface text-[10px]">
                  Train 20901 Vande Bharat Express crossed Dahanu on-time (130 km/h).
                </p>
              </div>

              <div className="p-2 bg-[#1a221a] border-l-2 border-[#f97316]">
                <div className="flex justify-between text-[9px] text-on-surface-variant mb-0.5">
                  <span className="font-bold text-[#f97316]">SCADA SUBSTATION</span>
                  <span>02:38:20</span>
                </div>
                <p className="text-on-surface text-[10px]">
                  Feeder #42 thermal sensor delta +18.4°C threshold warning triggered.
                </p>
              </div>

              <div className="p-2 bg-[#1a221a] border-l-2 border-primary">
                <div className="flex justify-between text-[9px] text-on-surface-variant mb-0.5">
                  <span className="font-bold text-primary">TMS TELEMETRY</span>
                  <span>02:22:10</span>
                </div>
                <p className="text-on-surface text-[10px]">
                  TRC car run data uploaded for Valsad-Dungri DN line (TGI: 89.4).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
