import Recommendation from "../components/Recommendation";
import Trending from "../components/Trending";

export const Home = () => {
  return (
    <main>
      <div className="md:grid grid-cols-3 gap-4 mt-6">
        <Recommendation className="col-span-2" />
        <Trending />
      </div>
    </main>
  );
};
