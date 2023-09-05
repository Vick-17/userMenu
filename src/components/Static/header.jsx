import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Link } from "react-router-dom";
import {
  affectFormation,
  checkStudent,
  getFormations, getInfosPhone, getYesterdayGaspi,
} from "../../Services/apiService";
import { nanoid } from "nanoid";
import toast, { Toaster } from "react-hot-toast";
import BurgerComponent from "../Burger/BurgerComponent";
import {useSocket} from "../../context/SocketContext";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBurgerContainerOpen, setIsBurgerContainerOpen] = useState(false);
  const [cookies, setCookies, removeCookie] = useCookies(["cookieFormation"]);
  const [formationStagiaire, setFormationStagiaire] = useState(null);
  const [formations, setFormations] = useState([]);
  const [selectedFormation, setSelectedFormation] = useState("");
  const [refresh, setRefresh] = useState(false);
  const socket = useSocket();

  const toastCookies = () => toast()

  useEffect(() => {
    getFormations().then((response) => {
      setFormations(response);
    });
  }, []);


  useEffect(() => {
    if (cookies.cookieFormation) {
      for (let i = 0; i < formations.length; i++) {
        if (formations[i].id == cookies.cookieFormation) {
          if(formations[i].delete == true || formations[i].active == false){
            setFormationStagiaire(null);
            removeCookie("cookieFormation");
          }else{
            setFormationStagiaire(formations[i]);
          }
        }
      }
    }
  }, [formations, refresh]);

  useEffect(() => {
    console.log("formation modif", socket.message);

    if (socket.message) {
      getFormations().then((response) => {
        setFormations(response);
        console.log(response);
      });
    }
  }, [socket.message]);


  const handleModalOpen = () => {
    setIsModalOpen(!isModalOpen);
    setIsBurgerContainerOpen(!isModalOpen);
    if(isModalOpen){
      document.body.style.overflow = 'auto'
    }else{
      document.body.style.overflow = 'hidden'
    }
  };

  const handleClickConfirmFormation = () => {
    let expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    setCookies("cookieFormation", selectedFormation, {
      path: "/",
      expires: expiryDate,
    });
    toast.success("Formation enregistrée !", {duration: 1000});
    setRefresh((prevState) => !prevState);
  };

  const update = () => {
    setRefresh((prevState) => !prevState);
  }

  const handleChangeSelect = (e) => {
    setSelectedFormation(e);
  };

  const handleAccept = () => {
    let expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    setCookies("cookieFormation", selectedFormation, {
      path: "/",
      expires: expiryDate,
    });
    setRefresh((prevState) => !prevState);
    console.log('Cookies acceptés.');
    toast.dismiss(cookieToastId);
    displayToastAccept();
    setTimeout(()=>{
      toast.dismiss(toastAccept);
    }, 1000)

  }

  const handleReject = () => {
    console.log('Cookies refusés.');
    toast.dismiss(cookieToastId);
  }

  let cookieToastId;
  let toastAccept

  const displayToastAccept = () => {
    let formationToast1;
    const formToast1 = () =>{
      formationToast1 = toast.success("Formation enregistrée !", {duration: 1000});
    }
    formToast1();
    setTimeout(()=>{
      toast.dismiss(formationToast1);
    }, 1500)
  }

  const displayToast = () => {
    if(selectedFormation !== ""){
      cookieToastId = toast(
          (t) => (
              <div style={{display: "flex", flexDirection: "column", textAlign: "center"}}>
                <div>Aucune donnée personnelle n'est collectée sur ce site, vous devez cependant accepter les cookies pour sauvegarder votre formation et permettre la gestion des votes anonymes.</div>
                <div>
                  <button style={{marginRight: "1em"}} className="formation-button" onClick={handleAccept}>J'accepte</button>
                  <button className="formation-button" onClick={handleReject}>Je refuse</button>
                </div>
              </div>
          ),
          {
            duration: Infinity, // Le toast ne disparaît pas tout seul
            position: 'bottom-center',
          }
      );
    }else{
      let formationToast2;
      const formToast2 = () =>{
        formationToast2 = toast.error("Sélectionnez d'abord une formation !", {duration: 1000});
      }
      formToast2();
      setTimeout(()=>{
        toast.dismiss(formationToast2);
      }, 1500)
    }

  }

  return (
    <header>
      <div>
        <Toaster position="top-left" reverseOrder={false} />
      </div>
      <div className="title" style={{textAlign: "center"}}>
        <h1>Menu du jour</h1>
        {formationStagiaire ? (
          <div>
            {formationStagiaire.nom} : {formationStagiaire.horaire.heure}
          </div>
        ) : (
          <div className="select-container">
            <select
              className="formation-select"
            value={selectedFormation}
              onChange={(e) => setSelectedFormation(e.target.value)}
            >
              <option value="">Sélectionner une formation</option>
              {formations.length > 0 &&
                formations.filter(formation => !formation.delete && formation.active).map((formation) => (
                  <option value={formation.id} key={nanoid()}>
                    {formation.nom}
                  </option>
                ))}
            </select>
            <button
              className="formation-button"
              onClick={displayToast}
            >
              Valider
            </button>
          </div>
        )}
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
        <div className="modal" style={{height: "100%", overflow: "hidden"}}>
          <div className="modal-content" style={{height: "100%", overflow: "hidden"}}>
            <BurgerComponent formations={formations} formation={formationStagiaire} onSelectedFormationUpdate={update}></BurgerComponent>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
