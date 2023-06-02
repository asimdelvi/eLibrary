import React, { useEffect } from "react";
import { register as formRegister } from "../../redux/features/authSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";

export const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const { status } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit = (data) => {
    dispatch(formRegister(data));
  };

  // TODO: Add pending, fulfilled, rejected condition
  useEffect(() => {
    console.log(status);
  }, [status]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="username"
          {...register("username", { required: true })}
        />
        <input
          type="email"
          placeholder="email"
          {...register("email", { required: true })}
        />
        <input
          type="password"
          placeholder="password"
          {...register("password", { required: true })}
        />
        <button type="submit">Register</button>
      </form>
    </>
  );
};
