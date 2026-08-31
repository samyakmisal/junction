import React, { useState } from 'react';
import { TrainEntity } from '../../types';
import { StatusBadge } from '../common/StatusBadge';
import { 
  Train, 
  Clock, 
  Route, 
  TrendingUp, 
  AlertTriangle, 
  Gauge, 
  Compass, 
  ArrowRight,
  CheckCircle2,
  Package,
  ShieldCheck
} from 'lucide-react';

interface TrainOperationsProps {
  trains: TrainEntity[];
  onRerouteTrain?: (trainId: string) => void;
}

export const TrainOperations: React.FC<TrainOperationsProps> = ({
  trains: initialTrains,
  onRerouteTrain
}) => {
  const [trains, setTrains] = useState<TrainEntity[]>(initialTrains);
  const [filterType, setFilterType] = useState<string>('ALL');

  const filteredTrains = trains.filter(t => {
    if (filterType === 'ALL') return true;
    if (filterType === 'PASSENGER') return t.trainType === 'VANDE_BHARAT' || t.trainType === 'RAJDHANI_SUPERFAST' || t.trainType === 'MAIL_EXPRESS' || t.trainType === 'EMU_SUBURBAN';
    if (filterType === 'FREIGHT') return t.trainType.includes('FREIGHT');
    return true;
  });

  const handleToggleDiversion = (trainId: string) => {
    setTrains(prev => prev.map(t => {
      if (t.id === trainId) {
        return {
          ...t,
          diverted: !t.diverted,
          diversionRoute: !t.diverted ? 'Diverted via Down Line Bi-directional signalling (50 km/h PSR)' : undefined,
          delayMinutes: !t.diverted ? t.delayMinutes + 6 : Math.max(0, t.delayMinutes - 6)
        };
      }
      return t;
    }));
    if (onRerouteTrain) onRerouteTrain(trainId);
  };

  return (
    <div className="space-y-6 select-none font-mono">
      {/* Top Banner */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between bg-[#161d16] border border-[#3d4a3d] p-4 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-primary font-headline font-bold text-xl">
              TRAIN OPERATIONS & COA CORRIDOR MONITOR
            </span>
            <span className="bg-[#153ea3] text-[#9db2ff] text-[10px] px-2 py-0.5 font-bold">
              CONTROL OFFICE APPLICATION (COA)
            </span>
          </div>
          <p className="text-xs text-on-surface-variant mt-0.5">
            Real-time schedule adherence, freight rake forecasts, temporary speed restrictions (TSR), and dynamic diversions.
          </p>
        </div>

        {/* Punctuality KPI */}
        <div className="flex items-center gap-4 bg-[#0e150e] border border-[#3d4a3d] p-3 text-xs">
          <div>
            <div className="text-[10px] text-on-surface-variant font-bold">CORRIDOR PUNCTUALITY INDEX</div>
            <div className="text-xl font-bold text-primary">96.8%</div>
          </div>
          <div className="text-[9px] text-[#4be277] flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +2.4% vs last week
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-[#161d16] border border-[#3d4a3d] p-3">
          <div className="text-[10px] text-on-surface-variant font-bold">ACTIVE TRAIN PATHS</div>
          <div className="text-2xl font-bold text-on-surface mt-1">{trains.length} Active</div>
          <div className="text-[9px] text-primary mt-1">4 Superfast / 2 Goods</div>
        </div>

        <div className="bg-[#161d16] border border-[#3d4a3d] p-3">
          <div className="text-[10px] text-on-surface-variant font-bold">TOTAL FREIGHT TONNAGE</div>
          <div className="text-2xl font-bold text-[#fed7aa] mt-1">6,750 T</div>
          <div className="text-[9px] text-on-surface-variant mt-1">Coal + Petroleum Rakes</div>
        </div>

        <div className="bg-[#161d16] border border-[#3d4a3d] p-3">
          <div className="text-[10px] text-on-surface-variant font-bold">CORRIDOR OCCUPANCY</div>
          <div className="text-2xl font-bold text-primary mt-1">74.2%</div>
          <div className="text-[9px] text-[#4be277] mt-1">Optimal Throughput Headroom</div>
        </div>

        <div className="bg-[#161d16] border border-[#3d4a3d] p-3">
          <div className="text-[10px] text-on-surface-variant font-bold">DIVERSIONS ACTIVE</div>
          <div className="text-2xl font-bold text-[#f97316] mt-1">
            {trains.filter(t => t.diverted).length}
          </div>
          <div className="text-[9px] text-on-surface-variant mt-1">Single Line Working</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1 bg-[#161d16] border border-[#3d4a3d] p-2 text-xs">
        <span className="text-[10px] text-on-surface-variant font-bold uppercase mr-2">TRAIN CATEGORY:</span>
        <button
          onClick={() => setFilterType('ALL')}
          className={`px-3 py-1 font-bold transition-colors ${
            filterType === 'ALL' ? 'bg-primary text-[#003915]' : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          ALL TRAINS ({trains.length})
        </button>
        <button
          onClick={() => setFilterType('PASSENGER')}
          className={`px-3 py-1 font-bold transition-colors ${
            filterType === 'PASSENGER' ? 'bg-[#153ea3] text-[#9db2ff]' : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          PASSENGER & SUPERFAST
        </button>
        <button
          onClick={() => setFilterType('FREIGHT')}
          className={`px-3 py-1 font-bold transition-colors ${
            filterType === 'FREIGHT' ? 'bg-[#7c2d12] text-[#fed7aa]' : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          GOODS & FREIGHT RAKES
        </button>
      </div>

      {/* Main Train Schedule Table */}
      <div className="bg-[#161d16] border border-[#3d4a3d] overflow-hidden">
        <div className="p-3 border-b border-[#3d4a3d] flex items-center justify-between text-xs">
          <span className="font-bold text-on-surface uppercase tracking-wider">
            COA LIVE TRAIN TIMETABLE & SECTION DISPATCH
          </span>
          <span className="text-[10px] text-on-surface-variant">Real-time GPS / Axle Counter Telemetry</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#1E293B] text-on-surface-variant border-b border-[#334155] text-[10px] font-bold uppercase tracking-wider">
                <th className="py-2.5 px-3">TRAIN NO.</th>
                <th className="py-2.5 px-3">TRAIN NAME</th>
                <th className="py-2.5 px-3">ROUTE</th>
                <th className="py-2.5 px-3">CURRENT LOCATION</th>
                <th className="py-2.5 px-3">TRACK</th>
                <th className="py-2.5 px-3 text-right">SPEED</th>
                <th className="py-2.5 px-3 text-right">DELAY</th>
                <th className="py-2.5 px-3 text-center">DIVERSION ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#242c24]">
              {filteredTrains.map(train => (
                <tr key={train.id} className="hover:bg-[#242c24] transition-colors">
                  <td className="py-3 px-3 font-bold text-primary">
                    {train.trainNumber}
                  </td>
                  <td className="py-3 px-3 font-medium text-on-surface">
                    <div>{train.trainName}</div>
                    <div className="text-[10px] text-on-surface-variant">Loco: {train.locoNumber} • {train.rakeCapacity}</div>
                  </td>
                  <td className="py-3 px-3 text-[11px] text-on-surface-variant">
                    {train.origin} ➔ {train.destination}
                  </td>
                  <td className="py-3 px-3 text-[11px] text-on-surface font-semibold">
                    {train.currentSection} (KM {train.currentKm})
                  </td>
                  <td className="py-3 px-3">
                    <span className="text-[10px] font-bold px-1.5 py-0.5 bg-[#242c24] text-[#9db2ff] border border-[#3d4a3d]">
                      {train.assignedTrack} MAIN
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right font-bold text-on-surface">
                    {train.speedKmH} km/h
                  </td>
                  <td className="py-3 px-3 text-right font-bold">
                    <span className={train.delayMinutes > 10 ? 'text-[#ef4444]' : train.delayMinutes > 0 ? 'text-[#f97316]' : 'text-primary'}>
                      {train.delayMinutes === 0 ? 'ON TIME' : `+${train.delayMinutes} min`}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <button
                      onClick={() => handleToggleDiversion(train.id)}
                      className={`px-2.5 py-1 text-[10px] font-bold border transition-colors cursor-pointer ${
                        train.diverted
                          ? 'bg-[#7c2d12] border-[#f97316] text-[#fed7aa]'
                          : 'bg-[#242c24] border-[#3d4a3d] text-on-surface hover:border-primary'
                      }`}
                    >
                      {train.diverted ? 'DIVERSION ACTIVE' : 'DIVERTE ROUTE'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
