import { SET_LOADING, SET_LOADING_ERROR } from "../actions/types";

const initialState = {
  loading: false,
  error: false
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_LOADING:
      return {
        loading: payload
      };
    case SET_LOADING_ERROR:
      return {
        loading: false,
        error: payload
      };
    default:
      return state;
  }
}
