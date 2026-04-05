import express from "express";
import { getAllMovies, createMovie, updateMovie, deleteMovie, syncMovies } from "../../controllers/movie.controller.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

const router = express.Router();

router.get("/", asyncHandler(getAllMovies));

router.post("/", asyncHandler(createMovie));

router.put("/:id", asyncHandler(updateMovie));

router.delete("/:id", asyncHandler(deleteMovie));

router.post("/sync", asyncHandler(syncMovies));

export default router;