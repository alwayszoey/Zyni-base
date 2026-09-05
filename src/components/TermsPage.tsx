import React, { useEffect, useState } from 'react';

interface TermsPageProps {
  onBack: () => void;
  initialTab?: string;
}

export default function TermsPage({ onBack, initialTab = 'all' }: TermsPageProps) {
  const [activeTab, setActiveTab] = useState<string>(initialTab);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const tabs = [
    { id: 'all', label: 'ทั้งหมด' },
    { id: 'knowledge', label: 'ข้อควรรู้ก่อนจ้าง' },
    { id: 'pricing-guide', label: 'การคิดเรทราคาตัวอย่าง' },
    { id: 'faq', label: 'คำถามที่พบบ่อย' },
    { id: 'general', label: 'ข้อตกลงทั่วไป' },
    { id: 'payment', label: 'การชำระเงิน & มัดจำ' },
    { id: 'revision', label: 'การแก้ไขงาน' },
    { id: 'warranty', label: 'การรับประกัน' },
    { id: 'privacy', label: 'ความเป็นส่วนตัว' }
  ];

  return (
    <div className="terms-page-wrapper">
      <div className="terms-container">
        {/* Top Bar Navigation */}
        <header className="terms-header">
          <button
            type="button"
            className="terms-back-btn"
            onClick={onBack}
            id="terms-back-button"
            aria-label="ย้อนกลับหน้าหลัก"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="terms-back-icon"
              aria-hidden="true"
            >
              <path d="M19 12H5" />
              <path d="m12 19-7-7 7-7" />
            </svg>
            <span>ย้อนกลับ</span>
          </button>

          <div className="terms-brand-badge">
            <span className="terms-brand-dot" aria-hidden="true" />
            <span className="terms-brand-name">Zyni</span>
            <span className="terms-brand-sep">•</span>
            <span className="terms-brand-version">อัปเดต 2026</span>
          </div>
        </header>

        {/* Hero Title */}
        <div className="terms-hero">
          <span className="terms-hero-tag">Client Knowledge & Service Agreement</span>
          <h1 className="terms-title">ข้อตกลง เงื่อนไข และข้อควรรู้ก่อนจ้างงาน</h1>
          <p className="terms-subtitle">
            รวบรวมข้อตกลง ขอบเขตงาน นโยบายการชำระเงิน พร้อมความรู้เบื้องต้นและคำแนะนำที่จำเป็น
            เพื่อให้เข้าใจตรงกัน ทำงานราบรื่น และได้ระบบที่มีคุณภาพตรงใจที่สุด
          </p>
        </div>

        {/* Quick Tabs */}
        <div className="terms-tab-bar" role="tablist">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`terms-tab-btn ${activeTab === tab.id ? 'terms-tab-btn--active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              id={`terms-tab-${tab.id}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Terms Content Sections */}
        <div className="terms-content">
          {/* Section: ข้อควรรู้ก่อนจ้าง (Comprehensive Client Guide) */}
          {(activeTab === 'all' || activeTab === 'knowledge') && (
            <section className="terms-section" id="section-knowledge">
              <div className="terms-section-head">
                <div className="terms-section-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="16" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12.01" y2="8" />
                  </svg>
                </div>
                <div>
                  <h2 className="terms-section-title">สิ่งที่ควรรู้และเตรียมตัวก่อนจ้างงาน (Client Guide & Preparation)</h2>
                  <p className="terms-section-desc">รวมทุกเรื่องสำคัญที่ผู้ว่าจ้างควรรู้ ช่วยให้งานเสร็จไว ประหยัดงบ และได้ระบบที่ตรงใจที่สุด</p>
                </div>
              </div>

              <div className="terms-cards-grid">
                <div className="terms-card">
                  <h3 className="terms-card-title">1. การเตรียมบรีฟและข้อมูลก่อนเริ่มงาน (Pre-Project Checklist)</h3>
                  <p className="terms-card-text">
                    ยิ่งมีข้อมูลชัดเจน งานจะยิ่งเสร็จรวดเร็วและตรงความต้องการ แนะนำให้เตรียมสิ่งเหล่านี้:
                  </p>
                  <ul className="terms-list" style={{ marginTop: '8px' }}>
                    <li>
                      <strong>ฟังก์ชันที่ต้องมี (Must-Have):</strong> ลิสต์สิ่งที่ระบบจำเป็นต้องทำได้ เช่น ระบบล็อกอิน, ระบบตรวจสลิป, ฟอร์มติดต่อ
                    </li>
                    <li>
                      <strong>ตัวอย่างหรือ Reference:</strong> ลิงก์เว็บหรือบอทที่ชอบ ช่วยให้เห็นภาพสไตล์ โครงสร้าง และโทนสีตรงกันทันที
                    </li>
                    <li>
                      <strong>วัตถุดิบและไฟล์ (Assets):</strong> โลโก้ (ไฟล์เวกเตอร์ หรือ PNG โปร่งใส), รูปภาพสินค้า, ข้อความประกอบ
                    </li>
                  </ul>
                </div>

                <div className="terms-card">
                  <h3 className="terms-card-title">2. ลำดับขั้นตอนการทำงานแบบเป็นระบบ (5-Step Workflow)</h3>
                  <ul className="terms-list">
                    <li>
                      <strong>1. ปรึกษา & สรุปขอบเขตงาน:</strong> พูดคุยฟังก์ชันที่ต้องการ พร้อมประเมินราคาและไทม์ไลน์ที่ชัดเจน
                    </li>
                    <li>
                      <strong>2. ชำระมัดจำ 50%:</strong> ล็อกคิวงานและเริ่มต้นออกแบบโครงสร้างระบบทันที
                    </li>
                    <li>
                      <strong>3. ดำเนินการพัฒนา:</strong> เขียนโค้ดตามสเปก พร้อมส่งความคืบหน้าให้ชมเป็นระยะ
                    </li>
                    <li>
                      <strong>4. ทดสอบบนระบบ Demo:</strong> นำระบบขึ้น Demo ให้ลูกค้าได้ทดลองคลิก ทดลองใช้งานจริง
                    </li>
                    <li>
                      <strong>5. ส่งมอบ & ขึ้นระบบจริง:</strong> ชำระยอดคงเหลือ ส่งมอบซอร์สโค้ด และช่วยเซ็ตอัปขึ้นเซิร์ฟเวอร์
                    </li>
                  </ul>
                </div>

                <div className="terms-card">
                  <h3 className="terms-card-title">3. โดเมน & เซิร์ฟเวอร์ / โฮสติ้ง (Domain & Server 101)</h3>
                  <p className="terms-card-text">
                    <strong>ชื่อโดเมน (.com / .net / .in.th):</strong> แนะนำให้ลูกค้าสมัครและเป็นเจ้าของบัญชีเองโดยตรง (เช่น Cloudflare หรือ Namecheap) เพื่อสิทธิ์ขาดในความเป็นเจ้าของ โดยทางเราช่วยชี้ DNS และตั้งค่า SSL ให้ฟรีทั้งหมด
                    <br />
                    <strong>เซิร์ฟเวอร์/โฮสติ้ง:</strong> เว็บไซต์ทั่วไปสามารถใช้ Cloudflare Pages หรือ Vercel ได้ฟรีอย่างรวดเร็วและเสถียร ส่วนระบบเว็บแอปหรือบอทที่มีฐานข้อมูล แนะนำเช่า Cloud VPS เริ่มต้นเพียง 100-200 บาท/เดือน ชำระตรงกับผู้ให้บริการตามจริง ไม่มีบวกกำไรเพิ่ม
                  </p>
                </div>

                <div className="terms-card">
                  <h3 className="terms-card-title">4. ข้อควรรู้เกี่ยวกับบอท Discord & ระบบออโตเมชัน</h3>
                  <p className="terms-card-text">
                    <strong>การเปิดเครื่อง 24/7:</strong> บอทต้องรันบนเซิร์ฟเวอร์ (VPS / Cloud) ตลอดเวลา เพื่อให้พร้อมตอบคำสั่งสมาชิกในเซิร์ฟเวอร์ ไม่สามารถรันบนคอมส่วนตัวแล้วปิดเครื่องได้
                    <br />
                    <strong>Discord Gateway Intents:</strong> บอทที่ต้องการอ่านข้อความ (Message Content) หรือตรวจเช็กสมาชิก (Server Members) ต้องเข้าไปเปิดสิทธิ์ใน Discord Developer Portal (เราแนะนำวิธีทำให้)
                    <br />
                    <strong>ความปลอดภัย Bot Token:</strong> Token เปรียบเสมือนกุญแจหลักของบอท ห้ามส่งต่อให้บุคคลอื่นเด็ดขาด
                  </p>
                </div>

                <div className="terms-card">
                  <h3 className="terms-card-title">5. สิทธิ์และความเป็นเจ้าของซอร์สโค้ด (100% Code Ownership)</h3>
                  <p className="terms-card-text">
                    เมื่อลูกค้าชำระเงินครบถ้วน 100% ซอร์สโค้ดและโครงสร้างโปรเจกต์ทั้งหมดเป็นสิทธิ์ขาดของลูกค้าโดยสมบูรณ์
                    ไม่มีการเข้ารหัสซ่อนรูป (No Obfuscation) ไม่มีการล็อกระบบ ลูกค้าสามารถนำไปต่อยอด แก้ไขโค้ด หรือส่งต่อให้ทีมงานอื่นพัฒนาต่อได้อย่างอิสระ
                  </p>
                </div>

                <div className="terms-card">
                  <h3 className="terms-card-title">6. ความปลอดภัยและการส่งมอบระบบ (Security & Handover)</h3>
                  <p className="terms-card-text">
                    <strong>ระบบ HTTPS / SSL:</strong> เว็บไซต์ทุกเว็บจะได้รับการติดตั้ง SSL เข้ารหัสความปลอดภัยมาตรฐานฟรี
                    <br />
                    <strong>การแยก Environment Variables:</strong> คีย์ความลับและรหัสผ่านจะถูกแยกเก็บในไฟล์คอนฟิก (.env) ไม่มีการฮาร์ดโค้ดลงในระบบ
                    <br />
                    <strong>การเปลี่ยนรหัสผ่านหลังส่งมอบ:</strong> เมื่อติดตั้งเสร็จ แนะนำให้ลูกค้าเปลี่ยนรหัสผ่าน VPS, ฐานข้อมูล และรีเซ็ต API Key เสมอเพื่อความปลอดภัยสูงสุด
                  </p>
                </div>

                <div className="terms-card">
                  <h3 className="terms-card-title">7. การสื่อสารตรงกับผู้พัฒนา (Direct Communication)</h3>
                  <p className="terms-card-text">
                    คุยงานตรงกับโปรแกรมเมอร์ผู้พัฒนาจริง (Full Stack Developer) โดยไม่มีเซลส์หรือคนกลาง ทำให้คุยง่าย อธิบายความต้องการเชิงเทคนิคเข้าใจเร็ว แก้งานตรงจุด และประเมินราคาได้อย่างสมเหตุสมผล
                  </p>
                </div>

                <div className="terms-card">
                  <h3 className="terms-card-title">8. สิ่งที่รวมและไม่รวมในบริการ (Scope Breakdown)</h3>
                  <ul className="terms-list">
                    <li>
                      <strong>สิ่งที่รวม:</strong> ออกแบบและเขียนโค้ดตามบรีฟ, สิทธิ์แก้ไขงานฟรี 2-3 ครั้ง, ประกันบั๊ก 30 วัน, ช่วย Deploy ขึ้นเซิร์ฟเวอร์ครั้งแรก, คู่มือแนะนำการใช้งาน
                    </li>
                    <li>
                      <strong>สิ่งที่ไม่รวม:</strong> ค่าบริการภายนอก เช่น ค่าจดชื่อโดเมน, ค่าเช่า Cloud VPS รายเดือน (ลูกค้าชำระตรงกับผู้ให้บริการตามจริง), ค่าบริการ API ภายนอกที่มีค่าใช้จ่าย (เช่น SMS Gateway, AI Tokens)
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          )}

          {/* Section: การคิดเรทราคาตัวอย่าง (Pricing Calculation & Real Examples) */}
          {(activeTab === 'all' || activeTab === 'pricing-guide') && (
            <section className="terms-section" id="section-pricing-guide">
              <div className="terms-section-head">
                <div className="terms-section-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="1" x2="12" y2="23" />
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <div>
                  <h2 className="terms-section-title">การคิดเรทราคาและตัวอย่างประมาณการ (Pricing Structure & Examples)</h2>
                  <p className="terms-section-desc">ทำความเข้าใจวิธีประเมินราคา พร้อมตัวอย่างเรทราคาตามขอบเขตงาน เพื่อช่วยในการวางแผนงบประมาณ</p>
                </div>
              </div>

              <div className="terms-cards-grid">
                <div className="terms-card">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <h3 className="terms-card-title" style={{ margin: 0 }}>หลักเกณฑ์ในการประเมินราคา (Pricing Factors)</h3>
                    <span className="terms-price-badge">HOW IT WORKS</span>
                  </div>
                  <p className="terms-card-text">
                    เรทราคาขึ้นอยู่กับแต่ละงาน โดยคำนวณจากปัจจัยหลัก 4 ด้าน:
                  </p>
                  <ul className="terms-list" style={{ marginTop: '10px' }}>
                    <li>
                      <strong>ความซับซ้อนของระบบ (Complexity):</strong> เว็บไซต์แสดงข้อมูลทั่วไป vs เว็บไซต์ที่มีระบบสมาชิก ฐานข้อมูล หรือระบบชำระเงิน
                    </li>
                    <li>
                      <strong>ปริมาณหน้าและดีไซน์ (Design & Pages):</strong> จำนวนหน้าที่ต้องออกแบบ แอนิเมชันพิเศษ ความละเอียดของ Responsive
                    </li>
                    <li>
                      <strong>การเชื่อมต่อระบบภายนอก (API & Integrations):</strong> ตรวจสอบสลิป, Payment Gateway, Discord Webhook, API อื่นๆ
                    </li>
                    <li>
                      <strong>โครงสร้างเซิร์ฟเวอร์ (Deployment):</strong> การติดตั้งบน Docker, Cloud VPS, การตั้งค่าความปลอดภัย และฐานข้อมูล
                    </li>
                  </ul>
                </div>

                <div className="terms-card">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <h3 className="terms-card-title" style={{ margin: 0 }}>ตัวอย่างที่ 1: บอท Discord พื้นฐาน</h3>
                    <span className="terms-price-badge">BASIC BOT</span>
                  </div>
                  <div className="terms-price-range">100 - 500 บาท</div>
                  <p className="terms-card-text">
                    <strong>ฟีเจอร์ตัวอย่าง:</strong> คำสั่ง Slash Command ทักทาย, ต้อนรับสมาชิกใหม่พร้อมส่งการ์ดรูปภาพ, บันทึก Log การเข้า-ออก, ระบบแจกยศอัตโนมัติตามปุ่มกด
                    <br />
                    <strong>ระยะเวลาโดยประมาณ:</strong> 1 - 2 วัน
                    <br />
                    <strong>เหมาะสำหรับ:</strong> เซิร์ฟเวอร์คอมมูนิตี้ กลุ่มเพื่อน หรือเซิร์ฟเวอร์เกมที่ต้องการระบบจัดการพื้นฐาน
                  </p>
                </div>

                <div className="terms-card">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <h3 className="terms-card-title" style={{ margin: 0 }}>ตัวอย่างที่ 2: บอท Discord อัตโนมัติ & ตรวจสลิป</h3>
                    <span className="terms-price-badge">ADVANCED BOT</span>
                  </div>
                  <div className="terms-price-range">800 - 2,500 บาท</div>
                  <p className="terms-card-text">
                    <strong>ฟีเจอร์ตัวอย่าง:</strong> ระบบตรวจสอบสลิปโอนเงินอัตโนมัติ (Slip Verification), เติมเงินและแจกยศ VIP ทันที, ส่ง Webhook สรุปยอดขาย, ฐานข้อมูลเก็บบัญชีผู้ใช้
                    <br />
                    <strong>ระยะเวลาโดยประมาณ:</strong> 2 - 5 วัน
                    <br />
                    <strong>เหมาะสำหรับ:</strong> ร้านค้าบน Discord, เซิร์ฟเวอร์ FiveM, หรือกลุ่มธุรกิจที่ต้องการระบบซื้อขายอัตโนมัติ 24 ชม.
                  </p>
                </div>

                <div className="terms-card">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <h3 className="terms-card-title" style={{ margin: 0 }}>ตัวอย่างที่ 3: เว็บไซต์ Landing Page / Portfolio</h3>
                    <span className="terms-price-badge">LANDING PAGE</span>
                  </div>
                  <div className="terms-price-range">2,000 - 4,500 บาท</div>
                  <p className="terms-card-text">
                    <strong>ฟีเจอร์ตัวอย่าง:</strong> เว็บไซต์ 1 หน้าเต็ม ออกแบบ Custom หรูหราทันสมัย ลื่นไหล รองรับมือถือ 100%, โครงสร้าง SEO เบื้องต้น, ส่วนแสดงผลงาน, ฟอร์มติดต่อ หรือลิงก์ Social Media
                    <br />
                    <strong>ระยะเวลาโดยประมาณ:</strong> 3 - 7 วัน
                    <br />
                    <strong>เหมาะสำหรับ:</strong> ครีเอเตอร์, ฟรีแลนซ์, ธุรกิจบริการ หรือร้านค้าที่ต้องการหน้าเว็บสร้างความน่าเชื่อถือ
                  </p>
                </div>

                <div className="terms-card">
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <h3 className="terms-card-title" style={{ margin: 0 }}>ตัวอย่างที่ 4: เว็บไซต์ธุรกิจ & เว็บแอปพลิเคชัน</h3>
                    <span className="terms-price-badge">FULL-STACK APP</span>
                  </div>
                  <div className="terms-price-range">5,000 - 15,000+ บาท</div>
                  <p className="terms-card-text">
                    <strong>ฟีเจอร์ตัวอย่าง:</strong> ระบบล็อกอินสมาชิก, หน้าบ้าน + ระบบแดชบอร์ดหลังบ้าน (Admin Panel), ฐานข้อมูลจัดเก็บข้อมูลสินค้า/คำสั่งซื้อ, เชื่อมต่อ API ภายนอก, ระบบค้นหาและกรองข้อมูล
                    <br />
                    <strong>ระยะเวลาโดยประมาณ:</strong> 7 - 20 วัน
                    <br />
                    <strong>เหมาะสำหรับ:</strong> ธุรกิจ SME, สตาร์ตอัป, แพลตฟอร์มบริการออนไลน์, หรือระบบบริหารจัดการภายใน
                  </p>
                </div>

                <div className="terms-card">
                  <h3 className="terms-card-title">ความยืดหยุ่นและการปรึกษางบประมาณ (Budget Flexibility)</h3>
                  <p className="terms-card-text">
                    <strong>* เรทราคาขึ้นอยู่กับแต่ละงานและความต้องการเฉพาะของลูกค้า</strong>
                    <br />
                    หากมีงบประมาณจำกัด สามารถแจ้งงบประมาณที่มีก่อนได้เสมอ ทางเรายินดีช่วยวิเคราะห์และปรับลดทอนฟีเจอร์ที่ไม่จำเป็น เพื่อให้ได้ระบบที่คุ้มค่าและตอบโจทย์ธุรกิจของท่านมากที่สุด ปรึกษาฟรีไม่มีข้อผูกมัด
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* Section: คำถามที่พบบ่อย (FAQ - Frequently Asked Questions) */}
          {(activeTab === 'all' || activeTab === 'faq') && (
            <section className="terms-section" id="section-faq">
              <div className="terms-section-head">
                <div className="terms-section-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                </div>
                <div>
                  <h2 className="terms-section-title">คำถามที่พบบ่อย (Frequently Asked Questions)</h2>
                  <p className="terms-section-desc">รวมคำตอบสำหรับข้อสงสัยที่ลูกค้าสอบถามเข้ามาบ่อยที่สุด</p>
                </div>
              </div>

              <div className="terms-cards-grid">
                <div className="terms-card">
                  <h3 className="terms-card-title">Q: เขียนโค้ดไม่เป็นเลย หลังจากส่งมอบแล้วจะดูแลต่อได้ไหม?</h3>
                  <p className="terms-card-text">
                    <strong>ได้แน่นอน 100%!</strong> เราออกแบบระบบให้ใช้งานง่าย พร้อมส่งมอบคู่มือภาษาไทยแนะนำการเปิด-ปิด หรือหากต้องการ เราสามารถพัฒนาหน้าจัดการหลังบ้าน (Admin Dashboard) ให้ลูกค้าคลิกแก้ไขข้อความ รูปภาพ หรือข้อมูลได้เองโดยไม่ต้องแตะโค้ดเลย
                  </p>
                </div>

                <div className="terms-card">
                  <h3 className="terms-card-title">Q: ทำไมเรทราคาของแต่ละงานถึงไม่เท่ากัน?</h3>
                  <p className="terms-card-text">
                    <strong>เรทราคาขึ้นอยู่กับแต่ละงาน</strong> ทั้งความซับซ้อนของตรรกะระบบ ปริมาณหน้า ดีไซน์ และการเชื่อมต่อภายนอก (เช่น ระบบตรวจสลิป, ฐานข้อมูล, API) งานที่เรียบง่ายจะมีค่าบริการเริ่มต้นเพียงหลักร้อย ในขณะที่งานระบบขนาดใหญ่จะคำนวณตามเวลาและทรัพยากรที่ใช้พัฒนาจริง
                  </p>
                </div>

                <div className="terms-card">
                  <h3 className="terms-card-title">Q: มีค่าใช้จ่ายแอบแฝงรายเดือน หรือต้องจ่ายค่าดูแลเว็บไหม?</h3>
                  <p className="terms-card-text">
                    <strong>ไม่มีค่าใช้จ่ายแอบแฝง!</strong> ค่าจ้างพัฒนาเป็นแบบจ่ายครั้งเดียวจบ ส่วนค่าบริการภายนอก เช่น ค่าโดเมน หรือค่าเช่า Cloud VPS ลูกค้าจะชำระตรงกับผู้ให้บริการตามจริงตามการใช้งาน (หรือหากเป็นเว็บ Landing Page สามารถใช้คลาวด์ฟรีได้โดยไม่มีค่าใช้จ่ายรายเดือนเลย)
                  </p>
                </div>

                <div className="terms-card">
                  <h3 className="terms-card-title">Q: หากต้องการเพิ่มฟีเจอร์ใหม่ในอนาคต คิดค่าบริการยังไง?</h3>
                  <p className="terms-card-text">
                    <strong>สามารถติดต่อมาขอเพิ่มฟังก์ชันได้ตลอดเวลา</strong> โค้ดถูกเขียนแบบแยกโมดูล (Clean & Modular Architecture) ทำให้การต่อเติมฟังก์ชันใหม่ทำได้สะดวกรวดเร็ว โดยจะคิดค่าบริการเฉพาะส่วนที่พัฒนาเพิ่มตามความยากง่าย เป็นกันเองแน่นอน
                  </p>
                </div>

                <div className="terms-card">
                  <h3 className="terms-card-title">Q: รับแก้งาน บัก หรือต่อเติมโปรเจกต์เดิมที่มีอยู่แล้วหรือไม่?</h3>
                  <p className="terms-card-text">
                    <strong>รับแน่นอน!</strong> ลูกค้าสามารถส่งโค้ดเดิมหรือรายละเอียดระบบที่มีอยู่มาให้เราประเมินโครงสร้างก่อนได้ฟรี เราจะช่วยวิเคราะห์ความเป็นไปได้ แนวทางแก้ไข และประเมินราคาให้พิจารณาก่อนเริ่มงาน
                  </p>
                </div>

                <div className="terms-card">
                  <h3 className="terms-card-title">Q: ถ้าบอทดับ หรือระบบเกิดปัญหาหลังส่งมอบงาน จะทำอย่างไร?</h3>
                  <p className="terms-card-text">
                    <strong>ทุกโปรเจกต์มีประกันตรวจแก้บั๊กฟรี 30 วันเต็ม</strong> หากเกิดปัญหาจากโค้ดเดิม ทางเราแก้ไขให้ฟรีทันที และสำหรับการรันระบบเรามีการตั้งค่า Process Manager (เช่น PM2 หรือ Docker) ให้รีสตาร์ตตัวเองอัตโนมัติหากระบบขัดข้อง ทำให้ระบบเปิดทำงานได้ต่อเนื่อง 24/7
                  </p>
                </div>

                <div className="terms-card">
                  <h3 className="terms-card-title">Q: รองรับระบบชำระเงิน ตรวจสลิป หรือ Payment Gateway หรือไม่?</h3>
                  <p className="terms-card-text">
                    <strong>รองรับครบวงจร!</strong> สามารถเชื่อมต่อทั้งระบบตรวจสลิปธนาคารแบบเรียลไทม์ (Slip Verification API), ระบบแจ้งเตือนเงินเข้าผ่าน Discord Webhook / LINE Notify, หรือระบบเกตเวย์ชำระเงินชั้นนำ เช่น PromptPay QR Code, Stripe หรือ Omise
                  </p>
                </div>

                <div className="terms-card">
                  <h3 className="terms-card-title">Q: ต้องชำระเงินอย่างไร แบ่งจ่ายได้ไหม?</h3>
                  <p className="terms-card-text">
                    <strong>แบ่งชำระเป็น 2 งวด</strong> งวดที่ 1 มัดจำ 50% ก่อนเริ่มงานเพื่อล็อกคิว และงวดที่ 2 อีก 50% เมื่องานเสร็จสิ้นและให้ลูกค้าทดสอบตรวจรับงานเรียบร้อย ก่อนส่งมอบซอร์สโค้ดและติดตั้งบนระบบจริง (กรณีงานขนาดเล็กยอดไม่เกิน 500 บาท ชำระเต็มจำนวนก่อนเริ่มงาน)
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* 1. General Terms */}
          {(activeTab === 'all' || activeTab === 'general') && (
            <section className="terms-section" id="section-general">
              <div className="terms-section-head">
                <div className="terms-section-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                </div>
                <div>
                  <h2 className="terms-section-title">1. ข้อตกลงและขอบเขตงานทั่วไป (General Terms)</h2>
                  <p className="terms-section-desc">แนวทางและข้อตกลงพื้นฐานในการดำเนินงาน</p>
                </div>
              </div>

              <div className="terms-cards-grid">
                <div className="terms-card">
                  <h3 className="terms-card-title">1.1 การสรุปขอบเขตงาน (Scope of Work)</h3>
                  <p className="terms-card-text">
                    ก่อนเริ่มลงมือพัฒนาทุกครั้ง จะมีการสรุปรายการฟีเจอร์ เทคโนโลยีที่ใช้
                    และผลลัพธ์ที่ต้องการร่วมกันอย่างชัดเจน เพื่อให้ทั้งลูกค้าและผู้พัฒนามีความเข้าใจตรงกัน
                    โดยจะยึดตามข้อความที่ตกลงกันผ่านช่องทางแชทหรือเอกสารบรีฟงาน
                  </p>
                </div>

                <div className="terms-card">
                  <h3 className="terms-card-title">1.2 กรรมสิทธิ์และลิขสิทธิ์ซอร์สโค้ด (Ownership)</h3>
                  <p className="terms-card-text">
                    เมื่อลูกค้าชำระค่าบริการครบถ้วน 100% ตามข้อตกลง ลิขสิทธิ์ในผลงาน ซอร์สโค้ด (Source Code)
                    และไฟล์โปรเจกต์ทั้งหมดจะตกเป็นของลูกค้าโดยสมบูรณ์ ลูกค้าสามารถนำไปต่อยอด ดัดแปลง
                    หรือใช้งานในเชิงพาณิชย์ได้ตามต้องการ
                  </p>
                </div>

                <div className="terms-card">
                  <h3 className="terms-card-title">1.3 การรักษาความลับ (Confidentiality / NDA)</h3>
                  <p className="terms-card-text">
                    ข้อมูลโปรเจกต์ บัญชีเซิร์ฟเวอร์, API Keys, Bot Tokens ตลอดจนข้อมูลทางธุรกิจของลูกค้า
                    จะถูกเก็บรักษาเป็นความลับสูงสุด ไม่มีการนำไปเผยแพร่ ทำซ้ำ หรือแบ่งปันให้บุคคลภายนอกเด็ดขาด
                  </p>
                </div>

                <div className="terms-card">
                  <h3 className="terms-card-title">1.4 การจัดเตรียมวัตถุดิบ (Client Materials)</h3>
                  <p className="terms-card-text">
                    ลูกค้ามีหน้าที่จัดเตรียมเนื้อหา ข้อความ รูปภาพ โลโก้ หรือคีย์เชื่อมต่อบริการภายนอกที่จำเป็นต่อระบบ
                    เพื่อให้การพัฒนาสามารถดำเนินไปตามไทม์ไลน์ที่วางไว้
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* 2. Payment & Deposit */}
          {(activeTab === 'all' || activeTab === 'payment') && (
            <section className="terms-section" id="section-payment">
              <div className="terms-section-head">
                <div className="terms-section-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect width="20" height="14" x="2" y="5" rx="2" />
                    <line x1="2" y1="10" x2="22" y2="10" />
                  </svg>
                </div>
                <div>
                  <h2 className="terms-section-title">2. นโยบายการชำระเงินและมัดจำ (Payment & Deposit)</h2>
                  <p className="terms-section-desc">ขั้นตอนและเงื่อนไขการชำระเงินที่โปร่งใส ตรวจสอบได้</p>
                </div>
              </div>

              <div className="terms-cards-grid">
                <div className="terms-card">
                  <h3 className="terms-card-title">2.1 การแบ่งชำระเป็นงวด (Payment Milestones)</h3>
                  <ul className="terms-list">
                    <li>
                      <strong>งวดที่ 1 (มัดจำ 50%):</strong> ชำระก่อนเริ่มดำเนินงาน เพื่อเป็นการล็อกคิวงานและเริ่มต้นออกแบบพัฒนา
                    </li>
                    <li>
                      <strong>งวดที่ 2 (ส่วนที่เหลือ 50%):</strong> ชำระเมื่องานพัฒนาเสร็จสิ้น นำเสนอตัวอย่างให้ลูกค้าทดสอบ และตรวจรับงานเรียบร้อย ก่อนส่งมอบซอร์สโค้ดและติดตั้งบนระบบจริง
                    </li>
                    <li>
                      <strong>งานขนาดเล็ก (ยอดไม่เกิน 500 บาท):</strong> ชำระเต็มจำนวน 100% ก่อนเริ่มดำเนินการ
                    </li>
                  </ul>
                </div>

                <div className="terms-card">
                  <h3 className="terms-card-title">2.2 ช่องทางที่รองรับ (Accepted Methods)</h3>
                  <p className="terms-card-text">
                    รองรับการโอนผ่านธนาคารพาณิชย์ชั้นนำในประเทศไทย และพร้อมเพย์ (PromptPay)
                    โดยจะส่งหลักฐานเลขบัญชีที่ถูกต้องให้ทางแชทคุยงานโดยตรงเท่านั้น
                  </p>
                </div>

                <div className="terms-card">
                  <h3 className="terms-card-title">2.3 นโยบายการคืนเงิน (Refund Policy)</h3>
                  <p className="terms-card-text">
                    กรณีที่เกิดข้อผิดพลาดจากฝั่งผู้พัฒนา และไม่สามารถส่งมอบงานได้ตามสเปกที่ตกลงกันไว้
                    ยินดีคืนเงินมัดจำเต็มจำนวน 100% ให้แก่ลูกค้าทันที
                    <br />
                    <em>หมายเหตุ:</em> กรณีลูกค้ายกเลิกงานกลางคันโดยไม่ใช่ความผิดของผู้พัฒนา
                    หลังจากเริ่มงานไปแล้ว ขอสงวนสิทธิ์ไม่คืนเงินมัดจำในส่วนที่มีการเริ่มดำเนินงานไปแล้ว
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* 3. Revision & Scope */}
          {(activeTab === 'all' || activeTab === 'revision') && (
            <section className="terms-section" id="section-revision">
              <div className="terms-section-head">
                <div className="terms-section-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                  </svg>
                </div>
                <div>
                  <h2 className="terms-section-title">3. การแก้ไขงานและส่วนเพิ่มเติม (Revisions & Scope)</h2>
                  <p className="terms-section-desc">ข้อกำหนดการปรับแต่งงานเพื่อความลงตัวที่สุด</p>
                </div>
              </div>

              <div className="terms-cards-grid">
                <div className="terms-card">
                  <h3 className="terms-card-title">3.1 สิทธิ์การแก้ไขฟรี (Free Revisions)</h3>
                  <p className="terms-card-text">
                    ทุกโปรเจกต์จะได้รับสิทธิ์แก้ไขงานฟรี <strong>2 - 3 ครั้ง</strong> ภายใต้ขอบเขตของบรีฟเดิมที่ตกลงกันไว้
                    เช่น ปรับแต่งสีสัน เลย์เอาต์ การแสดงผลข้อความ หรือจุดแสดงผลต่างๆ
                  </p>
                </div>

                <div className="terms-card">
                  <h3 className="terms-card-title">3.2 การขอเพิ่มฟีเจอร์ใหม่ (Additional Requests)</h3>
                  <p className="terms-card-text">
                    หากต้องการเพิ่มฟังก์ชันการทำงานใหม่ หรือเปลี่ยนแปลงโครงสร้างหลักที่อยู่นอกเหนือจากข้อตกลงเดิม
                    ผู้พัฒนาจะแจ้งค่าใช้จ่ายเพิ่มเติมและระยะเวลาที่ต้องเพิ่มให้ลูกค้าทราบเพื่อพิจารณาก่อนเสมอ
                  </p>
                </div>

                <div className="terms-card">
                  <h3 className="terms-card-title">3.3 ระยะเวลาการตรวจรับงาน (Inspection Period)</h3>
                  <p className="terms-card-text">
                    หลังจากผู้พัฒนาส่งมอบระบบตัวอย่างสำหรับทดสอบ ลูกค้ามีระยะเวลาในการทดลองใช้งานและแจ้งแก้ไขภายใน 7 วัน
                    หากพ้นกำหนดโดยไม่มีการแจ้งแก้ไข จะถือว่าการส่งมอบงานเสร็จสมบูรณ์
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* 4. Warranty & Support */}
          {(activeTab === 'all' || activeTab === 'warranty') && (
            <section className="terms-section" id="section-warranty">
              <div className="terms-section-head">
                <div className="terms-section-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <div>
                  <h2 className="terms-section-title">4. การรับประกันและบริการหลังการขาย (Warranty & Support)</h2>
                  <p className="terms-section-desc">ดูแลต่อเนื่องหลังส่งมอบ ให้ระบบทำงานได้อย่างราบรื่น</p>
                </div>
              </div>

              <div className="terms-cards-grid">
                <div className="terms-card">
                  <h3 className="terms-card-title">4.1 รับประกันบั๊กฟรี 30 วัน (Bug Fix Guarantee)</h3>
                  <p className="terms-card-text">
                    รับประกันตรวจสอบและแก้ไขข้อผิดพลาด (Bugs / Errors) ที่เกิดจากโค้ดเดิมของผู้พัฒนา
                    ฟรีตลอด <strong>30 วันเต็ม</strong> นับตั้งแต่วันส่งมอบระบบขึ้นใช้งานจริง
                  </p>
                </div>

                <div className="terms-card">
                  <h3 className="terms-card-title">4.2 การสอนใช้งานและติดตั้ง (Setup & Guidance)</h3>
                  <p className="terms-card-text">
                    บริการให้คำปรึกษา แนะนำวิธีใช้งาน และช่วยตั้งค่าหรือ deploy ขึ้นโฮสติ้ง/เซิร์ฟเวอร์ (VPS / Cloud)
                    พร้อมให้คำแนะนำเบื้องต้นเพื่อให้ลูกค้าสามารถดูแลระบบต่อได้อย่างมั่นใจ
                  </p>
                </div>

                <div className="terms-card">
                  <h3 className="terms-card-title">4.3 ข้อยกเว้นการรับประกัน (Warranty Exclusions)</h3>
                  <p className="terms-card-text">
                    การรับประกันจะไม่ครอบคลุมกรณีที่มีการนำโค้ดไปแก้ไข ดัดแปลง หรือติดตั้งส่วนเสริมเพิ่มเติมโดยบุคคลอื่น
                    หรือการเปลี่ยนแปลงนโยบาย/API หลักของแพลตฟอร์มภายนอก (เช่น การปรับเปลี่ยนครั้งใหญ่ของ Discord API หรือ Facebook API)
                  </p>
                </div>
              </div>
            </section>
          )}

          {/* 5. Privacy & Security */}
          {(activeTab === 'all' || activeTab === 'privacy') && (
            <section className="terms-section" id="section-privacy">
              <div className="terms-section-head">
                <div className="terms-section-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </div>
                <div>
                  <h2 className="terms-section-title">5. ความเป็นส่วนตัวและความปลอดภัย (Privacy & Security)</h2>
                  <p className="terms-section-desc">ความปลอดภัยของโค้ดและข้อมูลของคุณคือสิ่งสำคัญสูงสุด</p>
                </div>
              </div>

              <div className="terms-cards-grid">
                <div className="terms-card">
                  <h3 className="terms-card-title">5.1 โค้ดสะอาด ไร้สิ่งแปลกปลอม (No Backdoors)</h3>
                  <p className="terms-card-text">
                    พัฒนาด้วยซอร์สโค้ดที่สะอาด เป็นระเบียบ ไม่มีการฝังโค้ดอันตราย (Backdoors, Spyware, Hidden Bots)
                    ลูกค้าสามารถนำโค้ดไปให้ผู้เชี่ยวชาญอื่นตรวจสอบได้ตลอดเวลา
                  </p>
                </div>

                <div className="terms-card">
                  <h3 className="terms-card-title">5.2 การล้างข้อมูลหลังส่งมอบ (Data Purge)</h3>
                  <p className="terms-card-text">
                    เมื่อส่งมอบงานและพ้นระยะเวลารับประกัน ข้อมูลเซิร์ฟเวอร์ รหัสผ่านชั่วคราว หรือโทเคนการเข้าถึงของลูกค้า
                    จะถูกลบออกจากเครื่องพัฒนาเพื่อความปลอดภัยสูงสุดของลูกค้า
                  </p>
                </div>
              </div>
            </section>
          )}
        </div>

        {/* Contact Assistance Footer Card */}
        <div className="terms-contact-card">
          <div className="terms-contact-card-body">
            <h3 className="terms-contact-card-title">มีคำถามหรือต้องการประเมินราคาโปรเจกต์?</h3>
            <p className="terms-contact-card-desc">
              หากมีข้อสงสัยเกี่ยวกับขอบเขตงานหรือต้องการปรึกษาเรทราคา ทักมาพูดคุยก่อนได้ตลอด เป็นกันเองและยินดีแนะนำโซลูชันที่คุ้มค่าที่สุดให้
            </p>
            <div className="terms-contact-card-links">
              <a href="mailto:CPJustink@gmail.com" className="terms-contact-chip">
                <span className="terms-contact-chip-label">Email:</span>
                <span className="terms-contact-chip-val">CPJustink@gmail.com</span>
              </a>
              <div className="terms-contact-chip">
                <span className="terms-contact-chip-label">Discord:</span>
                <span className="terms-contact-chip-val">@youmakemehurtbutiwantyoustill</span>
              </div>
            </div>
          </div>
          <button
            type="button"
            className="terms-contact-back-btn"
            onClick={onBack}
            id="terms-bottom-back-button"
          >
            ย้อนกลับหน้าหลัก
          </button>
        </div>
      </div>
    </div>
  );
}
