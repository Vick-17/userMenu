import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBurgerContainerOpen, setIsBurgerContainerOpen] = useState(false);
  const [cookies, setCookies] = useCookies(['monCookie']);

  useEffect(() => {
    const cookieValue = cookies.monCookie;
  }, [cookies])

  const handleSetCookies = () => {
    setCookies('monCookie', 'valeurCookie')
  }

  const handleModalOpen = () => {
    setIsModalOpen(!isModalOpen);
    setIsBurgerContainerOpen(!isModalOpen);
  };



  return (
    <header>
      <div className="title">
        <h1>Menu du jour</h1>
        Heure du passage au self : 12:30
      </div>
      <div
        className={`burger-container ${isBurgerContainerOpen ? "modal-open" : ""
          }`}
      >
        <label className="burger" htmlFor="burger">
          <input type="checkbox" id="burger" onClick={handleModalOpen}></input>
          <span></span>
          <span></span>
          <span></span>
        </label>
      </div>
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <Link to="/main"> - Connaitre son heure de passage </Link>
            <Link to="/main"> - Voir le tableau des alergène</Link>
            <Link to="/main"> - Occupation </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
