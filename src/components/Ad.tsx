import avatar from "../assets/avatar.png";

const Ad = () => {
  return (
    <aside className="bg-gradient-to-r from-yellow-200 to-primary p-8 rounded-md flex sm:flex-row sm:justify-between relative flex-col-reverse items-center text-center sm:text-left">
      <div>
        <h2 className="text-dark text-2xl uppercase mb-4 z-20 relative">
          want to visite the creator's website?
        </h2>
        <a
          href="https://douiri.org"
          target="_blank"
          className="bg-dark text-light rounded-md py-1 px-2"
        >
          portfolio
        </a>
      </div>

      <img
        src={avatar}
        className="h-28 md:absolute md:top-0 md:right-8 md:h-full"
        alt=""
      />
    </aside>
  );
};

export default Ad;
