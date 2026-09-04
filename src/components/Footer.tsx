import React from 'react';

interface FooterProps {
  onNavigateTerms?: (tab?: string, e?: React.MouseEvent) => void;
}

export default function Footer({ onNavigateTerms }: FooterProps) {
  const handleTermClick = (e: React.MouseEvent) => {
    if (onNavigateTerms) {
      onNavigateTerms('all', e);
    }
  };

  return (
    <footer className="site-footer" id="site-footer">
      <div className="site-footer-inner">
        <p className="site-footer-copy">
          © {new Date().getFullYear()} Zyni Dev. All rights reserved.
        </p>
        <div className="site-footer-links">
          <a
            href="/home/terms"
            onClick={handleTermClick}
            className="site-footer-term-link"
            id="footer-terms-link"
          >
            Terms of Service
          </a>
          <span className="site-footer-dot" aria-hidden="true">•</span>
          <p className="site-footer-credit">
            Made with <span aria-hidden="true" style={{ color: '#ef4444' }}>♥</span> by 480p
          </p>
        </div>
      </div>
    </footer>
  );
}


