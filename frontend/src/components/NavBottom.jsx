import { NavLink } from "react-router-dom";

export function NavBottom({ position = "fixed bottom-0" }) {
  return (
    <div
      className={`visible m:hidden py-1 px-3 rounded-none flex items-center w-screen justify-between nav-background nav-bar-bottom nav-bar ${position}`}
    >
      <NavLink to="/">
        <div className="transition ease-in-out duration-300 rounded-xl text-sm px-5 py-2 ">
          HOME
        </div>
      </NavLink>
      <NavLink to="/books/all">
        <div className="transition ease-in-out duration-300 rounded-xl text-sm px-5 py-2 ">
          BOOKS
        </div>
      </NavLink>
      <NavLink to="/books/new">
        <div className="transition ease-in-out duration-300 rounded-xl text-sm px-5 py-2 ">
          NEW BOOK
        </div>
      </NavLink>
    </div>
  );
}
