import React, { useState } from 'react';

const Note = () => {
    const [selectedEmoji, setSelectedEmoji] = useState(null);

    const vote = (emoji) => {
        const emojis = document.querySelectorAll(".vote-emoji");
        emojis.forEach((emojiElement) => {
            emojiElement.classList.remove("selected");
        });
        emoji.classList.add("selected");
        setSelectedEmoji(emoji.getAttribute("data-emoji"));

        // Afficher le bouton sendVote
        const sendVoteButton = document.querySelector(".vote-container button");
        sendVoteButton.style.display = "block";
    };

    const sendVote = () => {
        const sendVoteButton = document.querySelector(".vote-container button");
        sendVoteButton.disabled = true;

        if (selectedEmoji === null) {
            alert("Veuillez sélectionner une note avant d'envoyer.");
            sendVoteButton.disabled = false;
            return;
        }

        alert(`Note envoyée : ${selectedEmoji}`);
        setSelectedEmoji(null);
        const emojis = document.querySelectorAll(".vote-emoji");
        emojis.forEach((emoji) => {
            emoji.classList.remove("selected");
        });

        sendVoteButton.disabled = true;
        sendVoteButton.style.cursor = "not-allowed";
    };

    return (
        <div className="vote-container">
            <h3>Comment avez-vous trouvé le repas ?</h3>
            <div>
                <span className="vote-emoji" onClick={(e) => vote(e.target)} data-emoji="smile">
                    &#128532;
                </span>
                <span className="vote-emoji" onClick={(e) => vote(e.target)} data-emoji="neutral">
                    &#128528;
                </span>
                <span className="vote-emoji" onClick={(e) => vote(e.target)} data-emoji="frown">
                    &#128515;
                </span>
            </div>
            <button onClick={sendVote}>Envoyer la note</button>
        </div>
    );
};

export default Note;
