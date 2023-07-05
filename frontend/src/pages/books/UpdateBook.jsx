import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBook } from "../../redux/features/bookSlice";
import { useParams, useNavigate } from "react-router-dom";
import { getBook } from "../../redux/features/bookSlice";
import { useForm } from "react-hook-form";

export const UpdateBook = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { selectedBook, status } = useSelector((state) => state.books);

  const navigate = useNavigate();
  // last check
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
    dispatch(updateBook({ id, formData }));
  };

  useEffect(() => {
    if (!user) navigate("/Login");
    if (user && user.id !== selectedBook.createdBy._id) navigate(-1);
    if (isSubmitSuccessful && status === "fulfilled") navigate(`/books/${id}`);
  }, [status, navigate, isSubmitSuccessful, id, user, selectedBook]);

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

        {user && user.id === selectedBook.createdBy._id ? (
          <button className="m-2 rounded-lg bg-[#B59D9A] border-[#B59D9A] border-2  px-3 py-[6px] text-sm hover:shadow-md">
            Update
          </button>
        ) : (
          ""
        )}
      </form>
    </div>
  );
};
