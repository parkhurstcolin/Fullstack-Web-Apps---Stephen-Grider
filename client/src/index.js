//Import CSS
import "materialize-css/dist/css/materialize.min.css";

//import React & ReactDOM library
import React from "react";
import ReactDOM from "react-dom";

//import React-Redux & createStore
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";

//import reduxThunk
import { thunk } from "redux-thunk";

//Import App component as usual
import App from "./components/App";
import reducers from "./reducers";
import axios from "axios";
window.axios = axios;

const store = createStore(reducers, {}, applyMiddleware(thunk));

//Render the component
ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.querySelector("#root")
);
