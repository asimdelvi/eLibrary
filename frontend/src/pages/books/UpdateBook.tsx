import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { updateBook } from "../../redux/features/bookSlice";
import { useParams, useNavigate } from "react-router-dom";
import { getBook } from "../../redux/features/bookSlice";
import { SubmitHandler, useForm } from "react-hook-form";
import { notify } from "../../toastify/index";
import { Input } from "../../components/Input";
import { Form } from "../../components/Form";
import { Button } from "../../components/Button";
import { NavBar } from "../../components/NavBar";
import { NavBottom } from "../../components/NavBottom";
import type { BookInput } from "../../types";

export const UpdateBook = () => {
  const { id = "" } = useParams<string>();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { selectedBook, updateStatus, error } = useAppSelector(
    (state) => state.books
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (id) dispatch(getBook(id));
  }, [dispatch, id]);

  const {
    register,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = useForm<BookInput>({
    defaultValues: {
      title: selectedBook.title,
      description: selectedBook.description || "",
    },
  });

  const onSubmit: SubmitHandler<BookInput> = (data) => {
    let formData = new FormData();
    if (data.title) formData.append("title", data.title);
    if (data.book) formData.append("book", data.book[0]);
    if (data.description) formData.append("description", data.description);
    else if (data.description === "") formData.delete("description");

    notify.loading();
    if (!user) {
      notify.error("Please login");
      navigate("/login");
    }
    if (user?.id !== selectedBook.createdBy._id) {
      notify.error("You cannot update, you haven't created this book");
      navigate(-1);
    }
    dispatch(updateBook({ id, formData }));
  };

  useEffect(() => {
    if (isSubmitSuccessful && updateStatus === "fulfilled") {
      notify.success("Successfully updated");
      navigate(`/books/${id}`);
    }
    if (updateStatus === "rejected") {
      notify.error(`Failed to upload, ${error}`);
    }
  }, [updateStatus, navigate, isSubmitSuccessful, id, error]);

  return (
    <div className="h-screen flex flex-col">
      <NavBar />
      <div className="flex flex-col items-center m-auto">
        {" "}
        <Form title="Update Book" formSubmitFunction={handleSubmit(onSubmit)}>
          <Input
            type="text"
            placeholder="Title"
            formFunction={register("title")}
          />
          <Input
            type="textarea"
            placeholder="Description"
            formFunction={register("description")}
          />
          <Input
            type="file"
            placeholder="Upload book"
            formFunction={register("book")}
          />
          <Button text="Update" variant="primary" />
        </Form>
      </div>
      <NavBottom />
    </div>
  );
};
