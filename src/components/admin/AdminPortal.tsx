import React, { useState } from 'react';
import { AuditLog } from '../../types';
import { INITIAL_AUDIT_LOGS } from '../../data/mockData';
import { 
  ShieldCheck, 
  Sliders, 
  Database, 
  FileText, 
  Lock, 
  CheckCircle2, 
  Activity, 
  Radio, 
  RefreshCw,
  Key
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const AdminPortal: React.FC = () => {
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);
  
  // Configurable Safety Rules
  const [minHeadwayMin, setMinHeadwayMin] = useState(15);
  const [oheIsolationBufferMin, setOheIsolationBufferMin] = useState(20);
  const [maxTampingDurationMin, setMaxTampingDurationMin] = useState(180);
  const [slwSpeedLimitKmH, setSlwSpeedLimitKmH] = useState(50);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveSafetyRules = (e: React.FormEvent) => {
    e.preventDefault();
    const newLog: AuditLog = {
      id: `LOG-${Math.floor(Math.random() * 9000) + 1000}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      user: 'Sourabh Patil (Safety Admin)',
      role: 'Safety Administrator',
      action: 'Safety Rule Thresholds Updated',
      details: `Headway: ${minHeadwayMin}m, OHE Buffer: ${oheIsolationBufferMin}m, SLW Speed: ${slwSpeedLimitKmH} km/h.`,
      category: 'SAFETY_RULE_CHANGE',
      impactLevel: 'HIGH'
    };

    setAuditLogs([newLog, ...auditLogs]);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);

    try {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.7 },
        colors: ['#4be277', '#ffffff']
      });
    } catch (e) {}
  };

  const dataConnectors = [
    { name: 'Track Management System (TMS)', status: 'SYNCED', ping: '18ms', records: '14,200/hr', type: 'Civil' },
    { name: 'Traction Distribution & SCADA (TDMS)', status: 'SYNCED', ping: '12ms', records: '8,400/hr', type: 'Electrical' },
    { name: 'Signalling Maintenance (SMMS)', status: 'SYNCED', ping: '15ms', records: '5,600/hr', type: 'S&T' },
    { name: 'Control Office Application (COA)', status: 'SYNCED', ping: '9ms', records: '1,200/hr', type: 'Operations' },
    { name: 'Block Disconnection Management (BDMS)', status: 'SYNCED', ping: '24ms', records: '340/hr', type: 'Possessions' }
  ];

  return (
    <div className="space-y-6 select-none font-mono">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between bg-[#161d16] border border-[#3d4a3d] p-4 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-primary font-headline font-bold text-xl">
              SYSTEM ADMINISTRATION, SAFETY RULES & AUDIT TRAIL
            </span>
            <span className="bg-[#161d16] text-primary text-[10px] px-2 py-0.5 border border-primary/40 font-bold">
              RAILWAY BOARD SAFETY MANDATE
            </span>
          </div>
          <p className="text-xs text-on-surface-variant mt-0.5">
            Engineering safety constraints, OR-Tools optimization limits, API data connectors, and immutable cryptographically verifiable logs.
          </p>
        </div>

        <div className="text-xs bg-[#0e150e] border border-[#3d4a3d] p-2.5 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-primary" />
          <span>ADMINISTRATOR: <strong className="text-primary">Sourabh Patil</strong></span>
        </div>
      </div>

      {/* Grid: Left 6 cols (Safety Rule Configuration) / Right 6 cols (Data Connectors) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Safety Constraints Form */}
        <div className="bg-[#161d16] border border-[#3d4a3d] p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-[#3d4a3d] pb-2">
            <span className="text-xs font-bold text-on-surface uppercase flex items-center gap-2">
              <Sliders className="w-4 h-4 text-primary" />
              ENGINEERING SAFETY CONSTRAINTS & THRESHOLDS
            </span>
            <span className="text-[10px] text-on-surface-variant">Active Rules</span>
          </div>

          <form onSubmit={handleSaveSafetyRules} className="space-y-3 text-xs">
            <div>
              <label className="block text-[10px] font-bold text-on-surface-variant uppercase mb-1">
                MINIMUM HEADWAY BUFFER BETWEEN SUPERFAST TRAINS (MINUTES)
              </label>
              <input
                type="number"
                value={minHeadwayMin}
                onChange={(e) => setMinHeadwayMin(Number(e.target.value))}
                className="w-full bg-[#0e150e] border border-[#3d4a3d] px-3 py-2 text-primary font-bold outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-on-surface-variant uppercase mb-1">
                25kV OHE POWER ISOLATION & EARTHING BUFFER (MINUTES)
              </label>
              <input
                type="number"
                value={oheIsolationBufferMin}
                onChange={(e) => setOheIsolationBufferMin(Number(e.target.value))}
                className="w-full bg-[#0e150e] border border-[#3d4a3d] px-3 py-2 text-primary font-bold outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-on-surface-variant uppercase mb-1">
                MAX CONTINUOUS TAMPING MACHINE WINDOW DURATION (MINUTES)
              </label>
              <input
                type="number"
                value={maxTampingDurationMin}
                onChange={(e) => setMaxTampingDurationMin(Number(e.target.value))}
                className="w-full bg-[#0e150e] border border-[#3d4a3d] px-3 py-2 text-primary font-bold outline-none"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-on-surface-variant uppercase mb-1">
                SINGLE LINE WORKING (SLW) TEMPORARY SPEED RESTRICTION (KM/H)
              </label>
              <input
                type="number"
                value={slwSpeedLimitKmH}
                onChange={(e) => setSlwSpeedLimitKmH(Number(e.target.value))}
                className="w-full bg-[#0e150e] border border-[#3d4a3d] px-3 py-2 text-primary font-bold outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-primary hover:bg-primary-fixed text-[#003915] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-98 shadow-md"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>SAVE SAFETY CONSTRAINTS & LOG AUDIT</span>
            </button>

            {saveSuccess && (
              <div className="p-2 bg-[#004b1e] border border-primary text-primary text-[11px] font-bold text-center">
                ✓ Safety rules updated and recorded in immutable audit log.
              </div>
            )}
          </form>
        </div>

        {/* Data Source Connector Status */}
        <div className="bg-[#161d16] border border-[#3d4a3d] p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-[#3d4a3d] pb-2">
            <span className="text-xs font-bold text-on-surface uppercase flex items-center gap-2">
              <Database className="w-4 h-4 text-[#3b82f6]" />
              ENTERPRISE DATA FUSION CONNECTORS
            </span>
            <span className="text-[10px] text-primary flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span> ALL ONLINE
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            {dataConnectors.map((conn, idx) => (
              <div key={idx} className="p-3 bg-[#0e150e] border border-[#3d4a3d] flex items-center justify-between">
                <div>
                  <div className="font-bold text-on-surface">{conn.name}</div>
                  <div className="text-[10px] text-on-surface-variant">Throughput: {conn.records} • Dept: {conn.type}</div>
                </div>
                <div className="text-right">
                  <span className="text-[9px] bg-[#004b1e] text-primary font-bold px-1.5 py-0.5 border border-primary">
                    {conn.status} ({conn.ping})
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Immutable Audit Log Table */}
      <div className="bg-[#161d16] border border-[#3d4a3d] overflow-hidden">
        <div className="p-3 border-b border-[#3d4a3d] flex items-center justify-between text-xs">
          <span className="font-bold text-on-surface uppercase tracking-wider flex items-center gap-2">
            <FileText className="w-4 h-4 text-primary" />
            IMMUTABLE AUDIT TRAIL & AI DECISION LOG
          </span>
          <span className="text-[10px] text-on-surface-variant">Showing {auditLogs.length} Records</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#1E293B] text-on-surface-variant text-[10px] uppercase font-bold border-b border-[#334155]">
                <th className="py-2.5 px-3">TIMESTAMP</th>
                <th className="py-2.5 px-3">USER / PERSONA</th>
                <th className="py-2.5 px-3">ACTION EXECUTED</th>
                <th className="py-2.5 px-3">OPERATIONAL DETAILS</th>
                <th className="py-2.5 px-3">CATEGORY</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#242c24]">
              {auditLogs.map(log => (
                <tr key={log.id} className="hover:bg-[#242c24]">
                  <td className="py-2.5 px-3 text-on-surface-variant font-mono text-[11px] whitespace-nowrap">
                    {log.timestamp}
                  </td>
                  <td className="py-2.5 px-3 font-bold text-primary">
                    {log.user}
                  </td>
                  <td className="py-2.5 px-3 text-on-surface font-semibold">
                    {log.action}
                  </td>
                  <td className="py-2.5 px-3 text-[11px] text-on-surface-variant">
                    {log.details}
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="text-[9px] bg-[#242c24] text-[#9db2ff] px-1.5 py-0.5 border border-[#3d4a3d]">
                      {log.category}
                    </span>
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
