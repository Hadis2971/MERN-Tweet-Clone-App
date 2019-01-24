import { AUTH_SUCCESS, REGISTER_SUCCESS, AUTH_LOGOUT, GET_ERRORS } from "./actionTypes";
import jwt_decode from "jwt-decode";
import axios from "axios";
import setAuthHeader from "../utils/setAuthHeader";

export const registerNewUser = (user,history) => dispatch => {

    axios.post("http://localhost:5000/api/auth/register", user)
    .then((response) => {      
        dispatch({
            type: REGISTER_SUCCESS,
            user: response.data.user
        });
        history.push("/auth/login");
      })
    .catch((error) => {
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        });
      });
}

export const login = (data, history) => dispatch => {
    axios.post("http://localhost:5000/api/auth/login", {
        email: data.email,
        password: data.password
      })
      .then((response) => {
        const token = response.data.token;
        const user  = jwt_decode(token);

        setAuthHeader(token);
        localStorage.setItem("jwt_token", token);

        dispatch({
            type: AUTH_SUCCESS,
            token: token,
            user: user
        });

        history.push("/");

      })
      .catch((error) => {
        //console.log(error);
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        });
      });
}

export const logout = () => dispatch => {
    localStorage.removeItem("jwt_token");
    setAuthHeader(null);
    dispatch({
        type: AUTH_LOGOUT
    });
}