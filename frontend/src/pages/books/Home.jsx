import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <>
      <div className="pt-[12%]  px-20 flex flex-col justify-start bg-[#F1F1F1] h-[100vh] items-center z-20 relative hero-background">
        <h1 className="text-8xl text-center font-black mb-10">
          Let's <span className="text-gradient text-8xl">Read</span> Together
        </h1>
        <p className="w-[60%] text-center mb-9 text-base font-medium text-slate-900 tracking-widest">
          Dive into a vibrant community of book lovers. Discover new reads and
          engage in inspiring discussions about your favorite books. Share
          recommendations, explore diverse genres, and foster a love for
          literature as we embark on this collective reading journey. Join us to
          connect, learn, and grow as we celebrate the power of words and the
          joy of reading together.
        </p>
        <Link to="/books/all">
          <span className="rounded-3xl px-12 py-6 text-xl font-medium border-black border-2 btn">
            EXPLORE BOOKS
          </span>
        </Link>
      </div>
    </>
  );
};
