import avatar from "../assets/avatar.png";

const Ad = () => {
  return (
    <aside className="relative flex flex-col-reverse items-center rounded-md bg-gradient-to-r from-yellow-200 to-primary p-6 text-center sm:flex-row sm:justify-between sm:text-left">
      <div>
        <h2 className="relative z-20 mb-4 text-2xl uppercase text-dark">
          want to visite the creator's website?
        </h2>
        <a
          href="https://idriss.douiri.org"
          target="_blank"
          className="rounded-md bg-dark px-2 py-1 text-light"
        >
          portfolio
        </a>
      </div>

      <img
        src={avatar}
        className="h-28 md:absolute md:right-8 md:top-0 md:h-full"
        alt=""
      />
    </aside>
  );
};

export default Ad;
