import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "../../redux/features/bookSlice";

export const Books = () => {
  const dispatch = useDispatch();
  const { books } = useSelector((state) => state.books.books);

  console.log(books);

  useEffect(() => {
    dispatch(getBooks());
  });
  return (
    <>
      <h1>Hello</h1>
    </>
  );
};
