import { Link } from "react-router-dom";
import animeService, { Anime, AnimeQuery } from "../services/anime-service";
import { BsArrowRight } from "react-icons/bs";
import { useEffect, useState } from "react";
import { AxiosError, AxiosResponse, CanceledError } from "axios";
import Card from "./Card";
import AnimeCardSkeleton from "./AnimeCardSkeleton";

interface Props {
  options: AnimeQuery;
  title: string;
  path: string;
  [rest: string]: any;
}

const AnimeSuspense = ({ options, title, path, ...rest }: Props) => {
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const { request, cancel } = animeService.getAnime({
      limit: 6,
      order_by: "popularity",
      sfw: true,
      genres_exclude: "12",
      ...options,
    });
    request
      .then((res: AxiosResponse) => {
        setAnimes(res.data.data);
        setLoading(false);
        setError("");
      })
      .catch((err: AxiosError) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    return () => cancel();
  }, []);

  return (
    <article {...rest}>
      <div className="mb-2 flex justify-between">
        <h2 className="text-xl">{title}</h2>
        <Link
          to={path}
          className="flex items-center gap-1 text-primary underline"
        >
          view more <BsArrowRight />
        </Link>
      </div>
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-5">
        {isLoading
          ? [0, 0, 0, 0, 0, 0].map((_, i) => <AnimeCardSkeleton key={i} />)
          : animes.map((anime) => <Card anime={anime} key={anime.mal_id} />)}
      </div>
    </article>
  );
};

export default AnimeSuspense;
