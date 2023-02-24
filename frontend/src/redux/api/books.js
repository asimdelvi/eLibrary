import axios from "axios";
const BASE_URL = "http://localhost:3090/api";

const get = async () => {
  const res = await axios.get(`${BASE_URL}/books`);
  return res.data;
};

const create = async (data, token) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const res = await axios.post(`${BASE_URL}/books`, data, config);
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
  return res.data;
};

const booksAPI = {
  get,
  create,
  remove,
  update,
};

export default booksAPI;
