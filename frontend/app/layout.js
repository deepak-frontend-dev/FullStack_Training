import "./globals.css";
import Link from "next/link";
import Providers from "../components/Providers";

export const metadata = {
  title: "Movie Management Training",
  description: "Imperfect training app"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <header className="bg-white border-b p-4 flex gap-4">
            <Link href="/">Home</Link>
            <Link href="/movies">Movies</Link>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/login">Login</Link>
          </header>
          <main className="p-6">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
