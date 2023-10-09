import axios from "axios"

export const AxiosBackend = axios.create({
    baseURL: process.env.BASE_URL_BACKEND,
    headers: {
        "Content-Type": "application/json",
    },
})

console.log(process.env.BASE_URL_BACKEND)