import { useRef, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { navLinks } from "../constants/index";
import { IoClose, IoMenuOutline } from "react-icons/io5";

const Header = () => {
  const { pathname } = useLocation();
  const searchRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
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
    <header className="sticky top-0 z-20 mb-5 flex items-center justify-between gap-8 bg-dark py-3 ">
      <Link to="/" className="whitespace-nowrap text-xl font-bold text-primary">
        アニメ
      </Link>

      <form
        className="flex w-full items-center gap-1 rounded-md bg-darkGray px-2 focus-within:outline focus-within:outline-gray-500"
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
        <ul className="hidden gap-10 sm:flex">
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

      <button onClick={() => setToggle(!toggle)} className="block sm:hidden">
        {toggle ? <IoClose size={28} /> : <IoMenuOutline size={28} />}
      </button>

      {toggle && (
        <nav className="absolute right-0 top-16 block rounded-md bg-darkGray sm:hidden">
          <ul className="flex flex-col p-4">
            {navLinks.map((link) => (
              <li
                className="border-b border-gray-400 py-3 last:border-none"
                key={link.id}
              >
                <Link
                  to={link.path}
                  aria-current={pathname == link.path && `page`}
                  className={`${
                    pathname == link.path ? "text-primary" : ""
                  } px-10  capitalize`}
                >
                  {link.text}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
