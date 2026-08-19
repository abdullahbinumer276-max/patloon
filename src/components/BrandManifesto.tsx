import React from 'react';
import { Shield, Compass, Gem } from 'lucide-react';

export const BrandManifesto: React.FC = () => {
  return (
    <section className="py-24 sm:py-28 bg-[#050505] border-b border-[#242424] text-center relative overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-8 lg:px-10 space-y-8">
        <div className="inline-flex items-center space-x-2 text-[10px] font-mono tracking-[0.4em] text-[#888888] uppercase">
          <span className="w-2 h-[1px] bg-[#444444]" />
          <span>THE PATLOON MANIFESTO</span>
          <span className="w-2 h-[1px] bg-[#444444]" />
        </div>

        <h2 className="font-heading font-black text-3xl sm:text-5xl md:text-6xl text-[#F5F5F5] tracking-tight uppercase leading-[0.95]">
          NOT JUST CLOTHES.
          <br />
          <span className="text-[#888888]">IT'S YOUR STYLE.</span>
        </h2>

        <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#A1A1A1] font-light leading-relaxed">
          Rooted in the timeless tailoring heritage of Pakistan and evolved through an uncompromising futuristic aesthetic. We reject ornamental excess in pursuit of monolithic cut, weighted drape, and architectural posture.
        </p>

        {/* 3 Value Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 text-left border-t border-[#242424]">
          <div className="p-6 bg-[#080808] border border-[#242424] space-y-2">
            <Gem className="w-4 h-4 text-[#F5F5F5]" />
            <h3 className="font-heading font-bold text-xs text-[#F5F5F5] uppercase tracking-widest">
              RAW & REFINED
            </h3>
            <p className="text-xs text-[#7A7A7A] leading-relaxed">
              Hand-spun raw silk, weighted Egyptian cotton, and virgin worsted wools sourced directly from master weavers.
            </p>
          </div>

          <div className="p-6 bg-[#080808] border border-[#242424] space-y-2">
            <Compass className="w-4 h-4 text-[#F5F5F5]" />
            <h3 className="font-heading font-bold text-xs text-[#F5F5F5] uppercase tracking-widest">
              ENGINEERED DRAPE
            </h3>
            <p className="text-xs text-[#7A7A7A] leading-relaxed">
              Every pleat, knife crease, and concealed magnet is calculated for natural stride and razor-sharp silhouette.
            </p>
          </div>

          <div className="p-6 bg-[#080808] border border-[#242424] space-y-2">
            <Shield className="w-4 h-4 text-[#F5F5F5]" />
            <h3 className="font-heading font-bold text-xs text-[#F5F5F5] uppercase tracking-widest">
              ATELIER TAILORED
            </h3>
            <p className="text-xs text-[#7A7A7A] leading-relaxed">
              Crafted in limited seasonal batches in our Lahore and Islamabad workshops. No mass production.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
