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
            console.log(reponse);
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
        console.log(artist)
    }, [artist])


    return (
        <>
            <div style={{position: "relative"}}>

                <div style={{marginBottom: "1em", color: "white"}}>
                    <strong>
                        {
                            selection === "Artiste" ? "Artiste du jour" :
                                selection === "Horoscope" ? "Horoscope de la semaine" :
                                    selection === "Enigme" ? "Enigme du jour" :
                                    selection === "Copyright" ? "Remerciements et Sources" :
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
    <div style={{position: "absolute", top: "-10px", right: "35px"}} onClick={handleClickReturn}><img width={32} src={`${process.env.PUBLIC_URL}/backburger.svg`} style={{transform : "scaleX(-1)", fill: "white"}} alt="icone astro"/></div>

    <div>
                        <div><img width={selectedNameHoroscope === "Bélier" ? 40 : 32} src={`${process.env.PUBLIC_URL}/horoscope/belier.svg`} onClick={() => getHoroscope("Bélier")} alt="icone belier"/></div>
                        <div><img  width={selectedNameHoroscope === "Taureau" ? 40 : 32} src={`${process.env.PUBLIC_URL}/horoscope/taureau.svg`} onClick={() => getHoroscope("Taureau")}alt="icone taureau"/></div>
                        <div><img  width={selectedNameHoroscope === "Gémeaux" ? 40 : 32} src={`${process.env.PUBLIC_URL}/horoscope/jumeaux.svg`} onClick={() => getHoroscope("Gémeaux")}alt="icone gémeaux"/></div>
                        <div><img  width={selectedNameHoroscope === "Cancer" ? 40 : 32} src={`${process.env.PUBLIC_URL}/horoscope/cancer.svg`} onClick={() => getHoroscope("Cancer")}alt="icone cancer"/></div>
                        <div><img  width={selectedNameHoroscope === "Lion" ? 40 : 32} src={`${process.env.PUBLIC_URL}/horoscope/lion.svg`} onClick={() => getHoroscope("Lion")} alt="icone lion"/></div>
                        <div><img  width={selectedNameHoroscope === "Vierge" ? 40 : 32} src={`${process.env.PUBLIC_URL}/horoscope/vierge.svg`} onClick={() => getHoroscope("Vierge")}alt="icone vierge"/></div>
                        <div><img  width={selectedNameHoroscope === "Balance" ? 40 : 32} src={`${process.env.PUBLIC_URL}/horoscope/balance.svg`} onClick={() => getHoroscope("Balance")}alt="icone balance"/></div>
                        <div><img  width={selectedNameHoroscope === "Scorpion" ? 40 : 32} src={`${process.env.PUBLIC_URL}/horoscope/scorpion.svg`} onClick={() => getHoroscope("Scorpion")}alt="icone scorpion"/></div>
                        <div><img  width={selectedNameHoroscope === "Sagittaire" ? 40 : 32} src={`${process.env.PUBLIC_URL}/horoscope/sagitaire.svg`} onClick={() => getHoroscope("Sagittaire")}alt="icone sagittaire"/></div>
                        <div><img  width={selectedNameHoroscope === "Capricorne" ? 40 : 32} src={`${process.env.PUBLIC_URL}/horoscope/capricorne.svg`} onClick={() => getHoroscope("Capricorne")}alt="icone capricorne"/></div>
                        <div><img  width={selectedNameHoroscope === "Verseau" ? 40 : 32} src={`${process.env.PUBLIC_URL}/horoscope/verseau.svg`} onClick={() => getHoroscope("Verseau")}alt="icone verseau"/></div>
                        <div><img width={selectedNameHoroscope === "Poissons" ? 40 : 32} src={`${process.env.PUBLIC_URL}/horoscope/poisson.svg`} onClick={() => getHoroscope("Poissons")}alt="icone poissons"/></div>
                        </div>

</>

                :
                    <>

                        <div><img width={selection === "Horoscope" ? 40 : 32} src={`${process.env.PUBLIC_URL}/moon.svg`} onClick={()=>handleClickMenu("Horoscope")}alt="icone horoscope"/></div>
                    <div><img width={selection === "Enigme" ? 40 : 32} src={`${process.env.PUBLIC_URL}/enigme.png`} onClick={()=>handleClickMenu("Enigme")}alt="icone égnime"/></div>
                    <div><img width={selection === "Artiste" ? 40 : 32} src={`${process.env.PUBLIC_URL}/art.svg`} onClick={()=>handleClickMenu("Artiste")}alt="icone artiste"/></div>
                    <div style={
                    {width:selection === "Credits" ? 40 :  "32px", height:selection === "Credits" ? 40 :  "32px", background:"white", borderRadius:"50%",display:"flex",justifyContent:"center"}
                    }><img width={selection === "Credits" ? 40 : 32} style={{margin:selection === "Credits" ? "0 0 0 2px" :  "0"}} src={`${process.env.PUBLIC_URL}/PhCopyrightBold.svg`} onClick={()=>handleClickMenu("Copyright")}alt="icone crédits"/></div>
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
                                <div style={{position: "absolute", top: "-10px", right: "35px"}} onClick={handleClickReturn}><img width={32} src={`${process.env.PUBLIC_URL}/backburger.svg`} style={{transform : "scaleX(-1)", fill: "white"}} alt="retour burger"/></div>

                                <div style={{fontWeight: "bold", fontSize: "large"}}>
                        {artist && artist.name}
                    </div>
                                <div>
                                    {artist && artist.city}
                                </div>
                                <div style={{marginTop: "1em", display: "flex", justifyContent: "center"}}>
                                    <img width={"80%"} src={`${process.env.PUBLIC_URL}/artistlibrary/${artist.img1}`} onClick={() => getHoroscope("belier")} alt="images artiste"/>
                                </div>
                                <div style={{marginTop: "1em", display: "flex", justifyContent: "center"}}>
                                    <img width={"80%"} src={`${process.env.PUBLIC_URL}/artistlibrary/${artist.img2}`} onClick={() => getHoroscope("belier")}alt=" artiste"/>
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


:selection === "Copyright" ? 
    <div style={{marginTop: "30px", maxHeight:"450px", overflowY: "scroll"}}>
        Nous souhaitons exprimer notre gratitude envers les nombreuses ressources en ligne qui ont contribué à la création de cette application.
        
        
        <div style={{marginTop: "30px"}}> Les informations et les éléments provenant des sites suivants ont été utilisés pour enrichir notre application, et nous tenons à les citer : </div>

       <div style={{marginTop: "30px"}}>  artistetaday (https://www.artistaday.com)</div>

       <div style={{marginTop: "30px"}}>  enigmatik.epikurieu (https://enigmatik.epikurieu.com) </div>

       <div style={{marginTop: "30px"}}>  Blague api (https://www.blagues-api.fr) </div>

       <div style={{marginTop: "30px"}}>  leGorafi (https://www.legorafi.fr)  </div>
        
        
       <div  style={{marginTop: "30px"}}> Nous reconnaissons le travail et les efforts fournis par ces sites pour mettre à disposition du contenu précieux, ce qui a grandement contribué à l'élaboration de cette application. Nous encourageons nos utilisateurs à visiter ces sites pour en apprendre davantage.

        Si nous avons omis de mentionner un site source, veuillez nous en informer afin que nous puissions rectifier cela.
        </div>
        
        <div style={{marginTop: "30px"}}>  Votre soutien et votre collaboration sont grandement appréciés.
</div>
        <div style={{marginTop: "30px"}}> Merci à Thierry le responsable de la Restauration de nous avoir fait confiance pour se projet et à Ludovic notre formateur en conception pour ses précieux conseils.
</div>
        <div style={{marginTop: "40px"}}>
            Victor, Théo et Sandrine
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