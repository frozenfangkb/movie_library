import React from "react";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import Link from "next/link";
import { useRouter } from "next/router";

export const Navbar: React.FC = () => {
  const router = useRouter();

  return (
    <nav className="h-24 w-full py-1 px-16 grid grid-cols-2 border-b border-gray-300">
      <div className="flex items-center justify-start gap-1">
        <span className="font-bold">Movie</span>
        <MovieFilterIcon />
        <span className="font-bold">Library</span>
      </div>
      <div className="flex items-center justify-end gap-4">
        <Link className={router.pathname === "/" ? "active" : ""} href="/">
          <span className="text-white font-bold"> Home</span>
        </Link>
        <Link
          className={router.pathname === "/" ? "active" : ""}
          href="/genres"
        >
          <span className="text-white font-bold">Genres</span>
        </Link>
      </div>
    </nav>
  );
};
