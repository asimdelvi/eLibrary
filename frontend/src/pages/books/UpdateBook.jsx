import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBook } from "../../redux/features/bookSlice";
import { useParams, useNavigate } from "react-router-dom";
import { getBook } from "../../redux/features/bookSlice";
import { useForm } from "react-hook-form";
import { notify } from "../../toastify/index.js";

export const UpdateBook = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { selectedBook, status, error } = useSelector((state) => state.books);

  const navigate = useNavigate();

  useEffect(() => {
    if (id) dispatch(getBook(id));
  }, [dispatch, id]);

  const {
    register,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = useForm({
    defaultValues: { title: selectedBook.title, book: null },
  });

  const onSubmit = (data) => {
    console.log(data);
    let formData = new FormData();
    if (data.title) formData.append("title", data.title);
    if (data.book) formData.append("book", data.book[0]);
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
    if (isSubmitSuccessful && status === "fulfilled") {
      notify.success("Successfully updated");
      navigate(`/books/${id}`);
    }
    if (status === "rejected") {
      notify.error(`Failed to upload, ${error}`);
    }
  }, [status, navigate, isSubmitSuccessful, id, error]);

  return (
    <div className="flex justify-center items-center h-[calc(100vh-65px)]">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex p-2 h-[50%] flex-col max-width-[10rem] justify-around items-center border-[1px] border-gray-700 shadow-lg bg-[#dad9d9] rounded-xl"
      >
        <h2 className="text-lg font-bold">Update Book</h2>
        <input
          type="text"
          placeholder="Title"
          {...register("title")}
          className="w-full p-1  rounded-lg focus:outline-none focus:border-[1px] focus:border-black"
        />
        <input
          type="file"
          placeholder="Upload book"
          {...register("book")}
          className="file:cursor-pointer cursor-pointer w-full file:bg-[#b59d9aa8] file:text-sm file:p-2 file:border-0 file:rounded-lg rounded-lg bg-white"
        />

        <button className="m-2 rounded-lg bg-[#B59D9A] border-[#B59D9A] border-2  px-3 py-[6px] text-sm hover:shadow-md">
          Update
        </button>
      </form>
    </div>
  );
};
