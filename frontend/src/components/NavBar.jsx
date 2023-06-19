import { NavLink } from "react-router-dom";
import { TbBooks } from "react-icons/tb";
import { BiBookAdd, BiHomeAlt2 } from "react-icons/bi";

export function NavBar() {
  return (
    <nav className="px-20 flex items-center justify-between nav-background sticky z-40 top-0 py-4 border-0 rounded-none">
      <NavLink to="/">
        <h1 className="text-2xl font-mono font-extrabold">eLibrary</h1>
      </NavLink>
      <div className="flex items-center">
        <NavLink className="mr-4 group" to="/">
          <div className="rounded-full flex">
            <BiHomeAlt2 className="rounded-full bg-black p-[6px] box-content" />
            <span className="animate-border pr-3 pl-5 py-[3px]  animate-nav">
              Home
            </span>
          </div>
        </NavLink>
        <NavLink className="mr-4 group" to="/books/all">
          <div className="rounded-full flex">
            <TbBooks className="rounded-full bg-black p-[6px] box-content" />
            <span className="animate-border pr-3 pl-5 py-[3px]  animate-nav">
              Books
            </span>
          </div>
        </NavLink>
        <NavLink className="mr-4 group" to="/books/new">
          <div className="rounded-full flex">
            <BiBookAdd className="rounded-full bg-black p-[6px] box-content" />
            <span className="animate-border pr-3 pl-5 py-[3px]  animate-nav">
              New Book
            </span>
          </div>
        </NavLink>
      </div>
      <div>
        <NavLink to="/Login">
          <span className="rounded-xl bg-black border-black border-2 text-white px-3 py-[6px] text-sm hover:bg-gray-800">
            Login
          </span>
        </NavLink>
        <NavLink to="/Register">
          <span className="ml-4 rounded-xl border-black border-2 px-3 py-[6px] text-sm hover:border-gray-600 hover:text-gray-800">
            Register
          </span>
        </NavLink>
      </div>
    </nav>
  );
}
