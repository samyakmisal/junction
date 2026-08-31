import React, { useState } from 'react';
import { TrainEntity, MaintenanceBlock } from '../../types';
import { simulateWhatIfScenario } from '../../services/aiOptimizer';
import { StatusBadge } from '../common/StatusBadge';
import { 
  Flame, 
  Play, 
  RotateCcw, 
  ShieldAlert, 
  Activity, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  TrendingUp, 
  AlertTriangle,
  Zap,
  Train
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface WhatIfSandboxProps {
  blocks: MaintenanceBlock[];
  trains: TrainEntity[];
  onApplySimulationResult: (impactedTrains: TrainEntity[], emergencyBlocks: MaintenanceBlock[]) => void;
}

export const WhatIfSandbox: React.FC<WhatIfSandboxProps> = ({
  blocks,
  trains,
  onApplySimulationResult
}) => {
  const [selectedScenario, setSelectedScenario] = useState<'RAIL_FRACTURE' | 'OHE_BREAKDOWN' | 'FREIGHT_SURGE'>('RAIL_FRACTURE');
  const [simResult, setSimResult] = useState<any>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => {
      const result = simulateWhatIfScenario(selectedScenario, blocks, trains);
      setSimResult(result);
      setIsSimulating(false);
      onApplySimulationResult(result.impactedTrains, result.emergencyBlocks);

      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#ef4444', '#f97316', '#4be277']
        });
      } catch (e) {}
    }, 700);
  };

  const handleReset = () => {
    setSimResult(null);
  };

  const scenarioCards = [
    {
      type: 'RAIL_FRACTURE' as const,
      title: 'Sudden Rail Fracture on UP Line',
      location: 'Vapi – Udvada (KM 127/4)',
      severity: 'CRITICAL',
      desc: 'USFD / OMS flags immediate track discontinuity on 60kg rail. Red signal aspect auto-triggered on Block 127.',
      icon: AlertTriangle,
      color: 'border-[#ef4444] text-[#ef4444]'
    },
    {
      type: 'OHE_BREAKDOWN' as const,
      title: '25kV Catenary Dropper Parting',
      location: 'Bhilad – Sanjan (KM 107/0)',
      severity: 'CRITICAL',
      desc: 'High tension contact wire sagging detected by SCADA. Requires instant power block & tower wagon isolation.',
      icon: Zap,
      color: 'border-[#f97316] text-[#f97316]'
    },
    {
      type: 'FREIGHT_SURGE' as const,
      title: 'Festive Coal & Container Surge (+40%)',
      location: 'Full Western Corridor',
      severity: 'MEDIUM',
      desc: 'Inflow of 8 additional goods rakes (BOXN & BTPN). Tests dynamic platooning and nighttime headway compression.',
      icon: Train,
      color: 'border-[#3b82f6] text-[#9db2ff]'
    }
  ];

  return (
    <div className="space-y-6 select-none font-mono">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between bg-[#161d16] border border-[#3d4a3d] p-4 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-primary font-headline font-bold text-xl">
              WHAT-IF INCIDENT & DISRUPTION SANDBOX
            </span>
            <span className="bg-purple-900/30 text-purple-400 text-[10px] px-2 py-0.5 border border-purple-500/40 font-bold">
              DYNAMIC STRESS-TEST ENGINE
            </span>
          </div>
          <p className="text-xs text-on-surface-variant mt-0.5">
            Inject emergency asset breakdowns or demand surges to evaluate instant AI re-scheduling, single line working (SLW), and delay absorption.
          </p>
        </div>

        {simResult && (
          <button
            onClick={handleReset}
            className="px-3 py-2 bg-[#242c24] hover:bg-[#2f372e] border border-[#3d4a3d] text-on-surface text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-primary" />
            <span>RESET TO BASELINE</span>
          </button>
        )}
      </div>

      {/* Scenario Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {scenarioCards.map(sc => {
          const Icon = sc.icon;
          const isSelected = selectedScenario === sc.type;
          return (
            <button
              key={sc.type}
              type="button"
              onClick={() => {
                setSelectedScenario(sc.type);
                setSimResult(null);
              }}
              className={`p-4 text-left border transition-all flex flex-col justify-between ${
                isSelected
                  ? `bg-[#1a221a] ${sc.color} border-2 shadow-xl`
                  : 'bg-[#161d16] border-[#3d4a3d] text-on-surface-variant hover:bg-[#1a221a]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Icon className="w-5 h-5" />
                    <span className="font-bold text-xs text-on-surface">{sc.title}</span>
                  </div>
                  <span className="text-[9px] font-bold px-1.5 py-0.2 bg-[#242c24] text-on-surface">
                    {sc.severity}
                  </span>
                </div>
                <div className="text-[11px] text-primary mb-1">
                  Location: {sc.location}
                </div>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">
                  {sc.desc}
                </p>
              </div>

              <div className="mt-4 pt-2 border-t border-[#3d4a3d] flex items-center justify-between text-[10px]">
                <span className="text-on-surface-variant">Click to Select</span>
                {isSelected && <span className="text-primary font-bold">ACTIVE SCENARIO</span>}
              </div>
            </button>
          );
        })}
      </div>

      {/* Execute Simulation CTA */}
      <div className="bg-[#161d16] border border-[#3d4a3d] p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold text-on-surface">
            READY TO INJECT: {selectedScenario.replace('_', ' ')}
          </div>
          <div className="text-[11px] text-on-surface-variant">
            Simulates real-time sensor trigger, red signal lock, emergency block injection, and automated train diversion.
          </div>
        </div>

        <button
          onClick={handleRunSimulation}
          disabled={isSimulating}
          className="px-6 py-2.5 bg-primary hover:bg-primary-fixed text-[#003915] font-bold text-xs uppercase tracking-widest flex items-center gap-2 transition-transform active:scale-95 shadow-md cursor-pointer disabled:opacity-50"
        >
          <Play className="w-4 h-4" />
          <span>{isSimulating ? 'SIMULATING DYNAMICS...' : 'EXECUTE WHAT-IF SIMULATION'}</span>
        </button>
      </div>

      {/* Simulation Results Display */}
      {simResult && (
        <div className="bg-[#161d16] border-2 border-primary p-6 space-y-6 animate-fadeIn">
          {/* Top Result Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#3d4a3d] pb-3 gap-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="font-headline font-bold text-lg text-primary">
                SIMULATION RESULTS: AI MITIGATION & DIVERSION STRATEGY
              </span>
            </div>
            <div className="text-xs text-on-surface-variant">
              Total Ripple Delay: <strong className="text-[#f97316]">+{simResult.totalAddedDelayMin} min</strong> (Absorbed)
            </div>
          </div>

          {/* Emergency Block Injected */}
          {simResult.emergencyBlocks.length > 0 && (
            <div className="space-y-2">
              <div className="text-xs font-bold text-on-surface uppercase">
                EMERGENCY POSSESSION AUTOMATICALLY DISPATCHED:
              </div>
              {simResult.emergencyBlocks.map((blk: any) => (
                <div key={blk.id} className="p-3 bg-[#0e150e] border border-[#ef4444] space-y-1">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-[#ef4444] font-bold">{blk.blockCode}</span>
                    <span className="text-primary font-bold">Slot: {blk.aiOptimalStartTime} – {blk.aiOptimalEndTime} ({blk.durationMinutes} min)</span>
                  </div>
                  <div className="text-xs text-on-surface font-semibold">{blk.title}</div>
                  <div className="text-[11px] text-on-surface-variant">{blk.description}</div>
                </div>
              ))}
            </div>
          )}

          {/* Recommended Diversion Plan */}
          <div className="p-4 bg-[#1a221a] border border-primary/50 text-xs space-y-2">
            <div className="text-primary font-bold uppercase flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              AUTOMATED CORRIDOR DIVERSION PLAN:
            </div>
            <p className="text-on-surface leading-relaxed text-sm">
              {simResult.recommendedDiversionPlan}
            </p>
          </div>

          {/* XAI Rationale */}
          <div className="p-3 bg-[#0e150e] border border-[#3d4a3d] text-xs space-y-1">
            <span className="text-on-surface-variant font-bold uppercase text-[10px]">
              XAI RATIONALE & OPERATIONAL TRADE-OFF:
            </span>
            <p className="text-on-surface">{simResult.xaiMitigationRationale}</p>
          </div>

          {/* Impacted Trains Table */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-on-surface uppercase">
              UPDATED TRAIN DISPATCH STATUS POST-INCIDENT:
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#1E293B] text-on-surface-variant text-[10px] uppercase font-bold">
                    <th className="py-2 px-3">TRAIN NO.</th>
                    <th className="py-2 px-3">NAME</th>
                    <th className="py-2 px-3">SPEED</th>
                    <th className="py-2 px-3">DELAY</th>
                    <th className="py-2 px-3">DIVERSION STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#242c24]">
                  {simResult.impactedTrains.map((tr: any) => (
                    <tr key={tr.id} className="hover:bg-[#242c24]">
                      <td className="py-2 px-3 font-bold text-primary">{tr.trainNumber}</td>
                      <td className="py-2 px-3 text-on-surface">{tr.trainName}</td>
                      <td className="py-2 px-3 text-on-surface">{tr.speedKmH} km/h</td>
                      <td className="py-2 px-3 font-bold">
                        <span className={tr.delayMinutes > 0 ? 'text-[#f97316]' : 'text-primary'}>
                          +{tr.delayMinutes} min
                        </span>
                      </td>
                      <td className="py-2 px-3 text-[11px]">
                        {tr.diverted ? (
                          <span className="text-[#f97316] font-bold">Diverted via Down Line</span>
                        ) : (
                          <span className="text-primary">Normal Path</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
