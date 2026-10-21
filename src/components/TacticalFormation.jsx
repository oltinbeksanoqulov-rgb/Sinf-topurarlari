import React, { useState, useRef } from 'react';
import { 
  Trophy, 
  Sparkles, 
  Download, 
  Eye, 
  Gamepad2, 
  Layers, 
  Shield, 
  Flame, 
  Share2, 
  Info, 
  CheckCircle2, 
  ArrowUpRight,
  Maximize2
} from 'lucide-react';
import { useFootball } from '../context/FootballContext';

export default function TacticalFormation() {
  const { players, setSelectedPlayer } = useFootball();
  const [viewMode, setViewMode] = useState('fc_mobile'); // 'fc_mobile' | 'tactical'
  const [hoveredPlayerId, setHoveredPlayerId] = useState(null);
  const [isExporting, setIsExporting] = useState(false);
  const pitchContainerRef = useRef(null);

  // Exact 1-2-3-2 lineup based on user specification
  // Attack (2): Sanoqulov Oltinbek, Xoliyorov Ibrohim
  // Midfield (3): Salaydinov Miraziz, Xusanov Ozodbek, Qahramonov Samariddin
  // Defense (2): Xayrullayev Javohir, Eshmamatov Ibrohim
  // Goalkeeper (1): Abdumannonov Ibrohim
  const tacticalLineup = [
    // --- HUJUM (Attack) - 2 o'yinchi ---
    {
      slotId: 'st_left',
      nameMatch: 'Sanoqulov Oltinbek',
      shortName: 'SANOQULOV',
      formationPos: 'ST',
      posLabel: 'Chap hujumchi',
      ovr: 127,
      rank: 30,
      gridRow: 'attack',
      signature: true,
      tacticalRole: 'Asosiy to‘purar • Yakunlovchi zarbalar',
      order: 1
    },
    {
      slotId: 'st_right',
      nameMatch: 'Xolyorov Ibrohim', // match with initialData spelling
      altNameMatch: 'Xoliyorov Ibrohim',
      shortName: 'XOLYOROV',
      formationPos: 'ST',
      posLabel: 'O‘ng hujumchi',
      ovr: 126,
      rank: 30,
      gridRow: 'attack',
      signature: false,
      tacticalRole: 'Ikkinchi hujumchi • Pressing va tezlik',
      order: 2
    },

    // --- YARIM HIMOYACHILAR (Midfield) - 3 o'yinchi ---
    {
      slotId: 'mid_left',
      nameMatch: 'Salaydinov Miraziz',
      shortName: 'SALAYDINOV',
      formationPos: 'LM',
      posLabel: 'Chap qanot',
      ovr: 127,
      rank: 30,
      gridRow: 'midfield',
      signature: true,
      tacticalRole: 'Qanotdan yorib kirish • Tezkor assistlar',
      order: 3
    },
    {
      slotId: 'mid_center',
      nameMatch: 'Xusanov Ozodbek',
      shortName: 'XUSANOV',
      formationPos: 'CAM',
      posLabel: 'Markaziy pleymeyker',
      ovr: 126,
      rank: 30,
      gridRow: 'midfield',
      signature: false,
      tacticalRole: 'Markaz dirijyori • Hujumni boshqarish',
      order: 4
    },
    {
      slotId: 'mid_right',
      nameMatch: 'Qahramonov Samariddin',
      shortName: 'QAHRAMONOV',
      formationPos: 'RM',
      posLabel: 'O‘ng qanot',
      ovr: 126,
      rank: 30,
      gridRow: 'midfield',
      signature: false,
      tacticalRole: 'Qanot to‘p uzatmalari • Standartlar',
      order: 5
    },

    // --- HIMOYACHILAR (Defense) - 2 o'yinchi ---
    {
      slotId: 'def_left',
      nameMatch: 'Xayrullayev Javohir',
      altNameMatch: 'Xayrullaryev Javohir',
      shortName: 'XAYRULLAYEV',
      formationPos: 'CB',
      posLabel: 'Chap markaziy himoya',
      ovr: 127,
      rank: 30,
      gridRow: 'defense',
      signature: true,
      tacticalRole: 'Yakkakurashlar • Qanot yopish',
      order: 6
    },
    {
      slotId: 'def_right',
      nameMatch: 'Eshmamatov Ibrohim',
      shortName: 'ESHMAMATOV',
      formationPos: 'CB',
      posLabel: 'O‘ng markaziy himoya',
      ovr: 127,
      rank: 30,
      gridRow: 'defense',
      signature: true,
      tacticalRole: 'Mudofaa tayanchi • To‘pni olib qo‘yish',
      order: 7
    },

    // --- DARVOZABON (Goalkeeper) - 1 o'yinchi ---
    {
      slotId: 'gk',
      nameMatch: 'Abdumannonov Ibrohim',
      altNameMatch: 'Abdumanonov Ibrohim',
      shortName: 'ABDUMANNONOV',
      formationPos: 'GK',
      posLabel: 'Darvozabon',
      ovr: 125,
      rank: 30,
      gridRow: 'gk',
      signature: false,
      tacticalRole: 'Darvoza daxlsizligi • Seyvlar',
      order: 8
    }
  ];

  // Map tactical lineup to live player data from context
  const fullLineup = tacticalLineup.map((slot) => {
    const matchedPlayer = players.find((p) => {
      const pName = p.name.trim().toLowerCase();
      const sName = slot.nameMatch.trim().toLowerCase();
      const altName = slot.altNameMatch ? slot.altNameMatch.trim().toLowerCase() : '';
      return pName === sName || (altName && pName === altName) || pName.includes(slot.shortName.toLowerCase());
    }) || {
      id: slot.slotId,
      name: slot.nameMatch,
      jerseyNumber: slot.formationPos === 'GK' ? 1 : 9,
      position: slot.posLabel,
      goals: 0,
      assists: 0,
      matches: 0,
      photoUrl: `/players/${slot.shortName.toLowerCase()}.jpg`
    };

    return {
      ...slot,
      playerData: matchedPlayer
    };
  });

  // Calculate team stats
  const teamOvr = 127;
  const teamChemistry = 100;

  // High-resolution Canvas Screenshot Download Function
  const handleDownloadLineupImage = async () => {
    try {
      setIsExporting(true);
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const width = 1200;
      const height = 1550;
      canvas.width = width;
      canvas.height = height;

      // 1. Stadium Night Sky Background
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, '#040714');
      bgGrad.addColorStop(0.15, '#071126');
      bgGrad.addColorStop(0.35, '#0c1d3b');
      bgGrad.addColorStop(1, '#050c18');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Stadium floodlights beam effect
      const drawSpotlight = (x, y, radius, color) => {
        const spot = ctx.createRadialGradient(x, y, 10, x, y, radius);
        spot.addColorStop(0, color);
        spot.addColorStop(1, 'transparent');
        ctx.fillStyle = spot;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      };
      drawSpotlight(200, 150, 400, 'rgba(0, 245, 118, 0.18)');
      drawSpotlight(1000, 150, 400, 'rgba(56, 189, 248, 0.2)');
      drawSpotlight(600, 400, 500, 'rgba(234, 179, 8, 0.12)');

      // 2. Football Pitch (Lawn) with 3D Perspective feeling
      const pitchMargin = 60;
      const pitchTop = 180;
      const pitchWidth = width - pitchMargin * 2;
      const pitchHeight = height - pitchTop - 60;

      // Pitch background
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(pitchMargin, pitchTop, pitchWidth, pitchHeight, 28);
      ctx.clip();

      // Mowed grass stripes (horizontal)
      const stripeHeight = pitchHeight / 12;
      for (let i = 0; i < 12; i++) {
        ctx.fillStyle = i % 2 === 0 ? '#1b7431' : '#145c25';
        ctx.fillRect(pitchMargin, pitchTop + i * stripeHeight, pitchWidth, stripeHeight);
      }

      // Pitch border glow
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.lineWidth = 4;
      ctx.strokeRect(pitchMargin + 10, pitchTop + 10, pitchWidth - 20, pitchHeight - 20);

      // Field markings
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.55)';
      ctx.lineWidth = 3;

      // Halfway line (at the top for vertical attack view)
      const halfY = pitchTop + 40;
      ctx.beginPath();
      ctx.moveTo(pitchMargin + 10, halfY);
      ctx.lineTo(pitchMargin + pitchWidth - 10, halfY);
      ctx.stroke();

      // Center circle
      ctx.beginPath();
      ctx.arc(width / 2, halfY, 120, 0, Math.PI);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(width / 2, halfY, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();

      // Penalty box (at bottom)
      const boxW = 560;
      const boxH = 260;
      const boxX = (width - boxW) / 2;
      const boxY = pitchTop + pitchHeight - boxH - 10;
      ctx.strokeRect(boxX, boxY, boxW, boxH);

      // 6-yard box
      const sBoxW = 280;
      const sBoxH = 110;
      const sBoxX = (width - sBoxW) / 2;
      const sBoxY = pitchTop + pitchHeight - sBoxH - 10;
      ctx.strokeRect(sBoxX, sBoxY, sBoxW, sBoxH);

      // Penalty spot & arc
      const penSpotY = boxY + 90;
      ctx.beginPath();
      ctx.arc(width / 2, penSpotY, 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(width / 2, penSpotY, 80, Math.PI * 1.15, Math.PI * 1.85);
      ctx.stroke();

      ctx.restore();

      // 3. Header Banner on image
      ctx.fillStyle = '#ffffff';
      ctx.font = '900 36px "Inter", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('8-D SINF • 1-2-3-2 TAKTIK SXEMASI', width / 2, 70);

      ctx.font = '600 20px "Inter", sans-serif';
      ctx.fillStyle = '#00f576';
      ctx.fillText('EA FC MOBILE STYLE • JAMOA REYTINGI: 127 OVR • KIMYO: 100%', width / 2, 110);

      // Helper to load image
      const loadImage = (url) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.onload = () => resolve(img);
          img.onerror = () => resolve(null);
          img.src = url;
        });
      };

      // Card positions coordinates
      const positionsMap = {
        st_left: { x: width * 0.33, y: pitchTop + 140 },
        st_right: { x: width * 0.67, y: pitchTop + 140 },
        mid_left: { x: width * 0.18, y: pitchTop + 450 },
        mid_center: { x: width * 0.50, y: pitchTop + 450 },
        mid_right: { x: width * 0.82, y: pitchTop + 450 },
        def_left: { x: width * 0.34, y: pitchTop + 780 },
        def_right: { x: width * 0.66, y: pitchTop + 780 },
        gk: { x: width * 0.50, y: pitchTop + 1070 }
      };

      const cardW = 160;
      const cardH = 220;

      for (const item of fullLineup) {
        const pos = positionsMap[item.slotId];
        if (!pos) continue;

        const cx = pos.x - cardW / 2;
        const cy = pos.y - cardH / 2;

        // Card Drop Shadow
        ctx.save();
        ctx.shadowColor = 'rgba(0,0,0,0.85)';
        ctx.shadowBlur = 25;
        ctx.shadowOffsetY = 12;

        // Golden Card Base
        const goldGrad = ctx.createLinearGradient(cx, cy, cx + cardW, cy + cardH);
        goldGrad.addColorStop(0, '#ffe57f');
        goldGrad.addColorStop(0.2, '#f59e0b');
        goldGrad.addColorStop(0.5, '#ffd700');
        goldGrad.addColorStop(0.8, '#b45309');
        goldGrad.addColorStop(1, '#ffe57f');

        ctx.fillStyle = goldGrad;
        ctx.beginPath();
        ctx.roundRect(cx, cy, cardW, cardH, 16);
        ctx.fill();
        ctx.restore();

        // Inner Card Background
        ctx.save();
        ctx.beginPath();
        ctx.roundRect(cx + 4, cy + 4, cardW - 8, cardH - 8, 14);
        ctx.clip();

        const innerGrad = ctx.createLinearGradient(cx, cy, cx, cy + cardH);
        innerGrad.addColorStop(0, '#1c1917');
        innerGrad.addColorStop(0.4, '#292524');
        innerGrad.addColorStop(1, '#0c0a09');
        ctx.fillStyle = innerGrad;
        ctx.fillRect(cx + 4, cy + 4, cardW - 8, cardH - 8);

        // Player Photo
        const pImg = await loadImage(item.playerData.photoUrl);
        if (pImg) {
          ctx.drawImage(pImg, cx + 18, cy + 38, cardW - 36, cardH - 85);
        } else {
          ctx.fillStyle = '#3f3f46';
          ctx.fillRect(cx + 18, cy + 38, cardW - 36, cardH - 85);
        }

        // Card Top: OVR and Position
        ctx.fillStyle = '#ffffff';
        ctx.font = '900 24px "Inter", sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(`${item.ovr}`, cx + 12, cy + 28);

        ctx.fillStyle = '#f59e0b';
        ctx.font = '800 13px "Inter", sans-serif';
        ctx.fillText(item.formationPos, cx + 14, cy + 44);

        // Name ribbon at bottom
        const nameRibbonY = cy + cardH - 42;
        const nameGrad = ctx.createLinearGradient(cx, nameRibbonY, cx + cardW, nameRibbonY);
        nameGrad.addColorStop(0, '#f59e0b');
        nameGrad.addColorStop(0.5, '#ffd700');
        nameGrad.addColorStop(1, '#f59e0b');
        ctx.fillStyle = nameGrad;
        ctx.fillRect(cx + 6, nameRibbonY, cardW - 12, 28);

        ctx.fillStyle = '#000000';
        ctx.font = '900 13px "Inter", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(item.shortName, cx + cardW / 2, nameRibbonY + 19);

        ctx.restore();

        // Position pill on turf below the card
        const pillY = cy + cardH + 12;
        ctx.fillStyle = '#0f172a';
        ctx.strokeStyle = '#334155';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(cx + cardW / 2 - 28, pillY, 56, 22, 11);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.font = '800 11px "Inter", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(item.formationPos, cx + cardW / 2, pillY + 15);

        // Glowing green position proficiency bar
        ctx.fillStyle = '#00f576';
        ctx.shadowColor = '#00f576';
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.roundRect(cx + cardW / 2 - 16, pillY + 25, 32, 5, 3);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // 4. Footer Branding
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.font = '500 14px "Inter", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('8-D Sinf Futbol Jamoasi • Sinifimiz To‘p Urarlari Rasmiy Portali', width / 2, height - 25);

      // Download trigger
      const link = document.createElement('a');
      link.download = `8-D-Sinf-1-2-3-2-Sxema.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Image download failed:', err);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <section id="formation" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-20">
      
      {/* Header Info & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-5 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/15 via-emerald-500/15 to-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2.5 font-mono shadow-[0_0_15px_rgba(245,158,11,0.2)]">
            <Gamepad2 className="w-4 h-4 text-amber-400" />
            <span>EA FC Mobile Squad • 1-2-3-2 Sxema</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight flex items-center gap-3">
            Taktik Joylashuv
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-yellow-300 to-amber-400 text-2xl sm:text-3xl font-mono">
              (1-2-3-2)
            </span>
          </h2>
          
          <p className="text-sm sm:text-base text-slate-400 mt-1.5 max-w-2xl leading-relaxed">
            Bizning 8-D sinf jamoamizning mini-futbol va maktab chempionatidagi rasmiy asosiy tarkib sxemasi. Har bir futbolchi o‘z pozitsiyasida to‘liq kimyo (100%) va eng yuqori OVR ko‘rsatkichida!
          </p>
        </div>

        {/* Action Buttons & View Mode Switcher */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Mode Switcher */}
          <div className="flex items-center p-1 bg-slate-900/90 border border-slate-700/80 rounded-2xl shadow-inner">
            <button
              onClick={() => setViewMode('fc_mobile')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                viewMode === 'fc_mobile'
                  ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 shadow-[0_0_15px_rgba(245,158,11,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Gamepad2 className="w-4 h-4" />
              <span>FC Mobile Kartalar</span>
            </button>
            <button
              onClick={() => setViewMode('tactical')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                viewMode === 'tactical'
                  ? 'bg-emerald-500 text-slate-950 shadow-[0_0_15px_rgba(0,245,118,0.4)]'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Taktik Doska</span>
            </button>
          </div>

          {/* Download Screenshot Button */}
          <button
            onClick={handleDownloadLineupImage}
            disabled={isExporting}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-bold transition-all shadow-[0_0_20px_rgba(0,245,118,0.15)] active:scale-95"
            title="Sxemani rasm qilib saqlash"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>{isExporting ? 'Tayyorlanmoqda...' : 'Rasm qilib yuklab olish'}</span>
          </button>
        </div>
      </div>

      {/* Squad Stats Bar (FC Mobile Style) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-8">
        
        {/* Team OVR */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-amber-950/20 border border-amber-500/30 p-3.5 sm:p-4 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs text-amber-300 font-semibold uppercase tracking-wider font-mono">Jamoa OVR</span>
            <Sparkles className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 font-mono">
              {teamOvr}
            </span>
            <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
              Maximal
            </span>
          </div>
        </div>

        {/* Team Chemistry */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-emerald-950/20 border border-emerald-500/30 p-3.5 sm:p-4 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs text-emerald-300 font-semibold uppercase tracking-wider font-mono">Kimyo (Chemistry)</span>
            <Shield className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono">
              {teamChemistry}%
            </span>
            <span className="text-xs text-slate-400">100/100</span>
          </div>
        </div>

        {/* Formation Type */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-cyan-950/20 border border-cyan-500/30 p-3.5 sm:p-4 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs text-cyan-300 font-semibold uppercase tracking-wider font-mono">Format</span>
            <Flame className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-white font-mono">
              1-2-3-2
            </span>
            <span className="text-xs text-cyan-400 font-medium">Hujumkor</span>
          </div>
        </div>

        {/* Players On Pitch */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-purple-950/20 border border-purple-500/30 p-3.5 sm:p-4 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs text-purple-300 font-semibold uppercase tracking-wider font-mono">Tarkib</span>
            <Trophy className="w-4 h-4 text-purple-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black text-white font-mono">
              8 <span className="text-sm font-normal text-slate-400">/ 8</span>
            </span>
            <span className="text-xs text-purple-300 font-bold bg-purple-500/15 px-1.5 py-0.5 rounded border border-purple-500/30">
              8-D Sinf
            </span>
          </div>
        </div>
      </div>

      {/* Main Football Pitch Container */}
      <div 
        ref={pitchContainerRef}
        className="relative rounded-3xl overflow-hidden border-2 border-emerald-500/40 shadow-[0_20px_60px_rgba(0,0,0,0.85)] bg-[#040812]"
      >
        {/* Stadium Night Ambient Lights / Cones */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {/* Top Stadium Lights */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-[100px]" />
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-80 bg-emerald-600/10 rounded-full blur-[120px]" />
          
          {/* Subtle Stadium Light Cones */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-black/60" />
        </div>

        {/* Realistic Football Pitch Grass Pattern */}
        <div className="relative z-10 w-full min-h-[920px] sm:min-h-[1050px] lg:min-h-[1150px] p-4 sm:p-8 flex flex-col justify-between overflow-x-auto">
          
          {/* Grass Alternating Stripes Overlay (Lawn mower stripes) */}
          <div 
            className="absolute inset-2 sm:inset-4 rounded-2xl pointer-events-none opacity-90 border border-white/20"
            style={{
              background: `repeating-linear-gradient(
                to bottom,
                #1b7431 0px,
                #1b7431 52px,
                #155f27 52px,
                #155f27 104px
              )`
            }}
          >
            {/* Field Turf Texture Grid Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.4)_100%)]" />

            {/* Field Lines (SVG) */}
            <svg className="absolute inset-0 w-full h-full stroke-white/40 fill-none" preserveAspectRatio="none">
              {/* Halfway line (at the top for vertical field) */}
              <line x1="0%" y1="6%" x2="100%" y2="6%" strokeWidth="2.5" />
              <circle cx="50%" cy="6%" r="70" strokeWidth="2.5" />
              <circle cx="50%" cy="6%" r="4" fill="rgba(255,255,255,0.7)" />

              {/* Penalty Box (at bottom) */}
              <rect x="20%" y="72%" width="60%" height="28%" strokeWidth="2.5" />
              
              {/* 6-Yard Goal Box */}
              <rect x="33%" y="87%" width="34%" height="13%" strokeWidth="2.5" />

              {/* Penalty Spot */}
              <circle cx="50%" cy="81%" r="4" fill="rgba(255,255,255,0.7)" />

              {/* Penalty Arc */}
              <path d="M 42% 72% A 60 60 0 0 1 58% 72%" strokeWidth="2.5" />

              {/* Corner Arcs */}
              <path d="M 0% 97% A 30 30 0 0 0 3% 100%" strokeWidth="2" />
              <path d="M 100% 97% A 30 30 0 0 1 97% 100%" strokeWidth="2" />
            </svg>
          </div>

          {/* Interactive Formation Rows */}
          <div className="relative z-20 flex flex-col justify-between h-full min-h-[860px] sm:min-h-[980px] lg:min-h-[1060px] py-6 sm:py-10">
            
            {/* ROW 1: HUJUMCHILAR (2 Strikers: Sanoqulov Oltinbek, Xoliyorov Ibrohim) */}
            <div className="flex flex-col items-center">
              <div className="text-[10px] sm:text-xs font-mono font-bold text-amber-300 uppercase tracking-widest bg-slate-950/80 px-3 py-0.5 rounded-full border border-amber-500/30 mb-3 shadow">
                Hujum Chizig‘i (2 ST)
              </div>
              <div className="w-full max-w-2xl flex items-center justify-around px-2 sm:px-8">
                {fullLineup.filter(p => p.gridRow === 'attack').map((slot) => (
                  <PitchPlayerSlot
                    key={slot.slotId}
                    slot={slot}
                    viewMode={viewMode}
                    isHovered={hoveredPlayerId === slot.slotId}
                    onHover={() => setHoveredPlayerId(slot.slotId)}
                    onLeave={() => setHoveredPlayerId(null)}
                    onClick={() => setSelectedPlayer(slot.playerData)}
                  />
                ))}
              </div>
            </div>

            {/* ROW 2: YARIM HIMOYACHILAR (3 Midfielders: Salaydinov Miraziz, Xusanov Ozodbek, Qahramonov Samariddin) */}
            <div className="flex flex-col items-center my-4">
              <div className="text-[10px] sm:text-xs font-mono font-bold text-emerald-300 uppercase tracking-widest bg-slate-950/80 px-3 py-0.5 rounded-full border border-emerald-500/30 mb-3 shadow">
                Yarim Himoya (LM • CAM • RM)
              </div>
              <div className="w-full max-w-4xl flex items-center justify-between px-1 sm:px-6">
                {fullLineup.filter(p => p.gridRow === 'midfield').map((slot) => (
                  <PitchPlayerSlot
                    key={slot.slotId}
                    slot={slot}
                    viewMode={viewMode}
                    isHovered={hoveredPlayerId === slot.slotId}
                    onHover={() => setHoveredPlayerId(slot.slotId)}
                    onLeave={() => setHoveredPlayerId(null)}
                    onClick={() => setSelectedPlayer(slot.playerData)}
                  />
                ))}
              </div>
            </div>

            {/* ROW 3: HIMOYACHILAR (2 Defenders: Xayrullayev Javohir, Eshmamatov Ibrohim) */}
            <div className="flex flex-col items-center my-3">
              <div className="text-[10px] sm:text-xs font-mono font-bold text-cyan-300 uppercase tracking-widest bg-slate-950/80 px-3 py-0.5 rounded-full border border-cyan-500/30 mb-3 shadow">
                Mudofaa Chizig‘i (2 CB)
              </div>
              <div className="w-full max-w-2xl flex items-center justify-around px-2 sm:px-8">
                {fullLineup.filter(p => p.gridRow === 'defense').map((slot) => (
                  <PitchPlayerSlot
                    key={slot.slotId}
                    slot={slot}
                    viewMode={viewMode}
                    isHovered={hoveredPlayerId === slot.slotId}
                    onHover={() => setHoveredPlayerId(slot.slotId)}
                    onLeave={() => setHoveredPlayerId(null)}
                    onClick={() => setSelectedPlayer(slot.playerData)}
                  />
                ))}
              </div>
            </div>

            {/* ROW 4: DARVOZABON (1 Goalkeeper: Abdumannonov Ibrohim) */}
            <div className="flex flex-col items-center mt-2">
              <div className="text-[10px] sm:text-xs font-mono font-bold text-yellow-300 uppercase tracking-widest bg-slate-950/80 px-3 py-0.5 rounded-full border border-yellow-500/30 mb-2 shadow">
                Darvoza (1 GK)
              </div>
              <div className="flex justify-center">
                {fullLineup.filter(p => p.gridRow === 'gk').map((slot) => (
                  <PitchPlayerSlot
                    key={slot.slotId}
                    slot={slot}
                    viewMode={viewMode}
                    isHovered={hoveredPlayerId === slot.slotId}
                    onHover={() => setHoveredPlayerId(slot.slotId)}
                    onLeave={() => setHoveredPlayerId(null)}
                    onClick={() => setSelectedPlayer(slot.playerData)}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Pitch Bottom Info Ribbon */}
        <div className="relative z-20 bg-slate-950/95 border-t border-slate-800/80 px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-white">Har bir kartani bosib, futbolchining to‘liq statistikasini ko‘rishingiz mumkin.</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1.5 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
              To‘liq Kimyo (100%)
            </span>
            <span className="font-mono text-amber-400">8-D Sinf • 2025</span>
          </div>
        </div>

      </div>

      {/* Tactical Strategy & Role Descriptions Guide */}
      <div className="mt-8 rounded-3xl bg-gradient-to-b from-slate-900/90 to-[#070b14] border border-slate-800 p-5 sm:p-7 shadow-xl">
        <h3 className="text-lg sm:text-xl font-black text-white mb-4 flex items-center gap-2.5">
          <Info className="w-5 h-5 text-emerald-400" />
          1-2-3-2 Taktik Sxemasi Bo‘yicha Ko‘rsatmalar
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-2xl bg-slate-950/60 border border-amber-500/20">
            <h4 className="font-bold text-amber-400 mb-1.5 flex items-center gap-1.5">
              <Flame className="w-4 h-4" /> Hujum Juftligi (ST)
            </h4>
            <p className="text-slate-400 leading-relaxed">
              <strong className="text-slate-200">Sanoqulov Oltinbek</strong> va <strong className="text-slate-200">Xoliyorov Ibrohim</strong> oldingi chiziqda raqib himoyasiga doimiy bosim o‘tkazadi, o‘zaro uzatmalar va aniq yakunlovchi zarbalar bilan xavfli vaziyatlarni golga aylantiradi.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-emerald-500/20">
            <h4 className="font-bold text-emerald-400 mb-1.5 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> Yarim Himoya Triosi (LM-CAM-RM)
            </h4>
            <p className="text-slate-400 leading-relaxed">
              <strong className="text-slate-200">Salaydinov Miraziz</strong> chapdan, <strong className="text-slate-200">Qahramonov Samariddin</strong> o‘ngdan qanotlarni egallaydi. <strong className="text-slate-200">Xusanov Ozodbek</strong> markaziy CAM pozitsiyasida butun hujumlarni boshqaradi va assistlar taqsimlaydi.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950/60 border border-cyan-500/20">
            <h4 className="font-bold text-cyan-400 mb-1.5 flex items-center gap-1.5">
              <Shield className="w-4 h-4" /> Mudofaa va Darvoza (CB + GK)
            </h4>
            <p className="text-slate-400 leading-relaxed">
              <strong className="text-slate-200">Xayrullayev Javohir</strong> va <strong className="text-slate-200">Eshmamatov Ibrohim</strong> markaziy himoyada ishonchli devor vazifasini o‘taydi. Darvozada <strong className="text-slate-200">Abdumannonov Ibrohim</strong> posbonlik qiladi.
            </p>
          </div>
        </div>
      </div>

    </section>
  );
}

// Subcomponent: Individual Player Slot on Pitch
function PitchPlayerSlot({ slot, viewMode, isHovered, onHover, onLeave, onClick }) {
  const { formationPos, ovr, shortName, playerData, tacticalRole, signature } = slot;

  return (
    <div
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      className="group relative flex flex-col items-center cursor-pointer select-none transition-transform duration-300 hover:scale-105 sm:hover:scale-110 z-20 flex-shrink-0"
      style={{ perspective: '800px' }}
    >
      {/* View Mode: FC Mobile Card */}
      {viewMode === 'fc_mobile' ? (
        <div className="relative flex flex-col items-center">
          
          {/* Card Frame with EA FC Mobile Golden Style */}
          <div className={`relative w-[78px] h-[122px] xs:w-24 xs:h-36 sm:w-28 sm:h-40 md:w-32 md:h-44 rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 ${
            isHovered 
              ? 'shadow-[0_0_30px_rgba(255,215,0,0.9)] ring-2 ring-yellow-300 scale-105' 
              : 'shadow-[0_8px_20px_rgba(0,0,0,0.65)] hover:shadow-[0_0_20px_rgba(255,215,0,0.5)]'
          }`}>
            
            {/* Metallic Golden Border Gradient (TOTY / Ultimate Style) */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#fff2a3] via-[#f59e0b] to-[#b45309] p-[2px] sm:p-[2.5px] rounded-xl sm:rounded-2xl">
              <div className="relative w-full h-full bg-gradient-to-b from-[#1c1917] via-[#262220] to-[#0a0908] rounded-[10px] sm:rounded-[13px] overflow-hidden flex flex-col justify-between">
                
                {/* Background holographic shimmer pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-400/25 via-transparent to-black pointer-events-none" />

                {/* Decorative side shield angles */}
                <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-yellow-300/20 to-transparent pointer-events-none" />
                <div className="absolute top-0 left-0 w-8 h-8 bg-gradient-to-br from-yellow-300/20 to-transparent pointer-events-none" />

                {/* Card Top: OVR Rating + Position + Rank Gem */}
                <div className="relative z-10 pt-1 sm:pt-1.5 px-1.5 sm:px-2 flex items-start justify-between">
                  <div className="flex flex-col items-start leading-none">
                    <span className="text-sm xs:text-base sm:text-lg md:text-xl font-black text-white font-mono tracking-tighter drop-shadow-md">
                      {ovr}
                    </span>
                    <span className="text-[9px] xs:text-[10px] sm:text-xs font-black text-amber-300 font-mono tracking-tight drop-shadow">
                      {formationPos}
                    </span>
                  </div>

                  {/* Rank Diamond (FC Mobile Level 30 Rank) */}
                  <div className="flex items-center gap-0.5 bg-gradient-to-r from-blue-700 to-indigo-600 border border-blue-400/90 px-1 py-0.5 rounded text-[7px] xs:text-[8px] sm:text-[9px] font-black text-white font-mono shadow-sm">
                    <span className="text-cyan-300">◆</span>
                    <span>30</span>
                  </div>
                </div>

                {/* Player Photo Portrait */}
                <div className="relative z-0 flex-1 flex items-center justify-center overflow-hidden my-0.5 px-0.5 sm:px-1">
                  <img
                    src={playerData.photoUrl}
                    alt={playerData.name}
                    className="w-full h-full object-cover object-top rounded-md sm:rounded-lg group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />

                  {/* FC Mobile Gold Autograph / Signature accent */}
                  {signature && (
                    <div className="absolute bottom-0.5 right-1 pointer-events-none text-amber-200/90 text-[10px] sm:text-xs italic font-serif select-none drop-shadow">
                      ✍️
                    </div>
                  )}
                </div>

                {/* Card Footer: Player Name Ribbon */}
                <div className="relative z-10 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 py-0.5 sm:py-1 px-1 text-center shadow-md">
                  <span className="block text-[8px] xs:text-[9px] sm:text-[11px] font-black text-slate-950 uppercase tracking-wider font-mono truncate leading-tight">
                    {shortName}
                  </span>
                </div>

                {/* Bottom micro-bar: Uzbekistan Flag & 8-D Crest */}
                <div className="relative z-10 bg-black/95 py-0.5 px-1.5 flex items-center justify-between text-[7px] xs:text-[8px] text-slate-300 leading-none">
                  <span title="O‘zbekiston">🇺🇿</span>
                  <span className="font-mono text-amber-400 font-bold text-[8px]">8-D</span>
                </div>

              </div>
            </div>

          </div>

          {/* Under-Card FC Mobile Position Pill on the Pitch */}
          <div className="mt-1 flex flex-col items-center">
            <div className="px-2 sm:px-2.5 py-0.5 rounded-full bg-slate-950/90 border border-slate-700/80 shadow-md">
              <span className="text-[9px] sm:text-[11px] font-black text-white font-mono leading-none">
                {formationPos}
              </span>
            </div>
            {/* Green glowing position proficiency pill (100% Chemistry Bonus) */}
            <div className="mt-0.5 w-5 sm:w-6 h-1 rounded-full bg-emerald-400 shadow-[0_0_8px_#00f576]" />
          </div>

        </div>
      ) : (
        /* Tactical Whiteboard Token Mode */
        <div className="relative flex flex-col items-center">
          <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full flex flex-col items-center justify-center font-black transition-all shadow-xl border-2 ${
            formationPos === 'GK'
              ? 'bg-gradient-to-br from-yellow-500 to-amber-600 border-yellow-300 text-slate-950'
              : formationPos === 'CB'
              ? 'bg-gradient-to-br from-cyan-600 to-blue-700 border-cyan-300 text-white'
              : formationPos.includes('M')
              ? 'bg-gradient-to-br from-emerald-600 to-green-700 border-emerald-300 text-white'
              : 'bg-gradient-to-br from-rose-600 to-amber-600 border-amber-300 text-white'
          }`}>
            <span className="text-xs sm:text-sm font-mono leading-none">#{playerData.jerseyNumber}</span>
            <span className="text-[10px] sm:text-xs font-mono font-bold leading-none mt-0.5">{formationPos}</span>
          </div>

          {/* Name Plate */}
          <div className="mt-1 px-2 py-0.5 bg-slate-950/90 rounded-md border border-slate-700 text-center">
            <span className="text-[10px] sm:text-xs font-bold text-white block truncate max-w-[90px]">
              {shortName}
            </span>
          </div>
        </div>
      )}

      {/* Floating Hover Card Quick Stats Tooltip */}
      {isHovered && (
        <div className="absolute -top-16 sm:-top-20 left-1/2 -translate-x-1/2 w-48 bg-slate-950/95 border border-emerald-500/60 rounded-xl p-2.5 shadow-2xl z-50 pointer-events-none animate-in fade-in zoom-in-95 duration-150">
          <div className="text-center">
            <div className="text-xs font-bold text-white truncate">{playerData.name}</div>
            <div className="text-[10px] text-emerald-400 font-mono mt-0.5">{tacticalRole}</div>
            
            <div className="mt-1.5 pt-1.5 border-t border-slate-800 grid grid-cols-3 gap-1 text-center font-mono text-[10px]">
              <div>
                <span className="text-slate-500 block">Gol</span>
                <span className="font-bold text-emerald-400">{playerData.goals}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Assist</span>
                <span className="font-bold text-cyan-400">{playerData.assists}</span>
              </div>
              <div>
                <span className="text-slate-500 block">O‘yin</span>
                <span className="font-bold text-yellow-400">{playerData.matches}</span>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
