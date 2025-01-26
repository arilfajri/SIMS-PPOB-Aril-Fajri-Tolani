import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { profileSelector } from "../config/redux/membership/membershipSelector";
import { profile } from "../config/redux/membership/membershipThunk";
import { balanceSelector } from "../config/redux/transaction/transactionSelector";
import { balance } from "../config/redux/transaction/transactionThunk";
import { Eye, EyeOff } from "lucide-react";
import { formatNumberPrice } from "../utils/HelperMethod";

const ProfileCard = () => {
  const dispatch = useDispatch();
  const profileData = profileSelector();
  const balancee = balanceSelector();
  const [showBalance, setShowBalance] = useState(false);
  console.log(balancee);

  useEffect(() => {
    dispatch(profile());
    dispatch(balance());
  }, []);

  const toggleBalanceVisibility = () => {
    setShowBalance(!showBalance);
  };

  return (
    <div className="md:flex">
      <div className="mb-6 md:w-2/5 md:text-left text-center flex flex-col md:flex-none items-center md:items-start">
        <img
          src={profileData?.profile_image}
          alt="User Avatar"
          className="w-16 h-16 rounded-full"
        />
        <h1 className="mt-4 text-lg ">Selamat datang,</h1>
        <h1 className="text-2xl font-semibold">
          {profileData?.first_name + " " + profileData?.last_name}
        </h1>
      </div>

      <div className="mb-8 md:w-3/5 h-full w-full">
        <div className="bg-red-500 text-white rounded-lg p-6 relative shadow-md">
          <div className="flex items-center justify-between">
            <h1>Saldo Anda</h1>
          </div>
          <h1 className="text-2xl font-semibold mt-2">
            {showBalance
              ? ` ${formatNumberPrice(balancee.balance)}`
              : "Rp ••••••"}
          </h1>
          <button
            onClick={toggleBalanceVisibility}
            className="flex items-center gap-2 mt-2 text-sm text-white hover:text-gray-200 focus:outline-none"
          >
            {showBalance ? (
              <>
                Tutup Saldo
                <EyeOff size={20} />
              </>
            ) : (
              <>
                Lihat Saldo
                <Eye size={20} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
