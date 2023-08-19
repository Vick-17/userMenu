import React, { useEffect, useState } from "react";
import { getDaily, getArtistOfDay, typesOfHoroscopes, getHoroscopeBySign } from "../Services/apiService";
import { Link } from "react-router-dom";
import Header from "../components/Static/header";

const Main = () => {
  const [content, setContent] = useState(null);
  const [showAnswer, setShowAnswer] = useState([]);
  const [horoscopeTypes, setHoroscopeTypes] = useState([]);
  const [selectedHoroscope, setSelectedHoroscope] = useState("");
  const [horoscopeText, setHoroscopeText] = useState("");

  useEffect(() => {

    const fetchData = async () => {
      try {
        const dailyContent = await getDaily();
        setContent(dailyContent);
        setShowAnswer(new Array(dailyContent.blagues.length).fill(false));
        const artist = await getArtistOfDay();
        setContent((prevContent) => ({ ...prevContent, artist }));
        const types = await typesOfHoroscopes();
        setHoroscopeTypes(types);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleShowAnswer = (index) => {
    const updatedShowAnswer = [...showAnswer];
    updatedShowAnswer[index] = true;
    setShowAnswer(updatedShowAnswer);
  };

  const handleHoroscopeSelect = async (event) => {
    const selectedSign = event.target.value;
    setSelectedHoroscope(selectedSign);

    try {
      if (selectedSign) {
        const horoscopeData = await getHoroscopeBySign(selectedSign);
        console.log("horoscopeData:", horoscopeData);

        if (horoscopeData.length > 0) {
          setHoroscopeText(horoscopeData[0].textHoroscope); // Accéder à la propriété textHoroscope du premier objet du tableau
        } else {
          setHoroscopeText("Aucun horoscope disponible pour ce signe.");
        }
      } else {
        setHoroscopeText(""); // Réinitialise le texte de l'horoscope si aucun signe n'est sélectionné
      }
    } catch (error) {
      console.error(error);
      setHoroscopeText("Erreur lors de la récupération de l'horoscope.");
    }
  };

  return (
    <div className="jqr-container">
      <div className="jqr-content">
        {content ? (
          <div>
            {/* horoscope */}
            <p className="jqr-category-header">Horoscope :</p>
            <div className="jqr-category-divider"></div>
            <div>
              <select onChange={handleHoroscopeSelect}>
                <option value="">Sélectionner un signe astrologique</option>
                {horoscopeTypes.map((horoscope, index) => (
                  <option key={index} value={horoscope}>
                    {horoscope}
                  </option>
                ))}
              </select>
            </div>

            <div>{horoscopeText}</div>

            {/* Énigmes */}
            <p className="jqr-category-header">Énigme du jour :</p>
            <div className="jqr-category-divider"></div>
            {content.enigme.map((enigme, index) => (
              <div key={enigme.id}>
                <p>{enigme.text}</p>
                {showAnswer[index] && <p>{enigme.answer}</p>}
                {!showAnswer[index] && (
                  <button onClick={() => handleShowAnswer(index)}>
                    Afficher la réponse
                  </button>
                )}
              </div>
            ))}
            {/* ArtisteComponent du jour */}
            <div className="jqr-artist-section">
              <p className="jqr-category-header">Artiste du jour :</p>
              <div className="jqr-category-divider"></div>
              {content && content.artist && (
                <div>
                  <div>
                    <img className="img-artist" src={`${process.env.PUBLIC_URL}/artistlibrary/${content.artist.img1}`} width="95%" alt="artist" />
                  </div>
                  <div>
                    <img className="img-artist" src={`${process.env.PUBLIC_URL}/artistlibrary/${content.artist.img2}`} width="95%" alt="artist" />
                  </div>
                  <p>Nom : {content.artist.name}</p>
                  <p>Ville : {content.artist.city}</p>
                  <p>Site : <Link to={`${content.artist.website}`} >{content.artist.website}</Link> </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <p>Contenu du jour non disponible.</p>
        )}
      </div>
    </div>
  );
};

export default Main;
