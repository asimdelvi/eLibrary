import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { createBook } from "../../redux/features/bookSlice";
import { FieldError, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { notify } from "../../toastify";
import { Input } from "../../components/Input";
import { Form } from "../../components/Form";
import { Button } from "../../components/Button";
import { NavBar } from "../../components/NavBar";
import { NavBottom } from "../../components/NavBottom";
import type { Book, BookInput } from "../../types";

export const NewBook = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitSuccessful, errors },
  } = useForm<BookInput>();

  const { createStatus } = useAppSelector((state) => state.books);
  const bookError = useAppSelector((state) => state.books.error);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();

  const [newBookId, setNewBookId] = useState<string>("");

  const onSubmit: SubmitHandler<BookInput> = async (data) => {
    let formData = new FormData();
    formData.append("title", data.title);
    if (data.description !== "")
      formData.append("description", data.description);
    formData.append("book", data.book[0]);

    notify.loading();
    if (!user) {
      notify.error("Please login or register");
      navigate("/login");
    }

    const payload = (await dispatch(createBook(formData)))?.payload as Book;
    if (payload?._id) setNewBookId(payload?._id);
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
            errors={errors.title as FieldError}
          />
          <Input
            type="textarea"
            placeholder="Description"
            formFunction={register("description")}
            errors={errors.description as FieldError}
          />
          <Input
            type="file"
            placeholder="Upload book"
            formFunction={register("book", { required: true })}
            errors={errors.book as FieldError}
          />
          <Button text="ADD" variant="primary" />
        </Form>
      </div>
      <NavBottom />
    </div>
  );
};
