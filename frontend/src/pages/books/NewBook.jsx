import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBook } from "../../redux/features/bookSlice";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { notify } from "../../toastify/index.js";
import { Input } from "../../components/Input.jsx";

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
    if (data?.description) formData.append("description", data.title);
    formData.append("book", data.book[0]);
    notify.loading();
    if (!user) {
      notify.error("Please login or register");
      navigate("/login");
    }
    const response = await dispatch(createBook(formData));
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex p-2 min-h-[50%] flex-col max-width-[10rem] justify-around items-center border-[1px] border-gray-700 shadow-lg bg-[#dad9d9] rounded-xl"
      >
        <h2 className="text-lg font-bold">Add Book</h2>
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
        <button className="m-2 rounded-lg bg-[#B59D9A] border-[#B59D9A] border-2  px-3 py-[6px] text-sm hover:shadow-md">
          Add
        </button>
      </form>
    </div>
  );
};
