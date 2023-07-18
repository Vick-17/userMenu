import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBurgerContainerOpen, setIsBurgerContainerOpen] = useState(false);
  const [cookies, setCookies] = useCookies(['monCookie']);

  useEffect(() =>  {
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
            <h2>Connexion</h2>
            <form className="login-form">
              <select className="custom-select">
                <option value="">Formation</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
              <button type="submit" onClick={handleSetCookies}>
                Selectioné la formation
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
