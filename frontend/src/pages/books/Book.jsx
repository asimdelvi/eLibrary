import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteBook, getBook } from "../../redux/features/bookSlice";
import { ViewFile } from "../../components/ViewFile";
import { notify } from "../../toastify/index.js";
import { useNavigate } from "react-router-dom";

export const Book = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { selectedBook, status, error } = useSelector((state) => state.books);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) dispatch(getBook(id));
  }, [dispatch, id]);

  const deleteHandler = async (bookId) => {
    notify.loading();
    await dispatch(deleteBook(bookId));
    navigate(-1);
  };

  useEffect(() => {
    if (status === "fulfilled") {
      notify.success("Successfully Deleted");
    }
    if (status === "rejected") {
      notify.error(`Failed to delete, ${error}`);
    }
  }, [status, error, navigate]);
  return (
    <div className="px-24 flex flex-row justify-stretch items-start my-10">
      <div className="basis-1/2 max-w-[50%] flex flex-col mr-7 items-start justify-center min-h-[10rem]  border-gray-700 border-[1px] shadow-xl rounded-xl bg-[#dad9d9]">
        <h2 className="text-lg px-7 pt-2 text-clip font-bold">
          {selectedBook.title}
        </h2>
        <p className="text-lg px-7 pb-2 text-clip">
          {selectedBook.description || ""}
        </p>
        <div className="px-7 pb-4">
          <Link to={selectedBook.pdfURL} target="_blank">
            <span className="mr-1 rounded-lg bg-[#B59D9A] border-[#B59D9A] border-2  px-3 py-[6px] text-sm hover:shadow-md">
              Download
            </span>
          </Link>

          {user && user.id === selectedBook.createdBy._id ? (
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
      <ViewFile className="basis-1/2" filePath={selectedBook.pdfURL} />
    </div>
  );
};
