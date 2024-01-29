import genreService from "../services/genre-service";

interface Props {
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  genre: string;
}

const GenreSelect = ({ handleChange, genre }: Props) => {
  const genres = genreService.getGenres();

  return (
    <select
      onChange={handleChange}
      className="cursor-pointer rounded-md border border-gray-400 bg-darkGray text-center text-light"
      defaultValue={genre}
    >
      <option value="">All</option>

      {genres.map((g) => (
        <option key={g.mal_id} value={g.mal_id}>
          {g.name}
        </option>
      ))}
    </select>
  );
};

export default GenreSelect;
