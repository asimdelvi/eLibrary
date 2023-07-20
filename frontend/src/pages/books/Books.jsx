import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "../../redux/features/bookSlice";
import { Link } from "react-router-dom";

export const Books = () => {
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
      <div className="px-24 grid grid-cols-3 grid-flow-dense gap-12 my-10">
        {books.map((book, index) => (
          <div
            key={index}
            className={
              clickedIndex === index
                ? "transition ease-linear duration-700 flex flex-col items-center justify-center min-h-[10rem]  border-gray-700 border-[1px] shadow-xl rounded-xl col-span-2 bg-[#dad9d9]"
                : "cursor-pointer transition ease-linear duration-700 flex flex-col items-center justify-center min-h-[10rem]  border-gray-700 border-[1px] shadow-xl rounded-xl bg-[#dad9d9]"
            }
            onClick={() => handleClick(index)}
          >
            <h2 className="text-lg px-7 py-2 text-clip"> {book.title} </h2>

            {clickedIndex === index ? (
              <div>
                <Link to={`/books/${book._id}`}>
                  <span className="mr-1 rounded-lg bg-[#B59D9A] border-[#B59D9A] border-2  px-3 py-[6px] text-sm hover:shadow-md">
                    View
                  </span>
                </Link>
                <Link to={book.pdfURL} target="_blank">
                  <span className="rounded-lg bg-black border-black border-2 text-white px-3 py-[6px] text-sm hover:shadow-md">
                    Download
                  </span>
                </Link>
              </div>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
    </>
  );
};
