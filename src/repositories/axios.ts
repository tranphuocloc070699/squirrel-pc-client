import { generateToken } from "@/utils/tokenControl";
import axios from "axios"

export const AxiosBackend = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL_PROXY,
    headers: {
        "Content-Type": "application/json",
        "Token": generateToken()
    },

})

