import React, { useEffect, useState } from "react";
import { AtSign, Eye, EyeOff, Lock } from "lucide-react";
import Ilustrasilogin from "../assets/Illustrasi Login.png";
import logo from "../assets/Logo.png";
import { useTokenSelector } from "../config/redux/membership/membershipSelector";
import { useFormik } from "formik";
import { login } from "../config/redux/membership/membershipThunk";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const LoginView = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const token = useTokenSelector();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("email tidak valid")
        .required("email wajib diisi"),
      password: Yup.string()
        .required("password wajib diisi")
        .min(8, "password minimal 8 karakter"),
    }),
    onSubmit: async (values) => {
      try {
        const result = await dispatch(login(values)).unwrap();

        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "success",
          title: "Login berhasil",
        });

        // console.log("Hasil:", result);
      } catch (error) {
        Swal.fire({
          title: "Registrasi Gagal",
          text: error?.message || "Terjadi kesalahan. Silakan coba lagi.",
          icon: "error",
          confirmButtonText: "OK",
        });
        // console.error("Error:", error);
        formik.resetForm();
      }
    },
  });

  useEffect(() => {
    if (token) {
      navigate("/home");
    }
  }, [token]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center">
      <div className="w-full md:w-1/2 px-6 md:px-24 py-12">
        <div className="flex gap-2 justify-center items-center mb-6">
          <img src={logo} alt="Logo" className="w-6 h-6" />
          <h1 className="font-semibold text-lg">SIMS PPOB</h1>
        </div>

        <h1 className="text-center text-xl md:text-2xl font-semibold mb-12">
          Masuk atau buat akun <br />
          untuk memulai
        </h1>

        <form className="max-w-md mx-auto" onSubmit={formik.handleSubmit}>
          <div className="relative">
            <span
              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                isEmailFocused ? "text-black" : "text-gray-400"
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
              onFocus={() => setIsEmailFocused(true)}
              // onBlur={(e) => setIsEmailFocused(e.target.value.length > 0)}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
          {formik.touched.email && formik.errors.email && (
            <div className="text-red-500 m-0 text-right">
              {formik.errors.email}
            </div>
          )}

          <div className="relative mt-6">
            <span
              className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                isPasswordFocused ? "text-black" : "text-gray-400"
              }`}
            >
              <Lock size={18} />
            </span>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="masukan password anda"
              autoComplete="password"
              className="block w-full rounded-md bg-white px-10 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-black"
              onFocus={() => setIsPasswordFocused(true)}
              // onBlur={(e) => setIsPasswordFocused(e.target.value.length > 0)}
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
            <div className="text-red-500 m-0 text-right">
              {formik.errors.password}
            </div>
          )}

          <div className="mb-6 mt-12">
            <button
              type="submit"
              className="w-full bg-red-500 text-white font-semibold py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Masuk
            </button>
          </div>

          <div className=" flex justify-center text-center text-base text-gray-600 gap-2">
            <span>belum punya akun? registrasi</span>
            <Link to={"/register"}>
              <h1 className="text-red-500 hover:text-red-600 font-semibold">
                di sini
              </h1>
            </Link>
          </div>
        </form>
      </div>

      <div className="hidden md:block md:w-1/2">
        <img
          className="h-screen w-full object-cover"
          src={Ilustrasilogin}
          alt="Ilustrasi Login"
        />
      </div>
    </div>
  );
};

export default LoginView;
