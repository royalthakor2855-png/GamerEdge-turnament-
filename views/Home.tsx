
import React, { useEffect, useState, useMemo } from 'react';
import { MOCK_TOURNAMENTS } from '../constants';
import { Tournament } from '../types';
import { generateTournamentHype } from '../services/geminiService';

const Home: React.FC = () => {
  const [hypes, setHypes] = useState<Record<string, string>>({});
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Extract unique games for the filter bar
  const categories = useMemo(() => {
    const games = MOCK_TOURNAMENTS.map(t => t.displayGame || t.game);
    return ['All', ...Array.from(new Set(games))].slice(0, 12); // Limit visible tabs
  }, []);

  const filteredTournaments = useMemo(() => {
    if (selectedCategory === 'All') return MOCK_TOURNAMENTS;
    return MOCK_TOURNAMENTS.filter(t => (t.displayGame || t.game) === selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    // Generate AI hype messages for the top visible tournaments
    const visibleOnes = filteredTournaments.slice(0, 3);
    visibleOnes.forEach(async (t) => {
      if (!hypes[t.id]) {
        const hype = await generateTournamentHype(t.displayGame || t.game, t.title);
        setHypes(prev => ({ ...prev, [t.id]: hype }));
      }
    });
  }, [filteredTournaments]);

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      {/* Hero Section */}
      <section className="mb-12 relative rounded-[2rem] overflow-hidden bg-slate-900 border border-slate-800 p-8 md:p-16 shadow-2xl">
        <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200" 
            alt="Gaming Hero" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-2xl">
          <div className="inline-block bg-green-500/10 border border-green-500/20 px-3 py-1 rounded-full text-green-400 text-[10px] font-black uppercase tracking-[0.2em] mb-4">
            New: 50+ Games Now Available
          </div>
          <h1 className="font-gaming text-4xl md:text-6xl font-black mb-6 leading-tight">
            THE WORLD'S <br/>
            <span className="text-green-400">BIGGEST ARENA.</span>
          </h1>
          <p className="text-lg text-slate-400 mb-8 leading-relaxed">
            Join thousands of players across 50+ competitive titles. From <span className="text-white font-bold">Free Fire</span> to <span className="text-white font-bold">Ludo King</span>, we have a tournament for every skill.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-green-600 hover:bg-green-500 text-white px-8 py-4 rounded-2xl font-black text-lg shadow-xl shadow-green-900/30 transition-all active:scale-95">
              JOIN NOW
            </button>
            <button className="bg-slate-800/50 backdrop-blur-sm hover:bg-slate-700 text-white px-8 py-4 rounded-2xl font-black text-lg border border-slate-700 transition-all">
              TUTORIAL
            </button>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-6 scrollbar-hide no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`whitespace-nowrap px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all border ${
              selectedCategory === cat 
                ? 'bg-green-600 border-green-500 text-white shadow-lg shadow-green-900/20' 
                : 'bg-slate-900 border-slate-800 text-slate-500 hover:text-white hover:border-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
        {categories.length >= 12 && <span className="text-slate-700 font-bold px-4">...</span>}
      </div>

      {/* Tournament Grid */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <div className="flex flex-col">
            <h2 className="font-gaming text-2xl font-black flex items-center space-x-3">
              <span className="w-10 h-1.5 bg-green-500 rounded-full"></span>
              <span>LIVE TOURNAMENTS</span>
            </h2>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1 ml-13">Showing {filteredTournaments.length} matches</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTournaments.map((t) => (
            <div key={t.id} className="bg-slate-900/40 backdrop-blur-sm border border-slate-800/50 rounded-3xl p-6 hover:border-green-500/40 transition-all group flex flex-col h-full ring-1 ring-white/5 shadow-xl">
              <div className="flex justify-between items-start mb-6">
                <div className="bg-slate-950 text-green-400 text-[9px] font-black px-3 py-1.5 rounded-lg border border-slate-800 uppercase tracking-[0.15em] shadow-inner">
                  {t.displayGame || t.game}
                </div>
                <div className="flex items-center text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse mr-2"></div>
                  JOINING SOON
                </div>
              </div>
              
              <h3 className="font-gaming text-xl font-black mb-3 group-hover:text-green-400 transition-colors leading-tight">
                {t.title}
              </h3>
              
              <p className="text-slate-500 text-xs leading-relaxed mb-6 italic opacity-80">
                "{hypes[t.id] || "Analyzing combat strategies for peak performance. Glory awaits the victors in this arena."}"
              </p>

              <div className="mt-auto space-y-6">
                <div className="bg-slate-950/80 rounded-2xl p-4 border border-slate-800/50 grid grid-cols-2 gap-4">
                  <div className="flex flex-col border-r border-slate-800/50">
                    <span className="text-slate-500 text-[9px] uppercase font-black tracking-widest mb-1">Prize Pool</span>
                    <span className="text-green-400 font-gaming font-bold text-lg leading-none">₹{t.prizePool}</span>
                  </div>
                  <div className="flex flex-col pl-2">
                    <span className="text-slate-500 text-[9px] uppercase font-black tracking-widest mb-1">Entry Fee</span>
                    <span className="text-white font-gaming font-bold text-lg leading-none">{t.entryFee === 0 ? 'FREE' : `₹${t.entryFee}`}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                    <div className="flex items-center text-slate-300">
                      <svg className="w-3.5 h-3.5 mr-1.5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      {t.currentPlayers} / {t.maxPlayers} SLOTS
                    </div>
                    <div className="text-slate-500">{t.mode} • {t.map}</div>
                  </div>

                  <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden shadow-inner">
                    <div 
                      className="bg-gradient-to-r from-green-600 to-emerald-400 h-full rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${(t.currentPlayers / t.maxPlayers) * 100}%` }}
                    ></div>
                  </div>
                </div>

                <button 
                  disabled={t.currentPlayers >= t.maxPlayers}
                  className={`w-full py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all ${
                    t.currentPlayers >= t.maxPlayers 
                    ? 'bg-slate-800/50 text-slate-600 cursor-not-allowed border border-slate-700' 
                    : 'bg-green-600 hover:bg-green-500 text-white shadow-xl shadow-green-900/20 active:scale-95'
                  }`}
                >
                  {t.currentPlayers >= t.maxPlayers ? 'ARENA FULL' : 'ENTER BATTLE'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="mt-20 py-12 border-t border-slate-800/50 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="text-center">
          <p className="text-3xl font-gaming font-bold text-white mb-1">50+</p>
          <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Active Games</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-gaming font-bold text-green-400 mb-1">₹50K+</p>
          <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Daily Prizes</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-gaming font-bold text-white mb-1">100K+</p>
          <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Pro Players</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-gaming font-bold text-green-400 mb-1">24/7</p>
          <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Support Live</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
