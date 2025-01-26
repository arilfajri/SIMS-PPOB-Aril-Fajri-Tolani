import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Register
export const register = createAsyncThunk(
  "membership/register",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "https://take-home-test-api.nutech-integrasi.com/registration",
        userData
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Login
export const login = createAsyncThunk(
  "membership/login",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "https://take-home-test-api.nutech-integrasi.com/login",
        userData
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// profile
export const profile = createAsyncThunk(
  "membership/profile",
  async (_, { getState }) => {
    const state = getState();
    try {
      const res = await axios.get(
        "https://take-home-test-api.nutech-integrasi.com/profile",
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
export const updateProfile = createAsyncThunk(
  "membership/updateProfile",
  async ({ first_name, last_name }, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `https://take-home-test-api.nutech-integrasi.com/profile/update`,
        {
          first_name,
          last_name,
        },
        {
          headers: {
            Authorization: `Bearer ${state.session.token.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProfileImg = createAsyncThunk(
  "membership/updateProfileImg",
  async ({ profile_image }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("profile_image", profile_image);

      const res = await axios.put(
        "https://take-home-test-api.nutech-integrasi.com/profile/image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${state.session.token.token}`,
          },
        }
      );

      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : { message: "Terjadi kesalahan" }
      );
    }
  }
);
