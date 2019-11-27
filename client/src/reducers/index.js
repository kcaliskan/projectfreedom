import { combineReducers } from "redux";
import auth from "./auth";
import profile from "./profile";
import loading from "./loading";

export default combineReducers({
  auth,
  profile,
  loading
});
