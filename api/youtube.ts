import axios from "axios";
import { Video } from "../types/video";

const API_KEY = "AIzaSyDH5P3ZnjoRVTIUZu4kHf6ALNhr72tWHmE";
const BASE_URL = "https://www.googleapis.com/youtube/v3";

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  publishedAt: string;
  channelTitle: string;
  viewCount?: string;
}

export const fetchVideosByQuery = async (query: string): Promise<Video[]> => {
  try {
    const res = await axios.get(`${BASE_URL}/search`, {
      params: {
        key: API_KEY,
        part: "snippet",
        type: "video",
        maxResults: 10,
        q: query,
      },
    });

    return res.data.items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.medium.url,
      publishedAt: item.snippet.publishedAt,
      channelTitle: item.snippet.channelTitle,
    }));
  } catch (err) {
    console.error("Error fetching videos:", err);
    return [];
  }
};

export const fetchVideoStatistics = async (
  videoId: string
): Promise<{ views: string; likes: string }> => {
  try {
    const res = await axios.get(`${BASE_URL}/videos`, {
      params: {
        key: API_KEY,
        part: "statistics",
        id: videoId,
      },
    });

    const stats = res.data.items[0]?.statistics;
    return {
      views: stats?.viewCount || "0",
      likes: stats?.likeCount || "0",
    };
  } catch (err) {
    console.error("Error fetching video statistics:", err);
    return { views: "0", likes: "0" };
  }
};
