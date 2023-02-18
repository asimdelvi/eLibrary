import { useState } from "react";
import { useDispatch } from "react-redux";
import { createBook } from "../../redux/features/bookSlice";

export const NewBook = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [book, setBook] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("title", title);
    formData.append("book", book);
    dispatch(createBook(formData));
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
