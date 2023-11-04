import { generateToken } from "@/utils/tokenControl";
import axios from "axios"

export const AxiosBackend = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL_BACKEND,
    headers: {
        "Content-Type": "application/json"
    },

})

AxiosBackend.interceptors.request.use(
    (config) => {
        // Generate a new token and set it in the request headers
        config.headers['Token'] = generateToken();
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


