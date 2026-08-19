export interface ProductColor {
  name: string;
  hex: string;
}

export type ProductCategory = 'ALL' | 'MEN' | 'WOMEN' | 'UNISEX' | 'KURTAS' | 'PATLOONS' | 'OUTERWEAR' | 'STREETWEAR';

export type ProductTag = 'NEW' | 'BESTSELLER' | 'LIMITED' | 'SALE' | 'EXCLUSIVE';

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  subtitle: string;
  price: number;
  originalPrice?: number;
  category: ProductCategory;
  gender: 'MEN' | 'WOMEN' | 'UNISEX';
  tag?: ProductTag;
  images: string[];
  description: string;
  details: string[];
  fabric: string;
  fit: string;
  sizes: string[];
  colors: ProductColor[];
  stock: number;
  rating: number;
  reviewsCount: number;
  sku: string;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  published: boolean;
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  selectedColor: ProductColor;
  quantity: number;
}

export type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';

export interface Order {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  paymentMethod: 'Cash on Delivery (COD)' | 'Debit / Credit Card' | 'Direct Bank Transfer';
  status: OrderStatus;
  date: string;
  trackingNumber?: string;
  notes?: string;
}

export interface LookbookHotspot {
  id: string;
  x: number; // percentage 0-100
  y: number;
  productId: string;
  label: string;
}

export interface LookbookLook {
  id: string;
  title: string;
  season: string;
  image: string;
  hotspots: LookbookHotspot[];
}

export interface OwnerAccount {
  id: string;
  username: string;
  password: string;
  name: string;
  role: 'MASTER_OWNER' | 'CO_OWNER' | 'STORE_MANAGER';
  createdAt: string;
  lastLogin?: string;
}
