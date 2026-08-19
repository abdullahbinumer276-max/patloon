import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import confetti from 'canvas-confetti';
import {
  X,
  ShieldCheck,
  Truck,
  CreditCard,
  Banknote,
  CheckCircle2,
  PackageCheck,
  ArrowLeft,
  Building2,
} from 'lucide-react';
import { Order } from '../types';

export const CheckoutModal: React.FC = () => {
  const { isCheckoutOpen, setIsCheckoutOpen, cart, cartTotal, createOrder } = useStore();

  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Lahore');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<
    'Cash on Delivery (COD)' | 'Debit / Credit Card' | 'Direct Bank Transfer'
  >('Cash on Delivery (COD)');
  const [notes, setNotes] = useState('');
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 10000;
  const shippingFee = cartTotal >= FREE_SHIPPING_THRESHOLD || cartTotal === 0 ? 0 : 350;
  const totalAmount = cartTotal + shippingFee;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone || !address) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const order = createOrder({
        customerName,
        email: email || `${customerName.toLowerCase().replace(/\s+/g, '.')}@patloon.co`,
        phone,
        city,
        address,
        items: [...cart],
        subtotal: cartTotal,
        discount: 0,
        shipping: shippingFee,
        total: totalAmount,
        paymentMethod,
        status: 'Processing',
        notes,
      });

      // Confetti burst
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#F5F5F5', '#888888', '#222222', '#D4AF37'],
        });
      } catch (err) {
        console.log(err);
      }

      setConfirmedOrder(order);
      setIsSubmitting(false);
    }, 600);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setConfirmedOrder(null);
  };

  const pakistaniCities = [
    'Lahore',
    'Karachi',
    'Islamabad',
    'Rawalpindi',
    'Faisalabad',
    'Peshawar',
    'Multan',
    'Sialkot',
    'Quetta',
    'Gujranwala',
    'Hyderabad',
    'Dubai (UAE)',
    'International Express',
  ];

  return (
    <div
      id="checkout-modal-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
      onClick={handleClose}
    >
      <div
        id="checkout-modal"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl bg-[#090909] border border-[#262626] shadow-2xl shadow-black overflow-hidden my-auto max-h-[92vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1A1A1A] bg-[#0D0D0D]">
          <div className="flex items-center space-x-3">
            <ShieldCheck className="w-5 h-5 text-[#F5F5F5]" />
            <h2 className="font-heading font-extrabold text-sm sm:text-base tracking-widest text-[#F5F5F5] uppercase">
              THE PATLOON // SECURE ATELIER CHECKOUT
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 text-[#8A8A8A] hover:text-[#F5F5F5] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="overflow-y-auto p-6 sm:p-8">
          {confirmedOrder ? (
            /* Order Confirmation View */
            <div className="text-center py-8 space-y-6 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 bg-[#161616] border border-[#2F2F2F] text-white flex items-center justify-center mx-auto rounded-full">
                <CheckCircle2 className="w-8 h-8 text-green-400" />
              </div>

              <div>
                <span className="text-[10px] font-mono tracking-[0.3em] text-[#8A8A8A] uppercase">
                  ORDER CONFIRMED
                </span>
                <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#F5F5F5] tracking-tight uppercase mt-1">
                  THANK YOU, {confirmedOrder.customerName.toUpperCase()}
                </h3>
                <p className="text-xs text-[#A1A1A1] mt-2 font-mono">
                  ORDER REFERENCE: <span className="text-[#F5F5F5] font-bold">{confirmedOrder.id}</span>
                </p>
                <p className="text-xs text-[#8A8A8A] font-mono mt-0.5">
                  TRACKING NUMBER: <span className="text-[#F5F5F5]">{confirmedOrder.trackingNumber}</span>
                </p>
              </div>

              {/* Order Receipt Box */}
              <div className="bg-[#111111] border border-[#222222] p-5 text-left text-xs font-mono space-y-3 max-w-lg mx-auto">
                <div className="flex justify-between pb-2 border-b border-[#222222]">
                  <span className="text-[#8A8A8A]">DELIVERY DESTINATION:</span>
                  <span className="text-[#F5F5F5] font-bold text-right">
                    {confirmedOrder.address}, {confirmedOrder.city}
                  </span>
                </div>
                <div className="flex justify-between pb-2 border-b border-[#222222]">
                  <span className="text-[#8A8A8A]">PAYMENT METHOD:</span>
                  <span className="text-[#F5F5F5]">{confirmedOrder.paymentMethod}</span>
                </div>
                <div className="flex justify-between pb-2 border-b border-[#222222]">
                  <span className="text-[#8A8A8A]">ESTIMATED ATELIER DISPATCH:</span>
                  <span className="text-[#F5F5F5]">24 - 48 Hours via TCS Express</span>
                </div>
                <div className="flex justify-between pt-1 text-sm font-bold">
                  <span className="text-[#F5F5F5]">TOTAL PAYABLE:</span>
                  <span className="text-[#F5F5F5]">Rs. {confirmedOrder.total.toLocaleString()}</span>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleClose}
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#F5F5F5] text-[#050505] font-heading font-extrabold text-xs uppercase tracking-[0.2em] hover:bg-white transition-colors"
                >
                  RETURN TO STOREFRONT
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handleSubmitOrder} className="space-y-6">
              {/* Garment Summary Strip */}
              <div className="bg-[#111111] border border-[#202020] p-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-[#8A8A8A] uppercase">ORDER SUMMARY</span>
                  <p className="text-xs font-heading font-bold text-[#F5F5F5] uppercase mt-0.5">
                    {cart.length} SILHOUETTES ({cart.reduce((s, i) => s + i.quantity, 0)} PIECES)
                  </p>
                </div>
                <div className="text-right font-mono">
                  <span className="text-xs text-[#8A8A8A]">TOTAL: </span>
                  <span className="text-sm font-bold text-[#F5F5F5]">
                    Rs. {totalAmount.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono tracking-widest text-[#8A8A8A] uppercase flex items-center space-x-2">
                  <span>01. CLIENT CONTACT INFORMATION</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-mono text-[#777777] uppercase mb-1">
                      FULL NAME *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Abdullah Khan"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full bg-[#121212] border border-[#262626] px-3.5 py-2.5 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#555555]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-[#777777] uppercase mb-1">
                      PHONE NUMBER (FOR TCS DISPATCH) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+92 300 1234567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#121212] border border-[#262626] px-3.5 py-2.5 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#555555]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono text-[#777777] uppercase mb-1">
                    EMAIL ADDRESS (FOR ORDER RECEIPT)
                  </label>
                  <input
                    type="email"
                    placeholder="name@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#121212] border border-[#262626] px-3.5 py-2.5 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#555555]"
                  />
                </div>
              </div>

              {/* Shipping Address */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono tracking-widest text-[#8A8A8A] uppercase">
                  02. SHIPPING DESTINATION
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-1">
                    <label className="block text-[10px] font-mono text-[#777777] uppercase mb-1">
                      CITY *
                    </label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-[#121212] border border-[#262626] px-3.5 py-2.5 text-xs font-mono text-[#F5F5F5] focus:outline-none focus:border-[#555555]"
                    >
                      {pakistaniCities.map((c) => (
                        <option key={c} value={c} className="bg-[#121212]">
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[10px] font-mono text-[#777777] uppercase mb-1">
                      COMPLETE STREET ADDRESS / APARTMENT / SECTOR *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. House 14-A, Street 9, DHA Phase 5"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-[#121212] border border-[#262626] px-3.5 py-2.5 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#555555]"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono tracking-widest text-[#8A8A8A] uppercase">
                  03. PAYMENT METHOD
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Cash on Delivery (COD)')}
                    className={`p-3.5 border text-left flex flex-col justify-between transition-all ${
                      paymentMethod === 'Cash on Delivery (COD)'
                        ? 'bg-[#181818] border-[#F5F5F5] text-white'
                        : 'bg-[#101010] border-[#222222] text-[#8A8A8A] hover:border-[#383838]'
                    }`}
                  >
                    <Banknote className="w-4 h-4 text-[#F5F5F5] mb-2" />
                    <div>
                      <p className="text-xs font-mono font-bold text-[#F5F5F5]">CASH ON DELIVERY</p>
                      <p className="text-[10px] text-[#777777] mt-0.5">Pay upon delivery across Pakistan</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Debit / Credit Card')}
                    className={`p-3.5 border text-left flex flex-col justify-between transition-all ${
                      paymentMethod === 'Debit / Credit Card'
                        ? 'bg-[#181818] border-[#F5F5F5] text-white'
                        : 'bg-[#101010] border-[#222222] text-[#8A8A8A] hover:border-[#383838]'
                    }`}
                  >
                    <CreditCard className="w-4 h-4 text-[#F5F5F5] mb-2" />
                    <div>
                      <p className="text-xs font-mono font-bold text-[#F5F5F5]">CARD PAYMENT</p>
                      <p className="text-[10px] text-[#777777] mt-0.5">Visa, Mastercard, PayPak</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('Direct Bank Transfer')}
                    className={`p-3.5 border text-left flex flex-col justify-between transition-all ${
                      paymentMethod === 'Direct Bank Transfer'
                        ? 'bg-[#181818] border-[#F5F5F5] text-white'
                        : 'bg-[#101010] border-[#222222] text-[#8A8A8A] hover:border-[#383838]'
                    }`}
                  >
                    <Building2 className="w-4 h-4 text-[#F5F5F5] mb-2" />
                    <div>
                      <p className="text-xs font-mono font-bold text-[#F5F5F5]">BANK TRANSFER</p>
                      <p className="text-[10px] text-[#777777] mt-0.5">Raast / Meezan / HBL</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Special Instructions */}
              <div>
                <label className="block text-[10px] font-mono text-[#777777] uppercase mb-1">
                  ORDER NOTES / SPECIAL ATELIER INSTRUCTIONS (OPTIONAL)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Leave with security guard if unavailable"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-[#121212] border border-[#262626] px-3.5 py-2 text-xs text-[#F5F5F5] focus:outline-none focus:border-[#555555]"
                />
              </div>

              {/* Total & Submit Button */}
              <div className="pt-4 border-t border-[#1C1C1C] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs font-mono text-[#8A8A8A]">
                  <span>FINAL TOTAL: </span>
                  <span className="text-lg font-bold text-[#F5F5F5] ml-1">
                    Rs. {totalAmount.toLocaleString()}
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-10 py-4 bg-[#F5F5F5] hover:bg-white text-[#050505] font-heading font-extrabold text-xs uppercase tracking-[0.25em] shadow-2xl transition-all cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? 'TRANSMITTING ORDER...' : 'CONFIRM & PLACE ORDER'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
