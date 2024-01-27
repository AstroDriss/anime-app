import { useState } from "react";
import { BsStars } from "react-icons/bs";
import { FaArrowRightLong } from "react-icons/fa6";
import { recommended } from "../constants";
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
    <div className={`${className} self-stretch max-h-full`}>
      <h2 className="text-primary mb-4 flex items-center gap-1">
        <BsStars />
        For You
      </h2>

      {error && <p>Error</p>}

      <div className="flex max-w-full h-[500px] overflow-hidden rounded-md skeleton-image relative">
        <button
          className="absolute z-10 top-1/2 -translate-y-1/2 right-2 p-3 bg-white aspect-square rounded-full shadow-md"
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
            className="max-h-full transition-all min-w-full relative before:bg-gradient-to-t  before:from-gray-950/80 before:to-transparent before:inset-0 before:absolute"
          >
            <img
              className="object-cover h-full w-full"
              src={anime.img}
              alt={`${anime.title} cover`}
            />

            <div className="absolute bottom-7 left-7">
              <p className="text-xs text-white/50">Home | TV</p>
              <h2 className="text-4xl my-4 font-bold">{anime.title}</h2>
              <p className="max-w-72 text-gray-300 leading-5">
                {anime.desc}...
                <Link to={`/anime/${anime.mal_id}`} className="underline">
                  more
                </Link>
              </p>
            </div>
          </div>
        ))}

        <div className="flex gap-4 absolute bottom-2 left-1/2 -translate-x-1/2">
          {recommended.map((_, i) => (
            <button
              className={`w-[7px] h-[7px] rounded-full ${
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
