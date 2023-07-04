import React, { useEffect } from "react";
import { register as formRegister } from "../../redux/features/authSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const {
    register,
    handleSubmit,
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

  const navigate = useNavigate();

  const onSubmit = (data) => {
    dispatch(formRegister(data));
  };

  // TODO: Add pending, fulfilled, rejected condition
  useEffect(() => {
    if (isSubmitSuccessful && status === "fulfilled") navigate(-1);
  }, [status, isSubmitSuccessful, navigate]);

  return (
    <div className="flex justify-center items-center h-[calc(100vh-65px)]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex p-2 h-[50%] flex-col max-width-[10rem] justify-around items-center border-[1px] border-gray-700 shadow-lg bg-[#dad9d9] rounded-xl"
      >
        <h2 className="text-lg font-bold">Register</h2>
        <input
          className="w-full p-1  rounded-lg focus:outline-none focus:border-[1px] focus:border-black "
          type="text"
          placeholder="username"
          {...register("username", { required: true })}
        />
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
          Register
        </button>
      </form>
    </div>
  );
};
