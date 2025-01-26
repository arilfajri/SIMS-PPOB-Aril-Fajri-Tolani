import { createSlice } from "@reduxjs/toolkit";
import { transactionHistory } from "./transactionThunk";

const transactionHistoryInitState = {
  data: [],
};

const TransactionHistorySlice = createSlice({
  name: "transactionHistory",
  initialState: transactionHistoryInitState,
  reducers: {
    setTransactionHistory: (state, action) => {
      return {
        ...state,
        transactionHistoryInitState: action.payload,
      };
    },
    resetTransactionHistory: (state) => transactionHistoryInitState,
  },
  extraReducers: (builder) => {
    builder
      // transactionHistory
      .addCase(transactionHistory.pending, (state, action) => {
        return {
          ...state,
          transactionHistoryLoading: true,
          transactionHistoryError: undefined,
          type: action.type,
        };
      })
      .addCase(transactionHistory.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          transactionHistoryLoading: false,
          transactionHistoryError: undefined,
          type: action.type,
        };
      })
      .addCase(transactionHistory.rejected, (state, action) => {
        return {
          ...state,
          transactionHistoryLoading: false,
          transactionHistoryError: action.payload,
          type: action.type,
        };
      });
  },
});

export const { resetTransactionHistory } = TransactionHistorySlice.actions;

export const {
  actions: transactionHistoryAction,
  reducer: transactionHistoryReducer,
} = TransactionHistorySlice;
