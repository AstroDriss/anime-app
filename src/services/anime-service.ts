import apiClient from "./api-client";

export interface Anime {
  mal_id: number;
  title: string;
  type: string;
  images: {
    jpg: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
    webp: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
  };
  favorites: number;
  members: number;
}

type Image = {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
};

type Entry = {
  mal_id: number;
  url: string;
  images: {
    jpg: Image;
    webp: Image;
  };
  title: string;
};

type User = {
  url: string;
  username: string;
};

export type AnimeRecommanded = {
  mal_id: string;
  entry: Entry[];
  content: string;
  user: User;
};

class AnimeService {
  getTrending() {
    const controller = new AbortController();

    const request = apiClient.get("/top/anime", {
      signal: controller.signal,
      params: {
        page: 1,
        limit: 5,
        type: "tv",
      },
    });

    return { request, cancel: () => controller.abort() };
  }

  getRecommanded() {
    const controller = new AbortController();

    const request = apiClient.get("/recommendations/anime", {
      signal: controller.signal,
      params: {
        page: 1,
      },
    });

    return { request, cancel: () => controller.abort() };
  }
}

export default new AnimeService();
