import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { X, Upload, Check, RefreshCw, Image as ImageIcon, Sparkles, Layers } from 'lucide-react';
import { LOOKBOOK_LOOKS } from '../data/products';

export const ImageManagerModal: React.FC = () => {
  const {
    isImageManagerOpen,
    setIsImageManagerOpen,
    products,
    replaceProductImage,
    siteImageOverrides,
    setSiteImageOverride,
    resetSiteImages,
    showToast,
  } = useStore();

  const [selectedTarget, setSelectedTarget] = useState<'product' | 'campaign' | 'lookbook'>('product');
  const [selectedProductId, setSelectedProductId] = useState<string>(products[0]?.id || '');
  const [selectedProductImageIndex, setSelectedProductImageIndex] = useState<number>(0);
  const [selectedCampaignKey, setSelectedCampaignKey] = useState<string>('hero-main');
  const [selectedLookbookKey, setSelectedLookbookKey] = useState<string>('lookbook-1');

  const [previewDataUrl, setPreviewDataUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');

  if (!isImageManagerOpen) return null;

  const currentProduct = products.find((p) => p.id === selectedProductId) || products[0];

  const campaignOptions = [
    { key: 'hero-main', label: 'Main Runway Hero Model (Desktop / Banner)' },
    { key: 'men-campaign', label: 'Collection 01 // Men Editorial Hero' },
    { key: 'women-campaign', label: 'Collection 02 // Women Editorial Banner' },
    { key: 'patloons-campaign', label: 'Iconic Architecture // Patloons Banner' },
  ];

  const lookbookOptions = [
    { key: 'lookbook-1', label: 'Lookbook Look 01: Shadow Nomad' },
    { key: 'lookbook-2', label: 'Lookbook Look 02: Cyber Velvet' },
    { key: 'lookbook-3', label: 'Lookbook Look 03: Monolith Trench' },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setPreviewDataUrl(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleApplyImage = () => {
    if (!previewDataUrl) {
      showToast('Please select or upload a PNG file first.');
      return;
    }

    if (selectedTarget === 'product' && currentProduct) {
      replaceProductImage(currentProduct.id, selectedProductImageIndex, previewDataUrl);
      showToast(`Replaced image for ${currentProduct.name} with ${fileName || 'PNG'}`);
    } else if (selectedTarget === 'campaign') {
      setSiteImageOverride(selectedCampaignKey, previewDataUrl);
      showToast(`Updated campaign visual with ${fileName || 'PNG'}`);
    } else if (selectedTarget === 'lookbook') {
      setSiteImageOverride(selectedLookbookKey, previewDataUrl);
      showToast(`Updated lookbook canvas with ${fileName || 'PNG'}`);
    }

    setPreviewDataUrl(null);
    setFileName('');
  };

  return (
    <div
      id="image-manager-modal-overlay"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={() => setIsImageManagerOpen(false)}
    >
      <div
        id="image-manager-modal"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-[#090909] border border-[#242424] shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#242424] bg-[#0C0C0C]">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[#141414] border border-[#242424]">
              <ImageIcon className="w-4 h-4 text-[#F5F5F5]" />
            </div>
            <div>
              <h3 className="font-heading font-black text-sm uppercase tracking-widest text-[#F5F5F5]">
                PNG IMAGE REPLACER & ASSET MANAGER
              </h3>
              <p className="text-[10px] font-mono text-[#777777] uppercase tracking-wider">
                Swap any product, hero, or campaign image with a local PNG file
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsImageManagerOpen(false)}
            className="p-1.5 text-[#888888] hover:text-[#F5F5F5] hover:bg-[#181818] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-8 text-xs font-mono">
          {/* Left Column: Target Selector (6 Cols) */}
          <div className="lg:col-span-6 space-y-6">
            {/* Step 1: Target category selector */}
            <div>
              <label className="block text-[10px] text-[#888888] uppercase tracking-widest mb-2">
                1. SELECT WHERE TO CHANGE IMAGE
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => {
                    setSelectedTarget('product');
                    setPreviewDataUrl(null);
                  }}
                  className={`py-2 px-3 border uppercase tracking-wider text-center transition-all cursor-pointer ${
                    selectedTarget === 'product'
                      ? 'bg-[#F5F5F5] text-black border-[#F5F5F5] font-bold'
                      : 'bg-[#111111] text-[#888888] border-[#242424] hover:text-white'
                  }`}
                >
                  Product
                </button>
                <button
                  onClick={() => {
                    setSelectedTarget('campaign');
                    setPreviewDataUrl(null);
                  }}
                  className={`py-2 px-3 border uppercase tracking-wider text-center transition-all cursor-pointer ${
                    selectedTarget === 'campaign'
                      ? 'bg-[#F5F5F5] text-black border-[#F5F5F5] font-bold'
                      : 'bg-[#111111] text-[#888888] border-[#242424] hover:text-white'
                  }`}
                >
                  Campaign/Hero
                </button>
                <button
                  onClick={() => {
                    setSelectedTarget('lookbook');
                    setPreviewDataUrl(null);
                  }}
                  className={`py-2 px-3 border uppercase tracking-wider text-center transition-all cursor-pointer ${
                    selectedTarget === 'lookbook'
                      ? 'bg-[#F5F5F5] text-black border-[#F5F5F5] font-bold'
                      : 'bg-[#111111] text-[#888888] border-[#242424] hover:text-white'
                  }`}
                >
                  Lookbook
                </button>
              </div>
            </div>

            {/* Target Details */}
            {selectedTarget === 'product' && (
              <div className="space-y-4 p-4 bg-[#0E0E0E] border border-[#242424]">
                <div>
                  <label className="block text-[10px] text-[#888888] uppercase mb-1">
                    Select Product Silhouette
                  </label>
                  <select
                    value={selectedProductId}
                    onChange={(e) => {
                      setSelectedProductId(e.target.value);
                      setSelectedProductImageIndex(0);
                    }}
                    className="w-full bg-[#141414] border border-[#242424] p-2.5 text-[#F5F5F5] focus:outline-none uppercase text-xs"
                  >
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.category})
                      </option>
                    ))}
                  </select>
                </div>

                {currentProduct && (
                  <div>
                    <label className="block text-[10px] text-[#888888] uppercase mb-2">
                      Select Image Slot / Angle
                    </label>
                    <div className="flex space-x-3 overflow-x-auto pb-1">
                      {currentProduct.images.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedProductImageIndex(idx)}
                          className={`relative w-16 aspect-[3/4] border transition-all cursor-pointer ${
                            selectedProductImageIndex === idx
                              ? 'border-[#F5F5F5] ring-2 ring-white/30'
                              : 'border-[#242424] opacity-50 hover:opacity-100'
                          }`}
                        >
                          <img src={img} alt={`Slot ${idx + 1}`} className="w-full h-full object-cover" />
                          <span className="absolute bottom-0 inset-x-0 bg-black/80 text-[8px] text-center text-white py-0.5">
                            Slot {idx + 1}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {selectedTarget === 'campaign' && (
              <div className="p-4 bg-[#0E0E0E] border border-[#242424] space-y-3">
                <label className="block text-[10px] text-[#888888] uppercase mb-1">
                  Select Campaign / Hero Banner
                </label>
                <div className="space-y-2">
                  {campaignOptions.map((opt) => (
                    <label
                      key={opt.key}
                      className={`flex items-center space-x-3 p-3 border cursor-pointer transition-colors ${
                        selectedCampaignKey === opt.key
                          ? 'bg-[#181818] border-[#F5F5F5] text-white'
                          : 'bg-[#111111] border-[#242424] text-[#888888] hover:border-[#383838]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="campaignKey"
                        checked={selectedCampaignKey === opt.key}
                        onChange={() => setSelectedCampaignKey(opt.key)}
                        className="accent-white"
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {selectedTarget === 'lookbook' && (
              <div className="p-4 bg-[#0E0E0E] border border-[#242424] space-y-3">
                <label className="block text-[10px] text-[#888888] uppercase mb-1">
                  Select Lookbook Canvas
                </label>
                <div className="space-y-2">
                  {lookbookOptions.map((opt) => (
                    <label
                      key={opt.key}
                      className={`flex items-center space-x-3 p-3 border cursor-pointer transition-colors ${
                        selectedLookbookKey === opt.key
                          ? 'bg-[#181818] border-[#F5F5F5] text-white'
                          : 'bg-[#111111] border-[#242424] text-[#888888] hover:border-[#383838]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="lookbookKey"
                        checked={selectedLookbookKey === opt.key}
                        onChange={() => setSelectedLookbookKey(opt.key)}
                        className="accent-white"
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Upload Box */}
            <div>
              <label className="block text-[10px] text-[#888888] uppercase tracking-widest mb-2">
                2. CHOOSE YOUR LOCAL PNG FILE
              </label>
              <label className="border-2 border-dashed border-[#333333] hover:border-[#F5F5F5] p-8 flex flex-col items-center justify-center space-y-3 bg-[#111111] cursor-pointer transition-colors">
                <Upload className="w-6 h-6 text-[#A1A1A1]" />
                <div className="text-center">
                  <p className="text-xs font-bold text-[#F5F5F5] uppercase">
                    Click to Select PNG File
                  </p>
                  <p className="text-[10px] text-[#666666] mt-1">
                    Supports .png, .jpg, .webp (Transparent & High-Res)
                  </p>
                </div>
                {fileName && (
                  <div className="px-3 py-1 bg-black text-green-400 border border-green-800 text-[10px]">
                    ✓ Selected: {fileName}
                  </div>
                )}
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp,image/gif"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Right Column: Live Preview & Confirm (6 Cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div>
              <label className="block text-[10px] text-[#888888] uppercase tracking-widest mb-2">
                3. LIVE REAL-TIME PREVIEW
              </label>

              <div className="relative aspect-[3/4] w-full bg-[#111111] border border-[#242424] overflow-hidden flex items-center justify-center">
                {previewDataUrl ? (
                  <img
                    src={previewDataUrl}
                    alt="PNG Upload Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center p-6 space-y-2 text-[#555555]">
                    <ImageIcon className="w-10 h-10 mx-auto opacity-30" />
                    <p className="text-xs">No new PNG file selected yet</p>
                    <p className="text-[10px] text-[#444444]">
                      Select a PNG file above to view preview before applying
                    </p>
                  </div>
                )}

                {previewDataUrl && (
                  <div className="absolute top-3 right-3 px-2 py-1 bg-black/90 text-green-400 border border-green-800 text-[9px] uppercase tracking-widest font-bold">
                    PNG READY TO APPLY
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-4 border-t border-[#242424]">
              <button
                onClick={handleApplyImage}
                disabled={!previewDataUrl}
                className={`w-full py-4 uppercase font-bold text-xs tracking-widest flex items-center justify-center space-x-2 transition-all cursor-pointer ${
                  previewDataUrl
                    ? 'bg-[#F5F5F5] hover:bg-white text-black shadow-lg shadow-white/5'
                    : 'bg-[#181818] text-[#555555] border border-[#242424] cursor-not-allowed'
                }`}
              >
                <Check className="w-4 h-4" />
                <span>APPLY PNG IMAGE TO STORE</span>
              </button>

              <div className="flex items-center justify-between text-[10px] text-[#666666] pt-1">
                <span>Persisted in local atelier store</span>
                <button
                  onClick={resetSiteImages}
                  className="hover:text-red-400 underline transition-colors flex items-center space-x-1 cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Reset all to defaults</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
