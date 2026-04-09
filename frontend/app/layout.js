import Providers from "../components/Providers";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata = {
  title: "Movie Management Training",
  description: "Imperfect training app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <Providers>
          {children}
          <Toaster position="top-center" />
        </Providers>
      </body>
    </html>
  );
}
