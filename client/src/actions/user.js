import axios from "axios";

import {
  UPDATE_PROFILE,
  UPDATE_PROFILE_ERROR,
  GET_CODEWARS_PROFILE,
  GET_CODEWARS_PROFILE_ERROR,
  GET_CURRENT_PROFILE,
  GET_CURRENT_PROFILE_ERROR,
  IS_ANALYSIS_READY,
  IS_ANALYSIS_READY_ERROR
} from "./types";
import { loadUser } from "./auth";

// Update User Profile
export const updateProfile = (formData, history) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.put("/api/user/profile/update", formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(loadUser());
    history.push("/");
  } catch (err) {
    let errors;

    if (err) {
      errors = err.response.data.errors;
    } else {
      errors = [];
    }
    dispatch({
      type: UPDATE_PROFILE_ERROR,
      payload: errors
    });
  }
};

export const getCodewarsProfile = (
  { codewarsUserNameInput },
  history
) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const body = JSON.stringify({
      codewarsUserNameInput
    });

    const res = await axios.put(
      "/api/user/profile/codewars/update",
      body,
      config
    );

    dispatch({
      type: GET_CODEWARS_PROFILE,
      payload: res.data
    });

    dispatch(loadUser());

    history.push("/");
  } catch (error) {
    const errorMessage = (() => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        return error.request;
      } else {
        // Something happened in setting up the request that triggered an Error
        return error.message;
      }
    })();

    dispatch({
      type: GET_CODEWARS_PROFILE_ERROR,
      payload: errorMessage
    });
  }
};

// Get the user's profile from DB
export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get("/api/user/getCurrentProfile");

    dispatch({
      type: GET_CURRENT_PROFILE,
      payload: res.data
    });
  } catch (err) {
    let errors = err.response.data.errors;
    if (!errors) {
      errors = [];
    }
    dispatch({
      type: GET_CURRENT_PROFILE_ERROR,
      payload: errors
    });
  }
};

// Get the user's analysis completion status from DB
export const isAnalysisReady = () => async dispatch => {
  try {
    const res = await axios.get("/api/user/isAnalysisReady");

    dispatch({
      type: IS_ANALYSIS_READY,
      payload: res.data
    });
  } catch (err) {
    let errors = err.response.data.errors;
    if (!errors) {
      errors = [];
    }
    dispatch({
      type: IS_ANALYSIS_READY_ERROR,
      payload: errors
    });
  }
};
