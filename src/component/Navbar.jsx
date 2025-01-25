import React from "react";
import logo from "../assets/Logo.png";
import { useDispatch } from "react-redux";
import { reset } from "../config/redux/membership/membershipSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(reset());
  };
  return (
    <div>
      <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="w-6 h-6" />
          <h1 className="font-semibold text-lg">SIMS PPOB</h1>
        </div>
        <nav className="space-x-4 text-gray-700 font-medium flex gap-10">
          <a href="#" className="hover:text-red-500">
            Top Up
          </a>
          <a href="#" className="hover:text-red-500">
            Transaction
          </a>
          <button onClick={handleLogout}>
            <a href="#" className="hover:text-red-500">
              Akun
            </a>
          </button>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
