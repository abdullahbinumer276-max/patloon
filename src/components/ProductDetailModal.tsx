import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { SAMPLE_REVIEWS } from '../data/products';
import { Review } from '../types';
import {
  X,
  Heart,
  Star,
  Truck,
  ShieldCheck,
  RotateCcw,
  Ruler,
  Check,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProduct,
    setSelectedProduct,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setIsCheckoutOpen,
    showToast,
  } = useStore();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'fabric' | 'shipping' | 'reviews'>('details');

  // Customer Reviews state
  const [reviews, setReviews] = useState<Review[]>(SAMPLE_REVIEWS);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [showReviewForm, setShowReviewForm] = useState(false);

  if (!selectedProduct) return null;

  const currentSize = selectedSize || selectedProduct.sizes[0] || 'M';
  const currentColor = selectedProduct.colors[selectedColorIndex] || { name: 'Black', hex: '#0B0B0B' };
  const inWishlist = isInWishlist(selectedProduct.id);

  const handleAddToCart = () => {
    addToCart(selectedProduct, currentSize, currentColor, quantity);
  };

  const handleBuyNow = () => {
    addToCart(selectedProduct, currentSize, currentColor, quantity);
    setSelectedProduct(null);
    setIsCheckoutOpen(true);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      author: newReviewAuthor,
      rating: newReviewRating,
      date: 'Just now',
      title: 'Verified Customer Experience',
      comment: newReviewComment,
      verified: true,
    };

    setReviews([newRev, ...reviews]);
    setNewReviewAuthor('');
    setNewReviewComment('');
    setShowReviewForm(false);
    showToast('Thank you! Your verified review has been published.');
  };

  return (
    <div
      id="product-detail-modal"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-xl flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200"
      onClick={() => setSelectedProduct(null)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl bg-[#090909] border border-[#242424] shadow-2xl shadow-black overflow-hidden my-auto max-h-[92vh] flex flex-col"
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1A1A1A] bg-[#0C0C0C]">
          <div className="flex items-center space-x-3 text-xs font-mono tracking-widest text-[#8A8A8A]">
            <span className="uppercase">{selectedProduct.category}</span>
            <span>//</span>
            <span className="text-[#F5F5F5] uppercase">{selectedProduct.sku}</span>
          </div>

          <button
            onClick={() => setSelectedProduct(null)}
            className="p-1.5 text-[#8A8A8A] hover:text-[#F5F5F5] hover:bg-[#1A1A1A] transition-colors"
            aria-label="Close Product Details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Main Body: 2 Columns */}
        <div className="overflow-y-auto p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10">
          {/* Left Gallery (7 Columns) */}
          <div className="lg:col-span-7 flex flex-col space-y-4">
            {/* Primary Display Image */}
            <div className="relative aspect-[3/4] w-full bg-[#111111] border border-[#1F1F1F] overflow-hidden group">
              <img
                src={selectedProduct.images[activeImageIndex] || selectedProduct.images[0]}
                alt={selectedProduct.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-all duration-500"
              />

              {/* Tag overlay */}
              {selectedProduct.tag && (
                <div className="absolute top-4 left-4 z-10 px-2.5 py-1 bg-[#080808]/90 border border-[#333333] text-[#F5F5F5] text-[10px] font-mono tracking-widest uppercase">
                  {selectedProduct.tag}
                </div>
              )}
            </div>

            {/* Thumbnail Row */}
            {selectedProduct.images.length > 1 && (
              <div className="flex space-x-3 overflow-x-auto pb-1 no-scrollbar">
                {selectedProduct.images.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 aspect-[3/4] flex-shrink-0 border transition-all ${
                      activeImageIndex === idx
                        ? 'border-[#F5F5F5] ring-1 ring-white/20'
                        : 'border-[#222222] opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`Angle ${idx + 1}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Product Specs & Purchase Engine (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              {/* Product Header */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center space-x-1.5 text-xs text-[#E5C158]">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3.5 h-3.5 fill-[#E5C158] text-[#E5C158]"
                        />
                      ))}
                    </div>
                    <span className="font-mono text-xs text-[#A1A1A1] ml-1">
                      {selectedProduct.rating} ({reviews.length} reviews)
                    </span>
                  </div>

                  <button
                    onClick={() => toggleWishlist(selectedProduct)}
                    className={`p-2 border transition-colors ${
                      inWishlist
                        ? 'bg-[#F5F5F5] text-[#050505] border-white'
                        : 'bg-[#111111] text-[#8A8A8A] border-[#222222] hover:text-[#F5F5F5]'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${inWishlist ? 'fill-[#050505]' : ''}`} />
                  </button>
                </div>

                <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#F5F5F5] tracking-tight uppercase leading-tight">
                  {selectedProduct.name}
                </h1>
                <p className="text-xs text-[#8A8A8A] mt-1 font-light">
                  {selectedProduct.subtitle}
                </p>
              </div>

              {/* Price Row */}
              <div className="flex items-baseline space-x-3 py-3 border-y border-[#171717]">
                <span className="font-mono text-2xl font-bold text-[#F5F5F5]">
                  Rs. {selectedProduct.price.toLocaleString()}
                </span>
                {selectedProduct.originalPrice && selectedProduct.originalPrice > selectedProduct.price && (
                  <span className="font-mono text-sm text-[#666666] line-through">
                    Rs. {selectedProduct.originalPrice.toLocaleString()}
                  </span>
                )}
                <span className="text-[10px] font-mono text-green-400 bg-green-950/40 px-2 py-0.5 border border-green-800">
                  IN STOCK • ATELIER READY
                </span>
              </div>

              {/* Color Swatches */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-[#A1A1A1]">
                  <span>COLOR: <span className="text-[#F5F5F5] uppercase font-bold">{currentColor.name}</span></span>
                </div>
                <div className="flex items-center space-x-2.5">
                  {selectedProduct.colors.map((col, idx) => (
                    <button
                      key={col.name}
                      onClick={() => setSelectedColorIndex(idx)}
                      className={`p-1 border transition-all ${
                        selectedColorIndex === idx
                          ? 'border-[#F5F5F5] scale-110'
                          : 'border-[#282828] hover:border-[#555555]'
                      }`}
                      title={col.name}
                    >
                      <span
                        className="block w-5 h-5"
                        style={{ backgroundColor: col.hex }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[#A1A1A1]">
                    SELECT SIZE: <span className="text-[#F5F5F5] font-bold">{currentSize}</span>
                  </span>
                  <button
                    onClick={() => setIsSizeGuideOpen(!isSizeGuideOpen)}
                    className="text-[#8A8A8A] hover:text-[#F5F5F5] flex items-center space-x-1 underline text-[11px]"
                  >
                    <Ruler className="w-3 h-3" />
                    <span>SIZE GUIDE</span>
                  </button>
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {selectedProduct.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-2.5 text-xs font-mono font-bold tracking-wider transition-all border ${
                        currentSize === size
                          ? 'bg-[#F5F5F5] text-[#050505] border-white'
                          : 'bg-[#121212] text-[#A1A1A1] border-[#242424] hover:text-[#F5F5F5] hover:border-[#444444]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Counter */}
              <div className="flex items-center space-x-4 pt-1">
                <span className="text-xs font-mono text-[#8A8A8A]">QUANTITY:</span>
                <div className="flex items-center border border-[#262626] bg-[#111111]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 text-xs font-mono text-[#A1A1A1] hover:text-white"
                  >
                    -
                  </button>
                  <span className="px-3 py-1.5 text-xs font-mono font-bold text-[#F5F5F5]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1.5 text-xs font-mono text-[#A1A1A1] hover:text-white"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* CTA Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <button
                  id="modal-add-to-cart-btn"
                  onClick={handleAddToCart}
                  className="w-full py-4 bg-[#F5F5F5] hover:bg-white text-[#050505] font-heading font-extrabold text-xs uppercase tracking-[0.25em] shadow-xl shadow-white/5 transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>ADD TO BAG</span>
                  <span>•</span>
                  <span>Rs. {(selectedProduct.price * quantity).toLocaleString()}</span>
                </button>

                <button
                  id="modal-buy-now-btn"
                  onClick={handleBuyNow}
                  className="w-full py-3.5 bg-[#141414] hover:bg-[#1C1C1C] border border-[#2E2E2E] hover:border-[#555555] text-[#F5F5F5] font-heading font-bold text-xs uppercase tracking-[0.25em] transition-all flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <span>INSTANT BUY NOW</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Assurances */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#171717] text-[11px] font-mono text-[#7A7A7A]">
                <div className="flex items-center space-x-2">
                  <Truck className="w-3.5 h-3.5 text-[#F5F5F5]" />
                  <span>Complimentary Shipping &gt; 10k</span>
                </div>
                <div className="flex items-center space-x-2">
                  <RotateCcw className="w-3.5 h-3.5 text-[#F5F5F5]" />
                  <span>7-Day Atelier Exchanges</span>
                </div>
              </div>
            </div>

            {/* Accordion Tabs for Craft, Fabric, Specs & Reviews */}
            <div className="border-t border-[#1A1A1A] pt-4">
              <div className="flex border-b border-[#1A1A1A] space-x-4 text-xs font-mono uppercase tracking-wider pb-2">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`pb-1 ${activeTab === 'details' ? 'text-[#F5F5F5] border-b-2 border-white' : 'text-[#666666] hover:text-[#A1A1A1]'}`}
                >
                  DETAILS
                </button>
                <button
                  onClick={() => setActiveTab('fabric')}
                  className={`pb-1 ${activeTab === 'fabric' ? 'text-[#F5F5F5] border-b-2 border-white' : 'text-[#666666] hover:text-[#A1A1A1]'}`}
                >
                  FABRIC & FIT
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`pb-1 ${activeTab === 'reviews' ? 'text-[#F5F5F5] border-b-2 border-white' : 'text-[#666666] hover:text-[#A1A1A1]'}`}
                >
                  REVIEWS ({reviews.length})
                </button>
              </div>

              <div className="py-4 text-xs text-[#A1A1A1] leading-relaxed">
                {activeTab === 'details' && (
                  <div className="space-y-2">
                    <p className="text-[#C5C5C5]">{selectedProduct.description}</p>
                    <ul className="list-disc list-inside space-y-1 text-[#8A8A8A] pt-2">
                      {selectedProduct.details.map((det, i) => (
                        <li key={i}>{det}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {activeTab === 'fabric' && (
                  <div className="space-y-2 font-mono">
                    <p><span className="text-[#F5F5F5]">COMPOSITION:</span> {selectedProduct.fabric}</p>
                    <p><span className="text-[#F5F5F5]">SILHOUETTE FIT:</span> {selectedProduct.fit}</p>
                    <p><span className="text-[#F5F5F5]">CARE:</span> Dry clean or cold delicate wash inside out. Hang dry in shade. Low steam iron.</p>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-[#F5F5F5]">CUSTOMER TESTIMONIALS</span>
                      <button
                        onClick={() => setShowReviewForm(!showReviewForm)}
                        className="text-[10px] font-mono text-[#F5F5F5] underline"
                      >
                        {showReviewForm ? 'CANCEL' : '+ WRITE A REVIEW'}
                      </button>
                    </div>

                    {showReviewForm && (
                      <form onSubmit={handleAddReview} className="p-3 bg-[#111111] border border-[#242424] space-y-2.5">
                        <input
                          type="text"
                          placeholder="Your Name"
                          value={newReviewAuthor}
                          onChange={(e) => setNewReviewAuthor(e.target.value)}
                          required
                          className="w-full bg-[#181818] border border-[#2C2C2C] px-3 py-1.5 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#555555]"
                        />
                        <div className="flex items-center space-x-2 text-xs font-mono">
                          <span>RATING:</span>
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              type="button"
                              key={star}
                              onClick={() => setNewReviewRating(star)}
                              className={`text-sm ${star <= newReviewRating ? 'text-[#E5C158]' : 'text-[#444444]'}`}
                            >
                              ★
                            </button>
                          ))}
                        </div>
                        <textarea
                          placeholder="Describe the silhouette, fabric drape, and fit..."
                          value={newReviewComment}
                          onChange={(e) => setNewReviewComment(e.target.value)}
                          required
                          rows={2}
                          className="w-full bg-[#181818] border border-[#2C2C2C] px-3 py-1.5 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#555555]"
                        />
                        <button
                          type="submit"
                          className="px-4 py-2 bg-[#F5F5F5] text-[#050505] text-[10px] font-mono font-bold uppercase tracking-wider"
                        >
                          SUBMIT REVIEW
                        </button>
                      </form>
                    )}

                    <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                      {reviews.map((rev) => (
                        <div key={rev.id} className="p-3 bg-[#111111] border border-[#1E1E1E]">
                          <div className="flex items-center justify-between text-[11px] font-mono text-[#8A8A8A] mb-1">
                            <span className="text-[#F5F5F5] font-bold">{rev.author}</span>
                            <span className="text-[#E5C158]">{'★'.repeat(rev.rating)}</span>
                          </div>
                          <p className="text-xs text-[#D1D1D1]">{rev.comment}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Size Guide Drawer/Modal */}
        {isSizeGuideOpen && (
          <div className="p-6 bg-[#0E0E0E] border-t border-[#262626] animate-in slide-in-from-bottom-2 duration-200">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-heading font-bold text-sm text-[#F5F5F5] uppercase tracking-wider">
                ATELIER MEASUREMENT CHART (INCHES)
              </h4>
              <button
                onClick={() => setIsSizeGuideOpen(false)}
                className="text-xs font-mono text-[#8A8A8A] hover:text-white"
              >
                CLOSE [X]
              </button>
            </div>
            <div className="overflow-x-auto text-xs font-mono">
              <table className="w-full text-left border border-[#222222]">
                <thead className="bg-[#161616] text-[#A1A1A1]">
                  <tr>
                    <th className="p-2 border border-[#222222]">SIZE</th>
                    <th className="p-2 border border-[#222222]">CHEST</th>
                    <th className="p-2 border border-[#222222]">SHOULDER</th>
                    <th className="p-2 border border-[#222222]">LENGTH</th>
                    <th className="p-2 border border-[#222222]">WAIST / PATLOON</th>
                  </tr>
                </thead>
                <tbody className="text-[#C5C5C5]">
                  <tr>
                    <td className="p-2 border border-[#222222] font-bold text-white">S / 38</td>
                    <td className="p-2 border border-[#222222]">38 - 40"</td>
                    <td className="p-2 border border-[#222222]">17.5"</td>
                    <td className="p-2 border border-[#222222]">40"</td>
                    <td className="p-2 border border-[#222222]">30 - 31"</td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-[#222222] font-bold text-white">M / 40</td>
                    <td className="p-2 border border-[#222222]">41 - 42"</td>
                    <td className="p-2 border border-[#222222]">18.5"</td>
                    <td className="p-2 border border-[#222222]">42"</td>
                    <td className="p-2 border border-[#222222]">32 - 33"</td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-[#222222] font-bold text-white">L / 42</td>
                    <td className="p-2 border border-[#222222]">43 - 45"</td>
                    <td className="p-2 border border-[#222222]">19.5"</td>
                    <td className="p-2 border border-[#222222]">43"</td>
                    <td className="p-2 border border-[#222222]">34 - 36"</td>
                  </tr>
                  <tr>
                    <td className="p-2 border border-[#222222] font-bold text-white">XL / 44</td>
                    <td className="p-2 border border-[#222222]">46 - 48"</td>
                    <td className="p-2 border border-[#222222]">20.5"</td>
                    <td className="p-2 border border-[#222222]">44"</td>
                    <td className="p-2 border border-[#222222]">37 - 39"</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
