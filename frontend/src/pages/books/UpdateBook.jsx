import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBook } from "../../redux/features/bookSlice";
import { useParams } from "react-router-dom";
import { getBook } from "../../redux/features/bookSlice";
import { useForm } from "react-hook-form";

export const UpdateBook = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { selectedBook } = useSelector((state) => state.books);

  useEffect(() => {
    if (id) dispatch(getBook(id));
  }, [dispatch, id]);
  const { register, handleSubmit } = useForm({
    defaultValues: { title: selectedBook.title, book: null },
  });

  const onSubmit = (data) => {
    console.log(data);
    let formData = new FormData();
    if (data.title) formData.append("title", data.title);
    if (data.book) formData.append("book", data.book[0]);
    dispatch(updateBook({ id, formData }));
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Title" {...register("title")} />
        <input type="file" placeholder="Upload book" {...register("book")} />

        {user.id === selectedBook.createdBy._id ? (
          <button type="submit">Update</button>
        ) : (
          ""
        )}
      </form>
    </>
  );
};
