"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { setMovies } from "../store/slices/movieSlice";
import { syncMovies, getMovies } from "../lib/api";
import toast from "react-hot-toast";
import { Search, X } from "lucide-react";

export default function SearchBar({ toggleSearch, setToggleSearch }) {
    const dispatch = useDispatch();
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchMovies = async () => {
        try {
            const res = await getMovies();
            const isSuccess = res?.data?.success;
            const message = res?.data?.message;
            if (isSuccess) {
                dispatch(setMovies(res?.data?.data?.data));
            } else {
                toast.error(message);
            }
        } catch (error) {
            console.error("Failed to fetch movies:", error);
        }
    }

    const handleSearch = async () => {
        setLoading(true);
        try {
            const payload = { keyword: search };
            const res = await syncMovies(payload);

            const isSuccess = res?.data?.success;
            const message = res?.data?.message;

            if (isSuccess) {
                toast.success(message);
                fetchMovies();
            } else {
                toast.error(message);
            }
        } catch (error) {
            console.error("Failed to search movies:", error);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="flex items-center justify-center">
            <div className={`
                ${toggleSearch
                    ? "fixed inset-0 bg-gray-900/95 backdrop-blur-md z-[60] flex items-center px-4 animate-slideDown"
                    : "hidden md:flex relative"} 
                w-full max-w-md group transition-all duration-300
            `}>
                <div className="flex w-full items-center">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search & Sync Movies..."
                        className="w-full px-5 py-2.5 bg-white/5 backdrop-blur-lg border border-white/20 text-white placeholder-white/60 rounded-l-full focus:outline-none focus:border-blue-500 transition-all duration-300 group-hover:border-white/40"
                    />

                    <button
                        onClick={handleSearch}
                        disabled={loading}
                        className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-r-full border border-blue-600 hover:bg-blue-500 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? "Syncing..." : "Sync"}
                    </button>

                    {toggleSearch && (
                        <button
                            onClick={() => setToggleSearch(false)}
                            className=" p-2 text-white hover:text-red-400 transition-colors md:hidden"
                        >
                            <X size={28} />
                        </button>
                    )}
                </div>
            </div>

            {!toggleSearch && (
                <div
                    onClick={() => setToggleSearch(true)}
                    className="md:hidden flex items-center justify-center p-2 hover:bg-white/10 rounded-full transition-all"
                >
                    <Search size={24} className="text-white cursor-pointer" />
                </div>
            )}
        </div>
    )
}
