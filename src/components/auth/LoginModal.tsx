import React, { useState } from 'react';
import { UserRole } from '../../types';
import { INITIAL_USER_PROFILES } from '../../data/mockData';
import { Shield, KeyRound, UserCheck, Lock, Radio, CheckCircle, ArrowRight } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRole: (role: UserRole) => void;
  currentRole: UserRole;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onSelectRole,
  currentRole
}) => {
  const [empId, setEmpId] = useState('IR-CR-0891');
  const [password, setPassword] = useState('••••••••••••');
  const [selectedRole, setSelectedRole] = useState<UserRole>(currentRole);

  if (!isOpen) return null;

  const demoRoles: { role: UserRole; name: string; title: string; badge: string; desc: string }[] = [
    {
      role: 'controller',
      name: 'Samyak Misal',
      title: 'Operations Controller (COA Dispatch)',
      badge: 'LEVEL-4 DISPATCH',
      desc: 'Approves blocks, resolves multi-train corridor conflicts, reviews AI possession proposals.'
    },
    {
      role: 'engineering',
      name: 'Sai Dhapte',
      title: 'Track / Civil Engineer (TMS)',
      badge: 'TMS LEVEL-3',
      desc: 'Monitors TGI, OMS acceleration peaks, USFD rail flaws, and plans machine tamping.'
    },
    {
      role: 'ohe',
      name: 'Suraj Kolpe',
      title: 'OHE / Traction Engineer (TDMS)',
      badge: 'TRD / SCADA',
      desc: 'Manages 25kV power isolations, contact wire wear telemetry, and tower wagon runs.'
    },
    {
      role: 'signalling',
      name: 'Vishv Chavan',
      title: 'Signal & Telecom Engineer (SMMS)',
      badge: 'SMMS LEVEL-3',
      desc: 'Supervises point machines, MSDAC axle counters, and electronic interlocking firmware.'
    },
    {
      role: 'maintenance_planner',
      name: 'Gauri Gandre',
      title: 'Maintenance & Machine Planner',
      badge: 'DEPOT ALLOCATOR',
      desc: 'Allocates Duomatic tamping machines, DTS stabilizers, and multi-gang work schedules.'
    },
    {
      role: 'admin',
      name: 'Sourabh Patil',
      title: 'System Safety Administrator',
      badge: 'RAILWAY BOARD',
      desc: 'Manages engineering safety constraints, AI optimization weights, and immutable audit logs.'
    }
  ];

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    const profile = INITIAL_USER_PROFILES[role];
    if (profile) {
      setEmpId(profile.id);
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSelectRole(selectedRole);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md select-none font-mono">
      {/* HUD Container Card */}
      <div className="w-full max-w-4xl bg-[#0e150e] border-2 border-[#3d4a3d] p-6 lg:p-8 relative shadow-2xl overflow-hidden brutalist-corner brutalist-corner-tl brutalist-corner-tr">
        {/* Background Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(61,74,61,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(61,74,61,0.15)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-60"></div>

        {/* Top Header Banner */}
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#3d4a3d] pb-4 mb-6 gap-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-container border border-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[#003915] text-2xl font-bold">alt_route</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-headline font-extrabold text-2xl text-primary tracking-wider">
                  JUNCTION
                </h1>
                <span className="bg-[#161d16] border border-primary text-primary text-[10px] px-2 py-0.5 font-bold">
                  SIH 2026
                </span>
              </div>
              <p className="text-xs text-on-surface-variant">
                AI-Powered Railway Asset & Block Planning Platform • Ministry of Railways
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-on-surface-variant">SECURITY CLEARANCE:</span>
            <span className="text-primary font-bold">LEVEL-4 CRYPTO PASS</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
          {/* Left Column: 1-Click Role Selector */}
          <div className="lg:col-span-7 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                <UserCheck className="w-4 h-4" /> 1-CLICK DEMO ROLE LOGIN
              </span>
              <span className="text-[10px] text-on-surface-variant">Click to instant load profile</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 flex-1">
              {demoRoles.map(item => (
                <button
                  key={item.role}
                  type="button"
                  onClick={() => handleRoleSelect(item.role)}
                  className={`p-3 text-left border transition-all flex flex-col justify-between ${
                    selectedRole === item.role
                      ? 'bg-[#153ea3]/30 border-primary text-on-surface shadow-lg'
                      : 'bg-[#161d16] border-[#3d4a3d] text-on-surface-variant hover:border-primary/50 hover:bg-[#1a221a]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-1 mb-1">
                    <span className="font-bold text-xs text-on-surface">{item.name}</span>
                    <span className={`text-[8px] font-bold px-1 py-0.2 ${
                      selectedRole === item.role ? 'bg-primary text-[#003915]' : 'bg-[#242c24] text-on-surface-variant'
                    }`}>
                      {item.badge}
                    </span>
                  </div>
                  <div className="text-[11px] text-primary font-semibold truncate mb-1">
                    {item.title}
                  </div>
                  <p className="text-[10px] text-on-surface-variant/80 line-clamp-2 leading-tight">
                    {item.desc}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Credential Verification & Sign In */}
          <div className="lg:col-span-5 bg-[#161d16] border border-[#3d4a3d] p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 border-b border-[#3d4a3d] pb-2 mb-4">
                <KeyRound className="w-4 h-4 text-primary" />
                <span className="text-xs font-bold uppercase tracking-wider text-on-surface">
                  AUTHENTICATION PROTOCOL
                </span>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                    EMPLOYEE ID (IR-CENTRAL)
                  </label>
                  <input
                    type="text"
                    value={empId}
                    onChange={(e) => setEmpId(e.target.value)}
                    className="w-full bg-[#0e150e] border border-[#3d4a3d] focus:border-primary px-3 py-2 text-xs text-primary font-mono outline-none"
                    placeholder="e.g. IR-CR-0891"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">
                    ENCRYPTED PIN / SECURITY KEY
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#0e150e] border border-[#3d4a3d] focus:border-primary px-3 py-2 text-xs text-primary font-mono outline-none"
                  />
                </div>

                <div className="p-2.5 bg-[#0e150e] border border-[#3d4a3d] text-[10px] text-on-surface-variant space-y-1">
                  <div className="flex justify-between">
                    <span>ACTIVE ROLE:</span>
                    <span className="text-primary font-bold uppercase">{selectedRole}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>CORRIDOR ACCESS:</span>
                    <span className="text-[#9db2ff]">WR BCT-BRC CORRIDOR</span>
                  </div>
                  <div className="flex justify-between">
                    <span>DATA RIGHTS:</span>
                    <span className="text-[#4be277]">FULL EDIT & POSSESSION WRITE</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-primary hover:bg-primary-fixed text-[#003915] font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-transform active:scale-98 shadow-md cursor-pointer"
                >
                  <span>AUTHORIZE & ENTER JUNCTION</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>

            <div className="mt-4 pt-3 border-t border-[#3d4a3d] text-center">
              <span className="text-[9px] text-on-surface-variant flex items-center justify-center gap-1">
                <Shield className="w-3 h-3 text-primary" /> CRIS / Indian Railways Cyber-Defense Standard
              </span>
            </div>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-on-surface-variant hover:text-primary text-xs font-bold px-2 py-1 bg-[#161d16] border border-[#3d4a3d] cursor-pointer"
        >
          ✕ CLOSE
        </button>
      </div>
    </div>
  );
};
