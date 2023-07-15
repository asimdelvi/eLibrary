import React, { useEffect } from "react";
import { login } from "../../redux/features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { notify } from "../../toastify/index.js";

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { status, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    dispatch(login(data));
    notify.loading();
  };

  useEffect(() => {
    if (isSubmitSuccessful && status === "fulfilled") {
      notify.success("Login Successful");
      navigate(-1);
    }
    if (status === "rejected") {
      notify.error(`Login Failed, ${error}`);
    }
  }, [status, navigate, isSubmitSuccessful, error]);

  return (
    <div className="flex justify-center items-center h-[calc(100vh-65px)]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex p-2 h-[50%] flex-col max-width-[10rem] justify-around items-center border-[1px] border-gray-700 shadow-lg bg-[#dad9d9] rounded-xl"
      >
        <h2 className="text-lg font-bold">Login</h2>
        <input
          className="w-full p-1  rounded-lg focus:outline-none focus:border-[1px] focus:border-black"
          type="email"
          placeholder="email"
          {...register("email", { required: true })}
        />
        <input
          className="w-full p-1  rounded-lg focus:outline-none focus:border-[1px] focus:border-black"
          type="password"
          placeholder="password"
          {...register("password", { required: true })}
        />
        <button
          className="m-2 rounded-lg bg-[#B59D9A] border-[#B59D9A] border-2  px-3 py-[6px] text-sm hover:shadow-md"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

// * Can validate using existing schema like Joi Validator
