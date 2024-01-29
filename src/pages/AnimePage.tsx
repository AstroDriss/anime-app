import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useAnimes from "../hooks/useAnimes";
import { AnimeQuery } from "../services/anime-service";
import genreService from "../services/genre-service";
import Card from "../components/Card";
import AnimeCardSkeleton from "../components/AnimeCardSkeleton";
import GenreSelect from "../components/GenreSelect";

const queryString: { [key: string]: string } = {}; // queryString
const AnimePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [animeQuery, setAnimeQuery] = useState<AnimeQuery>({
    page: 1,
    sfw: true,
    sort: "asc",
    order_by: "favorites",
    genres_exclude: "12",
  });
  const [genre, setGenre] = useState("");
  const { animes, isLoading, loadMore, error } = useAnimes(
    animeQuery as AnimeQuery,
  );

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    queryString["q"] = searchParams.get("q") || "";
    queryString["genres"] = searchParams.get("genres") || "";
    queryString["type"] = searchParams.get("type") || "";
    queryString["status"] = searchParams.get("status") || "";
    queryString["order_by"] = searchParams.get("order_by") || "popularity";

    setAnimeQuery({ ...animeQuery, ...queryString, page: 1 });
    setGenre(getGenreByID(queryString.genres));
  }, [searchParams]);

  useEffect(() => {
    setAnimeQuery({
      ...animeQuery,
      ...queryString,
      page: currentPage,
    });
  }, [currentPage]);

  function handleGenreChange(e: React.ChangeEvent<HTMLSelectElement>) {
    searchParams.set("genres", e.target.value as string);
    setSearchParams(searchParams);
  }

  function getGenreByID(id: number | string) {
    const genres = genreService.getGenres();

    return genres.find((genre) => genre.mal_id == id)?.name || "";
  }

  return (
    <main>
      <h1 className="mb-4 text-2xl text-primary">
        <GenreSelect genre={genre} handleChange={handleGenreChange} /> Animes
      </h1>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-5">
        {animes.map((anime, i) => {
          if (i != 0 && anime.mal_id != animes[i - 1]["mal_id"])
            return <Card key={anime.mal_id} anime={anime} />;
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

export default AnimePage;
