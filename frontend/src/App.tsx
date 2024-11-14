import { Outlet } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

function App() {
  return (
    <main className="px-[6rem] py-9 bg-bgColor h-screen text-textPrimary relative">
      <Navbar />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-[6rem] py-9">
        <Outlet />
      </div>
      <Footer />
    </main>
  );
}

export default App;
