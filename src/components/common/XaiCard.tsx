import React from 'react';
import { AssetXaiFeature } from '../../types';
import { Cpu, CheckCircle, AlertTriangle, HelpCircle } from 'lucide-react';

interface XaiCardProps {
  title?: string;
  confidenceScore: number;
  reasoning: string;
  features?: AssetXaiFeature[];
  ruleTriggered?: string;
  onApplyRecommendation?: () => void;
  actionLabel?: string;
}

export const XaiCard: React.FC<XaiCardProps> = ({
  title = 'EXPLAINABLE AI (XAI) DECISION MATRIX',
  confidenceScore,
  reasoning,
  features = [],
  ruleTriggered,
  onApplyRecommendation,
  actionLabel = 'APPLY AI OPTIMIZATION'
}) => {
  return (
    <div className="bg-[#1E293B]/80 border border-[#3b82f6]/60 backdrop-blur-md p-4 text-xs font-mono relative overflow-hidden">
      {/* Top HUD Header */}
      <div className="flex items-center justify-between border-b border-[#334155] pb-2 mb-3">
        <div className="flex items-center gap-2 text-[#9db2ff]">
          <Cpu className="w-4 h-4 text-[#3b82f6]" />
          <span className="font-bold tracking-widest uppercase">{title}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-on-surface-variant text-[11px]">CONFIDENCE:</span>
          <span className="text-primary font-bold">{confidenceScore}%</span>
        </div>
      </div>

      {/* Confidence Score Bar */}
      <div className="w-full bg-[#0F172A] h-1.5 mb-3 border border-[#334155] overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-[#3b82f6] to-primary transition-all duration-500"
          style={{ width: `${confidenceScore}%` }}
        ></div>
      </div>

      {/* Logic / Reasoning */}
      <div className="bg-[#0F172A]/70 p-2.5 border border-[#334155] mb-3 text-on-surface leading-relaxed">
        <div className="text-[10px] text-on-surface-variant font-bold mb-1 flex items-center gap-1">
          <HelpCircle className="w-3 h-3 text-[#3b82f6]" />
          AI SYNTHESIS & REASONING:
        </div>
        <p className="text-on-surface">{reasoning}</p>
      </div>

      {/* Feature Importance List (SHAP breakdown) */}
      {features.length > 0 && (
        <div className="space-y-2 mb-3">
          <div className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">
            FEATURE IMPORTANCE (SHAP VALUE CONTRIBUTION):
          </div>
          {features.map((feat, idx) => (
            <div key={idx} className="bg-[#161d16]/50 p-2 border border-[#334155] flex flex-col gap-1">
              <div className="flex justify-between text-[11px]">
                <span className="text-on-surface font-medium">{feat.feature}</span>
                <span className={feat.impact === 'NEGATIVE' ? 'text-[#f97316]' : 'text-primary'}>
                  {feat.value}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-[#0F172A] h-1 overflow-hidden">
                  <div 
                    className={`h-full ${feat.impact === 'NEGATIVE' ? 'bg-[#f97316]' : 'bg-primary'}`}
                    style={{ width: `${feat.importance * 100}%` }}
                  ></div>
                </div>
                <span className="text-[10px] text-on-surface-variant shrink-0">
                  +{(feat.importance * 100).toFixed(0)}% wt
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Rule Logic String */}
      {ruleTriggered && (
        <div className="p-2 bg-[#091009] border border-[#3d4a3d] text-[10px] text-primary mb-3">
          <span className="text-on-surface-variant font-bold">ACTIVE CONSTRAINT RULE: </span>
          <code>{ruleTriggered}</code>
        </div>
      )}

      {/* Action Button */}
      {onApplyRecommendation && (
        <button
          onClick={onApplyRecommendation}
          className="w-full py-2 bg-primary hover:bg-primary-fixed text-[#003915] font-bold text-xs flex items-center justify-center gap-2 transition-transform active:scale-98 shadow-sm cursor-pointer"
        >
          <CheckCircle className="w-4 h-4" />
          {actionLabel}
        </button>
      )}
    </div>
  );
};
