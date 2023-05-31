import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { createBook } from "../../redux/features/bookSlice";
import { useForm } from "react-hook-form";

export const NewBook = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm();

  const dispatch = useDispatch();

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit = (data) => {
    let formData = new FormData();
    formData.append("title", data.title);
    formData.append("book", data.book[0]);
    dispatch(createBook(formData));
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Title"
          {...register("title", { required: true })}
        />
        <input
          type="file"
          placeholder="Upload book"
          accept="pdf"
          {...register("book", { required: true })}
        />
        <button>Upload</button>
      </form>
    </>
  );
};
