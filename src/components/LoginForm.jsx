import React from "react";
import InputWithLabel from "./InputWithLabel";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { loginAction } from "@/redux/actions/auth";
import { Link } from "react-router";

export default function LoginForm() {
  const dispatch = useDispatch();
  const inputLogin = Yup.object().shape({
    email: Yup.string().required("Email wajib diisi"),
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
    dispatch(loginAction(data));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 p-8 w-10/12 max-w-sm rounded-lg"
    >
      <h1 className="text-3xl mb-3 text-center font-bold text-white">Login</h1>

      <InputWithLabel
        name="email"
        label="Email"
        placeholder="Email"
        errors={errors.email?.message}
        type="email"
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
        {isLoading ? "Loading..." : "Login"}
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
