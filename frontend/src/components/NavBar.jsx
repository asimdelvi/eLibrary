import { NavLink } from "react-router-dom";

export function NavBar({ position = "static" }) {
  return (
    <nav
      className={`px-5 py-2 m:px-20 xl:px-80 m:py-5 flex items-center justify-between nav-background z-20 border-0 rounded-none w-screen ${position}`}
    >
      <NavLink to="/">
        <p className="text-lg m:text-3xl font-mono font-extrabold">eLibrary</p>
      </NavLink>
      <div className="hidden m:visible p-[2px] m:flex items-center rounded-full border-2 border-black nav-bar">
        <NavLink to="/">
          <div className="transition ease-in-out duration-300 rounded-full text-lg px-5 py-2 hover:bg-black hover:text-white">
            HOME
          </div>
        </NavLink>
        <NavLink to="/books/all">
          <div className="transition ease-in-out duration-300 rounded-full text-lg px-5 py-2 hover:bg-black hover:text-white">
            BOOKS
          </div>
        </NavLink>
        <NavLink to="/books/new">
          <div className="transition ease-in-out duration-300 rounded-full text-lg px-5 py-2 hover:bg-black hover:text-white">
            NEW BOOK
          </div>
        </NavLink>
      </div>
      <div>
        <NavLink to="/login">
          <span className="rounded-lg border-2 font-semibold border-black text-xs px-2 py-1 m:text-base m:px-6 m:py-3 bg-black text-white m:anim_button mr-2">
            LOGIN
          </span>
        </NavLink>
        <NavLink to="/register">
          <span className="rounded-lg m:border-2 border-[1.9px] font-semibold border-black border-dashed text-xs px-2 py-1 m:text-base m:px-6 m:py-3 m:anim_button">
            REGISTER
          </span>
        </NavLink>
      </div>
    </nav>
  );
}
