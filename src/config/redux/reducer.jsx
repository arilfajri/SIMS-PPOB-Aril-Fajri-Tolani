import { combineReducers } from "redux";
import { membershipReducer } from "./membership/membershipSlice";

const reducer = combineReducers({
  session: membershipReducer,
});

export default reducer;
