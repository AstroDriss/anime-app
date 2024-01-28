import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import useAnimes from "../hooks/useAnimes";
import { AnimeQuery } from "../services/anime-service";
import genreService, { Genre } from "../services/genre-service";

let genreName: string | undefined;
const queryString: { [key: string]: string } = {}; // queryString
const AnimePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [animeQuery, setAnimeQuery] = useState<AnimeQuery>({
    page: 1,
    sfw: true,
    sort: "desc",
    order_by: "mal_id",
    genres_exclude: "12",
  });
  const { animes, isLoading, loadMore, error } = useAnimes(
    animeQuery as AnimeQuery,
  );

  const [searchParams] = useSearchParams();

  useEffect(() => {
    queryString["q"] = searchParams.get("q") || "";
    queryString["genres"] = searchParams.get("genres") || "";
    setAnimeQuery({ ...animeQuery, ...queryString, page: 1 });
    getGenreByID(queryString.genres);
  }, [searchParams]);

  useEffect(() => {
    setAnimeQuery({ ...animeQuery, ...queryString, page: currentPage });
  }, [currentPage]);

  function getGenreByID(id: number | string) {
    const { request } = genreService.getGenres();

    request.then((res) => {
      const genres = res.data.data as Genre[];
      const genre = genres.find((genre) => genre.mal_id == id);
      genreName = genre?.name;
    });
  }

  return (
    <main>
      <h1 className="mb-4 text-2xl text-primary">
        {genreName || "All"} Animes
      </h1>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-5">
        {animes.map((anime, i) => {
          if (i != 0 && anime.mal_id != animes[i - 1]["mal_id"])
            return (
              <article key={anime.mal_id} className="focus-within:outline">
                <Link
                  to={`/anime/${anime.mal_id}`}
                  className="focus-within:outline-none"
                >
                  <img
                    className="skeleton aspect-[267/475] w-full rounded-md object-cover"
                    src={
                      anime.images.webp.large_image_url ||
                      anime.images.jpg.large_image_url ||
                      ""
                    }
                    alt=""
                  />
                  <h2>{anime.title}</h2>
                </Link>
              </article>
            );
        })}

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
