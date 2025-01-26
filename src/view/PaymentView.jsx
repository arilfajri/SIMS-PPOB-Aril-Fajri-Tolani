import React from "react";
import Navbar from "../component/Navbar";
import ProfileCard from "../component/ProfileCard";
import { useLocation } from "react-router-dom";
import { WalletCards } from "lucide-react";
import { formatNumberPrice } from "../utils/HelperMethod";
import { useDispatch } from "react-redux";
import {
  balance,
  transaction,
} from "../config/redux/transaction/transactionThunk";
import Swal from "sweetalert2";
import { useFormik } from "formik";

const PaymentView = () => {
  const location = useLocation();
  const data = location.state;
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      service_code: `${data.service_code}`,
      service_tariff: `${data.service_tarif}`,
    },

    onSubmit: async (values) => {
      const { isConfirmed } = await Swal.fire({
        title: `Beli ${data?.service_name} senilai`,
        html: `<strong>${formatNumberPrice(data.service_tariff)}</strong> ?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya, lanjutkan Bayar",
        cancelButtonText: "Batalkan",
      });

      if (isConfirmed) {
        try {
          const result = await dispatch(
            transaction({
              service_code: values.service_code,
            })
          ).unwrap();
          Swal.fire({
            title: `Pembayaran ${data?.service_name} sebesar`,
            html: `<strong>${formatNumberPrice(
              data.service_tariff
            )}</strong> ?`,
            icon: "success",
            showConfirmButton: false,
            footer: `<a href="/" style="color: red; font-weight: bold; text-decoration: none;">Kembali ke Beranda</a>`,
          });

          dispatch(balance());
        } catch (error) {
          Swal.fire({
            title: `Pembelian ${data?.service_name} sebesar`,
            html: `<strong>${formatNumberPrice(
              data.service_tariff
            )}</strong> ?`,
            text: error?.message || "Terjadi kesalahan. Silakan coba lagi.",
            icon: "error",
            showConfirmButton: false,
            footer: `<a href="/" style="color: red; font-weight: bold; text-decoration: none;">Kembali ke Beranda</a>`,
          });
        }
      }
    },
  });

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="px-8 md:px-15 lg:px-20 py-8">
        <ProfileCard />
        <h1 className="mt-4 text-lg ">PemBayaran</h1>
        <div className="py-2 flex gap-2 items-center">
          <img
            src={data?.service_icon}
            alt={data?.service_name}
            className="w-8 h-8"
          />
          <h1 className="text-base font-semibold">{data?.service_name}</h1>
        </div>
        <form
          action=""
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-6 py-10"
        >
          <div className="relative">
            <span
              className={`absolute inset-y-0 left-0 flex items-center pl-3`}
            >
              <WalletCards size={18} />
            </span>
            <input
              id="service_tariff"
              name="service_tariff"
              type="text"
              className="block w-full rounded-md bg-white px-10 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-black"
              onChange={formik.handleChange}
              value={formatNumberPrice(data.service_tariff)}
            />
          </div>
          <button
            type="sumbit"
            className={`w-full py-2 rounded text-base font-semibold bg-red-500 text-white`}
          >
            Bayar
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentView;
