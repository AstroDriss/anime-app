import { useRef } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { navLinks } from "../constants/index";

const Header = () => {
  const { pathname } = useLocation();
  const searchRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (pathname !== "/anime") {
      navigate(`/anime?q=${searchRef?.current?.value}`);
    } else {
      searchParams.set("q", searchRef?.current?.value as string);
      setSearchParams(searchParams);
    }
  };

  return (
    <header className="sticky top-0 z-20 mb-5 flex items-center justify-between gap-2 bg-dark py-3">
      <Link to="/" className="text-xl font-bold text-primary">
        AniLand
      </Link>

      <form
        className="flex w-80 items-center gap-1 rounded-md bg-darkGray px-2 focus-within:outline focus-within:outline-gray-500"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          aria-label="Search"
          className="order-2 w-full bg-transparent p-2 py-1 focus:outline-none"
          placeholder="Search Anime"
          ref={searchRef}
        />
        <button aria-label="search" className="order-1">
          <FaMagnifyingGlass className="text-gray-400" />
        </button>
      </form>

      <nav>
        <ul className="flex gap-10">
          {navLinks.map((link) => (
            <li key={link.id}>
              <Link
                to={link.path}
                aria-current={pathname == link.path && `page`}
                className={`${
                  pathname == link.path ? "text-primary" : ""
                } capitalize`}
              >
                {link.text}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
