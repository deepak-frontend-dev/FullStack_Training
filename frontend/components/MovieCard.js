"use client";

import TiltWrapper from "./TiltWrapper";

export default function MovieCard({ movie }) {
  return (
    <>
      <TiltWrapper>
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-5 hover:bg-white/10 hover:border-white/20 transition-all duration-300 h-full flex flex-col shadow-lg group">
          <div className="flex justify-between items-start mb-4">
            <h3 className="font-bold text-xl text-white group-hover:text-blue-400 transition-colors line-clamp-2">{movie.title}</h3>
            <span className="text-xs font-medium px-2 py-1 bg-blue-500/20 text-blue-300 rounded-lg border border-blue-500/30">
              {movie.year || "NA"}
            </span>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
              <span className="font-medium text-gray-300">Genre:</span>
              <span>{movie.genre || "Unknown"}</span>
            </div>
          </div>

          <div className="mt-auto">
            <p className="text-sm text-gray-400 line-clamp-3 italic leading-relaxed">
              {movie.description || "No description available."}
            </p>
          </div>
        </div>
      </TiltWrapper>
    </>
  );
}
