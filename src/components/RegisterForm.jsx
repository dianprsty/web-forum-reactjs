import React, { useEffect } from "react";
import { clearError } from "@/redux/slice/auth";
import InputWithLabel from "./InputWithLabel";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "./Button";
import { useDispatch, useSelector } from "react-redux";
import { registerAction } from "@/redux/actions/auth";
import { Link } from "react-router-dom";

export default function RegisterForm() {
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.auth);

  const inputLogin = Yup.object().shape({
    name: Yup.string().required("Nama wajib diisi"),
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

  useEffect(() => {
    if (error) {
      setError('apiError', { message: error });
    }
  }, [error, setError]);

  const handleInputChange = () => {
    if (error) {
      dispatch(clearError());
    }
  };

  const onSubmit = (data) => {
    dispatch(registerAction(data));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 p-8 w-10/12 max-w-sm rounded-lg"
    >
      {errors.apiError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-2">
          <span className="block sm:inline">{errors.apiError.message}</span>
        </div>
      )}

      <h1 className="text-3xl mb-3 text-center font-bold text-white">
        Register
      </h1>

      <InputWithLabel
        name="name"
        label="Name"
        placeholder="Name"
        errors={errors.name?.message}
        register={register}
        onChange={handleInputChange}
      />
      <InputWithLabel
        name="email"
        label="Email"
        placeholder="Email"
        errors={errors.email?.message}
        register={register}
        onChange={handleInputChange}
      />
      <InputWithLabel
        name="password"
        label="Password"
        placeholder="Password"
        errors={errors.password?.message}
        type="password"
        register={register}
        onChange={handleInputChange}
      />
      <Button type="submit" className="mt-4" disabled={loading}>
        {loading ? "Loading..." : "Register"}
      </Button>
      <p className="text-white">
        Already have an account?
        <Link to="/auth/login" className="font-semibold cursor-pointer">
          {" "}
          Login
        </Link>
      </p>
    </form>
  );
}
