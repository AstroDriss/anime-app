import Ad from "../components/Ad";
import Recommendation from "../components/Recommendation";
import Trending from "../components/Trending";

export const Home = () => {
  return (
    <main>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-4 mt-7 mb-5">
        <Recommendation className="col-span-2" />
        <Trending />
      </div>
      <Ad />
    </main>
  );
};
