
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ADMIN_CONFIG } from '../constants';
import { User } from '../types';

const AdminGate: React.FC = () => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const navigate = useNavigate();

  // Redundant check: if somehow a user gets here without being the strict admin email
  useEffect(() => {
    const saved = localStorage.getItem('proarena_user');
    if (!saved) {
      navigate('/login');
      return;
    }
    const user: User = JSON.parse(saved);
    if (user.email !== ADMIN_CONFIG.EMAIL) {
      navigate('/');
    }
  }, [navigate]);

  const handleVerify = () => {
    setIsVerifying(true);
    setError('');
    
    // Mimic processing/fingerprint scan delay with higher security feel
    setTimeout(() => {
      if (pin === ADMIN_CONFIG.SECRET_PIN) {
        navigate('/admin-dashboard');
      } else {
        setError('CRITICAL ERROR: IDENTITY VERIFICATION FAILED.');
        setIsVerifying(false);
      }
    }, 1800);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden ring-1 ring-white/5">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent animate-pulse"></div>
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-slate-950 border-2 border-slate-800 mb-6 group cursor-pointer relative shadow-inner">
             {isVerifying ? (
               <>
                 <div className="absolute inset-0 rounded-full border-2 border-green-500 animate-ping opacity-20"></div>
                 <div className="absolute inset-2 rounded-full border-4 border-green-500 border-t-transparent animate-spin"></div>
               </>
             ) : (
               <div className="absolute inset-0 rounded-full bg-green-500/5 group-active:bg-green-500/20 transition-colors"></div>
             )}
             <svg className={`w-12 h-12 ${isVerifying ? 'text-green-400' : 'text-slate-600'} transition-colors duration-500`} fill="currentColor" viewBox="0 0 20 20">
               <path fillRule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clipRule="evenodd" />
             </svg>
          </div>
          <h2 className="font-gaming text-2xl font-black mb-2 tracking-tighter">RESTRICTED ZONE</h2>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest leading-relaxed">
            Only Haresh Thakor ({ADMIN_CONFIG.EMAIL}) can access this dashboard.<br/>
            System lockdown active.
          </p>
        </div>

        <div className="space-y-6">
          <div className="relative group">
            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-2 ml-1">Identity Fingerprint Key</label>
            <input 
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="•••••••"
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-4 focus:outline-none focus:border-green-500 transition-all text-center tracking-[0.8em] text-2xl font-bold placeholder:tracking-normal placeholder:font-normal placeholder:text-slate-800 shadow-inner"
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
              <p className="text-red-500 text-[10px] text-center font-black uppercase tracking-widest">{error}</p>
            </div>
          )}

          <button 
            onClick={handleVerify}
            disabled={isVerifying || !pin}
            className={`w-full py-4 rounded-2xl font-black tracking-[0.2em] uppercase text-sm transition-all duration-500 ${
              isVerifying ? 'bg-slate-800 text-slate-600' : 'bg-green-600 hover:bg-green-500 text-white shadow-xl shadow-green-900/30 active:scale-95'
            }`}
          >
            {isVerifying ? 'Scanning Biometrics...' : 'Unlock Dashboard'}
          </button>

          <div className="pt-4 border-t border-slate-800/50">
            <p className="text-[9px] text-slate-600 text-center uppercase font-bold tracking-tighter">
              Authorized Identity: {ADMIN_CONFIG.EMAIL}<br/>
              Status: Verified Session
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminGate;
