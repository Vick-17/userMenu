import React from "react";
import Header from "../components/Static/header";
import Menu from "../components/Menu/Menu";
import Footer from "../components/Static/Footer";
import Note from "../components/Menu/Note";

const Accueil = () => {
  return (
    <>
      <Header />
      <Menu />
      <Note />
      <Footer />
    </>
  );
};

export default Accueil;
