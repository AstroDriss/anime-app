import useAnimeCharacters from "../hooks/useAnimeCharacters";

interface Props {
  id: number | string;
}

const CharactersGrid = ({ id }: Props) => {
  const { characters, error, isLoading } = useAnimeCharacters(id);

  if (error) return <p>{error}</p>;

  return (
    <>
      {isLoading && <div className="skeleton h-2 w-44"></div>}
      {characters.length > 0 && (
        <h2 className="my-2 text-primary">Characters & Voice Actors</h2>
      )}

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {isLoading &&
          [0, 0, 0, 0].map((_, i) => <CharactersSkeleton key={i} />)}

        {characters.map((char) => (
          <div
            key={char.character.mal_id}
            className="roundedmd bg-darrounded-md flex items-center gap-3 rounded-md bg-darkGray p-5"
          >
            <img
              className="skeleton aspect-square w-10 rounded-full object-cover"
              src={char.character.images.webp.image_url}
              alt={char.character.name}
            />

            <div>
              <strong className="text-primary">{char.character.name}</strong>
              <p>{char?.voice_actors[0]?.person?.name || ""}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

function CharactersSkeleton({ ...props }) {
  return (
    <div
      {...props}
      className="roundedmd bg-darrounded-md flex items-center gap-3 rounded-md bg-darkGray p-5"
    >
      <div className="skeleton aspect-square w-10 rounded-full object-cover"></div>

      <div className="w-full">
        <div className="skeleton mb-2 h-3 w-10/12"></div>
        <div className="skeleton h-2 w-1/2"></div>
      </div>
    </div>
  );
}

export default CharactersGrid;
