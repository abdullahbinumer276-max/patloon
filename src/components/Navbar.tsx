import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { Search, ShoppingBag, Heart, Menu, X, LayoutDashboard, Sparkles, Image as ImageIcon } from 'lucide-react';
import { ProductCategory } from '../types';

export const Navbar: React.FC = () => {
  const {
    cartCount,
    setIsCartOpen,
    wishlist,
    setIsWishlistOpen,
    setIsSearchOpen,
    activeCategory,
    setActiveCategory,
    activeGenderFilter,
    setActiveGenderFilter,
    announcementText,
    isAdminOpen,
    setIsAdminOpen,
    setIsImageManagerOpen,
  } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (gender: 'ALL' | 'MEN' | 'WOMEN' | 'UNISEX', category: ProductCategory = 'ALL') => {
    setActiveGenderFilter(gender);
    setActiveCategory(category);
    setIsMobileMenuOpen(false);

    // Smooth scroll down to products section if currently at hero
    const shopSection = document.getElementById('shop-section');
    if (shopSection) {
      shopSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Announcement Ticker Bar */}
      {announcementText && (
        <div id="announcement-bar" className="bg-[#050505] border-b border-[#242424] py-1.5 px-4 text-xs font-mono tracking-widest text-[#A1A1A1] overflow-hidden">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center space-x-3 w-full justify-center text-center">
              <Sparkles className="w-3 h-3 text-[#F5F5F5] animate-pulse hidden sm:inline" />
              <span className="truncate">{announcementText}</span>
              <Sparkles className="w-3 h-3 text-[#F5F5F5] animate-pulse hidden sm:inline" />
            </div>
          </div>
        </div>
      )}

      {/* Main Navbar */}
      <nav
        id="main-navbar"
        className={`w-full transition-all duration-300 border-b border-[#242424] ${
          isScrolled
            ? 'bg-[#050505]/90 backdrop-blur-xl py-3.5 shadow-2xl shadow-black/90'
            : 'bg-[#050505]/80 backdrop-blur-xl py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-10">
          <div className="flex items-center justify-between">
            {/* Left Brand Logo */}
            <div className="flex items-center space-x-6">
              <button
                id="mobile-menu-toggle"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-1.5 text-[#F5F5F5] hover:text-white transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>

              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveGenderFilter('ALL');
                  setActiveCategory('ALL');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                id="brand-logo"
                className="group flex items-center focus:outline-none"
              >
                <span className="font-heading font-black text-xl sm:text-2xl tracking-tighter text-[#F5F5F5] group-hover:text-white transition-colors uppercase">
                  THE PATLOON
                </span>
              </a>
            </div>

            {/* Center Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8 text-[11px] font-semibold tracking-[0.2em] uppercase text-[#A1A1A1]">
              <button
                id="nav-shop"
                onClick={() => handleNavClick('ALL', 'ALL')}
                className={`transition-colors cursor-pointer ${
                  activeGenderFilter === 'ALL' && activeCategory === 'ALL'
                    ? 'text-white'
                    : 'hover:text-white'
                }`}
              >
                Shop
              </button>

              <button
                id="nav-men"
                onClick={() => handleNavClick('MEN', 'ALL')}
                className={`transition-colors cursor-pointer ${
                  activeGenderFilter === 'MEN'
                    ? 'text-white'
                    : 'hover:text-white'
                }`}
              >
                Men
              </button>

              <button
                id="nav-women"
                onClick={() => handleNavClick('WOMEN', 'ALL')}
                className={`transition-colors cursor-pointer ${
                  activeGenderFilter === 'WOMEN'
                    ? 'text-white'
                    : 'hover:text-white'
                }`}
              >
                Women
              </button>

              <button
                id="nav-patloons"
                onClick={() => handleNavClick('ALL', 'PATLOONS')}
                className={`transition-colors cursor-pointer ${
                  activeCategory === 'PATLOONS'
                    ? 'text-white'
                    : 'hover:text-white'
                }`}
              >
                Patloons
              </button>

              <button
                id="nav-new-arrivals"
                onClick={() => {
                  const el = document.getElementById('new-arrivals-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hover:text-white transition-colors cursor-pointer"
              >
                New Arrivals
              </button>

              <button
                id="nav-sale"
                onClick={() => {
                  handleNavClick('ALL', 'ALL');
                }}
                className="text-red-500 hover:text-red-400 transition-colors cursor-pointer"
              >
                Sale
              </button>
            </div>

            {/* Right Action Icons & Admin Toggle */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              {/* Change PNG Images trigger */}
              <button
                id="image-manager-button"
                onClick={() => setIsImageManagerOpen(true)}
                className="flex items-center space-x-1.5 px-2.5 py-1.5 bg-[#111111] hover:bg-[#1C1C1C] border border-[#242424] hover:border-[#444444] text-[#A1A1A1] hover:text-[#F5F5F5] text-[10px] font-mono tracking-widest uppercase transition-all cursor-pointer"
                title="Change any image with a local PNG file"
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">PNG Asset</span>
              </button>

              {/* Admin Mode Pill */}
              <button
                id="admin-portal-button"
                onClick={() => setIsAdminOpen(!isAdminOpen)}
                className={`flex items-center space-x-2 px-3 py-1.5 border text-[10px] font-mono tracking-widest uppercase transition-all duration-200 cursor-pointer ${
                  isAdminOpen
                    ? 'bg-[#F5F5F5] text-[#050505] border-[#F5F5F5] font-bold'
                    : 'bg-[#111111] text-[#A1A1A1] border-[#242424] hover:border-[#444444] hover:text-[#F5F5F5]'
                }`}
                title="Toggle Admin CMS & Revenue Dashboard"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span className="hidden lg:inline">{isAdminOpen ? 'Storefront' : 'Admin'}</span>
              </button>

              {/* Search Button */}
              <button
                id="search-button"
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-[#A1A1A1] hover:text-white transition-colors cursor-pointer"
                aria-label="Open Search"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Wishlist Button */}
              <button
                id="wishlist-button"
                onClick={() => setIsWishlistOpen(true)}
                className="p-2 text-[#A1A1A1] hover:text-white transition-colors relative cursor-pointer"
                aria-label="Open Wishlist"
              >
                <Heart className="w-4 h-4" />
                {wishlist.length > 0 && (
                  <span
                    id="wishlist-badge"
                    className="absolute -top-1 -right-1 bg-[#F5F5F5] text-black text-[8px] font-bold px-1 rounded-full"
                  >
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Cart Button */}
              <button
                id="cart-button"
                onClick={() => setIsCartOpen(true)}
                className="p-2 text-[#F5F5F5] hover:text-white hover:bg-[#111111] border border-[#242424] transition-all relative cursor-pointer"
                aria-label="Open Shopping Bag"
              >
                <ShoppingBag className="w-4 h-4" />
                {cartCount > 0 && (
                  <span
                    id="cart-badge"
                    className="absolute -top-1 -right-1 bg-[#F5F5F5] text-black text-[8px] font-bold px-1 rounded-full"
                  >
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer / Dropdown */}
        {isMobileMenuOpen && (
          <div id="mobile-menu-dropdown" className="md:hidden bg-[#0A0A0A] border-t border-b border-[#242424] px-6 py-6 space-y-4 animate-in slide-in-from-top-2 duration-200">
            <div className="grid grid-cols-2 gap-3 text-xs font-mono uppercase tracking-widest">
              <button
                onClick={() => handleNavClick('ALL', 'ALL')}
                className="p-3 text-left bg-[#111111] border border-[#222222] text-[#F5F5F5] hover:border-[#444444] cursor-pointer"
              >
                Shop All
              </button>
              <button
                onClick={() => handleNavClick('MEN', 'ALL')}
                className="p-3 text-left bg-[#111111] border border-[#222222] text-[#F5F5F5] hover:border-[#444444] cursor-pointer"
              >
                Men
              </button>
              <button
                onClick={() => handleNavClick('WOMEN', 'ALL')}
                className="p-3 text-left bg-[#111111] border border-[#222222] text-[#F5F5F5] hover:border-[#444444] cursor-pointer"
              >
                Women
              </button>
              <button
                onClick={() => handleNavClick('ALL', 'PATLOONS')}
                className="p-3 text-left bg-[#111111] border border-[#222222] text-[#F5F5F5] hover:border-[#444444] cursor-pointer"
              >
                Patloons
              </button>
              <button
                onClick={() => handleNavClick('ALL', 'KURTAS')}
                className="p-3 text-left bg-[#111111] border border-[#222222] text-[#F5F5F5] hover:border-[#444444] cursor-pointer"
              >
                Kurtas
              </button>
              <button
                onClick={() => handleNavClick('ALL', 'OUTERWEAR')}
                className="p-3 text-left bg-[#111111] border border-[#222222] text-[#F5F5F5] hover:border-[#444444] cursor-pointer"
              >
                Outerwear
              </button>
            </div>

            <div className="pt-2 border-t border-[#1F1F1F] flex items-center justify-between text-xs font-mono text-[#8A8A8A]">
              <span>PAKISTAN FLAGSHIP ATELIERS</span>
              <span className="text-[#F5F5F5]">PKR (Rs.)</span>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
