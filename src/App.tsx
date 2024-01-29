import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import Header from "./components/Header";
import AnimeDetails from "./pages/AnimeDetails";
import NotFound from "./pages/NotFound";
import AnimePage from "./pages/AnimePage";
import About from "./pages/About";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="/anime" element={<AnimePage />} />
        <Route path="/anime/:mal_id" element={<AnimeDetails />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
