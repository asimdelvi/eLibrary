import axios from "axios";

const BASE_URL = "http://localhost:3090/api/users";

const register = async (userData) => {
  // try {
  const res = await axios.post(`${BASE_URL}/register`, userData);
  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data));
    return res.data;
  }
};

const login = async (userData) => {
  const res = await axios.post(`${BASE_URL}/login`, userData);
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
