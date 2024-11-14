import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { LinkPropType } from "../types";
import ThemeSelector from "./ThemeSelector";

const Navbar = () => {
  const links: LinkPropType[] = [
    {
      name: "Speed Test",
      path: "/",
    },
    {
      name: "Play 1v1",
      path: "/play-1v1",
    },
    {
      name: "Practice",
      path: "/practice",
    },
    {
      name: "Sphere",
      path: "/sphere",
    },
    {
      name: "Rating",
      path: "/rating",
    },
  ];

  return (
    <nav className="flex justify-between items-center ">
      <h1 className="text-2xl">
        <FontAwesomeIcon icon={faPaw} />
        <span className="ml-1"> Fast Fingers</span>
      </h1>
      <div className="font-thin">
        <ol className="flex justify-around gap-3 items-center">
          {links.map((link: LinkPropType) => (
            <li key={link.name} className="mx-6 link">
              <NavLink
                className={({ isActive }) => (isActive ? "font-medium" : "")}
                to={link.path}
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ol>
      </div>
      <div>
        <ThemeSelector />
      </div>
      <div className="flex gap-5 font-medium">
        <button className="py-2 px-5 rounded-3xl bg-bgButton text-bgColor">
          Sign Up
        </button>
        <button className="py-2 px-5 rounded-3xl">Login</button>
      </div>
    </nav>
  );
};

export default Navbar;
