import React, { useEffect } from "react";
import { login } from "../../redux/features/authSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { notify } from "../../toastify/index";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Form } from "../../components/Form";
import { NavBar } from "../../components/NavBar";
import { NavBottom } from "../../components/NavBottom";
import type { LoginInput } from "../../types";

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitSuccessful, errors },
  } = useForm<LoginInput>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { status, error } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  // When the user clicks the submit button, login api will be called
  // toastify loading will start
  const onSubmit: SubmitHandler<LoginInput> = (data) => {
    dispatch(login(data));
    notify.loading();
  };

  // When the status changes, toastify will updates to success or rejected.
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
    <div className="h-screen flex flex-col">
      <NavBar />
      <div className=" flex flex-col items-center m-auto">
        <Form title="LOGIN" formSubmitFunction={handleSubmit(onSubmit)}>
          <Input
            type="email"
            formFunction={register("email", { required: true })}
            placeholder="email"
            errors={errors?.email}
          />
          <Input
            type="password"
            placeholder="password"
            formFunction={register("password", { required: true })}
            errors={errors?.password}
          />
          <Button text="LOGIN" variant="primary" />
        </Form>
      </div>
      <NavBottom />
    </div>
  );
};

// * Can validate using existing schema like Joi Validator
