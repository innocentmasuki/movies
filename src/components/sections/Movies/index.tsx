import { MovieData } from "@/types";
import { Link } from "react-router-dom";
import MovieCard from "@/components/MovieCard";

const Movies = ({ movies }: { movies: MovieData[] }) => {
  return (
    <section
      className={
        "flex  p-4  flex-col z-50 w-full h-full gap-1 mx-auto md:max-w-4xl"
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
    </section>
  );
};

export default Movies;
