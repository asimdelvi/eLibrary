import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "../../redux/features/bookSlice";

export const Books = () => {
  const dispatch = useDispatch();
  const { books } = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  return (
    <>
      {books.map((book, index) => (
        <h1 key={index}> {book.title} </h1>
      ))}
    </>
  );
};
