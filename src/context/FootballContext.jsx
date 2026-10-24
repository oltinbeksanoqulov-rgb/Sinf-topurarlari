import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  INITIAL_PLAYERS,
  INITIAL_TEAM_INFO,
  INITIAL_SEASONS
} from '../data/initialData';

const FootballContext = createContext(null);

const STORAGE_KEYS = {
  PLAYERS: 'sinif_topurarlari_players_v20_9players',
  TEAM_INFO: 'sinif_topurarlari_team_v20_9players',
  AUTH: 'sinif_topurarlari_admin_session_v20'
};

export function FootballProvider({ children }) {
  // Load initial players - ensure ALL students (including Misirov Umidjon) are loaded
  const [players, setPlayers] = useState(() => {
    try {
      const currentSaved = localStorage.getItem(STORAGE_KEYS.PLAYERS) || localStorage.getItem('sinif_topurarlari_players_v19_mobile_opt');
      if (currentSaved) {
        const parsed = JSON.parse(currentSaved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const existingIds = new Set(parsed.map(p => p.id));
          const existingNames = new Set(parsed.map(p => p.name.toLowerCase().trim()));
          
          // Keep existing stats for existing players, but ensure photos/data are valid
          const updatedExisting = parsed.map(p => {
            const initialMatch = INITIAL_PLAYERS.find(ip => ip.id === p.id || ip.name.toLowerCase().trim() === p.name.toLowerCase().trim());
            return {
              ...p,
              photoUrl: initialMatch?.photoUrl || p.photoUrl,
              position: p.position || initialMatch?.position || "Himoyachi",
              goals: Number(p.goals) || 0,
              assists: Number(p.assists) || 0,
              matches: Number(p.matches) || 0
            };
          });

          // Add any newly introduced initial players not yet in saved data (e.g. Misirov Umidjon)
          const newlyAdded = INITIAL_PLAYERS.filter(ip => !existingIds.has(ip.id) && !existingNames.has(ip.name.toLowerCase().trim()));

          const finalPlayers = [...updatedExisting, ...newlyAdded];
          localStorage.setItem(STORAGE_KEYS.PLAYERS, JSON.stringify(finalPlayers));
          return finalPlayers;
        }
      }

      localStorage.setItem(STORAGE_KEYS.PLAYERS, JSON.stringify(INITIAL_PLAYERS));
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
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isDualPanelMode, setIsDualPanelMode] = useState(false); // Side-by-side Two Panels mode
  const [lastUpdatedPlayerId, setLastUpdatedPlayerId] = useState(null); // For pulse animation

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

  // Live multi-tab / multi-window synchronization (Admin panel <-> Oddiy panel)
  useEffect(() => {
    let channel;
    try {
      if (typeof BroadcastChannel !== 'undefined') {
        channel = new BroadcastChannel('sinif_topurarlari_live_sync');
        channel.onmessage = (event) => {
          if (event.data?.type === 'PLAYERS_UPDATED' && Array.isArray(event.data.players)) {
            setPlayers(event.data.players);
            if (event.data.updatedPlayerId) {
              setLastUpdatedPlayerId(event.data.updatedPlayerId);
              setTimeout(() => setLastUpdatedPlayerId(null), 1500);
            }
          }
          if (event.data?.type === 'TEAM_UPDATED' && event.data.teamInfo) {
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
            setPlayers(parsed);
          }
        } catch (err) {
          console.error('Storage sync error:', err);
        }
      }
      if (e.key === STORAGE_KEYS.TEAM_INFO && e.newValue) {
        try {
          setTeamInfo(JSON.parse(e.newValue));
        } catch (err) {
          console.error('Team sync error:', err);
        }
      }
    };

    window.addEventListener('storage', handleStorage);

    return () => {
      if (channel) channel.close();
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  // Sync with localStorage & notify other tabs
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PLAYERS, JSON.stringify(players));
      if (typeof BroadcastChannel !== 'undefined') {
        const channel = new BroadcastChannel('sinif_topurarlari_live_sync');
        channel.postMessage({ type: 'PLAYERS_UPDATED', players, updatedPlayerId: lastUpdatedPlayerId });
        channel.close();
      }
    } catch (e) {
      console.error('LocalStorage error saving players:', e);
    }
  }, [players, lastUpdatedPlayerId]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.TEAM_INFO, JSON.stringify(teamInfo));
      if (typeof BroadcastChannel !== 'undefined') {
        const channel = new BroadcastChannel('sinif_topurarlari_live_sync');
        channel.postMessage({ type: 'TEAM_UPDATED', teamInfo });
        channel.close();
      }
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

  // Live Counter increment/decrement for connected panels
  const incrementStat = (playerId, field, amount = 1) => {
    setLastUpdatedPlayerId(playerId);
    setPlayers(prev =>
      prev.map(p => {
        if (p.id === playerId) {
          const currentVal = Number(p[field]) || 0;
          return {
            ...p,
            [field]: currentVal + amount
          };
        }
        return p;
      })
    );

    setSelectedPlayer(prev => {
      if (prev && prev.id === playerId) {
        return {
          ...prev,
          [field]: (Number(prev[field]) || 0) + amount
        };
      }
      return prev;
    });

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
    setLastUpdatedPlayerId(playerId);
    setPlayers(prev =>
      prev.map(p => {
        if (p.id === playerId) {
          const currentVal = Number(p[field]) || 0;
          return {
            ...p,
            [field]: Math.max(0, currentVal - amount)
          };
        }
        return p;
      })
    );

    setSelectedPlayer(prev => {
      if (prev && prev.id === playerId) {
        return {
          ...prev,
          [field]: Math.max(0, (Number(prev[field]) || 0) - amount)
        };
      }
      return prev;
    });

    const player = players.find(p => p.id === playerId);
    showToast(`${player ? player.name : 'Futbolchi'}: -${amount} kamaytirildi`, 'info');

    setTimeout(() => {
      setLastUpdatedPlayerId(null);
    }, 1500);
  };

  // Reset all player stats to 0
  const resetAllStatsToZero = () => {
    setPlayers(prev =>
      prev.map(p => ({
        ...p,
        goals: 0,
        assists: 0,
        matches: 0,
        mvpCount: 0
      }))
    );
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

  // Sorted rankings - Sanoqulov Oltinbek prioritized at top if equal or zero stats
  const goalsRankings = useMemo(() => {
    return [...filteredPlayers].sort((a, b) => {
      if ((b.goals || 0) !== (a.goals || 0)) return (b.goals || 0) - (a.goals || 0);
      if ((b.assists || 0) !== (a.assists || 0)) return (b.assists || 0) - (a.assists || 0);
      if ((a.matches || 0) !== (b.matches || 0)) return (a.matches || 0) - (b.matches || 0);
      if (a.name.toLowerCase().includes('sanoqulov')) return -1;
      if (b.name.toLowerCase().includes('sanoqulov')) return 1;
      return 0;
    });
  }, [filteredPlayers]);

  const assistsRankings = useMemo(() => {
    return [...filteredPlayers].sort((a, b) => {
      if ((b.assists || 0) !== (a.assists || 0)) return (b.assists || 0) - (a.assists || 0);
      if ((b.goals || 0) !== (a.goals || 0)) return (b.goals || 0) - (a.goals || 0);
      if ((a.matches || 0) !== (b.matches || 0)) return (a.matches || 0) - (b.matches || 0);
      if (a.name.toLowerCase().includes('sanoqulov')) return -1;
      if (b.name.toLowerCase().includes('sanoqulov')) return 1;
      return 0;
    });
  }, [filteredPlayers]);

  const matchesRankings = useMemo(() => {
    return [...filteredPlayers].sort((a, b) => {
      if ((b.matches || 0) !== (a.matches || 0)) return (b.matches || 0) - (a.matches || 0);
      if ((b.goals || 0) !== (a.goals || 0)) return (b.goals || 0) - (a.goals || 0);
      if ((b.assists || 0) !== (a.assists || 0)) return (b.assists || 0) - (a.assists || 0);
      if (a.name.toLowerCase().includes('sanoqulov')) return -1;
      if (b.name.toLowerCase().includes('sanoqulov')) return 1;
      return 0;
    });
  }, [filteredPlayers]);

  // Calculated statistics - When all stats are 0, totalGoals: 0, totalAssists: 0, totalMatches: 0
  const stats = useMemo(() => {
    const totalGoals = players.reduce((sum, p) => sum + (Number(p.goals) || 0), 0);
    const totalAssists = players.reduce((sum, p) => sum + (Number(p.assists) || 0), 0);
    const totalMatches = players.length > 0 ? Math.max(...players.map(p => Number(p.matches) || 0)) : 0;
    const totalPlayers = players.length;

    const hasAnyGoals = players.some(p => (Number(p.goals) || 0) > 0);
    const hasAnyAssists = players.some(p => (Number(p.assists) || 0) > 0);

    const findOltinbek = players.find(p => p.name.toLowerCase().includes('sanoqulov')) || players[0] || null;

    const topScorer = hasAnyGoals
      ? [...players].sort((a, b) => {
          if ((b.goals || 0) !== (a.goals || 0)) return (b.goals || 0) - (a.goals || 0);
          if (a.name.toLowerCase().includes('sanoqulov')) return -1;
          if (b.name.toLowerCase().includes('sanoqulov')) return 1;
          return 0;
        })[0]
      : findOltinbek;

    const topAssister = hasAnyAssists
      ? [...players].sort((a, b) => {
          if ((b.assists || 0) !== (a.assists || 0)) return (b.assists || 0) - (a.assists || 0);
          if (a.name.toLowerCase().includes('sanoqulov')) return -1;
          if (b.name.toLowerCase().includes('sanoqulov')) return 1;
          return 0;
        })[0]
      : findOltinbek;

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
  }, [players]);

  // CRUD for Players
  const addPlayer = (newPlayerData) => {
    const newPlayer = {
      ...newPlayerData,
      id: 'p_' + Date.now(),
      goals: Number(newPlayerData.goals) || 0,
      assists: Number(newPlayerData.assists) || 0,
      matches: Number(newPlayerData.matches) || 0,
      jerseyNumber: Number(newPlayerData.jerseyNumber) || 10,
      season: newPlayerData.season || 'Bahor Kubogi 2025'
    };
    setPlayers(prev => [newPlayer, ...prev]);
    showToast(`"${newPlayer.name}" ro‘yxatga qo‘shildi!`);
    return newPlayer;
  };

  const updatePlayer = (id, updatedData) => {
    setPlayers(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updatedData, id } : p))
    );
    showToast(`Futbolchi ma'lumotlari yangilandi!`);
    if (selectedPlayer && selectedPlayer.id === id) {
      setSelectedPlayer(prev => ({ ...prev, ...updatedData }));
    }
  };

  const deletePlayer = (id) => {
    const playerToDelete = players.find(p => p.id === id);
    setPlayers(prev => prev.filter(p => p.id !== id));
    if (selectedPlayer && selectedPlayer.id === id) {
      setSelectedPlayer(null);
    }
    showToast(`"${playerToDelete?.name || "O‘yinchi"}" o‘chirildi`, 'info');
  };

  // Reset to default data
  const resetToDefaults = () => {
    const zeroed = INITIAL_PLAYERS.map(p => ({
      ...p,
      goals: 0,
      assists: 0,
      matches: 0,
      mvpCount: 0
    }));
    setPlayers(zeroed);
    setTeamInfo(INITIAL_TEAM_INFO);
    localStorage.removeItem(STORAGE_KEYS.PLAYERS);
    localStorage.removeItem(STORAGE_KEYS.TEAM_INFO);
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
