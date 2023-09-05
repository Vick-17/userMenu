import React, {useEffect, useState} from 'react';
// eslint-disable-next-line no-unused-vars
import {fetchMenuByDate, sendVoteToBdd, voteMenu} from "../../Services/apiService";
import {useCookies} from "react-cookie";
// eslint-disable-next-line no-unused-vars
import toast, {Toaster} from "react-hot-toast";

const Note = () => {
    const [selectedEmoji, setSelectedEmoji] = useState(null);
    const [todayMenu, setTodayMenu] = useState(true);

    // eslint-disable-next-line no-unused-vars
    const [isVoteSent, setIsVoteSent] = useState(false);
    const [cookies, setCookies] = useCookies(['cookieFormation', 'avote']);

    // eslint-disable-next-line no-unused-vars
    const vote = (emoji) => {
        setSelectedEmoji(emoji.getAttribute("data-emoji"));

        // Afficher le bouton Envoyer la note après la sélection d'un emoji
        const sendVoteButton = document.querySelector(".vote-container button");
        sendVoteButton.style.display = "block";
    };

    useEffect(()=>{
        const dateDuJour = new Date();
        const year = dateDuJour.getFullYear();
        const month = ("0" + (dateDuJour.getMonth() + 1)).slice(-2);
        const day = ("0" + dateDuJour.getDate()).slice(-2);
        const today = `${year}-${month}-${day}`;
        fetchMenuByDate(today)
            .then((data) => {

            })
            .catch((error) => {
                setTodayMenu(false);
                console.error("pas de menu aujourdhui");
            });
    }, [])

    const sendVote = (num) => {
        if(todayMenu !== false){
            if(cookies.avote){
                let voteToast2;
                const v2 = () =>{
                    voteToast2 = toast.error("Vous avez déjà voté", {duration: 1500})
                }
               v2();
                setTimeout(()=>{
                    toast.dismiss(voteToast2);
                }, 1500)
            }else{
                if(cookies.cookieFormation){
                    sendVoteToBdd(num, cookies.cookieFormation).then((response)=>{
                        console.log(response);
                        let expiryDate = new Date();
                        expiryDate.setHours(expiryDate.getHours() + 4);
                        setCookies('avote', true, {path: "/", expires: expiryDate});
                        let voteToast1;
                        const v1 = () =>{
                            voteToast1 = toast.success('Vote enregistré, merci!', {duration: 1500})
                        }
                        v1();
                        setTimeout(()=>{
                            toast.dismiss(voteToast1);
                        }, 1500)
                    })
                }else{
                    let voteToast3;
                    const v3 = () =>{
                        voteToast3 = toast.error("Sélectionnez d'abord votre formation", {duration: 1500})
                    }
                    v3();
                    setTimeout(()=>{
                        toast.dismiss(voteToast3);
                    }, 1500)

                }
            }
        }else{
            let voteToast4;
            const v4 = () =>{
                voteToast4 = toast.error("Pas de menu aujourd'hui", {duration: 1500})
            }
            v4();
            setTimeout(()=>{
                toast.dismiss(voteToast4);
            }, 1500)
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
                    <img src={`${process.env.PUBLIC_URL}/smiley0.png`}  alt="icone smiley"className={"emojiLogo"}/>
                </span>
                <span
                    className={`vote-emoji ${selectedEmoji === "neutral" ? "selected" : ""}`}
                    onClick={()=>sendVote(1)}
                    data-emoji="neutral"
                >
                    <img src={`${process.env.PUBLIC_URL}/smiley1.png`} alt='icone smileyNeutre' className={"emojiLogo"}/>
                </span>
                <span
                    className={`vote-emoji ${selectedEmoji === "frown" ? "selected" : ""}`}
                    onClick={()=>sendVote(2)}
                    data-emoji="frown"
                >
                    <img src={`${process.env.PUBLIC_URL}/smiley2.png`} alt='icone smileyFrown' className={"emojiLogo"}/>
                </span>
            </div>
        </div>
    );
};

export default Note;
