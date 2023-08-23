import React, { useRef, useState } from "react";
import SockJsClient from "react-stomp";
import { SocketContext } from "../../context/SocketContext";

const SocketComponent = ({ children }) => {
    const clientRef = useRef(null);
    const [topics1, setTopics1] = useState([]);
    const SOCKET_URL = 'http://localhost:8000/ws-message';

    const [externalMessageHandler, setExternalMessageHandler] = useState(null);
    const [receivedMessage, setReceivedMessage] = useState(null);


    const onConnected1 = () => {
        console.log("Connected sock1!!");
        setTimeout(() => setTopics1(['/socket/phone']), 1000);
    }

    const onMessageReceived = (msg) => {
        setReceivedMessage(msg);
    };


    return (
        <SocketContext.Provider value={{ message: receivedMessage }}>
            <SockJsClient
                url={SOCKET_URL}
                ref={clientRef}
                topics={topics1}
                onMessage={msg => onMessageReceived(msg)}
                onConnect={onConnected1}
                debug={true}
            />
            {children}
        </SocketContext.Provider>
    );
}

export default SocketComponent;