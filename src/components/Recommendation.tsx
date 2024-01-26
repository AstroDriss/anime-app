import { useState } from "react";
import { BsStars } from "react-icons/bs";
import { FaArrowRightLong } from "react-icons/fa6";
import { recommended } from "../constants";

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
          <img
            style={{
              translate: `-${100 * current}%`,
            }}
            className="min-w-full object-cover max-h-full transition-all"
            src={anime.img}
            alt=""
          />

          // <div className="absolute ">
          //   <p>Home | TC</p>
          //   <h2>{anime.title}</h2>
          //   <p>{anime.desc}</p>
          // </div>
        ))}

        <div className="flex gap-3 absolute bottom-2 left-1/2 -translate-x-1/2">
          {recommended.map((_, i) => (
            <button
              className={`w-3 h-3 rounded-full ${
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
