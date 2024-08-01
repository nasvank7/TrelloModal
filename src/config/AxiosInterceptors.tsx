import axios from "axios";

let apiUrl = ""
if (typeof import.meta.env.VITE_API_URL === 'string') {
  apiUrl = import.meta.env.VITE_API_URL;
}
const axiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);



export default axiosInstance;
