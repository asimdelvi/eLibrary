import axios from "axios";
const BASE_URL = "http://localhost:3090/api";

export const get = async () => {
  const res = await axios.get(`${BASE_URL}/books`);
  return res.data;
};

export const create = async (data, token) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const res = await axios.post(`${BASE_URL}/books`, data, config);
  return res.data;
};

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
  create,
};

export default booksAPI;
