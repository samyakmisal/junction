import React from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  TrendingDown, 
  Cpu, 
  Layers, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  Zap,
  Activity,
  Flame
} from 'lucide-react';

export const AiInsights: React.FC = () => {
  return (
    <div className="space-y-6 select-none font-mono">
      {/* Top Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between bg-[#161d16] border border-[#3d4a3d] p-4 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-primary font-headline font-bold text-xl">
              AI MODEL INSIGHTS & INFRASTRUCTURE ROI
            </span>
            <span className="bg-[#153ea3] text-[#9db2ff] text-[10px] px-2 py-0.5 font-bold">
              XGBOOST + OR-TOOLS + SHAP
            </span>
          </div>
          <p className="text-xs text-on-surface-variant mt-0.5">
            Predictive machine learning telemetry, remaining useful life (RUL) projections, and multi-department synchronization analytics.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#0e150e] border border-[#3d4a3d] p-2 text-xs">
          <Cpu className="w-4 h-4 text-primary" />
          <span className="text-on-surface-variant">MODEL ACCURACY:</span>
          <span className="text-primary font-bold">94.2% ROC-AUC</span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#161d16] border border-[#3d4a3d] p-4">
          <div className="flex justify-between items-center text-xs text-on-surface-variant mb-1">
            <span>PREVENTED RAIL FAILURES</span>
            <ShieldCheck className="w-4 h-4 text-primary" />
          </div>
          <div className="text-3xl font-headline font-bold text-primary">14</div>
          <div className="text-[10px] text-[#4be277] mt-1">100% Zero Derailments</div>
        </div>

        <div className="bg-[#161d16] border border-[#3d4a3d] p-4">
          <div className="flex justify-between items-center text-xs text-on-surface-variant mb-1">
            <span>SHADOW BLOCK GAIN</span>
            <Zap className="w-4 h-4 text-[#3b82f6]" />
          </div>
          <div className="text-3xl font-headline font-bold text-[#9db2ff]">210 min</div>
          <div className="text-[10px] text-on-surface-variant mt-1">Downtime eliminated this week</div>
        </div>

        <div className="bg-[#161d16] border border-[#3d4a3d] p-4">
          <div className="flex justify-between items-center text-xs text-on-surface-variant mb-1">
            <span>TAMPING MACHINE ROI</span>
            <Activity className="w-4 h-4 text-[#f97316]" />
          </div>
          <div className="text-3xl font-headline font-bold text-on-surface">92.4%</div>
          <div className="text-[10px] text-[#4be277] mt-1">+18.6% vs manual scheduling</div>
        </div>

        <div className="bg-[#161d16] border border-[#3d4a3d] p-4">
          <div className="flex justify-between items-center text-xs text-on-surface-variant mb-1">
            <span>PASSENGER DELAY IMPACT</span>
            <TrendingDown className="w-4 h-4 text-primary" />
          </div>
          <div className="text-3xl font-headline font-bold text-primary">-76.4%</div>
          <div className="text-[10px] text-primary mt-1">Compared to manual BDMS</div>
        </div>
      </div>

      {/* Grid: Left 6 cols (Kilometer Risk Heatmap) / Right 6 cols (SHAP Feature Global Ranking) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Kilometer Risk Heatmap */}
        <div className="bg-[#161d16] border border-[#3d4a3d] p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-[#3d4a3d] pb-2">
            <span className="text-xs font-bold text-on-surface uppercase flex items-center gap-2">
              <Flame className="w-4 h-4 text-[#f97316]" />
              CORRIDOR DEGRADATION RISK HEATMAP (BY KILOMETER)
            </span>
            <span className="text-[10px] text-on-surface-variant">KM 100 to 160</span>
          </div>

          <p className="text-xs text-on-surface-variant">
            Identifies high-density stress sectors with compounded GMT tonnage, turnout switch friction, and high dynamic versine variations.
          </p>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-2 bg-[#0e150e] border border-[#ef4444]/60">
              <span className="font-bold text-on-surface">KM 125.0 – 128.5 (Vapi – Udvada)</span>
              <span className="text-[#ef4444] font-bold">89% Critical (Turnout PT-227 + OHE Span 42)</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-[#0e150e] border border-[#f97316]/50">
              <span className="font-bold text-on-surface">KM 106.0 – 108.0 (Bhilad – Sanjan)</span>
              <span className="text-[#f97316] font-bold">72% Warning (Insulator Flashover)</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-[#0e150e] border border-[#3d4a3d]">
              <span className="font-bold text-on-surface">KM 138.0 – 143.0 (Valsad – Dungri)</span>
              <span className="text-primary font-bold">12% Normal (60kg CWR Rail)</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-[#0e150e] border border-[#3d4a3d]">
              <span className="font-bold text-on-surface">KM 148.0 – 156.0 (Dungri – Surat)</span>
              <span className="text-primary font-bold">18% Normal (MSDAC Monitored)</span>
            </div>
          </div>
        </div>

        {/* Global SHAP Feature Importance Ranking */}
        <div className="bg-[#161d16] border border-[#3d4a3d] p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-[#3d4a3d] pb-2">
            <span className="text-xs font-bold text-primary uppercase flex items-center gap-2">
              <Cpu className="w-4 h-4 text-primary" />
              GLOBAL SHAP FEATURE IMPORTANCE WEIGHTS
            </span>
            <span className="text-[10px] text-on-surface-variant">XGBoost Rank</span>
          </div>

          <p className="text-xs text-on-surface-variant">
            Relative contribution of fixed infrastructure inspection parameters in predicting maintenance blocks.
          </p>

          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-on-surface">1. Track Geometry Index (TGI) Degradation Rate</span>
                <strong className="text-primary">34.2%</strong>
              </div>
              <div className="w-full bg-[#0e150e] h-1.5 border border-[#3d4a3d]">
                <div className="bg-primary h-full" style={{ width: '34.2%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-on-surface">2. SCADA Thermal Delta & Contact Wire Thickness</span>
                <strong className="text-[#f97316]">28.6%</strong>
              </div>
              <div className="w-full bg-[#0e150e] h-1.5 border border-[#3d4a3d]">
                <div className="bg-[#f97316] h-full" style={{ width: '28.6%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-on-surface">3. OMS Lateral / Vertical Peak Accelerations</span>
                <strong className="text-[#3b82f6]">18.4%</strong>
              </div>
              <div className="w-full bg-[#0e150e] h-1.5 border border-[#3d4a3d]">
                <div className="bg-[#3b82f6] h-full" style={{ width: '18.4%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-on-surface">4. Accumulated Gross Million Tonnes (GMT)</span>
                <strong className="text-on-surface">12.1%</strong>
              </div>
              <div className="w-full bg-[#0e150e] h-1.5 border border-[#3d4a3d]">
                <div className="bg-on-surface-variant h-full" style={{ width: '12.1%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-on-surface">5. Electric Point Machine Stroke Current & Time</span>
                <strong className="text-on-surface">6.7%</strong>
              </div>
              <div className="w-full bg-[#0e150e] h-1.5 border border-[#3d4a3d]">
                <div className="bg-on-surface-variant h-full" style={{ width: '6.7%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
