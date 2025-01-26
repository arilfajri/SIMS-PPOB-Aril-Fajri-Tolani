import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const banner = createAsyncThunk(
  "information/banner",
  async (_, { getState }) => {
    const state = getState();
    try {
      const res = await axios.get(
        "https://take-home-test-api.nutech-integrasi.com/banner",
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

export const services = createAsyncThunk(
  "information/services",
  async (_, { getState }) => {
    const state = getState();
    try {
      const res = await axios.get(
        "https://take-home-test-api.nutech-integrasi.com/services",
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
