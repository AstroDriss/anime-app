import { useEffect, useState } from "react";
import animeService, { Character } from "../services/anime-service";
import { AxiosError, CanceledError } from "axios";

const useAnimeCharacters = (id: number | string) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const { request, cancel } = animeService.getAnimeCharacters(id);
    request
      .then((res) => {
        setCharacters(res.data.data);
        setLoading(false);
      })
      .catch((err: AxiosError) => {
        if (err instanceof CanceledError) return;
        setError(true);
        setLoading(false);
      });

    return () => cancel();
  }, []);

  return { characters, isLoading, error };
};

export default useAnimeCharacters;
