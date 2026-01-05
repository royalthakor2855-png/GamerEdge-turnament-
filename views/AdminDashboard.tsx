
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_TOURNAMENTS, ADMIN_CONFIG } from '../constants';
import { Tournament, User } from '../types';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [tournaments, setTournaments] = useState<Tournament[]>(MOCK_TOURNAMENTS);
  const [isAdding, setIsAdding] = useState(false);

  // Strict check on mount to ensure only the real admin is here
  useEffect(() => {
    const saved = localStorage.getItem('proarena_user');
    if (!saved) {
      navigate('/login');
      return;
    }
    const user: User = JSON.parse(saved);
    // Strict email check
    if (user.email !== ADMIN_CONFIG.EMAIL || !user.isAdmin) {
      navigate('/');
    }
  }, [navigate]);

  const stats = [
    { label: 'Total Matches', value: tournaments.length },
    { label: 'Live Players', value: tournaments.reduce((acc, t) => acc + t.currentPlayers, 0) },
    { label: 'Revenue (Today)', value: '₹4,250' },
    { label: 'Pending Payouts', value: '₹12,800' }
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="font-gaming text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
            Admin Control Center
          </h1>
          <p className="text-slate-400">Exclusive access for: {ADMIN_CONFIG.EMAIL}</p>
        </div>
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-green-600 hover:bg-green-500 text-white px-6 py-2.5 rounded-xl font-bold flex items-center justify-center space-x-2 transition-all shadow-lg shadow-green-900/20"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span>Create Tournament</span>
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <div key={i} className="bg-slate-900 border border-slate-800 p-4 rounded-2xl">
            <p className="text-slate-500 text-xs font-semibold uppercase tracking-widest mb-1">{stat.label}</p>
            <p className="text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="px-6 py-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
          <h3 className="font-gaming font-bold text-lg flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Active Tournaments
          </h3>
          <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest bg-slate-950 px-2 py-1 rounded">System Live</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-950 text-slate-500 text-xs uppercase font-bold">
              <tr>
                <th className="px-6 py-4">Tournament</th>
                <th className="px-6 py-4">Game</th>
                <th className="px-6 py-4">Entry / Prize</th>
                <th className="px-6 py-4">Players</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {tournaments.map((t) => (
                <tr key={t.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 font-semibold">{t.title}</td>
                  <td className="px-6 py-4">
                    <span className="bg-slate-800 px-2 py-1 rounded text-[10px] font-bold uppercase">{t.game}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-green-400 text-xs font-bold">Entry: ₹{t.entryFee}</span>
                      <span className="text-slate-400 text-[10px]">Prize: ₹{t.prizePool}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-mono">{t.currentPlayers} / {t.maxPlayers}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-widest border ${
                      t.status === 'Upcoming' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-green-500/10 text-green-400 border-green-500/20'
                    }`}>
                      {t.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-3">
                      <button className="text-slate-500 hover:text-white transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                      </button>
                      <button className="text-red-900/50 hover:text-red-500 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
