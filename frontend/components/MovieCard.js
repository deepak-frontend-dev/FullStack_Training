"use client";

export default function MovieCard({ movie }) {
  return (
    <div className="bg-white rounded border p-4 mb-3">
      <h3 className="font-bold">{movie.title}</h3>
      <p>Year: {movie.year || "NA"}</p>
      <p>Genre: {movie.genre || "Unknown"}</p>
      <p className="text-sm text-gray-500">{movie.description}</p>
    </div>
  );
}
