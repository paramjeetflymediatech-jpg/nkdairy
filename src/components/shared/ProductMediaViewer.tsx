'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Box, Image as ImageIcon, Loader2 } from 'lucide-react';

const Product3DViewer = dynamic(() => import('@/components/shared/Product3DViewer'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[350px] md:min-h-[450px] bg-slate-50 border border-gray-100 rounded-2xl flex flex-col items-center justify-center text-[#323373] animate-pulse">
      <Loader2 className="animate-spin mb-2" size={24} />
      <span className="text-sm font-semibold">Initializing 3D Canvas...</span>
    </div>
  )
});

export default function ProductMediaViewer({
  imageUrl,
  modelUrl,
  productName
}: {
  imageUrl: string | null;
  modelUrl: string | null;
  productName: string;
}) {
  const is3DModel = modelUrl ? !!modelUrl.match(/\.(glb|gltf)$/i) : false;
  // If model is an image, treat it as the imageUrl if no other imageUrl is provided
  const displayImageUrl = (!is3DModel && modelUrl) ? modelUrl : imageUrl;

  // Default to 3D view if valid 3D model is present, otherwise show image
  const [viewMode, setViewMode] = useState<'2d' | '3d'>(is3DModel ? '3d' : '2d');

  return (
    <div className="w-full flex flex-col items-center">
      {/* 2D/3D Mode Switcher (only shown if a valid 3D model is available) */}
      {is3DModel && modelUrl && (
        <div className="flex bg-slate-950/80 backdrop-blur-md p-1 rounded-xl border border-white/10 mb-6 gap-1.5 z-20 shadow-lg">
          <button
            type="button"
            onClick={() => setViewMode('2d')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${viewMode === '2d' ? 'bg-[#f3b216] text-slate-900 shadow-sm' : 'text-white/80 hover:text-white'}`}
          >
            <ImageIcon size={14} /> 2D View
          </button>
          <button
            type="button"
            onClick={() => setViewMode('3d')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${viewMode === '3d' ? 'bg-[#f3b216] text-slate-900 shadow-sm' : 'text-white/80 hover:text-white'}`}
          >
            <Box size={14} /> 3D View
          </button>
        </div>
      )}

      {/* Main View Area */}
      <div className="relative w-full h-[400px] lg:h-[450px] flex items-center justify-center">
        {viewMode === '3d' && is3DModel && modelUrl ? (
          <div className="w-full h-full">
            <Product3DViewer modelUrl={modelUrl} />
          </div>
        ) : displayImageUrl ? (
          <img
            src={displayImageUrl}
            alt={productName}
            className="object-contain w-full h-full drop-shadow-2xl transition-all duration-500"
          />
        ) : (
          <div className="w-full h-full border-2 border-dashed border-white/20 rounded-2xl flex items-center justify-center text-white/50 bg-slate-900/10">
            <span className="text-xl font-medium">No Image Available</span>
          </div>
        )}
      </div>
    </div>
  );
}
