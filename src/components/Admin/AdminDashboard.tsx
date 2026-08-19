import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Product, ProductCategory, OrderStatus, ProductColor } from '../../types';
import { REVENUE_ANALYTICS } from '../../data/products';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
} from 'recharts';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Megaphone,
  Plus,
  ArrowLeft,
  Search,
  CheckCircle,
  Clock,
  Truck,
  AlertTriangle,
  Trash2,
  Edit,
  Eye,
  TrendingUp,
  DollarSign,
  Users,
  Sparkles,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    orders,
    updateOrderStatus,
    announcementText,
    setAnnouncementText,
    setIsAdminOpen,
    setSelectedProduct,
    showToast,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'analytics' | 'products' | 'orders' | 'settings'>('analytics');
  const [productSearch, setProductSearch] = useState('');
  const [orderSearch, setOrderSearch] = useState('');
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  // New Product Form State
  const [formData, setFormData] = useState({
    name: '',
    subtitle: '',
    price: 4999,
    originalPrice: 6499,
    category: 'KURTAS' as ProductCategory,
    gender: 'MEN' as 'MEN' | 'WOMEN' | 'UNISEX',
    tag: 'NEW' as any,
    imagesText: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=1200&auto=format&fit=crop',
    description: '',
    fabric: '100% Egyptian Giza Cotton',
    fit: 'Structured Boxy Fit',
    sizesText: 'S, M, L, XL, XXL',
    stock: 20,
    sku: 'PAT-MN-KT99',
    published: true,
  });

  // Calculate high-level financial metrics
  const totalRevenue = orders.reduce((sum, ord) => sum + ord.total, 0) + 1484500;
  const totalOrdersCount = orders.length + 138;
  const avgOrderValue = Math.round(totalRevenue / totalOrdersCount);
  const lowStockProducts = products.filter((p) => p.stock <= 8);

  const handleOpenAdd = () => {
    setEditingProductId(null);
    setFormData({
      name: '',
      subtitle: '',
      price: 4999,
      originalPrice: 6499,
      category: 'KURTAS',
      gender: 'MEN',
      tag: 'NEW',
      imagesText: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=1200&auto=format&fit=crop',
      description: 'Handcrafted contemporary silhouette tailored with pure precision in our atelier.',
      fabric: '100% Egyptian Giza Cotton',
      fit: 'Structured Boxy Fit',
      sizesText: 'S, M, L, XL, XXL',
      stock: 20,
      sku: `PAT-MN-KT${Math.floor(10 + Math.random() * 90)}`,
      published: true,
    });
    setIsAddProductModalOpen(true);
  };

  const handleOpenEdit = (p: Product) => {
    setEditingProductId(p.id);
    setFormData({
      name: p.name,
      subtitle: p.subtitle,
      price: p.price,
      originalPrice: p.originalPrice || p.price,
      category: p.category,
      gender: p.gender,
      tag: p.tag || 'NEW',
      imagesText: p.images.join('\n'),
      description: p.description,
      fabric: p.fabric,
      fit: p.fit,
      sizesText: p.sizes.join(', '),
      stock: p.stock,
      sku: p.sku,
      published: p.published !== false,
    });
    setIsAddProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const imgs = formData.imagesText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const sizes = formData.sizesText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const productPayload = {
      name: formData.name,
      slug: formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      subtitle: formData.subtitle || 'Atelier Signature Silhouette',
      price: Number(formData.price),
      originalPrice: Number(formData.originalPrice),
      category: formData.category,
      gender: formData.gender,
      tag: formData.tag,
      images: imgs.length > 0 ? imgs : ['https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=1200&auto=format&fit=crop'],
      description: formData.description,
      details: [
        'Pure heavyweight architectural drape',
        'Laser-cut finish with concealed hardware',
        'Handcrafted in Pakistan Atelier',
      ],
      fabric: formData.fabric,
      fit: formData.fit,
      sizes: sizes.length > 0 ? sizes : ['S', 'M', 'L', 'XL'],
      colors: [{ name: 'Obsidian Noir', hex: '#0B0B0B' }],
      stock: Number(formData.stock),
      rating: 5.0,
      reviewsCount: 1,
      sku: formData.sku,
      published: formData.published,
    };

    if (editingProductId) {
      updateProduct(editingProductId, productPayload);
    } else {
      addProduct(productPayload);
    }

    setIsAddProductModalOpen(false);
  };

  return (
    <div id="admin-dashboard" className="min-h-screen bg-[#070707] text-[#F5F5F5] flex flex-col md:flex-row">
      {/* Dark Sidebar */}
      <aside className="w-full md:w-64 bg-[#0D0D0D] border-b md:border-b-0 md:border-r border-[#242424] flex flex-col justify-between p-5">
        <div className="space-y-6">
          {/* Logo & Portal Badge */}
          <div className="flex items-center justify-between">
            <div>
              <span className="font-display font-black text-lg tracking-[0.2em] text-[#F5F5F5]">
                PATLOON CMS
              </span>
              <span className="text-[10px] font-mono text-[#8A8A8A] block -mt-1">
                ATELIER OPERATIONS v2.4
              </span>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="space-y-1 text-xs font-mono">
            <button
              onClick={() => setActiveTab('analytics')}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 transition-all text-left ${
                activeTab === 'analytics'
                  ? 'bg-[#181818] text-[#F5F5F5] border-l-2 border-white font-bold'
                  : 'text-[#8A8A8A] hover:bg-[#121212] hover:text-[#F5F5F5]'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>REVENUE & ANALYTICS</span>
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 transition-all text-left ${
                activeTab === 'products'
                  ? 'bg-[#181818] text-[#F5F5F5] border-l-2 border-white font-bold'
                  : 'text-[#8A8A8A] hover:bg-[#121212] hover:text-[#F5F5F5]'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>PRODUCTS CMS ({products.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 transition-all text-left ${
                activeTab === 'orders'
                  ? 'bg-[#181818] text-[#F5F5F5] border-l-2 border-white font-bold'
                  : 'text-[#8A8A8A] hover:bg-[#121212] hover:text-[#F5F5F5]'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>ORDERS & DISPATCH ({orders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 transition-all text-left ${
                activeTab === 'settings'
                  ? 'bg-[#181818] text-[#F5F5F5] border-l-2 border-white font-bold'
                  : 'text-[#8A8A8A] hover:bg-[#121212] hover:text-[#F5F5F5]'
              }`}
            >
              <Megaphone className="w-4 h-4" />
              <span>TICKER & SETTINGS</span>
            </button>
          </nav>
        </div>

        {/* Return to Storefront CTA */}
        <div className="pt-6 border-t border-[#1C1C1C]">
          <button
            onClick={() => setIsAdminOpen(false)}
            className="w-full py-3 bg-[#141414] hover:bg-[#F5F5F5] text-[#F5F5F5] hover:text-[#050505] border border-[#2B2B2B] text-xs font-mono font-bold tracking-widest uppercase flex items-center justify-center space-x-2 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>EXIT TO STOREFRONT</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Content Area */}
      <main className="flex-1 p-6 sm:p-8 overflow-y-auto max-h-screen space-y-8 bg-[#070707]">
        {/* TAB 1: ANALYTICS & OVERVIEW */}
        {activeTab === 'analytics' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1C1C1C]">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#8A8A8A] uppercase">
                  FINANCIAL OVERVIEW & INTELLIGENCE
                </span>
                <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#F5F5F5] uppercase">
                  ATELIER REVENUE DASHBOARD
                </h1>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={handleOpenAdd}
                  className="px-4 py-2 bg-[#F5F5F5] text-[#050505] text-xs font-mono font-bold uppercase tracking-wider flex items-center space-x-1.5 hover:bg-white transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>NEW PRODUCT</span>
                </button>
              </div>
            </div>

            {/* KPI Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 bg-[#121212] border border-[#242424]">
                <div className="flex items-center justify-between text-xs font-mono text-[#8A8A8A]">
                  <span>TOTAL GROSS SALES</span>
                  <DollarSign className="w-4 h-4 text-[#F5F5F5]" />
                </div>
                <p className="text-2xl font-mono font-bold text-[#F5F5F5] mt-2">
                  Rs. {totalRevenue.toLocaleString()}
                </p>
                <div className="flex items-center space-x-1 text-[11px] font-mono text-green-400 mt-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>+28.4% vs last week</span>
                </div>
              </div>

              <div className="p-5 bg-[#121212] border border-[#242424]">
                <div className="flex items-center justify-between text-xs font-mono text-[#8A8A8A]">
                  <span>TOTAL ORDERS</span>
                  <ShoppingBag className="w-4 h-4 text-[#F5F5F5]" />
                </div>
                <p className="text-2xl font-mono font-bold text-[#F5F5F5] mt-2">
                  {totalOrdersCount}
                </p>
                <p className="text-[11px] font-mono text-[#8A8A8A] mt-1">
                  Across 12 Pakistani cities & UAE
                </p>
              </div>

              <div className="p-5 bg-[#121212] border border-[#242424]">
                <div className="flex items-center justify-between text-xs font-mono text-[#8A8A8A]">
                  <span>AVG. BASKET VALUE</span>
                  <Sparkles className="w-4 h-4 text-[#F5F5F5]" />
                </div>
                <p className="text-2xl font-mono font-bold text-[#F5F5F5] mt-2">
                  Rs. {avgOrderValue.toLocaleString()}
                </p>
                <p className="text-[11px] font-mono text-[#8A8A8A] mt-1">
                  1.8 pieces per checkout
                </p>
              </div>

              <div className="p-5 bg-[#121212] border border-[#242424]">
                <div className="flex items-center justify-between text-xs font-mono text-[#8A8A8A]">
                  <span>INVENTORY ALERTS</span>
                  <AlertTriangle className="w-4 h-4 text-[#E5C158]" />
                </div>
                <p className="text-2xl font-mono font-bold text-[#E5C158] mt-2">
                  {lowStockProducts.length} LOW STOCK
                </p>
                <p className="text-[11px] font-mono text-[#8A8A8A] mt-1">
                  Requires atelier restocking
                </p>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Revenue Area Chart */}
              <div className="lg:col-span-8 p-6 bg-[#121212] border border-[#242424]">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-heading font-bold text-sm text-[#F5F5F5] uppercase tracking-wider">
                      REVENUE TRAJECTORY (PKR)
                    </h3>
                    <p className="text-xs font-mono text-[#8A8A8A]">Last 7 days performance</p>
                  </div>
                  <span className="px-2.5 py-1 bg-[#1A1A1A] border border-[#2E2E2E] text-[10px] font-mono text-green-400">
                    LIVE ATELIER FEED
                  </span>
                </div>

                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={REVENUE_ANALYTICS} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#F5F5F5" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="#F5F5F5" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="date" stroke="#666666" fontSize={11} tickLine={false} />
                      <YAxis
                        stroke="#666666"
                        fontSize={11}
                        tickLine={false}
                        tickFormatter={(val) => `Rs.${(val / 1000).toFixed(0)}k`}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#0A0A0A',
                          borderColor: '#333333',
                          borderRadius: 0,
                          color: '#F5F5F5',
                          fontSize: '11px',
                          fontFamily: 'monospace',
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#F5F5F5"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorRevenue)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Order Volume Bar Chart */}
              <div className="lg:col-span-4 p-6 bg-[#121212] border border-[#242424]">
                <h3 className="font-heading font-bold text-sm text-[#F5F5F5] uppercase tracking-wider mb-1">
                  DAILY ORDERS
                </h3>
                <p className="text-xs font-mono text-[#8A8A8A] mb-6">Units booked per day</p>

                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={REVENUE_ANALYTICS} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <XAxis dataKey="date" stroke="#666666" fontSize={11} tickLine={false} />
                      <YAxis stroke="#666666" fontSize={11} tickLine={false} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#0A0A0A',
                          borderColor: '#333333',
                          color: '#F5F5F5',
                          fontSize: '11px',
                          fontFamily: 'monospace',
                        }}
                      />
                      <Bar dataKey="orders" fill="#A1A1A1" radius={[2, 2, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Inventory Alerts & Top Products */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Low Stock Alerts */}
              <div className="p-6 bg-[#121212] border border-[#242424]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-heading font-bold text-sm text-[#F5F5F5] uppercase tracking-wider flex items-center space-x-2">
                    <AlertTriangle className="w-4 h-4 text-[#E5C158]" />
                    <span>LOW INVENTORY RESTOCK QUEUE</span>
                  </h3>
                </div>

                <div className="space-y-3">
                  {lowStockProducts.map((p) => (
                    <div key={p.id} className="flex items-center justify-between p-3 bg-[#171717] border border-[#262626]">
                      <div className="flex items-center space-x-3">
                        <img src={p.images[0]} alt={p.name} className="w-10 h-12 object-cover bg-black" />
                        <div>
                          <p className="text-xs font-heading font-bold text-[#F5F5F5] uppercase">{p.name}</p>
                          <p className="text-[10px] font-mono text-[#8A8A8A]">{p.sku}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="px-2 py-0.5 bg-[#2B1B10] text-[#E5C158] text-[10px] font-mono border border-[#4D3319]">
                          {p.stock} REMAINING
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Orders Stream */}
              <div className="p-6 bg-[#121212] border border-[#242424]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-heading font-bold text-sm text-[#F5F5F5] uppercase tracking-wider">
                    RECENT CLIENT ORDERS
                  </h3>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-xs font-mono text-[#8A8A8A] hover:text-[#F5F5F5]"
                  >
                    VIEW ALL →
                  </button>
                </div>

                <div className="space-y-3">
                  {orders.slice(0, 4).map((ord) => (
                    <div key={ord.id} className="flex items-center justify-between p-3 bg-[#171717] border border-[#262626] text-xs font-mono">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-[#F5F5F5] font-bold">{ord.id}</span>
                          <span className="text-[#8A8A8A]">({ord.customerName})</span>
                        </div>
                        <p className="text-[10px] text-[#666666] mt-0.5">{ord.city}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-[#F5F5F5]">Rs. {ord.total.toLocaleString()}</p>
                        <span className="text-[9px] text-[#A1A1A1]">{ord.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCTS CMS */}
        {activeTab === 'products' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1C1C1C]">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#8A8A8A] uppercase">
                  CATALOG & SILHOUETTE MANAGEMENT
                </span>
                <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#F5F5F5] uppercase">
                  PRODUCTS CMS ({products.length})
                </h1>
              </div>

              <button
                onClick={handleOpenAdd}
                className="px-5 py-3 bg-[#F5F5F5] text-[#050505] text-xs font-mono font-bold uppercase tracking-wider flex items-center space-x-2 hover:bg-white transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>+ ADD PRODUCT</span>
              </button>
            </div>

            {/* Search filter in CMS */}
            <div className="relative">
              <Search className="w-4 h-4 text-[#666666] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="SEARCH CATALOG BY NAME, SKU, OR CATEGORY..."
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                className="w-full bg-[#111111] border border-[#242424] pl-10 pr-4 py-2.5 text-xs font-mono text-[#F5F5F5] focus:outline-none focus:border-[#555555] uppercase"
              />
            </div>

            {/* Products Table */}
            <div className="bg-[#121212] border border-[#242424] overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#181818] text-[#8A8A8A] border-b border-[#242424]">
                  <tr>
                    <th className="p-3.5">GARMENT</th>
                    <th className="p-3.5">CATEGORY</th>
                    <th className="p-3.5">PRICE</th>
                    <th className="p-3.5">STOCK</th>
                    <th className="p-3.5">TAG</th>
                    <th className="p-3.5 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1C1C1C]">
                  {products
                    .filter((p) =>
                      productSearch
                        ? p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
                          p.sku.toLowerCase().includes(productSearch.toLowerCase()) ||
                          p.category.toLowerCase().includes(productSearch.toLowerCase())
                        : true
                    )
                    .map((p) => (
                      <tr key={p.id} className="hover:bg-[#161616] transition-colors">
                        <td className="p-3.5 flex items-center space-x-3">
                          <img
                            src={p.images[0]}
                            alt={p.name}
                            className="w-10 h-14 object-cover bg-black border border-[#222222]"
                          />
                          <div>
                            <p className="font-heading font-bold text-xs text-[#F5F5F5] uppercase">
                              {p.name}
                            </p>
                            <p className="text-[10px] text-[#777777]">{p.sku}</p>
                          </div>
                        </td>
                        <td className="p-3.5 text-[#A1A1A1]">{p.category}</td>
                        <td className="p-3.5 font-bold text-[#F5F5F5]">
                          Rs. {p.price.toLocaleString()}
                        </td>
                        <td className="p-3.5">
                          <span
                            className={`px-2 py-0.5 text-[10px] border ${
                              p.stock <= 5
                                ? 'bg-red-950/40 text-red-400 border-red-900'
                                : 'bg-[#181818] text-[#C5C5C5] border-[#2A2A2A]'
                            }`}
                          >
                            {p.stock} UNITS
                          </span>
                        </td>
                        <td className="p-3.5">
                          {p.tag ? (
                            <span className="px-2 py-0.5 bg-[#181818] text-[#F5F5F5] border border-[#2D2D2D] text-[9px]">
                              {p.tag}
                            </span>
                          ) : (
                            <span className="text-[#555555]">-</span>
                          )}
                        </td>
                        <td className="p-3.5 text-right space-x-2">
                          <button
                            onClick={() => {
                              setSelectedProduct(p);
                              setIsAdminOpen(false);
                            }}
                            className="p-1.5 text-[#8A8A8A] hover:text-white bg-[#1A1A1A] hover:bg-[#252525]"
                            title="Live Store Preview"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleOpenEdit(p)}
                            className="p-1.5 text-[#8A8A8A] hover:text-white bg-[#1A1A1A] hover:bg-[#252525]"
                            title="Edit Garment"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Remove "${p.name}" from catalog?`)) {
                                deleteProduct(p.id);
                              }
                            }}
                            className="p-1.5 text-[#8A8A8A] hover:text-red-400 bg-[#1A1A1A] hover:bg-[#252525]"
                            title="Delete Garment"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: ORDERS MANAGEMENT CMS */}
        {activeTab === 'orders' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="pb-4 border-b border-[#1C1C1C]">
              <span className="text-[10px] font-mono tracking-widest text-[#8A8A8A] uppercase">
                LOGISTICS & TCS FULFILLMENT
              </span>
              <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#F5F5F5] uppercase">
                DISPATCH & ORDERS CMS ({orders.length})
              </h1>
            </div>

            {/* Orders Stream */}
            <div className="space-y-4">
              {orders.map((ord) => (
                <div key={ord.id} className="bg-[#121212] border border-[#242424] p-5 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#1F1F1F] gap-2">
                    <div className="flex items-center space-x-3">
                      <span className="font-mono text-sm font-bold text-[#F5F5F5]">{ord.id}</span>
                      <span className="text-xs font-mono text-[#8A8A8A]">{ord.date}</span>
                    </div>

                    {/* Status Changer Buttons */}
                    <div className="flex items-center space-x-1.5 text-xs font-mono">
                      {(['Pending', 'Processing', 'Shipped', 'Delivered'] as OrderStatus[]).map((st) => (
                        <button
                          key={st}
                          onClick={() => updateOrderStatus(ord.id, st)}
                          className={`px-2.5 py-1 uppercase text-[10px] tracking-wider transition-all border ${
                            ord.status === st
                              ? 'bg-[#F5F5F5] text-[#050505] font-bold border-white'
                              : 'bg-[#181818] text-[#8A8A8A] border-[#2A2A2A] hover:text-[#F5F5F5]'
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
                    <div>
                      <span className="text-[10px] text-[#777777] uppercase">CLIENT INFO</span>
                      <p className="font-bold text-[#F5F5F5] mt-0.5">{ord.customerName}</p>
                      <p className="text-[#A1A1A1]">{ord.phone}</p>
                      <p className="text-[#A1A1A1]">{ord.email}</p>
                    </div>

                    <div>
                      <span className="text-[10px] text-[#777777] uppercase">DESTINATION & METHOD</span>
                      <p className="text-[#F5F5F5] font-bold mt-0.5">{ord.city}</p>
                      <p className="text-[#A1A1A1]">{ord.address}</p>
                      <p className="text-[#8A8A8A] mt-1">Payment: <strong className="text-[#F5F5F5]">{ord.paymentMethod}</strong></p>
                    </div>

                    <div>
                      <span className="text-[10px] text-[#777777] uppercase">DISPATCH TRACKING</span>
                      <p className="text-[#F5F5F5] font-mono mt-0.5">{ord.trackingNumber || 'Pending allocation'}</p>
                      <p className="text-sm font-bold text-[#F5F5F5] mt-2">
                        TOTAL: Rs. {ord.total.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Items list */}
                  <div className="pt-2 border-t border-[#1A1A1A] flex flex-wrap gap-3">
                    {ord.items.map((item, idx) => (
                      <div key={idx} className="flex items-center space-x-2 bg-[#171717] px-2.5 py-1.5 border border-[#242424] text-[11px] font-mono">
                        <span className="text-[#F5F5F5] font-bold">{item.product.name}</span>
                        <span className="text-[#8A8A8A]">({item.selectedSize} / Qty: {item.quantity})</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: STORE SETTINGS & ANNOUNCEMENT TICKER */}
        {activeTab === 'settings' && (
          <div className="space-y-6 max-w-2xl animate-in fade-in duration-200">
            <div className="pb-4 border-b border-[#1C1C1C]">
              <span className="text-[10px] font-mono tracking-widest text-[#8A8A8A] uppercase">
                COMMUNICATIONS & BRAND SETTINGS
              </span>
              <h1 className="font-heading font-extrabold text-2xl text-[#F5F5F5] uppercase">
                TICKER & ATELIER SETTINGS
              </h1>
            </div>

            <div className="p-6 bg-[#121212] border border-[#242424] space-y-4">
              <label className="block text-xs font-mono text-[#A1A1A1] uppercase">
                LIVE TOP ANNOUNCEMENT TICKER MESSAGE
              </label>
              <textarea
                rows={3}
                value={announcementText}
                onChange={(e) => setAnnouncementText(e.target.value)}
                className="w-full bg-[#181818] border border-[#2E2E2E] p-3 text-xs font-mono text-[#F5F5F5] focus:outline-none focus:border-[#555555]"
              />
              <button
                onClick={() => showToast('Ticker banner updated live!')}
                className="px-6 py-2.5 bg-[#F5F5F5] text-[#050505] text-xs font-mono font-bold uppercase tracking-wider"
              >
                SAVE TICKER CHANGES
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Add / Edit Product Modal */}
      {isAddProductModalOpen && (
        <div
          className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={() => setIsAddProductModalOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl bg-[#0C0C0C] border border-[#282828] p-6 sm:p-8 space-y-6 shadow-2xl my-auto max-h-[92vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between pb-3 border-b border-[#1F1F1F]">
              <h3 className="font-heading font-bold text-lg text-[#F5F5F5] uppercase">
                {editingProductId ? 'EDIT SILHOUETTE' : '+ PUBLISH NEW SILHOUETTE'}
              </h3>
              <button
                onClick={() => setIsAddProductModalOpen(false)}
                className="text-[#8A8A8A] hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs font-mono">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#8A8A8A] mb-1 uppercase">PRODUCT NAME *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. MONOLITH EMBROIDERED KURTA"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#141414] border border-[#282828] p-2.5 text-[#F5F5F5] focus:outline-none focus:border-[#555555]"
                  />
                </div>

                <div>
                  <label className="block text-[#8A8A8A] mb-1 uppercase">SUBTITLE</label>
                  <input
                    type="text"
                    placeholder="e.g. Pure Matte Egyptian Cotton"
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    className="w-full bg-[#141414] border border-[#282828] p-2.5 text-[#F5F5F5] focus:outline-none focus:border-[#555555]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[#8A8A8A] mb-1 uppercase">PRICE (PKR) *</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full bg-[#141414] border border-[#282828] p-2.5 text-[#F5F5F5] focus:outline-none focus:border-[#555555]"
                  />
                </div>

                <div>
                  <label className="block text-[#8A8A8A] mb-1 uppercase">SALE/ORIGINAL PRICE</label>
                  <input
                    type="number"
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                    className="w-full bg-[#141414] border border-[#282828] p-2.5 text-[#F5F5F5] focus:outline-none focus:border-[#555555]"
                  />
                </div>

                <div>
                  <label className="block text-[#8A8A8A] mb-1 uppercase">STOCK COUNT</label>
                  <input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                    className="w-full bg-[#141414] border border-[#282828] p-2.5 text-[#F5F5F5] focus:outline-none focus:border-[#555555]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[#8A8A8A] mb-1 uppercase">CATEGORY</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full bg-[#141414] border border-[#282828] p-2.5 text-[#F5F5F5] focus:outline-none focus:border-[#555555]"
                  >
                    <option value="KURTAS">KURTAS</option>
                    <option value="PATLOONS">PATLOONS (TROUSERS)</option>
                    <option value="OUTERWEAR">OUTERWEAR / SHERWANIS</option>
                    <option value="STREETWEAR">STREETWEAR & TEES</option>
                    <option value="WOMEN">WOMEN COUTURE</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#8A8A8A] mb-1 uppercase">GENDER</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                    className="w-full bg-[#141414] border border-[#282828] p-2.5 text-[#F5F5F5] focus:outline-none focus:border-[#555555]"
                  >
                    <option value="MEN">MEN</option>
                    <option value="WOMEN">WOMEN</option>
                    <option value="UNISEX">UNISEX</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#8A8A8A] mb-1 uppercase">LABEL TAG</label>
                  <select
                    value={formData.tag}
                    onChange={(e) => setFormData({ ...formData, tag: e.target.value as any })}
                    className="w-full bg-[#141414] border border-[#282828] p-2.5 text-[#F5F5F5] focus:outline-none focus:border-[#555555]"
                  >
                    <option value="NEW">NEW</option>
                    <option value="BESTSELLER">BESTSELLER</option>
                    <option value="LIMITED">LIMITED</option>
                    <option value="SALE">SALE</option>
                    <option value="EXCLUSIVE">EXCLUSIVE</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#8A8A8A] mb-1 uppercase">IMAGE URLS (ONE PER LINE)</label>
                <textarea
                  rows={2}
                  value={formData.imagesText}
                  onChange={(e) => setFormData({ ...formData, imagesText: e.target.value })}
                  className="w-full bg-[#141414] border border-[#282828] p-2.5 text-[#F5F5F5] focus:outline-none focus:border-[#555555]"
                />
              </div>

              <div>
                <label className="block text-[#8A8A8A] mb-1 uppercase">DESCRIPTION</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-[#141414] border border-[#282828] p-2.5 text-[#F5F5F5] focus:outline-none focus:border-[#555555]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#8A8A8A] mb-1 uppercase">FABRIC SPECS</label>
                  <input
                    type="text"
                    value={formData.fabric}
                    onChange={(e) => setFormData({ ...formData, fabric: e.target.value })}
                    className="w-full bg-[#141414] border border-[#282828] p-2.5 text-[#F5F5F5] focus:outline-none focus:border-[#555555]"
                  />
                </div>

                <div>
                  <label className="block text-[#8A8A8A] mb-1 uppercase">AVAILABLE SIZES (COMMA SEPARATED)</label>
                  <input
                    type="text"
                    value={formData.sizesText}
                    onChange={(e) => setFormData({ ...formData, sizesText: e.target.value })}
                    className="w-full bg-[#141414] border border-[#282828] p-2.5 text-[#F5F5F5] focus:outline-none focus:border-[#555555]"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-[#1F1F1F] flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsAddProductModalOpen(false)}
                  className="px-5 py-2.5 bg-[#181818] border border-[#282828] text-[#8A8A8A] hover:text-white"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#F5F5F5] text-[#050505] font-bold uppercase tracking-wider hover:bg-white cursor-pointer"
                >
                  {editingProductId ? 'UPDATE GARMENT' : 'PUBLISH TO CATALOG'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
