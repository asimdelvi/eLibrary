import axios from "axios";
export const BASE_URL =
  process.env.NODE_ENV !== "production"
    ? process.env.REACT_APP_BASE_URL_LOCAL
    : process.env.REACT_APP_BASE_URL_PROD;

const getAll = async () => {
  const res = await axios.get(`${BASE_URL}/books`);
  return res.data;
};

const get = async (id: string) => {
  const res = await axios.get(`${BASE_URL}/books/${id}`);
  return res.data;
};

const create = async (data: FormData, token: string) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const res = await axios.post(`${BASE_URL}/books`, data, config);
  return res.data;
};

const remove = async (_id: string, token: string) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const res = await axios.delete(`${BASE_URL}/books/${_id}`, config);
  return res.data;
};

const update = async (id: string, data: FormData, token: string) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const res = await axios.patch(`${BASE_URL}/books/${id}`, data, config);
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
