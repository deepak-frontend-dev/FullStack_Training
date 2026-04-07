import Api from "./axios";

export const getMovies = () => Api.get("/movies");

export const createMovie = (payload) => Api.post("/movies", payload);

export const login = (payload) => Api.post("/auth/login", payload);
