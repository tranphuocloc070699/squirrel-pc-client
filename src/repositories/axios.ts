import { generateToken } from "@/utils/jwt";
import axios from "axios"


axios.interceptors.request.use(
    (config) => {
  
      config.headers['token'] = generateToken();
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  

export const AxiosBackend = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL_BACKEND,
    headers: {
        "Content-Type": "application/json",
    },

})

