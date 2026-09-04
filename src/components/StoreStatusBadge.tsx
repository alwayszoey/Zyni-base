import { Clock } from 'lucide-react';
import { useBusinessHours } from '../hooks/useBusinessHours';

interface StoreStatusBadgeProps {
  variant?: 'compact' | 'hero' | 'card';
  className?: string;
}

export default function StoreStatusBadge({
  variant = 'compact',
  className = ''
}: StoreStatusBadgeProps) {
  const status = useBusinessHours();

  if (variant === 'hero') {
    return (
      <div
        className={`store-status-hero ${status.isOpen ? 'store-status-hero--open' : 'store-status-hero--closed'} ${className}`.trim()}
        title={status.hint}
      >
        <span className="store-status-dot-wrap">
          <span className="store-status-ping" aria-hidden="true" />
          <span className="store-status-dot" aria-hidden="true" />
        </span>
        <span className="store-status-badge-text">
          <strong className="store-status-state">{status.isOpen ? 'เปิดรับงาน' : 'ปิดรับงาน'}</strong>
        </span>
        <span className="store-status-divider" aria-hidden="true" />
        <span className="store-status-hours">06:00 - 00:00</span>
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <div
        className={`store-status-card ${status.isOpen ? 'store-status-card--open' : 'store-status-card--closed'} ${className}`.trim()}
      >
        <div className="store-status-card-header">
          <span className="store-status-dot-wrap">
            <span className="store-status-ping" aria-hidden="true" />
            <span className="store-status-dot" aria-hidden="true" />
          </span>
          <span className="store-status-card-title">
            สถานะร้าน: <strong>{status.fullStatus}</strong> ({status.statusLabel})
          </span>
          <span className="store-status-card-time">{status.formattedTime}</span>
        </div>
        <div className="store-status-card-body">
          <div className="store-status-card-row">
            <Clock className="store-status-card-icon" size={14} />
            <span>เวลาเปิดทำการ: <strong>{status.hoursLabel}</strong></span>
          </div>
          <p className="store-status-card-hint">{status.hint}</p>
        </div>
      </div>
    );
  }

  // Compact variant (for Navbar & Mobile menu)
  return (
    <div
      className={`store-status-compact ${status.isOpen ? 'store-status-compact--open' : 'store-status-compact--closed'} ${className}`.trim()}
      title={`${status.fullStatus} (เวลาทำการ ${status.hoursLabel})`}
    >
      <span className="store-status-dot-wrap">
        <span className="store-status-ping" aria-hidden="true" />
        <span className="store-status-dot" aria-hidden="true" />
      </span>
      <span className="store-status-compact-text">
        <strong className="store-status-state">{status.statusLabel}</strong>
        <span className="store-status-compact-hours">06:00 - 00:00</span>
      </span>
    </div>
  );
}
