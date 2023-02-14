import "./App.css";
import { Routes, Route } from "react-router-dom";

function App() {
  console.log("Hello");
  return (
    <>
      <div>
        <nav>Navbar</nav>
      </div>
      <Routes>
        <Route path="/" element={<h1>Hi</h1>} />
      </Routes>
    </>
  );
}

export default App;
