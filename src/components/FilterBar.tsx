import React from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCategory } from '../types';
import { ArrowUpDown } from 'lucide-react';

interface FilterBarProps {
  sortBy: string;
  setSortBy: (val: string) => void;
  priceRange: number;
  setPriceRange: (val: number) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  sortBy,
  setSortBy,
}) => {
  const {
    activeCategory,
    setActiveCategory,
    activeGenderFilter,
    setActiveGenderFilter,
  } = useStore();

  const categories: { label: string; value: ProductCategory }[] = [
    { label: 'All Silhouettes', value: 'ALL' },
    { label: 'Kurtas', value: 'KURTAS' },
    { label: 'Patloons', value: 'PATLOONS' },
    { label: 'Outerwear', value: 'OUTERWEAR' },
    { label: 'Streetwear', value: 'STREETWEAR' },
  ];

  const genderOptions: ('ALL' | 'MEN' | 'WOMEN' | 'UNISEX')[] = ['ALL', 'MEN', 'WOMEN', 'UNISEX'];

  return (
    <div className="space-y-4 pb-6 border-b border-[#242424]">
      {/* Top Gender Selector Tabs & Sorting */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-1 bg-[#0A0A0A] p-1 border border-[#242424]">
          {genderOptions.map((g) => (
            <button
              key={g}
              onClick={() => setActiveGenderFilter(g)}
              className={`px-4 py-1.5 text-[10px] font-mono tracking-widest uppercase transition-all cursor-pointer ${
                activeGenderFilter === g
                  ? 'bg-[#F5F5F5] text-black font-bold'
                  : 'text-[#888888] hover:text-[#F5F5F5]'
              }`}
            >
              {g === 'ALL' ? 'All' : g}
            </button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center space-x-3 text-[10px] font-mono">
          <div className="flex items-center space-x-2 bg-[#0A0A0A] border border-[#242424] px-3 py-1.5 text-[#A1A1A1]">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#F5F5F5]" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-[#F5F5F5] focus:outline-none cursor-pointer uppercase tracking-wider text-[10px]"
            >
              <option value="featured" className="bg-[#111111] text-[#F5F5F5]">
                SORT: FEATURED
              </option>
              <option value="newest" className="bg-[#111111] text-[#F5F5F5]">
                SORT: NEWEST FIRST
              </option>
              <option value="price-asc" className="bg-[#111111] text-[#F5F5F5]">
                PRICE: LOW TO HIGH
              </option>
              <option value="price-desc" className="bg-[#111111] text-[#F5F5F5]">
                PRICE: HIGH TO LOW
              </option>
              <option value="rating" className="bg-[#111111] text-[#F5F5F5]">
                HIGHEST RATED
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pb-1">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={`px-4 py-2 text-[10px] font-mono tracking-widest whitespace-nowrap uppercase border transition-all cursor-pointer ${
              activeCategory === cat.value
                ? 'bg-[#181818] text-[#F5F5F5] border-[#444444] font-bold'
                : 'bg-[#080808] text-[#777777] border-[#202020] hover:text-[#E0E0E0] hover:border-[#333333]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
};
