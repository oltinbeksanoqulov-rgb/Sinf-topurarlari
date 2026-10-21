import React, { useEffect } from 'react';
import { X, Trophy, Flame, Share2, Calendar, Award, Shield, Activity, Sparkles } from 'lucide-react';
import { useFootball } from '../context/FootballContext';
import ImageWithFallback from './ImageWithFallback';

export default function PlayerDetailModal() {
  const { selectedPlayer, setSelectedPlayer, stats } = useFootball();

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

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md">
      <div className="min-h-full flex items-start sm:items-center justify-center p-3 sm:p-6 py-6 sm:py-8">
        {/* Backdrop click dismiss */}
        <div 
          onClick={() => setSelectedPlayer(null)}
          className="fixed inset-0 -z-10" 
        />

        {/* Modal Dialog Card */}
        <div className="relative w-full max-w-2xl bg-gradient-to-b from-[#0e1629] via-[#090f1d] to-[#060a14] border border-cyan-500/30 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.9)] overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200 my-auto">
          
          {/* Glow ambient */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={() => setSelectedPlayer(null)}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 p-2 sm:p-2.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors shadow-lg"
            aria-label="Yopish"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-4 sm:p-8">
            
            {/* Header Row */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-8 mb-6">
              
              {/* Noticeably large rectangular portrait (NOT circular!) */}
              <div className="w-32 h-44 sm:w-44 sm:h-56 rounded-2xl overflow-hidden flex-shrink-0 border-2 border-emerald-500/40 shadow-2xl relative bg-slate-900">
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
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-800/90 border border-slate-700 text-slate-200">
                  {selectedPlayer.className || "10-A sinf"}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 border border-emerald-500/40 text-emerald-300">
                  {selectedPlayer.position}
                </span>

                {isTopScorer && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 border border-amber-500/50 text-amber-300 flex items-center gap-1 font-mono">
                    <Trophy className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> To‘purar #1
                  </span>
                )}
                {isTopAssister && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 border border-blue-500/50 text-blue-300 flex items-center gap-1 font-mono">
                    <Share2 className="w-3.5 h-3.5" /> Assistchi #1
                  </span>
                )}
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {selectedPlayer.name}
              </h2>

              <p className="text-sm text-slate-300 mt-3 leading-relaxed">
                {selectedPlayer.bio || "10-A sinf futbol jamoasi a’zosi. Har bir uchrashuvda jamoa g‘alabasi uchun faol ishtirok etadi."}
              </p>

              {/* Physical / Player Attributes */}
              <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-800 text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px] uppercase">Zarba beruvchi oyoq:</span>
                  <span className="font-semibold text-slate-200">{selectedPlayer.foot || "O‘ng"}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px] uppercase">Bo‘yi:</span>
                  <span className="font-semibold text-slate-200">{selectedPlayer.height || "178 sm"}</span>
                </div>
              </div>
            </div>

          </div>

          {/* Key Statistics Grid (NO total points!) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800">
            
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

          {/* Modal Footer Action */}
          <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
            <button
              onClick={() => setSelectedPlayer(null)}
              className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold transition-colors"
            >
              Yopish
            </button>
          </div>

        </div>

      </div>
    </div>
  </div>
  );
}
