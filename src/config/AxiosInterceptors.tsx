import axios from "axios";

let apiUrl = ""
let apiColumnUrl=""
if (typeof import.meta.env.VITE_API_URL === 'string') {
  apiUrl = import.meta.env.VITE_API_URL;
}
if (typeof import.meta.env.VITE_API_COLUMN_URL === 'string') {
  apiColumnUrl = import.meta.env.VITE_API_COLUMN_URL;
}
const axiosInstance = axios.create({
  baseURL: apiUrl,
  headers: {
    Accept: "application/json",
  },
});

export const axiosInstanceForColumn = axios.create({
  baseURL: apiColumnUrl,
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
