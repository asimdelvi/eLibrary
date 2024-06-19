import {
  FieldError,
  FieldErrors,
  FieldValues,
  UseFormRegisterReturn,
} from "react-hook-form";

export interface Book {
  _id: string;
  title: string;
  pdfURL: string;
  publicID: string;
  description?: string;
  createdBy: {
    _id: string;
    username: string;
  };
}

export type requestStatus = "idle" | "pending" | "fulfilled" | "rejected";

export interface BookState {
  books: Book[];
  getBooksStatus: requestStatus;
  getBookStatus: requestStatus;
  createStatus: requestStatus;
  updateStatus: requestStatus;
  deleteStatus: requestStatus;
  error: string | null;
  selectedBook: Book;
}

export interface User {
  id: string;
  email: string;
  username: string;
  token: string;
}

export interface AuthState {
  user: User | null;
  status: "idle" | "pending" | "fulfilled" | "rejected";
  error: string | null;
}

export interface ButtonProps {
  text: string;
  variant: "primary" | "secondary";
  onClickHandler?: React.MouseEventHandler<HTMLButtonElement>;
  extraStyles?: string;
}

export interface variantNameType {
  primary: string;
  secondary: string;
}

export interface FormProps {
  title: string;
  formSubmitFunction: () => void;
  children: React.ReactNode;
}

type InputType = "file" | "textarea" | "text" | "email" | "password";

export interface InputProps {
  type: InputType;
  placeholder: string;
  formFunction: UseFormRegisterReturn<string>;
  errors?: FieldError;
}

export interface NavBarProps {
  position?: string;
}

export interface ViewFileProps {
  filePath: string;
}

export interface BookInput {
  title: string;
  description: string;
  book: FileList;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  email: string;
  password: string;
  username: string;
}
