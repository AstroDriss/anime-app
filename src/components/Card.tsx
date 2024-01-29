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
        <img
          loading="lazy"
          className="skeleton aspect-[267/475] w-full rounded-md object-cover transition-all hover:scale-105"
          src={
            anime.images.webp.large_image_url ||
            anime.images.jpg.large_image_url ||
            ""
          }
          alt={anime.title}
        />
        {anime.score && (
          <p className="flex items-center gap-1 text-sm text-gray-400">
            <BsStar className="text-primary" /> {anime.score}
          </p>
        )}
        <h2>{anime.title}</h2>
      </Link>
    </article>
  );
};

export default Card;
