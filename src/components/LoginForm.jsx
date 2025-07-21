import React, { useEffect } from "react";
import InputWithLabel from "./InputWithLabel";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "@/redux/actions/auth";
import { Link } from "react-router-dom";
import { clearError } from "@/redux/slice/auth";

export default function LoginForm() {
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.auth);
  
  const inputLogin = Yup.object().shape({
    email: Yup.string()
      .email("Email tidak valid")
      .required("Email wajib diisi"),
    password: Yup.string().required("Password wajib diisi"),
  });

  const {
    register,
    formState: { errors },
    setError,
    handleSubmit,
  } = useForm({
    resolver: yupResolver(inputLogin),
  });


  const onSubmit = (data) => {
    dispatch(clearError());
    dispatch(loginAction(data));
  };

  const handleInputChange = () => {
    if (error) {
      dispatch(clearError());
    }
  };
  

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 p-8 w-10/12 max-w-sm rounded-lg"
    >
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-2">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <h1 className="text-3xl mb-3 text-center font-bold text-white">
        Login
      </h1>

      <InputWithLabel
        name="email"
        label="Email"
        placeholder="Email"
        errors={errors.email?.message}
        register={(name) => {
          const registration = register(name);
          return {
            ...registration,
            onChange: (e) => {
              registration.onChange(e);
              handleInputChange();
            }
          };
        }}
      />
      <InputWithLabel
        name="password"
        label="Password"
        placeholder="Password"
        errors={errors.password?.message}
        type="password"
        register={(name) => {
          const registration = register(name);
          return {
            ...registration,
            onChange: (e) => {
              registration.onChange(e);
              handleInputChange();
            }
          };
        }}
      />
      <Button type="submit" className="mt-4" disabled={loading}>
        {loading ? "Loading..." : "Login"}
      </Button>
      <p className="text-white">
        Don&lsquo;t have an account?
        <Link to="/auth/register" className="font-semibold cursor-pointer">
          {" "}
          Register
        </Link>
      </p>
    </form>
  );
}
