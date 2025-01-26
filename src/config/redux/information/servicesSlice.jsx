import { createSlice } from "@reduxjs/toolkit";
import { banner, services } from "./informationThunk";

const servicesInitState = {
  data: [],
};

const ServiceSlice = createSlice({
  name: "services",
  initialState: servicesInitState,
  reducers: {
    setServices: (state, action) => {
      return {
        ...state,
        servicesInitState: action.payload,
      };
    },
    resetServices: (state) => servicesInitState,
  },
  extraReducers: (builder) => {
    builder
      // banner
      .addCase(services.pending, (state, action) => {
        return {
          ...state,
          servicesLoading: true,
          servicesError: undefined,
          type: action.type,
        };
      })
      .addCase(services.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
          servicesLoading: false,
          servicesError: undefined,
          type: action.type,
        };
      })
      .addCase(services.rejected, (state, action) => {
        return {
          ...state,
          servicesLoading: false,
          servicesError: action.payload,
          type: action.type,
        };
      });
  },
});

export const { resetServices } = ServiceSlice.actions;

export const { actions: servicesAction, reducer: servicesReducer } =
  ServiceSlice;
