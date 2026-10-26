// Cloud Database Service for Sinifimiz To'p Urarlari
// Provides real-time cross-device sync across all phones & computers on Vercel

const CLOUD_OBJECT_ID = 'ff808181a09d98f701a1784217b01559';
const CLOUD_API_URL = `https://api.restful-api.dev/objects/${CLOUD_OBJECT_ID}`;

// Helper to format players array into compact cloud payload
export function playersToCloudStats(players) {
  const stats = {};
  const customPlayers = [];

  players.forEach((p) => {
    stats[p.id] = {
      g: Number(p.goals) || 0,
      a: Number(p.assists) || 0,
      m: Number(p.matches) || 0
    };

    // If player was created dynamically (id starts with 'p_' or not standard 'p1'..'p9')
    if (p.id.startsWith('p_')) {
      customPlayers.push({
        id: p.id,
        name: p.name,
        position: p.position,
        jerseyNumber: p.jerseyNumber,
        className: p.className,
        photoUrl: p.photoUrl,
        bio: p.bio || '',
        foot: p.foot || "O‘ng",
        height: p.height || "175 sm",
        goals: Number(p.goals) || 0,
        assists: Number(p.assists) || 0,
        matches: Number(p.matches) || 0
      });
    }
  });

  return { stats, customPlayers };
}

// Fetch latest stats from cloud database
export async function fetchCloudStats() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6000);

  try {
    const res = await fetch(CLOUD_API_URL, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json'
      }
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`Cloud fetch failed with status ${res.status}`);
    }

    const json = await res.json();
    return json.data || null;
  } catch (err) {
    clearTimeout(timeoutId);
    console.warn('Cloud DB fetch error (falling back to local cache):', err.message);
    return null;
  }
}

// Save stats to cloud database
export async function saveCloudStats(players, teamInfo = null) {
  const { stats, customPlayers } = playersToCloudStats(players);
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000);

  const payload = {
    name: 'sinif_topurarlari_cloud_db',
    data: {
      stats,
      customPlayers,
      teamInfo: teamInfo || undefined,
      updatedAt: Date.now()
    }
  };

  try {
    const res = await fetch(CLOUD_API_URL, {
      method: 'PUT',
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`Cloud save failed with status ${res.status}`);
    }

    const result = await res.json();
    return result.data || null;
  } catch (err) {
    clearTimeout(timeoutId);
    console.warn('Cloud DB save error (saved locally):', err.message);
    return null;
  }
}
