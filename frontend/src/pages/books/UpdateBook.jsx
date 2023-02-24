import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBook } from "../../redux/features/bookSlice";
import { useParams } from "react-router-dom";

export const UpdateBook = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { books } = useSelector((state) => state.books);
  const selectedBook = books.find((book) => book._id === id);

  const [title, setTitle] = useState(selectedBook.title);
  const [book, setBook] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("title", title);
    formData.append("book", book);
    dispatch(updateBook(formData));
    setTitle("");
    setBook(null);
  };

  return (
    <>
      <form>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="file"
          placeholder="Upload book"
          accept="pdf"
          onChange={(e) => setBook(e.target.files[0])}
        />
        <button type="submit" onClick={handleSubmit}>
          Upload
        </button>
      </form>
    </>
  );
};
