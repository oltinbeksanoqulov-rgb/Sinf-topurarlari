import React from 'react';
import { Flame, ChevronRight, Shield, Crown } from 'lucide-react';
import { useFootball } from '../context/FootballContext';

export default function Hero() {
  const { stats, setLeaderboardTab } = useFootball();

  const scrollToLeaderboard = (tab = 'goals') => {
    setLeaderboardTab(tab);
    const elem = document.getElementById('leaderboard');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTeam = () => {
    const elem = document.getElementById('team');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-[82vh] lg:min-h-[86vh] flex items-center justify-center overflow-hidden pt-12 pb-20">
      {/* Cinematic Stadium & Ronaldo Sunset Background provided by User */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat filter brightness-[0.78] contrast-[1.08] transition-all duration-700"
          style={{
            backgroundImage: `url('/hero-bg.png')`
          }}
        />
        {/* Soft Vignette and Gradient overlays for maximum text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050811] via-[#050811]/60 to-black/40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#050811]/40 to-[#050811]/90" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center flex flex-col items-center space-y-7">
        
        {/* Tagline Badge matching the handwriting in background image */}
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full bg-slate-950/85 border border-emerald-400/40 text-emerald-300 shadow-[0_0_25px_rgba(0,245,118,0.25)] backdrop-blur-md max-w-full">
          <Crown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 fill-amber-400 animate-pulse flex-shrink-0" />
          <span className="text-[11px] sm:text-sm font-bold tracking-wider uppercase font-mono truncate">
            Futbol faqat o‘yin emas, bu hayot tarzi!
          </span>
        </div>

        {/* Main Heading */}
        <div className="space-y-3 max-w-3xl">
          <h1 className="text-3xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-[1.08] drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
            Sinifimiz <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-green-300 to-cyan-400 drop-shadow-[0_0_35px_rgba(0,245,118,0.45)]">
              To‘p Urarlari
            </span>
          </h1>
          <p className="text-sm sm:text-xl text-slate-200 font-medium leading-relaxed drop-shadow-md max-w-2xl mx-auto pt-1">
            8-D sinfdoshlarimizning gollari, assistlari va futbol natijalari — barchasi bir joyda! 
            Mavsum yetakchilari va to‘purarlar poygasini jonli kuzatib boring.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 pt-2 w-full sm:w-auto px-4 sm:px-0">
          <button
            onClick={() => scrollToLeaderboard('goals')}
            className="group relative inline-flex items-center justify-center px-6 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-bold text-black transition-all duration-300 bg-gradient-to-r from-emerald-400 to-green-400 rounded-2xl hover:from-emerald-300 hover:to-green-300 hover:shadow-[0_0_35px_rgba(0,245,118,0.6)] active:scale-95 shadow-xl"
          >
            <Flame className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-black fill-black" />
            <span>Reytingni ko‘rish</span>
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={scrollToTeam}
            className="inline-flex items-center justify-center px-6 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-semibold text-slate-100 transition-all duration-300 bg-slate-900/90 border border-slate-600/70 rounded-2xl hover:bg-slate-800 hover:border-emerald-400 active:scale-95 backdrop-blur-md shadow-xl"
          >
            <Shield className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-cyan-400" />
            <span>Jamoamiz tarkibi</span>
          </button>
        </div>

        {/* Micro Highlights Pill - Initialized at 0 */}
        <div className="pt-4 sm:pt-6 grid grid-cols-3 gap-2 sm:gap-6 w-full max-w-lg">
          <div className="bg-slate-950/80 backdrop-blur-md p-2.5 sm:p-4 rounded-2xl border border-emerald-500/30 shadow-xl text-center">
            <div className="text-xl sm:text-4xl font-black text-white font-mono">{stats.totalGoals}</div>
            <div className="text-[10px] sm:text-xs uppercase tracking-wider text-emerald-400 font-semibold mt-1">Jami gollar</div>
          </div>
          <div className="bg-slate-950/80 backdrop-blur-md p-2.5 sm:p-4 rounded-2xl border border-cyan-500/30 shadow-xl text-center">
            <div className="text-xl sm:text-4xl font-black text-white font-mono">{stats.totalAssists}</div>
            <div className="text-[10px] sm:text-xs uppercase tracking-wider text-cyan-400 font-semibold mt-1">Jami assistlar</div>
          </div>
          <div className="bg-slate-950/80 backdrop-blur-md p-2.5 sm:p-4 rounded-2xl border border-slate-700/60 shadow-xl text-center">
            <div className="text-xl sm:text-4xl font-black text-slate-200 font-mono">{stats.totalPlayers}</div>
            <div className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-400 font-semibold mt-1">Futbolchilar</div>
          </div>
        </div>

      </div>
    </section>
  );
}
