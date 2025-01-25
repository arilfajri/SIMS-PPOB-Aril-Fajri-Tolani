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
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        "https://take-home-test-api.nutech-integrasi.com/profile"
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "membership/updateProfile",
  async (
    { id, email, first_name, last_name, profile_image },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.patch(
        `https://take-home-test-api.nutech-integrasi.com/profile/update/${id}`,
        {
          email,
          first_name,
          last_name,
          profile_image,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
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
  async (
    { id, email, first_name, last_name, profile_image },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.patch(
        `https://take-home-test-api.nutech-integrasi.com/profile/image/${id}`,
        {
          email,
          first_name,
          last_name,
          profile_image,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
