import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Crown, 
  Search, 
  Menu, 
  X, 
  ShieldCheck, 
  Lock, 
  Flame, 
  Users,
  Gamepad2,
  Cloud,
  RefreshCw
} from 'lucide-react';
import { useFootball } from '../context/FootballContext';

export default function Header() {
  const { 
    searchQuery, 
    setSearchQuery, 
    setLeaderboardTab, 
    isAdmin, 
    setIsAdminModalOpen,
    cloudSyncStatus,
    refreshFromCloud
  } = useFootball();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId, tab = null) => {
    setIsMobileMenuOpen(false);
    if (tab) {
      setLeaderboardTab(tab);
    }
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#050812]/95 backdrop-blur-md border-b border-cyan-500/20 shadow-[0_4px_30px_rgba(0,0,0,0.8)]' 
          : 'bg-[#050812]/80 backdrop-blur-sm border-b border-slate-800/80'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2">
          
          {/* Logo with Official Crest */}
          <a 
            href="#hero" 
            className="flex items-center gap-2 sm:gap-3 group cursor-pointer min-w-0 max-w-[60%] sm:max-w-none"
            onClick={(e) => { e.preventDefault(); handleNavClick('hero'); }}
          >
            <div className="relative group-hover:scale-105 transition-all duration-300 flex-shrink-0">
              <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl overflow-hidden border border-emerald-400/50 shadow-[0_0_15px_rgba(0,245,118,0.25)] group-hover:shadow-[0_0_25px_rgba(0,245,118,0.5)] group-hover:border-emerald-300 transition-all bg-[#050811] flex items-center justify-center p-0.5">
                <img 
                  src="/logo.jpg" 
                  alt="Sinifimiz To'p Urarlari Logo" 
                  className="w-full h-full object-cover rounded-lg sm:rounded-xl"
                />
              </div>
            </div>
            
            <div className="flex flex-col min-w-0 justify-center">
              <span className="text-sm sm:text-xl lg:text-2xl font-black tracking-tight text-white whitespace-nowrap truncate">
                Sinifimiz <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-green-400">To‘p Urarlari</span>
              </span>
              <span className="hidden xs:flex text-[9px] sm:text-[11px] font-medium tracking-wider uppercase text-slate-400 items-center gap-1 truncate">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping flex-shrink-0"></span>
                <span className="truncate">8-D Sinf Rasmiy Statistikasi</span>
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <button
              onClick={() => handleNavClick('hero')}
              className="px-3.5 py-2 text-sm font-medium text-slate-300 hover:text-white rounded-lg hover:bg-slate-800/60 transition-colors"
            >
              Bosh sahifa
            </button>
            <button
              onClick={() => handleNavClick('leaderboard', 'goals')}
              className="px-3.5 py-2 text-sm font-medium text-slate-300 hover:text-emerald-400 rounded-lg hover:bg-slate-800/60 transition-colors flex items-center gap-1.5"
            >
              <Flame className="w-4 h-4 text-emerald-400" />
              To‘purarlar
            </button>
            <button
              onClick={() => handleNavClick('leaderboard', 'assists')}
              className="px-3.5 py-2 text-sm font-medium text-slate-300 hover:text-emerald-400 rounded-lg hover:bg-slate-800/60 transition-colors"
            >
              Assistlar
            </button>
            <button
              onClick={() => handleNavClick('leaderboard', 'matches')}
              className="px-3.5 py-2 text-sm font-medium text-slate-300 hover:text-emerald-400 rounded-lg hover:bg-slate-800/60 transition-colors"
            >
              O‘yinlar
            </button>
            <button
              onClick={() => handleNavClick('formation')}
              className="px-3.5 py-2 text-sm font-medium text-slate-300 hover:text-amber-300 rounded-lg hover:bg-slate-800/60 transition-colors flex items-center gap-1.5"
            >
              <Gamepad2 className="w-4 h-4 text-amber-400" />
              Taktika (1-3-3-2)
            </button>
            <button
              onClick={() => handleNavClick('team')}
              className="px-3.5 py-2 text-sm font-medium text-slate-300 hover:text-white rounded-lg hover:bg-slate-800/60 transition-colors flex items-center gap-1.5"
            >
              <Users className="w-4 h-4 text-slate-400" />
              Jamoamiz
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
            {/* Cloud Live Sync Indicator */}
            <button
              onClick={refreshFromCloud}
              title="Bulutli sinxronizatsiya: barcha o'quvchilar va telefonlarda bir xil hisob turadi. Bosilsa yangilanadi."
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900/80 border border-slate-700/70 text-[11px] font-medium text-slate-300 hover:text-white hover:border-emerald-500/50 transition-all cursor-pointer shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                {cloudSyncStatus === 'syncing' ? (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                ) : cloudSyncStatus === 'connected' ? (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                ) : null}
                <span className={`relative inline-flex rounded-full h-2 w-2 ${
                  cloudSyncStatus === 'syncing' ? 'bg-amber-400' :
                  cloudSyncStatus === 'connected' ? 'bg-emerald-400' :
                  cloudSyncStatus === 'connecting' ? 'bg-cyan-400' :
                  cloudSyncStatus === 'unconfigured' ? 'bg-amber-500' : 'bg-rose-500'
                }`}></span>
              </span>
              <span className="hidden sm:inline font-mono text-[11px]">
                {cloudSyncStatus === 'syncing' ? 'Sinxron...' :
                 cloudSyncStatus === 'connected' ? 'Supabase Jonli' :
                 cloudSyncStatus === 'connecting' ? 'Ulanmoqda...' :
                 cloudSyncStatus === 'unconfigured' ? 'Supabase .env kutilmoqda' : 'Oflayn'}
              </span>
              <RefreshCw className={`w-3 h-3 text-slate-400 ${cloudSyncStatus === 'syncing' ? 'animate-spin text-amber-400' : ''}`} />
            </button>

            {/* Search Toggle */}
            <div className="relative">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={`p-2 sm:p-2.5 rounded-xl border transition-all ${
                  isSearchOpen
                    ? 'bg-emerald-500/10 border-emerald-400 text-emerald-400'
                    : 'bg-slate-900/80 border-slate-700/70 text-slate-300 hover:text-white hover:border-slate-600'
                }`}
                title="Futbolchilarni qidirish"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Quick Search Popover */}
              {isSearchOpen && (
                <div className="fixed sm:absolute top-16 sm:top-full left-3 right-3 sm:left-auto sm:right-0 sm:w-80 p-3 bg-slate-900 border border-emerald-500/40 rounded-2xl shadow-2xl z-50">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Futbolchi ismi yoki ampluasi..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-8 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
                    />
                    {searchQuery && (
                      <button 
                        onClick={() => setSearchQuery('')}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <div className="mt-2 text-[11px] text-slate-400 flex justify-between items-center px-1">
                    <span>Reyting bo‘yicha filtr</span>
                    <button 
                      onClick={() => {
                        handleNavClick('leaderboard');
                        setIsSearchOpen(false);
                      }}
                      className="text-emerald-400 hover:underline"
                    >
                      Jadvalga o'tish →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Admin Login Button */}
            <button
              onClick={() => setIsAdminModalOpen(true)}
              className={`flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
                isAdmin
                  ? 'bg-emerald-500/15 border-emerald-400 text-emerald-300 shadow-[0_0_15px_rgba(0,245,118,0.2)]'
                  : 'bg-slate-900/90 border-slate-700/70 text-slate-200 hover:border-emerald-500/50 hover:text-white'
              }`}
            >
              {isAdmin ? (
                <>
                  <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
                  <span className="hidden sm:inline">Boshqaruv (Admin)</span>
                  <span className="sm:hidden">Admin</span>
                </>
              ) : (
                <>
                  <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-slate-400" />
                  <span>Kirish</span>
                </>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 sm:p-2.5 rounded-xl bg-slate-900/80 border border-slate-700/70 text-slate-300 hover:text-white"
              aria-label="Menyu"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-800/80 bg-slate-950/95 backdrop-blur-xl animate-in slide-in-from-top-4 duration-200">
            <div className="flex flex-col space-y-1">
              <button
                onClick={() => handleNavClick('hero')}
                className="flex items-center px-4 py-3 rounded-xl text-sm font-medium text-slate-200 hover:bg-slate-900 hover:text-white"
              >
                Bosh sahifa
              </button>
              <button
                onClick={() => handleNavClick('leaderboard', 'goals')}
                className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-emerald-400 hover:bg-slate-900"
              >
                <span className="flex items-center gap-2">
                  <Flame className="w-4 h-4" />
                  To‘purarlar reytingi
                </span>
                <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-mono">Gollar</span>
              </button>
              <button
                onClick={() => handleNavClick('leaderboard', 'assists')}
                className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-slate-200 hover:bg-slate-900 hover:text-emerald-400"
              >
                <span>Assistlar reytingi</span>
                <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full font-mono">Paslar</span>
              </button>
              <button
                onClick={() => handleNavClick('leaderboard', 'matches')}
                className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-slate-200 hover:bg-slate-900 hover:text-teal-400"
              >
                <span>O‘yinlar reytingi</span>
                <span className="text-xs bg-teal-500/20 text-teal-400 px-2 py-0.5 rounded-full font-mono">Uchrashuv</span>
              </button>
              <button
                onClick={() => handleNavClick('formation')}
                className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-amber-300 hover:bg-slate-900"
              >
                <span className="flex items-center gap-2">
                  <Gamepad2 className="w-4 h-4 text-amber-400" />
                  Taktik Sxema (1-3-3-2)
                </span>
                <span className="text-xs bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full font-mono">FC Mobile</span>
              </button>
              <button
                onClick={() => handleNavClick('team')}
                className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-slate-200 hover:bg-slate-900 hover:text-white"
              >
                <Users className="w-4 h-4 text-slate-400" />
                Bizning Jamoamiz
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
