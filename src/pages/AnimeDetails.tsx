import { Link, useParams } from "react-router-dom";
import animeService, { Anime } from "../services/anime-service";
import { useEffect, useState } from "react";
import { CanceledError } from "axios";
import NotFound from "./NotFound";
import { IoPlay } from "react-icons/io5";
import TrailerDialog from "../components/TrailerDialog";
import CharactersGrid from "../components/CharactersGrid";
import { BsStar } from "react-icons/bs";

const AnimeDetails = () => {
  const { mal_id } = useParams();
  const [anime, setAnime] = useState<Anime>();
  const [trailerDialog, setTrailerDialog] = useState(false);

  if (!mal_id?.match(/\d+/)) return <NotFound />;

  useEffect(() => {
    const { request, cancel } = animeService.getAnimeByID(parseInt(mal_id));

    request
      .then((res) => {
        setAnime(res.data.data);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        console.log(err);
      });

    return () => cancel();
  }, []);

  return (
    <main className="text-gray-300">
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
            {anime?.episodes} eps | {anime?.duration}
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

          {/* {anime?.genres.map((gen) => gen.name).join(" | ")} */}

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

export default AnimeDetails;
