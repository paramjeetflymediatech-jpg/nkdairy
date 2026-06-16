'use server';

export async function fetchChannelVideos(pageToken: string = '') {
  const channelId = 'UCZg0LOmqxcUHaZsADX3H5SQ'; // NK Dairy Equipments channel ID
  const apiKey = process.env.YOUTUBE_API_KEY;

  try {
    // 1. If an API key is provided, use the Official YouTube API (supports unlimited pagination)
    if (apiKey) {
      const playlistId = channelId.replace(/^UC/, 'UU');
      let url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=12&playlistId=${playlistId}&key=${apiKey}`;
      if (pageToken) {
        url += `&pageToken=${pageToken}`;
      }

      const res = await fetch(url, { next: { revalidate: 3600 } }); // Cache for 1 hour
      const data = await res.json();

      if (res.ok && data.items) {
        const videos = data.items.map((item: any) => ({
          id: item.snippet.resourceId.videoId,
          title: item.snippet.title,
        }));
        return { videos, nextPageToken: data.nextPageToken || null, isOfficialApi: true };
      }
    }

    // 2. ALTERNATIVE: If NO API key is provided, fallback to the free YouTube RSS Feed
    // Note: RSS feed is strictly limited by YouTube to the 15 most recent videos. Pagination is impossible.
    if (!pageToken) {
      const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
      const rss2jsonUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;
      
      const res = await fetch(rss2jsonUrl, { next: { revalidate: 3600 } });
      const data = await res.json();
      
      if (res.ok && data.status === 'ok') {
        const videos = data.items.map((item: any) => {
          const videoId = item.link.split('v=')[1];
          return { id: videoId, title: item.title };
        });
        return { videos, nextPageToken: null, isOfficialApi: false };
      }
    }

    return { error: 'Failed to fetch videos from both API and RSS.' };
  } catch (error) {
    console.error("Failed to fetch videos:", error);
    return { error: 'Failed to fetch videos' };
  }
}
