import { Outlet } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { useAppSelector } from "./redux/hooks";

function App() {
  const sphereGameStart = useAppSelector(
    (state) => state.sphere.sphereGameStart
  );

  return (
    <main className="md:px-[6rem] px-[3rem] py-5 md:py-9 bg-bgColor h-screen text-textPrimary relative">
      <Navbar />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full md:px-[6rem] px-[3rem] py-5 md:py-9">
        <Outlet />
      </div>
      {!sphereGameStart && <Footer />}
    </main>
  );
}

export default App;
