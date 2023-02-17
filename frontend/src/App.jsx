import "./App.css";
import { Routes, Route, NavLink } from "react-router-dom";
import { Register } from "./pages/user/Register";

function App() {
  return (
    <>
      <nav>
        <span>
          <NavLink to="/">Home</NavLink>
        </span>
        <span>
          <NavLink to="/Register">Register</NavLink>
        </span>
      </nav>
      <Routes>
        <Route path="/" element={<h1>Home page</h1>} />
        <Route path="/Register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
