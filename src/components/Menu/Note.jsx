import React, { useState } from 'react';
import {sendVoteToBdd, voteMenu} from "../../Services/apiService";
import {useCookies} from "react-cookie";
import toast, {Toaster} from "react-hot-toast";

const Note = () => {
    const [selectedEmoji, setSelectedEmoji] = useState(null);
    const [isVoteSent, setIsVoteSent] = useState(false);
    const [cookies, setCookies] = useCookies(['cookieFormation', 'avote']);

    const vote = (emoji) => {
        setSelectedEmoji(emoji.getAttribute("data-emoji"));

        // Afficher le bouton Envoyer la note après la sélection d'un emoji
        const sendVoteButton = document.querySelector(".vote-container button");
        sendVoteButton.style.display = "block";
    };

    const sendVote = (num) => {
        if(cookies.avote){
            toast.error("Vous avez déjà voté")
        }else{
            if(cookies.cookieFormation){
                sendVoteToBdd(num, cookies.cookieFormation).then((response)=>{
                    console.log(response);
                    let expiryDate = new Date();
                    expiryDate.setHours(expiryDate.getHours() + 4);
                    setCookies('avote', true, {path: "/", expires: expiryDate});
                    toast.success('Vote enregistré, merci!')
                })
            }else{
                toast.error("Sélectionnez d'abord votre formation")
            }
        }

    };

    return (
        <div className="vote-container">
            <h3>Comment avez-vous trouvé le repas ?</h3>
            <div>
                <span
                    className={`vote-emoji ${selectedEmoji === "smile" ? "selected" : ""}`}
                    onClick={()=>sendVote(0)}
                    data-emoji="smile"
                >
                    <img src={`${process.env.PUBLIC_URL}/smiley0.png`} className={"emojiLogo"}/>
                </span>
                <span
                    className={`vote-emoji ${selectedEmoji === "neutral" ? "selected" : ""}`}
                    onClick={()=>sendVote(1)}
                    data-emoji="neutral"
                >
                    <img src={`${process.env.PUBLIC_URL}/smiley1.png`} className={"emojiLogo"}/>
                </span>
                <span
                    className={`vote-emoji ${selectedEmoji === "frown" ? "selected" : ""}`}
                    onClick={()=>sendVote(2)}
                    data-emoji="frown"
                >
                    <img src={`${process.env.PUBLIC_URL}/smiley2.png`} className={"emojiLogo"}/>
                </span>
            </div>
        </div>
    );
};

export default Note;
