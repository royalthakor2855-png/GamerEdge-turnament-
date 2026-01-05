
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { User } from './types';
import Navbar from './components/Navbar';
import Home from './views/Home';
import Login from './views/Login';
import AdminGate from './views/AdminGate';
import AdminDashboard from './views/AdminDashboard';
import { ADMIN_CONFIG } from './constants';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('proarena_user');
    if (saved) {
      setUser(JSON.parse(saved));
    }
  }, []);

  const handleLogin = (newUser: User) => {
    setUser(newUser);
    localStorage.setItem('proarena_user', JSON.stringify(newUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('proarena_user');
  };

  // Helper to check if the current user is specifically the authorized admin by EMAIL
  const isStrictAdmin = (u: User | null) => {
    return u && u.email === ADMIN_CONFIG.EMAIL && u.isAdmin;
  };

  return (
    <Router>
      <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-green-500/30 selection:text-green-400">
        <Navbar user={user} onLogout={handleLogout} />
        
        <main className="pb-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route 
              path="/login" 
              element={user ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} 
            />
            
            {/* Restricted Admin Gate: Only visible if logged in with admin credentials */}
            <Route 
              path="/admin-gate" 
              element={isStrictAdmin(user) ? <AdminGate /> : <Navigate to="/login" />} 
            />

            {/* Restricted Admin Dashboard: Double verification needed */}
            <Route 
              path="/admin-dashboard" 
              element={isStrictAdmin(user) ? <AdminDashboard /> : <Navigate to="/" />} 
            />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        {/* Floating Mobile Nav */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-slate-900/90 backdrop-blur-xl border border-white/5 rounded-2xl px-6 py-4 flex items-center space-x-8 shadow-2xl shadow-black">
          <button className="flex flex-col items-center group">
            <svg className="w-5 h-5 text-green-500 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011-1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
            <span className="text-[10px] uppercase font-bold mt-1 text-slate-400 group-hover:text-white">Home</span>
          </button>
          <button className="flex flex-col items-center group">
            <svg className="w-5 h-5 text-slate-500 group-hover:text-green-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            <span className="text-[10px] uppercase font-bold mt-1 text-slate-400 group-hover:text-white">Earn</span>
          </button>
          <div className="h-8 w-[1px] bg-slate-800"></div>
          <button className="flex flex-col items-center group">
            <svg className="w-5 h-5 text-slate-500 group-hover:text-green-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span className="text-[10px] uppercase font-bold mt-1 text-slate-400 group-hover:text-white">Wallet</span>
          </button>
          <button className="flex flex-col items-center group">
            <svg className="w-5 h-5 text-slate-500 group-hover:text-green-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            <span className="text-[10px] uppercase font-bold mt-1 text-slate-400 group-hover:text-white">Me</span>
          </button>
        </div>
      </div>
    </Router>
  );
};

export default App;
