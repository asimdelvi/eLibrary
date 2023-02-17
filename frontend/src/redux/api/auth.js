import axios from "axios";

const BASE_URL = "http://localhost:3090/api/users";

const register = async (userData) => {
  // try {
  const res = await axios.post(`${BASE_URL}/register`, userData);
  if (res.data) {
    localStorage.setItem("user", JSON.stringify(res.data));
    return res.data;
  }
  // } catch (error) {
  //   const message = error.response.data.message;
  //   console.log(message);
  //   return message;
  // }
};

const authAPI = {
  register,
};

export default authAPI;
