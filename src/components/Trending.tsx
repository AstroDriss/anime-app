import { useEffect, useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { IoIosHeartEmpty } from "react-icons/io";
import { RiFireLine } from "react-icons/ri";
import { AxiosError, CanceledError } from "axios";
import animeService, { Anime } from "../services/anime-service";
import { Link } from "react-router-dom";

const Trending = () => {
  const [trending, setTranding] = useState<Anime[]>([]);
  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const { request, cancel } = animeService.getTrending();
    request
      .then((res) => {
        setTranding(res.data.data);
        setLoading(false);
      })
      .catch((err: AxiosError) => {
        if (err instanceof CanceledError) return;
        setError(true);
        setLoading(false);
      });

    return () => cancel();
  }, []);

  return (
    <aside>
      <h2 className="text-primary mb-4 flex items-center gap-1">
        <RiFireLine />
        Trending
      </h2>

      {error && <p>Error</p>}

      <ul className="bg-darkGray rounded-md">
        {isLoading && <Skeleton />}

        {trending.map((anime: Anime, i) => (
          <li key={anime.mal_id} className="flex p-4 gap-2 items-center">
            <Link className="contents" to={`/anime/${anime.mal_id}`}>
              <span className="text-xg">0{i + 1}</span>
              <img
                src={anime.images.webp.small_image_url}
                alt={`${anime.title} cover`}
              />
              <div>
                <p>{anime.title}</p>
                <div className="flex gap-2 text-gray-400">
                  <span className="flex items-center gap-1">
                    <IoEyeOutline /> {anime.members}
                  </span>
                  <span className="flex items-center gap-1">
                    <IoIosHeartEmpty />

                    {anime.favorites}
                  </span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

function Skeleton() {
  return (
    <>
      {[0, 1, 2, 3, 4].map((_) => (
        <li key={_} className="flex p-4 gap-2 items-center">
          <span className="w-[17px] h-[24px] skeleton"></span>
          <div className="w-[42px] shrink-0 h-[59px] skeleton"></div>
          <div className="w-full">
            <p className="flex-1 basis-11 h-4 skeleton"></p>
            <div className="flex gap-2 mt-2">
              <span className="w-7 h-2 skeleton"></span>
              <span className="w-7 h-2 skeleton"></span>
            </div>
          </div>
        </li>
      ))}
    </>
  );
}

export default Trending;
