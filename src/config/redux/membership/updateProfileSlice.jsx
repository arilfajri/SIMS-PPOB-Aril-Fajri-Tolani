import { createSlice } from "@reduxjs/toolkit";
import { updateProfile } from "./membershipThunk";

const updateProfileInitState = {
  data: [],
};

const UpdateProfileSlice = createSlice({
  name: "updateProfile",
  initialState: updateProfileInitState,
  reducers: {
    setUpdateProfile: (state, action) => {
      return {
        ...state,
        updateProfileInitState: action.payload,
      };
    },
    resetUpdateProfile: (state) => updateProfileInitState,
  },
  extraReducers: (builder) => {
    builder
      // updateProfile
      .addCase(updateProfile.pending, (state, action) => {
        return {
          ...state,
          updateProfileLoading: true,
          updateProfileError: undefined,
          type: action.type,
        };
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          updateProfileLoading: false,
          updateProfileError: undefined,
          type: action.type,
        };
      })
      .addCase(updateProfile.rejected, (state, action) => {
        return {
          ...state,
          updateProfileLoading: false,
          updateProfileError: action.payload,
          type: action.type,
        };
      });
  },
});

export const { resetUpdateProfile } = UpdateProfileSlice.actions;

export const { actions: updateProfileAction, reducer: updateProfileReducer } =
  UpdateProfileSlice;
