import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./page/accueil";
import Blague from "./styles/pages/Blague";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/main" element={<Blague />} />
    </Routes>
  );
}

export default App;
