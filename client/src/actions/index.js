import axios from "axios";
import { FETCH_USER } from "./types";

export const fetchUser = () => async (dispatch) => {
	const res = await axios.get(
		`${process.env.REACT_APP_ROUTE}/api/current_user`
	);
	dispatch({ type: FETCH_USER, payload: res.data });
};

export const handleToken = (token) => async (dispatch) => {
	const res = await axios.post(
		`${process.env.REACT_APP_ROUTE}/api/stripe`,
		token
	);
	dispatch({ type: FETCH_USER, payload: res.data });
};