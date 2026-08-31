import React from 'react';
import { 
  LayoutDashboard, 
  Map, 
  Layers, 
  CalendarClock, 
  Train, 
  AlertTriangle, 
  Sparkles, 
  SlidersHorizontal,
  Flame,
  ShieldCheck,
  Zap,
  Radio,
  FileSpreadsheet,
  ChevronRight
} from 'lucide-react';
import { UserRole } from '../../types';

export type NavTab = 
  | 'dashboard'
  | 'map'
  | 'assets'
  | 'planner'
  | 'trains'
  | 'conflicts'
  | 'simulation'
  | 'insights'
  | 'dept-track'
  | 'dept-ohe'
  | 'dept-snt'
  | 'admin';

interface SidebarProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  currentRole: UserRole;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  currentRole,
  collapsed,
  onToggleCollapse
}) => {
  const primaryNavItems: { tab: NavTab; label: string; icon: any; badge?: string; badgeColor?: string }[] = [
    { tab: 'dashboard', label: 'Command Dashboard', icon: LayoutDashboard },
    { tab: 'map', label: 'Live Network Map', icon: Map, badge: 'LIVE', badgeColor: 'bg-primary text-[#003915]' },
    { tab: 'planner', label: 'AI Block Planner', icon: CalendarClock, badge: 'AUTO', badgeColor: 'bg-[#3b82f6] text-white' },
    { tab: 'assets', label: 'Asset Intelligence', icon: Layers, badge: '17 WNG', badgeColor: 'bg-[#f97316] text-black' },
    { tab: 'trains', label: 'Train Operations (COA)', icon: Train },
    { tab: 'conflicts', label: 'Conflict Center', icon: AlertTriangle, badge: '3 CNF', badgeColor: 'bg-[#ef4444] text-white' },
    { tab: 'simulation', label: 'What-If Sandbox', icon: Flame, badge: 'NEW', badgeColor: 'bg-purple-600 text-white' },
    { tab: 'insights', label: 'AI Analytics & ROI', icon: Sparkles },
  ];

  const deptNavItems: { tab: NavTab; label: string; icon: any; deptCode: string }[] = [
    { tab: 'dept-track', label: 'Civil Track (TMS)', icon: FileSpreadsheet, deptCode: 'TMS' },
    { tab: 'dept-ohe', label: 'Electrical OHE / SCADA', icon: Zap, deptCode: 'TDMS' },
    { tab: 'dept-snt', label: 'Signal & Telecom (SMMS)', icon: Radio, deptCode: 'SMMS' },
  ];

  return (
    <aside 
      className={`fixed left-0 top-14 bottom-0 bg-[#0e150e] border-r border-[#3d4a3d] z-30 flex flex-col transition-all duration-300 select-none font-mono ${
        collapsed ? 'w-16' : 'w-60 lg:w-64'
      }`}
    >
      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto py-3 px-2 space-y-1">
        {/* Core Operations Section */}
        <div className="mb-2">
          {!collapsed && (
            <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
              MISSION CONTROL
            </div>
          )}
          {primaryNavItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.tab;
            return (
              <button
                key={item.tab}
                onClick={() => onTabChange(item.tab)}
                title={collapsed ? item.label : undefined}
                className={`w-full flex items-center gap-3 px-3 py-2.5 my-0.5 text-xs transition-all border-l-4 ${
                  isActive
                    ? 'bg-[#153ea3]/40 text-[#9db2ff] border-primary font-bold shadow-inner'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-[#1a221a] border-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-primary' : 'text-on-surface-variant'}`} />
                {!collapsed && (
                  <div className="flex items-center justify-between flex-1 truncate">
                    <span className="truncate">{item.label}</span>
                    {item.badge && (
                      <span className={`text-[9px] font-bold px-1.5 py-0.2 ml-1 shrink-0 ${item.badgeColor}`}>
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Department Portals */}
        <div className="pt-2 border-t border-[#242c24] mb-2">
          {!collapsed && (
            <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant flex items-center justify-between">
              <span>DEPARTMENTS</span>
              <span className="text-[9px] text-[#3b82f6]">DATA FUSION</span>
            </div>
          )}
          {deptNavItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.tab;
            return (
              <button
                key={item.tab}
                onClick={() => onTabChange(item.tab)}
                title={collapsed ? item.label : undefined}
                className={`w-full flex items-center gap-3 px-3 py-2 text-xs transition-all border-l-4 ${
                  isActive
                    ? 'bg-[#1a221a] text-primary border-primary font-bold'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-[#161d16] border-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-primary' : 'text-on-surface-variant'}`} />
                {!collapsed && (
                  <div className="flex items-center justify-between flex-1 truncate">
                    <span className="truncate">{item.label}</span>
                    <span className="text-[9px] text-on-surface-variant/80 border border-[#3d4a3d] px-1">
                      {item.deptCode}
                    </span>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Admin & Safety Rules */}
        <div className="pt-2 border-t border-[#242c24]">
          {!collapsed && (
            <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
              ADMINISTRATION
            </div>
          )}
          <button
            onClick={() => onTabChange('admin')}
            title={collapsed ? 'Safety Rules & Admin' : undefined}
            className={`w-full flex items-center gap-3 px-3 py-2 text-xs transition-all border-l-4 ${
              activeTab === 'admin'
                ? 'bg-[#1a221a] text-primary border-primary font-bold'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-[#161d16] border-transparent'
            }`}
          >
            <ShieldCheck className={`w-4 h-4 shrink-0 ${activeTab === 'admin' ? 'text-primary' : 'text-on-surface-variant'}`} />
            {!collapsed && <span className="truncate">Safety Rules & Audit</span>}
          </button>
        </div>
      </div>

      {/* Collapse Toggle Footer */}
      <div className="p-2 border-t border-[#3d4a3d] flex items-center justify-between bg-[#091009]">
        <button
          onClick={onToggleCollapse}
          className="w-full py-1.5 px-2 bg-[#161d16] hover:bg-[#242c24] text-on-surface-variant hover:text-primary text-[10px] font-bold flex items-center justify-center gap-1 transition-colors"
        >
          <ChevronRight className={`w-3.5 h-3.5 transition-transform ${collapsed ? '' : 'rotate-180'}`} />
          {!collapsed && <span>COLLAPSE NAV</span>}
        </button>
      </div>
    </aside>
  );
};
