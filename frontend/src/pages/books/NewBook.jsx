import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBook } from "../../redux/features/bookSlice";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { notify } from "../../toastify/index.js";
import { Input } from "../../components/Input.jsx";
import { Form } from "../../components/Form.jsx";
import { Button } from "../../components/Button.jsx";
import { NavBar } from "../../components/NavBar";
import { NavBottom } from "../../components/NavBottom";

export const NewBook = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitSuccessful, errors },
  } = useForm();

  const { createStatus } = useSelector((state) => state.books);
  const bookError = useSelector((state) => state.books.error);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const [newBookId, setNewBookId] = useState();

  const onSubmit = async (data) => {
    let formData = new FormData();
    formData.append("title", data.title);
    if (data.description !== "")
      formData.append("description", data.description);
    formData.append("book", data.book[0]);
    console.log(data);
    console.log(formData);
    notify.loading();
    if (!user) {
      notify.error("Please login or register");
      navigate("/login");
    }
    const response = await dispatch(createBook(formData));
    console.log(response);
    if (response && response.payload && response.payload._id)
      setNewBookId(response.payload._id);
  };

  useEffect(() => {
    if (isSubmitSuccessful && createStatus === "fulfilled") {
      notify.success("Successfully Uploaded");
      navigate(`/books/${newBookId}`);
    }
    if (createStatus === "rejected") {
      notify.error(`Failed to upload, ${bookError}`);
    }
  }, [createStatus, bookError, navigate, isSubmitSuccessful, newBookId, user]);

  return (
    <div className="h-screen flex flex-col">
      <NavBar />
      <div className="flex flex-col items-center m-auto">
        <Form title="ADD BOOK" formSubmitFunction={handleSubmit(onSubmit)}>
          <Input
            type="text"
            placeholder="Title"
            formFunction={register("title", { required: true })}
            errors={errors.title}
          />
          <Input
            type="textarea"
            placeholder="Description"
            formFunction={register("description")}
            errors={errors.description}
          />
          <Input
            type="file"
            placeholder="Upload book"
            formFunction={register("book", { required: true })}
            errors={errors.book}
          />
          <Button text="ADD" variant="primary" />
        </Form>
      </div>
      <NavBottom />
    </div>
  );
};
