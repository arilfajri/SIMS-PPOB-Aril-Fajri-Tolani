import { useSelector } from "react-redux";

export const balanceSelector = () =>
  useSelector((state) => state?.balance?.data?.data);

export const topupSelector = () =>
  useSelector((state) => state?.topup?.data?.data);

export const transactionSelector = () =>
  useSelector((state) => state?.transaction?.data?.data);

export const transactionHistorySelector = () =>
  useSelector((state) => state?.transactionHistory?.data?.data?.records);
