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
      <div className="px-24 grid grid-cols-3 gap-12 my-10">
        {books.map((book, index) => (
          <div
            key={index}
            className="flex items-center justify-center min-h-[10rem] border-2 border-gray-700 shadow-lg bg-[#dfd2b9] rounded-3xl"
          >
            <h1 className="text-lg"> {book.title} </h1>
            {/* <Link to={`/books/${book._id}`}>View</Link> */}
          </div>
        ))}
      </div>
    </>
  );
};
