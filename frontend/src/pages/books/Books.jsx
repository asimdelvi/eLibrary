import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "../../redux/features/bookSlice";
import { Link } from "react-router-dom";

export const Books = () => {
  const dispatch = useDispatch();
  const { books } = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  return (
    <>
      {books.map((book, index) => (
        <div key={index}>
          <h1> {book.title} </h1>
          <Link to={`/books/${book._id}`}>View</Link>
        </div>
      ))}
    </>
  );
};
