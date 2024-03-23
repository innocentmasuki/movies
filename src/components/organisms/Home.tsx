import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks.ts";
import { useCallback, useEffect } from "react";
import { getMovies } from "@/api/movieSdk.ts";
import { setMovies } from "@/redux/slices/moviesSlice.ts";
import Movies from "@/components/molecules/Movies";
import Search from "@/components/molecules/Search";
import { Helmet } from "react-helmet";
import icons8Popcorn from "@/assets/icons8-popcorn-100.png";
import SearchResults from "@/components/molecules/SearchResults";

function Home() {
  const dispatch = useAppDispatch();
  const movies = useAppSelector((state) => state.movies.value);
  const searchQuery = useAppSelector((state) => state.searchQuery.value);

  const fetchMovies = useCallback(() => {
    getMovies().then((data) => dispatch(setMovies(data)));
  }, [dispatch]);

  useEffect(() => {
    if (!movies.length) {
      fetchMovies();
    }
  }, [fetchMovies, movies.length]);

  return (
    <div className={"h-screen  w-full overflow-y-auto"}>
      <Helmet>
        <title>Movie Database Showcase</title>
        <meta
          name="description"
          content={"This is a movie database showcase for the "}
        />
        <meta property="og:title" content={"Movie Database Showcase"} />
        <meta property="og:image" content={icons8Popcorn} />
      </Helmet>
      <div className={" flex px-4 pb-6 flex-col gap-1 mx-auto md:max-w-5xl"}>
        <Search />
        {searchQuery ? <SearchResults /> : <Movies movies={movies} />}
      </div>
    </div>
  );
}

export default Home;
