const NotFound = () => {
  return (
    <main className="h-full grid place-items-center pt-52 text-gray-400">
      <h1
        className={`text-[clamp(8rem,10vw_+_2rem,15rem);] text-white uppercase leading-13`}
      >
        404 <br />
      </h1>
      <p className="text-xl">not found</p>
    </main>
  );
};

export default NotFound;
