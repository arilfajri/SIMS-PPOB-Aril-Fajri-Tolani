import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import ProfileCard from "../component/ProfileCard";
import * as Yup from "yup";
import { useFormik } from "formik";
import { WalletCards } from "lucide-react";
import { formatNumberPrice } from "../utils/HelperMethod";
import { useDispatch } from "react-redux";
import { balance, topup } from "../config/redux/transaction/transactionThunk";
import Swal from "sweetalert2";

const TopUpView = () => {
  const [isTopupFocused, setIsTopupFocused] = useState(false);
  const [selectedNominal, setSelectedNominal] = useState(null);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      top_up_amount: "",
    },
    validationSchema: Yup.object({
      top_up_amount: Yup.number()
        .min(10000, "Nominal minimum Rp. 10.000")
        .max(1000000, "Nominal maksimum Rp. 1.000.000")
        .required("Nominal wajib diisi"),
    }),
    onSubmit: async (values) => {
      const { isConfirmed } = await Swal.fire({
        title: "Anda yakin untuk Top Up sebesar",
        html: `<strong>${formatNumberPrice(values.top_up_amount)}</strong> ?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya, lanjutkan Top Up",
        cancelButtonText: "Batalkan",
      });

      if (isConfirmed) {
        try {
          const result = await dispatch(topup(values)).unwrap();

          Swal.fire({
            title: "Top Up sebesar",
            html: `<strong>${formatNumberPrice(
              values.top_up_amount
            )}</strong><br>berhasil!`,
            icon: "success",
            showConfirmButton: false,
            footer: `<a href="/" style="color: red; font-weight: bold; text-decoration: none;">Kembali ke Beranda</a>`,
          });

          dispatch(balance());
        } catch (error) {
          Swal.fire({
            title: "Top Up Gagal",
            text: error?.message || "Terjadi kesalahan. Silakan coba lagi.",
            icon: "error",
            showConfirmButton: false,
            footer: `<a href="/" style="color: red; font-weight: bold; text-decoration: none;">Kembali ke Beranda</a>`,
          });

          formik.resetForm();
        }
      }
    },
  });

  const handleNominalClick = (nominal) => {
    formik.setFieldValue("top_up_amount", nominal);
    setSelectedNominal(nominal);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="px-8 md:px-15 lg:px-20 py-8">
        <ProfileCard />
        <h1 className="mt-4 text-lg ">Silahkan masukan</h1>
        <h1 className="text-2xl font-semibold">Nominal Top Up</h1>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 py-8">
          <div className="md:col-span-7 flex flex-col gap-4">
            <form onSubmit={formik.handleSubmit} className="relative">
              <span
                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                  isTopupFocused ? "text-black" : "text-gray-400"
                }`}
              >
                <WalletCards size={18} />
              </span>
              <input
                id="top_up_amount"
                name="top_up_amount"
                type="number"
                min="10000"
                max="1000000"
                placeholder="Masukkan nominal top-up"
                className="block w-full rounded bg-white px-10 py-2 text-sm text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-black"
                value={formik.values.top_up_amount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                onFocus={() => setIsTopupFocused(true)}
              />
            </form>
            {formik.touched.top_up_amount && formik.errors.top_up_amount && (
              <div className="text-red-500 text-sm text-right">
                {formik.errors.top_up_amount}
              </div>
            )}

            <button
              type="submit"
              onClick={formik.handleSubmit}
              className={`w-full py-2 rounded text-base font-semibold ${
                !formik.values.top_up_amount || !!formik.errors.top_up_amount
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-red-500 text-white"
              }`}
              disabled={!!formik.errors.top_up_amount}
            >
              Top Up
            </button>
          </div>

          <div className="md:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-4 md:flex md:flex-wrap">
            {[10000, 20000, 50000, 100000, 250000, 500000].map((nominal) => (
              <button
                key={nominal}
                type="button"
                onClick={() => handleNominalClick(nominal)}
                className="w-full md:w-32 p-2 text-center rounded border text-sm hover:bg-red-500 hover:text-white hover:border-red-500"
              >
                {formatNumberPrice(nominal)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopUpView;
