import Ad from "../components/Ad";
import AnimeSuspense from "../components/AnimeSuspense";
import Recommendation from "../components/Recommendation";
import Trending from "../components/Trending";

export const Home = () => {
  return (
    <main>
      <div className="mb-4 mt-7 grid grid-cols-1 gap-4 md:grid-cols-3">
        <Recommendation className="col-span-2" />
        <Trending />
      </div>
      <Ad />
      <AnimeSuspense
        options={{ type: "movie" }}
        title="Anime Movies"
        path={`/anime?type=movie&order_by=popularity`}
        className="my-5"
      />
      <AnimeSuspense
        options={{ type: "tv", status: "upcoming" }}
        title="Upcoming Animes"
        path={`/anime?type=tv&status=upcoming`}
        className="my-5"
      />
    </main>
  );
};
