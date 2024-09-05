import axios from "axios";
import store from "./store";

const axiosClient = axios.create({
  // baseURL: "http://182.76.62.178:7877/SwimHandHeld/api",
  baseURL: "http://127.0.0.1:8000/api",
  // baseURL:'http://localhost:8000/api'
  // baseURL:`${import.meta.env.VITE_API_BASE_URL}/api`
});

axiosClient.interceptors.request.use((config) => {
  config.headers.Authorization = "Bearer ${store.state.user.token}";
  return config;
});

export default axiosClient;
