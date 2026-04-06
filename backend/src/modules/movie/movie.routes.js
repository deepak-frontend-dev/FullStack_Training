import express from "express";
import { getAllMovies, getMovieById, createMovie, updateMovie, deleteMovie, syncMovies } from "../../modules/movie/movie.controller.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { auth } from "../../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", asyncHandler(getAllMovies));

router.get("/:id", asyncHandler(getMovieById));

router.post("/", auth, asyncHandler(createMovie));

router.put("/:id", auth, asyncHandler(updateMovie));

router.delete("/:id", auth, asyncHandler(deleteMovie));

router.post("/sync", auth, asyncHandler(syncMovies));

export default router;