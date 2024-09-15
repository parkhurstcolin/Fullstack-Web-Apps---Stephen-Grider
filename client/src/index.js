//Import CSS
import "materialize-css/dist/css/materialize.min.css";

//import React & ReactDOM library
import React from "react";
import ReactDom from "react-dom/client";

//import React-Redux & createStore
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";

//import reduxThunk
import reduxThunk from 'redux-thunk';

//Import App component as usual
import App from "./components/App";

import reducers from "./reducers";
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

//Get a reference to the div with ID root
const el = document.getElementById("root");

//Tell React to take control of that element
const root = ReactDom.createRoot(el);

//Render the component
root.render(
	<Provider store={store}>
		<App />
	</Provider>
);
