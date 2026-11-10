import React, { useState, useEffect } from 'react';
import { 
  X, 
  Trophy, 
  Flame, 
  Share2, 
  Calendar, 
  Award, 
  Shield, 
  Activity, 
  Sparkles,
  Zap,
  BarChart3,
  Layers
} from 'lucide-react';
import { useFootball } from '../context/FootballContext';
import ImageWithFallback from './ImageWithFallback';
import PlayStyleBadge from './PlayStyleBadge';
import PlayStylesDiagram from './PlayStylesDiagram';
import { getPlayerPlayStylesInfo } from '../data/playStylesData';

export default function PlayerDetailModal() {
  const { selectedPlayer, setSelectedPlayer, stats } = useFootball();
  const [modalTab, setModalTab] = useState('diagram'); // Default to 'diagram' so it's immediately visible!

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedPlayer(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setSelectedPlayer]);

  if (!selectedPlayer) return null;

  const isTopScorer = stats.topScorer && stats.topScorer.id === selectedPlayer.id;
  const isTopAssister = stats.topAssister && stats.topAssister.id === selectedPlayer.id;
  const goalsPerMatch = selectedPlayer.matches > 0 
    ? (selectedPlayer.goals / selectedPlayer.matches).toFixed(2) 
    : '0.00';

  // Retrieve official FC Mobile PlayStyles and Hexagon Radar data
  const playStylesInfo = getPlayerPlayStylesInfo(selectedPlayer);
  const stylesList = playStylesInfo?.stylesList || [];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-6 py-3 sm:py-8">
      {/* Backdrop click dismiss */}
      <div 
        onClick={() => setSelectedPlayer(null)}
        className="fixed inset-0 -z-10" 
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-4xl max-h-[94vh] flex flex-col bg-gradient-to-b from-[#0b1222] via-[#070d18] to-[#040812] border border-emerald-500/30 rounded-2xl sm:rounded-3xl shadow-[0_0_60px_rgba(0,0,0,0.95)] z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Glow ambient background elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header Bar - Optimized for Mobile S (320px) & Mobile L (425px) */}
        <div className="px-3 sm:px-6 py-2.5 sm:py-4 border-b border-slate-800/80 flex items-center justify-between bg-slate-950/85 backdrop-blur-md z-20 flex-shrink-0 gap-2">
          
          {/* Left Branding & Player Name with min-w-0 flex-1 */}
          <div className="flex items-center gap-2 min-w-0 flex-1">
            {/* EA Sports FC Mobile Logo Badge */}
            <div className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg bg-black/90 border border-emerald-500/40 flex items-center gap-1 shadow-md flex-shrink-0">
              <span className="text-[9px] sm:text-[10px] font-black tracking-tight text-white uppercase italic hidden xs:inline">
                EA SPORTS
              </span>
              <span className="text-[10px] sm:text-xs font-black tracking-tight text-emerald-400 italic font-mono">
                FC MOBILE
              </span>
            </div>
            
            <h3 className="text-xs sm:text-base font-black text-white truncate min-w-0 flex items-center gap-1.5">
              <span className="truncate">{selectedPlayer.name}</span>
            </h3>
          </div>

          {/* Close Button - strictly shrink-0 with comfortable touch area */}
          <button
            onClick={() => setSelectedPlayer(null)}
            className="p-1.5 sm:p-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors shadow-lg flex-shrink-0 ml-1.5"
            aria-label="Yopish"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-4 sm:space-y-6 scrollbar-thin scrollbar-thumb-slate-800">
          
          {/* Top Player Card Row */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-7 p-3 sm:p-5 rounded-2xl bg-slate-900/40 border border-slate-800/80">
            
            {/* Rectangular Portrait Photo */}
            <div className="w-28 h-36 xs:w-32 xs:h-44 sm:w-40 sm:h-52 rounded-2xl overflow-hidden flex-shrink-0 border-2 border-emerald-500/40 shadow-2xl relative bg-slate-950">
              <ImageWithFallback
                src={selectedPlayer.photoUrl}
                alt={selectedPlayer.name}
                fallbackName={selectedPlayer.name}
                aspectRatio="aspect-[3/4]"
                objectPosition="top"
                className="w-full h-full"
                imgClassName="object-top"
              />
            </div>

            {/* Basic Info & Badges */}
            <div className="flex-1 text-center sm:text-left min-w-0">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 sm:gap-2 mb-2">
                <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[11px] sm:text-xs font-bold bg-slate-800/90 border border-slate-700 text-slate-200">
                  {selectedPlayer.className || "8-D sinf"}
                </span>
                <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[11px] sm:text-xs font-bold bg-emerald-500/15 border border-emerald-500/40 text-emerald-300">
                  {selectedPlayer.position}
                </span>

                {isTopScorer && (
                  <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[11px] sm:text-xs font-bold bg-amber-500/20 border border-amber-500/50 text-amber-300 flex items-center gap-1 font-mono">
                    <Trophy className="w-3 h-3 fill-amber-400 text-amber-400" /> To‘purar #1
                  </span>
                )}
                {isTopAssister && (
                  <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[11px] sm:text-xs font-bold bg-blue-500/20 border border-blue-500/50 text-blue-300 flex items-center gap-1 font-mono">
                    <Share2 className="w-3 h-3" /> Assistchi #1
                  </span>
                )}
              </div>

              <h2 className="text-xl sm:text-3xl font-black text-white tracking-tight break-words">
                {selectedPlayer.name}
              </h2>

              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                {selectedPlayer.bio || "8-D sinf futbol jamoasi a’zosi. Har bir uchrashuvda jamoa g‘alabasi uchun faol ishtirok etadi."}
              </p>

              {/* Physical Attributes */}
              <div className="grid grid-cols-2 gap-2 mt-3 pt-2.5 border-t border-slate-800/80 text-[11px] sm:text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-mono">Zarba oyog‘i:</span>
                  <span className="font-semibold text-slate-200">{selectedPlayer.foot || "O‘ng"}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-mono">Bo‘yi:</span>
                  <span className="font-semibold text-slate-200">{selectedPlayer.height || "178 sm"}</span>
                </div>
              </div>

              {/* OFFICIAL EA FC MOBILE PLAYSTYLES BADGES DIRECTLY IN PROFILE CARD */}
              <div className="mt-3 pt-2.5 border-t border-slate-800/80">
                <div className="flex items-center justify-center sm:justify-start gap-1.5 mb-2">
                  <span className="p-0.5 rounded bg-emerald-500/20 text-emerald-400">
                    <Zap className="w-3 h-3 fill-emerald-400" />
                  </span>
                  <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-emerald-400 font-mono">
                    O‘yin Uslublari (PlayStyles):
                  </span>
                </div>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3">
                  {stylesList.map((style) => (
                    <PlayStyleBadge
                      key={style.id}
                      styleId={style.id}
                      size="sm"
                      showLabel={true}
                      interactive={true}
                    />
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Interactive Section Switcher Tabs - Grid on mobile so it never overflows */}
          <div className="grid grid-cols-2 sm:flex sm:items-center gap-1.5 p-1 bg-slate-900/90 rounded-2xl border border-slate-800 w-full">
            <button
              onClick={() => setModalTab('diagram')}
              className={`flex items-center justify-center gap-1.5 px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all ${
                modalTab === 'diagram'
                  ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-black shadow-lg shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="truncate">Diagramma</span>
            </button>

            <button
              onClick={() => setModalTab('stats')}
              className={`flex items-center justify-center gap-1.5 px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all ${
                modalTab === 'stats'
                  ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-black shadow-lg shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="truncate">Statistika</span>
            </button>

            <button
              onClick={() => setModalTab('playstyles')}
              className={`flex items-center justify-center gap-1.5 px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all ${
                modalTab === 'playstyles'
                  ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-black shadow-lg shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="truncate">Uslublar ({stylesList.length})</span>
            </button>

            <button
              onClick={() => setModalTab('all')}
              className={`flex items-center justify-center gap-1.5 px-2.5 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all ${
                modalTab === 'all'
                  ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-black shadow-lg shadow-emerald-500/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="truncate">Barchasi</span>
            </button>
          </div>

          {/* Key Statistics Grid */}
          {(modalTab === 'all' || modalTab === 'stats') && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 animate-in fade-in duration-200">
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
                <div className="flex items-center justify-center gap-1 text-slate-400 text-[11px] uppercase font-semibold mb-1">
                  <Calendar className="w-3.5 h-3.5 text-teal-400" />
                  <span>O‘yinlar</span>
                </div>
                <div className="text-2xl font-black text-white font-mono">
                  {selectedPlayer.matches}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">Mavsum davomida</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 text-center">
                <div className="flex items-center justify-center gap-1 text-emerald-400 text-[11px] uppercase font-semibold mb-1">
                  <Flame className="w-3.5 h-3.5 fill-emerald-400" />
                  <span>Gollar</span>
                </div>
                <div className="text-2xl font-black text-emerald-400 font-mono">
                  {selectedPlayer.goals}
                </div>
                <div className="text-[10px] text-emerald-400/80 mt-0.5">{goalsPerMatch} gol/o‘yin</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-cyan-950/20 border border-cyan-500/30 text-center">
                <div className="flex items-center justify-center gap-1 text-cyan-400 text-[11px] uppercase font-semibold mb-1">
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Assistlar</span>
                </div>
                <div className="text-2xl font-black text-cyan-400 font-mono">
                  {selectedPlayer.assists}
                </div>
                <div className="text-[10px] text-cyan-400/80 mt-0.5">Samarali paslar</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 text-center">
                <div className="flex items-center justify-center gap-1 text-amber-400 text-[11px] uppercase font-semibold mb-1">
                  <Award className="w-3.5 h-3.5" />
                  <span>MVP</span>
                </div>
                <div className="text-2xl font-black text-amber-400 font-mono">
                  {selectedPlayer.mvpCount || 0}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">Eng yaxshi o‘yinchi</div>
              </div>
            </div>
          )}

          {/* SECTION 1: EA SPORTS FC MOBILE PLAYSTYLES HEXAGONAL DIAGRAMMA */}
          {(modalTab === 'all' || modalTab === 'diagram') && (
            <div className="animate-in fade-in duration-200">
              <PlayStylesDiagram playerInfo={playStylesInfo} />
            </div>
          )}

          {/* SECTION 2: O'YIN USLUBLARI DETAILED CARDS */}
          {(modalTab === 'all' || modalTab === 'playstyles') && (
            <div className="p-4 sm:p-6 rounded-3xl bg-gradient-to-b from-slate-900/60 to-[#050914] border border-cyan-500/30 shadow-xl animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                    <Zap className="w-4 h-4 fill-emerald-400" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-black text-white flex items-center gap-2">
                      <span>O‘yin Uslublari (PlayStyles)</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        FC MOBILE
                      </span>
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Futbolchining maydondagi o‘ziga xos imzo mahoratlari va maxsus qobiliyatlari
                    </p>
                  </div>
                </div>
              </div>

              {/* Badges Flex Grid */}
              <div className="flex flex-wrap items-start justify-center sm:justify-start gap-4 sm:gap-6 pt-2">
                {stylesList.map((style) => (
                  <PlayStyleBadge
                    key={style.id}
                    styleId={style.id}
                    size="md"
                    showLabel={true}
                    interactive={true}
                  />
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Action */}
        <div className="p-4 sm:p-5 border-t border-slate-800/80 bg-slate-950/80 flex items-center justify-between flex-shrink-0">
          <span className="text-xs text-slate-500 font-mono hidden sm:inline">
            8-D Sinf Rasmiy Futbol Statistikasi
          </span>
          <button
            onClick={() => setSelectedPlayer(null)}
            className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold transition-colors ml-auto shadow-md"
          >
            Yopish
          </button>
        </div>

      </div>
    </div>
  );
}

