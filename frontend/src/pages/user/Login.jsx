import React, { useEffect } from "react";
import { login } from "../../redux/features/authSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";

// TODO: do not clear the form if error ocurred
export const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm({
    defaultValues: {
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
  }, [isSubmitSuccessful]);

  const onSubmit = (data) => {
    dispatch(login(data));
  };

  // TODO: Add pending, fulfilled, rejected condition
  useEffect(() => {
    console.log(status);
  }, [status]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <button type="submit">Login</button>
      </form>
    </>
  );
};

// * Can validate using existing schema like Joi Validator
