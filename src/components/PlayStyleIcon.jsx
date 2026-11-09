import React from 'react';

/**
 * EA SPORTS FC MOBILE authentic SVG PlayStyle vector icons.
 * Clean, high-contrast white vector glyphs designed for diamond badges.
 */
export default function PlayStyleIcon({ styleId, className = "w-6 h-6 text-white" }) {
  switch (styleId) {
    // --- ZARBA (Shooting) ---
    case 'aniq_zarba':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <circle cx="9" cy="15" r="4" fill="currentColor" fillOpacity="0.25" />
          <path d="M9 11a4 4 0 0 0-4 4" strokeWidth="1.5" />
          <path d="M11 13l7-7" strokeWidth="2.5" />
          <path d="M15 6h3v3" strokeWidth="2.5" />
          <path d="M8 8a8 8 0 0 1 11 0" strokeDasharray="2 2" strokeWidth="1.5" />
        </svg>
      );

    case 'kuchli_zarba':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <circle cx="8" cy="14" r="4.5" fill="currentColor" fillOpacity="0.25" />
          <path d="M12.5 9.5L20 4" strokeWidth="2.8" />
          <path d="M16 4h4v4" strokeWidth="2.8" />
          <path d="M14 14l6-4" strokeWidth="2" />
          <path d="M6 8l4-4" strokeWidth="1.8" />
          <circle cx="8" cy="14" r="1.5" fill="currentColor" />
        </svg>
      );

    case 'nozik_zarba':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <circle cx="6" cy="17" r="3.5" fill="currentColor" fillOpacity="0.25" />
          <path d="M6 13.5C7 8 13 5 19 9" strokeWidth="2.5" strokeDasharray="1 1" />
          <path d="M16 7l3 2-2 3" strokeWidth="2.5" />
          <rect x="17" y="14" width="4" height="6" rx="1" strokeWidth="1.5" fill="currentColor" fillOpacity="0.15" />
        </svg>
      );

    // --- PAS BERISH (Passing) ---
    case 'tiki_taka':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          {/* Triangular cycle of 3 passing arrows */}
          <path d="M12 4l3 5H9l3-5z" fill="currentColor" fillOpacity="0.3" strokeWidth="1.5" />
          <path d="M15 10l5 7h-5l-1-4" strokeWidth="2" />
          <path d="M9 10L4 17h5l1-4" strokeWidth="2" />
          <path d="M8 17h8" strokeWidth="2.5" />
          <circle cx="12" cy="13" r="1.5" fill="currentColor" />
        </svg>
      );

    case 'uzoqqa_pas':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <circle cx="5" cy="18" r="3" fill="currentColor" fillOpacity="0.25" />
          <path d="M5 15C6 7 14 5 20 11" strokeWidth="2.5" />
          <path d="M17 11h3v-3" strokeWidth="2.5" />
          <path d="M12 18h7" strokeDasharray="2 2" strokeWidth="1.5" />
        </svg>
      );

    case 'tezkor_pas':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <circle cx="5" cy="12" r="3" fill="currentColor" fillOpacity="0.25" />
          <path d="M8 12h12" strokeWidth="3" />
          <path d="M15 7l5 5-5 5" strokeWidth="2.8" />
          <path d="M10 8l4 4-4 4" strokeWidth="1.5" opacity="0.6" />
        </svg>
      );

    case 'aniq_pas':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <circle cx="12" cy="10" r="3" fill="currentColor" fillOpacity="0.25" />
          <path d="M12 2v3m0 10v7M2 10h3m14 0h3" strokeWidth="2" />
          <path d="M12 13l5 5" strokeWidth="2.5" />
          <circle cx="17" cy="18" r="2.5" fill="currentColor" />
        </svg>
      );

    // --- TO'P NAZORATI (Ball Control) ---
    case 'fint':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
          {/* Sparkles / Flair diamonds */}
          <path d="M12 2l2.4 5.6L20 10l-5.6 2.4L12 18l-2.4-5.6L4 10l5.6-2.4L12 2z" />
          <path d="M19 16l1.2 2.8L23 20l-2.8 1.2L19 24l-1.2-2.8L15 20l2.8-1.2L19 16z" opacity="0.8" />
          <path d="M5 16l1 2.2L8.2 19l-2.2 1L5 22.2l-1-2.2L1.8 19l2.2-1L5 16z" opacity="0.7" />
        </svg>
      );

    case 'trikster':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          {/* Jester hat with bells */}
          <path d="M3 17h18l-2-6-4 3-3-8-3 8-4-3-2 6z" fill="currentColor" fillOpacity="0.25" strokeWidth="2" />
          <circle cx="3.5" cy="10.5" r="1.5" fill="currentColor" />
          <circle cx="12" cy="5.5" r="1.5" fill="currentColor" />
          <circle cx="20.5" cy="10.5" r="1.5" fill="currentColor" />
          <path d="M7 19a5 5 0 0 0 10 0" strokeWidth="2.5" />
        </svg>
      );

    case 'tezkorlik':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          {/* Running player with ball */}
          <circle cx="14" cy="5" r="2" fill="currentColor" />
          <path d="M11 9l3 3-2 5" strokeWidth="2.5" />
          <path d="M14 12l4-2-2-3-5 1" strokeWidth="2" />
          <path d="M9 13l-4 4" strokeWidth="2.5" />
          <circle cx="18" cy="18" r="2.5" fill="currentColor" />
          <path d="M2 10h4M3 14h3" strokeWidth="2" strokeDasharray="2 2" />
        </svg>
      );

    case 'texnik_mahorat':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
          {/* Zigzag technical dribble trail */}
          <path d="M6 18l5-6-4-4 7-4" strokeWidth="2.8" />
          <circle cx="14" cy="4" r="2" fill="currentColor" />
          <path d="M12 4h4v4" strokeWidth="2.5" />
          <circle cx="6" cy="18" r="2" fill="currentColor" fillOpacity="0.4" />
          <path d="M16 14l4 4-3 1" strokeWidth="2" />
        </svg>
      );

    case 'bosim_ostida_pas':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          {/* Shield protecting ball from incoming pressure */}
          <rect x="5" y="5" width="14" height="14" rx="3" strokeWidth="2" strokeDasharray="3 2" />
          <circle cx="12" cy="12" r="3" fill="currentColor" fillOpacity="0.3" />
          <path d="M12 9v6m-3-3h6" strokeWidth="2.5" />
          <path d="M12 12l6-6" strokeWidth="2.5" />
          <path d="M15 6h3v3" strokeWidth="2.5" />
        </svg>
      );

    // --- HIMOYA (Defending) ---
    case 'to_siq':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          {/* Flexing bicep muscle / Bruiser strength */}
          <path d="M6 15a4 4 0 0 0 4 4h4a3 3 0 0 0 3-3v-2a4 4 0 0 0-4-4h-2l-3-3a2 2 0 0 0-3 3l1 5z" fill="currentColor" fillOpacity="0.25" strokeWidth="2" />
          <path d="M10 11a2.5 2.5 0 0 1 4 0" strokeWidth="2.5" />
          <circle cx="14.5" cy="15" r="1.5" fill="currentColor" />
        </svg>
      );

    case 'blok':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          {/* Defensive brick wall */}
          <rect x="3" y="6" width="18" height="12" rx="2" strokeWidth="2" fill="currentColor" fillOpacity="0.2" />
          <path d="M3 12h18M9 6v6m6 0v6M9 12v6m6-12v6" strokeWidth="1.8" />
        </svg>
      );

    case 'sirpanma_top_olish':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          {/* Slide tackle kicking ball */}
          <circle cx="18" cy="9" r="3" fill="currentColor" fillOpacity="0.3" />
          <path d="M5 19l8-2 6-5" strokeWidth="3" />
          <path d="M8 18l3-6 5 1" strokeWidth="2" />
          <circle cx="6" cy="11" r="2" fill="currentColor" />
          <path d="M2 19h7" strokeWidth="2" strokeDasharray="1 1" />
        </svg>
      );

    // --- JISMONIY HOLAT (Physical) ---
    case 'tezlik':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          {/* Running shoe with speed streaks */}
          <path d="M4 16h11l4-6-4-2-4 3H4z" fill="currentColor" fillOpacity="0.25" strokeWidth="2" />
          <path d="M4 19h14a3 3 0 0 0 3-3v-1H4v4z" strokeWidth="2" />
          <path d="M2 10h4M1 13h5" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'tezkor_qadam':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          {/* Rocket boosting speed */}
          <path d="M12 2c3 3 5 8 5 12l-5 3-5-3c0-4 2-9 5-12z" fill="currentColor" fillOpacity="0.25" strokeWidth="2" />
          <circle cx="12" cy="10" r="2" fill="currentColor" />
          <path d="M7 14l-3 4 4-1" strokeWidth="2" />
          <path d="M17 14l3 4-4-1" strokeWidth="2" />
          <path d="M12 17v5" strokeWidth="2.5" strokeDasharray="1 2" />
        </svg>
      );

    case 'bardoshlik':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          {/* Battery with lightning bolt */}
          <rect x="4" y="6" width="14" height="12" rx="2" strokeWidth="2" fill="currentColor" fillOpacity="0.2" />
          <path d="M20 10v4" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M12 8l-2 4h3l-1 4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    // --- DARVOZABONLIK (Goalkeeper) ---
    case 'refleks':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          {/* Diving goalkeeper reaching for ball */}
          <circle cx="19" cy="6" r="3" fill="currentColor" fillOpacity="0.3" />
          <path d="M4 19l6-5 6-3 2-4" strokeWidth="2.5" />
          <path d="M10 14l4 4-2 3" strokeWidth="2" />
          <circle cx="5" cy="14" r="1.8" fill="currentColor" />
          <path d="M16 6h4v4" strokeWidth="1.5" />
        </svg>
      );

    case 'darvoza_posboni':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          {/* Goalkeeper spread wide defending goal */}
          <rect x="3" y="4" width="18" height="16" rx="2" strokeWidth="1.8" strokeDasharray="2 2" fill="currentColor" fillOpacity="0.1" />
          <circle cx="12" cy="8" r="2" fill="currentColor" />
          <path d="M12 10v6m0 0l-3 4m3-4l3 4" strokeWidth="2.5" />
          <path d="M7 11l5-1 5 1" strokeWidth="2.5" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
          <polygon points="12,2 22,12 12,22 2,12" fillOpacity="0.4" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
  }
}
