import { useState } from "react";
import { BsStars } from "react-icons/bs";
import { FaArrowRightLong } from "react-icons/fa6";
import { recommended } from "../constants/index";
import { Link } from "react-router-dom";

interface Props {
  className?: string;
}

const Recommendation = ({ className }: Props) => {
  const [current, setCurrent] = useState(0);
  const [error] = useState(false);

  const nextSlide = () => {
    setCurrent(current == recommended.length - 1 ? 0 : current + 1);
  };

  return (
    <div className={`${className} max-h-full self-stretch`}>
      <h2 className="mb-4 flex items-center gap-1 text-primary">
        <BsStars />
        For You
      </h2>

      {error && <p>Error</p>}

      <div className="skeleton-image relative flex h-[500px] max-w-full overflow-hidden rounded-md">
        <button
          className="absolute right-2 top-1/2 z-10 aspect-square -translate-y-1/2 rounded-full bg-white p-3 shadow-md"
          onClick={nextSlide}
        >
          <FaArrowRightLong fill="black" />
        </button>
        {recommended.map((anime) => (
          <div
            key={anime.mal_id}
            style={{
              translate: `-${100 * current}%`,
            }}
            className="relative max-h-full min-w-full transition-all before:absolute  before:inset-0 before:bg-gradient-to-t before:from-gray-950/80 before:to-transparent"
          >
            <img
              className="h-full w-full object-cover"
              src={anime.img}
              alt={`${anime.title} cover`}
            />

            <div className="absolute bottom-7 left-7">
              <p className="text-xs text-white/50">Home | TV</p>
              <h2 className="my-4 text-4xl font-bold">{anime.title}</h2>
              <p className="max-w-72 leading-5 text-gray-300">
                {anime.desc}...
                <Link to={`/anime/${anime.mal_id}`} className="underline">
                  more
                </Link>
              </p>
            </div>
          </div>
        ))}

        <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-4">
          {recommended.map((_, i) => (
            <button
              key={i}
              className={`h-[7px] w-[7px] rounded-full ${
                i == current ? "bg-primary" : "bg-white opacity-80"
              }`}
              onClick={() => setCurrent(i)}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recommendation;
