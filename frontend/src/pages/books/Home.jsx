import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <>
      {/* <div className="hero-shape  w-80 h-[50vh] absolute left-[40%] top-[23%] z-0"></div> */}
      <div className="px-20 flex flex-col justify-center  h-[calc(100vh-65px)] items-center z-20 relative hero-background">
        <h2 className="text-8xl text-center font-black mb-10">
          Let's <span className="text-gradient text-8xl">Read</span> Together
        </h2>
        <p className="w-[60%] text-center mb-16">
          Dive into a vibrant community of book lovers. Discover new reads and
          engage in inspiring discussions about your favorite books. Share
          recommendations, explore diverse genres, and foster a love for
          literature as we embark on this collective reading journey. Join us to
          connect, learn, and grow as we celebrate the power of words and the
          joy of reading together.
        </p>
        <Link to="/books/all">
          <span className="ml-4 rounded-xl px-6 py-3 text-xl btn-shadow border-black border-2  hover:border-gray-600 hover:text-gray-800">
            Explore Books
          </span>
        </Link>
      </div>
    </>
  );
};
