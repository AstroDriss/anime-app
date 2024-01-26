import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="py-3">
      <Link to="/" className="text-primary font-bold text-xl">
        AniLand
      </Link>
    </header>
  );
};

export default Header;
