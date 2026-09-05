import { Bot } from 'lucide-react';
import React, { useRef } from 'react';

export default function BotServiceCard() {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleScrollToContact = () => {
    const el = document.getElementById('team');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div ref={cardRef} className="bot-secondary-card" id="bot-service">
      <div className="bot-secondary-inner">
        {/* Left / Content Column */}
        <div className="bot-secondary-info">
          <div className="bot-secondary-eyebrow">
            <Bot className="bot-sec-eyebrow-icon" />
            <span className="bot-sec-eyebrow-text">บริการเสริม • AUTOMATION &amp; SCRIPT</span>
          </div>

          <h3 className="bot-secondary-title">
            รับงานเขียน <span className="bot-secondary-badge">BOT</span> &amp; สคริปต์อัตโนมัติ
          </h3>

          <p className="bot-secondary-desc">
            พัฒนาบอท Discord, Telegram และสคริปต์ Webhook สำหรับแจ้งเตือน เชื่อมต่อ API หรือจัดการระบบอัตโนมัติในคอมมูนิตี้และองค์กร
          </p>

          <div className="bot-secondary-pills">
            <span className="bot-sec-pill">Discord Bot</span>
            <span className="bot-sec-pill">Telegram</span>
            <span className="bot-sec-pill">Webhook Alert</span>
            <span className="bot-sec-pill">Custom API</span>
            <span className="bot-sec-pill">24/7 VPS Deploy</span>
          </div>
        </div>

        {/* Right / Pricing & Secondary Action */}
        <div className="bot-secondary-side">
          <div className="bot-secondary-pricing">
            <span className="bot-sec-price-label">เริ่มต้นเพียง</span>
            <strong className="bot-sec-price-value">100 บาท</strong>
            <span className="bot-sec-price-sub">* เรทราคาตามสเกลและฟังก์ชัน</span>
          </div>

          <button
            type="button"
            className="bot-secondary-cta"
            onClick={handleScrollToContact}
          >
            <span>สอบถามงานบอท</span>
            <span aria-hidden="true" className="bot-sec-arrow">➔</span>
          </button>
        </div>
      </div>
    </div>
  );
}

