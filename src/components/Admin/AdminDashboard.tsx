import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { Product, ProductCategory, OrderStatus, ProductColor, OwnerAccount } from '../../types';
import { REVENUE_ANALYTICS } from '../../data/products';
import { AdminLoginModal } from './AdminLoginModal';
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
  EyeOff,
  TrendingUp,
  DollarSign,
  Users,
  Sparkles,
  Key,
  ShieldCheck,
  Copy,
  LogOut,
  UserPlus,
  Share2,
  Lock,
  Check,
  Crown,
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
    isAdminAuthenticated,
    currentOwner,
    logoutAdmin,
    ownerAccounts,
    addOwnerAccount,
    updateOwnerPassword,
    deleteOwnerAccount,
    resetOwnerAccounts,
  } = useStore();

  const [activeTab, setActiveTab] = useState<'analytics' | 'products' | 'orders' | 'owners' | 'settings'>('analytics');
  const [productSearch, setProductSearch] = useState('');
  const [orderSearch, setOrderSearch] = useState('');
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  // Owners Tab State
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({});
  const [newOwnerName, setNewOwnerName] = useState('');
  const [newOwnerUsername, setNewOwnerUsername] = useState('');
  const [newOwnerPassword, setNewOwnerPassword] = useState('');
  const [newOwnerRole, setNewOwnerRole] = useState<'CO_OWNER' | 'STORE_MANAGER' | 'MASTER_OWNER'>('CO_OWNER');
  const [isAddOwnerModalOpen, setIsAddOwnerModalOpen] = useState(false);
  const [editingPasswordId, setEditingPasswordId] = useState<string | null>(null);
  const [changePasswordValue, setChangePasswordValue] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

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

  // If not authenticated, render login gate
  if (!isAdminAuthenticated) {
    return <AdminLoginModal />;
  }

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
      published: p.published,
    });
    setIsAddProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const images = formData.imagesText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const sizes = formData.sizesText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const productPayload = {
      name: formData.name,
      slug: formData.name.toLowerCase().replace(/\s+/g, '-'),
      subtitle: formData.subtitle || 'Atelier Signature Collection',
      price: Number(formData.price),
      originalPrice: Number(formData.originalPrice),
      category: formData.category,
      gender: formData.gender,
      tag: formData.tag,
      images: images.length > 0 ? images : ['https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=1200&auto=format&fit=crop'],
      description: formData.description,
      details: [
        'Signature Monolithic Cut',
        'Reinforced high-stress bar tacking',
        'Custom engraved matte metal hardware',
        'Dry clean or cold wash recommended',
      ],
      fabric: formData.fabric,
      fit: formData.fit,
      sizes: sizes.length > 0 ? sizes : ['S', 'M', 'L', 'XL'],
      colors: [
        { name: 'Obsidian Noir', hex: '#0B0B0B' },
        { name: 'Raw Slate', hex: '#333333' },
      ],
      stock: Number(formData.stock),
      rating: 4.9,
      reviewsCount: 12,
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

  const handleCreateOwner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOwnerUsername.trim() || !newOwnerPassword.trim()) {
      showToast('Please enter both username and password.');
      return;
    }

    addOwnerAccount({
      username: newOwnerUsername.trim().toLowerCase(),
      password: newOwnerPassword.trim(),
      name: newOwnerName.trim() || 'Co-Owner',
      role: newOwnerRole,
    });

    setNewOwnerName('');
    setNewOwnerUsername('');
    setNewOwnerPassword('');
    setIsAddOwnerModalOpen(false);
  };

  const handleCopyCredentials = (acc: OwnerAccount) => {
    const shareText = `THE PATLOON • OWNER PORTAL CREDENTIALS
Access URL: ${window.location.origin} (Click "Admin" in top bar)
Owner Name: ${acc.name}
Role: ${acc.role.replace('_', ' ')}
Username: ${acc.username}
Password: ${acc.password}

Please keep these credentials secure.`;

    navigator.clipboard.writeText(shareText);
    setCopiedId(acc.id);
    showToast(`Copied credentials for @${acc.username} to clipboard!`);
    setTimeout(() => setCopiedId(null), 3000);
  };

  const togglePasswordVisibility = (id: string) => {
    setShowPasswords((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div id="admin-dashboard" className="min-h-screen bg-[#070707] text-[#F5F5F5] flex flex-col md:flex-row">
      {/* Dark Sidebar */}
      <aside className="w-full md:w-64 bg-[#0D0D0D] border-b md:border-b-0 md:border-r border-[#242424] flex flex-col justify-between p-5">
        <div className="space-y-6">
          {/* Logo & Current Owner Session */}
          <div>
            <div className="flex items-center justify-between">
              <span className="font-display font-black text-lg tracking-[0.2em] text-[#F5F5F5]">
                PATLOON CMS
              </span>
              <span className="text-[9px] font-mono px-2 py-0.5 bg-[#181818] border border-green-800 text-green-400 uppercase">
                Active
              </span>
            </div>
            <div className="mt-2 p-2.5 bg-[#121212] border border-[#222222] font-mono text-[10px]">
              <p className="text-[#888888] uppercase">LOGGED IN AS:</p>
              <p className="text-[#F5F5F5] font-bold truncate">{currentOwner?.name || 'Owner'}</p>
              <p className="text-[#666666] text-[9px] uppercase tracking-wider">
                @{currentOwner?.username} • {currentOwner?.role}
              </p>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="space-y-1 text-xs font-mono">
            <button
              onClick={() => setActiveTab('analytics')}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 transition-all text-left cursor-pointer ${
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
              className={`w-full flex items-center space-x-3 px-3 py-2.5 transition-all text-left cursor-pointer ${
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
              className={`w-full flex items-center space-x-3 px-3 py-2.5 transition-all text-left cursor-pointer ${
                activeTab === 'orders'
                  ? 'bg-[#181818] text-[#F5F5F5] border-l-2 border-white font-bold'
                  : 'text-[#8A8A8A] hover:bg-[#121212] hover:text-[#F5F5F5]'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>ORDERS & DISPATCH ({orders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('owners')}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 transition-all text-left cursor-pointer ${
                activeTab === 'owners'
                  ? 'bg-[#181818] text-[#F5F5F5] border-l-2 border-white font-bold'
                  : 'text-[#8A8A8A] hover:bg-[#121212] hover:text-[#F5F5F5]'
              }`}
            >
              <Key className="w-4 h-4 text-[#E5C158]" />
              <span className="text-[#F5F5F5]">OWNER ACCESS & PASSWORDS ({ownerAccounts.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 transition-all text-left cursor-pointer ${
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

        {/* Action Controls: Storefront & Logout */}
        <div className="pt-6 border-t border-[#1C1C1C] space-y-2">
          <button
            onClick={() => setIsAdminOpen(false)}
            className="w-full py-2.5 bg-[#141414] hover:bg-[#F5F5F5] text-[#F5F5F5] hover:text-[#050505] border border-[#2B2B2B] text-xs font-mono font-bold tracking-widest uppercase flex items-center justify-center space-x-2 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>STOREFRONT</span>
          </button>

          <button
            onClick={logoutAdmin}
            className="w-full py-2.5 bg-red-950/30 hover:bg-red-900/50 text-red-300 border border-red-900/50 text-xs font-mono uppercase tracking-widest flex items-center justify-center space-x-2 transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>LOG OUT</span>
          </button>
        </div>
      </aside>

      {/* Main Admin Content Canvas */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto max-h-screen">
        {/* TAB 1: REVENUE & ANALYTICS */}
        {activeTab === 'analytics' && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#1C1C1C] gap-4">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#8A8A8A] uppercase">
                  ATELIER EXECUTIVE SUMMARY
                </span>
                <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#F5F5F5] uppercase">
                  FINANCIALS & DISPATCH
                </h1>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={handleOpenAdd}
                  className="px-4 py-2 bg-[#F5F5F5] text-[#050505] text-xs font-mono font-bold uppercase tracking-wider hover:bg-white flex items-center space-x-1.5 transition-all shadow-md cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ NEW SILHOUETTE</span>
                </button>
              </div>
            </div>

            {/* Metric KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 bg-[#121212] border border-[#242424] space-y-2">
                <div className="flex items-center justify-between text-[#8A8A8A] text-xs font-mono">
                  <span>TOTAL GROSS REVENUE</span>
                  <DollarSign className="w-4 h-4 text-green-400" />
                </div>
                <div className="text-2xl font-mono font-bold text-[#F5F5F5]">
                  Rs. {totalRevenue.toLocaleString()}
                </div>
                <div className="text-[10px] font-mono text-green-400 flex items-center space-x-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>+18.4% vs last billing cycle</span>
                </div>
              </div>

              <div className="p-5 bg-[#121212] border border-[#242424] space-y-2">
                <div className="flex items-center justify-between text-[#8A8A8A] text-xs font-mono">
                  <span>FULFILLED ORDERS</span>
                  <ShoppingBag className="w-4 h-4 text-blue-400" />
                </div>
                <div className="text-2xl font-mono font-bold text-[#F5F5F5]">
                  {totalOrdersCount}
                </div>
                <div className="text-[10px] font-mono text-[#8A8A8A]">
                  Across Lahore, Karachi, Islamabad & Overseas
                </div>
              </div>

              <div className="p-5 bg-[#121212] border border-[#242424] space-y-2">
                <div className="flex items-center justify-between text-[#8A8A8A] text-xs font-mono">
                  <span>AVERAGE BASKET (AOV)</span>
                  <Sparkles className="w-4 h-4 text-[#E5C158]" />
                </div>
                <div className="text-2xl font-mono font-bold text-[#F5F5F5]">
                  Rs. {avgOrderValue.toLocaleString()}
                </div>
                <div className="text-[10px] font-mono text-[#8A8A8A]">
                  2.4 garments per transaction
                </div>
              </div>

              <div className="p-5 bg-[#121212] border border-[#242424] space-y-2">
                <div className="flex items-center justify-between text-[#8A8A8A] text-xs font-mono">
                  <span>LOW INVENTORY ALERT</span>
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                </div>
                <div className="text-2xl font-mono font-bold text-red-400">
                  {lowStockProducts.length} Items
                </div>
                <div className="text-[10px] font-mono text-[#8A8A8A]">
                  Below 8 units in atelier warehouse
                </div>
              </div>
            </div>

            {/* Revenue Trend Visualizer */}
            <div className="p-6 bg-[#121212] border border-[#242424] space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-heading font-bold text-sm text-[#F5F5F5] uppercase">
                    ATELIER REVENUE TRAJECTORY (PKR)
                  </h3>
                  <p className="text-[11px] font-mono text-[#8A8A8A]">
                    Monthly revenue breakdown & seasonal sales spike
                  </p>
                </div>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={REVENUE_ANALYTICS} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#F5F5F5" stopOpacity={0.4} />
                        <stop offset="95%" stopColor="#F5F5F5" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" stroke="#444444" tick={{ fill: '#888888', fontSize: 11 }} />
                    <YAxis stroke="#444444" tick={{ fill: '#888888', fontSize: 11 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#0F0F0F',
                        borderColor: '#2F2F2F',
                        color: '#F5F5F5',
                        fontSize: '11px',
                        fontFamily: 'monospace',
                      }}
                      formatter={(val: any) => [`Rs. ${Number(val).toLocaleString()}`, 'Revenue']}
                    />
                    <Area type="monotone" dataKey="revenue" stroke="#F5F5F5" strokeWidth={2} fillOpacity={1} fill="url(#revenueGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCTS CMS */}
        {activeTab === 'products' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#1C1C1C] gap-4">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#8A8A8A] uppercase">
                  CATALOG & INVENTORY MANAGEMENT
                </span>
                <h1 className="font-heading font-extrabold text-2xl text-[#F5F5F5] uppercase">
                  ACTIVE GARMENT ARCHIVE ({products.length})
                </h1>
              </div>

              <button
                onClick={handleOpenAdd}
                className="px-4 py-2 bg-[#F5F5F5] text-[#050505] text-xs font-mono font-bold uppercase tracking-wider hover:bg-white flex items-center space-x-1.5 cursor-pointer shadow-md"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>+ ADD NEW SILHOUETTE</span>
              </button>
            </div>

            {/* Search Filter */}
            <div className="relative max-w-md">
              <Search className="w-4 h-4 text-[#8A8A8A] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                placeholder="Search by silhouette name, category, or SKU..."
                className="w-full bg-[#121212] border border-[#242424] pl-9 pr-3 py-2 text-xs font-mono text-[#F5F5F5] focus:outline-none focus:border-[#555555]"
              />
            </div>

            {/* Products Table */}
            <div className="bg-[#121212] border border-[#242424] overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-[#161616] text-[#8A8A8A] uppercase text-[10px] tracking-wider border-b border-[#242424]">
                  <tr>
                    <th className="p-4">SILHOUETTE</th>
                    <th className="p-4">CATEGORY</th>
                    <th className="p-4">PRICE</th>
                    <th className="p-4">STOCK</th>
                    <th className="p-4">SKU</th>
                    <th className="p-4 text-right">ACTIONS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1F1F1F]">
                  {products
                    .filter((p) =>
                      p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
                      p.category.toLowerCase().includes(productSearch.toLowerCase()) ||
                      p.sku.toLowerCase().includes(productSearch.toLowerCase())
                    )
                    .map((p) => (
                      <tr key={p.id} className="hover:bg-[#181818] transition-colors">
                        <td className="p-4">
                          <div className="flex items-center space-x-3">
                            <img
                              src={p.images[0]}
                              alt={p.name}
                              className="w-10 h-14 object-cover border border-[#242424]"
                            />
                            <div>
                              <p className="font-bold text-[#F5F5F5]">{p.name}</p>
                              <p className="text-[10px] text-[#8A8A8A]">{p.gender}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-[#A1A1A1]">{p.category}</td>
                        <td className="p-4 text-[#F5F5F5] font-bold">Rs. {p.price.toLocaleString()}</td>
                        <td className="p-4">
                          <span
                            className={`px-2 py-0.5 text-[10px] border ${
                              p.stock <= 5
                                ? 'bg-red-950/40 text-red-400 border-red-800'
                                : 'bg-[#181818] text-green-400 border-[#282828]'
                            }`}
                          >
                            {p.stock} units
                          </span>
                        </td>
                        <td className="p-4 text-[#8A8A8A]">{p.sku}</td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <button
                              onClick={() => setSelectedProduct(p)}
                              className="p-1.5 hover:bg-[#252525] text-[#A1A1A1] hover:text-white"
                              title="View on Storefront"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleOpenEdit(p)}
                              className="p-1.5 hover:bg-[#252525] text-[#A1A1A1] hover:text-white"
                              title="Edit Silhouette"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => deleteProduct(p.id)}
                              className="p-1.5 hover:bg-red-950 text-[#8A8A8A] hover:text-red-400"
                              title="Delete from Catalog"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: ORDERS & LOGISTICS */}
        {activeTab === 'orders' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#1C1C1C] gap-4">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#8A8A8A] uppercase">
                  DISPATCH & CLIENT PURCHASES
                </span>
                <h1 className="font-heading font-extrabold text-2xl text-[#F5F5F5] uppercase">
                  LOGISTICS DISPATCH ({orders.length})
                </h1>
              </div>
            </div>

            {/* Orders Search */}
            <div className="relative max-w-md">
              <Search className="w-4 h-4 text-[#8A8A8A] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={orderSearch}
                onChange={(e) => setOrderSearch(e.target.value)}
                placeholder="Search by client name, order ID, or city..."
                className="w-full bg-[#121212] border border-[#242424] pl-9 pr-3 py-2 text-xs font-mono text-[#F5F5F5] focus:outline-none focus:border-[#555555]"
              />
            </div>

            {/* Orders Feed */}
            <div className="space-y-4">
              {orders.map((ord) => (
                <div key={ord.id} className="p-5 bg-[#121212] border border-[#242424] space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#1F1F1F] gap-2">
                    <div>
                      <div className="flex items-center space-x-3">
                        <span className="font-mono font-bold text-sm text-[#F5F5F5]">{ord.id}</span>
                        <span className="text-[10px] font-mono text-[#8A8A8A]">{ord.date}</span>
                      </div>
                      <p className="text-xs text-[#A1A1A1] mt-0.5">
                        Client: <strong className="text-white">{ord.customerName}</strong> ({ord.city}) • {ord.phone}
                      </p>
                    </div>

                    <div className="flex items-center space-x-3">
                      <span className="text-xs font-mono font-bold text-[#F5F5F5]">
                        Rs. {ord.total.toLocaleString()}
                      </span>

                      {/* Status Selector */}
                      <select
                        value={ord.status}
                        onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                        className="bg-[#181818] border border-[#2E2E2E] px-2.5 py-1 text-[11px] font-mono text-[#F5F5F5] focus:outline-none"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
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

        {/* TAB 4: OWNER ACCESS & CREDENTIALS MANAGEMENT (GIVING TO OTHER OWNER) */}
        {activeTab === 'owners' && (
          <div className="space-y-8 animate-in fade-in duration-200 max-w-4xl">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#1C1C1C] gap-4">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#8A8A8A] uppercase">
                  SECURITY & MULTI-OWNER PASSWORDS
                </span>
                <h1 className="font-heading font-extrabold text-2xl text-[#F5F5F5] uppercase">
                  OWNER ACCESS & CREDENTIALS
                </h1>
                <p className="text-xs font-mono text-[#888888] mt-1">
                  Manage usernames and passwords to give to other owners and partners
                </p>
              </div>

              <button
                onClick={() => setIsAddOwnerModalOpen(true)}
                className="px-4 py-2.5 bg-[#F5F5F5] text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-white flex items-center space-x-2 transition-all cursor-pointer shadow-md"
              >
                <UserPlus className="w-4 h-4" />
                <span>+ ADD NEW OWNER</span>
              </button>
            </div>

            {/* Instruction Card for Sharing with Other Owner */}
            <div className="p-5 bg-[#101010] border border-[#262626] flex items-start space-x-4">
              <div className="p-2 bg-[#181818] border border-[#333333] mt-0.5">
                <Share2 className="w-5 h-5 text-[#E5C158]" />
              </div>
              <div className="text-xs font-mono space-y-1">
                <h4 className="font-bold text-[#F5F5F5] uppercase">HOW TO GIVE ACCESS TO ANOTHER OWNER:</h4>
                <p className="text-[#A1A1A1] leading-relaxed">
                  1. Click <strong>"Copy Access Info"</strong> on any owner account card below to automatically copy their exact login credentials and store link.
                </p>
                <p className="text-[#A1A1A1] leading-relaxed">
                  2. Send the copied details to your co-owner, partner, or store manager via message/email.
                </p>
                <p className="text-[#A1A1A1] leading-relaxed">
                  3. They open the app, click the <strong>"Admin"</strong> button in the top navigation bar, and log in with their username and password!
                </p>
              </div>
            </div>

            {/* Configured Owner Accounts List */}
            <div className="space-y-4">
              <h3 className="text-xs font-mono text-[#888888] uppercase tracking-widest">
                ACTIVE OWNER & PARTNER ACCOUNTS ({ownerAccounts.length})
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ownerAccounts.map((acc) => {
                  const isMasked = !showPasswords[acc.id];
                  const isCurrent = currentOwner?.id === acc.id;
                  const isRoot = acc.username.toLowerCase() === 'patloon';

                  return (
                    <div
                      key={acc.id}
                      className={`p-5 border transition-all space-y-4 font-mono ${
                        isRoot
                          ? 'bg-[#12130F] border-[#443C1D] shadow-lg shadow-black/40'
                          : isCurrent
                          ? 'border-green-800/80 bg-[#131513]'
                          : 'bg-[#121212] border-[#242424]'
                      }`}
                    >
                      {/* Top Header */}
                      <div className="flex items-center justify-between pb-3 border-b border-[#1F1F1F]">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-sm text-[#F5F5F5]">{acc.name}</span>
                            {isRoot && (
                              <span className="text-[9px] px-1.5 py-0.5 bg-[#E5C158]/20 text-[#E5C158] border border-[#E5C158]/60 uppercase font-bold flex items-center space-x-1">
                                <Crown className="w-2.5 h-2.5" />
                                <span>Master Admin</span>
                              </span>
                            )}
                            {isCurrent && !isRoot && (
                              <span className="text-[9px] px-1.5 py-0.5 bg-green-950 text-green-300 border border-green-800 uppercase font-bold">
                                You
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-[#777777] uppercase tracking-wider block mt-0.5">
                            Role: <strong className="text-[#AAAAAA]">{acc.role.replace('_', ' ')}</strong>
                            {isRoot && <span className="text-[#E5C158] ml-1.5 font-bold">• Protected Root Account</span>}
                          </span>
                        </div>

                        <span className="text-[9px] px-2 py-0.5 bg-[#181818] text-[#888888] border border-[#282828] uppercase">
                          Created {acc.createdAt}
                        </span>
                      </div>

                      {/* Username & Password Display */}
                      <div className="space-y-2 bg-[#0A0A0A] p-3 border border-[#1E1E1E] text-xs">
                        <div className="flex items-center justify-between">
                          <span className="text-[#777777] uppercase text-[10px]">Username:</span>
                          <span className="font-bold text-[#F5F5F5] selection:bg-white selection:text-black">
                            {acc.username}
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-[#777777] uppercase text-[10px]">Password:</span>
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-[#E5C158] font-mono">
                              {isMasked ? '••••••••••••' : acc.password}
                            </span>
                            <button
                              type="button"
                              onClick={() => togglePasswordVisibility(acc.id)}
                              className="text-[#666666] hover:text-white transition-colors cursor-pointer"
                              title={isMasked ? 'Show password' : 'Hide password'}
                            >
                              {isMasked ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="pt-2 flex items-center justify-between gap-2">
                        {/* Copy for other owner */}
                        <button
                          onClick={() => handleCopyCredentials(acc)}
                          className={`flex-1 py-2 px-3 text-[11px] font-bold uppercase tracking-wider flex items-center justify-center space-x-1.5 transition-all cursor-pointer ${
                            copiedId === acc.id
                              ? 'bg-green-900 text-green-200 border border-green-700'
                              : 'bg-[#F5F5F5] hover:bg-white text-black'
                          }`}
                        >
                          {copiedId === acc.id ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>COPIED!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>GIVE TO OWNER (COPY)</span>
                            </>
                          )}
                        </button>

                        {/* Change Password */}
                        <button
                          onClick={() => {
                            setEditingPasswordId(acc.id);
                            setChangePasswordValue(acc.password);
                          }}
                          className="p-2 bg-[#181818] hover:bg-[#222222] border border-[#282828] text-[#888888] hover:text-white text-[10px] uppercase cursor-pointer"
                          title="Change password"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>

                        {/* Delete Account */}
                        {!isRoot && ownerAccounts.length > 1 && (
                          <button
                            onClick={() => deleteOwnerAccount(acc.id)}
                            className="p-2 bg-[#181818] hover:bg-red-950 border border-[#282828] text-[#888888] hover:text-red-400 text-[10px] uppercase cursor-pointer"
                            title="Revoke access"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                        {isRoot && (
                          <div
                            className="p-2 bg-[#16140E] border border-[#3A3319] text-[#E5C158] text-[10px] uppercase flex items-center space-x-1 cursor-default"
                            title="Root Admin cannot be deleted"
                          >
                            <Lock className="w-3.5 h-3.5" />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Change Password Modal */}
            {editingPasswordId && (
              <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
                <div className="w-full max-w-sm bg-[#0E0E0E] border border-[#262626] p-6 space-y-4 font-mono text-xs shadow-2xl">
                  <h3 className="font-bold text-sm uppercase text-[#F5F5F5]">CHANGE OWNER PASSWORD</h3>
                  <div>
                    <label className="block text-[10px] text-[#888888] uppercase mb-1">New Password</label>
                    <input
                      type="text"
                      value={changePasswordValue}
                      onChange={(e) => setChangePasswordValue(e.target.value)}
                      className="w-full bg-[#161616] border border-[#2E2E2E] p-2.5 text-[#F5F5F5] focus:outline-none"
                    />
                  </div>
                  <div className="flex justify-end space-x-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setEditingPasswordId(null)}
                      className="px-4 py-2 bg-[#181818] text-[#888888] hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (changePasswordValue.trim()) {
                          updateOwnerPassword(editingPasswordId, changePasswordValue.trim());
                          setEditingPasswordId(null);
                        }
                      }}
                      className="px-4 py-2 bg-[#F5F5F5] text-black font-bold uppercase"
                    >
                      Update Password
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Provision New Owner Account Modal */}
            {isAddOwnerModalOpen && (
              <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
                <div className="w-full max-w-md bg-[#0E0E0E] border border-[#262626] p-6 sm:p-8 space-y-5 font-mono text-xs shadow-2xl">
                  <div className="flex items-center justify-between pb-3 border-b border-[#1F1F1F]">
                    <h3 className="font-bold text-sm uppercase text-[#F5F5F5] flex items-center space-x-2">
                      <UserPlus className="w-4 h-4" />
                      <span>CREATE OWNER CREDENTIALS</span>
                    </h3>
                    <button
                      onClick={() => setIsAddOwnerModalOpen(false)}
                      className="text-[#888888] hover:text-white"
                    >
                      ✕
                    </button>
                  </div>

                  <form onSubmit={handleCreateOwner} className="space-y-4">
                    <div>
                      <label className="block text-[10px] text-[#888888] uppercase mb-1">
                        Owner / Partner Name
                      </label>
                      <input
                        type="text"
                        required
                        value={newOwnerName}
                        onChange={(e) => setNewOwnerName(e.target.value)}
                        placeholder="e.g. Abdullah (Partner)"
                        className="w-full bg-[#161616] border border-[#2E2E2E] p-2.5 text-[#F5F5F5] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-[#888888] uppercase mb-1">
                        Username (for Login)
                      </label>
                      <input
                        type="text"
                        required
                        value={newOwnerUsername}
                        onChange={(e) => setNewOwnerUsername(e.target.value)}
                        placeholder="e.g. abdullah or partner2"
                        className="w-full bg-[#161616] border border-[#2E2E2E] p-2.5 text-[#F5F5F5] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-[#888888] uppercase mb-1">
                        Password
                      </label>
                      <input
                        type="text"
                        required
                        value={newOwnerPassword}
                        onChange={(e) => setNewOwnerPassword(e.target.value)}
                        placeholder="e.g. patloon_partner_2026"
                        className="w-full bg-[#161616] border border-[#2E2E2E] p-2.5 text-[#F5F5F5] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] text-[#888888] uppercase mb-1">
                        Role
                      </label>
                      <select
                        value={newOwnerRole}
                        onChange={(e) => setNewOwnerRole(e.target.value as any)}
                        className="w-full bg-[#161616] border border-[#2E2E2E] p-2.5 text-[#F5F5F5] focus:outline-none uppercase text-xs"
                      >
                        <option value="CO_OWNER">Co-Owner (Full Admin Access)</option>
                        <option value="STORE_MANAGER">Store Manager (Catalog & Dispatch)</option>
                        <option value="MASTER_OWNER">Master Owner</option>
                      </select>
                    </div>

                    <div className="flex justify-end space-x-2 pt-3 border-t border-[#1F1F1F]">
                      <button
                        type="button"
                        onClick={() => setIsAddOwnerModalOpen(false)}
                        className="px-4 py-2 bg-[#181818] text-[#888888] hover:text-white"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-[#F5F5F5] text-black font-bold uppercase"
                      >
                        Create & Save Owner
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 5: STORE SETTINGS & ANNOUNCEMENT TICKER */}
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
                className="px-6 py-2.5 bg-[#F5F5F5] text-[#050505] text-xs font-mono font-bold uppercase tracking-wider cursor-pointer"
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
                className="text-[#8A8A8A] hover:text-white cursor-pointer"
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
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#141414] border border-[#282828] p-2.5 text-[#F5F5F5] focus:outline-none focus:border-[#555555]"
                  />
                </div>

                <div>
                  <label className="block text-[#8A8A8A] mb-1 uppercase">SUBTITLE / TAGLINE</label>
                  <input
                    type="text"
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
                  <label className="block text-[#8A8A8A] mb-1 uppercase">ORIGINAL PRICE (PKR)</label>
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
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-[#8A8A8A] uppercase">IMAGES (PNG / JPG / WEBP OR URLS)</label>
                  <label className="text-[10px] text-[#F5F5F5] bg-[#1F1F1F] hover:bg-[#2A2A2A] px-2 py-1 border border-[#333333] cursor-pointer flex items-center space-x-1">
                    <span>UPLOAD PNG / PHOTO</span>
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp,image/gif"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (uploadEvent) => {
                            const result = uploadEvent.target?.result as string;
                            if (result) {
                              setFormData((prev) => ({
                                ...prev,
                                imagesText: prev.imagesText ? `${result}\n${prev.imagesText}` : result,
                              }));
                              showToast('Image uploaded successfully.');
                            }
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                </div>
                <textarea
                  rows={2}
                  value={formData.imagesText}
                  onChange={(e) => setFormData({ ...formData, imagesText: e.target.value })}
                  placeholder="Paste image URLs or click 'UPLOAD PNG / PHOTO'"
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
                  className="px-5 py-2.5 bg-[#181818] border border-[#282828] text-[#8A8A8A] hover:text-white cursor-pointer"
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
