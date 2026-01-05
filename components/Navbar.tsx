
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User } from '../types';

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, onLogout }) => {
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="bg-green-500 p-1.5 rounded-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span className="font-gaming text-xl font-bold tracking-tighter bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
            PROARENA
          </span>
        </Link>

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <div className="hidden md:flex flex-col items-end">
                <span className="text-xs text-slate-400 uppercase tracking-widest">Balance</span>
                <span className="text-green-400 font-bold">₹{user.walletBalance}</span>
              </div>
              <div className="h-8 w-8 rounded-full bg-slate-700 flex items-center justify-center border border-slate-600">
                <span className="text-sm font-bold">{user.name[0]}</span>
              </div>
              <button 
                onClick={onLogout}
                className="text-sm text-slate-400 hover:text-white transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <button 
              onClick={() => navigate('/login')}
              className="bg-green-600 hover:bg-green-500 text-white px-5 py-2 rounded-full font-semibold transition-all shadow-lg shadow-green-900/20"
            >
              Login
            </button>
          )}
          
          <Link 
            to="/admin-gate" 
            className="p-2 text-slate-500 hover:text-green-400 transition-colors"
            title="Admin Dashboard"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
