import React, { useState } from 'react';
import PlayStyleIcon from './PlayStyleIcon';
import { PLAYSTYLES_CATALOG } from '../data/playStylesData';

/**
 * Authentic EA SPORTS FC Mobile style Diamond PlayStyle badge.
 * Renders the iconic tilted diamond with glowing borders, category accents and tooltip.
 */
export default function PlayStyleBadge({
  styleId,
  size = 'md', // 'sm' | 'md' | 'lg'
  showLabel = true,
  interactive = true,
  highlighted = false
}) {
  const [showTooltip, setShowTooltip] = useState(false);
  const data = PLAYSTYLES_CATALOG[styleId] || {
    id: styleId,
    name: styleId,
    category: 'O‘yin uslubi',
    categoryColor: 'from-emerald-500 to-green-500',
    description: 'Maxsus o‘yin mahorati'
  };

  // Dimensions configuration
  const config = {
    sm: {
      diamondSize: 'w-8 h-8',
      iconSize: 'w-4 h-4',
      textSize: 'text-[10px]',
      containerWidth: 'w-16'
    },
    md: {
      diamondSize: 'w-11 h-11 sm:w-12 sm:h-12',
      iconSize: 'w-5 h-5 sm:w-6 sm:h-6',
      textSize: 'text-[11px] sm:text-xs',
      containerWidth: 'w-20 sm:w-22'
    },
    lg: {
      diamondSize: 'w-14 h-14 sm:w-16 sm:h-16',
      iconSize: 'w-7 h-7 sm:w-8 sm:h-8',
      textSize: 'text-xs sm:text-sm',
      containerWidth: 'w-24 sm:w-28'
    }
  }[size] || config.md;

  return (
    <div 
      className={`relative flex flex-col items-center group cursor-pointer ${config.containerWidth}`}
      onMouseEnter={() => interactive && setShowTooltip(true)}
      onMouseLeave={() => interactive && setShowTooltip(false)}
      onClick={() => interactive && setShowTooltip(!showTooltip)}
    >
      {/* Outer Diamond Wrapper (Rotated 45deg for authentic FC Mobile look) */}
      <div className="relative p-2 flex items-center justify-center">
        {/* Glow behind diamond */}
        <div className={`absolute inset-1 rounded-lg rotate-45 transition-all duration-300 pointer-events-none ${
          highlighted
            ? 'bg-emerald-400/40 blur-md scale-110'
            : 'bg-emerald-500/10 group-hover:bg-emerald-400/30 group-hover:blur-md group-hover:scale-110'
        }`} />

        {/* The Diamond Container */}
        <div className={`relative ${config.diamondSize} rotate-45 rounded-lg sm:rounded-xl transition-all duration-300 flex items-center justify-center shadow-lg ${
          highlighted
            ? 'bg-gradient-to-br from-emerald-950 via-[#0a1824] to-[#040c14] border-2 border-emerald-400 shadow-[0_0_15px_rgba(0,245,118,0.4)] scale-105'
            : 'bg-gradient-to-br from-[#0c1322] via-[#090f1d] to-[#050914] border border-cyan-500/40 group-hover:border-emerald-400 group-hover:scale-105'
        }`}>
          {/* Inner un-rotated content so the icon stays upright! */}
          <div className="-rotate-45 flex items-center justify-center text-white group-hover:text-emerald-300 transition-colors">
            <PlayStyleIcon styleId={styleId} className={config.iconSize} />
          </div>

          {/* Corner accent tick */}
          <div className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-emerald-400 rounded-full opacity-60 group-hover:opacity-100" />
        </div>
      </div>

      {/* Label Text below diamond */}
      {showLabel && (
        <span className={`mt-1 font-semibold text-center text-slate-200 group-hover:text-emerald-300 transition-colors line-clamp-2 leading-tight ${config.textSize}`}>
          {data.name}
        </span>
      )}

      {/* Interactive Floating Tooltip Popover */}
      {interactive && showTooltip && (
        <div className="absolute bottom-full mb-3 z-50 w-52 p-3 rounded-2xl bg-slate-950/95 border border-emerald-500/50 shadow-[0_10px_30px_rgba(0,0,0,0.9)] backdrop-blur-xl animate-in fade-in zoom-in-95 pointer-events-none">
          <div className="flex items-center gap-1.5 mb-1">
            <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${data.categoryColor || 'from-emerald-400 to-green-500'}`} />
            <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
              {data.category}
            </span>
          </div>
          <h5 className="text-xs font-black text-white flex items-center gap-1">
            {data.name}
          </h5>
          <p className="text-[11px] text-slate-300 mt-1 leading-snug">
            {data.description}
          </p>
          {/* Arrow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-950" />
        </div>
      )}
    </div>
  );
}
