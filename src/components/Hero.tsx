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
        <h1 className="hero-brand-title">Zyni</h1>
      </div>

      <div className="hero-body">
        <p className="hero-headline">
          รับทำเว็บ เขียนระบบ & บอทตามสั่ง{' '}
          <ShinyText
            text='"ราคาเริ่มต้น 100 บาท"'
            className="highlight"
            color="#cccccc"
            shineColor="#ffffff"
            speed={2.5}
            spread={120}
          />{' '}
          คุยง่าย สบายๆ ปรึกษาได้ตลอด
        </p>

        <p className="hero-desc">
          อยากได้เว็บสวย ระบบหลังบ้านเสถียร หรือบอทช่วยทุ่นแรง ทักมาปรึกษาไอเดียกันก่อนได้เลยครับ
          <br />
          ดูแลตั้งแต่เริ่มวางแผนจนระบบใช้งานได้จริง คุยตรงกับคนทำ ไม่ยุ่งยาก เป็นกันเองแน่นอน
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
