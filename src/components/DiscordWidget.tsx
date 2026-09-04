import React, { useEffect, useState } from 'react';
import { discordServerConfig } from '../data';

export interface DiscordServerData {
  guildId: string;
  name: string;
  onlineCount: number;
  memberCount: number;
  iconUrl: string | null;
  inviteUrl: string;
  isRealtime?: boolean;
}

function formatNumber(num: number): string {
  return new Intl.NumberFormat('th-TH').format(num);
}

export default function DiscordWidget() {
  const [server, setServer] = useState<DiscordServerData | null>(null);

  useEffect(() => {
    let active = true;

    async function fetchServerStatus() {
      try {
        const res = await fetch('/api/discord/server');
        if (res.ok) {
          const json = await res.json();
          if (active) {
            setServer(json);
          }
          return;
        }
      } catch {
        // Fallback handled below
      }

      if (active) {
        setServer({
          guildId: discordServerConfig.guildId,
          ...discordServerConfig.fallbackData
        });
      }
    }

    fetchServerStatus();
    // Auto-refresh from backend every 30 seconds
    const interval = setInterval(fetchServerStatus, 30000);
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, []);

  const inviteUrl = server?.inviteUrl || discordServerConfig.defaultInviteUrl;
  const guildName = server?.name || discordServerConfig.name;
  const onlineCount = server ? formatNumber(server.onlineCount) : '—';
  const memberCount = server ? formatNumber(server.memberCount) : '—';

  return (
    <div className="team-widget team-widget--discord" id="discord-server-widget">
      <div className="team-widget-discord-top">
        <div
          className={`team-widget-discord-icon${server?.iconUrl ? ' team-widget-discord-icon--live' : ''}`}
          aria-hidden={server?.iconUrl ? undefined : true}
        >
          {server?.iconUrl ? (
            <img
              src={server.iconUrl}
              alt={guildName}
              className="team-widget-discord-icon-img"
              referrerPolicy="no-referrer"
            />
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a" />
            </svg>
          )}
        </div>

        <div className="team-widget-discord-meta">
          <p className="team-widget-discord-name">
            <span>{guildName}</span>
            <span className="team-widget-verified" title="Verified Community Server">
              ✓
            </span>
          </p>

          <div className="team-widget-discord-stats">
            <span className="team-widget-stat" title="จำนวนสมาชิกที่ออนไลน์อยู่ในขณะนี้">
              <span className="team-widget-dot team-widget-dot--online" />
              <strong>{onlineCount}</strong> ออนไลน์
            </span>
            <span className="team-widget-stat" title="จำนวนสมาชิกทั้งหมดในเซิร์ฟเวอร์">
              <span className="team-widget-dot team-widget-dot--idle" />
              <strong>{memberCount}</strong> สมาชิก
            </span>
          </div>
        </div>
      </div>

      <div className="team-widget-discord-join">
        <span className="discord-join-label">เข้าร่วมพูดคุยกับเราในคอมมูนิตี้</span>
        <a
          href={inviteUrl}
          target="_blank"
          rel="noreferrer"
          className="team-widget-join-btn"
          id="btn-discord-join"
        >
          <span>เข้าร่วมเซิร์ฟเวอร์</span>
        </a>
      </div>
    </div>
  );
}
