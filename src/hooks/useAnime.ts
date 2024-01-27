import { useEffect, useState } from "react";
import animeService, { Anime, AnimeQuery } from "../services/anime-service";
import { AxiosError, CanceledError } from "axios";

const useAnimes = (animeQuery: AnimeQuery) => {
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [loadMore, setLoadMore] = useState(false);

  useEffect(() => {
    setLoading(true);

    const { request, cancel } = animeService.getAnime(animeQuery);
    request
      .then((res) => {
        if (animeQuery.page && animeQuery?.page > 1) {
          setAnimes([...animes, ...res.data.data]);
        } else {
          setAnimes(res.data.data);
        }
        setLoadMore(res.data.pagination.has_next_page);
        setLoading(false);
      })
      .catch((err: AxiosError) => {
        if (err instanceof CanceledError) return;
        setError(true);
        setLoading(false);
      });

    return () => cancel();
  }, [animeQuery]);

  return { animes, isLoading, error, loadMore };
};

export default useAnimes;
