import { useSelector } from "react-redux";

export const useTokenSelector = () =>
  useSelector((state) => state.session.token);

export const profileSelector = () => useSelector((state) => state.session.data);
export const updateProfile = () =>
  useSelector((state) => state?.updateProfile?.data);
export const updateProfileImg = () =>
  useSelector((state) => state?.updateProfileImg?.data?.data);
