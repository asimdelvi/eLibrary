import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteBook, getBook } from "../../redux/features/bookSlice";
import { ViewFile } from "../../components/ViewFile";
import { notify } from "../../toastify/index.js";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button.jsx";
import { NavBar } from "../../components/NavBar";
import { NavBottom } from "../../components/NavBottom";

export const Book = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { selectedBook, deleteStatus, error } = useSelector(
    (state) => state.books
  );

  useEffect(() => {
    if (id) dispatch(getBook(id));
  }, [dispatch, id]);

  const deleteHandler = async (bookId) => {
    notify.loading();
    await dispatch(deleteBook(bookId));
    navigate(-1);
  };

  useEffect(() => {
    if (deleteStatus === "fulfilled") {
      notify.success("Successfully Deleted");
    }
    if (deleteStatus === "rejected") {
      notify.error(`Failed to delete, ${error}`);
    }
  }, [deleteStatus, error, navigate]);

  return (
    <>
      <NavBar position="fixed top-0" />
      <div className="xl:px-80 xs:px-10 s:px-24 flex flex-col m:flex-row m:justify-stretch items-start py-[12%]">
        <div className="m:basis-1/2 w-[100%] m:max-w-[50%] mb-5 flex-col m:mr-7 items-start justify-center m:min-h-[10rem]  border-black border-2 rounded-3xl form py-2">
          <h2 className="text-2xl font-bold px-7 py-2">{selectedBook.title}</h2>
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
                  <Button
                    text="Update"
                    variant="secondary"
                    extraStyles="mr-1"
                  />
                </Link>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
        <ViewFile className="m:basis-1/2" filePath={selectedBook.pdfURL} />
      </div>
      <NavBottom />
    </>
  );
};
