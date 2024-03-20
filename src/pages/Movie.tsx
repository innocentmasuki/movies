import { useLoaderData, useNavigate } from "react-router-dom";
import { MovieData } from "@/types";
import { getRatingIcon } from "@/utils/getRatingIcon.ts";

const Movie = () => {
  const movie = useLoaderData() as MovieData;
  const navigate = useNavigate();
  console.log(JSON.stringify(movie, null, 2));
  return (
    <div className={"h-full w-screen relative"}>
      <img
        src={movie.Poster}
        className={"h-screen w-screen object-cover absolute top-0 left-0"}
        alt={movie.Title}
      />
      <div
        className={"backdrop-blur absolute top-0 left-0 h-screen w-screen"}
      />
      <div className="absolute p-4 top-0 left-0 h-screen w-screen  bg-gradient-to-b from-transparent via-black/80  to-black">
        <button onClick={() => navigate(-1)}>Go Back</button>
        <img
          src={movie.Poster}
          className={"h-[400px] aspect-auto object-cover "}
          alt={movie.Title}
        />
        <img
          src={getRatingIcon(movie.Rated)}
          className={
            "h-[70px] bg-white aspect-auto border-4 border-white object-fit"
          }
          alt={movie.Rated}
        />
        <div>{movie.Title}</div>
      </div>
    </div>
  );
};
export default Movie;
