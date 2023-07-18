import React from "react";
import Header from "../components/Static/header";
import Card from "../components/Menu/Card";
import Footer from "../components/Static/Footer";
import Note from "../components/Menu/Note";

const accueil = () => {
  return (
    <>
      <Header />
      <Card />
      <Note />
      <Footer />
    </>
  );
};

export default accueil;