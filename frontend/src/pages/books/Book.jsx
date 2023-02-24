import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteBook } from "../../redux/features/bookSlice";

export const Book = () => {
  const dispatch = useDispatch();
  const { books } = useSelector((state) => state.books);
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);

  const deleteHandler = (bookId) => {
    console.log(bookId);
    dispatch(deleteBook(bookId));
  };

  const book = books.find((book) => book._id === id);
  return (
    <>
      <div>{book.title}</div>
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
