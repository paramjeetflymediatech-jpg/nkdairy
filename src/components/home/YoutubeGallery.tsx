'use client';

import { Play, Loader2 } from 'lucide-react';
import { useYoutubeVideos } from '@/hooks/useYoutubeVideos';

export default function YoutubeGallery() {
  const {
    videos,
    activeVideo,
    setActiveVideo,
    nextPageToken,
    isLoading,
    isUsingApi,
    error,
    loadMore
  } = useYoutubeVideos();

  return (
    <section id="video-gallery" className="bg-white py-24">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        {/* Image Banner Header */}
        <div className="relative w-full h-64 md:h-80 lg:h-96 rounded-3xl overflow-hidden mb-16 shadow-2xl border border-gray-100 group">
          <img 
            src="/gallery-banner.png" 
            alt="NK Dairy Factory Equipment" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          {/* Sleek Gradient Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/90 via-[#1e3a8a]/70 to-transparent"></div>
          <div className="absolute inset-0 bg-black/20"></div>
          
          <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-24">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-100 text-sm font-medium mb-6 w-fit backdrop-blur-md">
              <Play size={14} fill="currentColor" />
              <span>Official YouTube Channel</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 uppercase tracking-widest drop-shadow-lg leading-tight">
              Video <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Gallery</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-200 max-w-2xl font-light drop-shadow-md">
              Watch our latest equipment demonstrations and factory tours directly from our YouTube channel.
            </p>
          </div>
        </div>

        <div className="p-4 md:p-8 rounded-3xl">
          {isLoading && videos.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 text-blue-600">
              <Loader2 className="animate-spin w-12 h-12 mb-4" />
              <p className="text-lg font-medium">Loading videos from YouTube...</p>
            </div>
          ) : error && videos.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 text-red-600">
              <p className="text-lg font-medium mb-2">Oops! Something went wrong.</p>
              <p className="text-sm text-slate-500">{error}</p>
            </div>
          ) : (
            <>
              {/* Main Video Player */}
              {activeVideo && (
                <>
                  <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-inner">
                    <iframe
                      className="absolute inset-0 w-full h-full border-0"
                      src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1&mute=1&rel=0`}
                      title={activeVideo.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  
                  {/* Visible Headline Below Video */}
                  <div className="mt-6 mb-12 px-2 text-center md:text-left">
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 leading-tight">
                      {activeVideo.title}
                    </h3>
                  </div>
                </>
              )}

              {/* Thumbnail Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {videos.map((video) => (
                  <div 
                    key={video.id} 
                    onClick={() => {
                       setActiveVideo(video);
                       document.getElementById('video-gallery')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className={`group relative cursor-pointer rounded-2xl overflow-hidden border-2 transition-all duration-300 flex flex-col h-full ${activeVideo?.id === video.id ? 'border-blue-600 shadow-md ring-4 ring-blue-50' : 'border-gray-100 hover:border-gray-300 hover:shadow-sm'}`}
                  >
                    <div className="aspect-video bg-gray-100 relative shrink-0">
                      <img 
                        src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`} 
                        alt={video.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className={`absolute inset-0 flex items-center justify-center transition-all ${activeVideo?.id === video.id ? 'bg-black/10' : 'bg-black/30 group-hover:bg-black/10'}`}>
                        <div className={`bg-red-600 text-white p-3.5 rounded-full transition-all duration-300 shadow-lg ${activeVideo?.id === video.id ? 'opacity-0 scale-50' : 'opacity-90 group-hover:opacity-100 group-hover:scale-110'}`}>
                          <Play size={24} fill="white" className="ml-1" />
                        </div>
                      </div>
                    </div>
                    {/* Larger, fully visible title container */}
                    <div className={`p-5 flex-grow flex items-start bg-white transition-colors ${activeVideo?.id === video.id ? 'bg-blue-50/50' : ''}`}>
                      <p className={`text-sm md:text-base leading-relaxed line-clamp-3 transition-colors ${activeVideo?.id === video.id ? 'text-blue-800 font-bold' : 'text-slate-800 font-semibold group-hover:text-blue-600'}`}>
                        {video.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More Pagination */}
              {isUsingApi && nextPageToken && (
                <div className="mt-12 text-center flex justify-center">
                  <button 
                    onClick={loadMore}
                    disabled={isLoading}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        Loading More Videos...
                      </>
                    ) : (
                      <>Load More Videos</>
                    )}
                  </button>
                </div>
              )}
              
              {/* Missing API Key Warning */}
              {!isUsingApi && (
                <div className="mt-12 text-center">
                  <div className="px-6 py-4 bg-slate-50 text-slate-500 rounded-xl text-sm md:text-base inline-flex flex-col items-center mx-auto border border-slate-200 max-w-2xl">
                    <p>Currently showing your 15 latest videos automatically.</p>
                    <p className="text-xs mt-1">To unlock the "Load More" button and view older videos, add a <code>YOUTUBE_API_KEY</code> to your <code>.env</code> file.</p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
