import { NextResponse } from "next/server";

export function middleware(request) {
    const token = request.cookies.get("auth_token")?.value;
    const { pathname } = request.nextUrl;

    const publicRoutes = ["/login", "/register"];
    const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

    if (!token && !isPublicRoute) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (token && isPublicRoute) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/movies/:path*", "/login", "/register"],
};