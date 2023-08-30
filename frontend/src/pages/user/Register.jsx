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
import { NavBar } from "../../components/NavBar";
import { NavBottom } from "../../components/NavBottom";

export const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitSuccessful, errors },
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
    <div className="h-screen flex flex-col">
      <NavBar />
      <div className="flex flex-col items-center m-auto">
        <Form title="REGISTER" formSubmitFunction={handleSubmit(onSubmit)}>
          <Input
            type="text"
            placeholder="username"
            formFunction={register("username", { required: true })}
            errors={errors.username}
          />
          <Input
            type="email"
            placeholder="email"
            formFunction={register("email", { required: true })}
            errors={errors.email}
          />
          <Input
            type="password"
            placeholder="password"
            formFunction={register("password", { required: true })}
            errors={errors.password}
          />
          <Button text="REGISTER" variant="primary" />
        </Form>
      </div>
      <NavBottom />
    </div>
  );
};
