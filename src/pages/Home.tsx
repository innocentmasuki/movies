import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks.ts";
import { useCallback, useEffect } from "react";
import { getMovies } from "@/api/movieSdk.ts";
import { setMovies } from "@/redux/slices/moviesSlice.ts";
import Movies from "@/components/sections/Movies";
import Search from "@/components/sections/Search";

function Home() {
  const dispatch = useAppDispatch();
  const movies = useAppSelector((state) => state.movies.value);

  const fetchMovies = useCallback(async () => {
    getMovies().then((data) => dispatch(setMovies(data)));
  }, [dispatch]);

  useEffect(() => {
    if (!movies.length) {
      fetchMovies();
    }
  }, []);

  return (
    <div className={"h-screen  w-full overflow-y-auto"}>
      <div className={" flex px-4 pb-6 flex-col gap-1 mx-auto md:max-w-5xl"}>
        <Search />
        <Movies movies={movies} />
      </div>
    </div>
  );
}

export default Home;
