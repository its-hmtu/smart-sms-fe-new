import axios from "axios";

export const BASE_URL = process.env.REACT_APP_DOMAIN_API;

const axiosClient = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
  // withCredentials: true,
});

axiosClient.interceptors.request.use(async (config) => {
  // if (!config.data) config.data = {};
  // else {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    const accessToken = user.accessToken;
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${accessToken || ""}`,
    };
  }
  // }

  return config;
});

axiosClient.interceptors.response.use(
  (response) => response.data || response,
  async (error) => {
    const err = error.response || error;
    if (err.status === 401) {
      // dispatch logout
      throw err;
    }
    throw err;
  }
);

export default axiosClient;
