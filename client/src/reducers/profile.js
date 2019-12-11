import {
  GET_CODEWARS_PROFILE,
  GET_CODEWARS_PROFILE_ERROR,
  GET_CURRENT_PROFILE,
  GET_CURRENT_PROFILE_ERROR,
  IS_ANALYSIS_READY,
  IS_ANALYSIS_READY_ERROR,
  CLEAR_PROFILE
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
    case IS_ANALYSIS_READY:
      return {
        loading: false,
        codewars: payload,
        errors: []
      };

    case GET_CODEWARS_PROFILE:
      localStorage.setItem("codewarsProfile", "yes");
      return {
        loading: false,
        codewars: payload,
        errors: []
      };
    case GET_CODEWARS_PROFILE_ERROR:
    case GET_CURRENT_PROFILE_ERROR:
    case IS_ANALYSIS_READY_ERROR:
      return {
        ...state,
        loading: false,
        errors: payload
      };
    case CLEAR_PROFILE:
      return {
        codewars: null,
        loading: false,
        errors: []
      };
    default:
      return state;
  }
}
