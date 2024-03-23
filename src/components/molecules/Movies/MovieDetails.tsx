import { getLogo } from "@/utils/getRatingIcon.ts";
import { IoMdStar } from "react-icons/io";
import { MovieData } from "@/types";

const MovieDetails = ({
  movie,
  color,
}: {
  movie: MovieData;
  color: string;
}) => {
  return (
    <div
      className={
        "flex flex-col  text-gray-400  md:flex-row justify-between gap-6 items-center"
      }
    >
      <div
        className={
          "flex flex-row items-center justify-center md:justify-start gap-4"
        }
      >
        {movie?.Ratings.map((rating, index) => {
          if (!getLogo(rating.Source)) return;
          return (
            <div key={index} className={"flex flex-row items-center gap-2"}>
              <img
                alt={""}
                src={getLogo(rating.Source)}
                className={"h-[20px] aspect-auto object-fit "}
              />
              <span style={{ color, borderColor: color }}>{rating.Value}</span>
            </div>
          );
        })}
      </div>

      <div style={{ color }} className={"flex flex-row gap-1 items-center"}>
        {<IoMdStar className={"text-yellow-400 text-[24px]"} />}
        {movie?.imdbVotes}
      </div>
    </div>
  );
};

export default MovieDetails;
