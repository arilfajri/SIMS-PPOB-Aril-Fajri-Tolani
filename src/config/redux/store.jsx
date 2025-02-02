import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import reducer from "./reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "session",
    "banner",
    "services",
    "balance",
    "topup",
    "transaction",
    "transactionHistory",
    "updateProfileImg",
    "updateProfile",
  ],
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persiststore = persistStore(store);

export default store;
