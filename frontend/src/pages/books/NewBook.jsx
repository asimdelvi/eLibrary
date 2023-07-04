import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBook } from "../../redux/features/bookSlice";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const NewBook = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = useForm();

  const { status } = useSelector((state) => state.books);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [newBookId, setNewBookId] = useState();

  const onSubmit = async (data) => {
    let formData = new FormData();
    formData.append("title", data.title);
    formData.append("book", data.book[0]);
    const response = dispatch(createBook(formData));
    if (response && response.payload && response.payload._id)
      setNewBookId(response.payload._id);
  };

  useEffect(() => {
    if (isSubmitSuccessful && status === "fulfilled")
      navigate(`/books/${newBookId}`);
  }, [status, navigate, isSubmitSuccessful, newBookId]);

  return (
    <div className="flex justify-center items-center h-[calc(100vh-65px)]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex p-2 h-[50%] flex-col max-width-[10rem] justify-around items-center border-[1px] border-gray-700 shadow-lg bg-[#dad9d9] rounded-xl"
      >
        <h2 className="text-lg font-bold">Add Book</h2>
        <input
          className="w-full p-1  rounded-lg focus:outline-none focus:border-[1px] focus:border-black"
          type="text"
          placeholder="Title"
          {...register("title", { required: true })}
        />
        <input
          className="file:cursor-pointer cursor-pointer w-full file:bg-[#b59d9aa8] file:text-sm file:p-2 file:border-0 file:rounded-lg rounded-lg bg-white"
          type="file"
          placeholder="Upload book"
          accept="pdf"
          {...register("book", { required: true })}
        />
        <button className="m-2 rounded-lg bg-[#B59D9A] border-[#B59D9A] border-2  px-3 py-[6px] text-sm hover:shadow-md">
          Add
        </button>
      </form>
    </div>
  );
};
