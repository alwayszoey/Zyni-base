import { AnimatePresence, motion } from 'motion/react';
import React, { useEffect, useRef, useState } from 'react';
import { servicesData } from '../data';
import { PriceTier, ServiceItem } from '../types';
import BotServiceCard from './BotServiceCard';
import Crosshair from './Crosshair';
import FadeContent from './FadeContent';

function RotatingPrice({
  items,
  interval = 3500,
  className = ''
}: {
  items: PriceTier[];
  interval?: number;
  className?: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return;
    const timer = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, interval);
    return () => window.clearInterval(timer);
  }, [items.length, interval]);

  const current = items[currentIndex];
  if (!current) return null;

  return (
    <div
      className={`service-hero-price rotating-price ${className}`.trim()}
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="rotating-price-viewport">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`${current.note}-${current.price}`}
            className="rotating-price-slide"
            initial={{ opacity: 0, y: 14, filter: 'blur(3px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -14, filter: 'blur(3px)' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="service-price-note">{current.note}</span>
            <strong className="service-price-value">{current.price}</strong>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function ServiceCard({
  title,
  desc,
  price,
  priceTiers,
  showHands = false,
  splitLayout = false
}: ServiceItem & { key?: React.Key }) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Main Website Service (Framed with Hands Deco & Site-Themed Luxury Black)
  if (showHands) {
    return (
      <div
        ref={cardRef}
        className="service-hero-card service-hero-card--themed"
        id="web-service"
      >
        <Crosshair containerRef={cardRef} color="rgba(255, 255, 255, 0.35)" />
        <div className="service-hero-glow" aria-hidden="true" />

        <div className="service-hero-inner">
          <FadeContent
            className="service-hero-deco-wrap service-hero-deco-wrap-left"
            blur
            duration={1000}
            delay={100}
            threshold={0.15}
          >
            <img
              src="/service-hands-left.png"
              alt=""
              className="service-hero-deco"
              aria-hidden="true"
            />
          </FadeContent>

          <div className="service-hero-content">
            {/* Subtle monochrome badge matching the site's design language */}
            <div className="service-pill-tag">
              <span>MAIN SERVICE • บริการหลัก</span>
            </div>

            <h3 className="service-hero-title">
              รับเขียนโค้ด &amp; พัฒนา <span className="service-title-badge">SYSTEM</span> ครบวงจร
            </h3>

            <p className="service-hero-desc">{desc}</p>

            {/* Scope / Stack capability pills */}
            <div className="service-scope-pills">
              <span className="service-scope-pill">Frontend (UI/UX)</span>
              <span className="service-scope-pill">Backend &amp; API</span>
              <span className="service-scope-pill">Security &amp; Hardening</span>
              <span className="service-scope-pill">Critical Systems</span>
            </div>

            {/* Rotating Price matching site typography */}
            {priceTiers && (
              <div className="service-pricing-block">
                <RotatingPrice items={priceTiers} />
                <span className="service-price-subnote text-center block">
                  * เรทราคาขึ้นอยู่กับขอบเขตและฟังก์ชันของแต่ละงาน
                </span>
              </div>
            )}

            <div className="service-hero-cta-wrap">
              <button
                type="button"
                className="service-hero-cta"
                onClick={() => {
                  document.getElementById('team')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span>ติดต่อเสนอราคา</span>
                <span aria-hidden="true">➔</span>
              </button>
            </div>
          </div>

          <FadeContent
            className="service-hero-deco-wrap service-hero-deco-wrap-right"
            blur
            duration={1000}
            delay={200}
            threshold={0.15}
          >
            <img
              src="/service-hands-right.png"
              alt=""
              className="service-hero-deco"
              aria-hidden="true"
            />
          </FadeContent>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={cardRef}
      className={`service-hero-card${splitLayout ? ' service-hero-card--plain' : ''}`}
    >
      {!splitLayout && (
        <>
          <Crosshair containerRef={cardRef} color="rgba(255, 255, 255, 0.35)" />
          <div className="service-hero-glow" aria-hidden="true" />
        </>
      )}

      <div className="service-hero-inner service-hero-inner--compact">
        <div className="service-hero-content">
          <h3 className="service-hero-title">{title}</h3>
          <p className="service-hero-desc">{desc}</p>
          {priceTiers ? (
            <div>
              <RotatingPrice items={priceTiers} />
              <span className="service-price-subnote text-center block" style={{ marginTop: '6px' }}>
                * เรทราคาขึ้นอยู่กับแต่ละงาน
              </span>
            </div>
          ) : (
            <div className="service-hero-price">
              <span className="service-price-note">เริ่มต้นเพียง</span>
              <strong className="service-price-value">{price}</strong>
              <span className="service-price-subnote">* เรทราคาขึ้นอยู่กับแต่ละงาน</span>
            </div>
          )}
          <div className="service-hero-cta-wrap">
            <button
              type="button"
              className="service-hero-cta"
              onClick={() => {
                document.getElementById('team')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              ติดต่อเสนอราคา➔
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ServicesSection() {
  return (
    <section className="services" id="services">
      <div className="services-header">
        <h2 className="services-heading">บริการหลักของเรา</h2>
        <p className="services-subtitle">รับพัฒนาซอฟต์แวร์ เขียนโค้ดครบวงจร และวางโครงสร้างระบบสำคัญสำหรับธุรกิจ</p>
      </div>

      <div className="service-hero-list">
        {servicesData.map((item) => {
          if (item.botBadges || item.title.includes('บอท') || item.title.includes('BOT')) {
            return <BotServiceCard key={item.title} />;
          }
          return <ServiceCard key={item.title} {...item} />;
        })}
      </div>
    </section>
  );
}
