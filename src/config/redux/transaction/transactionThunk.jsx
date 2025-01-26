import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const balance = createAsyncThunk(
  "transaction/balance",
  async (_, { getState }) => {
    const state = getState();
    try {
      const res = await axios.get(
        "https://take-home-test-api.nutech-integrasi.com/balance",
        {
          headers: { Authorization: `Bearer ${state.session.token.token}` },
        }
      );
      return res.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const topup = createAsyncThunk(
  "transaction/topup",
  async (param, { getState }) => {
    const state = getState();
    const res = await axios.post(
      "https://take-home-test-api.nutech-integrasi.com/topup",
      param,
      {
        headers: {
          Authorization: `Bearer ${state.session.token.token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  }
);

export const transaction = createAsyncThunk(
  "transaction/transaction",
  async (param, { getState }) => {
    const state = getState();
    const res = await axios.post(
      "https://take-home-test-api.nutech-integrasi.com/transaction",
      param,
      {
        headers: {
          Authorization: `Bearer ${state.session.token.token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  }
);

export const transactionHistory = createAsyncThunk(
  "transaction/transactionHistory",
  async ({ offset = 0, limit = 5 }, { getState }) => {
    const state = getState();
    try {
      const res = await axios.get(
        `https://take-home-test-api.nutech-integrasi.com/transaction/history?offset=${offset}&limit=${limit}`,
        {
          headers: { Authorization: `Bearer ${state.session.token.token}` },
        }
      );
      return res.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Terjadi kesalahan.");
    }
  }
);
