import { createSlice } from "@reduxjs/toolkit";
import { banner } from "./informationThunk";

const bannerInitState = {
  data: [],
};

const BannerSlice = createSlice({
  name: "banner",
  initialState: bannerInitState,
  reducers: {
    setBanner: (state, action) => {
      return {
        ...state,
        bannerInitState: action.payload,
      };
    },
    resetBanner: (state) => bannerInitState,
  },
  extraReducers: (builder) => {
    builder
      // banner
      .addCase(banner.pending, (state, action) => {
        return {
          ...state,
          bannerLoading: true,
          bannerError: undefined,
          type: action.type,
        };
      })
      .addCase(banner.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          bannerLoading: false,
          bannerError: undefined,
          type: action.type,
        };
      })
      .addCase(banner.rejected, (state, action) => {
        return {
          ...state,
          bannerLoading: false,
          bannerError: action.payload,
          type: action.type,
        };
      });
  },
});

export const { resetBanner } = BannerSlice.actions;

export const { actions: bannerAction, reducer: bannerReducer } = BannerSlice;
