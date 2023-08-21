import React, { useEffect } from "react";
import { login } from "../../redux/features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { notify } from "../../toastify/index.js";
import { Input } from "../../components/Input.jsx";
import { Button } from "../../components/Button.jsx";
import { Form } from "../../components/Form.jsx";

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitSuccessful, errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { status, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  // When the user clicks the submit button, login api will be called
  // toastify loading will start
  const onSubmit = (data) => {
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
    <div className="pt-[11%] flex flex-col justify-center items-center">
      <Form title="LOGIN" formSubmitFunction={handleSubmit(onSubmit)}>
        <Input
          type="email"
          formFunction={register("email", { required: true })}
          placeholder="email"
          errors={errors.email}
        />
        <Input
          type="password"
          placeholder="password"
          formFunction={register("password", { required: true })}
          errors={errors.password}
        />
        <Button text="LOGIN" variant="primary" />
      </Form>
    </div>
  );
};

// * Can validate using existing schema like Joi Validator
