import React from 'react';
import { FixedAsset } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { FileSpreadsheet, Activity, Wrench, ShieldCheck, TrendingUp, AlertTriangle } from 'lucide-react';

interface TrackDepartmentProps {
  assets: FixedAsset[];
  onRequestBlock: (asset: FixedAsset) => void;
}

export const TrackDepartment: React.FC<TrackDepartmentProps> = ({ assets, onRequestBlock }) => {
  const trackAssets = assets.filter(a => a.department === 'TRACK');

  return (
    <div className="space-y-6 select-none font-mono">
      {/* Top Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between bg-[#161d16] border border-[#3d4a3d] p-4 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-primary font-headline font-bold text-xl">
              TRACK MANAGEMENT SYSTEM (TMS) PORTAL
            </span>
            <span className="bg-primary/20 text-primary text-[10px] px-2 py-0.5 border border-primary/40 font-bold">
              CIVIL ENGINEERING
            </span>
          </div>
          <p className="text-xs text-on-surface-variant mt-0.5">
            Track Geometry Index (TGI), Oscillation Monitoring System (OMS) accelerations, USFD rail flaw tests, and TTM machine tamping.
          </p>
        </div>

        <div className="text-xs bg-[#0e150e] border border-[#3d4a3d] p-2.5 flex items-center gap-3">
          <div>
            <span className="text-[10px] text-on-surface-variant block">LEAD ENGINEER:</span>
            <span className="text-primary font-bold">Sai Dhapte (Sr. DEN / Track)</span>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-[#161d16] border border-[#3d4a3d] p-3">
          <span className="text-[10px] text-on-surface-variant font-bold">TRACK ASSETS</span>
          <div className="text-2xl font-bold text-on-surface mt-1">842 Assets</div>
          <div className="text-[9px] text-[#4be277] mt-1">94.1% In Tolerance</div>
        </div>
        <div className="bg-[#161d16] border border-[#3d4a3d] p-3">
          <span className="text-[10px] text-on-surface-variant font-bold">TGI COMPLIANCE</span>
          <div className="text-2xl font-bold text-primary mt-1">Avg 82.4</div>
          <div className="text-[9px] text-on-surface-variant mt-1">Good/Very Good Category</div>
        </div>
        <div className="bg-[#161d16] border border-[#3d4a3d] p-3">
          <span className="text-[10px] text-on-surface-variant font-bold">TTM TAMPING DUE</span>
          <div className="text-2xl font-bold text-[#f97316] mt-1">17 km</div>
          <div className="text-[9px] text-on-surface-variant mt-1">Duomatic 08-32 Assigned</div>
        </div>
        <div className="bg-[#161d16] border border-[#3d4a3d] p-3">
          <span className="text-[10px] text-on-surface-variant font-bold">USFD FLAW ALERTS</span>
          <div className="text-2xl font-bold text-[#ef4444] mt-1">1 Flaw</div>
          <div className="text-[9px] text-on-surface-variant mt-1">Turnout PT-227-II Observe</div>
        </div>
      </div>

      {/* Track Assets Detailed List */}
      <div className="bg-[#161d16] border border-[#3d4a3d] p-4 space-y-4">
        <div className="flex justify-between items-center border-b border-[#3d4a3d] pb-2">
          <span className="text-xs font-bold text-on-surface uppercase">
            CIVIL INFRASTRUCTURE STATUS (RAILS, SLEEPERS, SWITCHES)
          </span>
          <span className="text-[10px] text-on-surface-variant">TMS Synchronized</span>
        </div>

        <div className="space-y-3">
          {trackAssets.map(asset => (
            <div key={asset.id} className="p-3 bg-[#0e150e] border border-[#3d4a3d] space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div className="flex items-center gap-2">
                  <StatusBadge status={asset.status} />
                  <span className="font-bold text-xs text-primary">{asset.code}</span>
                  <span className="text-xs text-on-surface">{asset.name}</span>
                </div>
                <div className="text-xs text-on-surface-variant">
                  Location: <strong className="text-on-surface">{asset.section} ({asset.kmMarker})</strong>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs bg-[#161d16] p-2 border border-[#3d4a3d]">
                <div>
                  <span className="text-[10px] text-on-surface-variant block">TRACK GEOMETRY (TGI):</span>
                  <strong className={asset.tgiScore && asset.tgiScore < 75 ? 'text-[#f97316]' : 'text-primary'}>
                    {asset.tgiScore || 'N/A'}
                  </strong>
                </div>
                <div>
                  <span className="text-[10px] text-on-surface-variant block">OMS ACCELERATION:</span>
                  <strong className={asset.omsPeakG && asset.omsPeakG > 0.25 ? 'text-[#ef4444]' : 'text-on-surface'}>
                    {asset.omsPeakG ? `${asset.omsPeakG}g` : '0.12g'}
                  </strong>
                </div>
                <div>
                  <span className="text-[10px] text-on-surface-variant block">USFD SCAN STATUS:</span>
                  <strong className={asset.usfdFlawStatus === 'OBSERVE' ? 'text-[#f97316]' : 'text-primary'}>
                    {asset.usfdFlawStatus || 'CLEAR'}
                  </strong>
                </div>
                <div>
                  <span className="text-[10px] text-on-surface-variant block">GMT ACCUMULATION:</span>
                  <strong className="text-on-surface">{asset.gmtAccumulated} GMT/yr</strong>
                </div>
              </div>

              <p className="text-[11px] text-on-surface-variant">
                <strong className="text-primary">TMS Health Summary: </strong>
                {asset.xaiReasoning}
              </p>

              <div className="flex justify-end pt-1">
                <button
                  onClick={() => onRequestBlock(asset)}
                  className="px-3 py-1.5 bg-[#242c24] hover:bg-primary hover:text-[#003915] text-primary text-[10px] font-bold uppercase transition-colors cursor-pointer"
                >
                  REQUEST MACHINE TAMPING POSSESSION
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
