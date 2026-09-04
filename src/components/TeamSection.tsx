import React from 'react';
import {
  developerInfo,
  socialLinks,
  teamHighlights
} from '../data';
import DiscordWidget from './DiscordWidget';
import FadeContent from './FadeContent';
import StoreStatusBadge from './StoreStatusBadge';

function SocialIcon({ type }: { type: 'instagram' | 'facebook' | 'email' | 'discord' }) {
  if (type === 'email') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect width="20" height="16" x="2" y="4" rx="3" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    );
  }
  if (type === 'discord') {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
      </svg>
    );
  }
  if (type === 'instagram') {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <circle cx="12" cy="12" r="4.2" />
        <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (type === 'facebook') {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
      </svg>
    );
  }
  return null;
}

function ContactWidget() {
  const [copiedKey, setCopiedKey] = React.useState<string | null>(null);

  const handleItemClick = (item: (typeof socialLinks)[0], e: React.MouseEvent) => {
    if (item.status === 'paused') {
      e.preventDefault();
      return;
    }
    if (item.copyable && item.detail) {
      // Copy value to clipboard
      navigator.clipboard?.writeText(item.detail).catch(() => {});
      setCopiedKey(item.label);
      setTimeout(() => setCopiedKey(null), 2200);
    }
  };

  return (
    <div className="team-widget team-widget--contact">
      <StoreStatusBadge variant="card" className="team-contact-status-card" />
      {socialLinks.map((item) => {
        const isPaused = item.status === 'paused';
        const isCopied = copiedKey === item.label;

        return (
          <a
            key={item.label}
            href={isPaused ? undefined : item.href}
            className={`team-contact-item ${isPaused ? 'team-contact-item--paused' : ''}`}
            target={isPaused ? undefined : '_blank'}
            rel={isPaused ? undefined : 'noreferrer'}
            onClick={(e) => handleItemClick(item, e)}
            style={isPaused ? { opacity: 0.52, cursor: 'not-allowed' } : undefined}
            title={isPaused ? 'งดให้บริการผ่านช่องทางนี้ชั่วคราว' : undefined}
          >
            <div className="team-contact-icon" aria-hidden="true">
              <SocialIcon type={item.icon} />
            </div>
            <div className="team-contact-body">
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <p className="team-contact-label">{item.label}</p>
                {isPaused && (
                  <span
                    style={{
                      fontSize: '10px',
                      background: 'rgba(239, 68, 68, 0.15)',
                      color: '#f87171',
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      padding: '1px 6px',
                      borderRadius: '9999px',
                      lineHeight: '1.3'
                    }}
                  >
                    งดบริการชั่วคราว
                  </span>
                )}
              </div>
              <p className="team-contact-detail">{item.detail}</p>
            </div>
            <span
              className={`team-contact-action ${isCopied ? 'team-contact-action--copied' : ''}`}
              style={
                isPaused
                  ? { background: 'rgba(255,255,255,0.05)', color: '#888', borderColor: 'transparent' }
                  : isCopied
                  ? { background: '#22c55e', color: '#fff', borderColor: '#22c55e' }
                  : undefined
              }
            >
              {isCopied ? 'คัดลอกแล้ว!' : item.action}
            </span>
          </a>
        );
      })}
    </div>
  );
}

export default function TeamSection() {
  return (
    <section className="team" id="team">
      <div className="team-banner">
        <h2 className="team-heading">ผู้พัฒนา</h2>
        <p className="team-subtitle">
          ทำคนเดียว ครบทุกขั้นตอน — คุยตรงกับคนทำจริง ไม่ผ่านคนกลาง
        </p>
      </div>

      <FadeContent
        className="team-solo-wrap"
        blur
        duration={1000}
        delay={80}
        threshold={0.12}
      >
        <article className="team-card--solo">
          <div className="team-card-avatar">
            <img
              src={developerInfo.image}
              alt=""
              className="team-card-avatar-img"
              aria-hidden="true"
            />
            <img
              src={developerInfo.frame}
              alt={developerInfo.name}
              className="team-card-avatar-frame"
            />
          </div>

          <div className="team-card-body">
            <h3 className="team-card-name">{developerInfo.name}</h3>
            <p className="team-card-role">{developerInfo.role}</p>
            <p className="team-card-desc">{developerInfo.desc}</p>
            <ul className="team-card-tags">
              {developerInfo.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </div>
        </article>
      </FadeContent>

      <div className="team-highlights">
        {teamHighlights.map((hl, idx) => (
          <FadeContent
            key={hl.title}
            className="team-highlight-col"
            blur
            duration={1000}
            delay={120 + idx * 120}
            threshold={0.12}
          >
            <h3 className="team-highlight-title">{hl.title}</h3>
            <p className="team-highlight-desc">{hl.desc}</p>
            {hl.type === 'discord' ? <DiscordWidget /> : <ContactWidget />}
          </FadeContent>
        ))}
      </div>
    </section>
  );
}
