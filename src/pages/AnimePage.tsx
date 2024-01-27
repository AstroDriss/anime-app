import { AxiosError, CanceledError } from "axios";
import animeService, { Anime } from "../services/anime-service";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AnimePage = () => {
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadMore, setLoadMore] = useState(false);

  useEffect(() => {
    setLoading(true);

    const { request, cancel } = animeService.getAnime({
      page: currentPage,
      sfw: true,
      order_by: "mal_id",
      status: "airing",
      sort: "desc",
    });
    request
      .then((res) => {
        setAnimes((prevAnime) => [...prevAnime, ...res.data.data]);
        setLoadMore(res.data.pagination.has_next_page);
        setLoading(false);
      })
      .catch((err: AxiosError) => {
        if (err instanceof CanceledError) return;
        setError(true);
        setLoading(false);
      });

    return () => cancel();
  }, [currentPage]);

  return (
    <main>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-5">
        {animes.map((anime) => (
          <article key={anime.mal_id} className="focus-within:outline">
            <Link
              to={`/anime/${anime.mal_id}`}
              className="focus-within:outline-none"
            >
              <img
                className="aspect-[267/475] rounded-md object-cover"
                src={anime.images.webp.large_image_url}
                alt=""
              />
              <h2>{anime.title}</h2>
            </Link>
          </article>
        ))}

        {isLoading &&
          [0, 0, 0, 0, 0, 0, 0, 0].map((_, i) => <AnimeCardSkeleton key={i} />)}
      </div>

      {error && <p>Error</p>}

      {loadMore && (
        <button
          disabled={isLoading}
          className="mx-auto my-5 block rounded-md bg-primary p-2 px-4 text-dark transition-all hover:brightness-110"
          onClick={(_) => setCurrentPage((prev) => prev + 1)}
        >
          Load More
        </button>
      )}
    </main>
  );
};

function AnimeCardSkeleton({ ...props }) {
  return (
    <div {...props}>
      <div className="skeleton aspect-[267/475] rounded-md object-cover"></div>

      <div className="skeleton mt-2 h-3 w-full"></div>
      <div className="skeleton mt-2 h-3 w-10/12"></div>
    </div>
  );
}

export default AnimePage;
