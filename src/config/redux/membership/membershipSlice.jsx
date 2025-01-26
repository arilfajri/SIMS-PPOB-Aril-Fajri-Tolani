import { createSlice } from "@reduxjs/toolkit";
import {
  login,
  profile,
  register,
  updateProfile,
  updateProfileImg,
} from "./membershipThunk";

const membershipInitState = {
  data: [],
  token: "",
  type: "",
};

const MembershipSlice = createSlice({
  name: "session",
  initialState: membershipInitState,
  reducers: {
    setToken: (state, action) => {
      return {
        ...state,
        token: action.payload,
      };
    },
    setType: (state, action) => {
      return {
        ...state,
        type: "",
      };
    },
    resetMembership: (state) => membershipInitState,
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(login.pending, (state, action) => {
        return {
          ...state,
          loginLoading: true,
          loginError: undefined,
          type: action.type,
        };
      })
      .addCase(login.fulfilled, (state, action) => {
        return {
          ...state,
          token: action.payload.data,
          loginLoading: false,
          loginError: undefined,
          type: action.type,
        };
      })
      .addCase(login.rejected, (state, action) => {
        return {
          ...state,
          loginLoading: false,
          loginError: action.payload,
          type: action.type,
        };
      })
      // register
      .addCase(register.pending, (state, action) => {
        return {
          ...state,
          registerLoading: true,
          registerError: undefined,
          type: action.type,
        };
      })
      .addCase(register.fulfilled, (state, action) => {
        return {
          ...state,
          token: action.payload.data,
          registerLoading: false,
          registerError: undefined,
          type: action.type,
        };
      })
      .addCase(register.rejected, (state, action) => {
        return {
          ...state,
          registerLoading: false,
          registerError: action.payload,
          type: action.type,
        };
      })
      // profile
      .addCase(profile.pending, (state, action) => {
        return {
          ...state,
          profileLoading: true,
          profileError: undefined,
          type: action.type,
        };
      })
      .addCase(profile.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload.data,
          profileLoading: false,
          profileError: undefined,
          type: action.type,
        };
      })
      .addCase(profile.rejected, (state, action) => {
        return {
          ...state,
          profileLoading: false,
          profileError: action.payload,
          type: action.type,
        };
      });
  },
});

export const { resetMembership } = MembershipSlice.actions;

export const { actions: membershipAction, reducer: membershipReducer } =
  MembershipSlice;
