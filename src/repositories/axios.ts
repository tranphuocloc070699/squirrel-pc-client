import axios from "axios"

export const AxiosBackend = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL_BACKEND,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 30000,
})

