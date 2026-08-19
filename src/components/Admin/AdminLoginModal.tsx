import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Lock, Key, User, ArrowLeft, ShieldCheck, Check, Crown } from 'lucide-react';

export const AdminLoginModal: React.FC = () => {
  const { loginAdmin, setIsAdminOpen, ownerAccounts } = useStore();

  const [username, setUsername] = useState('patloon');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!username.trim() || !password.trim()) {
      setError('Please enter both username and password.');
      return;
    }

    const success = loginAdmin(username, password);
    if (!success) {
      setError('Invalid credentials. Root Admin username is patloon.');
    }
  };

  const handleQuickFill = (u: string, p: string) => {
    setUsername(u);
    setPassword(p);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F5F5] flex items-center justify-center p-4 selection:bg-[#F5F5F5] selection:text-black">
      <div className="w-full max-w-md bg-[#0C0C0C] border border-[#242424] shadow-2xl p-8 sm:p-10 relative overflow-hidden">
        {/* Top ambient badge */}
        <div className="flex items-center justify-between pb-6 border-b border-[#1F1F1F] mb-6">
          <button
            onClick={() => setIsAdminOpen(false)}
            className="flex items-center space-x-2 text-[10px] font-mono text-[#888888] hover:text-[#F5F5F5] uppercase tracking-widest transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Storefront</span>
          </button>
          <div className="flex items-center space-x-1.5 px-2.5 py-1 bg-[#141414] border border-[#242424] text-[9px] font-mono text-[#A1A1A1] uppercase tracking-widest">
            <ShieldCheck className="w-3 h-3 text-green-400" />
            <span>Root Admin Portal</span>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-[#141414] border border-[#242424] mx-auto flex items-center justify-center mb-4">
            <Lock className="w-5 h-5 text-[#F5F5F5]" />
          </div>
          <h2 className="font-heading font-black text-2xl uppercase tracking-wider text-[#F5F5F5]">
            ADMIN AUTHENTICATION
          </h2>
          <p className="text-xs font-mono text-[#777777] uppercase tracking-widest mt-1">
            THE PATLOON • PROTECTED ATELIER PORTAL
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
          {error && (
            <div className="p-3 bg-red-950/40 border border-red-800/80 text-red-300 text-[11px] leading-relaxed">
              {error}
            </div>
          )}

          <div>
            <label className="block text-[10px] text-[#888888] uppercase tracking-wider mb-1.5">
              Admin Username
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-[#555555] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. patloon"
                autoComplete="username"
                className="w-full bg-[#141414] border border-[#242424] pl-9 pr-3 py-3 text-[#F5F5F5] placeholder-[#444444] focus:outline-none focus:border-[#666666] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] text-[#888888] uppercase tracking-wider mb-1.5">
              Admin Password
            </label>
            <div className="relative">
              <Key className="w-4 h-4 text-[#555555] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password (xyzxyzxyz)"
                autoComplete="current-password"
                className="w-full bg-[#141414] border border-[#242424] pl-9 pr-3 py-3 text-[#F5F5F5] placeholder-[#444444] focus:outline-none focus:border-[#666666] transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 mt-2 bg-[#F5F5F5] hover:bg-white text-black font-bold uppercase tracking-widest transition-all cursor-pointer shadow-lg shadow-white/5 flex items-center justify-center space-x-2"
          >
            <span>ENTER ADMIN DASHBOARD</span>
            <Check className="w-4 h-4" />
          </button>
        </form>

        {/* Master Credentials Info Box */}
        <div className="mt-8 pt-6 border-t border-[#1F1F1F] font-mono">
          <p className="text-[10px] text-[#888888] uppercase tracking-widest mb-3 flex items-center justify-between">
            <span>MASTER ROOT CREDENTIALS:</span>
            <span className="text-[#E5C158] flex items-center space-x-1">
              <Crown className="w-3 h-3" />
              <span>PROTECTED</span>
            </span>
          </p>

          <div className="space-y-2">
            {ownerAccounts.map((acc) => {
              const isRoot = acc.username.toLowerCase() === 'patloon';
              return (
                <button
                  key={acc.id}
                  type="button"
                  onClick={() => handleQuickFill(acc.username, acc.password)}
                  className={`w-full p-3 border flex items-center justify-between text-left transition-colors cursor-pointer group ${
                    isRoot
                      ? 'bg-[#141510] border-[#383318] hover:border-[#E5C158]'
                      : 'bg-[#121212] border-[#242424] hover:border-[#383838]'
                  }`}
                >
                  <div>
                    <div className="flex items-center space-x-2">
                      <p className="text-xs font-bold text-[#F5F5F5] group-hover:text-white">
                        {acc.name}
                      </p>
                      {isRoot && (
                        <span className="text-[8px] px-1.5 py-0.2 bg-[#E5C158]/20 text-[#E5C158] border border-[#E5C158]/50 uppercase font-bold">
                          Root Admin
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-[#777777] mt-0.5">
                      Username: <span className="text-white font-bold">{acc.username}</span> • Password:{' '}
                      <span className="text-[#E5C158] font-bold">{acc.password}</span>
                    </p>
                  </div>
                  <span className="text-[9px] px-2 py-1 bg-[#1A1A1A] border border-[#282828] text-[#888888] group-hover:text-white uppercase">
                    Auto-Fill
                  </span>
                </button>
              );
            })}
          </div>

          <p className="text-[9px] text-[#555555] text-center mt-4">
            Only the authenticated master user (@patloon) can edit root store settings and manage owner credentials.
          </p>
        </div>
      </div>
    </div>
  );
};
