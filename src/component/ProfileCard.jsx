import React from "react";

const ProfileCard = () => {
  return (
    <div className="flex">
      <div className="mb-6 w-2/5">
        <img
          src={`https://minio.nutech-integrasi.com/take-home-test/profile/LLKR6JL1-1735479141699.png`}
          alt="User Avatar"
          className="w-16 h-16 rounded-full"
        />
        <h1 className="mt-4 text-lg ">Selamat datang,</h1>
        <h1 className="text-2xl font-semibold">Aril Fajri Tolani</h1>
      </div>

      <div className="mb-8 w-3/5 h-full">
        <div className="bg-red-500 text-white rounded-lg p-6 relative shadow-md">
          <h1>Saldo anda</h1>
          <h1 className="text-2xl font-semibold mt-2">Rp.</h1>
          <h1 className="mt-2 text-sm">Lihat Saldo</h1>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
