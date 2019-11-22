import {
  USER_LOADED,
  AUTH_ERROR,
  PROVIDER_REGISTER_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  loading: true,
  user: null,
  errors: []
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case PROVIDER_REGISTER_SUCCESS:
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
        token: localStorage.getItem("token")
      };
    case AUTH_ERROR:
    case REGISTER_FAIL:
    case LOGIN_FAIL:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        errors: payload
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };
    default:
      return state;
  }
}
