import axios from "axios";

import {
  USER_LOADED,
  AUTH_ERROR,
  PROVIDER_REGISTER_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL
} from "./types";
import setAuthToken from "../components/auth/utils/setAuthToken";

// Load User with JWT and MongoDB
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);

    try {
      const res = await axios.get("/api/auth/getUser");

      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR
      });
    }
  }
};

// Oauth Provider Action Handler
export const providerRegister = () => async dispatch => {
  try {
    const res = await axios.get("/api/auth/getUser");

    dispatch({
      type: PROVIDER_REGISTER_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

// Manual Register with Email and Password
export const manualRegister = ({
  fullName,
  userName,
  email,
  password,
  passwordConfirm
}) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({
    fullName,
    userName,
    email,
    password,
    passwordConfirm
  });

  try {
    const res = await axios.post("/api/auth/register", body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    dispatch({
      type: REGISTER_FAIL,
      payload: errors
    });
  }
};

/// Manual Login
// Login User
export const manualLogin = (email, password) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/api/auth/login", body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL
    });
  }
};
