import axios from "axios";

import { USER_LOADED, AUTH_ERROR } from "./types";
import setAuthToken from "../components/auth/utils/setAuthToken";

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
    dispatch({
      type: AUTH_ERROR
    });
  }
};
