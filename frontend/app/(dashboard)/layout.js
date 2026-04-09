'use client';

import Navbar from "../../components/Navbar";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }) {
    const pathname = usePathname();

    return (
        <>
            {pathname !== "/login" && pathname !== "/register" && <Navbar />}
            <main className="pt-24 h-dvh">{children}</main>
        </>
    );
}
