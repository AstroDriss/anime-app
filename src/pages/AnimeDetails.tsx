import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import NotFound from "./NotFound";
import { IoPlay } from "react-icons/io5";
import TrailerDialog from "../components/TrailerDialog";
import CharactersGrid from "../components/CharactersGrid";
import { BsStar } from "react-icons/bs";
import useAnime from "../hooks/useAnime";

const AnimeDetails = () => {
  const { mal_id } = useParams();
  const [trailerDialog, setTrailerDialog] = useState(false);

  if (!mal_id?.match(/\d+/)) return <NotFound />;

  const { anime, isLoading, error } = useAnime(parseInt(mal_id));

  return (
    <main className="text-gray-300">
      {error && (
        <div className="rounded-md bg-red-400 p-2 text-center text-red-900">
          <strong>{error}</strong>
        </div>
      )}

      {trailerDialog && (
        <TrailerDialog
          url={anime?.trailer.embed_url as string}
          setTrailerDialog={setTrailerDialog}
        />
      )}

      <article className="flex flex-col items-center gap-2 sm:grid sm:grid-cols-2 min-[940px]:grid-cols-3">
        <img
          className="skeleton h-[450px] w-[317px] justify-self-center rounded-lg object-cover"
          src={anime?.images.webp.large_image_url}
          alt={anime?.title}
        />

        <div className="sm:col-span-1 sm:block min-[940px]:col-span-2">
          {isLoading && <AnimeInfoSkeleton />}

          <small>{anime?.type}</small>
          <h1 className="text-3xl font-bold text-light">
            {anime?.title}{" "}
            <time
              className="text-sm font-normal"
              dateTime={`${anime?.aired.from}`}
            >
              {anime?.aired.prop.from.year}
            </time>
          </h1>

          <small>
            {anime?.episodes && anime?.episodes + " eps | "} {anime?.duration}
          </small>

          {anime?.trailer.embed_url && (
            <button
              onClick={() => setTrailerDialog(true)}
              className="mt-2 flex items-center gap-1 rounded-sm bg-primary px-2 py-1 text-dark"
            >
              <IoPlay /> Trailer
            </button>
          )}

          {anime?.score && (
            <p className="mt-2 flex items-center gap-2">
              <BsStar className="text-primary" />
              {anime.score}
              <small className="text-gray-400">({anime?.scored_by})</small>
            </p>
          )}

          <ul className="mt-2 flex flex-wrap gap-2">
            {anime?.genres.map((genre) => (
              <li key={genre.mal_id}>
                <Link
                  className="rounded-full border border-current px-3 hover:text-primary"
                  to={`/anime?genres=${genre.mal_id}`}
                >
                  {genre.name}
                </Link>
              </li>
            ))}
          </ul>

          <p className="mt-4 hidden min-[940px]:block">{anime?.synopsis}</p>
        </div>

        <p className="col-span-2 mt-4 min-[940px]:hidden">{anime?.synopsis}</p>
      </article>
      <section className="mt-4">
        <CharactersGrid id={mal_id} />
      </section>
    </main>
  );
};

function AnimeInfoSkeleton() {
  return (
    <>
      <div className="skeleton mb-1 h-2 w-6"></div>
      <div className="skeleton h-4 w-72"></div>
      <div className="skeleton my-2 h-2 w-10"></div>

      <div className="skeleton mt-3 h-10 w-20"></div>

      <div className="mt-2 flex flex-wrap gap-2">
        <div className="skeleton h-5 w-12 rounded-full border border-current px-3"></div>
      </div>
      <div className="mt-4 hidden min-[940px]:block">
        <div className="skeleton mb-2 h-2"></div>
        <div className="skeleton mb-2 h-2"></div>
        <div className="skeleton mb-2 h-2"></div>
        <div className="skeleton mb-2 h-2"></div>
        <div className="skeleton mb-2 h-2"></div>
        <div className="skeleton mb-2 h-2"></div>
        <div className="skeleton mb-2 h-2"></div>
        <div className="skeleton mb-2 h-2"></div>
        <div className="skeleton mb-2 h-2 w-11/12"></div>
      </div>
    </>
  );
}

export default AnimeDetails;
