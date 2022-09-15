import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// O StrictMode ele faz algumas coisas executarem duas vezes, porém nãao prejudica na perfomance ou no código.
// Apenas acontecesse isso quando está em desenvolvimento.
