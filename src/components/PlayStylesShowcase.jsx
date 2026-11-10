import React, { useState } from 'react';
import { 
  Zap, 
  Sparkles, 
  ChevronRight, 
  Award, 
  Flame, 
  Share2, 
  Shield, 
  User, 
  ExternalLink,
  Layers,
  Activity
} from 'lucide-react';
import { useFootball } from '../context/FootballContext';
import ImageWithFallback from './ImageWithFallback';
import PlayStyleBadge from './PlayStyleBadge';
import PlayStylesDiagram from './PlayStylesDiagram';
import { getPlayerPlayStylesInfo, PLAYER_PLAYSTYLES_DATA } from '../data/playStylesData';

export default function PlayStylesShowcase() {
  const { players, setSelectedPlayer } = useFootball();

  // Prefer Sanoqulov Oltinbek (p2) as the default initial showcase player
  const defaultPlayer = players.find(p => p.id === 'p2' || p.name.includes('Sanoqulov')) || players[0];
  const [activePlayerId, setActivePlayerId] = useState(defaultPlayer ? defaultPlayer.id : 'p2');

  const activePlayer = players.find(p => p.id === activePlayerId) || defaultPlayer || players[0];
  if (!activePlayer) return null;

  const playStylesInfo = getPlayerPlayStylesInfo(activePlayer);
  const stylesList = playStylesInfo?.stylesList || [];

  return (
    <section id="playstyles-showcase" className="relative py-14 sm:py-20 bg-gradient-to-b from-[#050811] via-[#070d1a] to-[#050811] border-y border-emerald-500/20 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-400/40 text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4 shadow-[0_0_15px_rgba(0,245,118,0.25)]">
            <span className="italic font-black text-white">EA SPORTS</span>
            <span className="font-mono text-emerald-400">FC MOBILE</span>
            <span className="text-slate-400">•</span>
            <span className="flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400" />
              PLAYSTYLES & DIAGRAMMA
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Futbolchilarimizning <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-300 to-cyan-400">O‘yin Uslublari</span> va Diagrammasi
          </h2>

          <p className="text-xs sm:text-base text-slate-300 mt-3 leading-relaxed">
            8-D Sinf futbolchilarining maydondagi individual imzo qobiliyatlari (PlayStyles) va EA Sports FC Mobile talablari asosidagi 6 qirrali Hexagonal radar tahlili.
          </p>
        </div>

        {/* 9-Player Interactive Selector Bar */}
        <div className="mb-8">
          <div className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center justify-between">
            <span className="flex items-center gap-1.5 font-bold text-emerald-400">
              <Activity className="w-4 h-4 text-emerald-400" /> Futbolchini tanlang ({players.length} nafar):
            </span>
            <span className="text-[11px] text-slate-500 hidden sm:inline">
              Bir marta bosing va ko‘rsatkichlarni jonli ko‘ring
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-3 pt-1 scrollbar-thin scrollbar-thumb-emerald-500/30 scrollbar-track-slate-900">
            {players.map((player) => {
              const isSelected = player.id === activePlayer.id;
              const playerStyles = getPlayerPlayStylesInfo(player)?.stylesList || [];

              return (
                <button
                  key={player.id}
                  onClick={() => setActivePlayerId(player.id)}
                  className={`flex-shrink-0 flex items-center gap-2.5 px-3.5 py-2 rounded-2xl border transition-all text-left group ${
                    isSelected
                      ? 'bg-gradient-to-r from-emerald-500/25 to-cyan-500/20 border-emerald-400 text-white shadow-[0_0_20px_rgba(0,245,118,0.35)] scale-[1.02]'
                      : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/60'
                  }`}
                >
                  {/* Thumbnail Photo */}
                  <div className={`w-8 h-10 rounded-lg overflow-hidden border flex-shrink-0 bg-slate-950 ${
                    isSelected ? 'border-emerald-400 shadow-sm' : 'border-slate-700'
                  }`}>
                    <ImageWithFallback
                      src={player.photoUrl}
                      alt={player.name}
                      fallbackName={player.name}
                      aspectRatio="aspect-[3/4]"
                      objectPosition="top"
                      className="w-full h-full"
                    />
                  </div>

                  <div className="min-w-0 pr-1">
                    <div className="flex items-center gap-1.5">
                      <span className={`text-xs font-black truncate ${
                        isSelected ? 'text-emerald-300' : 'text-slate-200 group-hover:text-white'
                      }`}>
                        {player.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mt-0.5 font-mono">
                      <span>#{player.jerseyNumber || '?'}</span>
                      <span>•</span>
                      <span className="truncate">{player.position}</span>
                      <span>•</span>
                      <span className="text-emerald-400 font-bold">{playerStyles.length} uslub</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Player Showcase Display Box */}
        <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#0b1222] via-[#080d19] to-[#040711] border-2 border-emerald-500/40 p-3 sm:p-7 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
          
          {/* Top Banner: Player Identity + PlayStyles Diamond Badges */}
          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 sm:gap-6 pb-4 sm:pb-6 border-b border-slate-800/80">
            
            {/* Player Rectangular Portrait Card */}
            <div className="w-32 h-44 sm:w-44 sm:h-56 rounded-2xl overflow-hidden flex-shrink-0 border-2 border-emerald-400/50 shadow-2xl relative bg-slate-950">
              <ImageWithFallback
                src={activePlayer.photoUrl}
                alt={activePlayer.name}
                fallbackName={activePlayer.name}
                aspectRatio="aspect-[3/4]"
                objectPosition="top"
                className="w-full h-full"
              />
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-sm border border-emerald-400/40 text-emerald-400 font-mono text-[11px] font-black">
                #{activePlayer.jerseyNumber || 7}
              </div>
            </div>

            {/* Info + PlayStyles Badges Grid */}
            <div className="flex-1 text-center lg:text-left min-w-0">
              
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-1.5 sm:gap-2 mb-2">
                <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[11px] sm:text-xs font-bold bg-slate-800 border border-slate-700 text-slate-200">
                  {activePlayer.className || "8-D sinf"}
                </span>
                <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[11px] sm:text-xs font-bold bg-emerald-500/20 border border-emerald-500/50 text-emerald-300">
                  {activePlayer.position}
                </span>
                <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-mono font-bold bg-black/70 border border-slate-700 text-slate-300">
                  Zarba: <b className="text-white">{activePlayer.foot || "O‘ng"}</b>
                </span>
                <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-mono font-bold bg-black/70 border border-slate-700 text-slate-300">
                  Bo‘yi: <b className="text-white">{activePlayer.height || "178 sm"}</b>
                </span>
              </div>

              <h3 className="text-xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight flex items-center justify-center lg:justify-start gap-2 sm:gap-3 break-words">
                <span className="truncate">{activePlayer.name}</span>
                <button
                  onClick={() => setSelectedPlayer(activePlayer)}
                  className="p-1.5 rounded-xl bg-slate-800 hover:bg-emerald-500 hover:text-black text-slate-400 transition-all text-xs font-semibold flex items-center gap-1 shadow-md flex-shrink-0"
                  title="To‘liq profil modalini ochish"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
              </h3>

              <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
                {activePlayer.bio || "8-D sinf futbol jamoasining faol o‘yinchisi."}
              </p>

              {/* OFFICIAL EA SPORTS FC MOBILE PLAYSTYLES DIAMOND BADGES ROW */}
              <div className="mt-4 pt-3 sm:mt-5 sm:pt-4 border-t border-slate-800/80">
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-2.5">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/40 text-[9px] sm:text-[10px] font-mono font-black text-emerald-400 uppercase tracking-wider">
                    FC MOBILE
                  </span>
                  <span className="text-xs font-black text-white flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400" />
                    O‘yin Uslublari ({stylesList.length} ta):
                  </span>
                </div>

                <div className="flex flex-wrap items-start justify-center lg:justify-start gap-2 sm:gap-4">
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

            </div>
          </div>

          {/* Bottom Area: EA SPORTS FC MOBILE HEXAGONAL RADAR DIAGRAM */}
          <div className="mt-6">
            <PlayStylesDiagram playerInfo={playStylesInfo} />
          </div>

        </div>

      </div>
    </section>
  );
}
