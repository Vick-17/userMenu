import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import {affectFormation, checkStudent, getFormations} from "../../Services/apiService";
import { nanoid } from 'nanoid';
import toast, {Toaster} from "react-hot-toast";


const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBurgerContainerOpen, setIsBurgerContainerOpen] = useState(false);
  const [cookies, setCookies] = useCookies(['cookieFormation']);
  const [formationStagiaire, setFormationStagiaire] = useState(null);
  const [formations, setFormations] = useState([]);
  const [selectedFormation, setSelectedFormation] = useState(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(()=>{
    getFormations().then((response)=>{
      setFormations(response);
      console.log(response);
    })
  }, [])


  useEffect(() => {
    if(cookies.cookieFormation){
      for(let i=0; i<formations.length; i++){
        if(formations[i].id == cookies.cookieFormation){
          setFormationStagiaire(formations[i]);
        }
      }
    }
  }, [formations, refresh])

  const handleSetCookies = () => {
  }

  const handleModalOpen = () => {
    setIsModalOpen(!isModalOpen);
    setIsBurgerContainerOpen(!isModalOpen);
  };

  const handleClickConfirmFormation = () => {
    let expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    setCookies('cookieFormation', selectedFormation, {path: "/", expires: expiryDate});
    toast.success('Formation enregistrée !')
    setRefresh(prevState => !prevState);
  }

  const handleChangeSelect = (e) => {
    setSelectedFormation(e);
  }


  return (
    <header>
      <div><Toaster  position="top-left"
                     reverseOrder={false}/></div>
      <div className="title">
        <h1>Menu du jour</h1>
        {formationStagiaire ?
            <div>{formationStagiaire.nom} : {formationStagiaire.horaire.heure}</div>
            :
          <div>
          <select value={selectedFormation} onChange={(e) => handleChangeSelect(e.target.value)}>
          <option disabled>Selectionner une formation</option>
        {formations.length > 0 && formations.map((formation)=>(
          <option value={formation.id} key={nanoid()}>{formation.nom}</option>
          ))}
          </select>
          <button onClick={()=>handleClickConfirmFormation()}>Valider</button>
          </div>
        }
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
