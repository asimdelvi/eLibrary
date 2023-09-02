import { Link } from "react-router-dom";
import { NavBar } from "../../components/NavBar";
import { NavBottom } from "../../components/NavBottom";

export const Home = () => {
  return (
    <div className="h-screen flex flex-col">
      <NavBar />
      <section className="m:px-20 flex flex-col items-center m-auto">
        <h1 className="text-6xl s:text-8xl text-center font-black mb-10">
          Let's <span className="text-gradient text-6xl s:text-8xl">Read</span>{" "}
          Together
        </h1>
        <p className="hidden s:block w-[60%] text-center mb-9 text-base font-medium text-slate-900 tracking-widest">
          Dive into a vibrant community of book lovers. Discover new reads and
          engage in inspiring discussions about your favorite books. Share
          recommendations, explore diverse genres, and foster a love for
          literature as we embark on this collective reading journey. Join us to
          connect, learn, and grow as we celebrate the power of words and the
          joy of reading together.
        </p>
        <Link to="/books/all">
          <span className="rounded-2xl s:rounded-3xl my-6 px-6 py-3 s:px-12 s:py-6 text-sm s:text-xl font-medium border-black border-2 btn">
            EXPLORE BOOKS
          </span>
        </Link>
        <div className="my-6 py-7"></div>
      </section>
      <NavBottom />
    </div>
  );
};
