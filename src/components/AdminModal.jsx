import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  UserPlus, 
  Trash2, 
  Edit3, 
  RotateCcw, 
  Upload, 
  Users, 
  Info,
  Flame, 
  Share2, 
  Calendar, 
  Plus, 
  Minus, 
  Zap,
  KeyRound
} from 'lucide-react';
import { useFootball } from '../context/FootballContext';
import { PRESET_AVATARS } from '../data/initialData';
import ImageWithFallback from './ImageWithFallback';

export default function AdminModal() {
  const { 
    isAdminModalOpen, 
    setIsAdminModalOpen, 
    isAdmin, 
    loginAdmin, 
    logoutAdmin,
    players,
    addPlayer,
    updatePlayer,
    deletePlayer,
    teamInfo,
    updateTeamInfo,
    resetToDefaults,
    confirmDelete,
    incrementStat,
    decrementStat,
    resetAllStatsToZero,
    lastUpdatedPlayerId,
    cloudSyncStatus,
    refreshFromCloud
  } = useFootball();

  const [activeTab, setActiveTab] = useState('live'); // 'live' | 'players' | 'team'
  const [loginInput, setLoginInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  
  // Player form state
  const [editingPlayerId, setEditingPlayerId] = useState(null);
  const [isPlayerFormOpen, setIsPlayerFormOpen] = useState(false);
  const [playerFormData, setPlayerFormData] = useState({
    name: '',
    jerseyNumber: 10,
    position: 'Hujumchi',
    className: '8-D sinf',
    goals: 0,
    assists: 0,
    matches: 0,
    photoUrl: PRESET_AVATARS[0],
    bio: '',
    foot: "O‘ng",
    height: "175 sm",
    mvpCount: 0
  });

  // Team form state
  const [teamFormData, setTeamFormData] = useState(teamInfo);

  if (!isAdminModalOpen) return null;

  // Handle Login with strict user credentials
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const success = loginAdmin(loginInput, passwordInput);
    if (success) {
      setLoginInput('');
      setPasswordInput('');
    }
  };

  // Player file upload helper (convert to DataURL)
  const handlePlayerPhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPlayerFormData(prev => ({ ...prev, photoUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Save Player
  const handleSavePlayer = (e) => {
    e.preventDefault();
    if (!playerFormData.name.trim()) return;

    const payload = {
      ...playerFormData,
      goals: Math.max(0, parseInt(playerFormData.goals, 10) || 0),
      assists: Math.max(0, parseInt(playerFormData.assists, 10) || 0),
      matches: Math.max(0, parseInt(playerFormData.matches, 10) || 0),
      jerseyNumber: Math.max(1, parseInt(playerFormData.jerseyNumber, 10) || 10)
    };

    if (editingPlayerId) {
      updatePlayer(editingPlayerId, payload);
    } else {
      addPlayer(payload);
    }

    setIsPlayerFormOpen(false);
    setEditingPlayerId(null);
  };

  const handleEditPlayerClick = (p) => {
    setEditingPlayerId(p.id);
    setPlayerFormData({
      name: p.name,
      jerseyNumber: p.jerseyNumber,
      position: p.position,
      className: p.className || '8-D sinf',
      goals: p.goals,
      assists: p.assists,
      matches: p.matches,
      photoUrl: p.photoUrl,
      bio: p.bio || '',
      foot: p.foot || "O‘ng",
      height: p.height || "175 sm",
      mvpCount: p.mvpCount || 0
    });
    setIsPlayerFormOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        onClick={() => setIsAdminModalOpen(false)}
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity" 
      />

      {/* Main Panel Box */}
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-slate-950 border border-slate-700/80 rounded-3xl shadow-[0_0_60px_rgba(0,0,0,0.95)] z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white flex items-center gap-2">
                Boshqaruv Paneli
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  ADMIN v2.0
                </span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded border flex items-center gap-1 ${
                  cloudSyncStatus === 'syncing' ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' :
                  cloudSyncStatus === 'synced' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' :
                  'bg-rose-500/20 text-rose-300 border-rose-500/40'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    cloudSyncStatus === 'syncing' ? 'bg-amber-400 animate-spin' :
                    cloudSyncStatus === 'synced' ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'
                  }`}></span>
                  {cloudSyncStatus === 'syncing' ? 'Bulutga saqlanmoqda...' :
                   cloudSyncStatus === 'synced' ? 'Jonli Bulut Ulangan' : 'Oflayn rejim'}
                </span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Jonli hisoblagich (+1 / -1), barcha o‘quvchilar telefonlariga bir zumda uzatiladi
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAdminModalOpen(false)}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Auth Barrier if not logged in */}
        {!isAdmin ? (
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center max-w-md mx-auto my-auto">
            <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-emerald-400 mb-4 shadow-inner">
              <Lock className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-white mb-2">Admin Kirish</h3>
            <p className="text-xs text-slate-400 mb-6">
              Veb-saytni boshqarish uchun belgilangan login va parolni kiriting:
            </p>

            <form onSubmit={handleLoginSubmit} className="w-full space-y-4 text-left">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Login
                </label>
                <input
                  type="text"
                  required
                  placeholder="Loginni kiriting..."
                  value={loginInput}
                  onChange={(e) => setLoginInput(e.target.value)}
                  autoFocus
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Parol
                </label>
                <input
                  type="password"
                  required
                  placeholder="Parolni kiriting..."
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 text-black font-extrabold text-sm hover:from-emerald-400 hover:to-green-400 transition-all shadow-[0_0_20px_rgba(0,245,118,0.4)] mt-2"
              >
                Tizimga Kirish
              </button>
            </form>
          </div>
        ) : (
          /* Admin Main Screen */
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Admin Tabs */}
            <div className="flex border-b border-slate-800 bg-slate-900/40 px-6 gap-2 overflow-x-auto">
              <button
                onClick={() => setActiveTab('live')}
                className={`py-3.5 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeTab === 'live'
                    ? 'border-emerald-400 text-emerald-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Zap className="w-4 h-4 text-emerald-400 fill-emerald-400" />
                <span>⚡ Jonli Hisoblagich (+1 / -1)</span>
              </button>

              <button
                onClick={() => setActiveTab('players')}
                className={`py-3.5 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeTab === 'players'
                    ? 'border-emerald-400 text-emerald-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Futbolchilar ({players.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('team')}
                className={`py-3.5 px-4 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeTab === 'team'
                    ? 'border-emerald-400 text-emerald-400'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Jamoa ma'lumotlari</span>
              </button>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* TAB 1: LIVE COUNTER (+1 / -1) */}
              {activeTab === 'live' && (
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-emerald-900/20 to-slate-900/60 border border-emerald-500/40 shadow-lg">
                    <div>
                      <h4 className="text-sm sm:text-base font-black text-emerald-300 flex items-center gap-2">
                        <Zap className="w-4 h-4 text-emerald-400 fill-emerald-400" />
                        Har bir futbolchi uchun jonli +1 hisoblagich (Bulutli)
                      </h4>
                      <p className="text-xs text-slate-300 mt-1">
                        Ixtiyoriy o‘yinchining Goli, Assisti yoki O‘yini oldidagi <b>+1</b> tugmasini bosing — ma'lumotlar avtomatik tarzda <b>Markaziy Bulutga</b> saqlanadi va <b>barcha sinfdoshlaringizning telefonlarida</b> ham darhol aks etadi!
                      </p>
                    </div>
                  </div>

                  {/* Player Counter Rows */}
                  <div className="space-y-3">
                    {players.map((player) => {
                      const isUpdated = lastUpdatedPlayerId === player.id;

                      return (
                        <div
                          key={player.id}
                          className={`p-3.5 rounded-2xl border transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                            isUpdated
                              ? 'bg-emerald-950/40 border-emerald-400 shadow-[0_0_20px_rgba(0,245,118,0.3)]'
                              : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          {/* Player info without #10 badge */}
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="w-14 h-18 rounded-xl overflow-hidden border border-slate-700 flex-shrink-0 shadow">
                              <ImageWithFallback
                                src={player.photoUrl}
                                alt={player.name}
                                fallbackName={player.name}
                                aspectRatio="aspect-[4/5]"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="min-w-0">
                              <h5 className="text-sm font-bold text-white truncate">
                                {player.name}
                              </h5>
                              <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                                <span className="font-semibold text-slate-300">{player.className}</span>
                                <span>•</span>
                                <span className="text-emerald-400">{player.position}</span>
                              </div>
                            </div>
                          </div>

                          {/* Counters: Goals, Assists, Matches */}
                          <div className="flex items-center gap-3 flex-wrap">
                            
                            {/* Goals */}
                            <div className="flex flex-col items-center bg-slate-950 p-2 rounded-xl border border-emerald-500/30">
                              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-0.5">
                                <Flame className="w-3 h-3 fill-emerald-400" /> Gollar
                              </span>
                              <div className="flex items-center gap-1.5">
                                <button
                                  onClick={() => decrementStat(player.id, 'goals')}
                                  title="-1 Gol"
                                  className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center text-xs font-bold active:scale-95"
                                >
                                  <Minus className="w-3.5 h-3.5" />
                                </button>
                                <span className="w-8 text-center font-mono font-black text-base text-emerald-400">
                                  {player.goals}
                                </span>
                                <button
                                  onClick={() => incrementStat(player.id, 'goals', 1)}
                                  title="+1 Gol"
                                  className="w-8 h-8 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black flex items-center justify-center font-black text-xs active:scale-90 shadow-[0_0_10px_rgba(0,245,118,0.4)]"
                                >
                                  +1
                                </button>
                              </div>
                            </div>

                            {/* Assists */}
                            <div className="flex flex-col items-center bg-slate-950 p-2 rounded-xl border border-cyan-500/30">
                              <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider mb-1 flex items-center gap-0.5">
                                <Share2 className="w-3 h-3" /> Assistlar
                              </span>
                              <div className="flex items-center gap-1.5">
                                <button
                                  onClick={() => decrementStat(player.id, 'assists')}
                                  title="-1 Assist"
                                  className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center text-xs font-bold active:scale-95"
                                >
                                  <Minus className="w-3.5 h-3.5" />
                                </button>
                                <span className="w-8 text-center font-mono font-black text-base text-cyan-400">
                                  {player.assists}
                                </span>
                                <button
                                  onClick={() => incrementStat(player.id, 'assists', 1)}
                                  title="+1 Assist"
                                  className="w-8 h-8 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black flex items-center justify-center font-black text-xs active:scale-90 shadow-[0_0_10px_rgba(56,189,248,0.4)]"
                                >
                                  +1
                                </button>
                              </div>
                            </div>

                            {/* Matches */}
                            <div className="flex flex-col items-center bg-slate-950 p-2 rounded-xl border border-slate-700/60">
                              <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider mb-1 flex items-center gap-0.5">
                                <Calendar className="w-3 h-3" /> O‘yinlar
                              </span>
                              <div className="flex items-center gap-1.5">
                                <button
                                  onClick={() => decrementStat(player.id, 'matches')}
                                  title="-1 O‘yin"
                                  className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center text-xs font-bold active:scale-95"
                                >
                                  <Minus className="w-3.5 h-3.5" />
                                </button>
                                <span className="w-8 text-center font-mono font-black text-base text-slate-200">
                                  {player.matches}
                                </span>
                                <button
                                  onClick={() => incrementStat(player.id, 'matches', 1)}
                                  title="+1 O‘yin"
                                  className="w-8 h-8 rounded-lg bg-slate-700 hover:bg-slate-600 text-white flex items-center justify-center font-black text-xs active:scale-90"
                                >
                                  +1
                                </button>
                              </div>
                            </div>

                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 2: PLAYERS MANAGEMENT (CRUD) */}
              {activeTab === 'players' && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-base font-bold text-white">Sinf Futbolchilari</h4>
                      <p className="text-xs text-slate-400">Yangi o‘yinchi qo‘shing yoki mavjudlarini tahrirlang</p>
                    </div>

                    <button
                      onClick={() => {
                        setEditingPlayerId(null);
                        setPlayerFormData({
                          name: '',
                          jerseyNumber: 10,
                          position: 'Hujumchi',
                          className: '8-D sinf',
                          goals: 0,
                          assists: 0,
                          matches: 0,
                          photoUrl: PRESET_AVATARS[0],
                          bio: '',
                          foot: "O‘ng",
                          height: "175 sm",
                          mvpCount: 0
                        });
                        setIsPlayerFormOpen(true);
                      }}
                      className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold flex items-center gap-1.5 transition-all shadow-md"
                    >
                      <UserPlus className="w-4 h-4" />
                      <span>Yangi o‘yinchi</span>
                    </button>
                  </div>

                  {/* Add / Edit Player Modal / Drawer inside Admin */}
                  {isPlayerFormOpen && (
                    <div className="mb-6 p-5 rounded-2xl bg-slate-900 border border-emerald-500/40 animate-in fade-in duration-200">
                      <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
                        <h5 className="text-sm font-bold text-emerald-400">
                          {editingPlayerId ? "Futbolchini tahrirlash" : "Yangi futbolchi qo‘shish"}
                        </h5>
                        <button
                          type="button"
                          onClick={() => setIsPlayerFormOpen(false)}
                          className="text-slate-400 hover:text-white"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <form onSubmit={handleSavePlayer} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1">
                              Ism va Familiya *
                            </label>
                            <input
                              type="text"
                              required
                              value={playerFormData.name}
                              onChange={(e) => setPlayerFormData(prev => ({ ...prev, name: e.target.value }))}
                              placeholder="Masalan: Sardor Aliyev"
                              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-400"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1">
                              Amplua / Pozitsiya
                            </label>
                            <select
                              value={playerFormData.position}
                              onChange={(e) => setPlayerFormData(prev => ({ ...prev, position: e.target.value }))}
                              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-400"
                            >
                              <option value="Hujumchi">Hujumchi</option>
                              <option value="Yarim himoyachi">Yarim himoyachi</option>
                              <option value="Himoyachi">Himoyachi</option>
                              <option value="Darvozabon">Darvozabon</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1">
                              Sinf / Jamoa
                            </label>
                            <input
                              type="text"
                              value={playerFormData.className}
                              onChange={(e) => setPlayerFormData(prev => ({ ...prev, className: e.target.value }))}
                              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-400"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1">
                              Gollar soni (Boshlang‘ich 0)
                            </label>
                            <input
                              type="number"
                              min="0"
                              value={playerFormData.goals}
                              onChange={(e) => setPlayerFormData(prev => ({ ...prev, goals: e.target.value }))}
                              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-400"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1">
                              Assistlar soni
                            </label>
                            <input
                              type="number"
                              min="0"
                              value={playerFormData.assists}
                              onChange={(e) => setPlayerFormData(prev => ({ ...prev, assists: e.target.value }))}
                              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-400"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-slate-300 mb-1">
                              O‘tkazilgan o‘yinlar
                            </label>
                            <input
                              type="number"
                              min="0"
                              value={playerFormData.matches}
                              onChange={(e) => setPlayerFormData(prev => ({ ...prev, matches: e.target.value }))}
                              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-emerald-400"
                            />
                          </div>
                        </div>

                        {/* Player Photo Selector & Upload */}
                        <div className="pt-2 border-t border-slate-800">
                          <label className="block text-xs font-semibold text-slate-300 mb-2">
                            Futbolchi Surati (To‘g‘ri to‘rtburchak format)
                          </label>
                          <div className="flex flex-col sm:flex-row items-center gap-4">
                            <div className="w-16 h-20 rounded-xl overflow-hidden border border-emerald-500/50 flex-shrink-0">
                              <ImageWithFallback
                                src={playerFormData.photoUrl}
                                fallbackName={playerFormData.name}
                                aspectRatio="aspect-[4/5]"
                                className="w-full h-full"
                              />
                            </div>
                            <div className="flex-1 space-y-2 w-full">
                              <input
                                type="text"
                                placeholder="Rasm URL havolasi..."
                                value={playerFormData.photoUrl}
                                onChange={(e) => setPlayerFormData(prev => ({ ...prev, photoUrl: e.target.value }))}
                                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                              />
                              <div className="flex items-center gap-2">
                                <label className="cursor-pointer px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 flex items-center gap-1.5">
                                  <Upload className="w-3.5 h-3.5" />
                                  <span>Kompyuterdan yuklash</span>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handlePlayerPhotoUpload}
                                    className="hidden"
                                  />
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-end gap-2 pt-2">
                          <button
                            type="button"
                            onClick={() => setIsPlayerFormOpen(false)}
                            className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                          >
                            Bekor qilish
                          </button>
                          <button
                            type="submit"
                            className="px-6 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold"
                          >
                            Saqlash
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* Players Table in Admin */}
                  <div className="rounded-xl border border-slate-800 overflow-hidden">
                    <div className="divide-y divide-slate-800/80">
                      {players.map((p) => (
                        <div key={p.id} className="p-3 sm:p-4 flex items-center justify-between gap-4 hover:bg-slate-900/50">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-15 rounded-lg overflow-hidden border border-slate-700 flex-shrink-0">
                              <ImageWithFallback
                                src={p.photoUrl}
                                fallbackName={p.name}
                                aspectRatio="aspect-[4/5]"
                                className="w-full h-full"
                              />
                            </div>
                            <div>
                              <h5 className="text-sm font-bold text-white">{p.name}</h5>
                              <div className="text-xs text-slate-400 flex items-center gap-3 mt-0.5">
                                <span>{p.position}</span>
                                <span>•</span>
                                <span className="text-emerald-400 font-mono font-bold">{p.goals} gol</span>
                                <span>•</span>
                                <span className="text-cyan-400 font-mono font-bold">{p.assists} assist</span>
                                <span>•</span>
                                <span className="text-slate-500">{p.matches} o‘yin</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleEditPlayerClick(p)}
                              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                              title="Tahrirlash"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                confirmDelete({
                                  title: `"${p.name}"ni o‘chirish`,
                                  message: `Haqiqatan ham "${p.name}"ni reytingdan o‘chirmoqchimisiz?`,
                                  onConfirm: () => deletePlayer(p.id)
                                });
                              }}
                              className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 transition-colors"
                              title="O‘chirish"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: TEAM INFO & RESET */}
              {activeTab === 'team' && (
                <div className="space-y-6">
                  <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
                    <h4 className="text-base font-bold text-white mb-4">Jamoa Asosiy Ma'lumotlari</h4>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1">Jamoa nomi</label>
                          <input
                            type="text"
                            value={teamFormData.name}
                            onChange={(e) => setTeamFormData(prev => ({ ...prev, name: e.target.value }))}
                            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-300 mb-1">Sinf / Guruh</label>
                          <input
                            type="text"
                            value={teamFormData.grade}
                            onChange={(e) => setTeamFormData(prev => ({ ...prev, grade: e.target.value }))}
                            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-300 mb-1">Shior</label>
                        <input
                          type="text"
                          value={teamFormData.motto}
                          onChange={(e) => setTeamFormData(prev => ({ ...prev, motto: e.target.value }))}
                          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white"
                        />
                      </div>

                      <button
                        onClick={() => updateTeamInfo(teamFormData)}
                        className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold transition-all shadow-md"
                      >
                        Jamoa ma'lumotlarini saqlash
                      </button>
                    </div>
                  </div>

                  {/* Reset All Player Stats to 0 */}
                  <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <h5 className="text-sm font-bold text-amber-300">Barcha statistikani 0 qilish</h5>
                      <p className="text-xs text-slate-400 mt-1 max-w-md">
                        Barcha futbolchilarning gollari, assistlari va o‘yinlarini bir bosishda 0 ga tenglashtirish.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        confirmDelete({
                          title: "Statistikani 0 qilish",
                          message: "Barcha futbolchilarning natijalari 0 ga tenglashtiriladi. Rozimisiz?",
                          onConfirm: resetAllStatsToZero
                        });
                      }}
                      className="px-4 py-2.5 rounded-xl bg-amber-600/30 hover:bg-amber-600/50 border border-amber-500/50 text-amber-300 text-xs font-bold flex items-center gap-2 transition-all whitespace-nowrap"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Barchasini 0 qilish</span>
                    </button>
                  </div>

                  {/* Reset to Factory Demo Data Section */}
                  <div className="p-5 rounded-2xl bg-red-950/20 border border-red-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div>
                      <h5 className="text-sm font-bold text-red-400">Standart Namunaviy Ma'lumotlarga Qaytish</h5>
                      <p className="text-xs text-slate-400 mt-1 max-w-md">
                        Barcha o‘zgarishlarni bekor qilib, dastlabki 8-D sinf tarkibiga (barcha ko‘rsatkichlar 0 holatida) qaytish.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        confirmDelete({
                          title: "Dastlabki holatga qaytarish",
                          message: "Barcha kiritilgan o‘zgarishlar o‘chib, standart demo ma’lumotlar (barchasi 0) yuklanadi. Rozimisiz?",
                          onConfirm: resetToDefaults
                        });
                      }}
                      className="px-4 py-2.5 rounded-xl bg-red-600/30 hover:bg-red-600/50 border border-red-500/50 text-red-300 text-xs font-bold flex items-center gap-2 transition-all whitespace-nowrap"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Qayta tiklash</span>
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* Bottom Admin Bar with Logout */}
            <div className="p-4 border-t border-slate-800 bg-slate-900/60 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Admin rejimi faol</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={logoutAdmin}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
                >
                  Chiqish
                </button>
                <button
                  onClick={() => setIsAdminModalOpen(false)}
                  className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold transition-all"
                >
                  Tayyor
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
