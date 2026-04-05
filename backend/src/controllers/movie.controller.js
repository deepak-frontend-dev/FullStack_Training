import { getAllMovieService, createMovieService, updateMovieService, deleteMovieService, syncMoviesService } from "../services/movie.service.js";
import { validatePagination } from "../validators/pagination.validation.js";
import { validateMovie } from "../validators/movie.validation.js";

export const getAllMovies = async (req, res) => {
    const error = validatePagination(req.query);

    if (error) {
        return res.status(400).json({ success: false, message: error });
    }

    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const movies = await getAllMovieService(page, limit);

    res.status(200).json({ success: true, data: movies });
};

export const createMovie = async (req, res) => {
    const error = validateMovie(req.body);

    if (error) {
        return res.status(400).json({
            success: false,
            message: Array.isArray(error) ? error.join(", ") : error
        });
    }

    const movie = await createMovieService(req.body);

    res.status(201).json({ success: true, data: movie });
};

export const updateMovie = async (req, res) => {
    const error = validateMovie(req.body);

    if (error) {
        return res.status(400).json({
            success: false,
            message: Array.isArray(error) ? error.join(", ") : error
        });
    }

    const movie = await updateMovieService(req.params.id, req.body);

    res.status(200).json({ success: true, data: movie });
};

export const deleteMovie = async (req, res) => {
    const movie = await deleteMovieService(req.params.id);

    res.status(200).json({ success: true, data: movie });
};

export const syncMovies = async (req, res) => {
    const keyword = req.body.keyword || "batman";
    const inserted = await syncMoviesService(keyword);

    res.status(200).json({
        success: true,
        message: "Sync completed",
        inserted
    });
};