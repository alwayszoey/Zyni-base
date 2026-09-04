import { DeveloperProfile, PortfolioProject, ServiceItem, SocialLink, TeamHighlight } from './types';

export const servicesData: ServiceItem[] = [
  {
    title: 'บริการรับทำเว็บไซต์ครบวงจร',
    desc: 'ดูแลตั้งแต่การออกแบบ พัฒนา จนถึงเปิดใช้งานจริง พร้อมการดูแลหลังกการขายและปรับปรุงตามความต้องการ',
    priceTiers: [
      { note: 'เริ่มต้นเพียง', price: '2,000 บาท' },
      { note: 'เว็บไซต์ขนาดใหญ่', price: '15,000 บาท' }
    ],
    showHands: true
  },
  {
    title: 'รับงานเขียนบอท',
    desc: 'พัฒนาบอท Discord, Telegram และระบบออโตเมชันครบวงจร ติดตั้งคำสั่ง ออโตเมชัน ระบบเชื่อมต่อ API และการจัดการสิทธิ์',
    price: '100 บาท',
    showHands: false,
    splitLayout: true,
    botBadges: true
  }
];

export const portfolioProjects: PortfolioProject[] = [
  {
    title: 'HappyDonate',
    logo: '/happydonate-logo.png',
    categories: ['WEB APPLICATION', 'FINTECH', 'CREATOR ECONOMY'],
    desc: 'ระบบโดเนทสำหรับสตรีมเมอร์ รองรับการรับเงินเข้าบัญชีผู้รับโดยตรง พร้อมวิดเจ็ตแจ้งเตือนและระบบจัดการผู้บริจาค',
    features: [
      'เงินเข้าบัญชีผู้สตรีมทันที (Direct Transfer)',
      'วิดเจ็ตแจ้งเตือนและระบบอ่านข้อความอัจฉริยะ',
      'ปรับแต่งหน้าโปรไฟล์รับโดเนทได้อย่างอิสระ',
      'ระบบ API ตรวจสอบสลิปโดย Zyni.DEV'
    ],
    slides: [
      '/portfolio/slide-6.png',
      '/portfolio/slide-1.png',
      '/portfolio/slide-2.png',
      '/portfolio/slide-3.png',
      '/portfolio/slide-4.png',
      '/portfolio/slide-5.png'
    ],
    url: 'https://happydonate.app'
  },
  {
    title: 'Fusions',
    logo: '/fusions-logo.png',
    categories: ['WEB APPLICATION', 'LINK IN BIO', 'CREATOR TOOLS'],
    desc: 'แพลตฟอร์มรวบรวมลิงก์และวิดเจ็ตสำหรับครีเอเตอร์ ปรับธีมและฟีเจอร์ตามต้องการ ใช้งานง่ายโดยไม่ต้องเขียนโค้ด',
    features: [
      'รวมลิงก์โซเชียลและวิดเจ็ตในหน้าเดียว',
      'ปรับธีมและเอฟเฟกต์ได้ลึก',
      'เริ่มใช้ฟรี ไม่ต้องเขียนโค้ด',
      'ระบบ API วิดเจ็ตเชื่อมต่อแบบ Real-time'
    ],
    slides: [
      '/portfolio/fusions/slide-1.png',
      '/portfolio/fusions/slide-2.png',
      '/portfolio/fusions/slide-3.png',
      '/portfolio/fusions/slide-4.png',
      '/portfolio/fusions/slide-5.png'
    ],
    url: 'https://fusions.info/',
    imagePosition: 'left'
  },
  {
    title: 'VEXZY',
    logo: '/vexzy-logo.png',
    logoSize: 'sm',
    categories: ['WEB APPLICATION', 'SAAS', 'E-COMMERCE'],
    desc: 'แพลตฟอร์มเช่าเว็บไซต์ร้านค้าออนไลน์ รองรับการสร้าง Subdomain อัตโนมัติและการปรับแต่งธีมสำหรับร้านค้าแต่ละราย',
    features: [
      'เปิดร้านและสร้าง Subdomain อัตโนมัติ',
      'รองรับ PromptPay และ TrueMoney สแกนจ่าย',
      'ปรับแต่งธีม สินค้า และระบบภายในร้านได้',
      'สถาปัตยกรรม Multi-tenancy พร้อมระบบสำรองข้อมูล'
    ],
    slides: [
      '/portfolio/vexzy/slide-1.png',
      '/portfolio/vexzy/slide-2.png',
      '/portfolio/vexzy/slide-3.png',
      '/portfolio/vexzy/slide-4.png',
      '/portfolio/vexzy/slide-5.png',
      '/portfolio/vexzy/slide-6.png'
    ],
    url: 'https://vexzy.net/'
  }
];

export const miniProjects: PortfolioProject[] = [
  {
    title: 'Web SHOP',
    categories: ['WEB SHOP', 'E-COMMERCE', 'GAMING'],
    desc: 'ร้านค้าออนไลน์สำหรับขายสินค้าดิจิทัล รองรับระบบเติมเงิน ค้นหา และจัดการสินค้า',
    features: [
      'ระบบเติมเงินและกระเป๋าเงินผู้ใช้',
      'ค้นหาและจัดหมวดหมู่สินค้า',
      'แสดงสถิติยอดขายและสมาชิก',
      'ดีไซน์ธีมมืดเน้นเกมมิ่ง'
    ],
    slides: [
      '/portfolio/webshop/slide-1.png',
      '/portfolio/webshop/slide-2.png',
      '/portfolio/webshop/slide-3.png',
      '/portfolio/webshop/slide-4.png'
    ],
    url: '#',
    spatialTilt: 'right'
  },
  {
    title: 'BotPanel',
    categories: ['DISCORD BOT', 'WEB PANEL', 'AUTOMATION'],
    desc: 'แผงจัดการบอท Discord สำหรับตั้งค่า คำสั่ง และระบบออโตเมชัน',
    features: [],
    slides: [
      '/portfolio/botpanel/slide-1.png',
      '/portfolio/botpanel/slide-2.png',
      '/portfolio/botpanel/slide-3.png',
      '/portfolio/botpanel/slide-4.png'
    ],
    url: '#',
    spatialTilt: 'left'
  }
];

export const developerInfo: DeveloperProfile = {
  name: '480p',
  image: '/bkron-profile.png',
  frame: '/profile-frame.png',
  role: 'Full Stack Developer',
  desc: 'เชี่ยวชาญการพัฒนาเว็บไซต์และระบบเว็บแอปพลิเคชันแบบครบวงจร ตั้งแต่งาน Frontend ด้วยดีไซน์สมัยใหม่ ลื่นไหล ตอบสนองทุกขนาดหน้าจอ ไปจนถึงสถาปัตยกรรม Backend ประสิทธิภาพสูง การออกแบบ Database, REST API, ระบบอัตโนมัติ (Automation & Bots) และการ Deploy บนคลาวด์ พร้อมดูแลและปรับแต่งให้ตอบโจทย์ธุรกิจจริงอย่างสมบูรณ์แบบ',
  tags: ['Frontend', 'Backend', 'Full Stack', 'Database & API', 'Automation & Bot', 'Cloud & DevOps']
};

export const discordGuildId = '1475039241011724461';
export const defaultDiscordInvite = 'https://discord.gg/ykav26jJTQ';
export const discordInviteCode = 'ykav26jJTQ';

export const discordApplicationId = '1455511992218419297';
export const discordClientId = '1455511992218419297';
export const discordAppIcon = 'https://cdn.discordapp.com/icons/1475039241011724461/38e200934615d7c0e54319c111f92fdf.png?size=128';
export const discordOAuthScopes = 'identify connections guilds messages.read webhook.incoming applications.builds.read role_connections.write';
export const defaultDiscordOAuthUrl = 'https://discord.com/oauth2/authorize?client_id=1455511992218419297&response_type=code&redirect_uri=http%3A%2F%2Fzynibase.vercel.app%2F&scope=identify%20connections%20guilds%20messages.read%20webhook.incoming%20applications.builds.read%20role_connections.write';

export const discordServerConfig = {
  guildId: '1475039241011724461',
  name: 'ZYNI BASE',
  defaultInviteUrl: 'https://discord.gg/ykav26jJTQ',
  fallbackData: {
    name: 'ZYNI BASE',
    onlineCount: 1,
    memberCount: 7,
    iconUrl: 'https://cdn.discordapp.com/icons/1475039241011724461/38e200934615d7c0e54319c111f92fdf.png?size=128',
    inviteUrl: 'https://discord.gg/ykav26jJTQ'
  }
};

export const socialLinks: SocialLink[] = [
  {
    label: 'Email',
    detail: 'CPJustink@gmail.com',
    href: 'mailto:CPJustink@gmail.com',
    action: 'ส่งอีเมล',
    icon: 'email',
    status: 'active',
    copyable: true
  },
  {
    label: 'Discord ส่วนตัว',
    detail: '@youmakemehurtbutiwantyoustill',
    href: 'https://discord.com/users/1455511992218419297',
    action: 'แชทเลย',
    icon: 'discord',
    status: 'active',
    copyable: true
  },
  {
    label: 'Instagram',
    detail: '@q3bibi',
    href: 'https://www.instagram.com/pluxkorn',
    action: 'Follow',
    icon: 'instagram',
    status: 'active'
  },
  {
    label: 'Facebook',
    detail: 'งดให้บริการผ่านช่องทางนี้ชั่วคราว',
    href: '#',
    action: 'งดบริการชั่วคราว',
    icon: 'facebook',
    status: 'paused',
    statusNote: 'งดบริการชั่วคราว'
  }
];

export const teamHighlights: TeamHighlight[] = [
  {
    title: 'Discord',
    desc: 'Join our community on Discord—get updates, support, and connect with us directly.',
    type: 'discord'
  },
  {
    title: 'ช่องทางติดต่อ',
    desc: 'เลือกช่องทางที่สะดวก — ตอบกลับเร็ว คุยตรงกับคนทำจริง',
    type: 'contact'
  }
];

export const navItems = [
  { label: 'หน้าหลัก', sectionId: null },
  { label: 'บริการ', sectionId: 'services' },
  { label: 'ผลงาน', sectionId: 'portfolio' },
  { label: 'ผู้พัฒนา', sectionId: 'team' }
];
