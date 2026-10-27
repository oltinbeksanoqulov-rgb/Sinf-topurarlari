import React, { createContext, useContext, useState, useEffect, useMemo, useRef, useCallback } from 'react';
import {
  INITIAL_PLAYERS,
  INITIAL_TEAM_INFO,
  INITIAL_SEASONS
} from '../data/initialData';
import {
  isSupabaseConfigured,
  fetchRemotePlayers,
  incrementRemoteStat,
  upsertRemotePlayer,
  deleteRemotePlayer,
  resetRemoteStatsToZero,
  subscribeToPlayerChanges,
  rowToPlayer
} from '../services/supabase';

const FootballContext = createContext(null);

const STORAGE_KEYS = {
  PLAYERS: 'sinif_topurarlari_players_master_data',
  TEAM_INFO: 'sinif_topurarlari_team_master_data',
  AUTH: 'sinif_topurarlari_admin_session_v20'
};

const LEGACY_STORAGE_KEYS = [
  'sinif_topurarlari_players_master_data',
  'sinif_topurarlari_players_v20_9players',
  'sinif_topurarlari_players_v19_mobile_opt',
  'sinif_topurarlari_players_v18',
  'sinif_topurarlari_players_data',
  'sinif_topurarlari_players'
];

// Helper to write to local storage reliably
function savePlayersToStorage(playerList) {
  try {
    const json = JSON.stringify(playerList);
    localStorage.setItem(STORAGE_KEYS.PLAYERS, json);
    localStorage.setItem('sinif_topurarlari_players_v20_9players', json);
  } catch (err) {
    console.error('LocalStorage write error:', err);
  }
}

export function FootballProvider({ children }) {
  // Load initial players - ensure ALL students (including Misirov Umidjon) are loaded with their saved stats
  const [players, setPlayers] = useState(() => {
    try {
      let savedJson = null;
      for (const key of LEGACY_STORAGE_KEYS) {
        const val = localStorage.getItem(key);
        if (val) {
          try {
            const parsed = JSON.parse(val);
            if (Array.isArray(parsed) && parsed.length > 0) {
              savedJson = parsed;
              break;
            }
          } catch {}
        }
      }

      if (savedJson && Array.isArray(savedJson) && savedJson.length > 0) {
        const existingMap = new Map();
        savedJson.forEach((p) => {
          if (p && p.id) existingMap.set(p.id, p);
          if (p && p.name) existingMap.set(p.name.trim().toLowerCase(), p);
        });

        // Merge INITIAL_PLAYERS with saved stats so that:
        // 1. All official players (p1 to p9) are always present with official static photos and positions.
        // 2. Saved non-zero goals, assists, matches are strictly preserved!
        const merged = INITIAL_PLAYERS.map((base) => {
          const saved = existingMap.get(base.id) || existingMap.get(base.name.trim().toLowerCase());
          if (saved) {
            return {
              ...base,
              photoUrl: base.photoUrl,
              position: saved.position || base.position,
              goals: Number(saved.goals) || 0,
              assists: Number(saved.assists) || 0,
              matches: Number(saved.matches) || 0,
              yellowCards: Number(saved.yellowCards) || 0,
              mvpCount: Number(saved.mvpCount) || 0
            };
          }
          return {
            ...base,
            goals: 0,
            assists: 0,
            matches: 0
          };
        });

        // Also append any custom added players (id starts with 'p_')
        savedJson.forEach((p) => {
          if (p && p.id && p.id.startsWith('p_') && !merged.some((m) => m.id === p.id)) {
            merged.push({
              ...p,
              goals: Number(p.goals) || 0,
              assists: Number(p.assists) || 0,
              matches: Number(p.matches) || 0
            });
          }
        });

        savePlayersToStorage(merged);
        return merged;
      }

      savePlayersToStorage(INITIAL_PLAYERS);
      return INITIAL_PLAYERS;
    } catch {
      return INITIAL_PLAYERS;
    }
  });

  const [teamInfo, setTeamInfo] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TEAM_INFO) || localStorage.getItem('sinif_topurarlari_team_v19_mobile_opt');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.name) {
          parsed.name = parsed.name.replace(/['"]?Burgutlar['"]?/gi, '').trim();
        }
        delete parsed.captain;
        delete parsed.coach;
        parsed.teamPhotoUrl = "/team-banner.jpg";
        return parsed;
      }
      return INITIAL_TEAM_INFO;
    } catch {
      return INITIAL_TEAM_INFO;
    }
  });

  // UI state
  const [selectedSeason, setSelectedSeason] = useState('Jami mavsum');
  const [searchQuery, setSearchQuery] = useState('');
  const [leaderboardTab, setLeaderboardTab] = useState('goals'); // 'goals' | 'assists'
  const [selectedPlayerId, setSelectedPlayerId] = useState(null);
  const selectedPlayer = useMemo(() => {
    if (!selectedPlayerId) return null;
    return players.find(p => p.id === selectedPlayerId) || null;
  }, [players, selectedPlayerId]);

  const setSelectedPlayer = useCallback((playerOrId) => {
    if (!playerOrId) {
      setSelectedPlayerId(null);
    } else if (typeof playerOrId === 'string') {
      setSelectedPlayerId(playerOrId);
    } else if (playerOrId.id) {
      setSelectedPlayerId(playerOrId.id);
    }
  }, []);

  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isDualPanelMode, setIsDualPanelMode] = useState(false); // Side-by-side Two Panels mode
  const [lastUpdatedPlayerId, setLastUpdatedPlayerId] = useState(null); // For pulse animation
  const [cloudSyncStatus, setCloudSyncStatus] = useState(() => 
    isSupabaseConfigured ? 'connecting' : 'unconfigured'
  ); // 'connected' | 'connecting' | 'unconfigured' | 'syncing' | 'error'
  const lastLocalEditTimeRef = useRef(0);
  const isRemoteUpdateRef = useRef(false);
  const broadcastChannelRef = useRef(null);

  const [isAdmin, setIsAdmin] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.AUTH) === 'true';
    } catch {
      return false;
    }
  });

  // Delete confirmation dialog state
  const [deleteConfirm, setDeleteConfirm] = useState({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: null
  });

  // Toast notification
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ id: Date.now(), message, type });
    setTimeout(() => {
      setToast(null);
    }, 3200);
  };

  // Manual refresh from Supabase function
  const refreshFromCloud = useCallback(async () => {
    if (!isSupabaseConfigured) {
      showToast("Supabase hali ulanmagan (.env sozlanishi kerak)", "info");
      return;
    }

    try {
      setCloudSyncStatus('syncing');
      const { data: remoteList, error } = await fetchRemotePlayers();
      if (error) {
        setCloudSyncStatus('error');
        showToast("Bulutdan yuklashda xatolik yuz berdi: " + error, "error");
        return;
      }

      if (remoteList && remoteList.length > 0) {
        setPlayers((prevPlayers) => {
          const remoteMap = new Map(remoteList.map(p => [p.id, p]));
          const merged = prevPlayers.map(p => {
            const remoteP = remoteMap.get(p.id);
            if (remoteP) {
              return {
                ...p,
                goals: Number(remoteP.goals) || 0,
                assists: Number(remoteP.assists) || 0,
                matches: Number(remoteP.matches) || 0
              };
            }
            return p;
          });

          remoteList.forEach(rp => {
            if (!merged.some(m => m.id === rp.id)) {
              merged.push(rp);
            }
          });

          savePlayersToStorage(merged);
          return merged;
        });
        setCloudSyncStatus('connected');
        showToast("Supabase bilan muvaffaqiyatli yangilandi!", "success");
      } else {
        setCloudSyncStatus('connected');
      }
    } catch (err) {
      console.warn('Manual refresh error:', err);
      setCloudSyncStatus('error');
      showToast("Bulutdan yuklashda xatolik yuz berdi", "error");
    }
  }, []);

  // Supabase Initial Sync & REALTIME WebSocket Subscription across all devices
  useEffect(() => {
    if (!isSupabaseConfigured) {
      setCloudSyncStatus('unconfigured');
      return;
    }

    let isMounted = true;

    async function initSupabase() {
      try {
        setCloudSyncStatus('connecting');
        const { data: remoteList, error } = await fetchRemotePlayers();
        if (error) {
          console.warn('Supabase fetch error:', error);
          if (isMounted) setCloudSyncStatus('error');
          return;
        }

        if (remoteList && remoteList.length > 0 && isMounted) {
          setPlayers((prevPlayers) => {
            const remoteMap = new Map(remoteList.map(p => [p.id, p]));
            const merged = prevPlayers.map(p => {
              const remoteP = remoteMap.get(p.id);
              if (remoteP) {
                return {
                  ...p,
                  goals: Number(remoteP.goals) || 0,
                  assists: Number(remoteP.assists) || 0,
                  matches: Number(remoteP.matches) || 0
                };
              }
              return p;
            });

            remoteList.forEach(rp => {
              if (!merged.some(m => m.id === rp.id)) {
                merged.push(rp);
              }
            });

            savePlayersToStorage(merged);
            return merged;
          });
          setCloudSyncStatus('connected');
        } else if (remoteList && remoteList.length === 0 && isMounted) {
          // If Supabase table is empty on first setup, seed it with current players!
          players.forEach(p => upsertRemotePlayer(p));
          setCloudSyncStatus('connected');
        }
      } catch (err) {
        console.warn('Supabase init error:', err);
        if (isMounted) setCloudSyncStatus('error');
      }
    }

    initSupabase();

    // Subscribe to REALTIME postgres_changes on 'players' table
    const unsubscribe = subscribeToPlayerChanges((payload) => {
      console.log('⚡ Realtime player event received:', payload.eventType);

      if (payload.eventType === 'UPDATE' || payload.eventType === 'INSERT') {
        const updatedPlayer = rowToPlayer(payload.new);
        if (!updatedPlayer) return;

        isRemoteUpdateRef.current = true;
        setPlayers((prev) => {
          let found = false;
          const next = prev.map((p) => {
            if (p.id === updatedPlayer.id) {
              found = true;
              return {
                ...p,
                ...updatedPlayer,
                photoUrl: p.photoUrl || updatedPlayer.photoUrl
              };
            }
            return p;
          });

          if (!found) {
            next.push(updatedPlayer);
          }

          savePlayersToStorage(next);
          return next;
        });

        // Trigger pulse highlight on the updated player card
        setLastUpdatedPlayerId(updatedPlayer.id);
        setTimeout(() => setLastUpdatedPlayerId(null), 1500);
      } else if (payload.eventType === 'DELETE') {
        const deletedId = payload.old?.id;
        if (deletedId) {
          isRemoteUpdateRef.current = true;
          setPlayers((prev) => {
            const next = prev.filter((p) => p.id !== deletedId);
            savePlayersToStorage(next);
            return next;
          });
        }
      }
    });

    return () => {
      isMounted = false;
      if (unsubscribe) unsubscribe();
    };
  }, []);

  // Live multi-tab / multi-window synchronization (Admin panel <-> Oddiy panel)
  useEffect(() => {
    try {
      if (typeof BroadcastChannel !== 'undefined') {
        broadcastChannelRef.current = new BroadcastChannel('sinif_topurarlari_live_sync');
        broadcastChannelRef.current.onmessage = (event) => {
          if (event.data?.type === 'PLAYERS_UPDATED' && Array.isArray(event.data.players)) {
            isRemoteUpdateRef.current = true;
            setPlayers(event.data.players);
            if (event.data.updatedPlayerId) {
              setLastUpdatedPlayerId(event.data.updatedPlayerId);
              setTimeout(() => setLastUpdatedPlayerId(null), 1500);
            }
          }
          if (event.data?.type === 'TEAM_UPDATED' && event.data.teamInfo) {
            isRemoteUpdateRef.current = true;
            setTeamInfo(event.data.teamInfo);
          }
        };
      }
    } catch (e) {
      console.warn('BroadcastChannel not supported', e);
    }

    const handleStorage = (e) => {
      if (e.key === STORAGE_KEYS.PLAYERS && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) {
            isRemoteUpdateRef.current = true;
            setPlayers(parsed);
          }
        } catch (err) {
          console.error('Storage sync error:', err);
        }
      }
      if (e.key === STORAGE_KEYS.TEAM_INFO && e.newValue) {
        try {
          isRemoteUpdateRef.current = true;
          setTeamInfo(JSON.parse(e.newValue));
        } catch (err) {
          console.error('Team sync error:', err);
        }
      }
    };

    window.addEventListener('storage', handleStorage);

    return () => {
      if (broadcastChannelRef.current) {
        broadcastChannelRef.current.close();
        broadcastChannelRef.current = null;
      }
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  // Sync with localStorage & notify other tabs
  useEffect(() => {
    try {
      savePlayersToStorage(players);
      if (!isRemoteUpdateRef.current && broadcastChannelRef.current) {
        broadcastChannelRef.current.postMessage({
          type: 'PLAYERS_UPDATED',
          players,
          updatedPlayerId: lastUpdatedPlayerId
        });
      }
      isRemoteUpdateRef.current = false;
    } catch (e) {
      console.error('LocalStorage error saving players:', e);
    }
  }, [players]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.TEAM_INFO, JSON.stringify(teamInfo));
      if (!isRemoteUpdateRef.current && broadcastChannelRef.current) {
        broadcastChannelRef.current.postMessage({ type: 'TEAM_UPDATED', teamInfo });
      }
      isRemoteUpdateRef.current = false;
    } catch (e) {
      console.error('LocalStorage error saving teamInfo:', e);
    }
  }, [teamInfo]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.AUTH, isAdmin ? 'true' : 'false');
    } catch (e) {
      console.error('LocalStorage error saving auth:', e);
    }
  }, [isAdmin]);

  // Auth function with strict login and password requirements
  const loginAdmin = (loginInput, passwordInput) => {
    const trimmedLogin = (loginInput || '').trim();
    const trimmedPassword = (passwordInput || '').trim();

    // Exact credentials specified by user:
    // login: 3-Fevral2012!
    // parol: do.adari_12
    if (trimmedLogin === '3-Fevral2012!' && trimmedPassword === 'do.adari_12') {
      setIsAdmin(true);
      showToast("Boshqaruv paneliga muvaffaqiyatli kirdingiz!", 'success');
      return true;
    } else {
      showToast("Login yoki parol noto‘g‘ri!", 'error');
      return false;
    }
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    setIsDualPanelMode(false);
    showToast("Admin rejimidan chiqildi", 'info');
  };

  // Live Counter increment/decrement for connected panels & Supabase Realtime DB
  const incrementStat = (playerId, field, amount = 1) => {
    if (!isAdmin) {
      showToast("Faqat admin statistikani o‘zgartirishi mumkin!", 'error');
      return;
    }

    lastLocalEditTimeRef.current = Date.now();
    setLastUpdatedPlayerId(playerId);
    
    setPlayers(prev => {
      const next = prev.map(p => {
        if (p.id === playerId) {
          const currentVal = Number(p[field]) || 0;
          return {
            ...p,
            [field]: Math.max(0, currentVal + amount)
          };
        }
        return p;
      });
      savePlayersToStorage(next);
      return next;
    });

    // Atomic increment directly on Supabase database
    if (isSupabaseConfigured) {
      incrementRemoteStat(playerId, field, amount);
    }

    const player = players.find(p => p.id === playerId);
    const fieldNames = {
      goals: 'gol',
      assists: 'assist',
      matches: 'o‘yin'
    };
    showToast(`${player ? player.name : 'Futbolchi'}: +${amount} ${fieldNames[field] || field}!`, 'success');
    
    setTimeout(() => {
      setLastUpdatedPlayerId(null);
    }, 1500);
  };

  const decrementStat = (playerId, field, amount = 1) => {
    if (!isAdmin) {
      showToast("Faqat admin statistikani o‘zgartirishi mumkin!", 'error');
      return;
    }

    lastLocalEditTimeRef.current = Date.now();
    setLastUpdatedPlayerId(playerId);

    setPlayers(prev => {
      const next = prev.map(p => {
        if (p.id === playerId) {
          const currentVal = Number(p[field]) || 0;
          return {
            ...p,
            [field]: Math.max(0, currentVal - amount)
          };
        }
        return p;
      });
      savePlayersToStorage(next);
      return next;
    });

    // Atomic decrement directly on Supabase database
    if (isSupabaseConfigured) {
      incrementRemoteStat(playerId, field, -amount);
    }

    const player = players.find(p => p.id === playerId);
    showToast(`${player ? player.name : 'Futbolchi'}: -${amount} kamaytirildi`, 'info');

    setTimeout(() => {
      setLastUpdatedPlayerId(null);
    }, 1500);
  };

  // Reset all player stats to 0
  const resetAllStatsToZero = () => {
    if (!isAdmin) {
      showToast("Faqat admin statistikani tozalashi mumkin!", 'error');
      return;
    }

    lastLocalEditTimeRef.current = Date.now();
    setPlayers(prev => {
      const zeroed = prev.map(p => ({
        ...p,
        goals: 0,
        assists: 0,
        matches: 0,
        mvpCount: 0
      }));
      savePlayersToStorage(zeroed);
      return zeroed;
    });

    if (isSupabaseConfigured) {
      resetRemoteStatsToZero();
    }

    showToast("Barcha futbolchilar statistikasi 0 ga tenglashtirildi!", 'info');
  };

  // Filtered players based on season and search
  const filteredPlayers = useMemo(() => {
    return players.filter(p => {
      const matchesSeason =
        selectedSeason === 'Jami mavsum' || p.season === selectedSeason || !p.season;
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.className && p.className.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (p.position && p.position.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesSeason && matchesSearch;
    });
  }, [players, selectedSeason, searchQuery]);

  // Unified sorting helpers
  const sortPlayersByGoals = (list) => {
    return [...list].sort((a, b) => {
      const gB = Number(b.goals) || 0;
      const gA = Number(a.goals) || 0;
      if (gB !== gA) return gB - gA;

      const aB = Number(b.assists) || 0;
      const aA = Number(a.assists) || 0;
      if (aB !== aA) return aB - aA;

      const mA = Number(a.matches) || 0;
      const mB = Number(b.matches) || 0;
      if (mA !== mB) return mA - mB;

      if (a.name.toLowerCase().includes('sanoqulov')) return -1;
      if (b.name.toLowerCase().includes('sanoqulov')) return 1;
      return a.name.localeCompare(b.name);
    });
  };

  const sortPlayersByAssists = (list) => {
    return [...list].sort((a, b) => {
      const aB = Number(b.assists) || 0;
      const aA = Number(a.assists) || 0;
      if (aB !== aA) return aB - aA;

      const gB = Number(b.goals) || 0;
      const gA = Number(a.goals) || 0;
      if (gB !== gA) return gB - gA;

      const mA = Number(a.matches) || 0;
      const mB = Number(b.matches) || 0;
      if (mA !== mB) return mA - mB;

      if (a.name.toLowerCase().includes('sanoqulov')) return -1;
      if (b.name.toLowerCase().includes('sanoqulov')) return 1;
      return a.name.localeCompare(b.name);
    });
  };

  const sortPlayersByMatches = (list) => {
    return [...list].sort((a, b) => {
      const mB = Number(b.matches) || 0;
      const mA = Number(a.matches) || 0;
      if (mB !== mA) return mB - mA;

      const gB = Number(b.goals) || 0;
      const gA = Number(a.goals) || 0;
      if (gB !== gA) return gB - gA;

      const aB = Number(b.assists) || 0;
      const aA = Number(a.assists) || 0;
      if (aB !== aA) return aB - aA;

      if (a.name.toLowerCase().includes('sanoqulov')) return -1;
      if (b.name.toLowerCase().includes('sanoqulov')) return 1;
      return a.name.localeCompare(b.name);
    });
  };

  // True team rankings from entire squad (unfiltered)
  const allGoalsRankings = useMemo(() => sortPlayersByGoals(players), [players]);
  const allAssistsRankings = useMemo(() => sortPlayersByAssists(players), [players]);
  const allMatchesRankings = useMemo(() => sortPlayersByMatches(players), [players]);

  // Tabular rankings for Leaderboard (filtered by season and search)
  const goalsRankings = useMemo(() => sortPlayersByGoals(filteredPlayers), [filteredPlayers]);
  const assistsRankings = useMemo(() => sortPlayersByAssists(filteredPlayers), [filteredPlayers]);
  const matchesRankings = useMemo(() => sortPlayersByMatches(filteredPlayers), [filteredPlayers]);

  // Calculated statistics - Strictly aligned with rankings and true database values
  const stats = useMemo(() => {
    const totalGoals = players.reduce((sum, p) => sum + (Number(p.goals) || 0), 0);
    const totalAssists = players.reduce((sum, p) => sum + (Number(p.assists) || 0), 0);
    const totalMatches = players.length > 0 ? Math.max(...players.map(p => Number(p.matches) || 0)) : 0;
    const totalPlayers = players.length;

    const hasAnyGoals = players.some(p => (Number(p.goals) || 0) > 0);
    const hasAnyAssists = players.some(p => (Number(p.assists) || 0) > 0);

    const defaultLeader = players.find(p => p.name.toLowerCase().includes('sanoqulov')) || players[0] || null;

    // Derived from allGoalsRankings and allAssistsRankings so search queries never distort topScorer and topAssister!
    const topScorer = hasAnyGoals ? (allGoalsRankings[0] || defaultLeader) : defaultLeader;
    const topAssister = hasAnyAssists ? (allAssistsRankings[0] || defaultLeader) : defaultLeader;

    return {
      totalGoals,
      totalAssists,
      totalMatches,
      totalPlayers,
      hasAnyGoals,
      hasAnyAssists,
      topScorer,
      topAssister
    };
  }, [players, allGoalsRankings, allAssistsRankings]);

  // CRUD for Players with Supabase Realtime Sync
  const addPlayer = (newPlayerData) => {
    if (!isAdmin) {
      showToast("Faqat admin yangi futbolchi qo‘shishi mumkin!", 'error');
      return null;
    }

    lastLocalEditTimeRef.current = Date.now();
    const newPlayer = {
      ...newPlayerData,
      id: 'p_' + Date.now(),
      goals: Math.max(0, parseInt(newPlayerData.goals, 10) || 0),
      assists: Math.max(0, parseInt(newPlayerData.assists, 10) || 0),
      matches: Math.max(0, parseInt(newPlayerData.matches, 10) || 0),
      jerseyNumber: Math.max(1, parseInt(newPlayerData.jerseyNumber, 10) || 10),
      season: newPlayerData.season || 'Bahor Kubogi 2025'
    };
    setPlayers(prev => {
      const next = [newPlayer, ...prev];
      savePlayersToStorage(next);
      return next;
    });

    if (isSupabaseConfigured) {
      upsertRemotePlayer(newPlayer);
    }

    showToast(`"${newPlayer.name}" ro‘yxatga qo‘shildi!`);
    return newPlayer;
  };

  const updatePlayer = (id, updatedData) => {
    if (!isAdmin) {
      showToast("Faqat admin futbolchini tahrirlashi mumkin!", 'error');
      return;
    }

    lastLocalEditTimeRef.current = Date.now();
    let updatedPlayerObj = null;
    setPlayers(prev => {
      const next = prev.map(p => {
        if (p.id === id) {
          updatedPlayerObj = {
            ...p,
            ...updatedData,
            id,
            goals: Number(updatedData.goals !== undefined ? updatedData.goals : p.goals) || 0,
            assists: Number(updatedData.assists !== undefined ? updatedData.assists : p.assists) || 0,
            matches: Number(updatedData.matches !== undefined ? updatedData.matches : p.matches) || 0,
            jerseyNumber: Number(updatedData.jerseyNumber !== undefined ? updatedData.jerseyNumber : p.jerseyNumber) || 10
          };
          return updatedPlayerObj;
        }
        return p;
      });
      savePlayersToStorage(next);
      return next;
    });

    if (isSupabaseConfigured && updatedPlayerObj) {
      upsertRemotePlayer(updatedPlayerObj);
    }

    showToast(`Futbolchi ma'lumotlari yangilandi!`);
  };

  const deletePlayer = (id) => {
    if (!isAdmin) {
      showToast("Faqat admin futbolchini o‘chira oladi!", 'error');
      return;
    }

    lastLocalEditTimeRef.current = Date.now();
    const playerToDelete = players.find(p => p.id === id);
    setPlayers(prev => {
      const next = prev.filter(p => p.id !== id);
      savePlayersToStorage(next);
      return next;
    });

    if (isSupabaseConfigured) {
      deleteRemotePlayer(id);
    }

    if (selectedPlayerId === id) {
      setSelectedPlayerId(null);
    }
    showToast(`"${playerToDelete?.name || "O‘yinchi"}" o‘chirildi`, 'info');
  };

  // Reset to default data
  const resetToDefaults = () => {
    if (!isAdmin) {
      showToast("Faqat admin ma'lumotlarni qaytarishi mumkin!", 'error');
      return;
    }

    lastLocalEditTimeRef.current = Date.now();
    const zeroed = INITIAL_PLAYERS.map(p => ({
      ...p,
      goals: 0,
      assists: 0,
      matches: 0,
      mvpCount: 0
    }));
    setPlayers(zeroed);
    setTeamInfo(INITIAL_TEAM_INFO);
    savePlayersToStorage(zeroed);
    try {
      localStorage.setItem(STORAGE_KEYS.TEAM_INFO, JSON.stringify(INITIAL_TEAM_INFO));
    } catch {}

    if (isSupabaseConfigured) {
      resetRemoteStatsToZero();
    }

    showToast("Barcha boshlang‘ich ma'lumotlar 0 ga qaytarildi!", 'info');
  };

  // Delete confirmation requester
  const confirmDelete = ({ title, message, onConfirm }) => {
    setDeleteConfirm({
      isOpen: true,
      title,
      message,
      onConfirm: () => {
        onConfirm();
        setDeleteConfirm(prev => ({ ...prev, isOpen: false }));
      }
    });
  };

  const closeDeleteConfirm = () => {
    setDeleteConfirm(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <FootballContext.Provider
      value={{
        // Data
        players,
        filteredPlayers,
        goalsRankings,
        assistsRankings,
        matchesRankings,
        teamInfo,
        seasons: INITIAL_SEASONS,
        stats,

        // Filters & UI State
        selectedSeason,
        setSelectedSeason,
        searchQuery,
        setSearchQuery,
        leaderboardTab,
        setLeaderboardTab,

        // Dual Panel / Split view state
        isDualPanelMode,
        setIsDualPanelMode,
        lastUpdatedPlayerId,

        // Cloud Database Sync
        cloudSyncStatus,
        refreshFromCloud,

        // Modals & Active items
        selectedPlayer,
        setSelectedPlayer,
        isAdminModalOpen,
        setIsAdminModalOpen,

        // Auth
        isAdmin,
        loginAdmin,
        logoutAdmin,

        // Confirmation & Toast
        deleteConfirm,
        confirmDelete,
        closeDeleteConfirm,
        toast,
        showToast,

        // Live Counter Mutators
        incrementStat,
        decrementStat,
        resetAllStatsToZero,

        // CRUD Mutators
        addPlayer,
        updatePlayer,
        deletePlayer,
        updateTeamInfo: (info) => {
          if (!isAdmin) {
            showToast("Faqat admin jamoa ma'lumotlarini o‘zgartirishi mumkin!", 'error');
            return;
          }
          lastLocalEditTimeRef.current = Date.now();
          setTeamInfo(info);
          showToast("Jamoa ma'lumotlari saqlandi!");
        },
        resetToDefaults
      }}
    >
      {children}
    </FootballContext.Provider>
  );
}

export function useFootball() {
  const context = useContext(FootballContext);
  if (!context) {
    throw new Error('useFootball must be used within a FootballProvider');
  }
  return context;
}
