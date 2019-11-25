import axios from "axios";

import { UPDATE_PROFILE, UPDATE_PROFILE_ERROR } from "./types";
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
    console.log(err);
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
