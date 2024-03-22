import { MovieData } from "@/types";

const MovieCard = ({ movie }: { movie: MovieData }) => {
  return (
    <div className={"h-full w-full"}>
      <img
        src={movie.Poster}
        className={"w-full h-[200px] object-cover rounded-2xl"}
        alt={movie.Poster}
      />

      <h3 className={"text-white"}>
        {movie.Title} - {movie.Year}
      </h3>
    </div>
  );
};

export default MovieCard;
