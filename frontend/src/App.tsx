import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { useAppSelector } from "./redux/hooks";
import { Toaster } from "react-hot-toast";

function App() {
  const location = useLocation(); // To get the current URL
  const sphereGameStart = useAppSelector(
    (state) => state.sphere.sphereGameStart
  );

  // Check if the current route is "/"
  const isHomePage = location.pathname === "/";

  return (
    <main className="md:px-[6rem] px-[3rem] py-5 md:py-9 bg-bgColor h-screen text-textPrimary relative">
      {!isHomePage && <Navbar />}{" "}
      {/* Render Navbar only if it's not the home page */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full md:px-[6rem] px-[3rem] py-5 md:py-9">
        <Toaster />
        <Outlet />
      </div>
      {!isHomePage && !sphereGameStart && <Footer />}{" "}
      {/* Render Footer only if it's not the home page and sphere game hasn't started */}
    </main>
  );
}

export default App;
