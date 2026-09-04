import React, { useEffect, useState } from 'react';
import { navItems } from '../data';
import StoreStatusBadge from './StoreStatusBadge';
import DiscordAuthButton from './DiscordAuthButton';

export interface NavbarProps {
  activeSection: string | null;
  onNavigate: (sectionId: string | null) => void;
  isReady: boolean;
}

export default function Navbar({ activeSection, onNavigate, isReady }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [compact, setCompact] = useState(0);

  useEffect(() => {
    if (!isReady) return;

    let rafId = 0;
    let target = 0;
    let current = 0;

    const loop = () => {
      current += (target - current) * 0.12;
      if (Math.abs(target - current) < 0.001) {
        current = target;
      }
      setCompact(current);
      if (Math.abs(target - current) > 0.001) {
        rafId = requestAnimationFrame(loop);
      } else {
        rafId = 0;
      }
    };

    const handleScroll = () => {
      target = Math.min(1, Math.max(0, window.scrollY / 120));
      if (!rafId) {
        rafId = requestAnimationFrame(loop);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isReady]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.classList.add('nav-menu-open');
    } else {
      document.body.classList.remove('nav-menu-open');
    }
    return () => {
      document.body.classList.remove('nav-menu-open');
    };
  }, [mobileOpen]);

  const handleLinkClick = (e: React.MouseEvent, sectionId: string | null) => {
    e.preventDefault();
    setMobileOpen(false);
    onNavigate(sectionId);
  };

  return (
    <>
      <header className="navbar" style={{ '--nav-compact': compact } as React.CSSProperties}>
        <a
          href="/"
          className="brand"
          onClick={(e) => handleLinkClick(e, null)}
        >
          <img
            src="/nav-logo.png"
            alt="Zyni"
            className="brand-logo"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <span className="brand-text">Zyni</span>
        </a>

        <nav className="nav-links">
          {navItems.map((item) => {
            const isActive = activeSection === item.sectionId;
            return (
              <a
                key={item.label}
                href="/"
                className={isActive ? 'nav-link active' : 'nav-link'}
                aria-current={isActive ? 'page' : undefined}
                onClick={(e) => handleLinkClick(e, item.sectionId)}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="navbar-actions">
          <StoreStatusBadge variant="compact" />
          <DiscordAuthButton />
          <a
            href="/"
            className="btn-contact"
            onClick={(e) => handleLinkClick(e, 'team')}
          >
            ติดต่อเรา
          </a>
        </div>

        <button
          type="button"
          className={`nav-menu-toggle${mobileOpen ? ' nav-menu-toggle--open' : ''}`}
          aria-label={mobileOpen ? 'ปิดเมนู' : 'เปิดเมนู'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>
      </header>

      <div
        className={`nav-mobile${mobileOpen ? ' nav-mobile--open' : ''}`}
        aria-hidden={!mobileOpen}
      >
        <button
          type="button"
          className="nav-mobile-backdrop"
          aria-label="ปิดเมนู"
          tabIndex={mobileOpen ? 0 : -1}
          onClick={() => setMobileOpen(false)}
        />
        <nav className="nav-mobile-panel" id="mobile-nav">
          <div className="nav-mobile-status">
            <StoreStatusBadge variant="compact" />
          </div>
          <div className="nav-mobile-auth">
            <DiscordAuthButton />
          </div>
          {navItems.map((item) => {
            const isActive = activeSection === item.sectionId;
            return (
              <a
                key={item.label}
                href="/"
                className={isActive ? 'nav-mobile-link active' : 'nav-mobile-link'}
                aria-current={isActive ? 'page' : undefined}
                tabIndex={mobileOpen ? 0 : -1}
                onClick={(e) => handleLinkClick(e, item.sectionId)}
              >
                {item.label}
              </a>
            );
          })}
          <a
            href="/"
            className="btn-contact btn-contact--mobile"
            tabIndex={mobileOpen ? 0 : -1}
            onClick={(e) => handleLinkClick(e, 'team')}
          >
            ติดต่อเรา
          </a>
        </nav>
      </div>

      <div className="navbar-spacer" aria-hidden="true" />
    </>
  );
}
