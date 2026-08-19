import React, { useRef } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const NewArrivalsCarousel: React.FC = () => {
  const { products, setActiveCategory } = useStore();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Filter new arrivals or high priority items
  const newArrivals = products.filter((p) => p.isNewArrival || p.tag === 'NEW' || p.isFeatured).slice(0, 6);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -340 : 340;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const handleViewAllNew = () => {
    setActiveCategory('ALL');
    const el = document.getElementById('shop-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="new-arrivals-section" className="py-16 sm:py-20 bg-[#050505] border-b border-[#242424] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10">
        {/* Header with Title and Scroll Arrows */}
        <div className="flex justify-between items-end mb-8 pb-4 border-b border-[#242424]">
          <div>
            <div className="text-[10px] uppercase tracking-[0.4em] text-[#666666] mb-1 font-mono">
              THE RUNWAY DROP
            </div>
            <h2 className="text-xs sm:text-sm font-bold tracking-widest uppercase text-[#F5F5F5] font-heading">
              New Arrivals
            </h2>
          </div>

          <div className="flex items-center space-x-6">
            <button
              onClick={handleViewAllNew}
              className="text-[10px] text-[#666666] hover:text-[#F5F5F5] uppercase tracking-tighter transition-colors cursor-pointer"
            >
              View All &rarr;
            </button>

            <div className="hidden sm:flex items-center space-x-2">
              <button
                onClick={() => scroll('left')}
                className="p-2 bg-[#0A0A0A] hover:bg-[#151515] border border-[#242424] text-[#F5F5F5] transition-colors cursor-pointer"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="p-2 bg-[#0A0A0A] hover:bg-[#151515] border border-[#242424] text-[#F5F5F5] transition-colors cursor-pointer"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Horizontal Scrolling Track */}
        <div
          ref={scrollContainerRef}
          className="flex space-x-6 overflow-x-auto pb-6 no-scrollbar snap-x snap-mandatory scroll-smooth"
        >
          {newArrivals.map((product) => (
            <div
              key={product.id}
              className="w-[260px] sm:w-[300px] md:w-[320px] flex-shrink-0 snap-start"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
