import { useSelector } from "react-redux";

export const bannerSelector = () =>
  useSelector((state) => state?.banner?.data?.data);
export const servicesSelector = () =>
  useSelector((state) => state.services?.data?.data);
