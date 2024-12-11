import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Fertilizer from "./pages/fertilizer/fertilizer";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fertilizer" element={<Fertilizer />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
// code completed
export default App;
