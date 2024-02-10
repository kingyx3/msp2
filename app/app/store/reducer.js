import { combineReducers } from "redux";
import search from "./search";
import host from "./host";
import user from "./user";

export default combineReducers({
  search,
  host,
  user,
});
