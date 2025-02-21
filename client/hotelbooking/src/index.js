import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx"; // Add the .jsx extension
import "./index.css"; // Optional: if you have global styles

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
