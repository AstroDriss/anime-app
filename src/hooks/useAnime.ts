import { useEffect, useState } from "react";
import animeService, { Anime } from "../services/anime-service";
import { AxiosError, CanceledError } from "axios";

const useAnime = (id: number) => {
  const [anime, setAnime] = useState<Anime>();
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    const { request, cancel } = animeService.getAnimeByID(id);

    request
      .then((res) => {
        setAnime(res.data.data);
        setLoading(false);
        setError("");
      })
      .catch((err: AxiosError) => {
        if (err instanceof CanceledError) return;
        setLoading(false);
        setError(err.message);
      });

    return () => cancel();
  }, []);

  return { anime, isLoading, error };
};

export default useAnime;
