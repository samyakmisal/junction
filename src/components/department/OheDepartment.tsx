import React from 'react';
import { FixedAsset } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { Zap, Activity, ShieldAlert, Thermometer, Radio, ArrowRight } from 'lucide-react';

interface OheDepartmentProps {
  assets: FixedAsset[];
  onRequestBlock: (asset: FixedAsset) => void;
}

export const OheDepartment: React.FC<OheDepartmentProps> = ({ assets, onRequestBlock }) => {
  const oheAssets = assets.filter(a => a.department === 'OHE');

  return (
    <div className="space-y-6 select-none font-mono">
      {/* Top Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between bg-[#161d16] border border-[#3d4a3d] p-4 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-primary font-headline font-bold text-xl">
              TRACTION DISTRIBUTION & SCADA PORTAL (TDMS)
            </span>
            <span className="bg-[#f97316]/20 text-[#f97316] text-[10px] px-2 py-0.5 border border-[#f97316]/40 font-bold">
              ELECTRICAL TRD
            </span>
          </div>
          <p className="text-xs text-on-surface-variant mt-0.5">
            25kV AC Catenary & Contact wire wear telemetry, SCADA thermal hotspot imaging, substation breaker status, and power blocks.
          </p>
        </div>

        <div className="text-xs bg-[#0e150e] border border-[#3d4a3d] p-2.5 flex items-center gap-3">
          <div>
            <span className="text-[10px] text-on-surface-variant block">LEAD ELECTRICAL ENGINEER:</span>
            <span className="text-[#f97316] font-bold">Suraj Kolpe (DEE / TRD)</span>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-[#161d16] border border-[#3d4a3d] p-3">
          <span className="text-[10px] text-on-surface-variant font-bold">TOTAL OHE SPANS</span>
          <div className="text-2xl font-bold text-on-surface mt-1">1,824 Spans</div>
          <div className="text-[9px] text-[#4be277] mt-1">All 25kV Feeders Energized</div>
        </div>
        <div className="bg-[#161d16] border border-[#3d4a3d] p-3">
          <span className="text-[10px] text-on-surface-variant font-bold">SCADA THERMAL HOTSPOTS</span>
          <div className="text-2xl font-bold text-[#ef4444] mt-1">1 Active</div>
          <div className="text-[9px] text-on-surface-variant mt-1">+18.4°C Span 42 Jumper</div>
        </div>
        <div className="bg-[#161d16] border border-[#3d4a3d] p-3">
          <span className="text-[10px] text-on-surface-variant font-bold">POWER BLOCKS SCHEDULED</span>
          <div className="text-2xl font-bold text-[#f97316] mt-1">2 Blocks</div>
          <div className="text-[9px] text-on-surface-variant mt-1">1 Shadow Clubbed</div>
        </div>
        <div className="bg-[#161d16] border border-[#3d4a3d] p-3">
          <span className="text-[10px] text-on-surface-variant font-bold">TOWER WAGON UNITS</span>
          <div className="text-2xl font-bold text-primary mt-1">3 Ready</div>
          <div className="text-[9px] text-on-surface-variant mt-1">Bhilad & Valsad Depots</div>
        </div>
      </div>

      {/* OHE Assets List */}
      <div className="bg-[#161d16] border border-[#3d4a3d] p-4 space-y-4">
        <div className="flex justify-between items-center border-b border-[#3d4a3d] pb-2">
          <span className="text-xs font-bold text-on-surface uppercase">
            TRACTION ASSETS & SCADA REAL-TIME STATUS
          </span>
          <span className="text-[10px] text-on-surface-variant">SCADA Connected</span>
        </div>

        <div className="space-y-3">
          {oheAssets.map(asset => (
            <div key={asset.id} className="p-3 bg-[#0e150e] border border-[#3d4a3d] space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div className="flex items-center gap-2">
                  <StatusBadge status={asset.status} />
                  <span className="font-bold text-xs text-[#f97316]">{asset.code}</span>
                  <span className="text-xs text-on-surface">{asset.name}</span>
                </div>
                <div className="text-xs text-on-surface-variant">
                  Location: <strong className="text-on-surface">{asset.section} ({asset.kmMarker})</strong>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs bg-[#161d16] p-2 border border-[#3d4a3d]">
                <div>
                  <span className="text-[10px] text-on-surface-variant block">WIRE WEAR PERCENT:</span>
                  <strong className={asset.oheContactWireWearPercent && asset.oheContactWireWearPercent > 20 ? 'text-[#ef4444]' : 'text-primary'}>
                    {asset.oheContactWireWearPercent ? `${asset.oheContactWireWearPercent}% wear` : 'Normal'}
                  </strong>
                </div>
                <div>
                  <span className="text-[10px] text-on-surface-variant block">CANTILEVER STAGGER:</span>
                  <strong className="text-on-surface">{asset.oheStaggerMm ? `${asset.oheStaggerMm} mm` : '200 mm'}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-on-surface-variant block">FAILURE PROBABILITY:</span>
                  <strong className={asset.failureRiskProbability > 70 ? 'text-[#ef4444]' : 'text-primary'}>
                    {asset.failureRiskProbability}%
                  </strong>
                </div>
                <div>
                  <span className="text-[10px] text-on-surface-variant block">ISOLATION REQUIRED:</span>
                  <strong className="text-[#f97316]">{asset.blockRequired ? 'YES (25kV CUT)' : 'NO'}</strong>
                </div>
              </div>

              <p className="text-[11px] text-on-surface-variant">
                <strong className="text-[#f97316]">SCADA Telemetry Diagnosis: </strong>
                {asset.xaiReasoning}
              </p>

              <div className="flex justify-end pt-1">
                <button
                  onClick={() => onRequestBlock(asset)}
                  className="px-3 py-1.5 bg-[#242c24] hover:bg-[#f97316] hover:text-black text-[#f97316] text-[10px] font-bold uppercase transition-colors cursor-pointer"
                >
                  REQUEST POWER ISOLATION BLOCK
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
