import React, { useState } from 'react';
import { 
  Zap, 
  Flame, 
  Share2, 
  Calendar, 
  Plus, 
  Minus, 
  RotateCcw, 
  ArrowLeft, 
  Trophy, 
  Crown, 
  Medal, 
  ShieldCheck, 
  Users,
  Search,
  Filter
} from 'lucide-react';
import { useFootball } from '../context/FootballContext';
import ImageWithFallback from './ImageWithFallback';

export default function DualPanelView() {
  const { 
    players, 
    goalsRankings, 
    assistsRankings, 
    leaderboardTab, 
    setLeaderboardTab, 
    stats, 
    incrementStat, 
    decrementStat, 
    resetAllStatsToZero,
    setIsDualPanelMode,
    lastUpdatedPlayerId,
    confirmDelete,
    setIsAdminModalOpen
  } = useFootball();

  const [panelSearch, setPanelSearch] = useState('');

  const filteredAdminPlayers = players.filter(p => 
    p.name.toLowerCase().includes(panelSearch.toLowerCase()) ||
    (p.position && p.position.toLowerCase().includes(panelSearch.toLowerCase()))
  );

  const currentRankings = leaderboardTab === 'goals' ? goalsRankings : assistsRankings;

  return (
    <div className="min-h-screen bg-[#040711] text-slate-100 flex flex-col">
      {/* Top Dual Panel Status Bar */}
      <div className="sticky top-0 z-40 bg-[#060b18]/95 backdrop-blur-md border-b border-emerald-500/30 px-4 py-3 sm:px-6 shadow-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsDualPanelMode(false)}
            className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 transition-all flex items-center gap-1.5 text-xs font-semibold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Bosh sahifaga qaytish</span>
          </button>
          
          <div className="h-6 w-px bg-slate-800" />

          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-xs sm:text-sm font-black text-white tracking-wide uppercase font-mono flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-emerald-400 fill-emerald-400" />
              Ikkita Panel Rejimi: <span className="text-emerald-400">Jonli Sinxron</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              confirmDelete({
                title: "Barcha sonlarni 0 qilish",
                message: "Haqiqatan ham barcha o‘yinchilarning gollari, assistlari va o‘yinlarini 0 ga tenglashtirmoqchimisiz?",
                onConfirm: resetAllStatsToZero
              });
            }}
            className="px-3 py-1.5 rounded-xl bg-red-950/40 hover:bg-red-900/50 border border-red-500/40 text-red-300 text-xs font-bold transition-all flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Barchasini 0 qilish</span>
          </button>

          <button
            onClick={() => setIsAdminModalOpen(true)}
            className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold"
          >
            Boshqaruv Sozlamalari
          </button>
        </div>
      </div>

      {/* Main Dual Grid View (Two Interconnected Panels) */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-800/80 overflow-hidden">
        
        {/* ========================================================= */}
        {/* PANEL 1 (CHAPDA): ADMIN HISOB-KITOB HISOBICHI (LIVE COUNTER) */}
        {/* ========================================================= */}
        <div className="lg:col-span-6 xl:col-span-6 p-4 sm:p-6 flex flex-col h-full bg-[#060a16]/90 overflow-y-auto">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  1-PANEL
                </span>
                <h3 className="text-lg font-black text-white">Admin Jonli Hisoblagich</h3>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Har bir futbolchi uchun <span className="text-emerald-400 font-bold">+1</span> tugmasini bosing — o‘ng panelda natija bir zumda ko‘rinadi!
              </p>
            </div>

            {/* Quick Player Search */}
            <div className="relative w-full sm:w-48">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Futbolchi qidirish..."
                value={panelSearch}
                onChange={(e) => setPanelSearch(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
              />
            </div>
          </div>

          {/* Player Counter Rows */}
          <div className="space-y-3 flex-1 overflow-y-auto pr-1">
            {filteredAdminPlayers.map((player) => {
              const isPulsing = lastUpdatedPlayerId === player.id;

              return (
                <div
                  key={player.id}
                  className={`p-3.5 rounded-2xl border transition-all duration-300 ${
                    isPulsing
                      ? 'bg-emerald-950/40 border-emerald-400 shadow-[0_0_25px_rgba(0,245,118,0.3)] scale-[1.01]'
                      : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    
                    {/* Player Info with Rectangular Photo (NO #10 badge) */}
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-14 h-18 rounded-xl overflow-hidden border border-slate-700 flex-shrink-0 shadow-md">
                        <ImageWithFallback
                          src={player.photoUrl}
                          alt={player.name}
                          fallbackName={player.name}
                          aspectRatio="aspect-[4/5]"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-sm font-bold text-white truncate">
                          {player.name}
                        </h4>
                        <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                          <span className="font-semibold text-slate-300">{player.className}</span>
                          <span>•</span>
                          <span className="text-emerald-400">{player.position}</span>
                        </div>
                      </div>
                    </div>

                    {/* Interactive Counters: Goals, Assists, Matches */}
                    <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                      
                      {/* Goals Counter */}
                      <div className="flex flex-col items-center bg-slate-950/80 p-2 rounded-xl border border-emerald-500/30">
                        <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-0.5">
                          <Flame className="w-3 h-3 fill-emerald-400" /> Gol
                        </span>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => decrementStat(player.id, 'goals')}
                            title="-1 Gol"
                            className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-all active:scale-95 text-xs font-bold"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          
                          <span className="w-8 text-center font-mono font-black text-base text-emerald-400">
                            {player.goals}
                          </span>

                          <button
                            onClick={() => incrementStat(player.id, 'goals', 1)}
                            title="+1 Gol"
                            className="w-8 h-8 rounded-lg bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-400 hover:to-green-400 text-black flex items-center justify-center transition-all active:scale-90 font-black text-xs shadow-[0_0_12px_rgba(0,245,118,0.4)]"
                          >
                            +1
                          </button>
                        </div>
                      </div>

                      {/* Assists Counter */}
                      <div className="flex flex-col items-center bg-slate-950/80 p-2 rounded-xl border border-cyan-500/30">
                        <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider mb-1 flex items-center gap-0.5">
                          <Share2 className="w-3 h-3" /> Assist
                        </span>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => decrementStat(player.id, 'assists')}
                            title="-1 Assist"
                            className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-all active:scale-95 text-xs font-bold"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          
                          <span className="w-8 text-center font-mono font-black text-base text-cyan-400">
                            {player.assists}
                          </span>

                          <button
                            onClick={() => incrementStat(player.id, 'assists', 1)}
                            title="+1 Assist"
                            className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-black flex items-center justify-center transition-all active:scale-90 font-black text-xs shadow-[0_0_12px_rgba(56,189,248,0.4)]"
                          >
                            +1
                          </button>
                        </div>
                      </div>

                      {/* Matches Counter */}
                      <div className="flex flex-col items-center bg-slate-950/80 p-2 rounded-xl border border-slate-700/60">
                        <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wider mb-1 flex items-center gap-0.5">
                          <Calendar className="w-3 h-3" /> O‘yin
                        </span>
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => decrementStat(player.id, 'matches')}
                            title="-1 O‘yin"
                            className="w-7 h-7 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-all active:scale-95 text-xs font-bold"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          
                          <span className="w-8 text-center font-mono font-black text-base text-slate-200">
                            {player.matches}
                          </span>

                          <button
                            onClick={() => incrementStat(player.id, 'matches', 1)}
                            title="+1 O‘yin"
                            className="w-8 h-8 rounded-lg bg-slate-700 hover:bg-slate-600 text-white flex items-center justify-center transition-all active:scale-90 font-black text-xs"
                          >
                            +1
                          </button>
                        </div>
                      </div>

                    </div>

                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* ========================================================= */}
        {/* PANEL 2 (O‘NGDA): JONLI SAYT VA REYTING (LIVE LEADERBOARD) */}
        {/* ========================================================= */}
        <div className="lg:col-span-6 xl:col-span-6 p-4 sm:p-6 flex flex-col h-full bg-[#080d1a] overflow-y-auto">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  2-PANEL
                </span>
                <h3 className="text-lg font-black text-white">Jonli Reyting Jadvali</h3>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Admin <span className="text-emerald-400 font-bold">+1</span> qilishi bilanoq ushbu panelda o‘rinlar va sonlar o‘zgaradi.
              </p>
            </div>

            {/* Tab switch for live leaderboard */}
            <div className="flex p-1 bg-slate-900 rounded-xl border border-slate-800 self-start sm:self-auto">
              <button
                onClick={() => setLeaderboardTab('goals')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  leaderboardTab === 'goals'
                    ? 'bg-emerald-500 text-black shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Flame className="w-3.5 h-3.5" />
                <span>To‘purarlar</span>
              </button>
              <button
                onClick={() => setLeaderboardTab('assists')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  leaderboardTab === 'assists'
                    ? 'bg-cyan-500 text-black shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Assistlar</span>
              </button>
            </div>
          </div>

          {/* Quick Realtime Stats Summary Bar */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-emerald-500/30 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Jami Gollar</span>
              <span className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">{stats.totalGoals}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-cyan-500/30 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Jami Assistlar</span>
              <span className="text-xl sm:text-2xl font-black text-cyan-400 font-mono">{stats.totalAssists}</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Maksimal O‘yin</span>
              <span className="text-xl sm:text-2xl font-black text-white font-mono">{stats.totalMatches}</span>
            </div>
          </div>

          {/* Live Leaderboard List */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden flex-1 divide-y divide-slate-800/70">
            {currentRankings.map((player, index) => {
              const rank = index + 1;
              const isFirst = rank === 1;
              const isJustUpdated = lastUpdatedPlayerId === player.id;

              return (
                <div
                  key={player.id}
                  className={`p-3 sm:p-3.5 flex items-center justify-between gap-3 transition-all duration-300 ${
                    isJustUpdated
                      ? 'bg-emerald-950/60 ring-2 ring-emerald-400 scale-[1.01]'
                      : isFirst
                      ? 'bg-emerald-950/20 border-l-4 border-l-emerald-400'
                      : 'hover:bg-slate-900/40'
                  }`}
                >
                  {/* Rank & Player Info */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-7 text-center flex-shrink-0">
                      {isFirst ? (
                        <Crown className="w-5 h-5 text-amber-400 fill-amber-400 mx-auto" />
                      ) : rank === 2 ? (
                        <Medal className="w-5 h-5 text-slate-300 fill-slate-300 mx-auto" />
                      ) : rank === 3 ? (
                        <Medal className="w-5 h-5 text-amber-600 fill-amber-600 mx-auto" />
                      ) : (
                        <span className="font-mono font-bold text-xs text-slate-500">#{rank}</span>
                      )}
                    </div>

                    <div className="w-12 h-15 rounded-lg overflow-hidden border border-slate-700 flex-shrink-0 shadow">
                      <ImageWithFallback
                        src={player.photoUrl}
                        alt={player.name}
                        fallbackName={player.name}
                        aspectRatio="aspect-[4/5]"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-sm font-bold text-white truncate">{player.name}</h4>
                        {isFirst && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                            #1 Lider
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {player.className} • {player.position}
                      </div>
                    </div>
                  </div>

                  {/* Highlighted Value and Sub-stats */}
                  <div className="flex items-center gap-4 font-mono text-right flex-shrink-0">
                    <div className="text-center">
                      <span className="text-[10px] text-slate-500 block uppercase font-sans">O‘yin</span>
                      <span className="text-xs text-slate-300 font-bold">{player.matches}</span>
                    </div>

                    <div className="text-center">
                      <span className="text-[10px] text-slate-500 block uppercase font-sans">
                        {leaderboardTab === 'goals' ? 'Gollar' : 'Assistlar'}
                      </span>
                      <span className={`text-xl font-black ${
                        leaderboardTab === 'goals' ? 'text-emerald-400' : 'text-cyan-400'
                      }`}>
                        {leaderboardTab === 'goals' ? player.goals : player.assists}
                      </span>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </div>
  );
}
