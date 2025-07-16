import React from "react";
import InputWithLabel from "./InputWithLabel";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { registerAction } from "@/redux/actions/auth";
import { Link } from "react-router-dom";

export default function RegisterForm() {
  const dispatch = useDispatch();

  const inputLogin = Yup.object().shape({
    name: Yup.string().required("Nama wajib diisi"),
    email: Yup.string()
      .email("Email tidak valid")
      .required("Email wajib diisi"),
    password: Yup.string().required("Password wajib diisi"),
  });

  const {
    register,
    formState: { errors, isLoading },

    handleSubmit,
  } = useForm({
    resolver: yupResolver(inputLogin),
  });

  const onSubmit = (data) => {
    dispatch(registerAction(data));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 p-8 w-10/12 max-w-sm rounded-lg"
    >
      <h1 className="text-3xl mb-3 text-center font-bold text-white">
        Register
      </h1>

      <InputWithLabel
        name="name"
        label="Name"
        placeholder="Name"
        errors={errors.name?.message}
        register={register}
      />
      <InputWithLabel
        name="email"
        label="Email"
        placeholder="Email"
        errors={errors.email?.message}
        register={register}
      />
      <InputWithLabel
        name="password"
        label="Password"
        placeholder="Password"
        errors={errors.password?.message}
        type="password"
        register={register}
      />
      <Button type="submit" className="mt-4" disabled={isLoading}>
        {isLoading ? "Loading..." : "Register"}
      </Button>
      <p className="text-white">
        Don&lsquo;t have an account?
        <Link to="/auth/login" className="font-semibold cursor-pointer">
          {" "}
          Login
        </Link>
      </p>
    </form>
  );
}
