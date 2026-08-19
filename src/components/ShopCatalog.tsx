import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { FilterBar } from './FilterBar';
import { RefreshCw } from 'lucide-react';

export const ShopCatalog: React.FC = () => {
  const { products, activeCategory, activeGenderFilter, setActiveCategory, setActiveGenderFilter } = useStore();
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState(25000);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => p.published !== false)
      .filter((p) => {
        // Gender filter
        if (activeGenderFilter !== 'ALL') {
          if (activeGenderFilter === 'MEN' && p.gender !== 'MEN' && p.gender !== 'UNISEX') return false;
          if (activeGenderFilter === 'WOMEN' && p.gender !== 'WOMEN' && p.gender !== 'UNISEX') return false;
          if (activeGenderFilter === 'UNISEX' && p.gender !== 'UNISEX') return false;
        }

        // Category filter
        if (activeCategory !== 'ALL' && p.category !== activeCategory) {
          return false;
        }

        // Price filter
        if (p.price > priceRange) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        // Default featured
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [products, activeCategory, activeGenderFilter, sortBy, priceRange]);

  const handleResetFilters = () => {
    setActiveCategory('ALL');
    setActiveGenderFilter('ALL');
    setSortBy('featured');
  };

  return (
    <section id="shop-section" className="py-16 sm:py-20 bg-[#050505] min-h-screen border-b border-[#242424]">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10">
        {/* Section Title */}
        <div className="mb-8 flex justify-between items-end pb-4 border-b border-[#242424]">
          <div>
            <div className="text-[10px] uppercase tracking-[0.4em] text-[#666666] mb-1 font-mono">
              THE COMPLETE ARCHIVE
            </div>
            <h2 className="text-xs sm:text-sm font-bold tracking-widest uppercase text-[#F5F5F5] font-heading">
              Explore Collection
            </h2>
          </div>

          <div className="text-[10px] font-mono text-[#666666] flex items-center space-x-2">
            <span>SHOWING</span>
            <span className="text-[#F5F5F5] font-bold">{filteredProducts.length}</span>
            <span>OF</span>
            <span className="text-[#F5F5F5] font-bold">{products.length}</span>
            <span>SILHOUETTES</span>
          </div>
        </div>

        {/* Filter Navigation Bar */}
        <FilterBar
          sortBy={sortBy}
          setSortBy={setSortBy}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
        />

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-10">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center border border-[#242424] bg-[#080808] my-10 p-8">
            <p className="text-xs font-mono text-[#888888] uppercase tracking-widest mb-4">
              No silhouettes match the current filter
            </p>
            <button
              onClick={handleResetFilters}
              className="px-6 py-3 bg-[#F5F5F5] text-black text-[11px] font-mono font-bold uppercase tracking-widest flex items-center space-x-2 mx-auto hover:bg-white transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
