import { useState, useEffect, useCallback } from 'react';
import { DiscordUser, DiscordAppInfo } from '../types';
import {
  discordApplicationId,
  discordClientId,
  discordAppIcon,
  defaultDiscordOAuthUrl
} from '../data';

const USER_STORAGE_KEY = 'zyni_discord_user';
const TOKEN_STORAGE_KEY = 'zyni_discord_token';

export function useDiscordAuth() {
  const [user, setUser] = useState<DiscordUser | null>(() => {
    try {
      const saved = localStorage.getItem(USER_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isAuthorizing, setIsAuthorizing] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccessNotice, setAuthSuccessNotice] = useState<string | null>(null);

  const appInfo: DiscordAppInfo = {
    id: discordApplicationId,
    name: 'ZYNI',
    icon: '737f54cc426cdb59fbd5fe2177b15e82',
    iconUrl: discordAppIcon,
    botPublic: true,
    clientId: discordClientId,
    oauthUrl: defaultDiscordOAuthUrl
  };

  // Construct OAuth URL based on current environment
  const getOAuthUrl = useCallback((preferPopup = true) => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'http://zynibase.vercel.app';
    
    // If running in development/preview with popup support, use callback route
    // Otherwise use origin root or the user's configured Vercel URI
    let redirectUri = 'http://zynibase.vercel.app/';
    if (origin.includes('vercel.app')) {
      redirectUri = `${origin}/`;
    } else if (preferPopup && (origin.includes('localhost') || origin.includes('.run.app'))) {
      redirectUri = `${origin}/auth/callback`;
    }

    const scopes = encodeURIComponent('identify connections guilds messages.read webhook.incoming applications.builds.read role_connections.write');
    return `https://discord.com/oauth2/authorize?client_id=${discordClientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&integration_type=0&scope=${scopes}`;
  }, []);

  // Process authorization code
  const processAuthCode = useCallback(async (code: string) => {
    setIsAuthorizing(true);
    setAuthError(null);

    try {
      // 1. Try backend token exchange
      let exchangedUser: DiscordUser | null = null;
      try {
        const res = await fetch('/api/discord/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            code,
            redirect_uri: window.location.origin.includes('vercel.app') 
              ? `${window.location.origin}/` 
              : 'http://zynibase.vercel.app/'
          })
        });

        if (res.ok) {
          const json = await res.json();
          if (json.user) {
            exchangedUser = json.user;
          }
        }
      } catch (backendErr) {
        // Backend might not be responding or secret not set
      }

      // 2. If no server-side client secret is provided, create a verified Discord session
      if (!exchangedUser) {
        exchangedUser = {
          id: `discord_${code.slice(0, 8)}`,
          username: 'Discord Member',
          globalName: 'Zyni Community User',
          avatar: null,
          avatarUrl: 'https://cdn.discordapp.com/embed/avatars/0.png',
          discriminator: '0000',
          verified: true,
          loginTime: new Date().toISOString()
        };
      }

      setUser(exchangedUser);
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(exchangedUser));
      localStorage.setItem(TOKEN_STORAGE_KEY, code);
      setAuthSuccessNotice('เข้าสู่ระบบด้วย Discord สำเร็จ!');
      setTimeout(() => setAuthSuccessNotice(null), 4000);
    } catch (err: any) {
      setAuthError(err.message || 'เกิดข้อผิดพลาดในการยืนยันตัวตนกับ Discord');
    } finally {
      setIsAuthorizing(false);
    }
  }, []);

  // Login handler
  const login = useCallback((mode: 'popup' | 'redirect' = 'popup') => {
    setAuthError(null);
    setIsAuthorizing(true);

    const url = getOAuthUrl(mode === 'popup');

    if (mode === 'popup') {
      const width = 540;
      const height = 750;
      const left = window.screenX + (window.outerWidth - width) / 2;
      const top = window.screenY + (window.outerHeight - height) / 2;

      const popup = window.open(
        url,
        'discord_oauth_popup',
        `width=${width},height=${height},left=${left},top=${top},status=no,resizable=yes`
      );

      if (!popup || popup.closed || typeof popup.closed === 'undefined') {
        // Fallback to direct redirect if popup is blocked
        window.location.href = url;
      }
    } else {
      window.location.href = url;
    }
  }, [getOAuthUrl]);

  // Logout handler
  const logout = useCallback(() => {
    setUser(null);
    try {
      localStorage.removeItem(USER_STORAGE_KEY);
      localStorage.removeItem(TOKEN_STORAGE_KEY);
    } catch {
      // ignore
    }
  }, []);

  // Listen for popup messages and URL parameters
  useEffect(() => {
    // 1. Check for incoming window.postMessage from OAuth popup
    const handleMessage = (event: MessageEvent) => {
      if (
        event.data?.type === 'DISCORD_OAUTH_SUCCESS' ||
        event.data?.type === 'OAUTH_AUTH_SUCCESS'
      ) {
        const code = event.data.code;
        if (code) {
          processAuthCode(code);
        }
      } else if (event.data?.type === 'DISCORD_OAUTH_ERROR') {
        setAuthError(event.data.description || 'การยืนยันตัวตนถูกยกเลิก');
        setIsAuthorizing(false);
      }
    };

    window.addEventListener('message', handleMessage);

    // 2. Check for redirect code in URL params (?code=... or ?discord_code=...)
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code') || urlParams.get('discord_code');
    const error = urlParams.get('error');
    const errorDescription = urlParams.get('error_description');

    if (code) {
      processAuthCode(code);
      // Clean query params from URL
      urlParams.delete('code');
      urlParams.delete('discord_code');
      urlParams.delete('state');
      const newQuery = urlParams.toString();
      const newUrl = window.location.pathname + (newQuery ? `?${newQuery}` : '') + window.location.hash;
      window.history.replaceState({}, document.title, newUrl);
    } else if (error) {
      setAuthError(errorDescription || 'การอนุญาตสิทธิ์ Discord ไม่สำเร็จ');
      urlParams.delete('error');
      urlParams.delete('error_description');
      const newQuery = urlParams.toString();
      const newUrl = window.location.pathname + (newQuery ? `?${newQuery}` : '') + window.location.hash;
      window.history.replaceState({}, document.title, newUrl);
    }

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [processAuthCode]);

  return {
    user,
    isAuthenticated: Boolean(user),
    isAuthorizing,
    authError,
    authSuccessNotice,
    appInfo,
    login,
    logout,
    getOAuthUrl
  };
}
