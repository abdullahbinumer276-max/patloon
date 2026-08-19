import React from 'react';
import { useStore } from '../context/StoreContext';
import { Sparkles } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toastMessage } = useStore();

  if (!toastMessage) return null;

  return (
    <div
      id="store-toast"
      className="fixed bottom-16 sm:bottom-8 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 bg-[#111111]/95 backdrop-blur-md border border-[#2D2D2D] shadow-2xl text-[#F5F5F5] text-xs font-mono tracking-wider flex items-center space-x-2.5 animate-in fade-in slide-in-from-bottom-3 duration-200"
    >
      <Sparkles className="w-3.5 h-3.5 text-[#F5F5F5] animate-pulse" />
      <span>{toastMessage}</span>
    </div>
  );
};
