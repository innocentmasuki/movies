import { MovieData } from "@/types";

const CardContent = ({
  movie,
  smallCards,
}: {
  movie: MovieData;
  smallCards: boolean;
}) => {
  return (
    <div
      className={`h-full w-full p-2 z-30 flex ${smallCards ? "flex-row" : "flex-col"} gap-4`}
    >
      <img
        src={movie.Poster}
        className={` ${smallCards ? "min-w-[200px] max-w-[200px] max-h-[100px] min-h-[100px]" : "w-full max-h-[200px] min-h-[200px]"}  object-cover rounded-xl bg-gray-800`}
        alt={movie.Title + " poster"}
      />
      <div
        className={`flex flex-col gap- pb-1 ${smallCards ? "justify-start" : "justify-between"}  items-start w-full`}
      >
        <span
          className={`text-white font-semibold font-montserrat ${smallCards ? "text-xl  line-clamp-2" : "text-xs  line-clamp-1 "}`}
        >
          {movie.Title}
        </span>
        <span
          className={`text-white font-montserrat ${smallCards ? "text-l" : "text-xs"}`}
        >
          {movie.Year}
        </span>
      </div>
    </div>
  );
};
export default CardContent;
