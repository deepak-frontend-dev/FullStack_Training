import Api from "./axios";

export const getMovies = () => Api.get("/movies");

export const createMovie = (payload) => Api.post("/movies", payload);

export const login = (payload) => Api.post("/auth/login", payload);

export const getUser = () => Api.get(`/auth/me`);

export const syncMovies = (payload) => Api.post(`/movies/sync`, payload);