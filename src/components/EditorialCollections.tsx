import React from 'react';
import { useStore } from '../context/StoreContext';
import { ArrowRight } from 'lucide-react';

export const EditorialCollections: React.FC = () => {
  const { setActiveGenderFilter, setActiveCategory } = useStore();

  const handleSelectMen = () => {
    setActiveGenderFilter('MEN');
    setActiveCategory('ALL');
    const el = document.getElementById('shop-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectWomen = () => {
    setActiveGenderFilter('WOMEN');
    setActiveCategory('ALL');
    const el = document.getElementById('shop-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectPatloons = () => {
    setActiveGenderFilter('ALL');
    setActiveCategory('PATLOONS');
    const el = document.getElementById('shop-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="collections-editorial" className="bg-[#050505] border-b border-[#242424]">
      {/* MEN Editorial Hero */}
      <div className="relative min-h-[70vh] flex items-center justify-start overflow-hidden border-b border-[#242424] group">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=2000&auto=format&fit=crop"
            alt="THE PATLOON Men Editorial"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-top filter brightness-[0.35] contrast-[1.15] group-hover:scale-105 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/75 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 lg:px-10 py-16 sm:py-20 w-full">
          <div className="max-w-xl">
            <span className="text-[10px] font-mono tracking-[0.4em] text-[#888888] uppercase mb-3 block">
              COLLECTION 01 // MEN
            </span>
            <h2 className="font-heading font-black text-4xl sm:text-6xl md:text-7xl text-[#F5F5F5] tracking-tight uppercase leading-[0.92] mb-4">
              BUILT FOR EVERYDAY.
            </h2>
            <p className="text-sm text-[#A1A1A1] font-light leading-relaxed mb-8 max-w-md">
              Structured Egyptian cotton kurtas, heavyweight boxy tees, and razor-sharp tailored bottoms engineered for relentless attitude.
            </p>
            <button
              onClick={handleSelectMen}
              className="px-8 py-4 bg-[#F5F5F5] text-black font-bold text-[11px] uppercase tracking-widest hover:bg-white transition-all flex items-center space-x-2 cursor-pointer shadow-lg shadow-white/5"
            >
              <span>Shop Men</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Split Section: WOMEN & PATLOONS */}
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* WOMEN Editorial */}
        <div className="relative min-h-[60vh] flex items-end justify-start overflow-hidden border-b lg:border-b-0 lg:border-r border-[#242424] group p-8 sm:p-12">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1600&auto=format&fit=crop"
              alt="THE PATLOON Women Collection"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center filter brightness-[0.32] contrast-[1.2] group-hover:scale-105 transition-transform duration-1000 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/65 to-transparent" />
          </div>

          <div className="relative z-10 max-w-lg">
            <span className="text-[10px] font-mono tracking-[0.4em] text-[#888888] uppercase mb-2 block">
              COLLECTION 02 // WOMEN
            </span>
            <h3 className="font-heading font-black text-3xl sm:text-5xl text-[#F5F5F5] tracking-tight uppercase leading-[0.92] mb-3">
              OWN YOUR LOOK.
            </h3>
            <p className="text-xs sm:text-sm text-[#A1A1A1] font-light leading-relaxed mb-6">
              Deconstructed shadow silk gowns, micro-pleated cyber velvet shawls, and sharp asymmetrical tunics.
            </p>
            <button
              onClick={handleSelectWomen}
              className="px-6 py-3.5 border border-[#242424] hover:bg-[#111111] hover:border-[#383838] text-[#F5F5F5] font-bold text-[11px] uppercase tracking-widest transition-all flex items-center space-x-2 cursor-pointer"
            >
              <span>Shop Women</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* SIGNATURE PATLOONS Editorial */}
        <div className="relative min-h-[60vh] flex items-end justify-start overflow-hidden group p-8 sm:p-12">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1600&auto=format&fit=crop"
              alt="THE PATLOON Signature Bottoms"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center filter brightness-[0.32] contrast-[1.2] group-hover:scale-105 transition-transform duration-1000 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/65 to-transparent" />
          </div>

          <div className="relative z-10 max-w-lg">
            <span className="text-[10px] font-mono tracking-[0.4em] text-[#888888] uppercase mb-2 block">
              ICONIC ARCHITECTURE // TROUSERS
            </span>
            <h3 className="font-heading font-black text-3xl sm:text-5xl text-[#F5F5F5] tracking-tight uppercase leading-[0.92] mb-3">
              THE PATLOON CUT.
            </h3>
            <p className="text-xs sm:text-sm text-[#A1A1A1] font-light leading-relaxed mb-6">
              Forward knife pleats, adjustable matte side buckles, and deep monolithic drapes crafted for modern movement.
            </p>
            <button
              onClick={handleSelectPatloons}
              className="px-6 py-3.5 border border-[#242424] hover:bg-[#111111] hover:border-[#383838] text-[#F5F5F5] font-bold text-[11px] uppercase tracking-widest transition-all flex items-center space-x-2 cursor-pointer"
            >
              <span>Explore Patloons</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
