import React, { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Hero: React.FC = () => {
  const { setActiveCategory, setActiveGenderFilter, products, setSelectedProduct, showToast } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleShopCollection = () => {
    setActiveCategory('ALL');
    setActiveGenderFilter('ALL');
    const el = document.getElementById('shop-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleExploreCapsule = () => {
    const el = document.getElementById('collections-editorial');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    showToast('YOU HAVE JOINED THE PATLOON ELITE.');
    setNewsletterEmail('');
  };

  const spotlightProducts = products.slice(0, 2);

  return (
    <section id="hero-section" className="relative w-full border-b border-[#242424] bg-[#050505] overflow-hidden">
      <div className="flex flex-col lg:flex-row min-h-[720px] lg:h-[760px]">
        {/* Left / Main Editorial Section */}
        <div className="relative w-full lg:w-[65%] border-b lg:border-b-0 lg:border-r border-[#242424] flex items-end p-8 sm:p-12 lg:p-16 overflow-hidden min-h-[500px]">
          {/* Subtle Background Backdrop & Architectural Watermark */}
          <div className="absolute inset-0 z-0 bg-[#080808]">
            <img
              src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=2000&auto=format&fit=crop"
              alt="THE PATLOON Editorial Campaign"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center filter brightness-[0.28] contrast-[1.2]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/90 via-transparent to-[#050505]" />
          </div>

          {/* Architectural Watermark Frame */}
          <div className="absolute inset-0 flex items-center justify-center opacity-30 pointer-events-none z-10">
            <div className="text-[240px] sm:text-[360px] lg:text-[420px] font-heading font-black text-white/5 select-none leading-none tracking-tighter">
              PAT
            </div>
          </div>

          {/* Editorial Content */}
          <div className="relative z-20 max-w-xl">
            <div className="text-[10px] uppercase tracking-[0.4em] text-[#888888] mb-4 font-mono flex items-center space-x-2">
              <span className="w-2 h-[1px] bg-[#666666]" />
              <span>Fall/Winter 2026 // ATELIER VOL. 04</span>
            </div>

            <h1 className="font-heading text-5xl sm:text-7xl lg:text-8xl font-black leading-[0.88] tracking-tighter text-[#F5F5F5] mb-6 uppercase">
              DEFINE YOUR<br />STYLE.
            </h1>

            <p className="text-[#A1A1A1] text-sm sm:text-base leading-relaxed mb-8 max-w-md font-light">
              Modern clothing. Timeless attitude. A bridge between cultural heritage and futuristic street aesthetics.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                id="hero-shop-btn"
                onClick={handleShopCollection}
                className="px-8 py-4 bg-[#F5F5F5] text-black text-[11px] font-bold tracking-widest uppercase hover:bg-white transition-all cursor-pointer shadow-lg shadow-white/5"
              >
                Shop Collection
              </button>

              <button
                id="hero-explore-btn"
                onClick={handleExploreCapsule}
                className="px-8 py-4 border border-[#242424] text-[#F5F5F5] text-[11px] font-bold tracking-widest uppercase hover:bg-[#111111] hover:border-[#383838] transition-all cursor-pointer"
              >
                Explore
              </button>
            </div>
          </div>
        </div>

        {/* Right / Editorial Spotlight Rail */}
        <div className="w-full lg:w-[35%] flex flex-col bg-[#080808]">
          {/* Spotlight Header & Items */}
          <div className="p-6 sm:p-8 border-b border-[#242424]">
            <div className="flex justify-between items-end mb-6">
              <h2 className="text-xs font-bold tracking-widest uppercase text-[#F5F5F5] font-heading">
                New Arrivals
              </h2>
              <button
                onClick={handleShopCollection}
                className="text-[10px] text-[#888888] hover:text-[#F5F5F5] uppercase tracking-tighter transition-colors cursor-pointer"
              >
                View All &rarr;
              </button>
            </div>

            {/* Spotlight Products List */}
            <div className="space-y-6">
              {spotlightProducts.map((product, idx) => (
                <div
                  key={product.id}
                  onClick={() => setSelectedProduct(product)}
                  className="group cursor-pointer flex space-x-4 items-center p-2 hover:bg-[#0E0E0E] transition-colors border border-transparent hover:border-[#1E1E1E]"
                >
                  <div className="aspect-[4/5] w-24 sm:w-28 bg-[#111111] overflow-hidden relative border border-[#242424] shrink-0">
                    <div className="absolute top-2 left-2 z-20 bg-black text-[8px] px-1.5 py-0.5 tracking-widest font-bold border border-[#242424] text-[#F5F5F5]">
                      {idx === 0 ? 'NEW' : 'LIMITED'}
                    </div>
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xs sm:text-sm font-medium tracking-tight text-[#F5F5F5] group-hover:text-white truncate uppercase font-heading">
                        {product.name}
                      </h3>
                      <p className="text-[10px] text-[#666666] uppercase tracking-widest font-mono mt-0.5 truncate">
                        {product.subtitle || 'Obsidian Collection'}
                      </p>
                    </div>

                    <div className="mt-3 flex items-baseline space-x-2">
                      <p className="text-xs sm:text-sm font-bold tracking-tighter text-[#F5F5F5] font-mono">
                        Rs. {product.price.toLocaleString()}
                      </p>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <p className="text-[10px] text-[#666666] line-through font-mono">
                          Rs. {product.originalPrice.toLocaleString()}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Inline Editorial Newsletter Panel */}
          <div className="flex-1 flex flex-col justify-center p-6 sm:p-8 bg-[#080808]">
            <div className="flex items-center space-x-4 mb-4 opacity-40">
              <div className="h-[1px] flex-1 bg-current" />
              <span className="text-[10px] tracking-[0.5em] uppercase font-bold text-[#F5F5F5]">
                Newsletter
              </span>
              <div className="h-[1px] flex-1 bg-current" />
            </div>

            <form onSubmit={handleNewsletterSubmit} className="relative">
              <input
                type="email"
                required
                placeholder="JOIN THE ELITE"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="w-full bg-transparent border-b border-[#242424] py-4 text-center text-xs tracking-widest uppercase text-[#F5F5F5] placeholder:text-[#555555] focus:outline-none focus:border-[#F5F5F5] transition-colors"
              />
              <button
                type="submit"
                className="absolute right-0 bottom-4 text-xs text-[#A1A1A1] hover:text-[#F5F5F5] opacity-60 hover:opacity-100 transition-all cursor-pointer p-1"
                aria-label="Submit email"
              >
                &rarr;
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
