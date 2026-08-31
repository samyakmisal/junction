import React, { useState } from 'react';
import { BlockConflict } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Clock, 
  Zap, 
  Layers, 
  ShieldAlert,
  HelpCircle,
  TrendingDown
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ConflictCenterProps {
  conflicts: BlockConflict[];
  onResolveConflict?: (conflictId: string) => void;
}

export const ConflictCenter: React.FC<ConflictCenterProps> = ({
  conflicts: initialConflicts,
  onResolveConflict
}) => {
  const [conflicts, setConflicts] = useState<BlockConflict[]>(initialConflicts);

  const handleResolve = (conflictId: string) => {
    setConflicts(prev => prev.map(c => {
      if (c.id === conflictId) {
        return {
          ...c,
          status: 'RESOLVED_BY_AI'
        };
      }
      return c;
    }));
    if (onResolveConflict) onResolveConflict(conflictId);

    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#4be277', '#3b82f6', '#ffffff']
      });
    } catch (e) {}
  };

  return (
    <div className="space-y-6 select-none font-mono">
      {/* Top Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between bg-[#161d16] border border-[#3d4a3d] p-4 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-primary font-headline font-bold text-xl">
              POSSESSION CONFLICT RESOLUTION CENTER
            </span>
            <span className="bg-[#ef4444]/20 text-[#ef4444] text-[10px] px-2 py-0.5 border border-[#ef4444]/40 font-bold">
              MULTI-DEPARTMENT DE-CONFLICTING
            </span>
          </div>
          <p className="text-xs text-on-surface-variant mt-0.5">
            Automated detection of overlapping multi-department possessions, goods rakes clashes, and peak commuter hour violations.
          </p>
        </div>

        {/* Resolved Counter */}
        <div className="flex items-center gap-4 bg-[#0e150e] border border-[#3d4a3d] p-3 text-xs">
          <div>
            <div className="text-[10px] text-on-surface-variant font-bold">CONFLICT RESOLUTION RATE</div>
            <div className="text-xl font-bold text-primary">
              {Math.round((conflicts.filter(c => c.status === 'RESOLVED_BY_AI').length / conflicts.length) * 100)}%
            </div>
          </div>
          <div className="text-[9px] text-[#4be277] flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> 2 of 3 Resolved
          </div>
        </div>
      </div>

      {/* Conflicts List */}
      <div className="space-y-4">
        {conflicts.map(conflict => (
          <div
            key={conflict.id}
            className={`bg-[#161d16] border p-5 space-y-4 transition-all ${
              conflict.status === 'RESOLVED_BY_AI'
                ? 'border-primary/60 bg-[#161d16]/90'
                : 'border-[#ef4444]/70 shadow-lg'
            }`}
          >
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#3d4a3d] pb-3 gap-2">
              <div className="flex items-center gap-2">
                <StatusBadge status={conflict.status} />
                <span className="text-xs font-bold text-[#f97316]">{conflict.id}</span>
                <span className="text-sm font-bold text-on-surface">{conflict.title}</span>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-on-surface-variant">SEVERITY:</span>
                <strong className={conflict.severity === 'CRITICAL' ? 'text-[#ef4444]' : 'text-[#f97316]'}>
                  {conflict.severity}
                </strong>
              </div>
            </div>

            {/* Description & Impact */}
            <p className="text-xs text-on-surface leading-relaxed">
              {conflict.description}
            </p>

            {/* Side-by-Side Comparison: Before AI vs After AI Optimization */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* Uncoordinated Status (Before AI) */}
              <div className="bg-[#0e150e] border border-[#ef4444]/40 p-3 space-y-2">
                <div className="text-[10px] text-[#ef4444] font-bold uppercase flex items-center justify-between">
                  <span>UNCOORDINATED MANUAL REQUEST (BEFORE AI)</span>
                  <span className="bg-[#93000a] text-white px-1">BOTTLENECK</span>
                </div>
                <div className="space-y-1 text-[11px] text-on-surface-variant">
                  <div className="flex justify-between">
                    <span>Corridor Shutdown:</span>
                    <strong className="text-[#ef4444]">4.5 hours (Fragmented)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Passenger Delay:</span>
                    <strong className="text-[#ef4444]">45 min ripple delay</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Trains Detained:</span>
                    <strong className="text-[#ef4444]">6 Train Movements</strong>
                  </div>
                </div>
              </div>

              {/* AI Optimized Resolution (After AI) */}
              <div className="bg-[#0e150e] border border-primary p-3 space-y-2">
                <div className="text-[10px] text-primary font-bold uppercase flex items-center justify-between">
                  <span>JUNCTION AI DE-CONFLICTED WINDOW (AFTER AI)</span>
                  <span className="bg-primary text-[#003915] px-1 font-bold">OPTIMIZED</span>
                </div>
                <div className="space-y-1 text-[11px]">
                  <div className="flex justify-between">
                    <span>Synchronized Window:</span>
                    <strong className="text-primary">02:00 – 03:30 (90 min total)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Passenger Delay:</span>
                    <strong className="text-primary">0 min (Zero impact)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Corridor Capacity Saved:</span>
                    <strong className="text-[#9db2ff]">+{conflict.aiDelaySavingsMinutes} min freed</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Recommendation Strategy */}
            <div className="p-3 bg-[#1a221a] border border-primary/40 text-xs flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <div>
                <span className="text-primary font-bold">AI Resolution Strategy: </span>
                <span className="text-on-surface">{conflict.aiSuggestedSolution}</span>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between pt-2 border-t border-[#3d4a3d]">
              <span className="text-[10px] text-on-surface-variant">
                Location: <strong className="text-on-surface">{conflict.section}</strong> • Window: <strong className="text-primary">{conflict.timeWindow}</strong>
              </span>

              {conflict.status !== 'RESOLVED_BY_AI' ? (
                <button
                  onClick={() => handleResolve(conflict.id)}
                  className="px-4 py-2 bg-primary hover:bg-primary-fixed text-[#003915] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-md active:scale-95"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>APPLY AI RESOLUTION</span>
                </button>
              ) : (
                <span className="text-primary font-bold text-xs flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  Resolution Applied & Synced with COA
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
