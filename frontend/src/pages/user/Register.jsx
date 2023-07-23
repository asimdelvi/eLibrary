import React, { useEffect } from "react";
import { register as formRegister } from "../../redux/features/authSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { notify } from "../../toastify/index.js";
import { Input } from "../../components/Input.jsx";

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

  const { status, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    dispatch(formRegister(data));
    notify.loading();
  };

  // TODO: Add pending, fulfilled, rejected condition
  useEffect(() => {
    if (isSubmitSuccessful && status === "fulfilled") {
      notify.success("Register Successful");
      navigate(-1);
    }
    if (status === "rejected") {
      notify.error(`Register Failed, ${error}`);
    }
  }, [status, isSubmitSuccessful, navigate, error]);

  return (
    <div className="flex justify-center items-center h-[calc(100vh-65px)]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex p-2 h-[50%] flex-col max-width-[10rem] justify-around items-center border-[1px] border-gray-700 shadow-lg bg-[#dad9d9] rounded-xl"
      >
        <h2 className="text-lg font-bold">Register</h2>
        <Input
          type="text"
          placeholder="username"
          formFunction={register("username", { required: true })}
        />
        <Input
          type="email"
          placeholder="email"
          formFunction={register("email", { required: true })}
        />
        <Input
          type="password"
          placeholder="password"
          formFunction={register("password", { required: true })}
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
