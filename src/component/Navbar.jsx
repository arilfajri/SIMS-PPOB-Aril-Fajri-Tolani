import React from "react";
import logo from "../assets/Logo.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <header className="bg-white shadow-md py-4 flex justify-between items-center px-8 md:px-10 lg:px-15">
        <div>
          <Link to={"/home"} className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="w-6 h-6" />
            <h1 className="font-semibold text-lg">SIMS PPOB</h1>
          </Link>
        </div>
        <nav className="space-x-4 text-gray-700 font-medium flex gap-10">
          <Link to={"/topup"} className="hover:text-red-500">
            Top Up
          </Link>
          <Link to={"/transaction"} className="hover:text-red-500">
            Transactions
          </Link>
          <Link to={"/profile"} className="hover:text-red-500">
            Akun
          </Link>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
