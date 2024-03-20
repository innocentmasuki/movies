import { MovieData } from "@/types";

const MovieCard = (movie: MovieData) => {
  return (
    <div className={"h-full w-full"}>
      <img src={movie.Poster} className={"w-full h-full"} alt={movie.Poster} />
      <h3>
        {movie.Title} - {movie.Year}
      </h3>
    </div>
  );
};

export default MovieCard;
