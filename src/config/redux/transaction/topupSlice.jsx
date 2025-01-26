import { createSlice } from "@reduxjs/toolkit";
import { topup } from "./transactionThunk";

const topupInitState = {
  data: [],
};

const TopupSlice = createSlice({
  name: "topup",
  initialState: topupInitState,
  reducers: {
    setTopup: (state, action) => {
      return {
        ...state,
        topupInitState: action.payload,
      };
    },
    resetTopup: (state) => topupInitState,
  },
  extraReducers: (builder) => {
    builder
      // topup
      .addCase(topup.pending, (state, action) => {
        return {
          ...state,
          topupLoading: true,
          topupError: undefined,
          type: action.type,
        };
      })
      .addCase(topup.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          topupLoading: false,
          topupError: undefined,
          type: action.type,
        };
      })
      .addCase(topup.rejected, (state, action) => {
        return {
          ...state,
          topupLoading: false,
          topupError: action.payload,
          type: action.type,
        };
      });
  },
});

export const { resetTopup } = TopupSlice.actions;

export const { actions: topupAction, reducer: topupReducer } = TopupSlice;
