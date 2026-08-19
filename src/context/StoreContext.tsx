import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, OrderStatus, ProductCategory, ProductColor } from '../types';
import { INITIAL_PRODUCTS, INITIAL_ORDERS } from '../data/products';

interface StoreContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => Product;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  replaceProductImage: (productId: string, imageIndex: number, dataUrl: string) => void;
  cart: CartItem[];
  addToCart: (product: Product, size: string, color: ProductColor, qty?: number) => void;
  removeFromCart: (index: number) => void;
  updateCartQuantity: (index: number, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (p: Product | null) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  activeCategory: ProductCategory;
  setActiveCategory: (cat: ProductCategory) => void;
  activeGenderFilter: 'ALL' | 'MEN' | 'WOMEN' | 'UNISEX';
  setActiveGenderFilter: (gender: 'ALL' | 'MEN' | 'WOMEN' | 'UNISEX') => void;
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'date'>) => Order;
  updateOrderStatus: (id: string, status: OrderStatus, trackingNumber?: string) => void;
  announcementText: string;
  setAnnouncementText: (text: string) => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isImageManagerOpen: boolean;
  setIsImageManagerOpen: (open: boolean) => void;
  siteImageOverrides: Record<string, string>;
  setSiteImageOverride: (key: string, dataUrl: string) => void;
  getSiteImage: (key: string, fallbackUrl: string) => string;
  resetSiteImages: () => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY_PRODUCTS = 'patloon_products_v2';
const LOCAL_STORAGE_KEY_CART = 'patloon_cart_v2';
const LOCAL_STORAGE_KEY_WISHLIST = 'patloon_wishlist_v2';
const LOCAL_STORAGE_KEY_ORDERS = 'patloon_orders_v2';
const LOCAL_STORAGE_KEY_ANNOUNCEMENT = 'patloon_announcement_v2';
const LOCAL_STORAGE_KEY_IMAGES = 'patloon_site_images_v2';

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Products State
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_PRODUCTS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved products', e);
      }
    }
    return INITIAL_PRODUCTS;
  });

  // Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_CART);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse cart', e);
      }
    }
    return [];
  });

  // Wishlist State
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_WISHLIST);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse wishlist', e);
      }
    }
    return [INITIAL_PRODUCTS[0], INITIAL_PRODUCTS[2]];
  });

  // Orders State
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_ORDERS);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse orders', e);
      }
    }
    return INITIAL_ORDERS;
  });

  // Announcement bar
  const [announcementText, setAnnouncementText] = useState<string>(() => {
    return localStorage.getItem(LOCAL_STORAGE_KEY_ANNOUNCEMENT) || 
      'WORLDWIDE EXPRESS SHIPPING • COMPLIMENTARY DELIVERY OVER RS. 10,000 • USE CODE PATLOON10 FOR 10% OFF';
  });

  // Site Image Overrides (for Hero, Lookbook, Collections, etc. uploaded via PNG)
  const [siteImageOverrides, setSiteImageOverrides] = useState<Record<string, string>>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY_IMAGES);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved images', e);
      }
    }
    return {};
  });

  // UI Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isImageManagerOpen, setIsImageManagerOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('ALL');
  const [activeGenderFilter, setActiveGenderFilter] = useState<'ALL' | 'MEN' | 'WOMEN' | 'UNISEX'>('ALL');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_CART, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_WISHLIST, JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_ANNOUNCEMENT, announcementText);
  }, [announcementText]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY_IMAGES, JSON.stringify(siteImageOverrides));
  }, [siteImageOverrides]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3200);
  };

  const setSiteImageOverride = (key: string, dataUrl: string) => {
    setSiteImageOverrides((prev) => ({
      ...prev,
      [key]: dataUrl,
    }));
    showToast(`Image updated with PNG file successfully`);
  };

  const getSiteImage = (key: string, fallbackUrl: string): string => {
    return siteImageOverrides[key] || fallbackUrl;
  };

  const resetSiteImages = () => {
    setSiteImageOverrides({});
    localStorage.removeItem(LOCAL_STORAGE_KEY_IMAGES);
    showToast(`Images reset to defaults`);
  };

  // Cart operations
  const addToCart = (product: Product, size: string, color: ProductColor, qty: number = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === size && item.selectedColor.name === color.name
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += qty;
        return updated;
      } else {
        return [...prev, { product, selectedSize: size, selectedColor: color, quantity: qty }];
      }
    });
    showToast(`Added ${product.name} (${size}) to bag`);
    setIsCartOpen(true);
  };

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const updateCartQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(index);
      return;
    }
    setCart((prev) => {
      const updated = [...prev];
      updated[index].quantity = quantity;
      return updated;
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Wishlist operations
  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        showToast(`Removed from Wishlist`);
        return prev.filter((p) => p.id !== product.id);
      } else {
        showToast(`Saved ${product.name} to Wishlist`);
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((p) => p.id === productId);
  };

  // Product CMS operations
  const addProduct = (productData: Omit<Product, 'id'>): Product => {
    const newId = `pat-${Date.now().toString().slice(-4)}`;
    const newProduct: Product = {
      ...productData,
      id: newId,
    };
    setProducts((prev) => [newProduct, ...prev]);
    showToast(`Garment "${newProduct.name}" published to catalog`);
    return newProduct;
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
    if (selectedProduct && selectedProduct.id === id) {
      setSelectedProduct((prev) => (prev ? { ...prev, ...updates } : null));
    }
    showToast(`Garment updated successfully`);
  };

  const replaceProductImage = (productId: string, imageIndex: number, dataUrl: string) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id !== productId) return p;
        const newImages = [...p.images];
        if (imageIndex < newImages.length) {
          newImages[imageIndex] = dataUrl;
        } else {
          newImages.push(dataUrl);
        }
        return { ...p, images: newImages };
      })
    );
    if (selectedProduct && selectedProduct.id === productId) {
      setSelectedProduct((prev) => {
        if (!prev) return null;
        const newImages = [...prev.images];
        if (imageIndex < newImages.length) {
          newImages[imageIndex] = dataUrl;
        } else {
          newImages.push(dataUrl);
        }
        return { ...prev, images: newImages };
      });
    }
    showToast(`Product image replaced with PNG`);
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast(`Product removed from catalog`);
  };

  // Order operations
  const createOrder = (orderData: Omit<Order, 'id' | 'date'>): Order => {
    const newOrder: Order = {
      ...orderData,
      id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      }),
      trackingNumber: `PAT-PK-${Math.floor(1000000 + Math.random() * 9000000)}`,
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (id: string, status: OrderStatus, trackingNumber?: string) => {
    setOrders((prev) =>
      prev.map((ord) =>
        ord.id === id ? { ...ord, status, ...(trackingNumber ? { trackingNumber } : {}) } : ord
      )
    );
    showToast(`Order ${id} marked as ${status}`);
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        replaceProductImage,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotal,
        cartCount,
        isCartOpen,
        setIsCartOpen,
        wishlist,
        toggleWishlist,
        isInWishlist,
        isWishlistOpen,
        setIsWishlistOpen,
        selectedProduct,
        setSelectedProduct,
        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        setSearchQuery,
        activeCategory,
        setActiveCategory,
        activeGenderFilter,
        setActiveGenderFilter,
        orders,
        createOrder,
        updateOrderStatus,
        announcementText,
        setAnnouncementText,
        isAdminOpen,
        setIsAdminOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isImageManagerOpen,
        setIsImageManagerOpen,
        siteImageOverrides,
        setSiteImageOverride,
        getSiteImage,
        resetSiteImages,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
