import React from 'react';

const Sidebar = () => {
  // Exemple de grille de mots croisés (1 pour une case noire, 0 pour une case blanche)
  const crosswordGrid = [
    [1, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 0, 1, 0, 0, 0, 1, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 1, 0],
    [1, 0, 0, 1, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 1, 0, 0, 1],
    [0, 1, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 1, 0, 0, 0, 1, 0, 0],
    [1, 0, 0, 1, 1, 1, 0, 0, 1],
  ];

  // Les indices des mots pour les définitions
  const acrossClues = [
    { number: 1, clue: 'Ensemble des êtres vivants', length: 7 },
    { number: 3, clue: 'Se dit de deux événements qui se produisent en même temps', length: 6 },
    { number: 5, clue: 'En forme', length: 4 },
    // ... ajouter d'autres indices horizontaux ici ...
  ];

  const downClues = [
    { number: 1, clue: 'Quitter', length: 6 },
    { number: 2, clue: 'Sombre', length: 5 },
    { number: 4, clue: 'Dans un état avancé de grossesse', length: 8 },
    // ... ajouter d'autres indices verticaux ici ...
  ];

  // Fonction pour générer la grille du jeu de mots croisés
  const renderCrosswordGrid = () => {
    return crosswordGrid.map((row, rowIndex) => {
      return (
        <div key={rowIndex} className="crossword-row">
          {row.map((cell, colIndex) => {
            return (
              <div key={colIndex} className={`crossword-cell ${cell === 1 ? 'black-cell' : ''}`}>
                {/* Afficher ici le numéro de la case si elle commence un mot (selon acrossClues et downClues) */}
                {/* Afficher ici les cases éditables pour les lettres */}
              </div>
            );
          })}
        </div>
      );
    });
  };

  // Fonction pour générer la liste des indices des mots
  const renderClues = (clues) => {
    return clues.map((clueObj) => {
      return (
        <div key={clueObj.number} className="clue">
          <span className="clue-number">{clueObj.number}.</span>
          <span className="clue-text">{clueObj.clue}</span>
        </div>
      );
    });
  };

  return (
    <div className="crossword-container">
      <div className="crossword-grid">{renderCrosswordGrid()}</div>
      <div className="clues">
        <div className="across-clues">
          <h2>Horizontalement</h2>
          {renderClues(acrossClues)}
        </div>
        <div className="down-clues">
          <h2>Verticalement</h2>
          {renderClues(downClues)}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
