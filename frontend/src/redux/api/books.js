import axios from "axios";
const BASE_URL = "http://localhost:3090/api";

const getAll = async () => {
  const res = await axios.get(`${BASE_URL}/books`);
  return res.data;
};

const get = async (id) => {
  console.log("Hello");
  const res = await axios.get(`${BASE_URL}/books/${id}`);
  console.log(res);
  return res.data;
};

const create = async (data, token) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  console.log(data.get("title"));
  const res = await axios.post(`${BASE_URL}/books`, data, config);
  console.log(res);
  return res.data;
};

const remove = async (id, token) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  console.log(id, config);
  const res = await axios.delete(`${BASE_URL}/books/${id}`, config);
  return res.data;
};

const update = async (id, data, token) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const res = await axios.patch(`${BASE_URL}/books/${id}`, data, config);
  console.log(res);
  return res.data;
};

const download = async (bookName) => {
  console.log(`${BASE_URL}/books/download/${bookName}}`);
  const res = await axios.get(`${BASE_URL}/books/download/${bookName}}`);
  return res.data;
};

const booksAPI = {
  getAll,
  get,
  create,
  remove,
  update,
  download,
};

export default booksAPI;
