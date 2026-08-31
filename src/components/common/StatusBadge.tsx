import React from 'react';

export type StatusBadgeType = 
  | 'OPERATIONAL' 
  | 'WARNING' 
  | 'CRITICAL' 
  | 'BLOCKED' 
  | 'AI_RECOMMENDED' 
  | 'APPROVED' 
  | 'PENDING' 
  | 'ACTIVE' 
  | 'RESOLVED_BY_AI' 
  | 'COMPLETED' 
  | 'REQUESTED'
  | 'MODIFIED'
  | 'REJECTED'
  | 'OVERRIDDEN';

interface StatusBadgeProps {
  status: StatusBadgeType | string;
  label?: string;
  className?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, label, className = '' }) => {
  let barColor = 'bg-primary';
  let textColor = 'text-primary';
  let defaultLabel = 'OPR';

  switch (status) {
    case 'OPERATIONAL':
    case 'APPROVED':
    case 'COMPLETED':
    case 'RESOLVED_BY_AI':
      barColor = 'bg-[#4be277]';
      textColor = 'text-[#4be277]';
      defaultLabel = status === 'RESOLVED_BY_AI' ? 'AI-RESOLVED' : (label || 'OPR');
      break;
    case 'WARNING':
    case 'PENDING':
    case 'REQUESTED':
    case 'MODIFIED':
      barColor = 'bg-[#f97316]';
      textColor = 'text-[#f97316]';
      defaultLabel = label || (status === 'MODIFIED' ? 'MODIFIED' : 'WNG');
      break;
    case 'CRITICAL':
    case 'BLOCKED':
    case 'ACTIVE':
    case 'REJECTED':
      barColor = 'bg-[#ef4444]';
      textColor = 'text-[#ef4444]';
      defaultLabel = label || (status === 'REJECTED' ? 'REJECTED' : 'BLK');
      break;
    case 'AI_RECOMMENDED':
      barColor = 'bg-[#3b82f6]';
      textColor = 'text-[#9db2ff]';
      defaultLabel = label || 'AI-REC';
      break;
    case 'OVERRIDDEN':
      barColor = 'bg-purple-500';
      textColor = 'text-purple-400';
      defaultLabel = label || 'OVERRIDDEN';
      break;
    default:
      barColor = 'bg-primary';
      textColor = 'text-primary';
      defaultLabel = label || status;
  }

  return (
    <div className={`inline-flex items-center bg-[#161d16] border border-[#3d4a3d] px-2 py-0.5 text-[11px] font-mono font-bold tracking-wider ${className}`}>
      <span className={`w-1.5 h-3.5 mr-1.5 ${barColor} shrink-0`}></span>
      <span className={textColor}>{label || defaultLabel}</span>
    </div>
  );
};
