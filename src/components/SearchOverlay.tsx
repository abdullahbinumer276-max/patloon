import React, { useEffect, useRef } from 'react';
import { useStore } from '../context/StoreContext';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';

export const SearchOverlay: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    searchQuery,
    setSearchQuery,
    products,
    setSelectedProduct,
  } = useStore();

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isSearchOpen]);

  // Global keydown for search shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const filteredResults = searchQuery.trim()
    ? products.filter((p) => {
        const q = searchQuery.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.gender.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.fabric.toLowerCase().includes(q) ||
          (p.tag && p.tag.toLowerCase().includes(q))
        );
      })
    : [];

  const trendingTags = [
    'STRUCTURED KURTA',
    'PATLOONS',
    'RAW SILK',
    'NEO-SHERWANI',
    'BOXY TEE',
    'SHALWAR',
  ];

  return (
    <div
      id="search-overlay"
      className="fixed inset-0 z-50 bg-[#050505]/95 backdrop-blur-2xl flex flex-col justify-start animate-in fade-in duration-200 p-4 sm:p-8"
      onClick={() => setIsSearchOpen(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl mx-auto flex flex-col h-full max-h-[88vh]"
      >
        {/* Search Input Bar */}
        <div className="flex items-center justify-between border-b border-[#242424] pb-4">
          <div className="flex items-center space-x-3 w-full">
            <Search className="w-6 h-6 text-[#A1A1A1]" />
            <input
              ref={inputRef}
              type="text"
              placeholder="SEARCH SILHOUETTES, FABRIC, KURTAS, PATLOONS..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-lg sm:text-2xl font-heading font-bold text-[#F5F5F5] placeholder:text-[#444444] focus:outline-none uppercase tracking-wider"
            />
          </div>

          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-2 text-[#8A8A8A] hover:text-[#F5F5F5] transition-colors ml-4"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Trending Suggestions */}
        <div className="py-4 border-b border-[#1A1A1A] flex flex-wrap items-center gap-2 text-xs font-mono">
          <span className="text-[#666666] mr-2">TRENDING:</span>
          {trendingTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSearchQuery(tag)}
              className="px-3 py-1 bg-[#111111] hover:bg-[#1C1C1C] border border-[#222222] text-[#A1A1A1] hover:text-[#F5F5F5] transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results Container */}
        <div className="flex-1 overflow-y-auto py-6">
          {searchQuery.trim() ? (
            filteredResults.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredResults.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => {
                      setSelectedProduct(product);
                      setIsSearchOpen(false);
                    }}
                    className="p-3 bg-[#0D0D0D] border border-[#1C1C1C] hover:border-[#383838] transition-all flex items-center space-x-3 cursor-pointer group"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-16 aspect-[3/4] object-cover bg-[#161616]"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[9px] font-mono text-[#8A8A8A] uppercase">
                        {product.category}
                      </span>
                      <h4 className="text-xs font-heading font-bold text-[#F5F5F5] group-hover:text-white uppercase truncate">
                        {product.name}
                      </h4>
                      <p className="text-xs font-mono font-bold text-[#C5C5C5] mt-1">
                        Rs. {product.price.toLocaleString()}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#555555] group-hover:text-[#F5F5F5] group-hover:translate-x-1 transition-all" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center space-y-3">
                <p className="font-mono text-xs text-[#7A7A7A] uppercase tracking-widest">
                  NO RESULTS FOUND FOR "{searchQuery}"
                </p>
                <p className="text-xs text-[#555555]">
                  Try searching for 'kurta', 'patloon', 'silk', or 'monochrome'
                </p>
              </div>
            )
          ) : (
            <div className="py-12 text-center text-[#555555] font-mono text-xs">
              START TYPING TO DISCOVER PATLOON ARCHIVES
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
