import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteBook, getBook } from "../../redux/features/bookSlice";
import { ViewFile } from "../../components/ViewFile";
import { notify } from "../../toastify/index.js";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button.jsx";

export const Book = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { selectedBook, status, error } = useSelector((state) => state.books);

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
            <Button text="Download" variant="primary" extraStyles="mr-1" />
          </Link>

          {user && user.id === selectedBook.createdBy._id ? (
            <>
              <Button
                text="Delete"
                variant="secondary"
                onClickHandler={() => deleteHandler(selectedBook._id)}
                extraStyles="mr-1"
              />
              <Link to={`/books/${id}/update`}>
                <Button text="Update" variant="secondary" extraStyles="mr-1" />
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
