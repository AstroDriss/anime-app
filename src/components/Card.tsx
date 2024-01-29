import { Link } from "react-router-dom";
import { Anime } from "../services/anime-service";
import { BsStar } from "react-icons/bs";

interface Props {
  anime: Anime;
}

const Card = ({ anime, ...rest }: Props) => {
  return (
    <article {...rest} className="focus-within:outline">
      <Link to={`/anime/${anime.mal_id}`} className="focus-within:outline-none">
        <div className="relative aspect-[267/475] overflow-hidden">
          <img
            loading="lazy"
            className="skeleton absolute inset-0 h-full w-full rounded-md object-cover transition-all duration-300 hover:scale-110"
            src={
              anime.images.webp.large_image_url ||
              anime.images.jpg.large_image_url ||
              ""
            }
            alt={anime.title}
          />
        </div>
        {anime.score && (
          <p className="flex items-center gap-1 text-sm text-gray-400">
            <BsStar className="text-primary" /> {anime.score}
          </p>
        )}
        <h2 className="line-2">{anime.title}</h2>
      </Link>
    </article>
  );
};

export default Card;
