import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Options from "./components/Options";
import Typing from "./components/Typing";

function App() {
  return (
    <main className="px-[6rem] py-9 bg-bgColor h-screen text-textPrimary flex flex-col gap-28">
      <Navbar />
      <Typing />
      <Options />
      <Footer />
    </main>
  );
}

export default App;
