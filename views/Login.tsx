
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ADMIN_CONFIG } from '../constants';
import { User } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [mobile, setMobile] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = () => {
    if (mobile.length !== 10) return;
    setIsLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setOtpSent(true);
      setIsLoading(false);
    }, 1000);
  };

  const handleVerify = () => {
    setIsLoading(true);
    setTimeout(() => {
      const isAdmin = mobile === ADMIN_CONFIG.MOBILE;
      const user: User = {
        phone: mobile,
        // Only attach the admin email if the mobile matches the admin mobile
        email: isAdmin ? ADMIN_CONFIG.EMAIL : undefined,
        name: isAdmin ? 'Admin Master' : `Player_${mobile.slice(-4)}`,
        isAdmin: isAdmin,
        walletBalance: isAdmin ? 99999 : 100,
      };
      onLogin(user);
      navigate('/');
    }, 1000);
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-500 rounded-2xl mx-auto flex items-center justify-center mb-4 transform -rotate-6 shadow-xl shadow-green-900/20">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A10.003 10.003 0 0012 21a10.003 10.003 0 008.384-4.51l.054.09m-4.289-8.33L17 4.162M11 6.64l-1-1.789m0 0L7 4.162M7 4.162L4.289 8.33M7 4.162L11 6.64m10 4.69V21a10 10 0 01-10 10H3.86a2 2 0 01-1.96-2.45l.49-2.449A10 10 0 0110 3.86h11z" />
            </svg>
          </div>
          <h2 className="font-gaming text-2xl font-bold">WELCOME BACK</h2>
          <p className="text-slate-400 text-sm mt-1">Ready for your next victory?</p>
        </div>

        <div className="space-y-6">
          {!otpSent ? (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1 ml-1">Mobile Number</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">+91</span>
                  <input 
                    type="tel"
                    maxLength={10}
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                    placeholder="9876543210"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-14 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all font-bold tracking-widest"
                  />
                </div>
              </div>
              <button 
                onClick={handleSendOtp}
                disabled={mobile.length !== 10 || isLoading}
                className="w-full py-3 bg-green-600 hover:bg-green-500 disabled:bg-slate-800 disabled:text-slate-600 text-white rounded-xl font-bold transition-all shadow-lg shadow-green-900/20"
              >
                {isLoading ? 'Sending...' : 'Get OTP'}
              </button>
            </>
          ) : (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1 ml-1">Enter OTP</label>
                <input 
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  placeholder="000000"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all text-center text-2xl tracking-[0.5em] font-bold"
                />
                <button 
                  onClick={() => setOtpSent(false)}
                  className="text-[10px] text-slate-500 mt-2 hover:text-white uppercase font-bold tracking-widest"
                >
                  Change Number
                </button>
              </div>
              <button 
                onClick={handleVerify}
                disabled={otp.length < 4 || isLoading}
                className="w-full py-3 bg-green-600 hover:bg-green-500 disabled:bg-slate-800 disabled:text-slate-600 text-white rounded-xl font-bold transition-all shadow-lg shadow-green-900/20"
              >
                {isLoading ? 'Verifying...' : 'Login Now'}
              </button>
            </>
          )}

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-800"></div></div>
            <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-[0.2em]"><span className="bg-slate-900 px-2 text-slate-500">Secure Protocol</span></div>
          </div>
          
          <p className="text-center text-xs text-slate-500 leading-relaxed">
            By logging in, you agree to our <span className="text-slate-300">Terms of Service</span> and <span className="text-slate-300">Fair Play Policy</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
