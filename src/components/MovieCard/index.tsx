import { MovieData } from "@/types";

const MovieCard = ({ movie }: { movie: MovieData }) => {
  return (
    <div
      className={
        "h-full w-full z-50 cursor-pointer flex flex-col gap-4 overflow-hidden"
      }
    >
      <img
        src={movie.Poster}
        className={"w-full h-[200px] object-cover rounded-2xl"}
        alt={movie.Poster}
      />
      <div className={"flex flex-col gap-1 justify-between items-start w-full"}>
        <span
          className={
            "text-white font-semibold font-montserrat  line-clamp-1 text-xs"
          }
        >
          {movie.Title}
        </span>
        <span className={"text-white font-montserrat text-xs"}>
          {movie.Year}
        </span>
      </div>
    </div>
  );
};

export default MovieCard;
