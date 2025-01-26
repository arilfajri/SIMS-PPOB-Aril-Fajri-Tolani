import { createSlice } from "@reduxjs/toolkit";
import { balance } from "./transactionThunk";

const balanceInitState = {
  data: [],
};

const BalanceSlice = createSlice({
  name: "balance",
  initialState: balanceInitState,
  reducers: {
    setBalance: (state, action) => {
      return {
        ...state,
        balanceInitState: action.payload,
      };
    },
    resetBalance: (state) => balanceInitState,
  },
  extraReducers: (builder) => {
    builder
      // balance
      .addCase(balance.pending, (state, action) => {
        return {
          ...state,
          balanceLoading: true,
          balanceError: undefined,
          type: action.type,
        };
      })
      .addCase(balance.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          balanceLoading: false,
          balanceError: undefined,
          type: action.type,
        };
      })
      .addCase(balance.rejected, (state, action) => {
        return {
          ...state,
          balanceLoading: false,
          balanceError: action.payload,
          type: action.type,
        };
      });
  },
});

export const { resetBalance } = BalanceSlice.actions;

export const { actions: balanceAction, reducer: balanceReducer } = BalanceSlice;
