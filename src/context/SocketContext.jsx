import React, { createContext, useContext } from "react";

// Créez un contexte
export const SocketContext = createContext({
    message: null
});

// Créez un hook personnalisé pour utiliser ce contexte
export const useSocket = () => {
    return useContext(SocketContext);
};