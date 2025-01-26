import { createSlice } from "@reduxjs/toolkit";
import { transaction } from "./transactionThunk";

const transactionInitState = {
  data: [],
};

const TransactionSlice = createSlice({
  name: "transaction",
  initialState: transactionInitState,
  reducers: {
    setTransaction: (state, action) => {
      return {
        ...state,
        transactionInitState: action.payload,
      };
    },
    resetTransaction: (state) => transactionInitState,
  },
  extraReducers: (builder) => {
    builder
      // transaction
      .addCase(transaction.pending, (state, action) => {
        return {
          ...state,
          transactionLoading: true,
          transactionError: undefined,
          type: action.type,
        };
      })
      .addCase(transaction.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          transactionLoading: false,
          transactionError: undefined,
          type: action.type,
        };
      })
      .addCase(transaction.rejected, (state, action) => {
        return {
          ...state,
          transactionLoading: false,
          transactionError: action.payload,
          type: action.type,
        };
      });
  },
});

export const { resetTransaction } = TransactionSlice.actions;

export const { actions: transactionAction, reducer: transactionReducer } =
  TransactionSlice;
