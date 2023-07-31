import React, { useEffect, useState } from "react";
import { getDaily, getArtistOfDay } from "../Services/apiService";
import { Link } from "react-router-dom";

const Main = () => {
  const [content, setContent] = useState(null);
  const [showAnswer, setShowAnswer] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dailyContent = await getDaily();
        setContent(dailyContent);
        setShowAnswer(new Array(dailyContent.blagues.length).fill(false));
        const artist = await getArtistOfDay();
        setContent((prevContent) => ({ ...prevContent, artist }));
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

  return (
    <div className="jqr-container">
      <div className="jqr-content">
        {content ? (
          <div>
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
            {/* Artiste du jour */}
            <div className="jqr-artist-section">
              <p className="jqr-category-header">Artiste du jour :</p>
              <div className="jqr-category-divider"></div>
              {content && content.artist && (
                <div>
                  <img className="img-artist" src={`${process.env.PUBLIC_URL}/artistlibrary/${content.artist.img1}`} width="95%" alt="artist" />
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
