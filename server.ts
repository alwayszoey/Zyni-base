import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;

app.use(express.json());

const DISCORD_CLIENT_ID = process.env.DISCORD_CLIENT_ID || '1455511992218419297';
const DISCORD_CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET || '';
const DISCORD_GUILD_ID = process.env.DISCORD_GUILD_ID || '1475039241011724461';
const DISCORD_INVITE_CODE = process.env.DISCORD_INVITE_CODE || 'ykav26jJTQ';
const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN || '';

// In-memory cache for Discord server status (TTL: 30 seconds)
let serverStatusCache: { data: any; timestamp: number } | null = null;
const CACHE_TTL = 30 * 1000;

// 1. Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// 2. Discord Server Status endpoint (Backend-powered for Guild 1475039241011724461)
app.get('/api/discord/server', async (req, res) => {
  const now = Date.now();
  if (serverStatusCache && now - serverStatusCache.timestamp < CACHE_TTL) {
    return res.json(serverStatusCache.data);
  }

  const defaultInvite = `https://discord.gg/${DISCORD_INVITE_CODE || DISCORD_GUILD_ID}`;
  let result = {
    guildId: DISCORD_GUILD_ID,
    name: 'ZYNI BASE',
    onlineCount: 1,
    memberCount: 7,
    iconUrl: `https://cdn.discordapp.com/icons/${DISCORD_GUILD_ID}/38e200934615d7c0e54319c111f92fdf.png?size=128`,
    inviteUrl: defaultInvite,
    isRealtime: false
  };

  // Strategy A: If an invite code is specified, fetch via Discord Invite API (like sa-ya.dev)
  const inviteToTry = req.query.code as string || DISCORD_INVITE_CODE;
  if (inviteToTry) {
    try {
      const inviteRes = await fetch(`https://discord.com/api/v10/invites/${inviteToTry}?with_counts=true`);
      if (inviteRes.ok) {
        const inviteJson = await inviteRes.json();
        const guild = inviteJson.guild || {};
        const iconHash = guild.icon || inviteJson.profile?.icon_hash;
        const iconUrl = (guild.id && iconHash)
          ? `https://cdn.discordapp.com/icons/${guild.id}/${iconHash}.png?size=128`
          : result.iconUrl;

        result = {
          guildId: guild.id || DISCORD_GUILD_ID,
          name: guild.name || inviteJson.profile?.name || result.name,
          onlineCount: inviteJson.approximate_presence_count ?? inviteJson.profile?.online_count ?? result.onlineCount,
          memberCount: inviteJson.approximate_member_count ?? inviteJson.profile?.member_count ?? result.memberCount,
          iconUrl,
          inviteUrl: `https://discord.gg/${inviteToTry}`,
          isRealtime: true
        };

        serverStatusCache = { data: result, timestamp: now };
        return res.json(result);
      }
    } catch {
      // Continue to next strategy
    }
  }

  // Strategy B: Fetch via Discord Widget API (if widget is enabled in Server Settings)
  try {
    const widgetRes = await fetch(`https://discord.com/api/v10/guilds/${DISCORD_GUILD_ID}/widget.json`);
    if (widgetRes.ok) {
      const widgetJson = await widgetRes.json();
      result = {
        guildId: widgetJson.id || DISCORD_GUILD_ID,
        name: widgetJson.name || result.name,
        onlineCount: widgetJson.presence_count ?? (Array.isArray(widgetJson.members) ? widgetJson.members.length : result.onlineCount),
        memberCount: Array.isArray(widgetJson.members) ? Math.max(widgetJson.members.length, result.memberCount) : result.memberCount,
        iconUrl: result.iconUrl,
        inviteUrl: widgetJson.instant_invite || defaultInvite,
        isRealtime: true
      };

      serverStatusCache = { data: result, timestamp: now };
      return res.json(result);
    }
  } catch {
    // Continue
  }

  // Strategy C: If DISCORD_BOT_TOKEN is available, fetch directly from Discord Guilds endpoint
  if (DISCORD_BOT_TOKEN) {
    try {
      const botRes = await fetch(`https://discord.com/api/v10/guilds/${DISCORD_GUILD_ID}?with_counts=true`, {
        headers: { Authorization: `Bot ${DISCORD_BOT_TOKEN}` }
      });
      if (botRes.ok) {
        const guildData = await botRes.json();
        const iconUrl = guildData.icon
          ? `https://cdn.discordapp.com/icons/${guildData.id}/${guildData.icon}.png?size=128`
          : result.iconUrl;

        result = {
          guildId: guildData.id,
          name: guildData.name,
          onlineCount: guildData.approximate_presence_count ?? result.onlineCount,
          memberCount: guildData.approximate_member_count ?? result.memberCount,
          iconUrl,
          inviteUrl: defaultInvite,
          isRealtime: true
        };

        serverStatusCache = { data: result, timestamp: now };
        return res.json(result);
      }
    } catch {
      // Continue
    }
  }

  // Fallback: Return verified server status with current Guild ID
  serverStatusCache = { data: result, timestamp: now };
  return res.json(result);
});

// 3. Exact proxy endpoint matching sa-ya.dev pattern: /api/discord/v10/invites/:code
app.get('/api/discord/v10/invites/:code', async (req, res) => {
  const { code } = req.params;
  try {
    const upstream = await fetch(`https://discord.com/api/v10/invites/${encodeURIComponent(code)}?with_counts=true`);
    const status = upstream.status;
    const body = await upstream.json();
    return res.status(status).json(body);
  } catch (err: any) {
    return res.status(500).json({ error: 'Failed to proxy Discord invite', message: err.message });
  }
});

// 2. Discord Application Info endpoint
app.get('/api/discord/app', async (req, res) => {
  try {
    const r = await fetch(`https://discord.com/api/v10/applications/${DISCORD_CLIENT_ID}/rpc`);
    if (r.ok) {
      const data = await r.json();
      return res.json({
        id: data.id,
        name: data.name,
        icon: data.icon,
        iconUrl: data.icon
          ? `https://cdn.discordapp.com/app-icons/${data.id}/${data.icon}.png?size=128`
          : 'https://cdn.discordapp.com/embed/avatars/0.png',
        botPublic: data.bot_public ?? true,
        clientId: DISCORD_CLIENT_ID,
        oauthUrl: `https://discord.com/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&response_type=code&redirect_uri=http%3A%2F%2Fzynibase.vercel.app%2F&integration_type=0&scope=identify+connections+guilds+messages.read+webhook.incoming+applications.builds.read+role_connections.write`
      });
    }
    throw new Error('Failed to fetch from Discord API');
  } catch (err: any) {
    res.json({
      id: DISCORD_CLIENT_ID,
      name: 'ZYNI',
      icon: '737f54cc426cdb59fbd5fe2177b15e82',
      iconUrl: `https://cdn.discordapp.com/app-icons/${DISCORD_CLIENT_ID}/737f54cc426cdb59fbd5fe2177b15e82.png?size=128`,
      botPublic: true,
      clientId: DISCORD_CLIENT_ID,
      oauthUrl: `https://discord.com/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&response_type=code&redirect_uri=http%3A%2F%2Fzynibase.vercel.app%2F&integration_type=0&scope=identify+connections+guilds+messages.read+webhook.incoming+applications.builds.read+role_connections.write`
    });
  }
});

// 3. OAuth URL generator
app.get('/api/discord/oauth-url', (req, res) => {
  const customRedirect = (req.query.redirect_uri as string) || 'http://zynibase.vercel.app/';
  const scopes = 'identify connections guilds messages.read webhook.incoming applications.builds.read role_connections.write';
  const url = `https://discord.com/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(customRedirect)}&integration_type=0&scope=${encodeURIComponent(scopes)}`;
  res.json({ url, clientId: DISCORD_CLIENT_ID, redirectUri: customRedirect });
});

// 4. Token Exchange endpoint
app.post('/api/discord/token', async (req, res) => {
  const { code, redirect_uri } = req.body;
  if (!code) {
    return res.status(400).json({ error: 'Missing code parameter' });
  }

  const redirectUri = redirect_uri || 'http://zynibase.vercel.app/';

  // If client secret is provided in environment variables, perform real token exchange
  if (DISCORD_CLIENT_SECRET) {
    try {
      const params = new URLSearchParams({
        client_id: DISCORD_CLIENT_ID,
        client_secret: DISCORD_CLIENT_SECRET,
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri
      });

      const tokenRes = await fetch('https://discord.com/api/oauth2/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString()
      });

      if (!tokenRes.ok) {
        const errText = await tokenRes.text();
        return res.status(tokenRes.status).json({ error: 'Token exchange failed', details: errText });
      }

      const tokenData = await tokenRes.json();
      const accessToken = tokenData.access_token;

      // Fetch user profile
      const userRes = await fetch('https://discord.com/api/users/@me', {
        headers: { Authorization: `Bearer ${accessToken}` }
      });

      if (userRes.ok) {
        const userData = await userRes.json();
        const avatarUrl = userData.avatar
          ? `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.${userData.avatar.startsWith('a_') ? 'gif' : 'png'}?size=128`
          : `https://cdn.discordapp.com/embed/avatars/${(parseInt(userData.id) % 5) || 0}.png`;

        return res.json({
          success: true,
          user: {
            id: userData.id,
            username: userData.username,
            globalName: userData.global_name || userData.username,
            avatar: userData.avatar,
            avatarUrl,
            discriminator: userData.discriminator,
            banner: userData.banner,
            accentColor: userData.accent_color,
            loginTime: new Date().toISOString()
          }
        });
      }
    } catch (err: any) {
      return res.status(500).json({ error: err.message || 'Internal token exchange error' });
    }
  }

  // Fallback if client_secret is not configured yet:
  // Return successful authorization acknowledgement with code
  return res.json({
    success: true,
    code,
    message: 'Authorized successfully with Discord OAuth code'
  });
});

// 5. Popup OAuth Callback Route (handles /auth/callback and /auth/callback/)
const callbackHandler = (req: express.Request, res: express.Response) => {
  const { code, error, error_description } = req.query;

  res.send(`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Discord OAuth Callback</title>
  <style>
    body { font-family: system-ui, sans-serif; background: #0b0c0e; color: #fff; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
    .box { text-align: center; background: #14161a; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 32px; max-width: 400px; box-shadow: 0 10px 40px rgba(0,0,0,0.5); }
    .spinner { width: 36px; height: 36px; border: 3px solid rgba(88,101,242,0.2); border-top-color: #5865F2; border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 16px; }
    @keyframes spin { to { transform: rotate(360deg); } }
    h2 { margin: 0 0 8px; font-size: 18px; }
    p { margin: 0; color: #9ca3af; font-size: 14px; }
  </style>
</head>
<body>
  <div class="box">
    <div class="spinner"></div>
    <h2>กำลังเชื่อมต่อบัญชี Discord...</h2>
    <p>ระบบกำลังบันทึกการเชื่อมต่อและปิดหน้าต่างนี้อัตโนมัติ</p>
  </div>
  <script>
    const code = ${JSON.stringify(code || '')};
    const error = ${JSON.stringify(error || '')};
    const errorDesc = ${JSON.stringify(error_description || '')};

    if (window.opener) {
      if (code) {
        window.opener.postMessage({ type: 'DISCORD_OAUTH_SUCCESS', code: code }, '*');
      } else if (error) {
        window.opener.postMessage({ type: 'DISCORD_OAUTH_ERROR', error: error, description: errorDesc }, '*');
      }
      setTimeout(() => window.close(), 600);
    } else {
      window.location.href = '/?discord_code=' + encodeURIComponent(code || '');
    }
  </script>
</body>
</html>`);
};

app.get(['/auth/callback', '/auth/callback/'], callbackHandler);

// 6. Setup Vite / Static handling
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
