import React, { useState } from 'react';
import { Users, Shield, Award, Flame, Share2, ChevronRight, UserPlus, Gamepad2 } from 'lucide-react';
import { useFootball } from '../context/FootballContext';
import ImageWithFallback from './ImageWithFallback';

export default function TeamSection() {
  const { players, teamInfo, setSelectedPlayer, setIsAdminModalOpen, isAdmin } = useFootball();
  const [selectedPosition, setSelectedPosition] = useState('Barchasi');

  const positions = [
    { label: 'Barchasi', value: 'Barchasi' },
    { label: 'Hujumchilar', value: 'Hujumchi' },
    { label: 'Yarim himoyachilar', value: 'Yarim himoyachi' },
    { label: 'Himoyachilar', value: 'Himoyachi' },
    { label: 'Darvozabonlar', value: 'Darvozabon' }
  ];

  const filteredTeam = players.filter((player) => {
    if (selectedPosition === 'Barchasi') return true;
    return player.position === selectedPosition;
  });

  return (
    <section id="team" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-20">
      
      {/* Title & Tagline */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-2 font-mono">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            8-D Sinf Tarkibi
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Bizning Jamoamiz
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-1 max-w-xl">
            {teamInfo.description || "Bizning 8-D sinf futbol jamoamiz — intizom, mahorat va birdamlik timsoli."}
          </p>
        </div>

        {/* Action Button: Jamoa a'zolari */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              const el = document.getElementById('formation');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 text-sm font-bold transition-all shadow-md"
          >
            <Gamepad2 className="w-4 h-4 text-amber-400" />
            <span>1-2-3-2 Sxema</span>
          </button>

          <button
            onClick={() => {
              const el = document.getElementById('team-grid');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 text-sm font-bold transition-all shadow-md"
          >
            <Users className="w-4 h-4 text-emerald-400" />
            <span>Jamoa a’zolari ({players.length})</span>
          </button>

          {isAdmin && (
            <button
              onClick={() => setIsAdminModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-semibold hover:bg-emerald-500/25 transition-all"
            >
              <UserPlus className="w-4 h-4" />
              <span>O‘yinchi qo‘shish</span>
            </button>
          )}
        </div>
      </div>

      {/* Large Team Banner Photograph */}
      <div className="relative rounded-3xl overflow-hidden border border-emerald-500/30 shadow-[0_15px_40px_rgba(0,0,0,0.7)] mb-10 group">
        <div className="min-h-[220px] sm:min-h-[320px] relative flex flex-col justify-end">
          <img
            src={teamInfo.teamPhotoUrl || "/team-banner.jpg"}
            alt="8-D Sinf Jamoaviy Surati"
            className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
          />
          {/* Cinematic dark stadium vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#060a15] via-[#060a15]/75 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent pointer-events-none" />
          
          {/* Overlay Info */}
          <div className="relative z-10 p-4 sm:p-7 flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
            <div className="flex items-center gap-3.5 sm:gap-5 min-w-0">
              <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-emerald-400 shadow-[0_0_25px_rgba(0,245,118,0.4)] flex-shrink-0 bg-slate-950 p-0.5">
                <img
                  src="/logo.jpg"
                  alt="8-D Sinf Logotipi"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] sm:text-xs font-mono font-bold uppercase">
                    {teamInfo.grade || "8-D Sinf"}
                  </span>
                  <span className="text-[11px] sm:text-xs text-slate-300 font-medium truncate">
                    {teamInfo.school || "Maktab Birinchiligi"}
                  </span>
                </div>
                <h3 className="text-xl sm:text-3xl md:text-4xl font-black text-white drop-shadow-md truncate">
                  {teamInfo.name ? teamInfo.name.replace(/['"]?Burgutlar['"]?/gi, '').trim() : "8-D Sinf"}
                </h3>
                <p className="text-xs sm:text-sm text-emerald-400/90 italic mt-0.5 font-medium line-clamp-2">
                  "{teamInfo.motto || "Futbol faqat o‘yin emas, bu hayot tarzi!"}"
                </p>
              </div>
            </div>

            {/* Team Squad Badge (Replaces Sardor & Murabbiy) */}
            <div className="flex items-center gap-2.5 bg-slate-950/85 backdrop-blur-md px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-2xl border border-emerald-500/30 text-xs text-slate-200 shadow-lg self-start md:self-auto">
              <Users className="w-4 h-4 text-emerald-400" />
              <span className="font-bold font-mono text-white">{players.length} nafar futbolchi</span>
              <span className="text-slate-600">•</span>
              <span className="text-emerald-400 font-mono font-semibold">Bahor Kubogi 2025</span>
            </div>
          </div>
        </div>
      </div>

      {/* Position Filter Tabs */}
      <div id="team-grid" className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none sm:flex-wrap mb-8">
        {positions.map((pos) => (
          <button
            key={pos.value}
            onClick={() => setSelectedPosition(pos.value)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              selectedPosition === pos.value
                ? 'bg-emerald-400 text-black shadow-[0_0_15px_rgba(0,245,118,0.3)]'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700'
            }`}
          >
            {pos.label}
          </button>
        ))}
      </div>

      {/* Player Roster Grid with Rectangular Photos */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {filteredTeam.map((player) => (
          <div
            key={player.id}
            onClick={() => setSelectedPlayer(player)}
            className="group relative rounded-2xl bg-gradient-to-b from-slate-900 to-[#070b14] border border-slate-800 hover:border-emerald-500/50 p-3 sm:p-4 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,245,118,0.15)] cursor-pointer flex flex-col justify-between"
          >
            {/* Large Rectangular Portrait (NOT circular!) */}
            <div className="relative rounded-xl overflow-hidden aspect-[3/4] mb-3 border border-slate-800 group-hover:border-emerald-500/40 transition-colors">
              <ImageWithFallback
                src={player.photoUrl}
                alt={player.name}
                jerseyNumber={player.jerseyNumber}
                fallbackName={player.name}
                aspectRatio="aspect-[3/4]"
                objectPosition="top"
                className="w-full h-full"
                imgClassName="group-hover:scale-105 transition-transform duration-500"
              />
              
              {/* Position Pill */}
              <div className="absolute bottom-2 left-2 right-2 bg-slate-950/85 backdrop-blur-sm px-2 py-1 rounded-md text-[11px] font-semibold text-slate-200 text-center truncate border border-slate-800 pointer-events-none">
                {player.position}
              </div>
            </div>

            {/* Player Info */}
            <div>
              <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-emerald-400 transition-colors truncate">
                {player.name}
              </h4>
              <div className="text-[11px] text-slate-400 flex items-center justify-between mt-1">
                <span>{player.className}</span>
                <span className="font-mono text-slate-500">{player.matches} o‘yin</span>
              </div>
            </div>

            {/* Quick Goals & Assists Pill */}
            <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between font-mono text-xs">
              <div className="flex items-center gap-1 text-emerald-400 font-bold">
                <Flame className="w-3.5 h-3.5 fill-emerald-400" />
                <span>{player.goals} gol</span>
              </div>
              <div className="flex items-center gap-1 text-cyan-400 font-bold">
                <Share2 className="w-3.5 h-3.5" />
                <span>{player.assists} pas</span>
              </div>
            </div>

          </div>
        ))}
      </div>

    </section>
  );
}
