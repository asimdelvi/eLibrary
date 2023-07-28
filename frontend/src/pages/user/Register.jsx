import React, { useEffect } from "react";
import { register as formRegister } from "../../redux/features/authSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { notify } from "../../toastify/index.js";
import { Input } from "../../components/Input.jsx";
import { Form } from "../../components/Form.jsx";
import { Button } from "../../components/Button.jsx";

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
    <div className="pt-[11%] flex flex-col justify-center items-center">
      <Form title="REGISTER" formSubmitFunction={handleSubmit(onSubmit)}>
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
        <Button text="REGISTER" variant="primary" />
      </Form>
    </div>
  );
};
