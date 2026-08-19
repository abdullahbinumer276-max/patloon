import React from 'react';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, Heart, Search, Compass, LayoutDashboard } from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const {
    cartCount,
    setIsCartOpen,
    wishlist,
    setIsWishlistOpen,
    setIsSearchOpen,
    isAdminOpen,
    setIsAdminOpen,
    setActiveCategory,
    setActiveGenderFilter,
  } = useStore();

  const handleShopClick = () => {
    if (isAdminOpen) {
      setIsAdminOpen(false);
    }
    setActiveCategory('ALL');
    setActiveGenderFilter('ALL');
    const el = document.getElementById('shop-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      id="mobile-bottom-nav"
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#080808]/95 backdrop-blur-xl border-t border-[#222222] py-2 px-6 flex items-center justify-between"
    >
      <button
        onClick={handleShopClick}
        className="flex flex-col items-center space-y-1 text-[#8A8A8A] hover:text-[#F5F5F5] transition-colors"
      >
        <Compass className="w-5 h-5" />
        <span className="text-[9px] font-mono tracking-wider uppercase">EXPLORE</span>
      </button>

      <button
        onClick={() => setIsSearchOpen(true)}
        className="flex flex-col items-center space-y-1 text-[#8A8A8A] hover:text-[#F5F5F5] transition-colors"
      >
        <Search className="w-5 h-5" />
        <span className="text-[9px] font-mono tracking-wider uppercase">SEARCH</span>
      </button>

      <button
        onClick={() => setIsWishlistOpen(true)}
        className="flex flex-col items-center space-y-1 text-[#8A8A8A] hover:text-[#F5F5F5] transition-colors relative"
      >
        <Heart className="w-5 h-5" />
        {wishlist.length > 0 && (
          <span className="absolute -top-1 right-1 w-3.5 h-3.5 bg-[#F5F5F5] text-[#050505] text-[9px] font-mono font-bold flex items-center justify-center rounded-full">
            {wishlist.length}
          </span>
        )}
        <span className="text-[9px] font-mono tracking-wider uppercase">SAVED</span>
      </button>

      <button
        onClick={() => setIsCartOpen(true)}
        className="flex flex-col items-center space-y-1 text-[#F5F5F5] transition-colors relative"
      >
        <div className="relative">
          <ShoppingBag className="w-5 h-5" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-2 w-4 h-4 bg-white text-black text-[10px] font-mono font-bold flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          )}
        </div>
        <span className="text-[9px] font-mono tracking-wider uppercase">BAG</span>
      </button>

      <button
        onClick={() => setIsAdminOpen(!isAdminOpen)}
        className={`flex flex-col items-center space-y-1 transition-colors ${
          isAdminOpen ? 'text-[#F5F5F5] font-bold' : 'text-[#8A8A8A] hover:text-[#F5F5F5]'
        }`}
      >
        <LayoutDashboard className="w-5 h-5" />
        <span className="text-[9px] font-mono tracking-wider uppercase">
          {isAdminOpen ? 'STORE' : 'ADMIN'}
        </span>
      </button>
    </div>
  );
};
