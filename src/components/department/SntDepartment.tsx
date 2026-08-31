import React from 'react';
import { FixedAsset } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { Radio, Activity, CheckCircle2, ShieldCheck, Cpu } from 'lucide-react';

interface SntDepartmentProps {
  assets: FixedAsset[];
  onRequestBlock: (asset: FixedAsset) => void;
}

export const SntDepartment: React.FC<SntDepartmentProps> = ({ assets, onRequestBlock }) => {
  const sntAssets = assets.filter(a => a.department === 'SNT');

  return (
    <div className="space-y-6 select-none font-mono">
      {/* Top Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between bg-[#161d16] border border-[#3d4a3d] p-4 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-primary font-headline font-bold text-xl">
              SIGNAL & TELECOM MAINTENANCE PORTAL (SMMS)
            </span>
            <span className="bg-[#153ea3] text-[#9db2ff] text-[10px] px-2 py-0.5 font-bold">
              ELECTRONIC INTERLOCKING & AXLE COUNTERS
            </span>
          </div>
          <p className="text-xs text-on-surface-variant mt-0.5">
            Electric Point Machine current signatures, Multi-Section Digital Axle Counter (MSDAC) coil balance, and interlocking logs.
          </p>
        </div>

        <div className="text-xs bg-[#0e150e] border border-[#3d4a3d] p-2.5 flex items-center gap-3">
          <div>
            <span className="text-[10px] text-on-surface-variant block">LEAD S&T ENGINEER:</span>
            <span className="text-[#9db2ff] font-bold">Vishv Chavan (Sr. DSTE)</span>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-[#161d16] border border-[#3d4a3d] p-3">
          <span className="text-[10px] text-on-surface-variant font-bold">POINT MACHINES</span>
          <div className="text-2xl font-bold text-on-surface mt-1">142 Units</div>
          <div className="text-[9px] text-[#4be277] mt-1">Siemens S700K Standard</div>
        </div>
        <div className="bg-[#161d16] border border-[#3d4a3d] p-3">
          <span className="text-[10px] text-on-surface-variant font-bold">MSDAC AXLE COUNTERS</span>
          <div className="text-2xl font-bold text-primary mt-1">99.8% Sync</div>
          <div className="text-[9px] text-on-surface-variant mt-1">0 False Dropouts in 24h</div>
        </div>
        <div className="bg-[#161d16] border border-[#3d4a3d] p-3">
          <span className="text-[10px] text-on-surface-variant font-bold">EI INTERLOCKINGS</span>
          <div className="text-2xl font-bold text-[#9db2ff] mt-1">6 Stations</div>
          <div className="text-[9px] text-on-surface-variant mt-1">Dual Redundant Hot Standby</div>
        </div>
        <div className="bg-[#161d16] border border-[#3d4a3d] p-3">
          <span className="text-[10px] text-on-surface-variant font-bold">DISCONNECTIONS DUE</span>
          <div className="text-2xl font-bold text-[#f97316] mt-1">1 Point Adj</div>
          <div className="text-[9px] text-on-surface-variant mt-1">Point 81B Friction Fix</div>
        </div>
      </div>

      {/* S&T Assets List */}
      <div className="bg-[#161d16] border border-[#3d4a3d] p-4 space-y-4">
        <div className="flex justify-between items-center border-b border-[#3d4a3d] pb-2">
          <span className="text-xs font-bold text-on-surface uppercase">
            SIGNALLING INFRASTRUCTURE & SMMS TELEMETRY
          </span>
          <span className="text-[10px] text-on-surface-variant">SMMS Connected</span>
        </div>

        <div className="space-y-3">
          {sntAssets.map(asset => (
            <div key={asset.id} className="p-3 bg-[#0e150e] border border-[#3d4a3d] space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div className="flex items-center gap-2">
                  <StatusBadge status={asset.status} />
                  <span className="font-bold text-xs text-[#9db2ff]">{asset.code}</span>
                  <span className="text-xs text-on-surface">{asset.name}</span>
                </div>
                <div className="text-xs text-on-surface-variant">
                  Location: <strong className="text-on-surface">{asset.section} ({asset.kmMarker})</strong>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs bg-[#161d16] p-2 border border-[#3d4a3d]">
                <div>
                  <span className="text-[10px] text-on-surface-variant block">POINT STROKE TIME:</span>
                  <strong className={asset.pointStrokeSeconds && asset.pointStrokeSeconds > 4.0 ? 'text-[#f97316]' : 'text-primary'}>
                    {asset.pointStrokeSeconds ? `${asset.pointStrokeSeconds}s (Spec <4s)` : '3.2s'}
                  </strong>
                </div>
                <div>
                  <span className="text-[10px] text-on-surface-variant block">CONDITION SCORE:</span>
                  <strong className="text-primary">{asset.conditionScore} / 100</strong>
                </div>
                <div>
                  <span className="text-[10px] text-on-surface-variant block">FAILURE RISK:</span>
                  <strong className={asset.failureRiskProbability > 60 ? 'text-[#f97316]' : 'text-primary'}>
                    {asset.failureRiskProbability}%
                  </strong>
                </div>
                <div>
                  <span className="text-[10px] text-on-surface-variant block">DISCONNECTION REQUIRED:</span>
                  <strong className="text-[#f97316]">{asset.blockRequired ? 'YES (S&T DISCONN)' : 'NO'}</strong>
                </div>
              </div>

              <p className="text-[11px] text-on-surface-variant">
                <strong className="text-[#9db2ff]">SMMS Diagnostic Log: </strong>
                {asset.xaiReasoning}
              </p>

              <div className="flex justify-end pt-1">
                <button
                  onClick={() => onRequestBlock(asset)}
                  className="px-3 py-1.5 bg-[#242c24] hover:bg-[#3b82f6] hover:text-white text-[#9db2ff] text-[10px] font-bold uppercase transition-colors cursor-pointer"
                >
                  REQUEST S&T DISCONNECTION NOTICE
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
