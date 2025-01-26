import { createSlice } from "@reduxjs/toolkit";
import { updateProfileImg } from "./membershipThunk";

const updateProfileImgInitState = {
  data: [],
};

const UpdateProfileImgSlice = createSlice({
  name: "updateProfileImg",
  initialState: updateProfileImgInitState,
  reducers: {
    setUpdateProfileImg: (state, action) => {
      return {
        ...state,
        updateProfileImgInitState: action.payload,
      };
    },
    resetUpdateProfileImg: (state) => updateProfileImgInitState,
  },
  extraReducers: (builder) => {
    builder
      // updateProfileImg
      .addCase(updateProfileImg.pending, (state, action) => {
        return {
          ...state,
          updateProfileImgLoading: true,
          updateProfileImgError: undefined,
          type: action.type,
        };
      })
      .addCase(updateProfileImg.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          updateProfileImgLoading: false,
          updateProfileImgError: undefined,
          type: action.type,
        };
      })
      .addCase(updateProfileImg.rejected, (state, action) => {
        return {
          ...state,
          updateProfileImgLoading: false,
          updateProfileImgError: action.payload,
          type: action.type,
        };
      });
  },
});

export const { resetUpdateProfileImg } = UpdateProfileImgSlice.actions;

export const {
  actions: updateProfileImgAction,
  reducer: updateProfileImgReducer,
} = UpdateProfileImgSlice;
