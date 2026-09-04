export interface PriceTier {
  note: string;
  price: string;
}

export interface ServiceItem {
  title: string;
  desc: string;
  price?: string;
  priceTiers?: PriceTier[];
  showHands?: boolean;
  splitLayout?: boolean;
  uiUxBadges?: boolean;
  botBadges?: boolean;
}

export interface PortfolioProject {
  title: string;
  logo?: string;
  logoSize?: 'sm' | 'md' | 'lg';
  categories: string[];
  desc: string;
  features: string[];
  slides: string[];
  url: string;
  imagePosition?: 'left' | 'right';
  spatialTilt?: 'left' | 'right';
}

export interface DeveloperProfile {
  name: string;
  image: string;
  frame: string;
  role: string;
  desc: string;
  tags: string[];
}

export interface SocialLink {
  label: string;
  detail: string;
  href: string;
  action: string;
  icon: 'instagram' | 'facebook' | 'email' | 'discord';
  status?: 'active' | 'paused';
  statusNote?: string;
  copyable?: boolean;
}

export interface TeamHighlight {
  title: string;
  desc: string;
  type: 'discord' | 'contact';
}

export interface DiscordInviteData {
  id?: string;
  name: string;
  description?: string | null;
  onlineCount: number;
  memberCount: number;
  iconUrl: string | null;
  bannerUrl?: string | null;
  inviteUrl: string;
  inviteCode: string;
  isRealtime: boolean;
  lastUpdated?: Date;
}

export interface DiscordUser {
  id: string;
  username: string;
  globalName?: string | null;
  avatar?: string | null;
  avatarUrl: string;
  discriminator?: string;
  banner?: string | null;
  bannerColor?: string | null;
  accentColor?: number | null;
  verified?: boolean;
  email?: string | null;
  loginTime: string;
}

export interface DiscordAppInfo {
  id: string;
  name: string;
  icon: string | null;
  iconUrl: string;
  botPublic: boolean;
  clientId: string;
  oauthUrl: string;
}

