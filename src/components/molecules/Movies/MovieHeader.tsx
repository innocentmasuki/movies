import { MovieData } from "@/types";

const MovieHeader = ({ color, movie }: { color: string; movie: MovieData }) => {
  return (
    <>
      <div
        className={"flex flex-row justify-center md:justify-start duration-75"}
      >
        <img
          src={movie?.Poster}
          className={"h-[400px] aspect-auto object-cover "}
          alt={movie?.Title + " poster"}
        />
      </div>

      <div className={"flex flex-col md:items-start items-center "}>
        <span
          className={"border-2  rounded-full px-4 py-[2px]"}
          style={{ color, borderColor: color }}
        >
          {movie?.Rated}
        </span>
        <div
          style={{ color }}
          className={`text-4xl md:text-6xl mt-4 text-center md:text-left  font-montserrat font-semibold`}
        >
          {movie?.Title}
        </div>
      </div>
    </>
  );
};

export default MovieHeader;
