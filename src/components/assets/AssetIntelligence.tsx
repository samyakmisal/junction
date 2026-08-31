import React, { useState } from 'react';
import { FixedAsset, DepartmentType, AssetCondition } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { XaiCard } from '../common/XaiCard';
import { 
  Layers, 
  Search, 
  Filter, 
  TrendingDown, 
  Activity, 
  Calendar, 
  AlertOctagon, 
  CheckCircle2, 
  Wrench, 
  ArrowRight,
  Sparkles,
  Zap,
  Radio,
  FileSpreadsheet
} from 'lucide-react';

interface AssetIntelligenceProps {
  assets: FixedAsset[];
  selectedAsset: FixedAsset | null;
  onSelectAsset: (asset: FixedAsset) => void;
  onRequestBlock: (asset: FixedAsset) => void;
}

export const AssetIntelligence: React.FC<AssetIntelligenceProps> = ({
  assets,
  selectedAsset: externalSelected,
  onSelectAsset,
  onRequestBlock
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [deptFilter, setDeptFilter] = useState<'ALL' | DepartmentType>('ALL');
  const [statusFilter, setStatusFilter] = useState<'ALL' | AssetCondition>('ALL');
  const [activeAsset, setActiveAsset] = useState<FixedAsset>(externalSelected || assets[0]);

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = 
      asset.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.section.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.kmMarker.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDept = deptFilter === 'ALL' || asset.department === deptFilter;
    const matchesStatus = statusFilter === 'ALL' || asset.status === statusFilter;

    return matchesSearch && matchesDept && matchesStatus;
  });

  const handleRowClick = (asset: FixedAsset) => {
    setActiveAsset(asset);
    onSelectAsset(asset);
  };

  return (
    <div className="space-y-6 select-none font-mono">
      {/* Header Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between bg-[#161d16] border border-[#3d4a3d] p-4 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-primary font-headline font-bold text-xl">
              ASSET HEALTH & PREDICTIVE INTELLIGENCE
            </span>
            <span className="bg-[#242c24] text-primary text-[10px] px-2 py-0.5 border border-primary/40 font-bold">
              TMS + TDMS + SMMS UNIFIED REGISTRY
            </span>
          </div>
          <p className="text-xs text-on-surface-variant mt-0.5">
            Real-time condition monitoring, track geometry indices (TGI), ultrasonic flaw detection (USFD), and degradation curves.
          </p>
        </div>

        {/* Network Health Metric */}
        <div className="flex items-center gap-4 bg-[#0e150e] border border-[#3d4a3d] p-3 text-xs">
          <div>
            <div className="text-[10px] text-on-surface-variant font-bold">OVERALL NETWORK HEALTH</div>
            <div className="text-xl font-bold text-primary">88.4%</div>
          </div>
          <div className="w-24 bg-[#1a221a] h-2 border border-[#3d4a3d]">
            <div className="h-full bg-primary" style={{ width: '88.4%' }}></div>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-[#161d16] border border-[#3d4a3d] p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Search */}
        <div className="flex items-center gap-2 bg-[#0e150e] border border-[#3d4a3d] px-3 py-1.5 flex-1 min-w-[200px] max-w-md">
          <Search className="w-4 h-4 text-on-surface-variant" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Asset Code, Location, or KM (e.g. PT-227, KM 127)..."
            className="bg-transparent border-none outline-none text-xs text-primary w-full"
          />
        </div>

        {/* Department Filters */}
        <div className="flex items-center gap-1 bg-[#0e150e] border border-[#3d4a3d] p-1">
          {(['ALL', 'TRACK', 'OHE', 'SNT'] as const).map(dept => (
            <button
              key={dept}
              onClick={() => setDeptFilter(dept)}
              className={`px-3 py-1 text-[11px] font-bold cursor-pointer transition-colors ${
                deptFilter === dept ? 'bg-primary text-[#003915]' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {dept === 'ALL' ? 'ALL DEPTS' : dept}
            </button>
          ))}
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1 bg-[#0e150e] border border-[#3d4a3d] p-1">
          {(['ALL', 'CRITICAL', 'WARNING', 'OPERATIONAL'] as const).map(stat => (
            <button
              key={stat}
              onClick={() => setStatusFilter(stat)}
              className={`px-2.5 py-1 text-[10px] font-bold cursor-pointer transition-colors ${
                statusFilter === stat
                  ? stat === 'CRITICAL' ? 'bg-[#ef4444] text-white' :
                    stat === 'WARNING' ? 'bg-[#f97316] text-black' :
                    stat === 'OPERATIONAL' ? 'bg-primary text-[#003915]' : 'bg-[#242c24] text-primary'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {stat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Left 7 cols (Data Table) / Right 5 cols (Asset Detail & XAI Drawer) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left Column: High Density Asset Master Table (7 cols) */}
        <div className="xl:col-span-7 bg-[#161d16] border border-[#3d4a3d] overflow-hidden flex flex-col">
          <div className="p-3 border-b border-[#3d4a3d] flex items-center justify-between text-xs">
            <span className="font-bold text-on-surface uppercase tracking-wider">
              ASSET REGISTRY (SHOWING {filteredAssets.length} OF {assets.length})
            </span>
            <span className="text-[10px] text-on-surface-variant">Click row to inspect diagnostic curves</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#1E293B] text-on-surface-variant border-b border-[#334155] text-[10px] font-bold uppercase tracking-wider">
                  <th className="py-2.5 px-3">STATUS</th>
                  <th className="py-2.5 px-3">ASSET CODE</th>
                  <th className="py-2.5 px-3">DEPT</th>
                  <th className="py-2.5 px-3">LOCATION</th>
                  <th className="py-2.5 px-3">TRACK</th>
                  <th className="py-2.5 px-3 text-right">HEALTH</th>
                  <th className="py-2.5 px-3 text-right">FAIL RISK</th>
                  <th className="py-2.5 px-3 text-center">BLOCK?</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#242c24]">
                {filteredAssets.map(asset => {
                  const isSelected = activeAsset?.id === asset.id;
                  return (
                    <tr
                      key={asset.id}
                      onClick={() => handleRowClick(asset)}
                      className={`cursor-pointer transition-colors ${
                        isSelected 
                          ? 'bg-[#153ea3]/30 border-l-4 border-primary' 
                          : 'hover:bg-[#242c24]'
                      }`}
                    >
                      <td className="py-2 px-3">
                        <StatusBadge status={asset.status} />
                      </td>
                      <td className="py-2 px-3 font-bold text-on-surface">
                        {asset.code}
                      </td>
                      <td className="py-2 px-3">
                        <span className="text-[9px] bg-[#242c24] text-[#9db2ff] px-1.5 py-0.2 border border-[#3d4a3d]">
                          {asset.department}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-on-surface-variant text-[11px]">
                        {asset.section} ({asset.kmMarker})
                      </td>
                      <td className="py-2 px-3 text-primary font-bold">
                        {asset.track}
                      </td>
                      <td className="py-2 px-3 text-right font-bold">
                        <span className={
                          asset.conditionScore < 65 ? 'text-[#ef4444]' :
                          asset.conditionScore < 80 ? 'text-[#f97316]' : 'text-primary'
                        }>
                          {asset.conditionScore}/100
                        </span>
                      </td>
                      <td className="py-2 px-3 text-right font-bold">
                        <span className={asset.failureRiskProbability > 70 ? 'text-[#ef4444]' : 'text-on-surface'}>
                          {asset.failureRiskProbability}%
                        </span>
                      </td>
                      <td className="py-2 px-3 text-center font-bold">
                        {asset.blockRequired ? (
                          <span className="text-[9px] text-[#f97316] bg-[#7c2d12]/30 px-1 border border-[#f97316]">
                            REQ
                          </span>
                        ) : (
                          <span className="text-[9px] text-on-surface-variant">NO</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Asset Deep-Dive & XAI Inspection (5 cols) */}
        <div className="xl:col-span-5 space-y-4">
          {activeAsset ? (
            <div className="space-y-4">
              {/* Asset Health Overview Card */}
              <div className="bg-[#161d16] border border-[#3d4a3d] p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-[#3d4a3d] pb-2">
                  <div className="flex items-center gap-2">
                    <StatusBadge status={activeAsset.status} />
                    <span className="font-bold text-sm text-primary">{activeAsset.code}</span>
                  </div>
                  <span className="text-[10px] text-on-surface-variant">ID: {activeAsset.id}</span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-on-surface">{activeAsset.name}</h3>
                  <div className="text-xs text-on-surface-variant mt-1 flex flex-wrap gap-x-4 gap-y-1">
                    <span>Section: <strong className="text-on-surface">{activeAsset.section}</strong></span>
                    <span>KM: <strong className="text-primary">{activeAsset.kmMarker}</strong></span>
                    <span>Track: <strong className="text-primary">{activeAsset.track} MAIN</strong></span>
                    <span>Traffic: <strong className="text-on-surface">{activeAsset.gmtAccumulated} GMT/yr</strong></span>
                  </div>
                </div>

                {/* Condition Degradation Trend Curve Visualizer */}
                <div className="p-3 bg-[#0e150e] border border-[#3d4a3d] space-y-2">
                  <div className="flex justify-between items-center text-[10px] text-on-surface-variant font-bold">
                    <span>CONDITION DEGRADATION TIMELINE (6 MONTHS)</span>
                    <span className="text-[#f97316] flex items-center gap-1">
                      <TrendingDown className="w-3 h-3" /> Deteriorating
                    </span>
                  </div>

                  {/* Simulated Degradation Bars */}
                  <div className="grid grid-cols-6 gap-2 pt-2 text-center text-[9px]">
                    <div>
                      <div className="h-14 bg-[#242c24] flex items-end justify-center p-1">
                        <div className="w-full bg-primary" style={{ height: '92%' }}></div>
                      </div>
                      <span className="text-on-surface-variant mt-1 block">MAR</span>
                    </div>
                    <div>
                      <div className="h-14 bg-[#242c24] flex items-end justify-center p-1">
                        <div className="w-full bg-primary" style={{ height: '88%' }}></div>
                      </div>
                      <span className="text-on-surface-variant mt-1 block">APR</span>
                    </div>
                    <div>
                      <div className="h-14 bg-[#242c24] flex items-end justify-center p-1">
                        <div className="w-full bg-primary" style={{ height: '82%' }}></div>
                      </div>
                      <span className="text-on-surface-variant mt-1 block">MAY</span>
                    </div>
                    <div>
                      <div className="h-14 bg-[#242c24] flex items-end justify-center p-1">
                        <div className="w-full bg-[#f97316]" style={{ height: '76%' }}></div>
                      </div>
                      <span className="text-on-surface-variant mt-1 block">JUN</span>
                    </div>
                    <div>
                      <div className="h-14 bg-[#242c24] flex items-end justify-center p-1">
                        <div className="w-full bg-[#f97316]" style={{ height: '70%' }}></div>
                      </div>
                      <span className="text-on-surface-variant mt-1 block">JUL</span>
                    </div>
                    <div>
                      <div className="h-14 bg-[#242c24] flex items-end justify-center p-1">
                        <div className={`w-full ${activeAsset.conditionScore < 65 ? 'bg-[#ef4444]' : 'bg-[#f97316]'}`} style={{ height: `${activeAsset.conditionScore}%` }}></div>
                      </div>
                      <span className="text-primary font-bold mt-1 block">AUG</span>
                    </div>
                  </div>
                </div>

                {/* Specific Departmental Telemetry */}
                <div className="grid grid-cols-2 gap-2 text-xs bg-[#0e150e] p-2.5 border border-[#3d4a3d]">
                  {activeAsset.tgiScore && (
                    <div>
                      <span className="text-[10px] text-on-surface-variant block">TRACK GEOMETRY (TGI):</span>
                      <strong className="text-primary">{activeAsset.tgiScore}</strong>
                    </div>
                  )}
                  {activeAsset.omsPeakG && (
                    <div>
                      <span className="text-[10px] text-on-surface-variant block">OMS PEAK ACCEL:</span>
                      <strong className="text-[#f97316]">{activeAsset.omsPeakG}g</strong>
                    </div>
                  )}
                  {activeAsset.oheContactWireWearPercent && (
                    <div>
                      <span className="text-[10px] text-on-surface-variant block">WIRE WEAR:</span>
                      <strong className="text-[#ef4444]">{activeAsset.oheContactWireWearPercent}% wear</strong>
                    </div>
                  )}
                  {activeAsset.pointStrokeSeconds && (
                    <div>
                      <span className="text-[10px] text-on-surface-variant block">POINT STROKE TIME:</span>
                      <strong className="text-[#f97316]">{activeAsset.pointStrokeSeconds}s (Spec: &lt;4.0s)</strong>
                    </div>
                  )}
                  <div>
                    <span className="text-[10px] text-on-surface-variant block">PREDICTED RUL:</span>
                    <strong className="text-on-surface">{activeAsset.predictedFailureDays} days</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-on-surface-variant block">MAINTENANCE DUE:</span>
                    <strong className="text-[#f97316]">{activeAsset.maintenanceDue ? 'YES' : 'NO'}</strong>
                  </div>
                </div>
              </div>

              {/* Explainable AI (XAI) Feature Importance Matrix */}
              <XaiCard
                confidenceScore={activeAsset.failureRiskProbability}
                reasoning={activeAsset.xaiReasoning}
                features={activeAsset.xaiFeatures}
                ruleTriggered={`IF [${activeAsset.code}].Condition < 70 AND Traffic > 35 GMT THEN TRIGGER SHADOW_BLOCK`}
                onApplyRecommendation={() => onRequestBlock(activeAsset)}
                actionLabel="SCHEDULE AUTOMATIC MAINTENANCE BLOCK"
              />

              {/* Maintenance Inspection History */}
              <div className="bg-[#161d16] border border-[#3d4a3d] p-4 space-y-2">
                <div className="flex items-center justify-between border-b border-[#3d4a3d] pb-2">
                  <span className="text-xs font-bold uppercase text-on-surface flex items-center gap-1">
                    <Activity className="w-3.5 h-3.5 text-primary" /> INSPECTION & MAINTENANCE LOG
                  </span>
                  <span className="text-[10px] text-on-surface-variant">Last: {activeAsset.lastInspectionDate}</span>
                </div>

                <div className="space-y-2 text-xs">
                  {activeAsset.history.map((h, i) => (
                    <div key={i} className="p-2 bg-[#0e150e] border border-[#3d4a3d]">
                      <div className="flex justify-between text-[10px] text-on-surface-variant mb-0.5">
                        <span className="font-bold text-primary">{h.type}</span>
                        <span>{h.date}</span>
                      </div>
                      <p className="text-[11px] text-on-surface">{h.description}</p>
                      <div className="text-[9px] text-on-surface-variant mt-1">Engineer: {h.technician}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-on-surface-variant border border-dashed border-[#3d4a3d]">
              Select an asset from the table to inspect diagnostic parameters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
