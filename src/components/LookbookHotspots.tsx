import React, { useState } from 'react';
import { LOOKBOOK_LOOKS } from '../data/products';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, ArrowUpRight } from 'lucide-react';

export const LookbookHotspots: React.FC = () => {
  const { products, setSelectedProduct, addToCart } = useStore();
  const [activeLookIndex, setActiveLookIndex] = useState(0);
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(null);

  const currentLook = LOOKBOOK_LOOKS[activeLookIndex];

  const handleHotspotClick = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      setSelectedProduct(product);
    }
  };

  return (
    <section id="lookbook-section" className="py-24 bg-[#080808] border-b border-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-[#1C1C1C] gap-4">
          <div>
            <span className="text-[10px] font-mono tracking-[0.3em] text-[#8A8A8A] uppercase mb-1 block">
              EDITORIAL RUNWAY // INTERACTIVE
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-[#F5F5F5] tracking-tight uppercase">
              LOOKBOOK & HOTSPOTS
            </h2>
          </div>

          {/* Lookbook Switcher Tabs */}
          <div className="flex items-center space-x-2">
            {LOOKBOOK_LOOKS.map((look, idx) => (
              <button
                key={look.id}
                onClick={() => {
                  setActiveLookIndex(idx);
                  setActiveHotspotId(null);
                }}
                className={`px-4 py-2 text-xs font-mono tracking-wider uppercase transition-all ${
                  activeLookIndex === idx
                    ? 'bg-[#F5F5F5] text-[#050505] font-bold'
                    : 'bg-[#121212] text-[#8A8A8A] hover:text-[#F5F5F5] border border-[#222222]'
                }`}
              >
                LOOK 0{idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Lookbook Canvas */}
        <div className="relative w-full aspect-[4/5] sm:aspect-[16/9] bg-[#0E0E0E] overflow-hidden border border-[#222222] group">
          <img
            src={currentLook.image}
            alt={currentLook.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter brightness-[0.45] contrast-[1.1]"
          />

          {/* Look Info Overlay */}
          <div className="absolute top-6 left-6 z-10 bg-[#080808]/80 backdrop-blur-md p-4 border border-[#242424] max-w-xs">
            <span className="text-[9px] font-mono tracking-[0.25em] text-[#8A8A8A] uppercase">
              {currentLook.season}
            </span>
            <h3 className="font-heading font-bold text-lg text-[#F5F5F5] uppercase mt-0.5">
              {currentLook.title}
            </h3>
            <p className="text-[11px] text-[#A1A1A1] mt-1 font-light">
              Tap the pulsating glowing pins on the garments to view silhouette specifications and quick-shop.
            </p>
          </div>

          {/* Hotspots on the Model */}
          {currentLook.hotspots.map((hs) => {
            const product = products.find((p) => p.id === hs.productId);
            const isHovered = activeHotspotId === hs.id;

            return (
              <div
                key={hs.id}
                style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
                onMouseEnter={() => setActiveHotspotId(hs.id)}
                onMouseLeave={() => setActiveHotspotId(null)}
              >
                {/* Hotspot Pin Pulsating */}
                <button
                  onClick={() => handleHotspotClick(hs.productId)}
                  className="relative group/pin flex items-center justify-center p-2 focus:outline-none cursor-pointer"
                  aria-label={`View ${hs.label}`}
                >
                  <span className="absolute w-8 h-8 rounded-full bg-white/20 animate-ping" />
                  <span className="relative w-4 h-4 rounded-full bg-[#F5F5F5] border-2 border-[#050505] shadow-lg flex items-center justify-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#050505]" />
                  </span>
                </button>

                {/* Hotspot Card Flyout */}
                {product && (
                  <div
                    className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-56 p-3 bg-[#0B0B0B]/95 backdrop-blur-xl border border-[#2D2D2D] shadow-2xl transition-all duration-200 z-30 pointer-events-auto ${
                      isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        className="w-12 h-16 object-cover border border-[#222222]"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-[9px] font-mono text-[#8A8A8A] uppercase truncate">
                          {product.category}
                        </p>
                        <h4 className="text-xs font-heading font-bold text-[#F5F5F5] truncate">
                          {product.name}
                        </h4>
                        <p className="text-xs font-mono font-bold text-[#E5E5E5] mt-1">
                          Rs. {product.price.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-[#1C1C1C] flex items-center space-x-2">
                      <button
                        onClick={() => handleHotspotClick(hs.productId)}
                        className="flex-1 py-1.5 bg-[#F5F5F5] text-[#050505] text-[10px] font-mono font-bold uppercase tracking-wider hover:bg-white flex items-center justify-center space-x-1"
                      >
                        <span>VIEW SPECS</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
