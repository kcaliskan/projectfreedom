import axios from "axios";

import {
  USER_LOADED,
  AUTH_ERROR,
  PROVIDER_REGISTER_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CLEAR_PROFILE,
  LOGOUT
} from "./types";
import setAuthToken from "../components/auth/utils/setAuthToken";
import { getCurrentProfile } from "./user";

// Load User with JWT and MongoDB
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("/api/auth/getUser");

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    let errors = err.response.data.errors;
    if (!errors) {
      errors = [];
    }
    dispatch({
      type: AUTH_ERROR,
      payload: errors
    });
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
    let errors = err.response.data.errors;
    if (!errors) {
      errors = [];
    }

    dispatch({
      type: AUTH_ERROR,
      payload: errors
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
    console.log(err.response.data.errors);
    let errors;

    if (err) {
      errors = err.response.data.errors;

      dispatch({
        type: REGISTER_FAIL,
        payload: errors
      });
    } else {
      errors = [];
      dispatch({
        type: REGISTER_FAIL,
        payload: errors
      });
    }
  }
};

/// Manual Login
// Login User
export const manualLogin = ({ email, password }) => async dispatch => {
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
    dispatch(getCurrentProfile());
  } catch (err) {
    console.log(err);
    let errors = err.response.data.errors;
    if (!errors) {
      errors = [];
    }

    dispatch({
      type: LOGIN_FAIL,
      payload: errors
    });
  }
};

// Logout / Clear Profile
export const logout = () => dispatch => {
  try {
    axios.get("/api/auth/logout");

    dispatch({ type: CLEAR_PROFILE });
    dispatch({ type: LOGOUT });
  } catch (err) {
    let errors = err.response.data.errors;
    if (!errors) {
      errors = [];
    }

    dispatch({
      type: AUTH_ERROR,
      payload: errors
    });
  }
};
