import { useRef } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { navLinks } from "../constants";

const Header = () => {
  const { pathname } = useLocation();
  const searchRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    navigate(`/anime?q=${searchRef?.current?.value}`);
  };

  return (
    <header className="py-3 flex items-center justify-between gap-2 mb-5">
      <Link to="/" className="text-primary font-bold text-xl">
        AniLand
      </Link>

      <form
        className="flex items-center gap-1 bg-darkGray px-2 rounded-md w-80 focus-within:outline-gray-500 focus-within:outline"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          aria-label="Search"
          className="bg-transparent w-full py-1 p-2 order-2 focus:outline-none"
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
