'use client';

import { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

export default function ProductGallery({ images, productName }: { images: string[], productName: string }) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
  };

  const showNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  const showPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return;
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'Escape') closeLightbox();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, showNext, showPrev, closeLightbox]);

  const handleNextClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    showNext();
  };

  const handlePrevClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    showPrev();
  };

  return (
    <>
      <div className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#323373] mb-4">
              {productName} Equipment Gallery
            </h2>
            <div className="h-1 w-20 bg-[#f3b216] mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {images.slice(0, 8).map((img, idx) => {
              const isLast = idx === 7 && images.length > 8;
              
              if (isLast) {
                return (
                  <div 
                    key={idx}
                    onClick={() => openLightbox(idx)}
                    className="relative rounded-xl md:rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 transition-all cursor-pointer bg-gray-50 flex items-center justify-center overflow-hidden aspect-square hover:scale-105 duration-500"
                  >
                    <img src={img} alt="View all images" className="object-contain w-full h-full" />
                    <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-white backdrop-blur-[1px]">
                      <span className="text-3xl font-bold">+{images.length - 6}</span>
                      <span className="font-semibold tracking-wider mt-1 text-sm uppercase">View All</span>
                    </div>
                  </div>
                );
              }

              return (
                <img
                  key={idx}
                  src={img}
                  alt={`${productName} Gallery Image ${idx + 1}`}
                  onClick={() => openLightbox(idx)}
                  className="object-contain w-full h-auto rounded-xl md:rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 transition-all cursor-pointer hover:scale-105 duration-500 bg-gray-50 aspect-square"
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center" onClick={closeLightbox}>

          {/* Close Button */}
          <button
            className="absolute top-6 right-6 text-white/70 hover:text-white bg-black/50 hover:bg-black/80 rounded-full p-2 transition-all z-50"
            onClick={closeLightbox}
            title="Close"
          >
            <X size={28} />
          </button>

          {/* Navigation Buttons */}
          {images.length > 1 && (
            <>
              <button
                className="absolute left-4 md:left-10 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-black/50 hover:bg-black/80 rounded-full p-3 md:p-4 transition-all z-50 hover:scale-110"
                onClick={handlePrevClick}
                title="Previous Image"
              >
                <ChevronLeft size={36} />
              </button>
              <button
                className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 text-white/70 hover:text-white bg-black/50 hover:bg-black/80 rounded-full p-3 md:p-4 transition-all z-50 hover:scale-110"
                onClick={handleNextClick}
                title="Next Image"
              >
                <ChevronRight size={36} />
              </button>
            </>
          )}

          {/* Image Container */}
          <div
            className="relative w-full h-[75vh] max-w-6xl flex flex-col items-center justify-center p-4 md:p-8 select-none mt-8"
            onClick={(e) => e.stopPropagation()} 
          >
            <img
              src={images[currentIndex]}
              alt={`${productName} - Full View ${currentIndex + 1}`}
              className="max-w-full max-h-full object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.1)] transition-opacity duration-300"
            />

            {/* Image Counter */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/80 font-medium tracking-widest text-sm bg-black/50 px-4 py-1.5 rounded-full backdrop-blur-md">
              {currentIndex + 1} / {images.length}
            </div>
          </div>

          {/* Thumbnail Strip at Bottom */}
          {images.length > 1 && (
            <div 
              className="absolute bottom-6 w-full px-4 flex justify-center z-50"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex gap-2 md:gap-3 overflow-x-auto pb-2 px-2 max-w-full">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`relative w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${currentIndex === idx ? 'border-[#f3b216] shadow-[0_0_15px_rgba(243,178,22,0.4)] scale-105' : 'border-white/30 hover:border-white/80 opacity-60 hover:opacity-100'}`}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
