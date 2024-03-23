import { MovieData } from "@/types";

const CardContent = ({ movie }: { movie: MovieData }) => {
  return (
    <div className={"h-full w-full p-2 z-30 flex flex-col gap-4"}>
      <img
        src={movie.Poster}
        className={"w-full h-[200px] object-cover rounded-xl"}
        alt={movie.Poster}
      />
      <div
        className={"flex flex-col gap- pb-1 justify-between items-start w-full"}
      >
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
export default CardContent;
