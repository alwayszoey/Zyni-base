import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, MessageCircle, ArrowRight } from 'lucide-react';

export interface AnnouncementModalProps {
  onNavigateToContact?: () => void;
}

export default function AnnouncementModal({ onNavigateToContact }: AnnouncementModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if dismissed in this session
    const isDismissed = sessionStorage.getItem('zyni_announcement_seen');
    if (!isDismissed) {
      // Delay slightly for smooth transition after intro
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('zyni_announcement_seen', 'true');
  };

  const handleAction = () => {
    handleClose();
    if (onNavigateToContact) {
      onNavigateToContact();
    } else {
      const contactEl = document.getElementById('team') || document.getElementById('services');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="announcement-portal" role="dialog" aria-modal="true" aria-labelledby="announcement-title">
          {/* Frosted blurred backdrop */}
          <motion.div
            className="announcement-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            onClick={handleClose}
          />

          {/* Frosted Transparent Glass Modal Card */}
          <motion.div
            className="announcement-card-wrap"
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
          >
            <div className="announcement-card">
              {/* Close Button */}
              <button
                type="button"
                className="announcement-close"
                onClick={handleClose}
                aria-label="ปิดประกาศ"
              >
                <X size={18} />
              </button>

              {/* Tag / Badge */}
              <div className="announcement-badge">
                <span className="announcement-badge-pulse" />
                <Sparkles size={13} className="announcement-badge-icon" />
                <span>ข่าวสาร & อัปเดต</span>
              </div>

              {/* Title */}
              <h2 id="announcement-title" className="announcement-title">
                ยินดีต้อนรับสู่ Zyni 👋
              </h2>

              {/* Body Content */}
              <div className="announcement-body">
                <p className="announcement-text-main">
                  เปิดรับคิวงาน <strong>พัฒนาเว็บไซต์ & ออกแบบระบบเว็บ</strong> อย่างเป็นทางการ!
                </p>

                <div className="announcement-features">
                  <div className="announcement-feature-item">
                    <span className="announcement-feature-dot" />
                    <span><strong>คุยง่าย ปรึกษาฟรี:</strong> ไม่ต้องเกรงใจ ทักมาสอบถามแนวคิด ออกแบบ หรือประเมินราคาก่อนได้ตลอด</span>
                  </div>
                  <div className="announcement-feature-item">
                    <span className="announcement-feature-dot" />
                    <span><strong>ราคาสบายกระเป๋า:</strong> งานหน้าเว็บและระบบเริ่มต้นเพียง 100 บาท ตอบโจทย์ทุกความต้องการ</span>
                  </div>
                  <div className="announcement-feature-item">
                    <span className="announcement-feature-dot" />
                    <span><strong>ดูแลจนพร้อมใช้งานจริง:</strong> คุยตรงกับนักพัฒนาโดยตรง ปรับแต่งได้ตามใจและมีประกันดูแลหลังส่งมอบ</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="announcement-actions">
                <button
                  type="button"
                  className="announcement-btn-primary"
                  onClick={handleAction}
                >
                  <MessageCircle size={16} />
                  <span>ทักมาปรึกษาเรา</span>
                  <ArrowRight size={15} />
                </button>
                <button
                  type="button"
                  className="announcement-btn-secondary"
                  onClick={handleClose}
                >
                  เข้าใจแล้ว / เข้าดูเว็บไซต์
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
