import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink } from "react-router-dom";
import { LinkPropType } from "../types";
import ThemeSelector from "./ThemeSelector";
import { useAppSelector } from "../redux/hooks";
import SignOutModal from "./SignOut"; // Updated import

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [signOutModal, setSignOutModal] = useState(false); // Fixed typo

  const gameStart = useAppSelector((state) => state.practice.startPracticeGame);

  const isAuthenticated = localStorage.getItem("playerName") ? true : true;

  const links: LinkPropType[] = [
    { name: "Speed Test", path: "/" },
    { name: "Play 1v1", path: "/play-1v1" },
    { name: "Practice", path: "/practice" },
    { name: "Sphere", path: "/sphere" },
    { name: "Rating", path: "/rating" },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleSignOut = () => {
    // Handle sign-out logic here (e.g., clearing localStorage, redirecting)
    localStorage.removeItem("playerName");
    setSignOutModal(false);
    window.location.reload(); // Or redirect to login page
  };

  const handleCloseModal = () => {
    setSignOutModal(false);
  };

  return (
    <>
      <nav
        style={{
          pointerEvents: gameStart ? "none" : "initial",
          filter: gameStart ? "blur(3px)" : "blur(0px)",
        }}
        className="flex justify-between items-center p-4 bg-bgColor fixed top-0 left-0 right-0 z-50"
        aria-disabled={gameStart} // Accessibility enhancement
      >
        {/* Sign-Out Modal */}
        <SignOutModal
          isOpen={signOutModal}
          onClose={handleCloseModal}
          onSignOut={handleSignOut}
        />

        {/* Logo */}
        <h1
          className={`flex items-center text-xl md:text-2xl font-bold ${
            gameStart ? "cursor-not-allowed" : ""
          } text-gray-800 dark:text-white`}
          tabIndex={gameStart ? -1 : 0}
        >
          <FontAwesomeIcon icon={faPaw} className="text-textPrimary" />
          <span className="ml-2">Fast Fingers</span>
        </h1>

        {/* Desktop Menu */}
        <div
          className={`hidden md:flex font-thin ${
            gameStart ? "pointer-events-none" : ""
          }`}
        >
          <ol className="flex space-x-16">
            {links.map((link) => (
              <li key={link.name} className="link">
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    isActive
                      ? "text-blue-500 font-medium"
                      : "text-gray-600 dark:text-gray-300 hover:text-blue-500"
                  }
                  tabIndex={gameStart ? -1 : 0}
                  aria-disabled={gameStart}
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ol>
        </div>

        {/* Right Side (Theme Selector & Buttons) */}
        <div
          className={`hidden md:flex items-center space-x-4 ${
            gameStart ? "pointer-events-none" : ""
          }`}
        >
          <ThemeSelector />
          {isAuthenticated ? (
            <button
              className="py-2 px-5 rounded-3xl bg-pink-500 text-white hover:bg-pink-600 transition"
              tabIndex={gameStart ? -1 : 0}
              onClick={() => setSignOutModal(true)}
            >
              Sign Out
            </button>
          ) : (
            <Link to="/sign-up">
              <button
                className="py-2 px-5 rounded-3xl bg-pink-500 text-white hover:bg-pink-600 transition"
                tabIndex={gameStart ? -1 : 0}
              >
                Sign Up
              </button>
            </Link>
          )}
          {!isAuthenticated && (
            <Link to="/login">
              <button
                className="py-2 px-5 rounded-3xl border border-pink-500 text-pink-500 hover:bg-pink-50 transition"
                tabIndex={gameStart ? -1 : 0}
              >
                Login
              </button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <ThemeSelector />
          <button
            onClick={toggleMobileMenu}
            className="ml-2 text-gray-800 dark:text-white focus:outline-none"
            tabIndex={gameStart ? -1 : 0}
            aria-disabled={gameStart}
          >
            <FontAwesomeIcon
              icon={isMobileMenuOpen ? faTimes : faBars}
              size="lg"
            />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div
            className={`absolute top-16 left-0 right-0 bg-white dark:bg-gray-800 shadow-md md:hidden ${
              gameStart ? "pointer-events-none" : ""
            }`}
          >
            <ol className="flex flex-col items-center space-y-4 py-4">
              {links.map((link) => (
                <li key={link.name} className="link">
                  <NavLink
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      isActive
                        ? "text-blue-500 font-medium"
                        : "text-gray-600 dark:text-gray-300 hover:text-blue-500"
                    }
                    tabIndex={gameStart ? -1 : 0}
                    aria-disabled={gameStart}
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
              <div className="flex flex-col items-center space-y-2">
                <button
                  className="w-32 py-2 rounded-3xl bg-pink-500 text-white hover:bg-pink-600 transition"
                  tabIndex={gameStart ? -1 : 0}
                >
                  Sign Up
                </button>
                <button
                  className="w-32 py-2 rounded-3xl border border-pink-500 text-pink-500 hover:bg-pink-50 transition"
                  tabIndex={gameStart ? -1 : 0}
                >
                  Login
                </button>
              </div>
            </ol>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
