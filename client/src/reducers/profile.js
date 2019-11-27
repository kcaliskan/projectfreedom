import {
  GET_CODEWARS_PROFILE,
  GET_CODEWARS_PROFILE_ERROR,
  GET_CURRENT_PROFILE,
  GET_CURRENT_PROFILE_ERROR
} from "../actions/types";

const initialState = {
  codewars: null,
  loading: true,
  errors: []
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_CURRENT_PROFILE:
    case GET_CODEWARS_PROFILE:
      return {
        loading: false,
        codewars: payload,
        errors: []
      };
    case GET_CODEWARS_PROFILE_ERROR:
    case GET_CURRENT_PROFILE_ERROR:
      return {
        ...state,
        loading: false,
        errors: payload
      };
    default:
      return state;
  }
}
