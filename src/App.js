import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./page/accueil";
import Blague from "./styles/pages/Blague";
import BlagueComponent from "./components/Burger/BlagueComponent";
import ArtisteComponent from "./components/Burger/ArtisteComponent";
import HoroscopeComponent from "./components/Burger/HoroscopeComponent";
import EnigmeComponent from "./components/Burger/EnigmeComponent";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/blague" element={<BlagueComponent />} />
      <Route path="/artiste" element={<ArtisteComponent />} />
      <Route path="/enigme" element={<EnigmeComponent />} />
      <Route path="/horoscope" element={<HoroscopeComponent />} />
    </Routes>
  );
}

export default App;
