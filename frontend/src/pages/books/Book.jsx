import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteBook } from "../../redux/features/bookSlice";
import booksAPI from "../../redux/api/books";

export const Book = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);

  const initialBookState = {
    _id: 0,
    title: "",
    pdfURL: "",
    createdBy: { _id: 0, username: "" },
  };

  const [book, setBook] = useState(initialBookState);

  const deleteHandler = (bookId) => {
    console.log(bookId);
    dispatch(deleteBook(bookId));
  };

  const getBook = async (id) => {
    const res = await booksAPI.get(id);
    console.log(res);
    setBook(res);
  };

  useEffect(() => {
    if (id) getBook(id);
  }, [id]);

  return (
    <>
      <div>{book.title}</div>
      <button onClick={() => booksAPI.download(book.pdfURL)}>Download</button>
      {user.id === book.createdBy._id ? (
        <>
          <button onClick={() => deleteHandler(book._id)}>Delete</button>
          <Link to={`/books/${id}/update`}>Update</Link>
        </>
      ) : (
        ""
      )}
    </>
  );
};
