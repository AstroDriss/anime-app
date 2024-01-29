import welcom from "../../public/hello-removebg.png";

const About = () => {
  return (
    <main className="flex gap-2 text-gray-300">
      <div>
        <h1 className="mb-4 text-3xl text-light">About</h1>
        <p>
          This is a simple anime app created with{" "}
          <a
            className="text-primary/80 underline"
            href="https://react.dev/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React.js
          </a>{" "}
          and{" "}
          <a
            className="text-primary/80 underline"
            href="https://jikan.moe/"
            target="_blank"
          >
            JIKAN API
          </a>{" "}
          by{" "}
          <a
            className="text-primary/80 underline"
            href="https://douiri.org"
            target="_blank"
          >
            <strong>Idriss Douiri</strong>
          </a>{" "}
          for learning purposes.
        </p>
      </div>
      <img src={welcom} className="mx-auto" width={200} alt="" />
    </main>
  );
};

export default About;