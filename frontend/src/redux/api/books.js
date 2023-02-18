import axios from "axios";
const BASE_URL = "http://localhost:3090/api";

export const get = async () => {
  const res = await axios.get(`${BASE_URL}/books`);
  return res.data;
};

// export const createVideo = async (videoData) => {
//   const data = await fetch("https://my-json-server.typicode.com/asimdelvi/videoLibDB/videos/", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(videoData),
//   });
//   const res = await data.json();
//   return res;
// };

// export const deleteVideo = async (id) => {
//   const data = await fetch(
//     `https://my-json-server.typicode.com/asimdelvi/videoLibDB/videos/${id}`,
//     {
//       method: "DELETE",
//     }
//   );
//   const res = await data.json();
//   return res;
// };

const booksAPI = {
  get,
};

export default booksAPI;
