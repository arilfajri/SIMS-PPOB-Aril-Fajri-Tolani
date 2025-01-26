import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AtSign, Pencil, User } from "lucide-react";
import { useDispatch } from "react-redux";
import { profileSelector } from "../config/redux/membership/membershipSelector";
import {
  profile,
  updateProfile,
  updateProfileImg,
} from "../config/redux/membership/membershipThunk";
import Swal from "sweetalert2";
import { resetBanner } from "../config/redux/information/bannerSlice";
import { resetMembership } from "../config/redux/membership/membershipSlice";
import { resetBalance } from "../config/redux/transaction/balanceSlice";
import { resetServices } from "../config/redux/information/servicesSlice";
import { resetTopup } from "../config/redux/transaction/topupSlice";
import { resetTransactionHistory } from "../config/redux/transaction/transactionHistorySlice";
import { resetTransaction } from "../config/redux/transaction/transactionSlice";
import { resetUpdateProfile } from "../config/redux/membership/updateProfileSlice";
import { resetUpdateProfileImg } from "../config/redux/membership/updateProfileImgSlice";

const ProfileView = () => {
  const dispatch = useDispatch();
  const profileData = profileSelector();
  console.log(profileData);
  const [imagePreview, setImagePreview] = useState(profileData.profile_image);
  useEffect(() => {
    dispatch(profile());
  }, []);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validasi ukuran file maksimum 100 KB
    if (file.size > 100 * 1024) {
      alert("Ukuran gambar tidak boleh lebih dari 100 KB");
      return;
    }

    console.log(file);

    try {
      const formData = { profile_image: file };

      await dispatch(updateProfileImg(formData)).unwrap();
      alert("Gambar profil berhasil diperbarui!");
    } catch (error) {
      console.error("Error saat mengupdate gambar:", error.message);
      alert("Terjadi kesalahan saat mengupdate gambar profil.");
    }
  };
  const formik = useFormik({
    initialValues: {
      email: `${profileData.email}`,
      first_name: `${profileData.first_name}`,
      last_name: `${profileData.last_name}`,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("email tidak valid")
        .required("email wajib diisi"),
      first_name: Yup.string().required("nama depan wajib diisi"),
      last_name: Yup.string().required("nama belakang wajib diisi"),
    }),
    onSubmit: async (values) => {
      const { isConfirmed } = await Swal.fire({
        title: `Beli  senilai`,
        html: `<strong>sa</strong> ?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya, lanjutkan Bayar",
        cancelButtonText: "Batalkan",
      });

      if (isConfirmed) {
        try {
          const result = await dispatch(
            updateProfile({
              first_name: values.first_name,
              last_name: values.last_name,
            })
          ).unwrap();
          Swal.fire({
            title: `Pembayaran  sebesar`,
            html: `<strong>a</strong> ?`,
            icon: "success",
            showConfirmButton: false,
            footer: `<a href="/" style="color: red; font-weight: bold; text-decoration: none;">Kembali ke Beranda</a>`,
          });

          dispatch(profile());
        } catch (error) {
          Swal.fire({
            title: `Pembelian sebesar`,
            html: `<strong>a</strong> ?`,
            text: error?.message || "Terjadi kesalahan. Silakan coba lagi.",
            icon: "error",
            showConfirmButton: false,
            footer: `<a href="/" style="color: red; font-weight: bold; text-decoration: none;">Kembali ke Beranda</a>`,
          });
        }
      }
    },
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    dispatch(resetBanner());
    dispatch(resetMembership());
    dispatch(resetBalance());
    dispatch(resetServices());
    dispatch(resetTopup());
    dispatch(resetTransactionHistory());
    dispatch(resetTransaction());
    dispatch(resetUpdateProfile());
    dispatch(resetUpdateProfileImg());
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-lg mx-auto py-8 px-4 text-center">
        <div className="flex flex-col items-center justify-center">
          <div className="relative w-40 h-40">
            <img
              src={imagePreview}
              alt="Profile"
              className="w-full h-full rounded-full object-cover border-2 border-gray-300 justify-center"
            />

            <label
              htmlFor="profile-picture-upload"
              className="absolute bottom-2 right-2 bg-gray-200 p-2 rounded-full cursor-pointer shadow-md hover:bg-gray-300"
            >
              <Pencil size={20} className="text-gray-700" />
            </label>

            <input
              id="profile-picture-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>
        </div>
        <h1 className="text-2xl font-semibold mt-4">
          {profileData?.first_name} {profileData?.last_name}
        </h1>
        <form onSubmit={formik.handleSubmit} className="mt-6 space-y-4">
          <label htmlFor="email" className="block text-left">
            Email
          </label>
          <div className="relative">
            <span
              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                formik.values.email ? "text-black" : "text-gray-400"
              }`}
            >
              <AtSign size={18} />
            </span>
            <input
              id="email"
              name="email"
              type="email"
              className="block w-full rounded-md bg-white px-10 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-black"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-sm text-right">
              {formik.errors.email}
            </p>
          )}
          <label htmlFor="first_name" className="block text-left">
            Nama Depan
          </label>
          <div className="relative">
            <span
              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                formik.values.first_name ? "text-black" : "text-gray-400"
              }`}
            >
              <User size={18} />
            </span>
            <input
              id="first_name"
              name="first_name"
              type="text"
              className=" mt-2 block w-full rounded-md bg-white px-10 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-black"
              value={formik.values.first_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.touched.first_name && formik.errors.first_name && (
            <p className="text-red-500 text-sm text-right">
              {formik.errors.first_name}
            </p>
          )}
          <label htmlFor="last_name" className="block text-left">
            Nama Belakang
          </label>
          <div className="relative">
            <span
              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                formik.values.first_name ? "text-black" : "text-gray-400"
              }`}
            >
              <User size={18} />
            </span>
            <input
              id="last_name"
              name="last_name"
              type="text"
              className=" mt-2 block w-full rounded-md bg-white px-10 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-black"
              value={formik.values.last_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.touched.last_name && formik.errors.last_name && (
            <p className="text-red-500 text-sm text-right">
              {formik.errors.last_name}
            </p>
          )}
          <button
            type="submit"
            className="w-full text-red-500 py-2 rounded-md outline hover:bg-red-500 hover:text-white"
          >
            Edit Profile
          </button>
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-white hover:text-red-500 hover:outline"
          >
            Logout
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileView;
