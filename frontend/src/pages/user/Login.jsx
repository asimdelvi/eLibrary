import React, { useEffect } from "react";
import { login } from "../../redux/features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export const Login = () => {
  const notify = () => toast("Wow so easy !");

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

  const { status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    dispatch(login(data));
  };

  // TODO: Add pending, fulfilled, rejected condition
  useEffect(() => {
    console.log(status);
    if (isSubmitSuccessful && status === "fulfilled") {
      // console.log(navigate(-1));
      toast("Login successful");
      navigate(-1);
    }
  }, [status, navigate, isSubmitSuccessful]);

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
      <div>
        <button onClick={notify}>Notify !</button>
      </div>
    </div>
  );
};

// * Can validate using existing schema like Joi Validator
