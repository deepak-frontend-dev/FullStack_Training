'use client';

import { useEffect, useRef, useState } from "react";
import { UserCircle } from "lucide-react";
import TokenService from "../services/tokenService";
import { useRouter } from "next/navigation";
import { getUser } from "../lib/api";
import SearchBar from "./SearchBar";

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const [toggleSearch, setToggleSearch] = useState(false);
    const dropdownRef = useRef(null);

    const router = useRouter();

    const handleLogout = () => {
        setOpen(false);
        TokenService.removeToken();
        router.push('/login');
    }

    const getUserInfo = async () => {
        try {
            const res = await getUser();
            if (res?.data?.success) {
                setUserInfo(res.data.data);
            }
        } catch (err) {
            console.error("Failed to fetch user:", err);
        }
    }

    useEffect(() => {
        function handleClickOutside(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        getUserInfo();
    }, []);

    return (
        <nav className="fixed w-full h-20 bg-gray-900/80 backdrop-blur-md py-5 px-5 md:px-10 shadow-lg z-50">
            <div className="flex w-full justify-between items-center">

                <div className={`text-white font-semibold text-md md:text-2xl tracking-wide transition-all duration-300 ${toggleSearch ? "opacity-0 -translate-x-10 pointer-events-none" : "opacity-100 translate-x-0"}`}>
                    Movie Management
                </div>

                <div className="flex gap-4 md:gap-6 items-center justify-end">
                    <SearchBar toggleSearch={toggleSearch} setToggleSearch={setToggleSearch} />

                    <div className={`relative transition-all duration-300 ${toggleSearch ? "opacity-0 translate-x-10 pointer-events-none" : "opacity-100 translate-x-0"}`} ref={dropdownRef}>
                        <UserCircle
                            className="md:w-12 md:h-12 cursor-pointer text-white hover:text-blue-400 transition-all duration-300"
                            onClick={() => setOpen(!open)}
                        />

                        {open && (
                            <div
                                className="absolute right-0 mt-4 w-80 bg-white backdrop-blur-xl shadow-2xl rounded-2xl p-5 animate-[fadeIn_0.2s_ease]"
                            >

                                <div className="absolute -top-1 right-3 w-4 h-4 bg-white rotate-45"></div>

                                <div className="flex items-center gap-4 border-b pb-4 mb-4">
                                    <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center">
                                        <UserCircle size={40} className="text-gray-500" />
                                    </div>

                                    <div className="text-left">
                                        <p className="text-lg font-semibold text-gray-900">{userInfo?.name}</p>
                                        <p className="text-sm text-gray-600">{userInfo?.email}</p>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <button
                                        onClick={handleLogout}
                                        className="text-left px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white font-medium shadow-md"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}