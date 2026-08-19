import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { CheckCircle2, MapPin, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveCategory, setActiveGenderFilter, showToast, setIsAdminOpen } = useStore();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    showToast('Welcome to THE PATLOON VIP Atelier.');
  };

  const handleNav = (gender: 'ALL' | 'MEN' | 'WOMEN' | 'UNISEX', cat: any = 'ALL') => {
    setActiveGenderFilter(gender);
    setActiveCategory(cat);
    const el = document.getElementById('shop-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-[#050505] border-t border-[#242424] text-[#A1A1A1] text-xs font-mono">
      {/* Top VIP Newsletter Section */}
      <div className="border-b border-[#242424] py-14 px-4 sm:px-8 lg:px-10">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-xl space-y-2">
            <span className="text-[10px] tracking-[0.4em] text-[#666666] uppercase">
              EXCLUSIVE ACCESS // ATELIER CIRCLE
            </span>
            <h3 className="font-heading font-black text-2xl sm:text-3xl text-[#F5F5F5] uppercase tracking-tight">
              JOIN THE PATLOON ATELIER
            </h3>
            <p className="text-xs text-[#888888] font-light">
              Receive private invitations to confidential runway drops, bespoke tailoring allocations, and private capsule previews.
            </p>
          </div>

          <div className="w-full max-w-md">
            {subscribed ? (
              <div className="p-4 bg-[#0A0A0A] border border-[#242424] text-green-400 flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4" />
                <span className="text-[11px] tracking-wider uppercase">Access Granted. Check your inbox.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex space-x-2">
                <input
                  type="email"
                  required
                  placeholder="ENTER CLIENT EMAIL ADDRESS..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-[#0A0A0A] border border-[#242424] px-4 py-3 text-xs text-[#F5F5F5] placeholder:text-[#555555] focus:outline-none focus:border-[#F5F5F5] uppercase"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#F5F5F5] text-black font-bold text-xs uppercase tracking-wider hover:bg-white transition-colors cursor-pointer"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand Column */}
        <div className="lg:col-span-2 space-y-4">
          <span className="font-heading font-black text-xl tracking-tighter text-[#F5F5F5] uppercase">
            THE PATLOON
          </span>
          <p className="text-xs text-[#777777] max-w-sm leading-relaxed">
            New-gen dark luxury fashion brand fusing South Asian sartorial heritage with futuristic minimalism. Crafted for those who define their own posture.
          </p>

          <div className="pt-2 space-y-1.5 text-[11px] text-[#666666]">
            <p className="flex items-center space-x-2">
              <MapPin className="w-3.5 h-3.5 text-[#888888]" />
              <span>Flagship Atelier: 42-C Gulberg III, Lahore, Pakistan</span>
            </p>
            <p className="flex items-center space-x-2">
              <MapPin className="w-3.5 h-3.5 text-[#888888]" />
              <span>Studio: E-Street Clifton, Karachi • F-7, Islamabad</span>
            </p>
            <p className="flex items-center space-x-2">
              <Globe className="w-3.5 h-3.5 text-[#888888]" />
              <span>Worldwide Logistics & Express Delivery</span>
            </p>
          </div>
        </div>

        {/* Column 2: SILHOUETTES */}
        <div className="space-y-3">
          <h4 className="font-heading font-bold text-xs text-[#F5F5F5] uppercase tracking-widest">
            COLLECTIONS
          </h4>
          <ul className="space-y-2 text-xs text-[#7A7A7A]">
            <li>
              <button onClick={() => handleNav('MEN', 'KURTAS')} className="hover:text-[#F5F5F5] transition-colors cursor-pointer">
                Structured Kurtas
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('ALL', 'PATLOONS')} className="hover:text-[#F5F5F5] transition-colors cursor-pointer">
                Signature Patloons
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('MEN', 'OUTERWEAR')} className="hover:text-[#F5F5F5] transition-colors cursor-pointer">
                Neo-Sherwani Trenches
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('WOMEN', 'ALL')} className="hover:text-[#F5F5F5] transition-colors cursor-pointer">
                Shadow Silk Gowns
              </button>
            </li>
            <li>
              <button onClick={() => handleNav('UNISEX', 'STREETWEAR')} className="hover:text-[#F5F5F5] transition-colors cursor-pointer">
                Boxy Heavyweight Tees
              </button>
            </li>
          </ul>
        </div>

        {/* Column 3: ATELIER CLIENT SERVICES */}
        <div className="space-y-3">
          <h4 className="font-heading font-bold text-xs text-[#F5F5F5] uppercase tracking-widest">
            CLIENT SERVICES
          </h4>
          <ul className="space-y-2 text-xs text-[#7A7A7A]">
            <li>
              <a href="#hero-section" className="hover:text-[#F5F5F5] transition-colors">
                Bespoke Sizing & Fit Guide
              </a>
            </li>
            <li>
              <a href="#hero-section" className="hover:text-[#F5F5F5] transition-colors">
                Cash on Delivery (COD) Tracking
              </a>
            </li>
            <li>
              <a href="#hero-section" className="hover:text-[#F5F5F5] transition-colors">
                Complimentary Alterations
              </a>
            </li>
            <li>
              <a href="#hero-section" className="hover:text-[#F5F5F5] transition-colors">
                International Express Shipping
              </a>
            </li>
            <li>
              <button
                onClick={() => setIsAdminOpen(true)}
                className="text-[#999999] hover:text-white underline decoration-dotted cursor-pointer"
              >
                Storefront & Admin CMS
              </button>
            </li>
          </ul>
        </div>

        {/* Column 4: BRAND & ATELIERS */}
        <div className="space-y-3">
          <h4 className="font-heading font-bold text-xs text-[#F5F5F5] uppercase tracking-widest">
            THE ATELIER
          </h4>
          <ul className="space-y-2 text-xs text-[#7A7A7A]">
            <li><span className="text-[#C5C5C5]">Direct Concierge:</span> concierge@patloon.co</li>
            <li><span className="text-[#C5C5C5]">WhatsApp Support:</span> +92 300 8472910</li>
            <li><span className="text-[#C5C5C5]">Hours:</span> 11:00 AM - 10:00 PM PKT</li>
            <li><span className="text-[#555555]">INSTAGRAM: @thepatloon.atelier</span></li>
          </ul>
        </div>
      </div>

      {/* Bottom Legal Strip */}
      <div className="border-t border-[#242424] py-8 px-4 sm:px-8 lg:px-10 bg-[#050505]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#555555]">
          <p>© {new Date().getFullYear()} THE PATLOON ATELIER. ALL RIGHTS RESERVED. DEFINE YOUR STYLE.</p>

          <div className="flex items-center space-x-6">
            <span>SECURE ATELIER ENCRYPTION</span>
            <span>•</span>
            <span>CASH ON DELIVERY / RAAST / CARDS</span>
            <span>•</span>
            <span>PAKISTAN & GLOBAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
