import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks.ts";
import React, { useCallback, useEffect, useRef } from "react";
import { getMovies } from "@/api/movieSdk.ts";
import { setMovies } from "@/redux/slices/moviesSlice.ts";
import CursorShadow from "@/components/ui/CursorShadow";
import Movies from "@/components/sections/Movies";

function Home() {
  const dispatch = useAppDispatch();
  const movies = useAppSelector((state) => state.movies.value);

  const shinyRef = useRef<HTMLDivElement>(null);
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (shinyRef.current) {
      const x = event.clientX;
      const y = event.clientY;
      shinyRef.current.style.transform = `translate(${x - 115}px, ${y - 115}px)`;
    }
  };

  const fetchMovies = useCallback(async () => {
    getMovies().then((data) => dispatch(setMovies(data)));
  }, []);

  useEffect(() => {
    if (!movies.length) {
      fetchMovies();
    }
  }, []);

  return (
    <div
      onMouseMove={handleMouseMove}
      className={"bg-app-background w-screen h-screen z-10 overflow-y-auto"}
    >
      <Movies movies={movies} />
      <CursorShadow ref={shinyRef} />
      <div className={"h-full w-full bg-black/30 fixed top-0 left-0 z-20"} />
    </div>
  );
}

export default Home;
