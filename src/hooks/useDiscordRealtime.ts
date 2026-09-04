import { useState, useEffect, useCallback, useRef } from 'react';
import { discordInviteCode as defaultCode } from '../data';
import { DiscordInviteData } from '../types';

const STORAGE_KEY = 'zyni_discord_code';

export function cleanInviteCode(input: string): string {
  if (!input) return '';
  let cleaned = input.trim();
  // Strip discord.gg/ or discord.com/invite/
  cleaned = cleaned.replace(/^https?:\/\/(www\.)?(discord\.gg|discordapp\.com\/invite|discord\.com\/invite)\//i, '');
  cleaned = cleaned.replace(/[?#].*$/, '');
  cleaned = cleaned.replace(/^\/+|\/+$/g, '');
  return cleaned;
}

export function useDiscordRealtime() {
  const [inviteCode, setInviteCodeState] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? cleanInviteCode(saved) : defaultCode;
    } catch {
      return defaultCode;
    }
  });

  const [data, setData] = useState<DiscordInviteData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const isMountedRef = useRef<boolean>(true);

  const fetchDiscord = useCallback(
    async (codeToFetch: string, isManual = false) => {
      const targetCode = cleanInviteCode(codeToFetch) || defaultCode;
      if (isManual) {
        setRefreshing(true);
      } else if (!data) {
        setLoading(true);
      }
      setError(null);

      try {
        const res = await fetch(
          `https://discord.com/api/v10/invites/${targetCode}?with_counts=true`
        );

        if (!res.ok) {
          if (res.status === 404) {
            throw new Error(`ไม่พบเซิร์ฟเวอร์จากโค้ดคำเชิญ "${targetCode}" (อาจหมดอายุหรือพิมพ์ผิด)`);
          }
          if (res.status === 429) {
            throw new Error('เรียกข้อมูลถี่เกินไป กรุณารอสักครู่ (Rate Limited)');
          }
          throw new Error(`Discord API Error: ${res.status}`);
        }

        const json = await res.json();
        const guild = json.guild || {};
        const guildId = guild.id || json.guild_id || '';
        const iconHash = guild.icon || json.profile?.icon_hash;
        const bannerHash = guild.banner || json.profile?.banner_hash;

        let iconUrl: string | null = null;
        if (guildId && iconHash) {
          const ext = iconHash.startsWith('a_') ? 'gif' : 'png';
          iconUrl = `https://cdn.discordapp.com/icons/${guildId}/${iconHash}.${ext}?size=128`;
        }

        let bannerUrl: string | null = null;
        if (guildId && bannerHash) {
          const ext = bannerHash.startsWith('a_') ? 'gif' : 'png';
          bannerUrl = `https://cdn.discordapp.com/banners/${guildId}/${bannerHash}.${ext}?size=480`;
        }

        const online =
          json.approximate_presence_count ?? json.profile?.online_count ?? 0;
        const total =
          json.approximate_member_count ?? json.profile?.member_count ?? 0;

        if (isMountedRef.current) {
          setData({
            id: guildId,
            name: guild.name || json.profile?.name || 'Discord Server',
            description: guild.description || json.profile?.description || null,
            onlineCount: online,
            memberCount: total,
            iconUrl,
            bannerUrl,
            inviteUrl: `https://discord.gg/${targetCode}`,
            inviteCode: targetCode,
            isRealtime: true,
            lastUpdated: new Date()
          });
          setError(null);
        }
      } catch (err: any) {
        if (isMountedRef.current) {
          setError(err.message || 'ไม่สามารถเชื่อมต่อกับ Discord ได้');
          // If no previous data, populate fallback but mark realtime false
          if (!data) {
            setData({
              name: 'Zyni Community',
              onlineCount: 382,
              memberCount: 13070,
              iconUrl: null,
              inviteUrl: `https://discord.gg/${targetCode}`,
              inviteCode: targetCode,
              isRealtime: false,
              lastUpdated: new Date()
            });
          }
        }
      } finally {
        if (isMountedRef.current) {
          setLoading(false);
          setRefreshing(false);
        }
      }
    },
    [data]
  );

  // Set invite code and persist
  const updateInviteCode = useCallback(
    async (newCode: string): Promise<boolean> => {
      const cleaned = cleanInviteCode(newCode);
      if (!cleaned) return false;

      try {
        localStorage.setItem(STORAGE_KEY, cleaned);
      } catch {
        // ignore storage error
      }
      setInviteCodeState(cleaned);
      await fetchDiscord(cleaned, true);
      return true;
    },
    [fetchDiscord]
  );

  const resetToDefault = useCallback(async () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    setInviteCodeState(defaultCode);
    await fetchDiscord(defaultCode, true);
  }, [fetchDiscord]);

  useEffect(() => {
    isMountedRef.current = true;
    fetchDiscord(inviteCode);

    // Realtime polling: refresh every 30 seconds
    const interval = setInterval(() => {
      if (document.visibilityState === 'visible') {
        fetchDiscord(inviteCode);
      }
    }, 30000);

    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        fetchDiscord(inviteCode);
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      isMountedRef.current = false;
      clearInterval(interval);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [inviteCode, fetchDiscord]);

  return {
    data,
    loading,
    refreshing,
    error,
    inviteCode,
    refetch: () => fetchDiscord(inviteCode, true),
    updateInviteCode,
    resetToDefault
  };
}
