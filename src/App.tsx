import React, { useState } from 'react';
import { UserRole, FixedAsset, MaintenanceBlock, TrainEntity } from './types';
import { 
  INITIAL_ASSETS, 
  INITIAL_BLOCKS, 
  INITIAL_TRAINS, 
  INITIAL_CONFLICTS, 
  INITIAL_USER_PROFILES 
} from './data/mockData';
import { Header } from './components/common/Header';
import { Sidebar, NavTab } from './components/common/Sidebar';
import { LoginModal } from './components/auth/LoginModal';
import { OperationsDashboard } from './components/dashboard/OperationsDashboard';
import { LiveNetworkMap } from './components/map/LiveNetworkMap';
import { AssetIntelligence } from './components/assets/AssetIntelligence';
import { AiBlockPlanner } from './components/planner/AiBlockPlanner';
import { TrainOperations } from './components/trains/TrainOperations';
import { ConflictCenter } from './components/conflicts/ConflictCenter';
import { WhatIfSandbox } from './components/simulation/WhatIfSandbox';
import { AiInsights } from './components/insights/AiInsights';
import { TrackDepartment } from './components/department/TrackDepartment';
import { OheDepartment } from './components/department/OheDepartment';
import { SntDepartment } from './components/department/SntDepartment';
import { AdminPortal } from './components/admin/AdminPortal';
import { AlertOctagon, CheckCircle, ShieldAlert } from 'lucide-react';

export const App: React.FC = () => {
  const [currentRole, setCurrentRole] = useState<UserRole>('controller');
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
  const [collapsedSidebar, setCollapsedSidebar] = useState<boolean>(false);
  const [activeEmergency, setActiveEmergency] = useState<boolean>(false);

  // Application Data States
  const [assets, setAssets] = useState<FixedAsset[]>(INITIAL_ASSETS);
  const [blocks, setBlocks] = useState<MaintenanceBlock[]>(INITIAL_BLOCKS);
  const [trains, setTrains] = useState<TrainEntity[]>(INITIAL_TRAINS);
  const [conflicts, setConflicts] = useState(INITIAL_CONFLICTS);
  const [selectedAsset, setSelectedAsset] = useState<FixedAsset | null>(INITIAL_ASSETS[0]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Role Change Handler with contextual navigation
  const handleRoleChange = (role: UserRole) => {
    setCurrentRole(role);
    showToast(`Switched Role: ${INITIAL_USER_PROFILES[role]?.roleTitle || role}`);
    
    // Automatically navigate to role's primary workspace
    if (role === 'engineering') setActiveTab('dept-track');
    else if (role === 'ohe') setActiveTab('dept-ohe');
    else if (role === 'signalling') setActiveTab('dept-snt');
    else if (role === 'maintenance_planner') setActiveTab('planner');
    else if (role === 'admin') setActiveTab('admin');
    else setActiveTab('dashboard');
  };

  // Toggle Emergency Incident Sandbox
  const handleToggleEmergency = () => {
    const nextState = !activeEmergency;
    setActiveEmergency(nextState);
    if (nextState) {
      showToast('EMERGENCY SIMULATION TRIGGERED: Rail Fracture at KM 127/4');
      setActiveTab('simulation');
    } else {
      showToast('Emergency state cleared. Baseline traffic restored.');
    }
  };

  // Block Update Handler
  const handleUpdateBlock = (updatedBlock: MaintenanceBlock) => {
    setBlocks(prev => prev.map(b => b.id === updatedBlock.id ? updatedBlock : b));
    showToast(`Block ${updatedBlock.blockCode} status updated to ${updatedBlock.status}`);
  };

  // Request New Block for an Asset
  const handleRequestBlockForAsset = (asset: FixedAsset) => {
    setSelectedAsset(asset);
    setActiveTab('planner');
    showToast(`Block proposal queued for ${asset.code} (${asset.section})`);
  };

  // Handle Simulation Results
  const handleApplySimulationResult = (impactedTrains: TrainEntity[], emergencyBlocks: MaintenanceBlock[]) => {
    setTrains(impactedTrains);
    setBlocks(prev => [...emergencyBlocks, ...prev]);
    showToast('Applied emergency mitigation and diversion plan to live corridor.');
  };

  return (
    <div className="min-h-screen bg-[#0e150e] text-[#dce5d9] font-mono flex flex-col antialiased">
      {/* Top HUD Header */}
      <Header
        currentRole={currentRole}
        onRoleChange={handleRoleChange}
        onOpenLogin={() => setIsLoginOpen(true)}
        activeEmergency={activeEmergency}
        onToggleEmergency={handleToggleEmergency}
      />

      {/* Side Navigation Bar */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        currentRole={currentRole}
        collapsed={collapsedSidebar}
        onToggleCollapse={() => setCollapsedSidebar(!collapsedSidebar)}
      />

      {/* Main Content Area */}
      <main 
        className={`flex-1 mt-14 p-4 lg:p-6 transition-all duration-300 ${
          collapsedSidebar ? 'ml-16' : 'ml-60 lg:ml-64'
        }`}
      >
        {/* Emergency Alert Header (if triggered) */}
        {activeEmergency && (
          <div className="mb-4 p-3 bg-[#7c2d12]/40 border-2 border-[#ef4444] text-[#ffdad6] flex items-center justify-between animate-pulse">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-[#ef4444]" />
              <div>
                <span className="font-bold text-xs">EMERGENCY INCIDENT ACTIVE ON CORRIDOR: </span>
                <span className="text-xs">Rail Fracture on UP Line KM 127/4. Single Line Working (SLW) engaged on Down Line.</span>
              </div>
            </div>
            <button
              onClick={() => setActiveTab('simulation')}
              className="px-3 py-1 bg-[#ef4444] hover:bg-[#93000a] text-white text-xs font-bold uppercase transition-colors"
            >
              VIEW MITIGATION
            </button>
          </div>
        )}

        {/* Tab Router */}
        {activeTab === 'dashboard' && (
          <OperationsDashboard
            assets={assets}
            blocks={blocks}
            trains={trains}
            conflicts={conflicts}
            onNavigate={setActiveTab}
            onSelectAsset={(a) => {
              setSelectedAsset(a);
              setActiveTab('assets');
            }}
            onRunOptimization={() => setActiveTab('planner')}
          />
        )}

        {activeTab === 'map' && (
          <LiveNetworkMap
            assets={assets}
            trains={trains}
            blocks={blocks}
            onSelectAsset={(a) => {
              setSelectedAsset(a);
              setActiveTab('assets');
            }}
            onSelectBlock={(b) => {
              setActiveTab('planner');
            }}
          />
        )}

        {activeTab === 'assets' && (
          <AssetIntelligence
            assets={assets}
            selectedAsset={selectedAsset}
            onSelectAsset={setSelectedAsset}
            onRequestBlock={handleRequestBlockForAsset}
          />
        )}

        {activeTab === 'planner' && (
          <AiBlockPlanner
            blocks={blocks}
            assets={assets}
            trains={trains}
            onUpdateBlock={handleUpdateBlock}
          />
        )}

        {activeTab === 'trains' && (
          <TrainOperations
            trains={trains}
            onRerouteTrain={(id) => showToast(`Rerouted train ${id} via alternative loop`)}
          />
        )}

        {activeTab === 'conflicts' && (
          <ConflictCenter
            conflicts={conflicts}
            onResolveConflict={(id) => showToast(`Conflict ${id} resolved by AI Shadow Block Clubbing`)}
          />
        )}

        {activeTab === 'simulation' && (
          <WhatIfSandbox
            blocks={blocks}
            trains={trains}
            onApplySimulationResult={handleApplySimulationResult}
          />
        )}

        {activeTab === 'insights' && <AiInsights />}

        {activeTab === 'dept-track' && (
          <TrackDepartment
            assets={assets}
            onRequestBlock={handleRequestBlockForAsset}
          />
        )}

        {activeTab === 'dept-ohe' && (
          <OheDepartment
            assets={assets}
            onRequestBlock={handleRequestBlockForAsset}
          />
        )}

        {activeTab === 'dept-snt' && (
          <SntDepartment
            assets={assets}
            onRequestBlock={handleRequestBlockForAsset}
          />
        )}

        {activeTab === 'admin' && <AdminPortal />}
      </main>

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#161d16] border-2 border-primary text-primary px-4 py-2.5 text-xs font-bold shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle className="w-4 h-4 text-primary" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Login / Switch Profile Modal */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSelectRole={handleRoleChange}
        currentRole={currentRole}
      />
    </div>
  );
};
