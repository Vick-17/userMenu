import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./styles/index.scss";
import App from "./App";
import SocketComponent from "./components/WebSockets/SocketComponent";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
    <BrowserRouter>
        <SocketComponent>
      <App />
        </SocketComponent>
    </BrowserRouter>
  // </React.StrictMode>
);
