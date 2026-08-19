import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Trash2, ArrowRight, ShoppingBag, ShieldCheck, Tag } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartQuantity,
    cartTotal,
    setIsCheckoutOpen,
    showToast,
  } = useStore();

  const [couponCode, setCouponCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState<{ code: string; amount: number } | null>(null);

  if (!isCartOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 10000;
  const progressPercent = Math.min(100, (cartTotal / FREE_SHIPPING_THRESHOLD) * 100);
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - cartTotal);

  const discountAmount = appliedDiscount ? appliedDiscount.amount : 0;
  const shippingFee = cartTotal >= FREE_SHIPPING_THRESHOLD || cartTotal === 0 ? 0 : 350;
  const finalTotal = Math.max(0, cartTotal - discountAmount + shippingFee);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = couponCode.trim().toUpperCase();
    if (clean === 'PATLOON10') {
      const discount = Math.round(cartTotal * 0.1);
      setAppliedDiscount({ code: 'PATLOON10 (10% OFF)', amount: discount });
      showToast('10% VIP Promo applied!');
    } else if (clean === 'DARKLUXE') {
      setAppliedDiscount({ code: 'DARKLUXE (Rs. 1,000 OFF)', amount: 1000 });
      showToast('Rs. 1,000 Atelier Credit applied!');
    } else {
      showToast('Invalid promo code. Try "PATLOON10"');
    }
  };

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div
      id="cart-drawer-overlay"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex justify-end animate-in fade-in duration-200"
      onClick={() => setIsCartOpen(false)}
    >
      <div
        id="cart-drawer"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-[#080808] border-l border-[#242424] h-full flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-300"
      >
        {/* Header */}
        <div className="p-6 border-b border-[#1A1A1A] flex items-center justify-between bg-[#0C0C0C]">
          <div className="flex items-center space-x-3">
            <ShoppingBag className="w-5 h-5 text-[#F5F5F5]" />
            <h2 className="font-heading font-extrabold text-base tracking-widest text-[#F5F5F5] uppercase">
              SHOPPING BAG ({cart.reduce((s, i) => s + i.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 text-[#8A8A8A] hover:text-[#F5F5F5] hover:bg-[#1A1A1A] transition-colors"
            aria-label="Close Shopping Bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Meter */}
        <div className="px-6 py-3.5 bg-[#0F0F0F] border-b border-[#1A1A1A] text-xs font-mono">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[#A1A1A1]">
              {remainingForFreeShipping === 0 ? (
                <span className="text-green-400 font-bold">✓ YOU UNLOCKED COMPLIMENTARY EXPRESS SHIPPING</span>
              ) : (
                <span>Add <strong className="text-[#F5F5F5]">Rs. {remainingForFreeShipping.toLocaleString()}</strong> for free delivery</span>
              )}
            </span>
            <span className="text-[#666666]">{Math.round(progressPercent)}%</span>
          </div>
          <div className="w-full h-1 bg-[#222222] overflow-hidden">
            <div
              className="h-full bg-[#F5F5F5] transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length > 0 ? (
            cart.map((item, index) => (
              <div
                key={`${item.product.id}-${item.selectedSize}-${index}`}
                className="flex space-x-4 p-3 bg-[#0D0D0D] border border-[#1C1C1C] relative group"
              >
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  referrerPolicy="no-referrer"
                  className="w-20 aspect-[3/4] object-cover bg-[#161616] border border-[#222222]"
                />

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between">
                      <h4 className="font-heading font-bold text-xs text-[#F5F5F5] uppercase leading-snug line-clamp-1">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(index)}
                        className="text-[#555555] hover:text-red-400 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-[11px] font-mono text-[#8A8A8A] mt-1 space-x-2">
                      <span>SIZE: <strong className="text-[#E0E0E0]">{item.selectedSize}</strong></span>
                      <span>•</span>
                      <span>COLOR: <strong className="text-[#E0E0E0]">{item.selectedColor.name}</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#171717] mt-2">
                    <div className="flex items-center border border-[#282828] bg-[#141414]">
                      <button
                        onClick={() => updateCartQuantity(index, item.quantity - 1)}
                        className="px-2 py-0.5 text-xs font-mono text-[#8A8A8A] hover:text-white"
                      >
                        -
                      </button>
                      <span className="px-2 py-0.5 text-xs font-mono font-bold text-[#F5F5F5]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(index, item.quantity + 1)}
                        className="px-2 py-0.5 text-xs font-mono text-[#8A8A8A] hover:text-white"
                      >
                        +
                      </button>
                    </div>

                    <span className="font-mono text-xs font-bold text-[#F5F5F5]">
                      Rs. {(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-20 text-center space-y-4">
              <ShoppingBag className="w-10 h-10 text-[#333333] mx-auto" />
              <p className="font-mono text-xs text-[#7A7A7A] uppercase tracking-widest">
                YOUR BAG IS CURRENTLY EMPTY
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="px-6 py-2.5 bg-[#171717] border border-[#2B2B2B] text-xs font-mono text-[#F5F5F5] uppercase tracking-wider hover:border-[#555555]"
              >
                EXPLORE SILHOUETTES
              </button>
            </div>
          )}
        </div>

        {/* Promo Code & Checkout Summary */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-[#1C1C1C] bg-[#0A0A0A] space-y-4">
            {/* Promo code input */}
            <form onSubmit={handleApplyCoupon} className="flex space-x-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 text-[#666666] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="PROMO CODE (e.g. PATLOON10)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="w-full bg-[#121212] border border-[#242424] pl-9 pr-3 py-2 text-xs font-mono text-[#F5F5F5] uppercase placeholder:text-[#555555] focus:outline-none focus:border-[#555555]"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-[#1C1C1C] hover:bg-[#252525] border border-[#333333] text-xs font-mono text-[#F5F5F5] uppercase tracking-wider"
              >
                APPLY
              </button>
            </form>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs font-mono pt-1">
              <div className="flex justify-between text-[#8A8A8A]">
                <span>SUBTOTAL</span>
                <span className="text-[#F5F5F5]">Rs. {cartTotal.toLocaleString()}</span>
              </div>

              {appliedDiscount && (
                <div className="flex justify-between text-green-400">
                  <span>DISCOUNT ({appliedDiscount.code})</span>
                  <span>- Rs. {appliedDiscount.amount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between text-[#8A8A8A]">
                <span>EXPRESS SHIPPING</span>
                <span>{shippingFee === 0 ? 'COMPLIMENTARY' : `Rs. ${shippingFee}`}</span>
              </div>

              <div className="flex justify-between text-sm font-bold text-[#F5F5F5] pt-2 border-t border-[#1F1F1F]">
                <span>ESTIMATED TOTAL</span>
                <span className="text-base font-mono">Rs. {finalTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              id="proceed-to-checkout-btn"
              onClick={handleProceedCheckout}
              className="w-full py-4 bg-[#F5F5F5] hover:bg-white text-[#050505] font-heading font-extrabold text-xs uppercase tracking-[0.25em] shadow-2xl flex items-center justify-center space-x-2 transition-all cursor-pointer"
            >
              <span>PROCEED TO CHECKOUT</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
