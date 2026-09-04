import React, { useState, useRef, useEffect } from 'react';
import { LogIn, LogOut, CheckCircle, Shield, ExternalLink, Bot } from 'lucide-react';
import { useDiscordAuth } from '../hooks/useDiscordAuth';

export default function DiscordAuthButton({ className = '' }: { className?: string }) {
  const {
    user,
    isAuthenticated,
    isAuthorizing,
    authError,
    authSuccessNotice,
    appInfo,
    login,
    logout
  } = useDiscordAuth();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`discord-auth-wrapper ${className}`} ref={dropdownRef}>
      {/* Toast Notice */}
      {authSuccessNotice && (
        <div className="discord-auth-toast">
          <CheckCircle size={14} className="text-green-400 shrink-0" />
          <span>{authSuccessNotice}</span>
        </div>
      )}

      {authError && (
        <div className="discord-auth-toast discord-auth-toast--error">
          <span>{authError}</span>
        </div>
      )}

      {!isAuthenticated ? (
        <button
          type="button"
          onClick={() => login('popup')}
          disabled={isAuthorizing}
          className="btn-discord-login"
          title="เข้าสู่ระบบด้วย Discord (Client ID: 1455511992218419297)"
        >
          <svg className="btn-discord-login-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a" />
          </svg>
          <span className="btn-discord-login-text">
            {isAuthorizing ? 'กำลังเชื่อมต่อ...' : 'เข้าสู่ระบบ'}
          </span>
        </button>
      ) : (
        <div className="discord-user-profile-relative">
          <button
            type="button"
            className="discord-user-trigger"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            aria-expanded={dropdownOpen}
          >
            <div className="discord-user-avatar-wrap">
              <img
                src={user?.avatarUrl || 'https://cdn.discordapp.com/embed/avatars/0.png'}
                alt={user?.globalName || user?.username}
                className="discord-user-avatar-img"
              />
              <span className="discord-user-status-dot" />
            </div>
            <span className="discord-user-name">
              {user?.globalName || user?.username}
            </span>
          </button>

          {/* Profile Dropdown */}
          {dropdownOpen && (
            <div className="discord-profile-dropdown">
              <div className="discord-dropdown-header">
                <div className="discord-dropdown-avatar">
                  <img
                    src={user?.avatarUrl || 'https://cdn.discordapp.com/embed/avatars/0.png'}
                    alt=""
                  />
                </div>
                <div className="discord-dropdown-user-info">
                  <p className="discord-dropdown-name">{user?.globalName || user?.username}</p>
                  <p className="discord-dropdown-handle">@{user?.username}</p>
                </div>
              </div>

              <div className="discord-dropdown-details">
                <div className="discord-dropdown-detail-row">
                  <Bot size={13} className="text-[#5865F2]" />
                  <span>แอปพลิเคชัน: <strong>{appInfo.name}</strong></span>
                </div>
                <div className="discord-dropdown-detail-row">
                  <Shield size={13} className="text-emerald-400" />
                  <span>Client ID: <code className="text-[11px]">{appInfo.clientId}</code></span>
                </div>
              </div>

              <div className="discord-dropdown-actions">
                <a
                  href={appInfo.oauthUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="discord-dropdown-link"
                >
                  <span>จัดการสิทธิ์แอปใน Discord</span>
                  <ExternalLink size={12} />
                </a>

                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setDropdownOpen(false);
                  }}
                  className="discord-dropdown-logout-btn"
                >
                  <LogOut size={13} />
                  <span>ออกจากระบบ</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
