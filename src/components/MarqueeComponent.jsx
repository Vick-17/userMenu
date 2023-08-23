import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { getInfosPhone, getYesterdayGaspi } from "../Services/apiService";
import { useSocket } from "../context/SocketContext";

const MarqueeComponent = () => {
    const [yGaspi, setYGaspi] = useState(null);
    const [infosPhone, setInfosPhone] = useState(null);
    const socket = useSocket();

    useEffect(() => {
        console.log("message reçu", socket.message);

        if (socket.message) {
            getYesterdayGaspi().then((response) => {
                setYGaspi(response);
            });
            getInfosPhone().then((response) => {
                setInfosPhone(response);
            });
        }
    }, [socket.message]);

    useEffect(()=>{

            getYesterdayGaspi().then((response) => {
                setYGaspi(response);
            });
            getInfosPhone().then((response) => {
                setInfosPhone(response);
            });

    }, [])

    useEffect(() => {
        console.log(infosPhone);
    }, [infosPhone]);

    return (
        <div style={{ marginBottom: "1em" }}>
            <Marquee speed={"100"} style={{ backgroundColor: "#ebebeb", color: "black" }}>
                {yGaspi ? <div style={{ marginRight: "4em" }}>Hier nous avons jeté {yGaspi.poids}kg de nourriture !</div> : null}
                {infosPhone && infosPhone.map((info, index) =>
                    <div key={index} style={{ marginRight: "4em" }}>{info.text}</div>
                )}
            </Marquee>
        </div>
    );
}

export default MarqueeComponent;