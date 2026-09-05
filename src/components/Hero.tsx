import React from 'react';
import ShinyText from './ShinyText';
import StoreStatusBadge from './StoreStatusBadge';

export interface HeroProps {
  onNavigate: (sectionId: string, e?: React.MouseEvent) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const handleClick = (sectionId: string, e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate(sectionId, e);
  };

  return (
    <main className="hero">
      <div className="hero-brand">
        <h1 className="hero-brand-title hero-brand-title--logo-z" aria-label="Zyni">
          <img
            src="/zyni-logo.png"
            alt=""
            className="hero-brand-z-logo"
            aria-hidden="true"
            referrerPolicy="no-referrer"
          />
          <span className="hero-brand-text-rest">yni</span>
        </h1>
      </div>

      <div className="hero-body">
        <p className="hero-headline">
          รับพัฒนาเว็บไซต์ & ออกแบบระบบเว็บครบวงจร{' '}
          <ShinyText
            text='"เริ่มต้นเพียง 100 บาท"'
            className="highlight"
            color="#cccccc"
            shineColor="#ffffff"
            speed={2.5}
            spread={120}
          />{' '}
          คุยง่าย เป็นกันเอง พร้อมให้คำปรึกษาฟรีทุกไอเดีย
        </p>

        <p className="hero-desc">
          เปลี่ยนไอเดียให้กลายเป็นเว็บไซต์จริง ทั้งหน้าเว็บแนะนำตัว เว็บโปรโมทธุรกิจ และระบบเว็บแอปพลิเคชันที่ใช้งานง่าย
          <br />
          ดูแลใส่ใจทุกขั้นตอนตั้งแต่ต้นจนพร้อมใช้งานจริง คุยตรงกับนักพัฒนาโดยตรง ปรับแต่งได้ตามใจ สบายใจได้ทุกโปรเจกต์
        </p>

        <div className="hero-actions">
          <a
            href="/"
            className="btn-depth btn-depth-primary"
            onClick={(e) => handleClick('services', e)}
          >
            <span className="btn-depth-shadow" aria-hidden="true" />
            <span className="btn-depth-face">บริการต่างๆ</span>
          </a>
          <a
            href="/"
            className="btn-depth btn-depth-outline"
            onClick={(e) => handleClick('portfolio', e)}
          >
            <span className="btn-depth-shadow" aria-hidden="true" />
            <span className="btn-depth-face">ดูผลงาน</span>
          </a>
        </div>

        <div className="hero-status-wrap">
          <StoreStatusBadge variant="hero" />
        </div>
      </div>

        <a
          href="/"
          className="hero-scroll-hint"
          aria-label="เลื่อนลง"
          onClick={(e) => handleClick('services', e)}
        >
          <span className="hero-scroll-line" aria-hidden="true" />
          <span className="hero-scroll-chevron" aria-hidden="true">
            <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
              <path
                d="M1 1.5L7 6.5L13 1.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </a>
      </main>
  );
}
