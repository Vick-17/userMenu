import React, {useEffect, useState} from "react";
import Marquee from "react-fast-marquee";
import {getYesterdayGaspi} from "../Services/apiService";

const MarqueeComponent = () => {
    const [yGaspi, setYGaspi] = useState(null);

    useEffect(()=>{
        getYesterdayGaspi().then((response)=>{
            setYGaspi(response);
        })
    }, [])

    return (
        <div style={{marginBottom: "1em"}}>
            <Marquee speed={"100"} style={{backgroundColor: "#ebebeb", color: "black"}}>
                {yGaspi ?
                    <div>Hier nous avons jeté {yGaspi.poids}kg de nourriture !</div>
                :null}


            </Marquee>
        </div>
    )
}

export default MarqueeComponent;