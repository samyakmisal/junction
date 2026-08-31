import React, { useState } from 'react';
import { MaintenanceBlock, FixedAsset, TrainEntity, MultiHorizonSettings } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { XaiCard } from '../common/XaiCard';
import { runAiBlockOptimization } from '../../services/aiOptimizer';
import confetti from 'canvas-confetti';
import { 
  CalendarClock, 
  Sparkles, 
  CheckCircle2, 
  Sliders, 
  Layers, 
  Train, 
  Clock, 
  ShieldCheck, 
  AlertTriangle, 
  Maximize2,
  TrendingDown,
  Zap,
  Radio,
  FileCheck,
  XCircle,
  Edit3
} from 'lucide-react';

interface AiBlockPlannerProps {
  blocks: MaintenanceBlock[];
  assets: FixedAsset[];
  trains: TrainEntity[];
  onUpdateBlock: (updatedBlock: MaintenanceBlock) => void;
}

export const AiBlockPlanner: React.FC<AiBlockPlannerProps> = ({
  blocks: initialBlocks,
  assets,
  trains,
  onUpdateBlock
}) => {
  const [blocks, setBlocks] = useState<MaintenanceBlock[]>(initialBlocks);
  const [horizon, setHorizon] = useState<'24h' | '7d' | '30d'>('24h');
  const [corridor, setCorridor] = useState<string>('Vapi – Udvada (KM 125–135)');
  
  // Objective Function Weights
  const [delayWeight, setDelayWeight] = useState<number>(40);
  const [assetRiskWeight, setAssetRiskWeight] = useState<number>(30);
  const [shadowClubWeight, setShadowClubWeight] = useState<number>(20);
  const [crewAvailWeight, setCrewAvailWeight] = useState<number>(10);

  const [isOptimizing, setIsOptimizing] = useState<boolean>(false);
  const [optimizationSuccess, setOptimizationSuccess] = useState<boolean>(false);
  const [editingBlock, setEditingBlock] = useState<MaintenanceBlock | null>(null);
  const [editStartTime, setEditStartTime] = useState<string>('02:00');
  const [editEndTime, setEditEndTime] = useState<string>('03:30');

  // Trigger AI Multi-Horizon Optimization
  const handleExecuteOptimization = () => {
    setIsOptimizing(true);
    setTimeout(() => {
      const settings: MultiHorizonSettings = {
        horizon,
        corridor,
        weights: {
          trainDelayMinimization: delayWeight / 100,
          assetRiskUrgency: assetRiskWeight / 100,
          multiDeptClubbing: shadowClubWeight / 100,
          crewMachineAvailability: crewAvailWeight / 100
        },
        nightWindowPreferred: true,
        freightPriorityBuffer: true
      };

      const result = runAiBlockOptimization(blocks, assets, trains, settings);
      setBlocks(result.optimizedBlocks);
      setIsOptimizing(false);
      setOptimizationSuccess(true);

      // Trigger Confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#4be277', '#22c55e', '#3b82f6', '#ffffff']
        });
      } catch (e) {
        // Fallback if canvas confetti isn't ready
      }
    }, 900);
  };

  // Controller Approval Action
  const handleApproveBlock = (blockId: string) => {
    const updated = blocks.map(b => {
      if (b.id === blockId) {
        const approved: MaintenanceBlock = {
          ...b,
          status: 'APPROVED',
          approvalHistory: {
            approvedBy: 'Samyak Misal (Chief Controller)',
            approvedAt: new Date().toLocaleTimeString(),
            notes: 'Approved via Junction AI Optimization Engine.'
          }
        };
        onUpdateBlock(approved);
        return approved;
      }
      return b;
    });
    setBlocks(updated);
  };

  // Controller Reject Action
  const handleRejectBlock = (blockId: string) => {
    const updated = blocks.map(b => {
      if (b.id === blockId) {
        const rejected: MaintenanceBlock = {
          ...b,
          status: 'REJECTED',
          approvalHistory: {
            notes: 'Rejected by Controller: Peak goods freight rakes given clearance.'
          }
        };
        onUpdateBlock(rejected);
        return rejected;
      }
      return b;
    });
    setBlocks(updated);
  };

  // Save Manual Window Edit
  const handleSaveEdit = () => {
    if (!editingBlock) return;
    const updated = blocks.map(b => {
      if (b.id === editingBlock.id) {
        const mod: MaintenanceBlock = {
          ...b,
          aiOptimalStartTime: editStartTime,
          aiOptimalEndTime: editEndTime,
          status: 'MODIFIED',
          approvalHistory: {
            approvedBy: 'Controller Manual Time Override',
            approvedAt: new Date().toLocaleTimeString(),
            notes: `Window adjusted to ${editStartTime}–${editEndTime}.`
          }
        };
        onUpdateBlock(mod);
        return mod;
      }
      return b;
    });
    setBlocks(updated);
    setEditingBlock(null);
  };

  const timelineHours = ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00'];

  return (
    <div className="space-y-6 select-none font-mono">
      {/* Top Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between bg-[#161d16] border border-[#3d4a3d] p-4 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-primary font-headline font-bold text-xl">
              AI MULTI-HORIZON BLOCK OPTIMIZATION ENGINE
            </span>
            <span className="bg-[#153ea3] text-[#9db2ff] text-[10px] px-2 py-0.5 font-bold">
              MILP / OR-TOOLS
            </span>
          </div>
          <p className="text-xs text-on-surface-variant mt-0.5">
            Automated conflict resolution, shadow block clustering, and passenger train punctuality preservation.
          </p>
        </div>

        {/* Horizon Tabs */}
        <div className="flex items-center gap-1 bg-[#091009] border border-[#3d4a3d] p-1 text-xs">
          <button
            onClick={() => setHorizon('24h')}
            className={`px-3 py-1.5 font-bold cursor-pointer transition-colors ${
              horizon === '24h' ? 'bg-primary text-[#003915]' : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            24H DYNAMIC
          </button>
          <button
            onClick={() => setHorizon('7d')}
            className={`px-3 py-1.5 font-bold cursor-pointer transition-colors ${
              horizon === '7d' ? 'bg-primary text-[#003915]' : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            7-DAY TACTICAL
          </button>
          <button
            onClick={() => setHorizon('30d')}
            className={`px-3 py-1.5 font-bold cursor-pointer transition-colors ${
              horizon === '30d' ? 'bg-primary text-[#003915]' : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            30-DAY STRATEGIC
          </button>
        </div>
      </div>

      {/* Main Layout Grid: Left 4 cols (Parameters & Weights) / Right 8 cols (Gantt & Recommendation Cards) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left Column: 3-Step Configuration & Objective Function Tuning (4 cols) */}
        <div className="xl:col-span-4 space-y-4">
          <div className="bg-[#161d16] border border-[#3d4a3d] p-4">
            <div className="flex items-center gap-2 border-b border-[#3d4a3d] pb-2 mb-4">
              <Sliders className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold uppercase tracking-wider text-on-surface">
                1. OPTIMIZATION PARAMETERS
              </span>
            </div>

            <div className="space-y-4 text-xs">
              {/* Corridor Selector */}
              <div>
                <label className="block text-[10px] font-bold text-on-surface-variant uppercase mb-1">
                  TARGET RAILWAY CORRIDOR
                </label>
                <select
                  value={corridor}
                  onChange={(e) => setCorridor(e.target.value)}
                  className="w-full bg-[#0e150e] border border-[#3d4a3d] px-3 py-2 text-xs text-primary font-mono outline-none"
                >
                  <option value="Vapi – Udvada (KM 125–135)">Vapi – Udvada Sector (KM 125–135) [High Traffic]</option>
                  <option value="Valsad – Surat Main">Valsad – Surat Main Section (KM 140–180)</option>
                  <option value="Western Railway High-Density Main">Full Western Railway High-Density Corridor</option>
                </select>
              </div>

              {/* Multi-Department Clubbing Toggle */}
              <div className="p-3 bg-[#0e150e] border border-[#3d4a3d] flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-bold text-on-surface">SHADOW BLOCK CLUSTERING</div>
                  <div className="text-[9px] text-on-surface-variant">Auto-club Civil, OHE & S&T into shared windows</div>
                </div>
                <span className="text-primary font-bold text-[11px]">ENABLED</span>
              </div>

              {/* Objective Function Weights Sliders */}
              <div className="space-y-3 pt-2 border-t border-[#3d4a3d]">
                <div className="flex justify-between items-center text-[10px] font-bold text-on-surface-variant uppercase">
                  <span>MILP OBJECTIVE WEIGHTS</span>
                  <span className="text-primary">TOTAL: {delayWeight + assetRiskWeight + shadowClubWeight + crewAvailWeight}%</span>
                </div>

                {/* Train Delay Weight */}
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span>w₁: Train Delay Minimization</span>
                    <strong className="text-primary">{delayWeight}%</strong>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="70"
                    value={delayWeight}
                    onChange={(e) => setDelayWeight(Number(e.target.value))}
                    className="w-full accent-primary h-1 bg-[#242c24] cursor-pointer"
                  />
                </div>

                {/* Asset Risk Urgency */}
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span>w₂: Asset Failure Risk Urgency</span>
                    <strong className="text-[#f97316]">{assetRiskWeight}%</strong>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="60"
                    value={assetRiskWeight}
                    onChange={(e) => setAssetRiskWeight(Number(e.target.value))}
                    className="w-full accent-[#f97316] h-1 bg-[#242c24] cursor-pointer"
                  />
                </div>

                {/* Shadow Block Clubbing */}
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span>w₃: Multi-Dept Clubbing Priority</span>
                    <strong className="text-[#3b82f6]">{shadowClubWeight}%</strong>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="50"
                    value={shadowClubWeight}
                    onChange={(e) => setShadowClubWeight(Number(e.target.value))}
                    className="w-full accent-[#3b82f6] h-1 bg-[#242c24] cursor-pointer"
                  />
                </div>

                {/* Machine Depot Availability */}
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span>w₄: Machine/Crew Availability</span>
                    <strong className="text-on-surface">{crewAvailWeight}%</strong>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="30"
                    value={crewAvailWeight}
                    onChange={(e) => setCrewAvailWeight(Number(e.target.value))}
                    className="w-full accent-white h-1 bg-[#242c24] cursor-pointer"
                  />
                </div>
              </div>

              {/* Execution CTA Button */}
              <button
                onClick={handleExecuteOptimization}
                disabled={isOptimizing}
                className="w-full py-3 bg-primary hover:bg-primary-fixed text-[#003915] font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-transform active:scale-98 shadow-md cursor-pointer disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4" />
                <span>{isOptimizing ? 'COMPUTING MILP OPTIMIZATION...' : 'EXECUTE AI OPTIMIZER'}</span>
              </button>
            </div>
          </div>

          {/* AI Optimization Impact Summary Card */}
          <div className="bg-[#161d16] border border-primary/40 p-4">
            <div className="flex items-center gap-2 border-b border-[#3d4a3d] pb-2 mb-3">
              <TrendingDown className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold text-primary uppercase">
                AI OPTIMIZATION EFFICIENCY GAINS
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between p-2 bg-[#0e150e] border border-[#3d4a3d]">
                <span className="text-on-surface-variant">Train Delay Avoidance:</span>
                <span className="text-primary font-bold">54 min saved</span>
              </div>
              <div className="flex justify-between p-2 bg-[#0e150e] border border-[#3d4a3d]">
                <span className="text-on-surface-variant">Corridor Window Gained:</span>
                <span className="text-[#9db2ff] font-bold">+3.5 hours</span>
              </div>
              <div className="flex justify-between p-2 bg-[#0e150e] border border-[#3d4a3d]">
                <span className="text-on-surface-variant">Shadow Blocks Clubbed:</span>
                <span className="text-[#4be277] font-bold">3 Depts Synchronized</span>
              </div>
              <div className="flex justify-between p-2 bg-[#0e150e] border border-[#3d4a3d]">
                <span className="text-on-surface-variant">Tamping Machine ROI:</span>
                <span className="text-on-surface font-bold">92.4% utilization</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Gantt Timeline & AI Recommendations (8 cols) */}
        <div className="xl:col-span-8 space-y-6">
          {/* Interactive Gantt Multi-Horizon Timeline */}
          <div className="bg-[#1E293B] border border-[#334155] p-4">
            <div className="flex items-center justify-between border-b border-[#334155] pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="font-bold text-xs text-primary bg-[#0F172A] border border-primary px-2 py-0.5">
                  GANTT_TIMELINE_VISUALIZER
                </span>
                <span className="text-xs text-on-surface-variant">
                  COA TIMETABLES VS MULTI-DEPT BLOCK REQUESTS (00:00 ➔ 08:00)
                </span>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-on-surface-variant">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span>CURRENT TIME: 02:53</span>
              </div>
            </div>

            {/* Gantt Chart Matrix Canvas */}
            <div className="relative bg-[#0F172A] border border-[#334155] p-4 overflow-x-auto">
              {/* Time scale header */}
              <div className="grid grid-cols-8 border-b border-[#334155] pb-2 mb-4 text-[10px] text-on-surface-variant font-bold text-center">
                {timelineHours.map(hour => (
                  <div key={hour} className="border-l border-[#334155]">
                    {hour}
                  </div>
                ))}
              </div>

              {/* Current Time Green Line (at ~02:53 -> ~36% across 8h) */}
              <div 
                className="absolute top-8 bottom-2 w-[2px] bg-primary z-20 shadow-[0_0_8px_#22c55e]"
                style={{ left: '36.5%' }}
                title="Current Real-time: 02:53 IST"
              >
                <div className="absolute -top-3.5 -left-4 bg-primary text-[#003915] text-[8px] font-bold px-1">
                  NOW
                </div>
              </div>

              {/* Row 1: Vande Bharat Express (TRN-20901) */}
              <div className="relative my-2 py-1.5 flex items-center border-b border-[#1E293B]">
                <div className="w-40 text-[10px] font-bold text-[#4be277] shrink-0 truncate">
                  VB-20901 (SUPERFAST)
                </div>
                <div className="flex-1 relative h-5 bg-[#161d16] border border-[#334155]">
                  <div 
                    className="absolute top-0 bottom-0 bg-[#004b1e] border border-primary text-[8px] text-primary font-bold flex items-center justify-center px-1"
                    style={{ left: '30%', width: '10%' }}
                    title="Vande Bharat passing Vapi 02:25 to 02:50"
                  >
                    TRAIN PATH
                  </div>
                </div>
              </div>

              {/* Row 2: Rajdhani Express (TRN-12951) */}
              <div className="relative my-2 py-1.5 flex items-center border-b border-[#1E293B]">
                <div className="w-40 text-[10px] font-bold text-[#9db2ff] shrink-0 truncate">
                  RAJ-12951 (SUPERFAST)
                </div>
                <div className="flex-1 relative h-5 bg-[#161d16] border border-[#334155]">
                  <div 
                    className="absolute top-0 bottom-0 bg-[#153ea3] border border-[#3b82f6] text-[8px] text-white font-bold flex items-center justify-center px-1"
                    style={{ left: '38%', width: '10%' }}
                    title="Rajdhani passing Udvada 03:00 to 03:25"
                  >
                    TRAIN PATH
                  </div>
                </div>
              </div>

              {/* Row 3: BOXN Coal Freight (TRN-88201) */}
              <div className="relative my-2 py-1.5 flex items-center border-b border-[#1E293B]">
                <div className="w-40 text-[10px] font-bold text-[#fed7aa] shrink-0 truncate">
                  BOXN-88201 (COAL)
                </div>
                <div className="flex-1 relative h-5 bg-[#161d16] border border-[#334155]">
                  <div 
                    className="absolute top-0 bottom-0 bg-[#7c2d12] border border-[#f97316] text-[8px] text-[#fed7aa] font-bold flex items-center justify-center px-1"
                    style={{ left: '15%', width: '22%' }}
                    title="BOXN freight holding / transit"
                  >
                    FREIGHT PATH
                  </div>
                </div>
              </div>

              {/* Row 4: Civil Track TMS Possession Request */}
              <div className="relative my-2 py-1.5 flex items-center border-b border-[#1E293B]">
                <div className="w-40 text-[10px] text-on-surface-variant shrink-0 flex items-center gap-1">
                  <span className="w-2 h-2 bg-primary"></span> Civil Track Tamping
                </div>
                <div className="flex-1 relative h-5 bg-[#161d16] border border-[#334155]">
                  <div 
                    className="absolute top-0 bottom-0 bg-[#22c55e]/20 border border-primary text-[8px] text-primary font-bold flex items-center justify-center"
                    style={{ left: '18.7%', width: '37.5%' }}
                    title="Civil requested 01:30 to 04:30"
                  >
                    REQ: 01:30–04:30 (3h)
                  </div>
                </div>
              </div>

              {/* Row 5: Electrical OHE Request */}
              <div className="relative my-2 py-1.5 flex items-center border-b border-[#1E293B]">
                <div className="w-40 text-[10px] text-on-surface-variant shrink-0 flex items-center gap-1">
                  <span className="w-2 h-2 bg-[#f97316]"></span> OHE Jumper Repair
                </div>
                <div className="flex-1 relative h-5 bg-[#161d16] border border-[#334155]">
                  <div 
                    className="absolute top-0 bottom-0 bg-[#f97316]/20 border border-[#f97316] text-[8px] text-[#f97316] font-bold flex items-center justify-center"
                    style={{ left: '37.5%', width: '25%' }}
                    title="OHE requested 03:00 to 05:00"
                  >
                    REQ: 03:00–05:00 (2h)
                  </div>
                </div>
              </div>

              {/* Row 6: AI RECOMMENDED SHADOW BLOCK WINDOW */}
              <div className="relative my-2 py-2 flex items-center bg-[#161d16] border border-primary p-1">
                <div className="w-40 text-[10px] font-bold text-primary shrink-0 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-primary" />
                  <span>AI SHADOW WINDOW</span>
                </div>
                <div className="flex-1 relative h-7 bg-[#091009] border border-primary">
                  {/* The Optimized 02:00 to 03:30 Window (25% to 43.75%) */}
                  <div 
                    className="absolute top-0 bottom-0 bg-primary/30 border-2 border-primary text-[9px] text-primary font-extrabold flex items-center justify-center shadow-lg"
                    style={{ left: '25%', width: '18.75%' }}
                    title="AI Shadow Window: 02:00 to 03:30 (90 min) - 0 Train Delays!"
                  >
                    ★ OPTIMAL SLOT: 02:00–03:30 (90 MIN)
                  </div>
                </div>
              </div>
            </div>

            {/* Gantt Legend */}
            <div className="mt-3 flex items-center justify-between text-[10px] text-on-surface-variant">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1"><span className="w-2 h-2 bg-[#004b1e] border border-primary"></span> Superfast Path</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 bg-[#7c2d12] border border-[#f97316]"></span> Goods Path</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 bg-primary/30 border border-primary"></span> AI Clustered Slot</span>
              </div>
              <span className="text-primary font-bold">ZERO PASSENGER TRAIN DELAYS</span>
            </div>
          </div>

          {/* AI Recommended Block Cards & Approval Flow */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-on-surface flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-primary" />
                AI RECOMMENDED POSSESSION ACTIONS (CONTROLLER APPROVAL QUEUE)
              </span>
              <span className="text-[10px] text-on-surface-variant">
                Human-in-the-Loop Decision Matrix
              </span>
            </div>

            {blocks.map(block => (
              <div 
                key={block.id}
                className="bg-[#161d16] border border-[#3d4a3d] p-4 space-y-3 relative hover:border-primary/60 transition-colors"
              >
                {/* Card Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#3d4a3d] pb-2 gap-2">
                  <div className="flex items-center gap-2">
                    <StatusBadge status={block.status} />
                    <span className="font-bold text-xs text-primary">{block.blockCode}</span>
                    <span className="text-xs text-on-surface font-semibold">{block.title}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="text-on-surface-variant">CONFIDENCE:</span>
                    <strong className="text-primary">{block.aiConfidenceScore}%</strong>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs bg-[#0e150e] p-3 border border-[#3d4a3d]">
                  <div>
                    <span className="text-[10px] text-on-surface-variant uppercase block">SECTION & TRACK:</span>
                    <strong className="text-on-surface">{block.section} ({block.track} LINE)</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-on-surface-variant uppercase block">OPTIMAL TIME WINDOW:</span>
                    <strong className="text-primary">{block.aiOptimalStartTime} – {block.aiOptimalEndTime} ({block.durationMinutes} min)</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-on-surface-variant uppercase block">DEPARTMENTS INVOLVED:</span>
                    <strong className="text-[#9db2ff]">{block.departmentsInvolved.join(' + ')}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-on-surface-variant uppercase block">TRAIN IMPACT:</span>
                    <strong className="text-[#4be277]">{block.affectedTrainCount} Affected ({block.predictedDelayMinutes} min delay)</strong>
                  </div>
                </div>

                {/* Explainable AI Rationale */}
                <p className="text-xs text-on-surface bg-[#1a221a] p-2.5 border-l-2 border-primary">
                  <span className="text-primary font-bold">AI Decision Synthesis: </span>
                  {block.aiExplanation}
                </p>

                {/* Controller Action Buttons */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                  <div className="text-[10px] text-on-surface-variant">
                    {block.status === 'APPROVED' ? (
                      <span className="text-primary font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Approved by {block.approvalHistory.approvedBy} at {block.approvalHistory.approvedAt}
                      </span>
                    ) : block.status === 'REJECTED' ? (
                      <span className="text-[#ef4444] font-bold flex items-center gap-1">
                        <XCircle className="w-3.5 h-3.5" /> Block Request Rejected
                      </span>
                    ) : (
                      <span>Requires Operations Controller final endorsement</span>
                    )}
                  </div>

                  {block.status !== 'APPROVED' && block.status !== 'REJECTED' && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingBlock(block);
                          setEditStartTime(block.aiOptimalStartTime);
                          setEditEndTime(block.aiOptimalEndTime);
                        }}
                        className="px-3 py-1.5 bg-[#242c24] hover:bg-[#2f372e] border border-[#3d4a3d] text-on-surface text-xs font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5 text-[#3b82f6]" />
                        <span>MODIFY WINDOW</span>
                      </button>

                      <button
                        onClick={() => handleRejectBlock(block.id)}
                        className="px-3 py-1.5 bg-[#242c24] hover:bg-[#7c2d12] border border-[#ef4444]/40 text-[#ef4444] text-xs font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>REJECT</span>
                      </button>

                      <button
                        onClick={() => handleApproveBlock(block.id)}
                        className="px-4 py-1.5 bg-primary hover:bg-primary-fixed text-[#003915] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-md active:scale-95"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>APPROVE BLOCK</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modify Window Modal */}
      {editingBlock && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm select-none font-mono">
          <div className="bg-[#161d16] border-2 border-primary p-6 max-w-md w-full space-y-4 shadow-2xl">
            <div className="flex justify-between items-center border-b border-[#3d4a3d] pb-2">
              <span className="font-bold text-xs text-primary">EDIT POSSESSION WINDOW</span>
              <span className="text-[10px] text-on-surface-variant">{editingBlock.blockCode}</span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-[10px] font-bold text-on-surface-variant uppercase mb-1">START TIME</label>
                <input
                  type="text"
                  value={editStartTime}
                  onChange={(e) => setEditStartTime(e.target.value)}
                  className="w-full bg-[#0e150e] border border-[#3d4a3d] px-3 py-2 text-primary font-bold outline-none"
                  placeholder="HH:MM"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-on-surface-variant uppercase mb-1">END TIME</label>
                <input
                  type="text"
                  value={editEndTime}
                  onChange={(e) => setEditEndTime(e.target.value)}
                  className="w-full bg-[#0e150e] border border-[#3d4a3d] px-3 py-2 text-primary font-bold outline-none"
                  placeholder="HH:MM"
                />
              </div>

              <div className="p-2.5 bg-[#0e150e] border border-[#3d4a3d] text-[10px] text-on-surface-variant">
                Note: Shifting window beyond 03:30 will trigger 18 min detention on incoming Vande Bharat 20901.
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-[#3d4a3d]">
              <button
                onClick={() => setEditingBlock(null)}
                className="px-3 py-1.5 bg-[#242c24] text-on-surface text-xs font-bold cursor-pointer"
              >
                CANCEL
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-1.5 bg-primary text-[#003915] text-xs font-bold uppercase cursor-pointer"
              >
                CONFIRM OVERRIDE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
