import axios from "axios";
import TokenService from "../services/tokenService";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/";
const authExcluded = ["/auth/login", "/auth/register"];

const Api = axios.create({
    baseURL: BASE_URL,
    withCredentials: false,
    headers: {
        "Content-Type": "application/json",
    }
})

Api.interceptors.request.use(
    (config) => {
        const token = typeof window !== "undefined" ? TokenService.getToken() : null;
        if (token && !authExcluded.some(route => config.url.includes(route))) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
)

Api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API Error:", error);
        return Promise.reject(error);
    }
)

export default Api;