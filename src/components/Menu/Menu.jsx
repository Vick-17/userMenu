import React, { useState, useEffect } from "react";
import { fetchMenuByDate, getFormations } from "../../Services/apiService";
import { formatDate } from "../../Services/formatDate";
import Marquee from "react-fast-marquee";

const Menu = () => {
  const [menus, setMenus] = useState(null);
  const [date, setDate] = useState(null);
  const [formation, setFormation] = useState(null);
  const [isEveningMenu, setIsEveningMenu] = useState(false); // Nouvel état pour le menu du soir

  useEffect(() => {
    const dateDuJour = new Date();
    const year = dateDuJour.getFullYear();
    const month = ("0" + (dateDuJour.getMonth() + 1)).slice(-2);
    const day = ("0" + dateDuJour.getDate()).slice(-2);
    const today = `${year}-${month}-${day}`;
    setDate(today);
    fetchMenuByDate(today)
      .then((data) => {
        setMenus(data);
      })
      .catch((error) => {
        console.error(error);
      });
    console.log(today);
  }, []);

  useEffect(() => {
    getFormations()
      .then((data) => {
        setFormation(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleShowNextDayMenu = () => {
    const currentDate = new Date(date);
    currentDate.setDate(currentDate.getDate() + 1);
    const year = currentDate.getFullYear();
    const month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
    const day = ("0" + currentDate.getDate()).slice(-2);
    const nextDay = `${year}-${month}-${day}`;
    setDate(nextDay);

    // Charger le menu du soir au lieu du menu du jour
    fetchMenuByDate(nextDay, isEveningMenu ? "soir" : "jour")
      .then((data) => {
        setMenus(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleShowPrevDayMenu = () => {
    const currentDate = new Date(date);
    currentDate.setDate(currentDate.getDate() - 1);
    const year = currentDate.getFullYear();
    const month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
    const day = ("0" + currentDate.getDate()).slice(-2);
    const prevDay = `${year}-${month}-${day}`;
    setDate(prevDay);

    // Charger le menu du soir au lieu du menu du jour
    fetchMenuByDate(prevDay, isEveningMenu ? "soir" : "jour")
      .then((data) => {
        setMenus(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // Fonction pour basculer entre le menu du jour et du soir
  const toggleMenuType = () => {
    setIsEveningMenu(!isEveningMenu);
    // Charger le menu du jour ou du soir en fonction de l'état
    const menuType = isEveningMenu ? "jour" : "soir";
    fetchMenuByDate(date, menuType)
      .then((data) => {
        setMenus(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <main>
        <div className="buttons-container">
          <img src={`${process.env.PUBLIC_URL}/next.svg`} style={{transform : "scaleX(-1)"}}  onClick={handleShowPrevDayMenu}/>
          <span>{formatDate(date)}</span>
          <img src={`${process.env.PUBLIC_URL}/next.svg`}  onClick={handleShowNextDayMenu}/>
        </div>
        <div className="menu-category">
          <div className="title-plat-container">
            <svg
              width="24px"
              height="24px"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              color="#000000"
            >
              <path
                d="M12 22a8 8 0 008-8c0-4.418-3.582-12-8-12S4 9.582 4 14a8 8 0 008 8z"
                stroke="#000000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M9.5 3.5L12 8l-2.5 3 2.5 3.5"
                stroke="#000000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
            <h2>Entrées</h2>
          </div>

          {menus ? (
            // Afficher les entrées du menu du soir s'il est disponible, sinon du menu du jour
            Object.values(
              isEveningMenu && menus.descriptionMenu.soir
                ? menus.descriptionMenu.soir.entree
                : menus.descriptionMenu.jour.entree
            ).map((entree, index) => (
              <div className="menu-item" key={index}>
                <span>{entree}</span>
              </div>
            ))
          ) : (
            <div className="loader">
              <span className="l">L</span>
              <span className="o">o</span>
              <span className="a">a</span>
              <span className="d">d</span>
              <span className="i">i</span>
              <span className="n">n</span>
              <span className="g">g</span>
              <span className="d1">.</span>
              <span className="d2">.</span>
            </div>
          )}
        </div>

        <div className="menu-category">
          <div className="title-plat-container">
            <svg
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              color="#000000"
            >
              <path
                d="M6 20h3m3 0H9m0 0v-5M17 20v-8s2.5-1 2.5-3V4.5M17 8.5v-4M4.5 11c1 2.128 4.5 4 4.5 4s3.5-1.872 4.5-4c1.08-2.297 0-6.5 0-6.5h-9s-1.08 4.203 0 6.5z"
                stroke="#000000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
            <h2>Plats</h2>
          </div>

          {menus ? (
            // Afficher les plats du menu du soir s'il est disponible, sinon du menu du jour
            Object.values(
              isEveningMenu && menus.descriptionMenu.soir
                ? menus.descriptionMenu.soir.plat
                : menus.descriptionMenu.jour.plat
            ).map((plat, index) => (
              <div className="menu-item" key={index}>
                <span>{plat}</span>
              </div>
            ))
          ) : (
            <div className="loader">
              <span className="l">L</span>
              <span className="o">o</span>
              <span className="a">a</span>
              <span className="d">d</span>
              <span className="i">i</span>
              <span className="n">n</span>
              <span className="g">g</span>
              <span className="d1">.</span>
              <span className="d2">.</span>
            </div>
          )}
        </div>

        <div className="menu-category">
          <div className="title-plat-container">
            <svg
              width="24px"
              height="24px"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              color="#000000"
            >
              <path
                d="M21.8 14c-.927 4.564-4.962 8-9.8 8-5.523 0-10-4.477-10-10 0-5.185 3.947-9.449 9-9.95"
                stroke="#000000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
              <path
                d="M6.5 10a.5.5 0 110-1 .5.5 0 010 1zM20.5 4a.5.5 0 110-1 .5.5 0 010 1zM12 19a1 1 0 110-2 1 1 0 010 2zM7 15.01l.01-.011M17 15.01l.01-.011M11 12.01l.01-.011M21 9.01l.01-.011M17 6.01l.01-.011M11 2c-.5 1.5.5 3 2.085 3C11 8.5 13 12 18 11.5c0 2.5 2.5 3 3.7 2.514"
                stroke="#000000"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
            <h2>Dessert</h2>
          </div>

          {menus ? (
            // Afficher les desserts du menu du soir s'il est disponible, sinon du menu du jour
            Object.values(
              isEveningMenu && menus.descriptionMenu.soir
                ? menus.descriptionMenu.soir.dessert
                : menus.descriptionMenu.jour.dessert
            ).map((dessert, index) => (
              <div className="menu-item" key={index}>
                <span>{dessert}</span>
              </div>
            ))
          ) : (
            <div className="loader">
              <span className="l">L</span>
              <span className="o">o</span>
              <span className="a">a</span>
              <span className="d">d</span>
              <span className="i">i</span>
              <span className="n">n</span>
              <span className="g">g</span>
              <span className="d1">.</span>
              <span className="d2">.</span>
            </div>
          )}
        </div>

        <div className="buttons-container">
          <button onClick={toggleMenuType}>
            Voir le {isEveningMenu ? "menu du jour" : "menu du soir"}
          </button>
        </div>
      </main>
    </>
  );
};

export default Menu;
