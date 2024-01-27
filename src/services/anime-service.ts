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
  synopsis: string;
  episodes: number;
  duration: string;
  year: number;
  aired: {
    from: string;
    to: string;
    prop: {
      from: {
        year: number;
      };
      to: {
        year: number;
      };
    };
    string: string;
  };
  trailer: {
    embed_url?: string;
    images: {
      image_url?: string;
      large_imgae_url?: string;
    };
  };
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

export interface AnimeQuery {
  page?: number;
  type?:
    | "tv"
    | "movie"
    | "ova"
    | "special"
    | "ona"
    | "music"
    | "cm"
    | "pv"
    | "tv-special";
  rating?: "g" | "pg" | "pg13" | "r17" | "r" | "rx";
  sort?: "desc" | "asc";
  sfw?: boolean;
  order_by?: string;
  q?: string;
  status?: "airing" | "complete" | "upcoming";
  genres_exclude?: string;
}

class AnimeService {
  getAnimeByID(id: number) {
    const controller = new AbortController();

    const request = apiClient.get("/anime/" + id, {
      signal: controller.signal,
    });

    return { request, cancel: () => controller.abort() };
  }

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

  getAnime(params: AnimeQuery) {
    const controller = new AbortController();

    const request = apiClient.get("/anime", {
      signal: controller.signal,
      params: params,
    });

    return { request, cancel: () => controller.abort() };
  }

  getAnimeCharacters(id: number) {
    const controller = new AbortController();

    const request = apiClient.get(`/anime/${id}/characters`, {
      signal: controller.signal,
    });

    return { request, cancel: () => controller.abort() };
  }
}

export default new AnimeService();
