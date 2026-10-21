import React from 'react';
import { Trophy, Crown, Heart, ArrowUp } from 'lucide-react';
import { useFootball } from '../context/FootballContext';

export default function Footer() {
  const { setLeaderboardTab } = useFootball();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavClick = (sectionId, tab = null) => {
    if (tab) setLeaderboardTab(tab);
    const elem = document.getElementById(sectionId);
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#04060d] border-t border-slate-800/80 pt-16 pb-12 overflow-hidden text-slate-400">
      
      {/* Background radial accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-emerald-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand & Slogan */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden border border-emerald-500/40 shadow-[0_0_15px_rgba(0,245,118,0.25)] bg-slate-950 p-0.5 flex-shrink-0">
                <img 
                  src="/logo.jpg" 
                  alt="Sinifimiz To'p Urarlari Logo" 
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <span className="text-xl font-black text-white">
                Sinifimiz <span className="text-emerald-400">To‘p Urarlari</span>
              </span>
            </div>

            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Maktabimizning 8-D sinf futbol jamoasi rasmiy statistik portali. 
              Gollar, assistlar, natijalar va yangiliklar bir maydonda jamlangan!
            </p>

            {/* Slogan Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/30 text-emerald-300 text-xs font-bold tracking-wide">
              <span>⚽</span>
              <span className="italic">“Futbol — bu bizning hayotimiz!”</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
              Bo‘limlar
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => handleNavClick('hero')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Bosh sahifa
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('leaderboard', 'goals')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  To‘purarlar reytingi
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('leaderboard', 'assists')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Assistlar reytingi
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('leaderboard', 'matches')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  O‘yinlar reytingi
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('team')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Bizning jamoamiz
                </button>
              </li>
            </ul>
          </div>

          {/* Social Links & Back to Top */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
              Biz Ijtimoiy Tarmoqlarda
            </h4>
            <div className="flex items-center gap-3">
              {/* Instagram */}
              <a
                href="#instagram"
                onClick={(e) => e.preventDefault()}
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 hover:border-pink-500 hover:text-pink-400 hover:bg-pink-500/10 flex items-center justify-center transition-all text-slate-300 shadow-md group"
                title="Instagram"
                aria-label="Instagram"
              >
                <svg
                  className="w-5 h-5 transition-transform group-hover:scale-110"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>

              {/* Telegram */}
              <a
                href="#telegram"
                onClick={(e) => e.preventDefault()}
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 hover:border-sky-400 hover:text-sky-400 hover:bg-sky-500/10 flex items-center justify-center transition-all text-slate-300 shadow-md group"
                title="Telegram"
                aria-label="Telegram"
              >
                <svg
                  className="w-5 h-5 transition-transform group-hover:scale-110"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m22 2-7 20-4-9-9-4Z" />
                  <path d="M22 2 11 13" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="#facebook"
                onClick={(e) => e.preventDefault()}
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-500 hover:text-blue-400 hover:bg-blue-500/10 flex items-center justify-center transition-all text-slate-300 shadow-md group"
                title="Facebook"
                aria-label="Facebook"
              >
                <svg
                  className="w-5 h-5 transition-transform group-hover:scale-110"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            </div>

            <div className="pt-2">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white px-3 py-2 rounded-lg bg-slate-900/60 border border-slate-800 transition-all hover:border-slate-700"
              >
                <ArrowUp className="w-3.5 h-3.5" />
                <span>Yuqoriga qaytish</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} Sinifimiz To‘p Urarlari. Barcha huquqlar himoyalangan.</p>
          <p className="flex items-center gap-1 text-slate-400">
            8-D Sinf o‘quvchilari uchun mehr bilan tayyorlandi <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
          </p>
        </div>

      </div>
    </footer>
  );
}
