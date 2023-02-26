import axios from "axios";
export const BASE_URL = "http://localhost:3090/api";

const getAll = async () => {
  const res = await axios.get(`${BASE_URL}/books`);
  return res.data;
};

const get = async (id) => {
  const res = await axios.get(`${BASE_URL}/books/${id}`);
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
  const res = await axios.delete(`${BASE_URL}/books/${id}`, config);
  return res.data;
};

const update = async (id, data, token) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  // console.log(data, id);
  const res = await axios.patch(`${BASE_URL}/books/${id}`, data, config);
  // console.log(res);
  return res.data;
};

const booksAPI = {
  getAll,
  get,
  create,
  remove,
  update,
};

export default booksAPI;
