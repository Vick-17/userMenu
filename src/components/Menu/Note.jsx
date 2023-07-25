import React, { useState } from 'react';

const Note = () => {
    const [selectedEmoji, setSelectedEmoji] = useState(null);
    const [isVoteSent, setIsVoteSent] = useState(false);

    const vote = (emoji) => {
        setSelectedEmoji(emoji.getAttribute("data-emoji"));

        // Afficher le bouton Envoyer la note après la sélection d'un emoji
        const sendVoteButton = document.querySelector(".vote-container button");
        sendVoteButton.style.display = "block";
    };

    const sendVote = () => {
        if (selectedEmoji === null) {
            alert("Veuillez sélectionner une note avant d'envoyer.");
            return;
        }

        // Envoi du vote au serveur
        const voteData = {
            is_day: false,
            day: '', // Remplacez cette valeur par la date souhaitée
            smiley: selectedEmoji,
            stagiaire_id: 0, // Remplacez cette valeur par l'ID du stagiaire souhaité
        };

        fetch("http://localhost:8080/api/votes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(voteData),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Erreur lors de l'envoi du vote.");
                }
                return response.json();
            })
            .then((data) => {
                alert(`Vote envoyé : ${selectedEmoji}`);
                setSelectedEmoji(null);
                setIsVoteSent(true);

                // Cacher le bouton Envoyer la note après l'envoi du vote
                const sendVoteButton = document.querySelector(".vote-container button");
                sendVoteButton.style.display = "none";
            })
            .catch((error) => {
                console.error(error);
                alert("Une erreur est survenue lors de l'envoi du vote.");
            });
    };

    return (
        <div className="vote-container">
            <h3>Comment avez-vous trouvé le repas ?</h3>
            <div>
                <span
                    className={`vote-emoji ${selectedEmoji === "smile" ? "selected" : ""}`}
                    onClick={(e) => vote(e.target)}
                    data-emoji="smile"
                >
                    &#128532;
                </span>
                <span
                    className={`vote-emoji ${selectedEmoji === "neutral" ? "selected" : ""}`}
                    onClick={(e) => vote(e.target)}
                    data-emoji="neutral"
                >
                    &#128528;
                </span>
                <span
                    className={`vote-emoji ${selectedEmoji === "frown" ? "selected" : ""}`}
                    onClick={(e) => vote(e.target)}
                    data-emoji="frown"
                >
                    &#128515;
                </span>
            </div>
            {!isVoteSent && (
                <button onClick={sendVote} style={{ display: "none" }}>
                    Envoyer la note
                </button>
            )}
            {isVoteSent && (
                <p>Merci pour votre vote !</p>
            )}
        </div>
    );
};

export default Note;
