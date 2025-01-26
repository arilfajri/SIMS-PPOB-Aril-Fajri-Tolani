import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import ProfileCard from "../component/ProfileCard";
import { useDispatch, useSelector } from "react-redux";
import { transactionHistorySelector } from "../config/redux/transaction/transactionSelector";
import { transactionHistory } from "../config/redux/transaction/transactionThunk";
import { formatDateTime, formatNumberPrice } from "../utils/HelperMethod";

const Transaction = () => {
  const dispatch = useDispatch();
  const historyTransaction = transactionHistorySelector();
  const [offset, setOffset] = useState(0);
  const limit = 5;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    setIsLoading(true);
    await dispatch(transactionHistory({ offset, limit }));
    setIsLoading(false);
  };

  const loadMore = () => {
    setOffset((prevOffset) => prevOffset + limit);
    loadTransactions();
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="px-8 md:px-15 lg:px-20 py-8">
        <ProfileCard />
        <h1 className="mt-4 text-lg font-semibold">Semua Transaksi</h1>

        <div className="mt-4 flex flex-col gap-3">
          {historyTransaction?.map((transaction, index) => (
            <div
              key={index}
              className="py-2 px-4 rounded shadow flex justify-between items-center"
            >
              <div>
                <span
                  className={`text-base font-semibold ${
                    transaction?.transaction_type === "TOPUP"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {transaction?.transaction_type === "TOPUP" ? "+" : "-"}{" "}
                  {formatNumberPrice(transaction.total_amount)}
                </span>

                <p className="text-gray-500 text-xs">
                  {formatDateTime(transaction?.created_on)}
                </p>
              </div>

              <span className="text-gray-600 text-sm">
                {transaction?.description}
              </span>
            </div>
          ))}
        </div>

        {historyTransaction?.length >= limit && (
          <div className="text-center mt-6">
            <button
              onClick={loadMore}
              className="text-red-500 font-semibold"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Show more"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Transaction;
