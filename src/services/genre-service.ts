import apiClient from "./api-client";

export interface Genre {
  mal_id: number;
  name: string;
  url: string;
}

class GenreService {
  getGenres() {
    const controller = new AbortController();

    const request = apiClient.get("/genres/anime", {
      signal: controller.signal,
    });

    return { request, cancel: () => controller.abort() };
  }
}

export default new GenreService();
