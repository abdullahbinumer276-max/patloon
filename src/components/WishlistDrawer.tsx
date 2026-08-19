import React from 'react';
import { useStore } from '../context/StoreContext';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

export const WishlistDrawer: React.FC = () => {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    toggleWishlist,
    addToCart,
    setSelectedProduct,
  } = useStore();

  if (!isWishlistOpen) return null;

  return (
    <div
      id="wishlist-drawer-overlay"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex justify-end animate-in fade-in duration-200"
      onClick={() => setIsWishlistOpen(false)}
    >
      <div
        id="wishlist-drawer"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-[#080808] border-l border-[#242424] h-full flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300"
      >
        {/* Header */}
        <div className="p-6 border-b border-[#1A1A1A] flex items-center justify-between bg-[#0C0C0C]">
          <div className="flex items-center space-x-3">
            <Heart className="w-5 h-5 text-[#F5F5F5] fill-[#F5F5F5]" />
            <h2 className="font-heading font-extrabold text-base tracking-widest text-[#F5F5F5] uppercase">
              SAVED SILHOUETTES ({wishlist.length})
            </h2>
          </div>
          <button
            onClick={() => setIsWishlistOpen(false)}
            className="p-1.5 text-[#8A8A8A] hover:text-[#F5F5F5] hover:bg-[#1A1A1A] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wishlist Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {wishlist.length > 0 ? (
            wishlist.map((product) => (
              <div
                key={product.id}
                className="flex space-x-4 p-3 bg-[#0D0D0D] border border-[#1C1C1C] relative group"
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-20 aspect-[3/4] object-cover bg-[#161616] border border-[#222222] cursor-pointer"
                  onClick={() => {
                    setSelectedProduct(product);
                    setIsWishlistOpen(false);
                  }}
                />

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between">
                      <h4
                        onClick={() => {
                          setSelectedProduct(product);
                          setIsWishlistOpen(false);
                        }}
                        className="font-heading font-bold text-xs text-[#F5F5F5] uppercase leading-snug line-clamp-1 cursor-pointer hover:underline"
                      >
                        {product.name}
                      </h4>
                      <button
                        onClick={() => toggleWishlist(product)}
                        className="text-[#555555] hover:text-red-400 transition-colors p-1"
                        aria-label="Remove from wishlist"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-[11px] font-mono text-[#8A8A8A] mt-1">
                      {product.subtitle}
                    </p>

                    <p className="font-mono text-xs font-bold text-[#F5F5F5] mt-1">
                      Rs. {product.price.toLocaleString()}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      addToCart(
                        product,
                        product.sizes[0] || 'M',
                        product.colors[0] || { name: 'Black', hex: '#0B0B0B' },
                        1
                      );
                      toggleWishlist(product);
                    }}
                    className="mt-2 w-full py-2 bg-[#171717] hover:bg-[#F5F5F5] text-[#F5F5F5] hover:text-[#050505] border border-[#2A2A2A] text-[10px] font-mono font-bold uppercase tracking-wider flex items-center justify-center space-x-1.5 transition-colors cursor-pointer"
                  >
                    <ShoppingBag className="w-3 h-3" />
                    <span>MOVE TO BAG</span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 text-center space-y-4">
              <Heart className="w-10 h-10 text-[#333333] mx-auto" />
              <p className="font-mono text-xs text-[#7A7A7A] uppercase tracking-widest">
                NO SILHOUETTES SAVED YET
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-[#1C1C1C] bg-[#0A0A0A]">
          <button
            onClick={() => setIsWishlistOpen(false)}
            className="w-full py-3.5 bg-[#141414] hover:bg-[#1A1A1A] border border-[#2A2A2A] text-[#F5F5F5] text-xs font-mono tracking-widest uppercase"
          >
            CONTINUE BROWSING
          </button>
        </div>
      </div>
    </div>
  );
};
