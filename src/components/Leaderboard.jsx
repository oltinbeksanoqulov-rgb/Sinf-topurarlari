import React from 'react';
import { 
  Trophy, 
  Crown, 
  Flame, 
  Share2, 
  Calendar, 
  Filter, 
  Search, 
  ChevronRight, 
  Medal, 
  UserCheck, 
  X,
  Sparkles
} from 'lucide-react';
import { useFootball } from '../context/FootballContext';
import ImageWithFallback from './ImageWithFallback';

export default function Leaderboard() {
  const {
    goalsRankings,
    assistsRankings,
    matchesRankings,
    leaderboardTab,
    setLeaderboardTab,
    selectedSeason,
    setSelectedSeason,
    seasons,
    searchQuery,
    setSearchQuery,
    setSelectedPlayer
  } = useFootball();

  const currentRankings = 
    leaderboardTab === 'goals' 
      ? goalsRankings 
      : leaderboardTab === 'assists' 
      ? assistsRankings 
      : matchesRankings;

  return (
    <section id="leaderboard" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-20">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2 font-mono">
            <Trophy className="w-3.5 h-3.5 text-emerald-400" />
            Rasmiy Turnir Jadvali
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Futbolchilar Reytingi
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-1 max-w-xl">
            Sinfimizning eng sermahsul to‘purarlari va eng ko‘p assist mualliflari jadvali.
          </p>
        </div>

        {/* Season Selector Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
            <Filter className="w-3.5 h-3.5 text-slate-500" /> Mavsum:
          </span>
          <div className="relative">
            <select
              value={selectedSeason}
              onChange={(e) => setSelectedSeason(e.target.value)}
              className="bg-slate-900 border border-slate-700 hover:border-emerald-500/50 text-slate-200 text-xs sm:text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-emerald-400 font-medium cursor-pointer"
            >
              {seasons.map((season) => (
                <option key={season} value={season} className="bg-slate-900 text-white">
                  {season}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Tabs and Search Bar Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
        
        {/* Tab Switcher: To'purarlar vs Assistlar vs O'yinlar */}
        <div className="grid grid-cols-3 sm:flex sm:flex-wrap p-1 sm:p-1.5 bg-slate-900/90 rounded-2xl border border-slate-800 w-full sm:w-auto shadow-inner gap-1">
          <button
            onClick={() => setLeaderboardTab('goals')}
            className={`flex items-center justify-center gap-1 sm:gap-2 px-1.5 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all text-center whitespace-nowrap ${
              leaderboardTab === 'goals'
                ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-black shadow-[0_0_20px_rgba(0,245,118,0.4)]'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Flame className={`w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 ${leaderboardTab === 'goals' ? 'fill-black text-black' : 'text-emerald-400'}`} />
            <span>To‘purarlar<span className="hidden md:inline"> reytingi</span></span>
          </button>

          <button
            onClick={() => setLeaderboardTab('assists')}
            className={`flex items-center justify-center gap-1 sm:gap-2 px-1.5 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all text-center whitespace-nowrap ${
              leaderboardTab === 'assists'
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-black shadow-[0_0_20px_rgba(56,189,248,0.4)]'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Share2 className={`w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 ${leaderboardTab === 'assists' ? 'text-black' : 'text-cyan-400'}`} />
            <span>Assistlar<span className="hidden md:inline"> reytingi</span></span>
          </button>

          <button
            onClick={() => setLeaderboardTab('matches')}
            className={`flex items-center justify-center gap-1 sm:gap-2 px-1.5 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all text-center whitespace-nowrap ${
              leaderboardTab === 'matches'
                ? 'bg-gradient-to-r from-teal-400 to-emerald-400 text-black shadow-[0_0_20px_rgba(45,212,191,0.4)]'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Calendar className={`w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 ${leaderboardTab === 'matches' ? 'text-black' : 'text-teal-400'}`} />
            <span>O‘yinlar<span className="hidden md:inline"> reytingi</span></span>
          </button>
        </div>

        {/* Live Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Futbolchini qidirish..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900/80 border border-slate-700/80 rounded-xl pl-9 pr-9 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Leaderboard Table / Card List */}
      <div className="rounded-2xl border border-slate-800 bg-[#080d1a] overflow-hidden shadow-2xl">
        
        {/* Table Header Row (Desktop) */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-slate-950/80 border-b border-slate-800 text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
          <div className="col-span-1 text-center">O‘rin</div>
          <div className="col-span-5">Futbolchi</div>
          <div className="col-span-2 text-center">O‘yinlar</div>
          <div className="col-span-2 text-center">Gollar</div>
          <div className="col-span-2 text-center">Assistlar</div>
        </div>

        {/* Table Body / Rows */}
        <div className="divide-y divide-slate-800/70">
          {currentRankings.length === 0 ? (
            /* Empty State */
            <div className="py-16 px-4 text-center">
              <div className="w-16 h-16 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto mb-4 text-slate-500">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-white">Hech qanday futbolchi topilmadi</h3>
              <p className="text-sm text-slate-400 mt-1 max-w-sm mx-auto">
                Qidiruv so‘rovingiz yoki tanlangan mavsum bo‘yicha natija mavjud emas.
              </p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-4 px-4 py-2 bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-xs font-semibold rounded-xl hover:bg-emerald-500/25 transition-colors"
                >
                  Qidiruvni tozalash
                </button>
              )}
            </div>
          ) : (
            currentRankings.map((player, index) => {
              const rank = index + 1;
              const isFirst = rank === 1;
              const isSecond = rank === 2;
              const isThird = rank === 3;

              return (
                <div
                  key={player.id}
                  onClick={() => setSelectedPlayer(player)}
                  className={`group relative transition-all duration-200 cursor-pointer ${
                    isFirst
                      ? 'bg-gradient-to-r from-emerald-950/40 via-emerald-900/20 to-transparent border-l-4 border-l-emerald-400 hover:bg-emerald-900/30'
                      : isSecond
                      ? 'hover:bg-slate-800/40 border-l-4 border-l-slate-400'
                      : isThird
                      ? 'hover:bg-slate-800/40 border-l-4 border-l-amber-700'
                      : 'hover:bg-slate-900/50 border-l-4 border-l-transparent'
                  }`}
                >
                  {/* Subtle 1st place neon glow */}
                  {isFirst && (
                    <div className="absolute inset-0 bg-emerald-500/[0.04] pointer-events-none" />
                  )}

                  {/* Desktop Grid Layout */}
                  <div className="hidden md:grid grid-cols-12 gap-4 items-center px-6 py-4">
                    
                    {/* Rank Badge */}
                    <div className="col-span-1 flex items-center justify-center">
                      {isFirst ? (
                        <div className="flex flex-col items-center">
                          <Crown className="w-5 h-5 text-amber-400 fill-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
                          <span className="text-sm font-black text-amber-400 font-mono">#1</span>
                        </div>
                      ) : isSecond ? (
                        <div className="flex flex-col items-center">
                          <Medal className="w-5 h-5 text-slate-300 fill-slate-300" />
                          <span className="text-sm font-black text-slate-300 font-mono">#2</span>
                        </div>
                      ) : isThird ? (
                        <div className="flex flex-col items-center">
                          <Medal className="w-5 h-5 text-amber-600 fill-amber-600" />
                          <span className="text-sm font-black text-amber-600 font-mono">#3</span>
                        </div>
                      ) : (
                        <span className="text-base font-bold text-slate-400 font-mono">#{rank}</span>
                      )}
                    </div>

                    {/* Large Rectangular Player Photo & Info */}
                    <div className="col-span-5 flex items-center gap-4">
                      {/* Noticeably large rectangular portrait (NOT circular!) */}
                      <div className={`w-16 h-20 rounded-xl overflow-hidden flex-shrink-0 border shadow-md relative ${
                        isFirst ? 'border-emerald-400/80 shadow-[0_0_15px_rgba(0,245,118,0.25)]' : 'border-slate-700 group-hover:border-slate-500'
                      }`}>
                        <ImageWithFallback
                          src={player.photoUrl}
                          alt={player.name}
                          fallbackName={player.name}
                          aspectRatio="aspect-[4/5]"
                          objectPosition="top"
                          className="w-full h-full"
                          imgClassName="object-top group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-base font-bold text-white group-hover:text-emerald-400 transition-colors truncate">
                            {player.name}
                          </h4>
                          {isFirst && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                              Lider
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-400 mt-1">
                          <span className="font-semibold text-slate-300">{player.className || '8-D sinf'}</span>
                          <span>•</span>
                          <span className="text-emerald-400/90">{player.position}</span>
                        </div>
                      </div>
                    </div>

                    {/* Matches Column (Highlighted if tab is matches) */}
                    <div className="col-span-2 text-center">
                      <span className={`text-xl font-black font-mono ${
                        leaderboardTab === 'matches'
                          ? 'text-teal-400 drop-shadow-[0_0_10px_rgba(45,212,191,0.4)]'
                          : 'text-slate-300'
                      }`}>
                        {player.matches}
                      </span>
                      <span className="text-xs text-slate-500 block">o‘yin</span>
                    </div>

                    {/* Goals Column (Highlighted if tab is goals) */}
                    <div className="col-span-2 text-center">
                      <span className={`text-xl font-black font-mono ${
                        leaderboardTab === 'goals'
                          ? 'text-emerald-400 drop-shadow-[0_0_10px_rgba(0,245,118,0.3)]'
                          : 'text-slate-200'
                      }`}>
                        {player.goals}
                      </span>
                      <span className="text-xs text-slate-500 block">gol</span>
                    </div>

                    {/* Assists Column (Highlighted if tab is assists) */}
                    <div className="col-span-2 text-center">
                      <span className={`text-xl font-black font-mono ${
                        leaderboardTab === 'assists'
                          ? 'text-cyan-400 drop-shadow-[0_0_10px_rgba(56,189,248,0.3)]'
                          : 'text-slate-200'
                      }`}>
                        {player.assists}
                      </span>
                      <span className="text-xs text-slate-500 block">assist</span>
                    </div>

                  </div>

                  {/* Mobile Card Layout */}
                  <div className="md:hidden p-4 flex items-center gap-3.5">
                    {/* Rank Badge */}
                    <div className="flex-shrink-0 w-8 flex flex-col items-center">
                      {isFirst ? (
                        <Crown className="w-5 h-5 text-amber-400 fill-amber-400" />
                      ) : isSecond ? (
                        <Medal className="w-5 h-5 text-slate-300 fill-slate-300" />
                      ) : isThird ? (
                        <Medal className="w-5 h-5 text-amber-600 fill-amber-600" />
                      ) : (
                        <span className="text-sm font-bold text-slate-500 font-mono">#{rank}</span>
                      )}
                    </div>

                    {/* Large Rectangular Photo */}
                    <div className={`w-16 h-20 rounded-xl overflow-hidden flex-shrink-0 border ${
                      isFirst ? 'border-emerald-400 shadow-[0_0_10px_rgba(0,245,118,0.3)]' : 'border-slate-700'
                    }`}>
                      <ImageWithFallback
                        src={player.photoUrl}
                        alt={player.name}
                        fallbackName={player.name}
                        aspectRatio="aspect-[4/5]"
                        objectPosition="top"
                        className="w-full h-full"
                        imgClassName="object-top"
                      />
                    </div>

                    {/* Name, Info & Key Stats */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-white truncate">
                          {player.name}
                        </h4>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {player.className} • {player.position}
                      </div>

                      <div className="flex items-center gap-4 mt-2 font-mono text-xs">
                        <div className={leaderboardTab === 'goals' ? 'text-emerald-400 font-black text-sm' : 'text-slate-300'}>
                          <span className="font-sans text-[10px] text-slate-500 mr-1 uppercase">Gol:</span>
                          {player.goals}
                        </div>
                        <div className={leaderboardTab === 'assists' ? 'text-cyan-400 font-black text-sm' : 'text-slate-300'}>
                          <span className="font-sans text-[10px] text-slate-500 mr-1 uppercase">Assist:</span>
                          {player.assists}
                        </div>
                        <div className={leaderboardTab === 'matches' ? 'text-teal-400 font-black text-sm' : 'text-slate-400'}>
                          <span className="font-sans text-[10px] text-slate-500 mr-1 uppercase">O‘yin:</span>
                          {player.matches}
                        </div>
                      </div>
                    </div>

                    <div className="text-slate-500">
                      <ChevronRight className="w-5 h-5" />
                    </div>
                  </div>

                </div>
              );
            })
          )}
        </div>

      </div>

      {/* Footer Note */}
      <div className="mt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 px-2 gap-2">
        <span>* O‘yinchi profilini ko‘rish uchun qator ustiga bosing</span>
        <span className="text-slate-400 font-mono">Barcha natijalar hakamlar qaydnomasi asosida kiritilgan</span>
      </div>

    </section>
  );
}
