'use client';

import { Play, Loader2 } from 'lucide-react';
import { useYoutubeVideos } from '@/hooks/useYoutubeVideos';

export default function VideosPageClient() {
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
    <div className="bg-[#0f172a] min-h-screen text-slate-200 pb-24">
      {/* Cinematic Hero Header */}
      <div className="bg-black/40 pt-32 pb-12 px-6 border-b border-white/10">
        <div className="container mx-auto max-w-7xl">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight drop-shadow-md">
            Media Center
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl font-light">
            Watch our dairy processing machinery in action.
          </p>
        </div>
      </div>

      {/* Theater Layout */}
      <div className="container mx-auto max-w-7xl px-4 md:px-6 pt-12">
        {isLoading && videos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-blue-400">
            <Loader2 className="animate-spin w-12 h-12 mb-4" />
            <p className="text-lg font-medium">Loading videos from YouTube...</p>
          </div>
        ) : error && videos.length === 0 ? (
           <div className="flex flex-col items-center justify-center py-32 text-red-400">
             <p className="text-lg font-medium mb-2">Oops! Something went wrong.</p>
             <p className="text-sm text-slate-400">{error}</p>
           </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Main Video Area (Left) */}
            <div className="lg:w-2/3 xl:w-3/4 flex flex-col">
              {activeVideo && (
                <>
                  <div className="w-full aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-white/5 relative z-10 ring-1 ring-white/10">
                    <iframe
                      className="absolute inset-0 w-full h-full border-0"
                      src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1&mute=0&rel=0`}
                      title={activeVideo.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  
                  <div className="mt-8 mb-12 lg:mb-0 px-2">
                    <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                      {activeVideo.title}
                    </h2>
                  </div>
                </>
              )}
            </div>

            {/* Up Next Sidebar (Right) */}
            <div className="lg:w-1/3 xl:w-1/4 flex flex-col h-[600px] lg:h-[800px] bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
              <div className="p-4 bg-white/5 border-b border-white/10 shrink-0">
                <h3 className="text-lg font-semibold text-white">Up Next</h3>
              </div>
              
              <div className="overflow-y-auto p-4 flex flex-col gap-4 custom-scrollbar">
                {videos.map((video) => (
                  <div 
                    key={video.id} 
                    onClick={() => {
                       setActiveVideo(video);
                       window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`group relative cursor-pointer flex gap-3 transition-all duration-300 p-2 rounded-xl ${activeVideo?.id === video.id ? 'bg-white/10 shadow-lg border border-white/20' : 'hover:bg-white/5 border border-transparent'}`}
                  >
                    <div className="w-32 md:w-40 shrink-0 aspect-video bg-black relative rounded-lg overflow-hidden border border-white/10">
                      <img 
                        src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`} 
                        alt={video.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                      />
                      <div className={`absolute inset-0 flex items-center justify-center transition-all ${activeVideo?.id === video.id ? 'bg-black/10' : 'bg-black/40 group-hover:bg-black/20'}`}>
                        <div className={`bg-blue-600 text-white p-2 rounded-full transition-all duration-300 shadow-lg ${activeVideo?.id === video.id ? 'opacity-0 scale-50' : 'opacity-80 group-hover:opacity-100 group-hover:scale-110'}`}>
                          <Play size={14} fill="white" className="ml-0.5" />
                        </div>
                      </div>
                    </div>
                    <div className="flex-grow flex items-start pt-1">
                      <p className={`text-sm leading-snug line-clamp-3 transition-colors ${activeVideo?.id === video.id ? 'text-blue-400 font-bold' : 'text-slate-300 group-hover:text-white'}`}>
                        {video.title}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Sidebar Load More */}
                {isUsingApi && nextPageToken && (
                  <button 
                    onClick={loadMore}
                    disabled={isLoading}
                    className="w-full py-3 mt-4 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-semibold transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <><Loader2 size={16} className="animate-spin" /> Loading...</>
                    ) : (
                      <>Load More Videos</>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
        
        {/* Missing API Key Warning */}
        {!isLoading && videos.length > 0 && !isUsingApi && (
          <div className="mt-12">
            <div className="p-4 bg-white/5 text-slate-400 rounded-xl text-sm border border-white/10 max-w-2xl">
              <p>Currently showing 15 latest videos. To view older videos, add a <code>YOUTUBE_API_KEY</code> to your <code>.env</code> file.</p>
            </div>
          </div>
        )}
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.02);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
}
