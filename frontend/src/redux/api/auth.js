import axios from "axios";

export const BASE_URL =
  process.env.NODE_ENV !== "Production"
    ? process.env.REACT_APP_BASE_URL_LOCAL
    : process.env.REACT_APP_BASE_URL_PROD;

const register = async (userData) => {
  const res = await axios.post(`${BASE_URL}/users/register`, userData);
  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data));
    return res.data;
  }
};

const login = async (userData) => {
  const res = await axios.post(`${BASE_URL}/users/login`, userData);
  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data));
    return res.data;
  }
};

const authAPI = {
  register,
  login,
};

export default authAPI;
