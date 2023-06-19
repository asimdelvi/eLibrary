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
    <div className="flex justify-center items-center h-[calc(100vh-65px)]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex h-[50%] flex-col max-width-[10rem] justify-around items-center border-2 border-gray-700 shadow-lg bg-[#dfd2b9] rounded-3xl"
      >
        <input
          className="m-2"
          type="text"
          placeholder="Title"
          {...register("title", { required: true })}
        />
        <input
          className="m-2"
          type="file"
          placeholder="Upload book"
          accept="pdf"
          {...register("book", { required: true })}
        />
        <button className="m-2">Upload</button>
      </form>
    </div>
  );
};
