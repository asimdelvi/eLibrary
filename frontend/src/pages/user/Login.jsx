import React, { useState, useEffect } from "react";
import { login } from "../../redux/features/authSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { status } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
    dispatch(login({ email, password }));
    setPassword("");
    setEmail("");
  };

  // TODO: Add pending, fulfilled, rejected condition
  useEffect(() => {
    console.log(status);
  }, [status]);

  return (
    <>
      <form>
        <input
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" onClick={handleSubmit}>
          Login
        </button>
      </form>
    </>
  );
};
