import { Bot, Cpu, ShieldCheck, Terminal, Zap } from 'lucide-react';
import React, { useRef } from 'react';
import Crosshair from './Crosshair';

interface BotFeature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
}

const botFeatures: BotFeature[] = [
  {
    icon: Terminal,
    title: 'Slash Commands & UI',
    desc: 'รองรับคำสั่ง / ทันสมัย ปุ่มกด ดรอปดาวน์ และฟอร์ม Modal'
  },
  {
    icon: Zap,
    title: 'Automation & Webhook',
    desc: 'ระบบตรวจจับงานอัตโนมัติ ดึงข้อมูล และแจ้งเตือนเรียลไทม์'
  },
  {
    icon: ShieldCheck,
    title: 'API & Payment Integration',
    desc: 'เชื่อมต่อระบบตรวจสอบสลิป ทรูมันนี่ และ API ภายนอก'
  },
  {
    icon: Cpu,
    title: '24/7 Hosting & Deployment',
    desc: 'ติดตั้งบน VPS คลาวด์เสถียร ไม่ดับ ดูแลและให้คำปรึกษาตลอด'
  }
];

export default function BotServiceCard() {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleScrollToContact = () => {
    const el = document.getElementById('team');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div ref={cardRef} className="service-hero-card bot-card-themed" id="bot-service">
      <Crosshair containerRef={cardRef} color="rgba(255, 255, 255, 0.35)" />
      <div className="service-hero-glow" aria-hidden="true" />

      <div className="service-hero-inner bot-card-inner">
        <div className="bot-card-content">
          {/* Subtle Status Eyebrow matching the site's store-status style */}
          <div className="bot-eyebrow-pill">
            <span className="store-status-dot-wrap" aria-hidden="true">
              <span className="store-status-ping bg-emerald-400" />
              <span className="store-status-dot bg-emerald-400" />
            </span>
            <span className="bot-eyebrow-text">BOT &amp; AUTOMATION SYSTEMS</span>
          </div>

          {/* Heading with brand red badge */}
          <h3 className="service-hero-title bot-hero-title">
            รับงานเขียน <span className="service-title-badge">BOT</span>
          </h3>

          {/* Description */}
          <p className="service-hero-desc bot-hero-desc">
            พัฒนาบอท Discord, Telegram และระบบออโตเมชันครบวงจร ติดตั้งคำสั่ง ออโตเมชัน ระบบเชื่อมต่อ API และการจัดการสิทธิ์
          </p>

          {/* Supported Platforms / Tags */}
          <div className="bot-platform-pills">
            <span className="bot-platform-item">Discord</span>
            <span className="bot-platform-dot">•</span>
            <span className="bot-platform-item">Telegram</span>
            <span className="bot-platform-dot">•</span>
            <span className="bot-platform-item">Webhook</span>
            <span className="bot-platform-dot">•</span>
            <span className="bot-platform-item">Custom API</span>
            <span className="bot-platform-dot">•</span>
            <span className="bot-platform-item">Cloud 24/7</span>
          </div>

          {/* 4 Feature Cards (in site's obsidian/frosted dark luxury aesthetic) */}
          <div className="bot-feature-matrix">
            {botFeatures.map((feat) => {
              const IconComponent = feat.icon;
              return (
                <div key={feat.title} className="bot-matrix-item">
                  <div className="bot-matrix-icon-wrap">
                    <IconComponent className="bot-matrix-icon" />
                  </div>
                  <div className="bot-matrix-text">
                    <h4 className="bot-matrix-title">{feat.title}</h4>
                    <p className="bot-matrix-desc">{feat.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pricing Section in exact site typography */}
          <div className="service-hero-price bot-pricing-wrap">
            <span className="service-price-note">เริ่มต้นเพียง</span>
            <strong className="service-price-value">100 บาท</strong>
            <span className="service-price-subnote">* เรทราคาขึ้นอยู่กับแต่ละงาน</span>
          </div>

          {/* Standard Site White Pill CTA Button */}
          <div className="service-hero-cta-wrap">
            <button
              type="button"
              className="service-hero-cta"
              onClick={handleScrollToContact}
            >
              ติดต่อเสนอราคา➔
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
