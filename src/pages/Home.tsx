import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks.ts";
import React, { useCallback, useEffect, useRef } from "react";
import { getMovies } from "@/api/movieSdk.ts";
import { setMovies } from "@/redux/slices/moviesSlice.ts";
import CursorShadow from "@/components/ui/CursorShadow";
import Movies from "@/components/sections/Movies";
import Search from "@/components/sections/Search";

function Home() {
  const dispatch = useAppDispatch();
  const movies = useAppSelector((state) => state.movies.value);

  const cursorShadowRef = useRef<HTMLDivElement>(null);
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (cursorShadowRef.current) {
      const x = event.clientX;
      const y = event.clientY;
      cursorShadowRef.current.style.transform = `translate(${x - 115}px, ${y - 115}px)`;
    }
  };

  const fetchMovies = useCallback(async () => {
    getMovies().then((data) => dispatch(setMovies(data)));
  }, [dispatch]);

  useEffect(() => {
    if (!movies.length) {
      fetchMovies();
    }
  }, []);

  return (
    <div
      onMouseMove={handleMouseMove}
      className={"h-screen  w-full overflow-y-auto"}
    >
      <div className={" flex p-4 flex-col gap-1 mx-auto md:max-w-4xl"}>
        <Search />
        <Movies movies={movies} />
        <Movies movies={movies} />
        <Movies movies={movies} />

        <CursorShadow ref={cursorShadowRef} />
      </div>
    </div>
  );
}

export default Home;
