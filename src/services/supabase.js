import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if credentials are properly configured
export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl.startsWith('https://') &&
  !supabaseUrl.includes('your-project')
);

// Create Supabase client with realtime enabled
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      realtime: {
        params: {
          eventsPerSecond: 10
        }
      }
    })
  : null;

// Helper to convert database row (snake_case) to client player object (camelCase)
export function rowToPlayer(row) {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name,
    jerseyNumber: Number(row.jersey_number) || 10,
    position: row.position || 'Hujumchi',
    className: row.class_name || '8-D sinf',
    goals: Number(row.goals) || 0,
    assists: Number(row.assists) || 0,
    matches: Number(row.matches) || 0,
    season: row.season || 'Bahor Kubogi 2025',
    photoUrl: row.photo_url || '/players/sanoqulov-oltinbek.jpg',
    bio: row.bio || '',
    foot: row.foot || 'O‘ng',
    height: row.height || '175 sm',
    mvpCount: Number(row.mvp_count) || 0,
    yellowCards: Number(row.yellow_cards) || 0,
    updatedAt: row.updated_at ? new Date(row.updated_at).getTime() : Date.now()
  };
}

// Helper to convert client player object (camelCase) to database row (snake_case)
export function playerToRow(player) {
  if (!player) return null;
  return {
    id: player.id,
    name: player.name,
    jersey_number: Number(player.jerseyNumber) || 10,
    position: player.position || 'Hujumchi',
    class_name: player.className || '8-D sinf',
    goals: Number(player.goals) || 0,
    assists: Number(player.assists) || 0,
    matches: Number(player.matches) || 0,
    season: player.season || 'Bahor Kubogi 2025',
    photo_url: player.photoUrl || '/players/sanoqulov-oltinbek.jpg',
    bio: player.bio || '',
    foot: player.foot || 'O‘ng',
    height: player.height || '175 sm',
    mvp_count: Number(player.mvpCount) || 0,
    yellow_cards: Number(player.yellowCards) || 0,
    updated_at: new Date().toISOString()
  };
}

// Test if Supabase is reachable and players table exists
export async function testSupabaseConnection() {
  if (!isSupabaseConfigured || !supabase) {
    return { ok: false, message: 'Supabase URL yoki Anon Key kiritilmagan (.env fayli kerak)' };
  }
  try {
    const { data, error } = await supabase.from('players').select('id').limit(1);
    if (error) {
      return { ok: false, message: error.message };
    }
    return { ok: true, message: 'Supabase bilan ulanish muvaffaqiyatli!' };
  } catch (err) {
    return { ok: false, message: err.message };
  }
}

// Fetch all players from Supabase
export async function fetchRemotePlayers() {
  if (!isSupabaseConfigured || !supabase) {
    return { data: null, error: 'Supabase client not configured' };
  }
  try {
    const { data, error } = await supabase
      .from('players')
      .select('*')
      .order('goals', { ascending: false });

    if (error) {
      console.warn('Supabase fetchRemotePlayers error:', error.message);
      return { data: null, error: error.message };
    }

    const playerList = Array.isArray(data) ? data.map(rowToPlayer) : [];
    return { data: playerList, error: null };
  } catch (err) {
    console.warn('Supabase fetchRemotePlayers exception:', err.message);
    return { data: null, error: err.message };
  }
}

// Atomic increment/decrement on Supabase
export async function incrementRemoteStat(playerId, field, amount = 1) {
  if (!supabase) return false;
  try {
    // Try RPC first for atomic concurrency safety
    const { data, error } = await supabase.rpc('increment_player_stat', {
      p_id: playerId,
      p_field: field,
      p_amount: amount
    });

    if (!error) return true;

    // Fallback direct update if RPC is not yet created
    const { data: current } = await supabase
      .from('players')
      .select(field)
      .eq('id', playerId)
      .single();

    const currentVal = current ? Number(current[field]) || 0 : 0;
    const nextVal = Math.max(0, currentVal + amount);

    const { error: updateError } = await supabase
      .from('players')
      .update({
        [field]: nextVal,
        updated_at: new Date().toISOString()
      })
      .eq('id', playerId);

    return !updateError;
  } catch (err) {
    console.warn('Supabase incrementRemoteStat exception:', err.message);
    return false;
  }
}

// Save or Update player row
export async function upsertRemotePlayer(player) {
  if (!supabase) return false;
  try {
    const row = playerToRow(player);
    const { error } = await supabase
      .from('players')
      .upsert(row, { onConflict: 'id' });

    return !error;
  } catch (err) {
    console.warn('Supabase upsertRemotePlayer exception:', err.message);
    return false;
  }
}

// Delete player row
export async function deleteRemotePlayer(playerId) {
  if (!supabase) return false;
  try {
    const { error } = await supabase
      .from('players')
      .delete()
      .eq('id', playerId);

    return !error;
  } catch (err) {
    console.warn('Supabase deleteRemotePlayer exception:', err.message);
    return false;
  }
}

// Reset all stats to 0
export async function resetRemoteStatsToZero() {
  if (!supabase) return false;
  try {
    const { error } = await supabase
      .from('players')
      .update({
        goals: 0,
        assists: 0,
        matches: 0,
        mvp_count: 0,
        updated_at: new Date().toISOString()
      })
      .neq('id', '');

    return !error;
  } catch (err) {
    console.warn('Supabase resetRemoteStatsToZero exception:', err.message);
    return false;
  }
}

// Realtime subscription setup
export function subscribeToPlayerChanges(onChangeCallback) {
  if (!supabase) return null;

  try {
    const channel = supabase
      .channel('public:players:realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'players' },
        (payload) => {
          if (onChangeCallback) {
            onChangeCallback(payload);
          }
        }
      )
      .subscribe((status) => {
        console.log('Supabase Realtime subscription status:', status);
      });

    return () => {
      supabase.removeChannel(channel);
    };
  } catch (err) {
    console.warn('Failed to subscribe to Supabase Realtime:', err);
    return null;
  }
}
