"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "../../components/MovieCard";
import { addMovie, setMovies } from "../../store/slices/movieSlice";
import { createMovie, getMovies } from "../../lib/api";
import toast from "react-hot-toast";

export default function MoviesPage() {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.list);
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");

  const fetchMovies = async () => {
    try {
      const res = await getMovies();
      if (res?.data?.success) {
        dispatch(setMovies(res.data.data.data));
      } else {
        toast.error(res?.data?.message || "Failed to fetch movies");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to fetch movies");
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  async function handleAddMovie() {
    if (!title || !year || !genre) {
      return toast.error("All fields are required");
    }

    const payload = { title, year, genre, description: "Added" };

    try {
      const res = await createMovie(payload);

      if (res?.data?.success) {
        toast.success("Movie added!");
        dispatch(addMovie(res.data.data));
      } else {
        toast.error(res?.data?.message || "Failed to add movie");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to add movie");
    }

    setTitle("");
    setYear("");
    setGenre("");
  }

  return (
    <div className="px-6 py-4">
      <div className="bg-white/5 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-xl mb-6 transition-all hover:shadow-2xl">
        <h2 className="font-semibold text-2xl text-white mb-6 tracking-wide">Quick Add Movie</h2>

        <div className="flex flex-wrap gap-4 items-center">
          <input
            className="flex-1 border border-white/30 rounded-xl px-4 py-3 bg-black/40 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 transition-all min-w-[200px]"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Movie Title"
          />

          <input
            className="flex-1 border border-white/30 rounded-xl px-4 py-3 bg-black/40 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 transition-all min-w-[150px]"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="Year"
          />

          <div className="flex gap-3 flex-1 min-w-[260px]">
            <select
              className={`flex-1 border border-white/30 rounded-xl px-4 py-3 bg-black/40 focus:ring-2 focus:ring-blue-500 transition-all appearance-none [&>option]:bg-black [&>option]:text-white ${genre ? "text-white" : "text-gray-400"}`}
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            >
              <option value="" disabled>Select Genre</option>
              <option>Action</option>
              <option>Comedy</option>
              <option>Drama</option>
              <option>Horror</option>
              <option>Sci-Fi</option>
              <option>Romance</option>
              <option>Thriller</option>
            </select>

            <button
              className="bg-green-600 hover:bg-green-500 transition px-6 py-3 rounded-xl text-white font-semibold shadow-md hover:shadow-green-500/30 active:scale-95"
              onClick={handleAddMovie}
            >
              Add
            </button>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-semibold text-white mb-4 tracking-wide">All Movies</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-flow-row gap-6 overflow-x-auto no-scrollbar p-1 min-h-[450px]">
        {movies.length === 0 ? (
          <p className="text-gray-400 col-span-full text-center mt-12 text-lg">
            No movies added yet.
          </p>
        ) : (
          movies.map((movie) => (
            <div
              className="animate-[fadeIn_0.5s_ease] h-full w-full snap-start"
              key={movie.id || `${movie.title}-${movie.year}`}
            >
              <MovieCard movie={movie} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}