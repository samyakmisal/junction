import React, { useState, useEffect } from 'react';
import { FixedAsset, TrainEntity, MaintenanceBlock } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { 
  Train, 
  Layers, 
  Eye, 
  Zap, 
  Radio, 
  AlertTriangle, 
  Info, 
  Compass, 
  Maximize2, 
  Play, 
  Pause, 
  RotateCcw,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Sliders
} from 'lucide-react';

interface LiveNetworkMapProps {
  assets: FixedAsset[];
  trains: TrainEntity[];
  blocks: MaintenanceBlock[];
  onSelectAsset: (asset: FixedAsset) => void;
  onSelectBlock: (block: MaintenanceBlock) => void;
}

export const LiveNetworkMap: React.FC<LiveNetworkMapProps> = ({
  assets,
  trains: initialTrains,
  blocks,
  onSelectAsset,
  onSelectBlock
}) => {
  const [trains, setTrains] = useState<TrainEntity[]>(initialTrains);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [selectedEntity, setSelectedEntity] = useState<{ type: 'TRAIN' | 'ASSET' | 'BLOCK'; data: any } | null>(null);

  // Layer Visibility Filters
  const [showTrains, setShowTrains] = useState(true);
  const [showAssets, setShowAssets] = useState(true);
  const [showOheGrid, setShowOheGrid] = useState(true);
  const [showSignals, setShowSignals] = useState(true);
  const [showPossessions, setShowPossessions] = useState(true);
  const [showSpeedRestrictions, setShowSpeedRestrictions] = useState(true);

  // Train Movement Simulation Loop
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setTrains(prevTrains =>
        prevTrains.map(train => {
          // Move trains along KM markers based on speed
          const speedFactor = 0.05; // Simulation speed factor
          let newKm = train.currentKm;

          if (train.assignedTrack === 'UP') {
            newKm += (train.speedKmH / 100) * speedFactor;
            if (newKm > 160) newKm = 100; // Loop back
          } else {
            newKm -= (train.speedKmH / 100) * speedFactor;
            if (newKm < 100) newKm = 160; // Loop back
          }

          return {
            ...train,
            currentKm: parseFloat(newKm.toFixed(2))
          };
        })
      );
    }, 500);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Convert KM Marker (100 to 160) to percentage (0% to 100%)
  const kmToPercent = (km: number) => {
    const minKm = 100;
    const maxKm = 160;
    const clamped = Math.max(minKm, Math.min(maxKm, km));
    return ((clamped - minKm) / (maxKm - minKm)) * 100;
  };

  const stations = [
    { name: 'SANJAN', km: 104, code: 'SJ' },
    { name: 'BHILAD', km: 112, code: 'BLD' },
    { name: 'VAPI', km: 125, code: 'VAPI' },
    { name: 'UDVADA', km: 131, code: 'UVD' },
    { name: 'VALSAD', km: 145, code: 'BL' },
    { name: 'DUNGRI', km: 154, code: 'DGI' }
  ];

  return (
    <div className="space-y-4 select-none font-mono">
      {/* Top Header & Simulation Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between bg-[#161d16] border border-[#3d4a3d] p-3.5 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-primary font-headline font-bold text-lg">
              LIVE NETWORK SCHEMATIC & TELEMETRY
            </span>
            <span className="bg-[#242c24] text-primary text-[10px] px-2 py-0.5 border border-primary/40 font-bold">
              WESTERN CORRIDOR (KM 100.0 – 160.0)
            </span>
          </div>
          <p className="text-[11px] text-on-surface-variant">
            Real-time track occupancy, automatic block signalling aspects, and multi-department possessions.
          </p>
        </div>

        {/* Play / Pause / Layer Controls */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="flex items-center bg-[#091009] border border-[#3d4a3d] p-1 gap-1">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`px-2.5 py-1 font-bold flex items-center gap-1 cursor-pointer transition-colors ${
                isPlaying ? 'bg-primary text-[#003915]' : 'bg-[#242c24] text-on-surface'
              }`}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'LIVE SIM' : 'PAUSED'}</span>
            </button>
            <button
              onClick={() => setTrains(initialTrains)}
              className="p-1 text-on-surface-variant hover:text-primary cursor-pointer"
              title="Reset Train Positions"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Quick Layer Toggles */}
          <div className="flex items-center gap-1 bg-[#091009] border border-[#3d4a3d] p-1 text-[10px]">
            <button
              onClick={() => setShowTrains(!showTrains)}
              className={`px-2 py-0.5 font-bold transition-colors ${
                showTrains ? 'bg-[#153ea3] text-[#9db2ff]' : 'text-on-surface-variant'
              }`}
            >
              TRAINS ({trains.length})
            </button>
            <button
              onClick={() => setShowAssets(!showAssets)}
              className={`px-2 py-0.5 font-bold transition-colors ${
                showAssets ? 'bg-[#242c24] text-primary' : 'text-on-surface-variant'
              }`}
            >
              ASSETS ({assets.length})
            </button>
            <button
              onClick={() => setShowPossessions(!showPossessions)}
              className={`px-2 py-0.5 font-bold transition-colors ${
                showPossessions ? 'bg-[#f97316]/20 text-[#f97316]' : 'text-on-surface-variant'
              }`}
            >
              BLOCKS ({blocks.length})
            </button>
            <button
              onClick={() => setShowSignals(!showSignals)}
              className={`px-2 py-0.5 font-bold transition-colors ${
                showSignals ? 'bg-[#004b1e] text-[#4be277]' : 'text-on-surface-variant'
              }`}
            >
              SIGNALS
            </button>
          </div>
        </div>
      </div>

      {/* Main Interactive Canvas & Inspector Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-4">
        {/* Left 8/9 cols: The Track Schematic HUD */}
        <div className="xl:col-span-9 bg-[#0F172A] border border-[#334155] p-5 relative overflow-hidden flex flex-col min-h-[500px]">
          {/* Top HUD Coordinates Bar */}
          <div className="flex items-center justify-between border-b border-[#334155] pb-2 mb-6 text-xs text-on-surface-variant">
            <div className="flex items-center gap-4">
              <span className="text-primary font-bold">GRID: WR-BCT-BRC-MAIN</span>
              <span>AUTO SIGNALLING: 1.0 KM HEADWAY</span>
              <span>25kV AC TRACTION: ENERGIZED</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-primary font-bold">COA SYNCED</span>
            </div>
          </div>

          {/* Kilometer Scale Header */}
          <div className="relative h-8 border-b border-[#334155] mb-4">
            {stations.map(st => {
              const pos = kmToPercent(st.km);
              return (
                <div 
                  key={st.code} 
                  className="absolute top-0 flex flex-col items-center -translate-x-1/2 cursor-pointer group"
                  style={{ left: `${pos}%` }}
                >
                  <div className="text-[10px] font-bold text-on-surface group-hover:text-primary transition-colors">
                    {st.name}
                  </div>
                  <div className="text-[8px] text-on-surface-variant">KM {st.km}</div>
                  <div className="w-[1px] h-3 bg-[#475569] mt-0.5"></div>
                </div>
              );
            })}
          </div>

          {/* The Railway Track Schematic Canvas */}
          <div className="relative flex-1 py-8 flex flex-col justify-around">
            {/* Background Grid Lines */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(51,65,85,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(51,65,85,0.15)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>

            {/* UP MAIN LINE */}
            <div className="relative my-4">
              <div className="flex items-center justify-between text-[10px] text-on-surface-variant mb-1 px-2">
                <span className="text-[#4be277] font-bold">UP MAIN LINE (DIR: NORTH ➔ GNC / NDLS)</span>
                <span>SPEED MAX: 130 KM/H | 60KG UIC CWR</span>
              </div>
              <div className="h-3 w-full bg-[#1E293B] border-y border-[#475569] relative flex items-center">
                {/* Track Center Line */}
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-[#334155]"></div>

                {/* Signals along UP Track */}
                {showSignals && [106, 114, 122, 126, 130, 138, 146, 154].map(km => {
                  const pos = kmToPercent(km);
                  // If train or block is nearby, make signal red or double yellow
                  const hasBlock = km >= 126 && km <= 128;
                  return (
                    <div 
                      key={km}
                      className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 flex flex-col items-center"
                      style={{ left: `${pos}%` }}
                      title={`Signal S-${km}Aspect`}
                    >
                      <div className={`w-2.5 h-2.5 rounded-full border border-white ${
                        hasBlock ? 'bg-[#ef4444] animate-pulse' : 'bg-[#22c55e]'
                      }`}></div>
                    </div>
                  );
                })}

                {/* Active Possession / Block Highlight (KM 126 to 128.5) */}
                {showPossessions && (
                  <div
                    onClick={() => {
                      const blk = blocks.find(b => b.blockCode === 'BLK-SHADOW-1042');
                      if (blk) setSelectedEntity({ type: 'BLOCK', data: blk });
                    }}
                    className="absolute h-full hazard-stripe border-2 border-[#f97316] z-10 flex items-center justify-center cursor-pointer hover:opacity-90"
                    style={{
                      left: `${kmToPercent(126)}%`,
                      width: `${kmToPercent(128.5) - kmToPercent(126)}%`
                    }}
                    title="Active Multi-Department Block (KM 126.0 - 128.5)"
                  >
                    <span className="text-[8px] font-bold bg-[#0F172A] px-1 text-[#f97316] border border-[#f97316] whitespace-nowrap">
                      SHADOW BLK #1042
                    </span>
                  </div>
                )}

                {/* Asset Pins on UP Line */}
                {showAssets && assets.filter(a => a.track === 'UP').map(asset => {
                  // Extract KM number e.g. "KM 127/4" -> 127.4
                  const match = asset.kmMarker.match(/(\d+)\/?(\d+)?/);
                  const kmVal = match ? parseFloat(match[1]) + (match[2] ? parseFloat(match[2]) / 10 : 0) : 127;
                  const pos = kmToPercent(kmVal);

                  let pinColor = 'bg-primary border-white';
                  if (asset.status === 'WARNING') pinColor = 'bg-[#f97316] border-white';
                  if (asset.status === 'CRITICAL') pinColor = 'bg-[#ef4444] border-white pulse-critical';

                  return (
                    <div
                      key={asset.id}
                      onClick={() => {
                        setSelectedEntity({ type: 'ASSET', data: asset });
                        onSelectAsset(asset);
                      }}
                      className={`absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-none ${pinColor} border z-20 cursor-pointer transition-transform hover:scale-125 flex items-center justify-center`}
                      style={{ left: `${pos}%` }}
                      title={`${asset.code} (${asset.status}) - Click to inspect`}
                    >
                      <span className="text-[8px] font-bold text-black">{asset.code[0]}</span>
                    </div>
                  );
                })}

                {/* Trains on UP Line */}
                {showTrains && trains.filter(t => t.assignedTrack === 'UP').map(train => {
                  const pos = kmToPercent(train.currentKm);
                  return (
                    <div
                      key={train.id}
                      onClick={() => setSelectedEntity({ type: 'TRAIN', data: train })}
                      className="absolute -top-7 -translate-x-1/2 z-30 flex flex-col items-center cursor-pointer transition-all duration-300 group"
                      style={{ left: `${pos}%` }}
                    >
                      <div className={`px-1.5 py-0.5 text-[9px] font-bold border flex items-center gap-1 shadow-md ${
                        train.trainType === 'VANDE_BHARAT'
                          ? 'bg-[#003915] text-primary border-primary'
                          : 'bg-[#153ea3] text-[#9db2ff] border-[#3b82f6]'
                      }`}>
                        <Train className="w-2.5 h-2.5" />
                        <span>{train.trainNumber}</span>
                        <span className="text-[8px] text-white">({train.speedKmH}k)</span>
                      </div>
                      <div className={`w-3.5 h-3.5 rotate-45 border border-white mt-0.5 ${
                        train.trainType === 'VANDE_BHARAT' ? 'bg-primary' : 'bg-[#3b82f6]'
                      }`}></div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Crossover / Switch Zone (Vapi to Udvada KM 127) */}
            <div className="relative h-6 flex items-center justify-center">
              <div 
                className="absolute h-full w-12 border-r-2 border-dashed border-[#f97316] opacity-70"
                style={{ left: `${kmToPercent(127)}%` }}
                title="Crossover Turnout PT-227-II"
              ></div>
              <span className="text-[8px] text-on-surface-variant bg-[#0F172A] px-1 border border-[#334155]">
                CROSSOVER SWITCH PT-227
              </span>
            </div>

            {/* DOWN MAIN LINE */}
            <div className="relative my-4">
              <div className="flex items-center justify-between text-[10px] text-on-surface-variant mb-1 px-2">
                <span className="text-[#9db2ff] font-bold">DN MAIN LINE (DIR: SOUTH ➔ MMCT / BCT)</span>
                <span>SPEED MAX: 110 KM/H | FREIGHT & GOODS PATH</span>
              </div>
              <div className="h-3 w-full bg-[#1E293B] border-y border-[#475569] relative flex items-center">
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-[#334155]"></div>

                {/* Asset Pins on DN Line */}
                {showAssets && assets.filter(a => a.track === 'DN').map(asset => {
                  const match = asset.kmMarker.match(/(\d+)\/?(\d+)?/);
                  const kmVal = match ? parseFloat(match[1]) : 140;
                  const pos = kmToPercent(kmVal);

                  return (
                    <div
                      key={asset.id}
                      onClick={() => {
                        setSelectedEntity({ type: 'ASSET', data: asset });
                        onSelectAsset(asset);
                      }}
                      className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-primary border border-white z-20 cursor-pointer hover:scale-125 flex items-center justify-center"
                      style={{ left: `${pos}%` }}
                      title={`${asset.code} - Operational`}
                    >
                      <span className="text-[8px] font-bold text-black">{asset.code[0]}</span>
                    </div>
                  );
                })}

                {/* Trains on DN Line */}
                {showTrains && trains.filter(t => t.assignedTrack === 'DN').map(train => {
                  const pos = kmToPercent(train.currentKm);
                  return (
                    <div
                      key={train.id}
                      onClick={() => setSelectedEntity({ type: 'TRAIN', data: train })}
                      className="absolute -top-7 -translate-x-1/2 z-30 flex flex-col items-center cursor-pointer transition-all duration-300"
                      style={{ left: `${pos}%` }}
                    >
                      <div className="px-1.5 py-0.5 text-[9px] font-bold bg-[#7c2d12] text-[#fed7aa] border border-[#f97316] flex items-center gap-1 shadow-md">
                        <Train className="w-2.5 h-2.5" />
                        <span>{train.trainNumber}</span>
                        <span className="text-[8px] text-white">({train.speedKmH}k)</span>
                      </div>
                      <div className="w-3.5 h-3.5 bg-[#f97316] border border-white mt-0.5"></div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* LOOP LINES (Vapi & Udvada) */}
            <div className="relative my-2">
              <div className="flex items-center justify-between text-[9px] text-on-surface-variant mb-1 px-2">
                <span>LOOP LINE 1 & STABLING SIDINGS (30 KM/H TSR)</span>
                <span>FREIGHT HOLDING & EMERGENCIES</span>
              </div>
              <div className="h-2 w-full bg-[#091009] border-y border-dashed border-[#334155] relative flex items-center">
                {/* Loop Line S&T Point Machine Pin */}
                {showAssets && assets.filter(a => a.track === 'LOOP_1').map(asset => (
                  <div
                    key={asset.id}
                    onClick={() => {
                      setSelectedEntity({ type: 'ASSET', data: asset });
                      onSelectAsset(asset);
                    }}
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-[#f97316] border border-white z-20 cursor-pointer"
                    style={{ left: `${kmToPercent(125.2)}%` }}
                    title="Point Machine S700K (Warning)"
                  ></div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Canvas Legend */}
          <div className="border-t border-[#334155] pt-3 flex flex-wrap items-center justify-between text-[10px] text-on-surface-variant gap-3">
            <div className="flex items-center gap-3">
              <span className="font-bold text-white">LEGEND:</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-primary border border-white"></span> Healthy Asset</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-[#f97316] border border-white"></span> Warning</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 bg-[#ef4444] border border-white pulse-critical"></span> Critical Defect</span>
              <span className="flex items-center gap-1"><span className="w-4 h-2 hazard-stripe border border-[#f97316]"></span> Block Possession</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary font-bold">CLICK ANY ASSET / TRAIN TO INSPECT TELEMETRY</span>
            </div>
          </div>
        </div>

        {/* Right 3/4 cols: Inspector Drawer */}
        <div className="xl:col-span-3 bg-[#161d16] border border-[#3d4a3d] p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[#3d4a3d] pb-2 mb-3">
              <span className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
                <Info className="w-4 h-4 text-primary" /> LIVE ENTITY INSPECTOR
              </span>
              <span className="text-[9px] bg-[#242c24] text-on-surface-variant px-1 font-bold">HUD</span>
            </div>

            {selectedEntity ? (
              <div className="space-y-3 text-xs">
                {selectedEntity.type === 'TRAIN' && (
                  <div className="space-y-2">
                    <div className="p-2.5 bg-[#1a221a] border border-[#3d4a3d]">
                      <div className="text-[10px] text-on-surface-variant font-bold">TRAIN COA DATA</div>
                      <div className="text-sm font-bold text-primary mt-0.5">
                        {selectedEntity.data.trainNumber} - {selectedEntity.data.trainName}
                      </div>
                      <div className="text-[11px] text-on-surface-variant mt-1">
                        Type: <strong className="text-on-surface">{selectedEntity.data.trainType}</strong>
                      </div>
                    </div>

                    <div className="space-y-1 text-[11px] bg-[#0e150e] p-2.5 border border-[#3d4a3d]">
                      <div className="flex justify-between">
                        <span>Current KM:</span>
                        <span className="text-primary font-bold">KM {selectedEntity.data.currentKm}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Speed:</span>
                        <span className="text-on-surface font-bold">{selectedEntity.data.speedKmH} km/h</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Assigned Track:</span>
                        <span className="text-primary font-bold">{selectedEntity.data.assignedTrack} MAIN</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Delay:</span>
                        <span className={selectedEntity.data.delayMinutes > 0 ? 'text-[#f97316]' : 'text-primary'}>
                          {selectedEntity.data.delayMinutes} min
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Rake:</span>
                        <span className="text-on-surface truncate">{selectedEntity.data.rakeCapacity}</span>
                      </div>
                    </div>

                    {selectedEntity.data.diverted && (
                      <div className="p-2 bg-[#7c2d12]/30 border border-[#f97316] text-[10px] text-[#fed7aa]">
                        <span className="font-bold">DIVERSION ACTIVE: </span>
                        {selectedEntity.data.diversionRoute}
                      </div>
                    )}
                  </div>
                )}

                {selectedEntity.type === 'ASSET' && (
                  <div className="space-y-2">
                    <div className="p-2.5 bg-[#1a221a] border border-[#3d4a3d]">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-bold text-on-surface">{selectedEntity.data.code}</span>
                        <StatusBadge status={selectedEntity.data.status} />
                      </div>
                      <div className="text-[11px] text-on-surface-variant mt-0.5">
                        {selectedEntity.data.name}
                      </div>
                    </div>

                    <div className="space-y-1 text-[11px] bg-[#0e150e] p-2.5 border border-[#3d4a3d]">
                      <div className="flex justify-between">
                        <span>Department:</span>
                        <span className="text-[#9db2ff] font-bold">{selectedEntity.data.department}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Location:</span>
                        <span className="text-on-surface">{selectedEntity.data.section} ({selectedEntity.data.kmMarker})</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Condition Score:</span>
                        <span className="text-primary font-bold">{selectedEntity.data.conditionScore} / 100</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Failure Probability:</span>
                        <span className="text-[#ef4444] font-bold">{selectedEntity.data.failureRiskProbability}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Block Required:</span>
                        <span className="text-[#f97316] font-bold">{selectedEntity.data.blockRequired ? 'YES' : 'NO'}</span>
                      </div>
                    </div>

                    <div className="p-2 bg-[#091009] border border-[#3d4a3d] text-[10px]">
                      <span className="text-primary font-bold">XAI DIAGNOSIS: </span>
                      <p className="text-on-surface-variant mt-0.5">{selectedEntity.data.xaiReasoning}</p>
                    </div>
                  </div>
                )}

                {selectedEntity.type === 'BLOCK' && (
                  <div className="space-y-2">
                    <div className="p-2.5 bg-[#1a221a] border border-[#3d4a3d]">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-primary">{selectedEntity.data.blockCode}</span>
                        <StatusBadge status={selectedEntity.data.status} />
                      </div>
                      <div className="text-[11px] text-on-surface font-bold mt-1">
                        {selectedEntity.data.title}
                      </div>
                    </div>

                    <div className="space-y-1 text-[11px] bg-[#0e150e] p-2.5 border border-[#3d4a3d]">
                      <div className="flex justify-between">
                        <span>Optimal Window:</span>
                        <span className="text-primary font-bold">
                          {selectedEntity.data.aiOptimalStartTime} – {selectedEntity.data.aiOptimalEndTime}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Duration:</span>
                        <span className="text-on-surface font-bold">{selectedEntity.data.durationMinutes} min</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Departments:</span>
                        <span className="text-[#9db2ff] font-bold">
                          {selectedEntity.data.departmentsInvolved.join(' + ')}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>Affected Trains:</span>
                        <span className="text-primary font-bold">{selectedEntity.data.affectedTrainCount} (0 min delay)</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-6 text-center text-on-surface-variant space-y-2 border border-dashed border-[#3d4a3d]">
                <Compass className="w-8 h-8 text-on-surface-variant mx-auto opacity-50" />
                <p className="text-xs">No track element selected.</p>
                <p className="text-[10px] text-on-surface-variant/70">
                  Click any train, signal, turnout or possession block on the schematic above to inspect full diagnostic telemetry.
                </p>
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-[#3d4a3d] mt-4">
            <div className="text-[10px] text-on-surface-variant text-center">
              Indian Railways Automatic Block System • High Density Corridor
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
