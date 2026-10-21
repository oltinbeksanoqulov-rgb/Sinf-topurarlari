import React from 'react';
import { FootballProvider } from './context/FootballContext';
import Header from './components/Header';
import Hero from './components/Hero';
import StatsOverview from './components/StatsOverview';
import BestPlayers from './components/BestPlayers';
import Leaderboard from './components/Leaderboard';
import TacticalFormation from './components/TacticalFormation';
import TeamSection from './components/TeamSection';
import Footer from './components/Footer';
import PlayerDetailModal from './components/PlayerDetailModal';
import AdminModal from './components/AdminModal';
import DeleteConfirmModal from './components/DeleteConfirmModal';
import Toast from './components/Toast';

function MainAppLayout() {
  return (
    <>
      {/* Navigation Bar */}
      <Header />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero />
        <StatsOverview />
        <BestPlayers />
        <Leaderboard />
        <TeamSection />
        <TacticalFormation />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <FootballProvider>
      <div className="min-h-screen bg-[#050811] text-slate-100 flex flex-col font-sans selection:bg-[#00f576] selection:text-black">
        <MainAppLayout />

        {/* Global Modals & Notifications */}
        <PlayerDetailModal />
        <AdminModal />
        <DeleteConfirmModal />
        <Toast />
      </div>
    </FootballProvider>
  );
}
