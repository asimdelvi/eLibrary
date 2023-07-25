import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBook } from "../../redux/features/bookSlice";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { notify } from "../../toastify/index.js";
import { Input } from "../../components/Input.jsx";
import { Form } from "../../components/Form.jsx";
import { Button } from "../../components/Button.jsx";

export const NewBook = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = useForm();

  const { status, error } = useSelector((state) => state.books);
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
    if (isSubmitSuccessful && status === "fulfilled") {
      notify.success("Successfully Uploaded");
      navigate(`/books/${newBookId}`);
    }
    if (status === "rejected") {
      notify.error(`Failed to upload, ${error}`);
    }
  }, [status, error, navigate, isSubmitSuccessful, newBookId, user]);

  return (
    <div className="flex justify-center items-center h-[calc(100vh-65px)]">
      <Form title="Add Book" formSubmitFunction={handleSubmit(onSubmit)}>
        <Input
          type="text"
          placeholder="Title"
          formFunction={register("title", { required: true })}
        />
        <Input
          type="textarea"
          placeholder="Description"
          formFunction={register("description")}
        />
        <Input
          type="file"
          placeholder="Upload book"
          formFunction={register("book", { required: true })}
        />
        <Button text="Add" variant="primary" />
      </Form>
    </div>
  );
};
