import React, { useState, useEffect } from "react";
import { register } from "../../redux/features/authSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { status } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register({ username, email, password }));
    setUsername("");
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
          type="text"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
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
          Register
        </button>
      </form>
    </>
  );
};
