import React, { useEffect, useState } from "react";
import { getDaily } from "../Services/apiService";

const Main = () => {
  const [content, setContent] = useState(null);
  const [showAnswerBlagues, setShowAnswerBlagues] = useState([]);
  const [showAnswerEnigmes, setShowAnswerEnigmes] = useState([]);

  useEffect(() => {
    const fetchDailyContent = async () => {
      try {
        const data = await getDaily();
        setContent(data);
        // Initialize the showAnswer arrays with false for each question
        setShowAnswerBlagues(new Array(data.blagues.length).fill(false));
        setShowAnswerEnigmes(new Array(data.enigme.length).fill(false));
      } catch (error) {
        console.error(error);
      }
    };

    fetchDailyContent();
  }, []);

  const handleShowAnswerBlague = (index) => {
    // Create a copy of the showAnswerBlagues array and update the value for the selected question
    const updatedShowAnswerBlagues = [...showAnswerBlagues];
    updatedShowAnswerBlagues[index] = true;
    setShowAnswerBlagues(updatedShowAnswerBlagues);
  };

  const handleShowAnswerEnigme = (index) => {
    // Create a copy of the showAnswerEnigmes array and update the value for the selected question
    const updatedShowAnswerEnigmes = [...showAnswerEnigmes];
    updatedShowAnswerEnigmes[index] = true;
    setShowAnswerEnigmes(updatedShowAnswerEnigmes);
  };

  return (
    <div className="jqr-container">
      <div className="jqr-content">
        {content ? (
          <div>
            <p className="jqr-category-header">Blague du jour :</p>
            <div className="jqr-category-divider"></div>
            {content.blagues.map((blague, index) => (
              <div key={blague.id}>
                <p>{blague.text}</p>
                {showAnswerBlagues[index] && blague.answer && (
                  <div>
                    <strong>Réponse :</strong> {blague.answer}
                  </div>
                )}
                {/* Affichez d'autres propriétés de l'objet blague si nécessaire */}
                {!showAnswerBlagues[index] && (
                  <button onClick={() => handleShowAnswerBlague(index)}>
                    Afficher la réponse
                  </button>
                )}
              </div>
            ))}
            <p className="jqr-category-header">Citation du jour :</p>
            <div className="jqr-category-divider"></div>
            {content.citations.map((citation) => (
              <div key={citation.id}>
                <p>{citation.text}</p>
                {citation.auteur && <p>Auteur : {citation.auteur}</p>}
              </div>
            ))}
            <p className="jqr-category-header">Énigme du jour :</p>
            <div className="jqr-category-divider"></div>
            {content.enigme.map((enigme, index) => (
              <div key={enigme.id}>
                <p>{enigme.text}</p>
                {showAnswerEnigmes[index] && enigme.answer && (
                  <div>
                    <strong>Réponse :</strong> {enigme.answer}
                  </div>
                )}
                {/* Affichez d'autres propriétés de l'objet enigme si nécessaire */}
                {!showAnswerEnigmes[index] && (
                  <button onClick={() => handleShowAnswerEnigme(index)}>
                    Afficher la réponse
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>Contenu du jour non disponible.</p>
        )}
      </div>
    </div>
  );
};

export default Main;
