import React, { useEffect, useState } from "react";
import { fetchMenuByDate, updateMenu } from "../../Services/apiService";

const DashboardPage = ({isFullscreen}) => {
  const [menu, setMenu] = useState(null);
  const [date, setDate] = useState(null);
  const [menuJour, setMenuJour] = useState(null);
  const [menuSoir, setMenuSoir] = useState(null);
  const [isEditingJour, setIsEditingJour] = useState(false);
  const [isEditingSoir, setIsEditingSoir] = useState(false);
  const [editedMenuJour, setEditedMenuJour] = useState(null);
  const [editedMenuSoir, setEditedMenuSoir] = useState(null);
  const [newEntryJour, setNewEntryJour] = useState("");
  const [newPedagoJour, setNewPedagoJour] = useState("");
  const [newDishJour, setNewDishJour] = useState("");
  const [newDessertJour, setNewDessertJour] = useState("");
  const [newEntrySoir, setNewEntrySoir] = useState("");
  const [newDishSoir, setNewDishSoir] = useState("");
  const [newDessertSoir, setNewDessertSoir] = useState("");
  const [deletedInputsJour, setDeletedInputsJour] = useState([]);
  const [deletedInputsSoir, setDeletedInputsSoir] = useState([]);

  useEffect(() => {
    const dateDuJour = new Date();
    const year = dateDuJour.getFullYear();
    const month = ("0" + (dateDuJour.getMonth() + 1)).slice(-2); // Months are 0 based, hence the '+1'
    const day = ("0" + dateDuJour.getDate()).slice(-2);
    const today = `${year}-${month}-${day}`;
    setDate(today);
  }, []);

  useEffect(() => {
    fetchMenuByDate(date)
      .then((response) => {
        setMenuJour(response.descriptionMenu.jour);
        setMenuSoir(response.descriptionMenu.soir);
        setMenu(response);
      })
      .catch((error) => {
        setMenuJour(null);
        setMenuSoir(null);
      });
  }, [date]);

  const handleClickSuivant = () => {
    let dateStringVersDate = new Date(date);
    dateStringVersDate.setDate(dateStringVersDate.getDate() + 1);
    let nextDateString = dateStringVersDate.toISOString().split("T")[0];
    setDate(nextDateString);
  };
  const handleClickPrecedent = () => {
    let dateStringVersDate = new Date(date);
    dateStringVersDate.setDate(dateStringVersDate.getDate() - 1);
    let nextDateString = dateStringVersDate.toISOString().split("T")[0];
    setDate(nextDateString);
  };

  const handleEditJour = () => {
    setIsEditingJour(true);
    setEditedMenuJour({ ...menuJour });
  };

  const handleEditSoir = () => {
    setIsEditingSoir(true);
    setEditedMenuSoir({ ...menuSoir });
  };

  const handleSaveJour = () => {
    if (
      editedMenuJour &&
      editedMenuJour.entree &&
      editedMenuJour.plat &&
      editedMenuJour.dessert
    ) {
      setMenuJour(editedMenuJour);
      setIsEditingJour(false);
      const updatedMenu = { ...menu };
      updatedMenu.descriptionMenu.jour = { ...editedMenuJour };
      updateMenu(menu._links.self.href, updatedMenu)
        .then((r) => {
          console.log("modif ok");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.error(
        "Error: editedMenuJour or one of its properties is undefined"
      );
    }
  };

  const handleSaveSoir = () => {
    setMenuSoir({ ...editedMenuSoir });
    setIsEditingSoir(false);
    const updatedMenu = { ...menu };
    updatedMenu.descriptionMenu.soir = { ...editedMenuSoir };
    updateMenu(menu._links.self.href, updatedMenu).then((r) => {
      console.log("modif ok");
    });
  };

  const handleCancelJour = () => {
    setIsEditingJour(false);
    setEditedMenuJour(null);
  };

  const handleCancelSoir = () => {
    setIsEditingSoir(false);
    setEditedMenuSoir(null);
  };

  const handleInputChangeJour = (e, section, index) => {
    const value = e.target.value;
    setEditedMenuJour((prevMenu) => {
      const updatedMenu = { ...prevMenu };
      if (section === "entree") {
        updatedMenu.entree[index] = value;
      } else if (section === "plat") {
        updatedMenu.plat[index] = value;
      } else if (section === "dessert") {
        updatedMenu.dessert[index] = value;
      } else if (section === "platpedago") {
        updatedMenu.platpedago[index] = value;
      }
      return updatedMenu;
    });
  };

  const handleInputChangeSoir = (e, section, index) => {
    const value = e.target.value;
    setEditedMenuSoir((prevMenu) => {
      const updatedMenu = { ...prevMenu };
      if (section === "entree") {
        updatedMenu.entree[index] = value;
      } else if (section === "plat") {
        updatedMenu.plat[index] = value;
      } else if (section === "dessert") {
        updatedMenu.dessert[index] = value;
      }
      return updatedMenu;
    });
  };

  const handleAddEntryJour = () => {
    setEditedMenuJour((prevMenu) => {
      const updatedMenu = {
        ...prevMenu,
        entree: [...prevMenu.entree, newEntryJour],
      };
      return updatedMenu;
    });
    setNewEntryJour("");
  };

  const handleAddDishJour = () => {
    setEditedMenuJour((prevMenu) => {
      const updatedMenu = {
        ...prevMenu,
        plat: [...prevMenu.plat, newDishJour],
      };
      return updatedMenu;
    });
    setNewDishJour("");
  };
  const handleAddPedagoJour = () => {
    setEditedMenuJour((prevMenu) => {
      const updatedMenu = {
        ...prevMenu,
        platpedago: [...prevMenu.platpedago, newPedagoJour],
      };
      return updatedMenu;
    });
    setNewPedagoJour("");
  };

  const handleAddDessertJour = () => {
    setEditedMenuJour((prevMenu) => {
      const updatedMenu = {
        ...prevMenu,
        dessert: [...prevMenu.dessert, newDessertJour],
      };
      return updatedMenu;
    });
    setNewDessertJour("");
  };

  const handleAddEntrySoir = () => {
    setEditedMenuSoir((prevMenu) => {
      const updatedMenu = {
        ...prevMenu,
        entree: [...prevMenu.entree, newEntrySoir],
      };
      return updatedMenu;
    });
    setNewEntrySoir("");
  };

  const handleAddDishSoir = () => {
    setEditedMenuSoir((prevMenu) => {
      const updatedMenu = {
        ...prevMenu,
        plat: [...prevMenu.plat, newDishSoir],
      };
      return updatedMenu;
    });
    setNewDishSoir("");
  };

  const handleAddDessertSoir = () => {
    setEditedMenuSoir((prevMenu) => {
      const updatedMenu = {
        ...prevMenu,
        dessert: [...prevMenu.dessert, newDessertSoir],
      };
      return updatedMenu;
    });
    setNewDessertSoir("");
  };

  const handleDeleteJour = (section, index) => {
    setEditedMenuJour((prevMenu) => {
      const updatedMenu = { ...prevMenu };

      if (section === "entree") {
        const updatedEntree = [...updatedMenu.entree]; // Crée une copie du tableau
        updatedEntree.splice(index, 1); // Modifie la copie
        updatedMenu.entree = updatedEntree; // Utilise la copie modifiée
      } else if (section === "plat") {
        const updatedPlat = [...updatedMenu.plat]; // Crée une copie du tableau
        updatedPlat.splice(index, 1); // Modifie la copie
        updatedMenu.plat = updatedPlat; // Utilise la copie modifiée
      } else if (section === "platpedago") {
        const updatedPlat = [...updatedMenu.platpedago]; // Crée une copie du tableau
        updatedPlat.splice(index, 1); // Modifie la copie
        updatedMenu.platpedago = updatedPlat; // Utilise la copie modifiée
      } else if (section === "dessert") {
        const updatedDessert = [...updatedMenu.dessert]; // Crée une copie du tableau
        updatedDessert.splice(index, 1); // Modifie la copie
        updatedMenu.dessert = updatedDessert; // Utilise la copie modifiée
      }

      return updatedMenu;
    });
  };

  const handleDeleteSoir = (section, index) => {
    setEditedMenuSoir((prevMenu) => {
      const updatedMenu = { ...prevMenu };

      if (section === "entree") {
        const updatedEntree = [...updatedMenu.entree]; // Crée une copie du tableau
        updatedEntree.splice(index, 1); // Modifie la copie
        updatedMenu.entree = updatedEntree; // Utilise la copie modifiée
      } else if (section === "plat") {
        const updatedPlat = [...updatedMenu.plat]; // Crée une copie du tableau
        updatedPlat.splice(index, 1); // Modifie la copie
        updatedMenu.plat = updatedPlat; // Utilise la copie modifiée
      } else if (section === "dessert") {
        const updatedDessert = [...updatedMenu.dessert]; // Crée une copie du tableau
        updatedDessert.splice(index, 1); // Modifie la copie
        updatedMenu.dessert = updatedDessert; // Utilise la copie modifiée
      }

      return updatedMenu;
    });
  };

  return (
    <>
      <div className="dashboard-container">
        <div className="date-navigation">
          <div className="navigation-item" onClick={handleClickPrecedent}>
            Menus précédents
          </div>
          <div className="date">{date}</div>
          <div className="navigation-item" onClick={handleClickSuivant}>
            Menus suivants
          </div>
        </div>
        {menuJour ? (
          <>
            <div>
              <div className="menu-section">
                <h1>Menu du jour</h1>

                {isEditingJour ? (
                  <>
                    <h2>Entrées</h2>
                    <ul>
                      {editedMenuJour.entree.map((item, index) => (
                        <li key={index}>
                          <input
                            type="text"
                            value={item}
                            onChange={(e) =>
                              handleInputChangeJour(e, "entree", index)
                            }
                            className={
                              deletedInputsJour.includes(`entree-${index}`)
                                ? "deleted"
                                : " form-control"
                            }
                          />
                          <button
                            onClick={() => handleDeleteJour("entree", index)}
                          >
                            Supprimer
                          </button>
                        </li>
                      ))}
                      <li>
                        <input
                          type="text"
                          value={newEntryJour}
                          onChange={(e) => setNewEntryJour(e.target.value)}
                        />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddEntryJour();
                          }}
                        >
                          Ajouter
                        </button>
                      </li>
                    </ul>
                    <h2>Plats</h2>
                    <ul>
                      {editedMenuJour.plat.map((item, index) => (
                        <li key={index}>
                          <input
                            type="text"
                            value={item}
                            onChange={(e) =>
                              handleInputChangeJour(e, "plat", index)
                            }
                            className={
                              deletedInputsJour.includes(`plat-${index}`)
                                ? "deleted"
                                : ""
                            }
                          />
                          <button
                            onClick={() => handleDeleteJour("plat", index)}
                          >
                            Supprimer
                          </button>
                        </li>
                      ))}
                      <li>
                        <input
                          type="text"
                          value={newDishJour}
                          onChange={(e) => setNewDishJour(e.target.value)}
                        />
                        <button onClick={handleAddDishJour}>Ajouter</button>
                      </li>
                    </ul>
                    <h2>Plats pédagogiques</h2>
                    <ul>
                      {editedMenuJour.platpedago.map((item, index) => (
                        <li key={index}>
                          <input
                            type="text"
                            value={item}
                            onChange={(e) =>
                              handleInputChangeJour(e, "platpedago", index)
                            }
                            className={
                              deletedInputsJour.includes(`platpedago-${index}`)
                                ? "deleted"
                                : ""
                            }
                          />
                          <button
                            onClick={() =>
                              handleDeleteJour("platpedago", index)
                            }
                          >
                            Supprimer
                          </button>
                        </li>
                      ))}
                      <li>
                        <input
                          type="text"
                          value={newPedagoJour}
                          onChange={(e) => setNewPedagoJour(e.target.value)}
                        />
                        <button onClick={handleAddPedagoJour}>Ajouter</button>
                      </li>
                    </ul>
                    <h2>Desserts</h2>
                    <ul>
                      {editedMenuJour.dessert.map((item, index) => (
                        <li key={index}>
                          <input
                            type="text"
                            value={item}
                            onChange={(e) =>
                              handleInputChangeJour(e, "dessert", index)
                            }
                            className={
                              deletedInputsJour.includes(`dessert-${index}`)
                                ? "deleted"
                                : ""
                            }
                          />
                          <button
                            onClick={() => handleDeleteJour("dessert", index)}
                          >
                            Supprimer
                          </button>
                        </li>
                      ))}
                      <li>
                        <input
                          type="text"
                          value={newDessertJour}
                          onChange={(e) => setNewDessertJour(e.target.value)}
                        />
                        <button onClick={handleAddDessertJour}>Ajouter</button>
                      </li>
                    </ul>
                    <button onClick={handleSaveJour}>Valider</button>
                    <button onClick={handleCancelJour}>Annuler</button>
                  </>
                ) : (
                  <>
                    <h2>Entrées</h2>
                    <ul>
                      {menuJour.entree.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                    <h2>Plats</h2>
                    <ul>
                      {menuJour.plat.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                    {menuJour.platpedago.length > 0 ? (
                      <>
                        <h2>Plats pédagogiques</h2>
                        <ul>
                          {menuJour.platpedago.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </>
                    ) : null}

                    <h2>Desserts</h2>
                    <ul>
                      {menuJour.dessert.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                    {isFullscreen ?
                      <button onClick={handleEditJour}>Modifier</button>
                    :null}
                    
                  </>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="no-menu">Pas de menu du jour</div>
        )}

        {menuSoir ? (
          <>
            <div>
              <div>
                <h1>Menu du soir</h1>

                {isEditingSoir ? (
                  <>
                    <h2>Entrées</h2>
                    <ul>
                      {editedMenuSoir.entree.map((item, index) => (
                        <li key={index}>
                          <input
                            type="text"
                            value={item}
                            onChange={(e) =>
                              handleInputChangeSoir(e, "entree", index)
                            }
                            className={
                              deletedInputsSoir.includes(`entree-${index}`)
                                ? "deleted"
                                : ""
                            }
                          />
                          <button
                            onClick={() => handleDeleteSoir("entree", index)}
                          >
                            Supprimer
                          </button>
                        </li>
                      ))}
                      <li>
                        <input
                          type="text"
                          value={newEntrySoir}
                          onChange={(e) => setNewEntrySoir(e.target.value)}
                        />
                        <button onClick={handleAddEntrySoir}>Ajouter</button>
                      </li>
                    </ul>
                    <h2>Plats</h2>
                    <ul>
                      {editedMenuSoir.plat.map((item, index) => (
                        <li key={index}>
                          <input
                            type="text"
                            value={item}
                            onChange={(e) =>
                              handleInputChangeSoir(e, "plat", index)
                            }
                            className={
                              deletedInputsSoir.includes(`plat-${index}`)
                                ? "deleted"
                                : ""
                            }
                          />
                          <button
                            onClick={() => handleDeleteSoir("plat", index)}
                          >
                            Supprimer
                          </button>
                        </li>
                      ))}
                      <li>
                        <input
                          type="text"
                          value={newDishSoir}
                          onChange={(e) => setNewDishSoir(e.target.value)}
                        />
                        <button onClick={handleAddDishSoir}>Ajouter</button>
                      </li>
                    </ul>
                    <h2>Desserts</h2>
                    <ul>
                      {editedMenuSoir.dessert.map((item, index) => (
                        <li key={index}>
                          <input
                            type="text"
                            value={item}
                            onChange={(e) =>
                              handleInputChangeSoir(e, "dessert", index)
                            }
                            className={
                              deletedInputsSoir.includes(`dessert-${index}`)
                                ? "deleted"
                                : ""
                            }
                          />
                          <button
                            onClick={() => handleDeleteSoir("dessert", index)}
                          >
                            Supprimer
                          </button>
                        </li>
                      ))}
                      <li>
                        <input
                          type="text"
                          value={newDessertSoir}
                          onChange={(e) => setNewDessertSoir(e.target.value)}
                        />
                        <button onClick={handleAddDessertSoir}>Ajouter</button>
                      </li>
                    </ul>
                    <button onClick={handleSaveSoir}>Valider</button>
                    <button onClick={handleCancelSoir}>Annuler</button>
                  </>
                ) : (
                  <>
                    <h2>Entrées</h2>
                    <ul>
                      {menuSoir.entree.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                    <h2>Plats</h2>
                    <ul>
                      {menuSoir.plat.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                    <h2>Desserts</h2>
                    <ul>
                      {menuSoir.dessert.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                    {isFullscreen ?
                      <button onClick={handleEditSoir}>Modifier</button>
                    :null}
                  </>
                )}
              </div>
            </div>
          </>
        ) : (
          <div>Pas de menu du soir</div>
        )}
      </div>
    </>
  );
};

export default DashboardPage;
