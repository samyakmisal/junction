import React, { useState, useEffect } from 'react';
import { UserRole, UserProfile } from '../../types';
import { INITIAL_USER_PROFILES } from '../../data/mockData';
import { 
  Bell, 
  ShieldAlert, 
  Clock, 
  Activity, 
  User, 
  ChevronDown, 
  Sparkles, 
  Radio,
  CheckCircle,
  AlertOctagon,
  Layers
} from 'lucide-react';

interface HeaderProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  onOpenLogin: () => void;
  activeEmergency: boolean;
  onToggleEmergency: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  onRoleChange,
  onOpenLogin,
  activeEmergency,
  onToggleEmergency
}) => {
  const [timeStr, setTimeStr] = useState<string>('30 AUG 2026 02:53:00 IST');
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const currentUser: UserProfile = INITIAL_USER_PROFILES[currentRole] || INITIAL_USER_PROFILES.controller;

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format as DD MMM YYYY HH:MM:SS IST
      const day = String(now.getDate()).padStart(2, '0');
      const month = now.toLocaleString('en-US', { month: 'short' }).toUpperCase();
      const year = '2026';
      const hours = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      const secs = String(now.getSeconds()).padStart(2, '0');
      setTimeStr(`${day} ${month} ${year} ${hours}:${mins}:${secs} IST`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const roles: { role: UserRole; title: string; dept: string }[] = [
    { role: 'controller', title: 'Operations Controller', dept: 'COA / Control Desk' },
    { role: 'engineering', title: 'Track / Civil Engineer', dept: 'Track TMS' },
    { role: 'ohe', title: 'OHE / Traction Engineer', dept: 'TRD / SCADA' },
    { role: 'signalling', title: 'S&T Engineer', dept: 'SMMS / Interlocking' },
    { role: 'maintenance_planner', title: 'Maintenance & Machine Planner', dept: 'TTM Depot' },
    { role: 'admin', title: 'System Safety Administrator', dept: 'Railway Board' },
  ];

  return (
    <header className="bg-[#091009] text-on-surface h-14 border-b border-[#3d4a3d] fixed top-0 right-0 left-0 z-40 flex items-center justify-between px-4 lg:px-6 select-none font-mono">
      {/* Brand Identity */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary-container flex items-center justify-center border border-primary">
            <span className="material-symbols-outlined text-[#003915] font-bold text-xl">alt_route</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-headline font-extrabold text-lg text-primary tracking-wider">
                JUNCTION
              </span>
              <span className="text-[9px] bg-[#161d16] border border-primary/40 text-primary px-1.5 py-0.2 hidden sm:inline-block font-bold">
                SIH26027
              </span>
            </div>
            <span className="text-[10px] text-on-surface-variant hidden md:block tracking-tight">
              AI-Powered Automatic Block Planning System • Ministry of Railways
            </span>
          </div>
        </div>
      </div>

      {/* Center Live Engine Status */}
      <div className="hidden xl:flex items-center gap-4 text-xs">
        <div className="flex items-center gap-2 px-2.5 py-1 bg-[#161d16] border border-[#3d4a3d]">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
          <span className="text-on-surface-variant text-[11px]">AI OPTIMIZER:</span>
          <span className="text-primary font-bold text-[11px]">ACTIVE (MILP / OR-TOOLS)</span>
        </div>
        <div className="flex items-center gap-2 px-2.5 py-1 bg-[#161d16] border border-[#3d4a3d]">
          <Radio className="w-3.5 h-3.5 text-[#3b82f6]" />
          <span className="text-on-surface-variant text-[11px]">DATA FUSION:</span>
          <span className="text-[#9db2ff] font-bold text-[11px]">TMS + TDMS + SMMS + COA</span>
        </div>
      </div>

      {/* Right Controls: Clock, Emergency Toggle, Notification, Role Switcher */}
      <div className="flex items-center gap-2 sm:gap-4">
        {/* Emergency Sandbox Trigger */}
        <button
          onClick={onToggleEmergency}
          className={`px-2.5 py-1 text-xs font-bold flex items-center gap-1.5 transition-all border ${
            activeEmergency
              ? 'bg-[#ef4444] text-white border-white animate-pulse'
              : 'bg-[#161d16] hover:bg-[#242c24] text-[#f97316] border-[#f97316]/50'
          }`}
          title="Toggle Emergency Incident Simulation (Rail Fracture / OHE breakdown)"
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">
            {activeEmergency ? 'EMERGENCY ACTIVE' : 'SIMULATE EVENT'}
          </span>
        </button>

        {/* Live Clock */}
        <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 bg-[#161d16] border border-[#3d4a3d] text-primary text-xs font-bold">
          <Clock className="w-3.5 h-3.5 text-primary" />
          <span>{timeStr}</span>
        </div>

        {/* Notifications Icon with Flyout */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-8 h-8 flex items-center justify-center bg-[#161d16] hover:bg-[#242c24] border border-[#3d4a3d] text-on-surface-variant hover:text-primary transition-colors cursor-pointer relative"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#ef4444] text-white text-[9px] font-bold flex items-center justify-center border border-[#091009]">
              3
            </span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-[#161d16] border border-[#3d4a3d] shadow-2xl p-3 z-50 text-xs">
              <div className="flex items-center justify-between border-b border-[#3d4a3d] pb-2 mb-2">
                <span className="font-bold text-primary flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5" /> LIVE TELEMETRY ALERTS
                </span>
                <span className="text-[10px] text-on-surface-variant">3 Critical</span>
              </div>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                <div className="p-2 bg-[#242c24] border-l-2 border-[#ef4444]">
                  <div className="text-on-surface font-bold text-[11px]">KM 127/4 Turnout PT-227-II</div>
                  <div className="text-[10px] text-on-surface-variant">TGI dropped to 68.2. OMS Lateral G: 0.28g.</div>
                </div>
                <div className="p-2 bg-[#242c24] border-l-2 border-[#f97316]">
                  <div className="text-on-surface font-bold text-[11px]">OHE Feeder Span 42 Hotspot</div>
                  <div className="text-[10px] text-on-surface-variant">+18.4°C thermal delta recorded by SCADA.</div>
                </div>
                <div className="p-2 bg-[#242c24] border-l-2 border-[#3b82f6]">
                  <div className="text-on-surface font-bold text-[11px]">Shadow Block Opportunity</div>
                  <div className="text-[10px] text-on-surface-variant">Club Civil Tamping with OHE Jumper at 02:00.</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Role Selector & User Profile */}
        <div className="relative">
          <button
            onClick={() => setShowRoleMenu(!showRoleMenu)}
            className="flex items-center gap-2 px-2.5 py-1 bg-[#161d16] hover:bg-[#242c24] border border-[#3d4a3d] text-left cursor-pointer transition-colors"
          >
            <div className="w-6 h-6 bg-primary-container text-[#003915] flex items-center justify-center font-bold text-xs">
              {currentUser.name[0]}
            </div>
            <div className="hidden md:flex flex-col">
              <span className="text-xs font-bold text-on-surface leading-tight">
                {currentUser.name}
              </span>
              <span className="text-[10px] text-primary leading-tight">
                {currentUser.roleTitle.split('(')[0]}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-on-surface-variant ml-1" />
          </button>

          {/* Role Dropdown */}
          {showRoleMenu && (
            <div className="absolute right-0 mt-2 w-72 bg-[#0e150e] border border-[#3d4a3d] shadow-2xl p-2 z-50 text-xs">
              <div className="p-2 border-b border-[#3d4a3d] mb-2">
                <span className="text-[10px] text-on-surface-variant font-bold tracking-wider uppercase block">
                  SWITCH OPERATIONAL ROLE
                </span>
                <span className="text-[11px] text-primary">
                  Demo all 6 Railway Stakeholder Portals
                </span>
              </div>
              <div className="space-y-1">
                {roles.map(r => (
                  <button
                    key={r.role}
                    onClick={() => {
                      onRoleChange(r.role);
                      setShowRoleMenu(false);
                    }}
                    className={`w-full text-left px-2.5 py-2 flex items-center justify-between transition-colors border ${
                      currentRole === r.role
                        ? 'bg-[#242c24] border-primary text-primary font-bold'
                        : 'border-transparent text-on-surface hover:bg-[#161d16]'
                    }`}
                  >
                    <div>
                      <div className="text-[11px]">{r.title}</div>
                      <div className="text-[9px] text-on-surface-variant">{r.dept}</div>
                    </div>
                    {currentRole === r.role && (
                      <CheckCircle className="w-3.5 h-3.5 text-primary shrink-0" />
                    )}
                  </button>
                ))}
              </div>
              <div className="border-t border-[#3d4a3d] mt-2 pt-2">
                <button
                  onClick={() => {
                    setShowRoleMenu(false);
                    onOpenLogin();
                  }}
                  className="w-full text-center py-1.5 bg-[#161d16] hover:bg-[#242c24] text-on-surface-variant hover:text-primary text-[10px] font-bold uppercase tracking-wider transition-colors"
                >
                  Switch User / Re-authenticate
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
