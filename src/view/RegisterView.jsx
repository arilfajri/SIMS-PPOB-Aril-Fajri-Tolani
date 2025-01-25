import React, { useState } from "react";
import { AtSign, User, Lock, Eye, EyeOff } from "lucide-react";
import login from "../assets/Illustrasi Login.png";
import logo from "../assets/Logo.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { register } from "../config/redux/membership/membershipThunk";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const RegisterView = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      first_name: "",
      last_name: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("email tidak valid")
        .required("email wajib diisi"),
      first_name: Yup.string().required("nama depan wajib diisi"),
      last_name: Yup.string().required("nama belakang wajib diisi"),
      password: Yup.string()
        .min(8, "password minimal 8 karakter")
        .required("password wajib diisi"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "password tidak sama")
        .required("konfirmasi password wajib diisi"),
    }),
    onSubmit: async (values) => {
      try {
        const result = await dispatch(register(values)).unwrap();

        Swal.fire({
          title: "Registrasi Berhasil!",
          text: "Akun Anda berhasil dibuat. Silahkan Login!",
          icon: "success",
          confirmButtonText: "OK",
        });

        console.log("Hasil:", result);
      } catch (error) {
        Swal.fire({
          title: "Registrasi Gagal",
          text: error?.message || "Terjadi kesalahan. Silakan coba lagi.",
          icon: "error",
          confirmButtonText: "OK",
        });
        console.error("Error:", error);
      }
    },
  });

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center">
      <div className="w-full md:w-1/2 px-6 md:px-24 py-12">
        <div className="flex gap-2 justify-center items-center mb-6">
          <img src={logo} alt="Logo" className="w-6 h-6" />
          <h1 className="font-semibold text-lg">SIMS PPOB</h1>
        </div>

        <h1 className="text-center text-xl md:text-2xl font-semibold mb-12">
          Lengkapi data untuk
          <br />
          membuat akun
        </h1>

        <form className="max-w-md mx-auto" onSubmit={formik.handleSubmit}>
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
              placeholder="masukan email anda"
              autoComplete="email"
              className="block w-full rounded-md bg-white px-10 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-black"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-sm mt-1 text-right">
              {formik.errors.email}
            </p>
          )}

          <div className="relative mt-6">
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
              placeholder="nama depan"
              autoComplete="given-name"
              className="block w-full rounded-md bg-white px-10 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-black"
              value={formik.values.first_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.touched.first_name && formik.errors.first_name && (
            <p className="text-red-500 text-sm mt-1 text-right">
              {formik.errors.first_name}
            </p>
          )}

          <div className="relative mt-6">
            <span
              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                formik.values.last_name ? "text-black" : "text-gray-400"
              }`}
            >
              <User size={18} />
            </span>
            <input
              id="last_name"
              name="last_name"
              type="text"
              placeholder="nama belakang"
              autoComplete="family-name"
              className="block w-full rounded-md bg-white px-10 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-black"
              value={formik.values.last_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.touched.last_name && formik.errors.last_name && (
            <p className="text-red-500 text-sm mt-1 text-right">
              {formik.errors.last_name}
            </p>
          )}

          <div className="relative mt-6">
            <span
              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                formik.values.password ? "text-black" : "text-gray-400"
              }`}
            >
              <Lock size={18} />
            </span>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="buat password"
              autoComplete="new-password"
              className="block w-full rounded-md bg-white px-10 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-black"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-sm mt-1 text-right">
              {formik.errors.password}
            </p>
          )}

          <div className="relative  mt-6">
            <span
              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                formik.values.confirmPassword ? "text-black" : "text-gray-400"
              }`}
            >
              <Lock size={18} />
            </span>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="konfirmasi password"
              autoComplete="new-password"
              className={`block w-full rounded-md px-10 py-2 text-base outline-1 ${
                formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? "outline-red-500"
                  : "outline-gray-300 focus:outline-black"
              }`}
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <div className="  mb-12">
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1 text-right">
                  {formik.errors.confirmPassword}
                </p>
              )}
          </div>

          <div className="mb-6">
            <button
              type="submit"
              className="w-full bg-red-500 text-white font-semibold py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Registrasi
            </button>
          </div>

          <div className=" flex justify-center text-center text-base text-gray-600 gap-2">
            <span>sudah punya akun? login</span>
            <Link to={"/"}>
              <h1 className="text-red-500 hover:text-red-600 font-semibold">
                di sini
              </h1>
            </Link>
          </div>
        </form>
      </div>

      <div className="hidden md:block md:w-1/2">
        <img
          className="h-full w-full object-cover"
          src={login}
          alt="Ilustrasi Register"
        />
      </div>
    </div>
  );
};

export default RegisterView;
