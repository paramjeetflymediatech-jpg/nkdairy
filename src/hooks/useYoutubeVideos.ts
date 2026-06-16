import { useState, useEffect } from 'react';
import { fetchChannelVideos } from '@/actions/youtube';

export interface YoutubeVideo {
  id: string;
  title: string;
}

export function useYoutubeVideos() {
  const [videos, setVideos] = useState<YoutubeVideo[]>([]);
  const [activeVideo, setActiveVideo] = useState<YoutubeVideo | null>(null);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUsingApi, setIsUsingApi] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadVideos = async () => {
      setIsLoading(true);
      setError(null);
      const res = await fetchChannelVideos();
      if (res && !res.error && res.videos && res.videos.length > 0) {
        setVideos(res.videos);
        setActiveVideo(res.videos[0]);
        setNextPageToken(res.nextPageToken || null);
        setIsUsingApi(res.isOfficialApi || false);
      } else if (res.error) {
        setError(res.error);
        setIsUsingApi(false);
      }
      setIsLoading(false);
    };
    
    loadVideos();
  }, []);

  const loadMore = async () => {
    if (!nextPageToken) return;
    setIsLoading(true);
    const res = await fetchChannelVideos(nextPageToken);
    if (res && !res.error && res.videos) {
      setVideos((prev) => [...prev, ...res.videos]);
      setNextPageToken(res.nextPageToken || null);
    }
    setIsLoading(false);
  };

  return {
    videos,
    activeVideo,
    setActiveVideo,
    nextPageToken,
    isLoading,
    isUsingApi,
    error,
    loadMore
  };
}
