//import React & ReactDOM library
import React from "react";
import ReactDom from "react-dom/client";

//import React-Redux & createStore
import { Provider } from 'react-redux';
import { createStore, applyMiddleware} from 'redux';

//Import App component as usual
import App from "./Components/App";

import reducers from "./Reducers";
const store = createStore(reducers, {}, applyMiddleware());

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
