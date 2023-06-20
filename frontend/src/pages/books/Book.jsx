import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteBook, getBook } from "../../redux/features/bookSlice";
import { BASE_URL } from "../../redux/api/books";
import { ViewFile } from "../../components/ViewFile";

export const Book = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { selectedBook } = useSelector((state) => state.books);

  useEffect(() => {
    if (id) dispatch(getBook(id));
  }, [dispatch, id]);

  const deleteHandler = (bookId) => {
    dispatch(deleteBook(bookId));
  };

  return (
    <div className="px-24 flex flex-row justify-stretch items-start my-10">
      <div className="basis-1/2 max-w-[50%] flex flex-col mr-7 items-start justify-center min-h-[10rem]  border-gray-700 border-[1px] shadow-xl rounded-xl bg-[#dad9d9]">
        <h2 className="text-lg px-7 py-2 text-clip">{selectedBook.title}</h2>
        <div className="px-7 pb-4">
          <Link to={`${BASE_URL}/books/download/${selectedBook.pdfURL}`}>
            <span className="mr-1 rounded-lg bg-[#B59D9A] border-[#B59D9A] border-2  px-3 py-[6px] text-sm hover:shadow-md">
              Download
            </span>
          </Link>

          {user.id === selectedBook.createdBy._id ? (
            <>
              <button onClick={() => deleteHandler(selectedBook._id)}>
                <span className="mr-1 rounded-lg bg-black border-black border-2 text-white px-3 py-[6px] text-sm hover:shadow-md">
                  Delete
                </span>
              </button>
              <Link to={`/books/${id}/update`}>
                <span className="rounded-lg bg-black border-black border-2 text-white px-3 py-[6px] text-sm hover:shadow-md">
                  Update
                </span>
              </Link>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
      <ViewFile
        className="basis-1/2"
        filePath={`${BASE_URL}/books/download/${selectedBook.pdfURL}`}
      />
    </div>
  );
};
