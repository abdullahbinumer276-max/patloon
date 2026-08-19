import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { NewArrivalsCarousel } from './components/NewArrivalsCarousel';
import { EditorialCollections } from './components/EditorialCollections';
import { LookbookHotspots } from './components/LookbookHotspots';
import { ShopCatalog } from './components/ShopCatalog';
import { BrandManifesto } from './components/BrandManifesto';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchOverlay } from './components/SearchOverlay';
import { AdminDashboard } from './components/Admin/AdminDashboard';
import { Toast } from './components/Toast';

const StoreContent: React.FC = () => {
  const { isAdminOpen } = useStore();

  if (isAdminOpen) {
    return (
      <div className="min-h-screen bg-[#070707] text-[#F5F5F5]">
        <AdminDashboard />
        <ProductDetailModal />
        <Toast />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F5F5] selection:bg-[#F5F5F5] selection:text-[#050505] relative pb-14 md:pb-0">
      {/* Top Navbar */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      {/* Runway New Arrivals Carousel */}
      <NewArrivalsCarousel />

      {/* Editorial Category Campaigns (Men, Women, Patloons) */}
      <EditorialCollections />

      {/* Interactive Runway Lookbook with Shoppable Hotspots */}
      <LookbookHotspots />

      {/* Main Full-Archive Catalog with Filtering & Sorting */}
      <ShopCatalog />

      {/* Brand Manifesto & Atelier Philosophy */}
      <BrandManifesto />

      {/* Footer */}
      <Footer />

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomNav />

      {/* Interactive Modals & Drawers */}
      <ProductDetailModal />
      <CartDrawer />
      <CheckoutModal />
      <WishlistDrawer />
      <SearchOverlay />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <StoreContent />
    </StoreProvider>
  );
}
