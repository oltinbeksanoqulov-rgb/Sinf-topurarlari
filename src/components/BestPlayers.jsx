import React from 'react';
import { Trophy, Flame, Share2, Award, ArrowUpRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useFootball } from '../context/FootballContext';
import ImageWithFallback from './ImageWithFallback';

export default function BestPlayers() {
  const { stats, setSelectedPlayer } = useFootball();
  const { topScorer, topAssister } = stats;

  if (!topScorer && !topAssister) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2 font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            Turnir Yulduzlari
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Mavsumning Eng Yaxshilari
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-xl">
            Sinfimiz jamoasining eng ko‘p gol urgan to‘purari va eng ko‘p golli uzatma bergan yetakchi assistchisi.
          </p>
        </div>
      </div>

      {!stats.hasAnyGoals && !stats.hasAnyAssists && (
        <div className="mb-6 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span>Hozircha barcha o‘yinchilar statistikasi 0 ga teng. Admin panelda <b>+1</b> qo‘shilganda yetakchilar jonli yangilanadi.</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        
        {/* Top Scorer Card */}
        {topScorer && (
          <div 
            onClick={() => setSelectedPlayer(topScorer)}
            className="group relative rounded-3xl bg-gradient-to-br from-[#0c1322] via-[#0f172a] to-[#070b14] border border-amber-500/30 hover:border-amber-400/80 p-6 shadow-2xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(245,158,11,0.2)] cursor-pointer overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-500/15 transition-colors" />

            {/* Header Badge */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300">
                <Trophy className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="text-xs font-bold uppercase tracking-wider font-mono">Eng Yaxshi To‘purar</span>
              </div>
              <div className="text-slate-400 group-hover:text-amber-400 transition-colors p-2 rounded-xl bg-slate-900/60 border border-slate-800">
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-stretch gap-6">
              {/* Large Rectangular Player Photo */}
              <div className="w-36 h-48 sm:w-44 sm:h-56 rounded-2xl overflow-hidden flex-shrink-0 border-2 border-amber-400/40 shadow-xl relative group-hover:border-amber-400 transition-colors">
                <ImageWithFallback
                  src={topScorer.photoUrl}
                  alt={topScorer.name}
                  fallbackName={topScorer.name}
                  aspectRatio="aspect-[3/4]"
                  objectPosition="top"
                  className="w-full h-full"
                  imgClassName="group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Player Details & Big Stat */}
              <div className="flex-1 flex flex-col justify-between text-center sm:text-left">
                <div>
                  <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    <span>{topScorer.className}</span>
                    <span>•</span>
                    <span className="text-amber-400">{topScorer.position}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white mt-1 group-hover:text-amber-300 transition-colors">
                    {topScorer.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-2 line-clamp-2">
                    {topScorer.bio || "Jamoaning asosiy hujum chizig‘i vakili."}
                  </p>
                </div>

                {/* Big Goal Metric Box */}
                <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">Urilgan Gollar</div>
                    <div className="text-3xl sm:text-4xl font-black text-amber-400 font-mono flex items-center gap-1.5">
                      <Flame className="w-6 h-6 text-amber-500 fill-amber-500" />
                      {topScorer.goals}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">O‘yinlar / Assist</div>
                    <div className="text-sm font-bold text-slate-200 font-mono mt-1">
                      {topScorer.matches} o‘yin / {topScorer.assists} assist
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* Top Assister Card */}
        {topAssister && (
          <div 
            onClick={() => setSelectedPlayer(topAssister)}
            className="group relative rounded-3xl bg-gradient-to-br from-[#0c1322] via-[#0f172a] to-[#070b14] border border-emerald-500/30 hover:border-emerald-400/80 p-6 shadow-2xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,245,118,0.2)] cursor-pointer overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-emerald-500/15 transition-colors" />

            {/* Header Badge */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300">
                <Trophy className="w-4 h-4 fill-emerald-400 text-emerald-400" />
                <span className="text-xs font-bold uppercase tracking-wider font-mono">Eng Yaxshi Assistchi</span>
              </div>
              <div className="text-slate-400 group-hover:text-emerald-400 transition-colors p-2 rounded-xl bg-slate-900/60 border border-slate-800">
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center sm:items-stretch gap-6">
              {/* Large Rectangular Player Photo */}
              <div className="w-36 h-48 sm:w-44 sm:h-56 rounded-2xl overflow-hidden flex-shrink-0 border-2 border-emerald-400/40 shadow-xl relative group-hover:border-emerald-400 transition-colors">
                <ImageWithFallback
                  src={topAssister.photoUrl}
                  alt={topAssister.name}
                  fallbackName={topAssister.name}
                  aspectRatio="aspect-[3/4]"
                  objectPosition="top"
                  className="w-full h-full"
                  imgClassName="group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Player Details & Big Stat */}
              <div className="flex-1 flex flex-col justify-between text-center sm:text-left">
                <div>
                  <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    <span>{topAssister.className}</span>
                    <span>•</span>
                    <span className="text-emerald-400">{topAssister.position}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white mt-1 group-hover:text-emerald-300 transition-colors">
                    {topAssister.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-2 line-clamp-2">
                    {topAssister.bio || "Maydon markazidagi aniq uzatmalar ustasi."}
                  </p>
                </div>

                {/* Big Assist Metric Box */}
                <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">Golli Uzatmalar</div>
                    <div className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono flex items-center gap-1.5">
                      <Share2 className="w-6 h-6 text-emerald-400" />
                      {topAssister.assists}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[11px] uppercase tracking-wider text-slate-400 font-medium">O‘yinlar / Gol</div>
                    <div className="text-sm font-bold text-slate-200 font-mono mt-1">
                      {topAssister.matches} o‘yin / {topAssister.goals} gol
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
