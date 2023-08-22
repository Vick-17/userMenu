import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {getArtistOfDay, getDaily, getFullHoroscope, getHoroscopeByType} from "../../Services/apiService";
import {useCookies} from "react-cookie";
import {nanoid} from "nanoid";
import toast from "react-hot-toast";

const BurgerComponent = ({formations, formation, onSelectedFormationUpdate}) => {
    const [selection, setSelection] = useState("Menu");
    const [selectedHoroscope, setSelectedHoroscope] = useState("");
    const [selectedNameHoroscope, setSelectedNameHoroscope] = useState("");
    const [artist, setArtist] = useState("");
    const [enigme, setEnigme] = useState("Bélier");
    const [selectedFormation, setSelectedFormation] = useState(null);
    const [formationStagiaire, setFormationStagiaire] = useState(null);

    const [cookies, setCookies] = useCookies(["cookieFormation"]);
    const [refresh, setRefresh] = useState(false);

    const [reponseEnigme, setReponseEnigme] = useState("");
    const [revealEnigme, setRevealEnigme] = useState(false);
    const [horoscope, setHoroscope] = useState([]);

    useEffect(()=>{
        getArtistOfDay().then((response)=>{
            setArtist(response);
        })
        getDaily().then((reponse)=>{
            setEnigme(reponse.enigme[0].text);
            setReponseEnigme(reponse.enigme[0].answer);
        })
        setFormationStagiaire(formation);
        console.log(formations)
        console.log(formation)
    }, [])


    const handleClickMenu = (type) => {
        setSelection(type)
    }

    const handleChangeSelect = (e) => {
        setSelectedFormation(e);
        console.log(e)
    };
    const handleClickConfirmFormation = () => {
        let expiryDate = new Date();
        console.log(selectedFormation)
        expiryDate.setFullYear(expiryDate.getFullYear() + 1);
        console.log(formations)
        const selectedFormationObject = formations.find(formation => formation.id === +selectedFormation);
        console.log(selectedFormationObject);

        setCookies("cookieFormation", selectedFormation, {
            path: "/",
            expires: expiryDate,
        });
        toast.success("Formation enregistrée !");
        setFormationStagiaire(selectedFormationObject);
        onSelectedFormationUpdate();
    };

    const handleClickReturn = () => {
        setSelection("Menu")
    }

    const handleClickRevealEnigme = () => {
        setRevealEnigme(true);
    }
    const getHoroscope = (type) => {
        setSelectedNameHoroscope(type);
        getFullHoroscope().then((response)=>{
            for(let i=0; i<response.length; i++){
                console.log(response[i])
                if(response[i].type === type){
                    setSelectedHoroscope(response[i].textHoroscope);
                }
            }
        })
    }

    useEffect(()=>{

    }, [formationStagiaire])


    return (
        <>
            <div style={{position: "relative"}}>

                <div style={{marginBottom: "1em", color: "white"}}>
                    <strong>
                        {
                            selection === "Artiste" ? "Artiste du jour" :
                                selection === "Horoscope" ? "Horoscope de la semaine" :
                                    selection === "Enigme" ? "Enigme du jour" :
                                        null
                        }
                    </strong>                </div>
                <div style={{display: "flex"}}>
                <div style={{
                    width: "10%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                    alignItems: "center",
                    height: "calc(80vh - 20px)"
                }}>
                { selection === "Horoscope" ?
<>
    <div style={{position: "absolute", top: "-10px", right: "35px"}} onClick={handleClickReturn}><img width={32} src={`${process.env.PUBLIC_URL}/backburger.svg`} style={{transform : "scaleX(-1)", fill: "white"}}/></div>

    <div>
                        <div><img width={selectedNameHoroscope === "Bélier" ? 40 : 32} src={`${process.env.PUBLIC_URL}/horoscope/belier.svg`} onClick={() => getHoroscope("Bélier")}/></div>
                        <div><img  width={selectedNameHoroscope === "Taureau" ? 40 : 32} src={`${process.env.PUBLIC_URL}/horoscope/taureau.svg`} onClick={() => getHoroscope("Taureau")}/></div>
                        <div><img  width={selectedNameHoroscope === "Gémeaux" ? 40 : 32} src={`${process.env.PUBLIC_URL}/horoscope/jumeaux.svg`} onClick={() => getHoroscope("Gémeaux")}/></div>
                        <div><img  width={selectedNameHoroscope === "Cancer" ? 40 : 32} src={`${process.env.PUBLIC_URL}/horoscope/cancer.svg`} onClick={() => getHoroscope("Cancer")}/></div>
                        <div><img  width={selectedNameHoroscope === "Lion" ? 40 : 32} src={`${process.env.PUBLIC_URL}/horoscope/lion.svg`} onClick={() => getHoroscope("Lion")}/></div>
                        <div><img  width={selectedNameHoroscope === "Vierge" ? 40 : 32} src={`${process.env.PUBLIC_URL}/horoscope/vierge.svg`} onClick={() => getHoroscope("Vierge")}/></div>
                        <div><img  width={selectedNameHoroscope === "Balance" ? 40 : 32} src={`${process.env.PUBLIC_URL}/horoscope/balance.svg`} onClick={() => getHoroscope("Balance")}/></div>
                        <div><img  width={selectedNameHoroscope === "Scorpion" ? 40 : 32} src={`${process.env.PUBLIC_URL}/horoscope/scorpion.svg`} onClick={() => getHoroscope("Scorpion")}/></div>
                        <div><img  width={selectedNameHoroscope === "Sagittaire" ? 40 : 32} src={`${process.env.PUBLIC_URL}/horoscope/sagitaire.svg`} onClick={() => getHoroscope("Sagittaire")}/></div>
                        <div><img  width={selectedNameHoroscope === "Capricorne" ? 40 : 32} src={`${process.env.PUBLIC_URL}/horoscope/capricorne.svg`} onClick={() => getHoroscope("Capricorne")}/></div>
                        <div><img  width={selectedNameHoroscope === "Verseau" ? 40 : 32} src={`${process.env.PUBLIC_URL}/horoscope/verseau.svg`} onClick={() => getHoroscope("Verseau")}/></div>
                        <div><img width={selectedNameHoroscope === "Poissons" ? 40 : 32} src={`${process.env.PUBLIC_URL}/horoscope/poisson.svg`} onClick={() => getHoroscope("Poissons")}/></div>
                        </div>

</>

                :
                    <>

                        <div><img width={selection === "Horoscope" ? 40 : 32} src={`${process.env.PUBLIC_URL}/moon.svg`} onClick={()=>handleClickMenu("Horoscope")}/></div>
                    <div><img width={selection === "Enigme" ? 40 : 32} src={`${process.env.PUBLIC_URL}/enigme.png`} onClick={()=>handleClickMenu("Enigme")}/></div>
                    <div><img width={selection === "Artiste" ? 40 : 32} src={`${process.env.PUBLIC_URL}/art.svg`} onClick={()=>handleClickMenu("Artiste")}/></div>
                    </>
                }
                </div>

                <div style={{width: "90%", margin: "20px", color: "white"}}>
                    { selection === "Horoscope" ?
                        <>
                            <div style={{marginBottom: "1em"}}><strong>{selectedNameHoroscope}</strong></div>
                            <div>{selectedHoroscope}</div>
                        </>
                        : selection === "Artiste" ?
                            <div>
                                <div style={{position: "absolute", top: "-10px", right: "35px"}} onClick={handleClickReturn}><img width={32} src={`${process.env.PUBLIC_URL}/backburger.svg`} style={{transform : "scaleX(-1)", fill: "white"}}/></div>

                                <div style={{fontWeight: "bold", fontSize: "large"}}>
                        {artist && artist.name}
                    </div>
                                <div>
                                    {artist && artist.city}
                                </div>
                                <div style={{marginTop: "1em", display: "flex", justifyContent: "center"}}>
                                    <img width={"80%"} src={`${process.env.PUBLIC_URL}/artistlibrary/${artist.img1}`} onClick={() => getHoroscope("belier")}/>
                                </div>
                                <div style={{marginTop: "1em", display: "flex", justifyContent: "center"}}>
                                    <img width={"80%"} src={`${process.env.PUBLIC_URL}/artistlibrary/${artist.img2}`} onClick={() => getHoroscope("belier")}/>
                                </div>
                                <div style={{marginTop: "1em", display: "flex", justifyContent: "center"}}>
                                    {artist && artist.website}
                                </div>
                            </div>
                    : selection === "Enigme" ?
                    <>
                        <div>{enigme}</div>
                        {revealEnigme === false ?
                            <div style={{marginTop: "1em"}} onClick={handleClickRevealEnigme}><button className={"btn1"}>Réponse</button></div>
                        :
                            <div style={{marginTop: "1em"}}>
                                {reponseEnigme}
                            </div>
                        }

                    </>
                    : selection === "Menu" ?
                                    <div style={{}}>
                                        <div style={{display: "flex", flexDirection: "column"}} onClick={handleClickReturn}>
                                            <div style={{display: "flex", justifyContent: "center"}}>
                                                <img width={32} src={`${process.env.PUBLIC_URL}/settings.svg`} style={{transform : "scaleX(-1)", fill: "white"}}/>
                                                <div style={{marginLeft: "0.5em", display: "flex", alignItems: "center"}}>Ma formation</div>

                                            </div>
                                            <div style={{display: "flex", justifyContent: "center", fontSize: "2em"}}>{formationStagiaire ? formationStagiaire.nom : "Pas dformation"}</div>
                                            <div style={{display: "flex", justifyContent: "center", flexDirection: "column"}}>
                                                <select
                                                    className="formation-select"
                                                    value={selectedFormation}
                                                    onChange={(e) => handleChangeSelect(e.target.value)}
                                                >
                                                    <option value={""} disabled>Selectionner une formation</option>
                                                    {formations.length > 0 &&
                                                        formations.map((formation) => (
                                                            <option value={formation.id} key={nanoid()}>
                                                                {formation.nom}
                                                            </option>
                                                        ))}
                                                </select>
                                                <button
                                                    className="formation-button"
                                                    onClick={() => handleClickConfirmFormation()}
                                                >
                                                    Modifier
                                                </button>
                                            </div>
                                        </div>


                                    </div>

                               : null}
                </div>
                </div>



            </div>
        </>
    )
}

export default BurgerComponent;