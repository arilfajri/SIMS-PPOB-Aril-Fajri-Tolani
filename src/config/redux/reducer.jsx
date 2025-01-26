import { combineReducers } from "redux";
import { membershipReducer } from "./membership/membershipSlice";
import { bannerReducer } from "./information/bannerSlice";
import { servicesReducer } from "./information/servicesSlice";
import { balanceReducer } from "./transaction/balanceSlice";
import { topupReducer } from "./transaction/topupSlice";
import { transactionReducer } from "./transaction/transactionSlice";
import { transactionHistoryReducer } from "./transaction/transactionHistorySlice";
import { updateProfileImgReducer } from "./membership/updateProfileImgSlice";
import { updateProfileReducer } from "./membership/updateProfileSlice";

const reducer = combineReducers({
  session: membershipReducer,
  banner: bannerReducer,
  services: servicesReducer,
  balance: balanceReducer,
  topup: topupReducer,
  transaction: transactionReducer,
  transactionHistory: transactionHistoryReducer,
  updateProfileImg: updateProfileImgReducer,
  updateProfile: updateProfileReducer,
});

export default reducer;
