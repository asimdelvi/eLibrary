import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "../../redux/features/bookSlice";
import { Link } from "react-router-dom";
import { NavBar } from "../../components/NavBar";
import { NavBottom } from "../../components/NavBottom";

export const Books = () => {
  const baseClasses =
    " flex s:flex-row xs:flex-col s:h-[10rem] xs:min-h-[10rem] border-black  border-[2px] rounded-xl card";
  const standardCard = "justify-center items-center cursor-pointer";
  const expandCard =
    "items-center justify-between s:col-span-2 xs:col-auto xs:row-span-4 s:row-auto";
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
      <NavBar position="fixed top-0" />
      <div className="pt-[8%] xl:px-80 xs:px-10 s:px-24 grid xs:grid-cols-1 l:grid-cols-4 m:grid-cols-3 s:grid-cols-2  grid-flow-dense gap-12 my-10">
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
            <div className="flex flex-col justify-center items-center my-5">
              <h2 className="text-2xl font-bold px-7 py-2 ">{book.title}</h2>
              {clickedIndex === index ? (
                <p className="text-xl px-7 pb-4  card-text">
                  {book.description || ""}
                </p>
              ) : (
                ""
              )}
            </div>
            {clickedIndex === index ? (
              <div className="px-7 flex flex-col s:flex-col xs:flex-row justify-center h-[100%] xs:border-0 s:border-l-2 border-dashed border-black">
                <Link to={`/books/${book._id}`}>
                  <div className="mb-2 rounded-full text-center border-2 font-semibold border-black text-base px-4 py-2 bg-black text-white anim_button mr-2">
                    VIEW
                  </div>
                </Link>
                <Link to={book.pdfURL} target="_blank">
                  <div className="rounded-full border-2 font-semibold border-black border-dashed text-base px-4 py-2 anim_button">
                    DOWNLOAD
                  </div>
                </Link>
              </div>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
      <NavBottom />
    </>
  );
};
