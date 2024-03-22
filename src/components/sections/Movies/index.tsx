import { MovieData } from "@/types";
import { Link } from "react-router-dom";
import MovieCard from "@/components/MovieCard";

const Movies = ({ movies }: { movies: MovieData[] }) => {
  return (
    <section
      className={"w-full gap-x-3 gap-y-10 grid py-4 grid-cols-2 md:grid-cols-5"}
    >
      {movies.length > 0 &&
        movies.map((movie: MovieData) => {
          return (
            <Link key={movie.imdbID} to={`/${movie.imdbID}`}>
              <MovieCard movie={movie} />
            </Link>
          );
        })}
    </section>
  );
};

export default Movies;
