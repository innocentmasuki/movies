import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks.ts";
import { Link, useSearchParams } from "react-router-dom";
import { MovieData } from "@/types";
import React, { useCallback, useEffect, useRef } from "react";
import { setSearchQuery } from "@/redux/slices/searchQuerySlice.ts";
import { getMovies } from "@/api/movieSdk.ts";
import { setMovies } from "@/redux/slices/moviesSlice.ts";
import MovieCard from "@/components/MovieCard";

function Home() {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const movies = useAppSelector((state) => state.movies.value);
  const shinyRef = useRef<HTMLDivElement>(null);
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (shinyRef.current) {
      const rect = shinyRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      shinyRef.current.style.transform = `translate(${x}px, ${y}px)`;
    }
  };

  const fetchMovies = useCallback(async () => {
    getMovies().then((data) => dispatch(setMovies(data)));
  }, []);

  useEffect(() => {
    if (!movies.length) {
      fetchMovies();
    }

    if (searchParams.get("q")) {
      dispatch(setSearchQuery(searchParams.get("q")!));
    }
  }, []);

  return (
    <div
      onMouseMove={handleMouseMove}
      className={"bg-gradient-radial  w-screen h-screen overflow-y-auto"}
    >
      <div
        className={
          "flex  p-4  flex-col w-full h-full gap-1 mx-auto md:max-w-4xl z-50"
        }
      >
        <div className={"w-full gap-3 grid py-4 grid-cols-2 md:grid-cols-5"}>
          {movies.length > 0 &&
            movies.map((movie: MovieData) => {
              return (
                <Link key={movie.imdbID} to={`/${movie.imdbID}`}>
                  <MovieCard movie={movie} />
                </Link>
              );
            })}
        </div>
      </div>
      <div
        style={{
          backgroundColor:
            "radial-gradient(rgba(250,227,189, 0.5) ,transparent ,transparent)",
        }}
        className=" absolute h-[600px] aspect-square  rounded-full"
        ref={shinyRef}
      />
    </div>
  );
}

export default Home;
