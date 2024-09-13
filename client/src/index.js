//import React & ReactDOM library
import React from "react";
import ReactDom from "react-dom/client";

//Import App component as usual
import App from "./Components/App";

//Get a reference to the div with ID root
const el = document.getElementById("root");

//Tell React to take control of that element
const root = ReactDom.createRoot(el);

//Render the component
root.render(<App />);
