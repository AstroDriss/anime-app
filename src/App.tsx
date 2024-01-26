import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import Anime from "./pages/Anime";
import Header from "./components/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/anime/*" element={<Anime />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
