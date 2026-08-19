import React, { useState } from 'react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { Heart, Plus, Eye, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { setSelectedProduct, addToCart, toggleWishlist, isInWishlist } = useStore();
  const [isHovered, setIsHovered] = useState(false);
  const [quickAddOpen, setQuickAddOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [addedAnimation, setAddedAnimation] = useState(false);

  const inWishlist = isInWishlist(product.id);
  const hasSecondaryImage = product.images.length > 1;
  const isDiscounted = product.originalPrice && product.originalPrice > product.price;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedSize, product.colors[0] || { name: 'Black', hex: '#0B0B0B' }, 1);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      setQuickAddOpen(false);
    }, 1200);
  };

  const handleCardClick = () => {
    setSelectedProduct(product);
  };

  // Editorial Tag styling helper
  const renderTag = () => {
    if (!product.tag) return null;
    return (
      <span className="bg-black text-[9px] px-2 py-1 tracking-widest font-bold border border-[#242424] text-[#F5F5F5] uppercase">
        {product.tag}
      </span>
    );
  };

  return (
    <div
      id={`product-card-${product.id}`}
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setQuickAddOpen(false);
      }}
      className="group relative bg-[#090909] border border-[#242424] hover:border-[#444444] transition-all duration-300 flex flex-col cursor-pointer overflow-hidden"
    >
      {/* Image Container with Hover Switch */}
      <div className="relative w-full aspect-[4/5] bg-[#111111] overflow-hidden border-b border-[#242424]">
        {/* Primary Image */}
        <img
          src={product.images[0]}
          alt={product.name}
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover object-center transition-all duration-500 ease-out ${
            isHovered && hasSecondaryImage ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
          }`}
          loading="lazy"
        />

        {/* Secondary Image for Hover Reveal */}
        {hasSecondaryImage && (
          <img
            src={product.images[1]}
            alt={`${product.name} alternate view`}
            referrerPolicy="no-referrer"
            className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-500 ease-out ${
              isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
            }`}
            loading="lazy"
          />
        )}

        {/* Top Badges & Wishlist Overlay */}
        <div className="absolute top-4 left-4 z-20 flex items-center space-x-2">
          {renderTag()}
        </div>

        <div className="absolute top-4 right-4 z-20">
          <button
            id={`wishlist-toggle-${product.id}`}
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product);
            }}
            className={`p-1.5 border transition-all duration-200 ${
              inWishlist
                ? 'bg-[#F5F5F5] text-[#050505] border-white'
                : 'bg-black/80 text-[#A1A1A1] border-[#242424] hover:text-[#F5F5F5] hover:border-[#444444]'
            }`}
            aria-label="Add to Wishlist"
          >
            <Heart className={`w-3.5 h-3.5 ${inWishlist ? 'fill-[#050505]' : ''}`} />
          </button>
        </div>

        {/* Stock / Low Inventory Badge */}
        {product.stock <= 5 && product.stock > 0 && (
          <div className="absolute bottom-3 left-3 z-10 px-2 py-0.5 bg-black/90 border border-[#242424] text-[#E5C158] text-[8px] font-mono tracking-widest uppercase">
            ONLY {product.stock} LEFT
          </div>
        )}

        {/* Quick Add Size Overlay on Hover */}
        <div
          className={`absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-[#050505] via-[#050505]/95 to-transparent transition-all duration-300 z-20 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
          }`}
        >
          {quickAddOpen ? (
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-[#111111] border border-[#242424] p-2.5 space-y-2 animate-in fade-in zoom-in-95 duration-150"
            >
              <div className="flex items-center justify-between text-[10px] font-mono text-[#A1A1A1]">
                <span>SELECT SIZE</span>
                <span className="text-[#666666]">{product.sizes.length} SIZES</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-2.5 py-1 text-[11px] font-mono font-semibold transition-all ${
                      selectedSize === size
                        ? 'bg-[#F5F5F5] text-[#050505] font-bold'
                        : 'bg-[#181818] text-[#A1A1A1] hover:text-[#F5F5F5] border border-[#242424]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <button
                onClick={handleQuickAdd}
                disabled={addedAnimation}
                className="w-full py-2 bg-[#F5F5F5] hover:bg-white text-[#050505] text-[11px] font-heading font-bold uppercase tracking-[0.2em] flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-green-700" />
                    <span>ADDED TO BAG</span>
                  </>
                ) : (
                  <span>CONFIRM ADD ({selectedSize})</span>
                )}
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setQuickAddOpen(true);
                }}
                className="flex-1 py-2.5 bg-[#F5F5F5] hover:bg-white text-[#050505] text-[11px] font-heading font-bold uppercase tracking-widest flex items-center justify-center space-x-1.5 transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>QUICK ADD</span>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedProduct(product);
                }}
                className="p-2.5 bg-[#111111] hover:bg-[#181818] border border-[#242424] text-[#F5F5F5] transition-colors"
                title="View Full Editorial Specs"
              >
                <Eye className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Product Information */}
      <div className="p-4 flex flex-col flex-grow justify-between bg-[#090909]">
        <div>
          <div className="flex justify-between items-start">
            <div className="flex-1 min-w-0 pr-2">
              <h3 className="text-sm font-medium tracking-tight mb-1 text-[#F5F5F5] group-hover:text-white uppercase truncate font-heading">
                {product.name}
              </h3>
              <p className="text-[10px] text-[#666666] uppercase tracking-widest truncate font-mono">
                {product.subtitle || 'Obsidian Collection'}
              </p>
            </div>

            <div className="text-right shrink-0">
              <p className="text-sm font-bold tracking-tighter text-[#F5F5F5] font-mono">
                Rs. {product.price.toLocaleString()}
              </p>
              {isDiscounted && (
                <p className="text-[10px] text-[#666666] line-through font-mono">
                  Rs. {product.originalPrice?.toLocaleString()}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Color Swatches & Category Indicator */}
        <div className="mt-3 pt-2.5 border-t border-[#1A1A1A] flex items-center justify-between text-[10px] font-mono text-[#666666]">
          <span className="uppercase">{product.category}</span>
          <div className="flex items-center space-x-1">
            {product.colors.map((c) => (
              <span
                key={c.name}
                className="w-2.5 h-2.5 rounded-full border border-[#242424]"
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
