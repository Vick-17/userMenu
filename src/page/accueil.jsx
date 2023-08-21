import React from "react";
import Header from "../components/Static/header";
import Menu from "../components/Menu/Menu";
import Footer from "../components/Static/Footer";
import Note from "../components/Menu/Note";
import MarqueeComponent from "../components/MarqueeComponent";

const Accueil = () => {
  return (
    <>
      <Header />
        <MarqueeComponent></MarqueeComponent>
      <Menu />
      <Note />
      <Footer />
    </>
  );
};

export default Accueil;
