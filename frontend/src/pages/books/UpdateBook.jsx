import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBook } from "../../redux/features/bookSlice";
import { useParams } from "react-router-dom";
import { getBook } from "../../redux/features/bookSlice";

export const UpdateBook = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { selectedBook } = useSelector((state) => state.books);

  useEffect(() => {
    if (id) dispatch(getBook(id));
  }, [dispatch, id]);

  const [title, setTitle] = useState(selectedBook.title);
  const [book, setBook] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    if (title) formData.append("title", title);
    if (book) formData.append("book", book);

    dispatch(updateBook({ id, formData }));
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
          onChange={(e) => setBook(e.target.files[0])}
        />

        {user.id === selectedBook.createdBy._id ? (
          <button type="submit" onClick={handleSubmit}>
            Update
          </button>
        ) : (
          ""
        )}
      </form>
    </>
  );
};

// TODO: use useRef to clear the input filed in files
