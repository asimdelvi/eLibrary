import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "../../redux/features/bookSlice";
import { Link } from "react-router-dom";
import { Button } from "../../components/Button.jsx";

export const Books = () => {
  const baseClasses =
    "flex flex-col items-start justify-start min-h-[10rem]  border-black  border-[2px] rounded-xl card";
  const standardCard = "cursor-pointer";
  const expandCard = "col-span-2";

  const dispatch = useDispatch();
  const { books } = useSelector((state) => state.books);
  const [clickedIndex, setClickedIndex] = useState();

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  const handleClick = (index) => {
    setClickedIndex(index);
  };

  return (
    <>
      <div className="pt-[8%] px-24 bg-[#F1F1F1] grid grid-cols-3 grid-flow-dense gap-12 my-10">
        {books.map((book, index) => (
          <div
            key={index}
            className={
              clickedIndex === index
                ? `${baseClasses} ${expandCard}`
                : `${baseClasses} ${standardCard}`
            }
            onClick={() => handleClick(index)}
          >
            <h2 className="text-2xl font-bold px-7 py-2 text-clip">
              {book.title}
            </h2>

            <p className="text-xl px-7 pb-1 card-text">
              {book.description || ""}
            </p>
            <div>
              <Link to={`/books/${book._id}`}>
                <span className="transition ease-in-out duration-1000 delay-300 rounded-full border-2 font-semibold border-black text-base px-4 py-2 bg-black text-white anim_button mr-2">
                  VIEW
                </span>
              </Link>
              <Link to={book.pdfURL} target="_blank">
                <span className="rounded-full border-2 font-semibold border-black border-dashed text-base px-4 py-2 anim_button">
                  DOWNLOAD
                </span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
