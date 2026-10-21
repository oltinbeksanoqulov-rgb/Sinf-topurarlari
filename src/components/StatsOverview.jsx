import React from 'react';
import { Flame, Share2, Calendar, Users, TrendingUp } from 'lucide-react';
import { useFootball } from '../context/FootballContext';

export default function StatsOverview() {
  const { stats } = useFootball();

  const statCards = [
    {
      id: 'goals',
      title: 'Jami Gollar',
      value: stats.totalGoals,
      icon: Flame,
      color: 'from-emerald-500/20 to-emerald-500/5',
      borderColor: 'border-emerald-500/30 hover:border-emerald-400',
      iconColor: 'text-emerald-400',
      badge: 'Turnir bo‘yicha',
      description: 'Jamoamiz urgan barcha gollar'
    },
    {
      id: 'assists',
      title: 'Jami Assistlar',
      value: stats.totalAssists,
      icon: Share2,
      color: 'from-blue-500/20 to-blue-500/5',
      borderColor: 'border-blue-500/30 hover:border-blue-400',
      iconColor: 'text-blue-400',
      badge: 'Golli paslar',
      description: 'Samarali uzatmalar soni'
    },
    {
      id: 'matches',
      title: 'Jami O‘yinlar',
      value: stats.totalMatches,
      icon: Calendar,
      color: 'from-teal-500/20 to-teal-500/5',
      borderColor: 'border-teal-500/30 hover:border-teal-400',
      iconColor: 'text-teal-400',
      badge: 'Maydonga tushishlar',
      description: 'O‘tkazilgan uchrashuvlar'
    },
    {
      id: 'players',
      title: 'O‘yinchilar Soni',
      value: stats.totalPlayers,
      icon: Users,
      color: 'from-cyan-500/20 to-cyan-500/5',
      borderColor: 'border-cyan-500/30 hover:border-cyan-400',
      iconColor: 'text-cyan-400',
      badge: '8-D Sinf tarkibi',
      description: 'Ro‘yxatdagi futbolchilar'
    }
  ];

  return (
    <section className="relative z-10 -mt-6 sm:-mt-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {statCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              className={`relative rounded-2xl bg-gradient-to-b ${card.color} bg-[#0c1222] border ${card.borderColor} p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_25px_rgba(0,0,0,0.5)] group overflow-hidden`}
            >
              {/* Subtle accent glow */}
              <div className="absolute top-0 right-0 -mr-6 -mt-6 w-24 h-24 bg-white/5 rounded-full blur-xl pointer-events-none group-hover:bg-emerald-500/10 transition-colors" />

              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 font-mono">
                  {card.title}
                </span>
                <div className={`p-2.5 rounded-xl bg-slate-900/80 border border-slate-700/60 ${card.iconColor} group-hover:scale-110 transition-transform shadow-inner`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-4xl sm:text-5xl font-black text-white font-mono tracking-tight group-hover:text-emerald-400 transition-colors">
                  {card.value}
                </span>
                <span className="text-xs font-medium text-emerald-400/90 flex items-center">
                  <TrendingUp className="w-3.5 h-3.5 mr-0.5" />
                  {card.badge}
                </span>
              </div>

              <p className="text-xs text-slate-400/90">
                {card.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
