import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteBook, getBook } from "../../redux/features/bookSlice";
import { BASE_URL } from "../../redux/api/books";

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
    <>
      <div>{selectedBook.title}</div>
      <Link to={`${BASE_URL}/books/download/${selectedBook.pdfURL}`} download>
        Download
      </Link>
      {user.id === selectedBook.createdBy._id ? (
        <>
          <button onClick={() => deleteHandler(selectedBook._id)}>
            Delete
          </button>
          <Link to={`/books/${id}/update`}>Update</Link>
        </>
      ) : (
        ""
      )}
    </>
  );
};
