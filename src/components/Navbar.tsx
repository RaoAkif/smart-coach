import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <div className="flex justify-between">
        <div>
          <Link to="/">Logo</Link>
        </div>
        <ul className="flex">
          <li className="ml-[24px] hover:underline">
            <Link to="/players">Players</Link>
          </li>
          <li className="ml-[24px] hover:underline">
            <Link to="/events">Events</Link>
          </li>
          <li className="ml-[24px] hover:underline">
            <Link to="/coaches">Coaches</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
