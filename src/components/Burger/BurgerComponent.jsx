import React, {useState} from "react";
import {Link} from "react-router-dom";

const BurgerComponent = () => {
    const [selection, setSelection] = useState("Menu");

    const handleClickHoroscope = () => {
        setSelection("Horoscope")
    }

    const handleClickReturn = () => {
        setSelection("Menu")
    }


    return (
        <>
            <div style={{position: "relative"}}>

                <div style={{marginBottom: "1em"}}>
                    <strong>{selection}</strong>
                </div>
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
    <div style={{position: "absolute", top: "-10px", right: "-10px"}} onClick={handleClickReturn}><img width={32} src={`${process.env.PUBLIC_URL}/next.svg`} style={{transform : "scaleX(-1)"}}/></div>

    <div>
                        <div><img width={32} src={`${process.env.PUBLIC_URL}/horoscope/belier.svg`}/></div>
                        <div><img width={32} src={`${process.env.PUBLIC_URL}/horoscope/taureau.svg`}/></div>
                        <div><img width={32} src={`${process.env.PUBLIC_URL}/horoscope/jumeaux.svg`}/></div>
                        <div><img width={32} src={`${process.env.PUBLIC_URL}/horoscope/cancer.svg`}/></div>
                        <div><img width={32} src={`${process.env.PUBLIC_URL}/horoscope/lion.svg`}/></div>
                        <div><img width={32} src={`${process.env.PUBLIC_URL}/horoscope/vierge.svg`}/></div>
                        <div><img width={32} src={`${process.env.PUBLIC_URL}/horoscope/balance.svg`}/></div>
                        <div><img width={32} src={`${process.env.PUBLIC_URL}/horoscope/scorpion.svg`}/></div>
                        <div><img width={32} src={`${process.env.PUBLIC_URL}/horoscope/sagitaire.svg`}/></div>
                        <div><img width={32} src={`${process.env.PUBLIC_URL}/horoscope/capricorne.svg`}/></div>
                        <div><img width={32} src={`${process.env.PUBLIC_URL}/horoscope/verseau.svg`}/></div>
                        <div><img width={32} src={`${process.env.PUBLIC_URL}/horoscope/poisson.svg`}/></div>
                        </div>

</>

                :
                    <>
                    <div><img width={32} src={`${process.env.PUBLIC_URL}/moon.svg`} onClick={handleClickHoroscope}/></div>
                    <div><img width={32} src={`${process.env.PUBLIC_URL}/enigme.png`}/></div>
                    <div><img width={32} src={`${process.env.PUBLIC_URL}/art.svg`}/></div>
                    </>
                }
                </div>






            </div>
        </>
    )
}

export default BurgerComponent;