import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "../../redux/features/bookSlice";
import { Link } from "react-router-dom";
import { Button } from "../../components/Button.jsx";

export const Books = () => {
  const baseClasses =
    "transition ease-linear duration-700 flex flex-col items-center justify-center min-h-[10rem]  border-gray-700 border-[1px] shadow-xl rounded-xl bg-[#dad9d9]";
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
      <div className="px-24 grid grid-cols-3 grid-flow-dense gap-12 my-10">
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
            <h2 className="text-lg font-bold px-7 py-2 text-clip">
              {book.title}
            </h2>

            {clickedIndex === index ? (
              <>
                <p className="text-lg px-7 pb-2 text-clip">
                  {book.description || ""}
                </p>
                <div>
                  <Link to={`/books/${book._id}`}>
                    <Button text="View" variant="primary" extraStyles="mr-1" />
                  </Link>
                  <Link to={book.pdfURL} target="_blank">
                    <Button text="Download" variant="secondary" />
                  </Link>
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        ))}
      </div>
    </>
  );
};
