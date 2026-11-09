import React from 'react';
import { 
  Shield, 
  Flame, 
  Zap, 
  Sparkles, 
  Star,
  Activity,
  Award
} from 'lucide-react';

/**
 * Authentic EA SPORTS FC Mobile PlayStyles Hexagonal Diagram Component.
 * Faithfully mirrors the design in user image:
 * - 6-axis Radar Spider Chart (Zarba, Pass, Dribling, Himoya, Jismoniy holat, To'p nazorati)
 * - Concentric web polygons with glowing green neon data fill
 * - Left panel: "O‘yin uslubi" with strong/average skills legend
 * - Right panel: "Natija" rating scores with matching icons
 * - Bottom banner: "⭐ Xulosa: Sizning kuchli tomonlaringiz..."
 */
export default function PlayStylesDiagram({ playerInfo }) {
  if (!playerInfo || !playerInfo.diagram) return null;

  const { diagram, topStyles = [], summary = '' } = playerInfo;

  // 6 Attributes in exact 12-o'clock clockwise sequence from user image:
  // 0: Zarba (Top, 12 o'clock)
  // 1: Pass (Top-Right, 2 o'clock)
  // 2: Dribling (Bottom-Right, 4 o'clock)
  // 3: Himoya (Bottom, 6 o'clock)
  // 4: Jismoniy holat (Bottom-Left, 8 o'clock)
  // 5: To'p nazorati (Top-Left, 10 o'clock)
  const axes = [
    {
      id: 'shooting',
      key: 'Zarba',
      label: 'Zarba',
      value: diagram.shooting ?? 80,
      iconType: 'goal',
      color: '#00f576'
    },
    {
      id: 'passing',
      key: 'Pass',
      label: 'Pass',
      value: diagram.passing ?? 80,
      iconType: 'boot',
      color: '#00f576'
    },
    {
      id: 'dribbling',
      key: 'Dribling',
      label: 'Dribling',
      value: diagram.dribbling ?? 80,
      iconType: 'dribble',
      color: '#00f576'
    },
    {
      id: 'defending',
      key: 'Himoya',
      label: 'Himoya',
      value: diagram.defending ?? 80,
      iconType: 'shield',
      color: '#00f576'
    },
    {
      id: 'physical',
      key: 'Jismoniy holat',
      label: 'Jismoniy holat',
      value: diagram.physical ?? 80,
      iconType: 'muscle',
      color: '#00f576'
    },
    {
      id: 'ballControl',
      key: 'To‘p nazorati',
      label: 'To‘p nazorati',
      value: diagram.ballControl ?? 80,
      iconType: 'ball',
      color: '#00f576'
    }
  ];

  // Radar geometry configuration
  const cx = 170;
  const cy = 160;
  const maxRadius = 100;
  const levels = [0.2, 0.4, 0.6, 0.8, 1.0];

  // Helper to calculate vertex coordinates at index i and given radius
  const getVertex = (index, radius) => {
    // 0 is Top (-90 deg), 1 is 60 deg clockwise (-30 deg), etc.
    const angle = -Math.PI / 2 + index * (Math.PI / 3);
    return {
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle)
    };
  };

  // Build SVG polygon points string for a given radius or data scale
  const buildPolygonPoints = (radiusOrScaleFn) => {
    return [0, 1, 2, 3, 4, 5]
      .map(i => {
        const r = typeof radiusOrScaleFn === 'function' 
          ? radiusOrScaleFn(axes[i].value) 
          : radiusOrScaleFn;
        const pt = getVertex(i, r);
        return `${pt.x.toFixed(1)},${pt.y.toFixed(1)}`;
      })
      .join(' ');
  };

  // Data polygon points
  const dataPolygonPoints = buildPolygonPoints((val) => {
    const clamped = Math.max(10, Math.min(100, val));
    return maxRadius * (clamped / 100);
  });

  // Render axis icons
  const renderAxisIcon = (type, className = "w-4 h-4") => {
    switch (type) {
      case 'goal':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
            <rect x="3" y="5" width="18" height="14" rx="2" strokeWidth="1.8" />
            <path d="M3 11h18M3 15h18M8 5v14M12 5v14M16 5v14" strokeWidth="1" opacity="0.6" />
            <circle cx="12" cy="12" r="2" fill="currentColor" />
          </svg>
        );
      case 'boot':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
            <path d="M4 17h11l4-6-4-2-4 3H4z" fill="currentColor" fillOpacity="0.3" />
            <path d="M4 20h14a3 3 0 0 0 3-3v-1H4v4z" strokeWidth="2" />
            <circle cx="21" cy="11" r="2" fill="currentColor" />
          </svg>
        );
      case 'dribble':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
            <circle cx="15" cy="5" r="2" fill="currentColor" />
            <path d="M12 9l3 3-2 5" strokeWidth="2" />
            <path d="M15 12l4-2-2-3-5 1" strokeWidth="1.8" />
            <circle cx="18" cy="18" r="2.5" fill="currentColor" />
          </svg>
        );
      case 'shield':
        return <Shield className={className} />;
      case 'muscle':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
            <path d="M6 15a4 4 0 0 0 4 4h4a3 3 0 0 0 3-3v-2a4 4 0 0 0-4-4h-2l-3-3a2 2 0 0 0-3 3l1 5z" fill="currentColor" fillOpacity="0.3" />
            <path d="M10 11a2.5 2.5 0 0 1 4 0" strokeWidth="2" />
          </svg>
        );
      case 'ball':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
            <circle cx="12" cy="12" r="8" strokeWidth="2" />
            <polygon points="12,8 15,10 14,14 10,14 9,10" fill="currentColor" />
          </svg>
        );
      default:
        return <Activity className={className} />;
    }
  };

  // Top 3 skills to highlight in left box
  const topStylesList = topStyles.length > 0 
    ? topStyles 
    : ['Dribling', 'Pass', 'Zarba'];

  return (
    <div className="relative rounded-3xl bg-gradient-to-b from-[#060c18] via-[#040813] to-[#02050b] border border-emerald-500/30 p-4 sm:p-6 shadow-[0_0_40px_rgba(0,0,0,0.8)] overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header bar matching EA SPORTS FC Mobile */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-800/80 gap-2">
        <div className="flex items-center gap-2.5">
          {/* FC Mobile Brand Badge */}
          <div className="px-2.5 py-1 rounded-lg bg-black/90 border border-slate-700 flex items-center gap-1.5 shadow-md">
            <span className="text-[10px] font-black tracking-tighter text-white uppercase italic">
              EA SPORTS
            </span>
            <span className="text-xs font-black tracking-tight text-white italic">
              FC MOBILE
            </span>
          </div>

          <h4 className="text-base sm:text-lg font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-300">
            PlayStyles Diagramma
          </h4>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[11px] font-mono text-emerald-400 font-semibold">
            <Sparkles className="w-3 h-3" />
            Hexagon Radar
          </span>
        </div>
      </div>

      {/* Main Grid: Left (O'yin uslubi), Center (Hexagon Radar), Right (Natija) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        
        {/* ========================================================= */}
        {/* LEFT PANEL: O'yin uslubi (Top skills & Legend) */}
        {/* ========================================================= */}
        <div className="lg:col-span-3 flex flex-col justify-between space-y-4 order-2 lg:order-1">
          <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-xl backdrop-blur-md">
            <h5 className="text-xs font-black uppercase tracking-wider text-white mb-3 flex items-center gap-1.5 font-mono">
              O‘yin uslubi
            </h5>

            {/* 3 Skill Cards */}
            <div className="grid grid-cols-3 lg:grid-cols-1 gap-2.5">
              {topStylesList.slice(0, 3).map((styleName, idx) => {
                // Find matching axis
                const matchedAxis = axes.find(a => 
                  a.label.toLowerCase().includes(styleName.toLowerCase()) ||
                  styleName.toLowerCase().includes(a.label.toLowerCase())
                ) || axes[idx % axes.length];

                const isStrong = matchedAxis.value >= 85;

                return (
                  <div
                    key={styleName}
                    className={`p-2.5 rounded-xl border transition-all flex items-center gap-2.5 ${
                      isStrong
                        ? 'bg-emerald-950/30 border-emerald-400 shadow-[0_0_12px_rgba(0,245,118,0.25)]'
                        : 'bg-slate-950/60 border-slate-700/70'
                    }`}
                  >
                    <div className={`p-1.5 rounded-lg flex-shrink-0 ${
                      isStrong ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-300'
                    }`}>
                      {renderAxisIcon(matchedAxis.iconType, "w-4 h-4")}
                    </div>
                    <div className="min-w-0">
                      <span className={`block text-xs font-black truncate ${
                        isStrong ? 'text-emerald-400' : 'text-slate-200'
                      }`}>
                        {styleName}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {matchedAxis.value} ball
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Legend matching Image 4 */}
            <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-2 text-[11px] font-medium text-slate-300">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-emerald-400 shadow-[0_0_8px_rgba(0,245,118,0.6)] flex-shrink-0" />
                <span className="truncate">Kuchli tomonlar</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded bg-slate-700 flex-shrink-0" />
                <span className="truncate">O‘rtacha tomonlar</span>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* CENTER PANEL: Hexagonal SVG Radar Chart */}
        {/* ========================================================= */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center order-1 lg:order-2">
          <div className="relative w-full max-w-[340px] sm:max-w-[370px] aspect-square flex items-center justify-center">
            
            <svg 
              viewBox="0 0 340 320" 
              className="w-full h-full filter drop-shadow-[0_0_20px_rgba(0,245,118,0.15)]"
            >
              <defs>
                {/* Glow filter for polygon stroke */}
                <filter id="neon-glow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="3.5" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                {/* Radar Area Gradient */}
                <radialGradient id="radar-gradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#00f576" stopOpacity="0.45" />
                  <stop offset="70%" stopColor="#00f576" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#00c853" stopOpacity="0.1" />
                </radialGradient>
              </defs>

              {/* 1. Concentric Web Polygons (5 Levels: 20%, 40%, 60%, 80%, 100%) */}
              {levels.map((lvl) => (
                <polygon
                  key={lvl}
                  points={buildPolygonPoints(maxRadius * lvl)}
                  fill="none"
                  stroke={lvl === 1.0 ? "rgba(0, 245, 118, 0.4)" : "rgba(0, 245, 118, 0.16)"}
                  strokeWidth={lvl === 1.0 ? "1.5" : "1"}
                  strokeDasharray={lvl === 1.0 ? "none" : "2 2"}
                />
              ))}

              {/* 2. Spoke lines connecting center to vertices */}
              {[0, 1, 2, 3, 4, 5].map((i) => {
                const outer = getVertex(i, maxRadius);
                return (
                  <line
                    key={i}
                    x1={cx}
                    y1={cy}
                    x2={outer.x}
                    y2={outer.y}
                    stroke="rgba(0, 245, 118, 0.22)"
                    strokeWidth="1.2"
                  />
                );
              })}

              {/* 3. The Neon Data Polygon */}
              <polygon
                points={dataPolygonPoints}
                fill="url(#radar-gradient)"
                stroke="#00f576"
                strokeWidth="2.5"
                filter="url(#neon-glow)"
              />

              {/* 4. Glowing Vertices (Dots) */}
              {[0, 1, 2, 3, 4, 5].map((i) => {
                const r = maxRadius * (Math.max(10, Math.min(100, axes[i].value)) / 100);
                const pt = getVertex(i, r);
                return (
                  <g key={i}>
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r="6"
                      fill="#00f576"
                      fillOpacity="0.4"
                    />
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r="3.5"
                      fill="#00f576"
                      stroke="#ffffff"
                      strokeWidth="1.5"
                    />
                  </g>
                );
              })}
            </svg>

            {/* 5. HTML Outer Axis Labels (Exact positioning around hexagon) */}
            {/* Top: Zarba (12 o'clock) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none">
              <div className="p-1 rounded bg-slate-900/90 border border-slate-700 text-slate-300">
                {renderAxisIcon('goal', 'w-3.5 h-3.5')}
              </div>
              <span className="text-[11px] font-bold text-slate-200 mt-0.5 font-mono">Zarba</span>
              <span className="text-sm font-black text-emerald-400 font-mono leading-none">
                {axes[0].value}
              </span>
            </div>

            {/* Top Right: Pass (2 o'clock) */}
            <div className="absolute top-10 -right-2 sm:right-0 flex flex-col items-center pointer-events-none">
              <div className="p-1 rounded bg-slate-900/90 border border-slate-700 text-slate-300">
                {renderAxisIcon('boot', 'w-3.5 h-3.5')}
              </div>
              <span className="text-[11px] font-bold text-slate-200 mt-0.5 font-mono">Pass</span>
              <span className="text-sm font-black text-emerald-400 font-mono leading-none">
                {axes[1].value}
              </span>
            </div>

            {/* Bottom Right: Dribling (4 o'clock) */}
            <div className="absolute bottom-10 -right-2 sm:right-0 flex flex-col items-center pointer-events-none">
              <div className="p-1 rounded bg-slate-900/90 border border-slate-700 text-slate-300">
                {renderAxisIcon('dribble', 'w-3.5 h-3.5')}
              </div>
              <span className="text-[11px] font-bold text-slate-200 mt-0.5 font-mono">Dribling</span>
              <span className="text-sm font-black text-emerald-400 font-mono leading-none">
                {axes[2].value}
              </span>
            </div>

            {/* Bottom: Himoya (6 o'clock) */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none">
              <span className="text-sm font-black text-emerald-400 font-mono leading-none">
                {axes[3].value}
              </span>
              <span className="text-[11px] font-bold text-slate-200 mt-0.5 font-mono">Himoya</span>
              <div className="p-1 rounded bg-slate-900/90 border border-slate-700 text-slate-300 mt-0.5">
                {renderAxisIcon('shield', 'w-3.5 h-3.5')}
              </div>
            </div>

            {/* Bottom Left: Jismoniy holat (8 o'clock) */}
            <div className="absolute bottom-10 -left-2 sm:left-0 flex flex-col items-center pointer-events-none text-center">
              <div className="p-1 rounded bg-slate-900/90 border border-slate-700 text-slate-300">
                {renderAxisIcon('muscle', 'w-3.5 h-3.5')}
              </div>
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-200 mt-0.5 font-mono max-w-[70px] truncate">
                Jismoniy
              </span>
              <span className="text-sm font-black text-emerald-400 font-mono leading-none">
                {axes[4].value}
              </span>
            </div>

            {/* Top Left: To'p nazorati (10 o'clock) */}
            <div className="absolute top-10 -left-2 sm:left-0 flex flex-col items-center pointer-events-none text-center">
              <div className="p-1 rounded bg-slate-900/90 border border-slate-700 text-slate-300">
                {renderAxisIcon('ball', 'w-3.5 h-3.5')}
              </div>
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-200 mt-0.5 font-mono max-w-[75px] truncate">
                To‘p nazorati
              </span>
              <span className="text-sm font-black text-emerald-400 font-mono leading-none">
                {axes[5].value}
              </span>
            </div>

          </div>
        </div>

        {/* ========================================================= */}
        {/* RIGHT PANEL: Natija (Results breakdown list) */}
        {/* ========================================================= */}
        <div className="lg:col-span-3 flex flex-col justify-between order-3">
          <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 shadow-xl backdrop-blur-md">
            <h5 className="text-xs font-black uppercase tracking-wider text-emerald-400 mb-3 flex items-center justify-between font-mono">
              <span>Natija</span>
              <span className="text-[10px] text-slate-400">Reyting</span>
            </h5>

            {/* List of 6 Attributes with score numbers matching image */}
            <div className="space-y-2">
              {/* Order like in image 4: Pass, Dribling, Zarba, Himoya, Jismoniy holat, To'p nazorati */}
              {[axes[1], axes[2], axes[0], axes[3], axes[4], axes[5]].map((item) => (
                <div 
                  key={item.id}
                  className="flex items-center justify-between p-2 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-emerald-500/40 transition-colors"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-slate-400 flex-shrink-0">
                      {renderAxisIcon(item.iconType, "w-4 h-4")}
                    </span>
                    <span className="text-xs font-bold text-slate-200 truncate">
                      {item.label}
                    </span>
                  </div>
                  <span className="font-mono font-black text-sm text-emerald-400">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>

      {/* ========================================================= */}
      {/* BOTTOM BANNER: Xulosa box matching user Image 4 */}
      {/* ========================================================= */}
      <div className="mt-5 p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-[#07130c] to-slate-950/80 border-2 border-emerald-400/90 shadow-[0_0_20px_rgba(0,245,118,0.2)] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 flex-shrink-0">
            <Star className="w-5 h-5 fill-emerald-400 text-emerald-400" />
          </div>
          <div className="min-w-0">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-400 block font-mono">
              Xulosa:
            </span>
            <p className="text-xs sm:text-sm font-semibold text-white truncate">
              {summary || `Sizning kuchli tomonlaringiz — ${topStylesList.slice(0, 2).join(' va ')}!`}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end">
          <span className="text-[10px] font-black italic tracking-wider uppercase text-emerald-400/80 font-mono whitespace-nowrap">
            FC MOBILE PLAYSTYLES
          </span>
        </div>
      </div>

    </div>
  );
}
