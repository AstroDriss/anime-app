import { useParams } from "react-router-dom";
import animeService, { Anime } from "../services/anime-service";
import { useEffect, useState } from "react";
import { CanceledError } from "axios";
import NotFound from "./NotFound";
import { IoPlay } from "react-icons/io5";
import TrailerDialog from "../components/TrailerDialog";

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

      <article className="grid md:grid-cols-3">
        <img
          className="skeleton h-[450px] w-[317px] rounded-lg object-cover"
          src={anime?.images.webp.large_image_url}
          alt={anime?.title}
        />

        <div className="col-span-2">
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

          <p className="mt-4">{anime?.synopsis}</p>
        </div>
      </article>
    </main>
  );
};

export default AnimeDetails;
